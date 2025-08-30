import { Player } from './Player';
import type { Event, TimeSpan } from './types';
import { clock } from '../AudioBackend/sequencer';

/**
 * Simple query-based scheduler that asks players for future events
 */
export class QueryScheduler {
  private static instance: QueryScheduler;
  private players: Map<string, Player> = new Map();
  private lookAheadBeats: number = 1; // How far ahead to query
  private queryInterval: number = 50; // ms between queries
  private intervalId: number | null = null;
  private lastQueryTime: number = 0;

  static getInstance(): QueryScheduler {
    if (!QueryScheduler.instance) {
      QueryScheduler.instance = new QueryScheduler();
    }
    return QueryScheduler.instance;
  }

  /**
   * Register a player with the scheduler
   */
  addPlayer(player: Player): void {
    this.players.set(player.name, player);
  }

  /**
   * Remove a player from scheduler
   */
  removePlayer(playerName: string): void {
    this.players.delete(playerName);
  }

  /**
   * Start the query loop
   */
  start(): void {
    if (this.intervalId !== null) return;
    
    console.log('Starting query scheduler');
    this.lastQueryTime = this.getCurrentBeatTime();
    this.intervalId = window.setInterval(() => {
      this.queryAndSchedule();
    }, this.queryInterval);
  }

  /**
   * Stop the query loop  
   */
  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Stopped query scheduler');
    }
  }

  /**
   * Main query and schedule loop
   */
  private queryAndSchedule(): void {
    const currentBeatTime = this.getCurrentBeatTime();
    const querySpan: TimeSpan = {
      start: this.lastQueryTime,
      end: currentBeatTime + this.lookAheadBeats
    };

    // Query all active players
    for (const [playerName, player] of this.players) {
      if (player.hasPattern()) {
        const events = player.queryTimeSpan(querySpan);
        this.scheduleEvents(playerName, events, querySpan.start);
      }
    }

    this.lastQueryTime = currentBeatTime;
  }

  /**
   * Schedule events with precise Web Audio timing
   */
  private async scheduleEvents(playerName: string, events: Event[], baseTime: number): Promise<void> {
    if (events.length === 0) return;

    try {
      // Import superdough dynamically
      const superdoughModule = await import('superdough');
      const { superdough, initAudioOnFirstClick, registerSynthSounds } = superdoughModule;
      
      // Initialize superdough if not already done
      if (!(window as any).__superdoughInitialized) {
        console.log('Initializing superdough...');
        await Promise.all([
          initAudioOnFirstClick(),
          registerSynthSounds()
        ]);
        (window as any).__superdoughInitialized = true;
        console.log('Superdough initialized');
      }

      // Schedule each event
      for (const event of events) {
        const eventBeatTime = baseTime + event.start;
        const webAudioTime = this.beatTimeToWebAudioTime(eventBeatTime);
        
        // Only schedule if in future
        if (webAudioTime > 0 && webAudioTime > (window as any).audioContext?.currentTime) {
          const durationSeconds = event.duration * (60 / clock.bpm());
          
          // Schedule with small buffer to avoid timing issues
          const scheduleDelay = Math.max(0, (webAudioTime - ((window as any).audioContext?.currentTime || 0)) * 1000 - 5);
          
          setTimeout(() => {
            try {
              superdough(event.value, webAudioTime, durationSeconds);
            } catch (error) {
              console.error(`Failed to play event for ${playerName}:`, error);
            }
          }, scheduleDelay);
        }
      }
    } catch (error) {
      console.error(`Failed to schedule events for ${playerName}:`, error);
    }
  }

  /**
   * Get current time in beats (simplified)
   */
  private getCurrentBeatTime(): number {
    return clock.ticks() / 4; // Assuming 4 ticks per beat
  }

  /**
   * Convert beat time to Web Audio time
   */
  private beatTimeToWebAudioTime(beatTime: number): number {
    const currentBeatTime = this.getCurrentBeatTime();
    const beatDifference = beatTime - currentBeatTime;
    const secondsDifference = beatDifference * (60 / clock.bpm());
    
    const audioContext = (window as any).audioContext;
    return audioContext ? audioContext.currentTime + secondsDifference : 0;
  }
}