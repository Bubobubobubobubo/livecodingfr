interface ClockData {
  time?: number;
  tickNumber?: number;
  tickCount?: number;
  bpm?: number;
}

type EventType = 'tick' | 'timeUpdate' | 'started' | 'stopped';
type EventCallback = (data: ClockData) => void;

interface ClockMessage {
  type: string;
  data?: any;
}

export class AudioClock {
  private context: AudioContext | null = null;
  private workletNode: AudioWorkletNode | null = null;
  private isInitialized: boolean = false;
  private isRunning: boolean = false;
  private currentBPM: number = 120;
  private elapsedTime: number = 0;
  private tickCount: number = 0;
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
    
    try {
      await this.context.audioWorklet.addModule('/clock-processor.js');
    } catch (error) {
      throw error;
    }
    
    this.workletNode = new AudioWorkletNode(this.context, 'clock-processor');
    
    this.workletNode.connect(this.context.destination);
    
    this.workletNode.port.onmessage = (event: MessageEvent<ClockMessage>) => {
      const { type, data } = event.data;
      
      switch(type) {
        case 'tick':
          if (data?.tickNumber !== undefined) {
            this.tickCount = data.tickNumber;
          }
          this.emit('tick', data || {});
          break;
          
        case 'timeUpdate':
          if (data?.time !== undefined) {
            this.elapsedTime = data.time;
          }
          this.emit('timeUpdate', data || {});
          break;
          
        case 'started':
          this.isRunning = true;
          this.emit('started', data || {});
          break;
          
        case 'stopped':
          this.isRunning = false;
          this.emit('stopped', data || {});
          break;
          
        case 'status':
          if (data?.time !== undefined) this.elapsedTime = data.time;
          if (data?.tickCount !== undefined) this.tickCount = data.tickCount;
          if (data?.bpm !== undefined) this.currentBPM = data.bpm;
          break;
      }
    };
    
    this.isInitialized = true;
  }
  
  async start(): Promise<void> {
    if (!this.isInitialized) {
      await this.init();
    }
    
    if (this.context && this.context.state === 'suspended') {
      await this.context.resume();
    }
    
    if (this.workletNode) {
      this.workletNode.port.postMessage({ type: 'start' });
    }
  }
  
  stop(): void {
    if (!this.isInitialized || !this.workletNode) return;
    this.workletNode.port.postMessage({ type: 'stop' });
  }
  
  setBPM(bpm: number): void {
    this.currentBPM = bpm;
    if (this.isInitialized && this.workletNode) {
      this.workletNode.port.postMessage({ type: 'setBPM', data: { bpm } });
    }
  }
  
  getStatus(): void {
    if (!this.isInitialized || !this.workletNode) return;
    this.workletNode.port.postMessage({ type: 'getStatus' });
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
    return this.elapsedTime;
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

export const clock = new AudioClock();