import { LightClock } from './lightClock';

// Create our own clock instance or import existing singleton
const clock = new LightClock();

interface MusicalPosition {
  bar: number;
  beat: number;
  tick: number;
  totalBeats: number;
  totalTicks: number;
}

export class MusicalTimeManager {
  private static instance: MusicalTimeManager;
  private beatsPerBar: number = 4;
  private ticksPerBeat: number = 4;

  static getInstance(): MusicalTimeManager {
    if (!MusicalTimeManager.instance) {
      MusicalTimeManager.instance = new MusicalTimeManager();
    }
    return MusicalTimeManager.instance;
  }

  setTimeSignature(beatsPerBar: number, ticksPerBeat: number = 4): void {
    this.beatsPerBar = beatsPerBar;
    this.ticksPerBeat = ticksPerBeat;
  }

  getBeatsPerBar(): number {
    return this.beatsPerBar;
  }

  getTicksPerBeat(): number {
    return this.ticksPerBeat;
  }

  getTicksPerBar(): number {
    return this.beatsPerBar * this.ticksPerBeat;
  }

  // Core musical position calculation
  getCurrentMusicalPosition(): MusicalPosition {
    const totalTicks = clock.ticks();
    const ticksPerBar = this.getTicksPerBar();
    
    const bar = Math.floor(totalTicks / ticksPerBar);
    const tickInBar = totalTicks % ticksPerBar;
    const beat = Math.floor(tickInBar / this.ticksPerBeat);
    const tick = tickInBar % this.ticksPerBeat;
    const totalBeats = Math.floor(totalTicks / this.ticksPerBeat);

    return {
      bar,
      beat,
      tick,
      totalBeats,
      totalTicks
    };
  }

  // Get the current bar number (0-based)
  getCurrentBar(): number {
    return this.getCurrentMusicalPosition().bar;
  }

  // Get current beat within the current bar (0-based)
  getCurrentBeatInBar(): number {
    return this.getCurrentMusicalPosition().beat;
  }

  // Get the tick number when the next bar starts
  getNextBarTick(): number {
    const currentBar = this.getCurrentBar();
    const nextBar = currentBar + 1;
    return nextBar * this.getTicksPerBar();
  }

  // Get the beat number when the next bar starts (in quarter notes)
  getNextBarBeat(): number {
    const nextBarTick = this.getNextBarTick();
    return Math.floor(nextBarTick / this.ticksPerBeat);
  }

  // Calculate how many ticks until the next bar boundary
  getTicksUntilNextBar(): number {
    const currentTick = clock.ticks();
    const nextBarTick = this.getNextBarTick();
    return nextBarTick - currentTick;
  }

  // Calculate how many beats until the next bar boundary
  getBeatsUntilNextBar(): number {
    const ticksUntil = this.getTicksUntilNextBar();
    return ticksUntil / this.ticksPerBeat;
  }

  // Get the tick when the current bar started
  getCurrentBarStartTick(): number {
    const currentBar = this.getCurrentBar();
    return currentBar * this.getTicksPerBar();
  }

  // Get the beat when the current bar started
  getCurrentBarStartBeat(): number {
    return Math.floor(this.getCurrentBarStartTick() / this.ticksPerBeat);
  }

  // Check if we're at the start of a bar (tick 0 of the bar)
  isAtBarStart(): boolean {
    const pos = this.getCurrentMusicalPosition();
    return pos.beat === 0 && pos.tick === 0;
  }

  // Check if we're at the start of a beat (tick 0 of the beat)
  isAtBeatStart(): boolean {
    const pos = this.getCurrentMusicalPosition();
    return pos.tick === 0;
  }

  // Convert beat number to bar:beat notation
  beatToBarBeat(totalBeat: number): { bar: number; beat: number } {
    const bar = Math.floor(totalBeat / this.beatsPerBar);
    const beat = totalBeat % this.beatsPerBar;
    return { bar, beat };
  }

  // Convert bar:beat to total beat number
  barBeatToBeat(bar: number, beat: number): number {
    return bar * this.beatsPerBar + beat;
  }

  // Get time in seconds until next bar
  getSecondsUntilNextBar(): number {
    const ticksUntil = this.getTicksUntilNextBar();
    const bpm = clock.bpm();
    const secondsPerTick = 60 / (bpm * this.ticksPerBeat);
    return ticksUntil * secondsPerTick;
  }

  // Calculate when a specific beat will occur (in Web Audio time)
  getBeatTime(beatNumber: number): number {
    const currentTime = clock.time();
    const currentBeat = this.getCurrentMusicalPosition().totalBeats;
    const beatDifference = beatNumber - currentBeat;
    const bpm = clock.bpm();
    const secondsPerBeat = 60 / bpm;
    
    return currentTime + (beatDifference * secondsPerBeat);
  }

  // Format musical position as string for debugging
  formatMusicalPosition(pos?: MusicalPosition): string {
    const position = pos || this.getCurrentMusicalPosition();
    return `${position.bar}:${position.beat}:${position.tick}`;
  }

  // Get detailed timing info for debugging
  getTimingInfo(): any {
    const pos = this.getCurrentMusicalPosition();
    const nextBarTick = this.getNextBarTick();
    const currentTick = clock.ticks();
    
    return {
      position: this.formatMusicalPosition(pos),
      currentTick,
      nextBarTick,
      ticksUntilNextBar: this.getTicksUntilNextBar(),
      beatsUntilNextBar: this.getBeatsUntilNextBar(),
      secondsUntilNextBar: this.getSecondsUntilNextBar(),
      bpm: clock.bpm(),
      beatsPerBar: this.beatsPerBar,
      ticksPerBeat: this.ticksPerBeat,
      isAtBarStart: this.isAtBarStart(),
      isAtBeatStart: this.isAtBeatStart()
    };
  }
}

// Global instance for easy access
export const musicalTime = MusicalTimeManager.getInstance();