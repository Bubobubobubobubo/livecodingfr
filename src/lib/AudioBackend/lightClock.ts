interface ClockData {
  time?: number;
  tickNumber?: number;
  tickCount?: number;
  bpm?: number;
}

type EventType = 'tick' | 'timeUpdate' | 'started' | 'stopped';
type EventCallback = (data: ClockData) => void;

export class LightClock {
  private context: AudioContext | null = null;
  private isInitialized: boolean = false;
  private isRunning: boolean = false;
  private currentBPM: number = 120;
  private startTime: number = 0;
  private tickCount: number = 0;
  private nextTickTime: number = 0;
  private tickInterval: number = 0.125; // 16th notes at 120 BPM
  private dummyGain: GainNode | null = null;
  private lastUpdateTime: number = 0;
  private updateInterval: number = 0.1; // 100ms updates
  
  private listeners: Record<EventType, EventCallback[]> = {
    tick: [],
    timeUpdate: [],
    started: [],
    stopped: []
  };

  async init(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create dummy gain for Safari compatibility (from the technique)
    this.dummyGain = this.context.createGain();
    this.dummyGain.gain.value = 0;
    this.dummyGain.connect(this.context.destination);
    
    this.updateTickInterval();
    this.isInitialized = true;
  }

  private updateTickInterval(): void {
    this.tickInterval = 60 / this.currentBPM / 4; // 16th notes
  }

  private scheduleTimeout(callback: () => void, startTime: number, endTime: number): void {
    if (!this.context) return;

    // Use ConstantSourceNode for precise timing
    const constantSource = this.context.createConstantSource();
    constantSource.connect(this.dummyGain!);
    
    constantSource.start(startTime);
    constantSource.stop(endTime);
    
    constantSource.addEventListener('ended', callback);
  }

  private tick(): void {
    if (!this.context || !this.isRunning) return;

    const currentTime = this.context.currentTime;
    const elapsedTime = currentTime - this.startTime;
    
    // Emit tick event
    this.emit('tick', {
      tickNumber: this.tickCount,
      time: currentTime,
      bpm: this.currentBPM
    });

    this.tickCount++;
    this.nextTickTime += this.tickInterval;

    // Schedule next tick
    const nextRealTime = this.startTime + this.nextTickTime;
    if (nextRealTime > currentTime) {
      this.scheduleTimeout(() => {
        if (this.isRunning) this.tick();
      }, currentTime, nextRealTime);
    } else {
      // If we're behind, schedule immediately
      setTimeout(() => {
        if (this.isRunning) this.tick();
      }, 0);
    }

    // Send periodic time updates
    if (currentTime - this.lastUpdateTime >= this.updateInterval) {
      this.emit('timeUpdate', {
        time: elapsedTime,
        tickCount: this.tickCount
      });
      this.lastUpdateTime = currentTime;
    }
  }

  async start(): Promise<void> {
    if (!this.isInitialized) {
      await this.init();
    }

    if (this.context && this.context.state === 'suspended') {
      await this.context.resume();
    }

    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = this.context!.currentTime;
    this.nextTickTime = 0;
    this.tickCount = 0;
    this.lastUpdateTime = this.startTime;

    this.emit('started', {
      time: this.startTime,
      bpm: this.currentBPM
    });

    // Start the tick cycle
    this.tick();
  }

  stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    this.emit('stopped', {});
  }

  setBPM(bpm: number): void {
    this.currentBPM = bpm;
    this.updateTickInterval();
  }

  getStatus(): void {
    if (!this.context) return;
    
    const currentTime = this.context.currentTime;
    const elapsedTime = this.isRunning ? currentTime - this.startTime : 0;
    
    this.emit('timeUpdate', {
      time: elapsedTime,
      tickCount: this.tickCount,
      bpm: this.currentBPM
    });
  }

  on(event: EventType, callback: EventCallback): void {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  off(event: EventType, callback: EventCallback): void {
    if (this.listeners[event]) {
      const index = this.listeners[event].indexOf(callback);
      if (index > -1) {
        this.listeners[event].splice(index, 1);
      }
    }
  }

  private emit(event: EventType, data: ClockData): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  time(): number {
    if (!this.context || !this.isRunning) return 0;
    return this.context.currentTime - this.startTime;
  }

  bpm(): number {
    return this.currentBPM;
  }

  ticks(): number {
    return this.tickCount;
  }

  running(): boolean {
    return this.isRunning;
  }
}