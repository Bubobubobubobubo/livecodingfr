export class AudioClock {
  constructor() {
    this.context = null;
    this.workletNode = null;
    this.isInitialized = false;
    this.isRunning = false;
    this.currentBPM = 120;
    this.elapsedTime = 0;
    this.tickCount = 0;
    this.listeners = {
      tick: [],
      timeUpdate: [],
      started: [],
      stopped: []
    };
  }
  
  async init() {
    if (this.isInitialized) return;
    
    // Create audio context
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    
    // Load and add the worklet module
    await this.context.audioWorklet.addModule('/clock-processor.js');
    
    // Create the worklet node
    this.workletNode = new AudioWorkletNode(this.context, 'clock-processor');
    
    // Connect to destination (required for processing to run)
    this.workletNode.connect(this.context.destination);
    
    // Set up message handling
    this.workletNode.port.onmessage = (event) => {
      const { type, ...data } = event.data;
      
      switch(type) {
        case 'tick':
          this.tickCount = data.tickNumber;
          this.emit('tick', data);
          break;
          
        case 'timeUpdate':
          this.elapsedTime = data.time;
          this.emit('timeUpdate', data);
          break;
          
        case 'started':
          this.isRunning = true;
          this.emit('started', data);
          break;
          
        case 'stopped':
          this.isRunning = false;
          this.emit('stopped', data);
          break;
          
        case 'status':
          this.elapsedTime = data.time;
          this.tickCount = data.tickCount;
          this.currentBPM = data.bpm;
          break;
      }
    };
    
    this.isInitialized = true;
  }
  
  async start() {
    if (!this.isInitialized) {
      await this.init();
    }
    
    // Resume context if suspended (required for user interaction)
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
    
    this.workletNode.port.postMessage({ type: 'start' });
  }
  
  stop() {
    if (!this.isInitialized) return;
    this.workletNode.port.postMessage({ type: 'stop' });
  }
  
  setBPM(bpm) {
    this.currentBPM = bpm;
    if (this.isInitialized) {
      this.workletNode.port.postMessage({ type: 'setBPM', data: { bpm } });
    }
  }
  
  getStatus() {
    if (!this.isInitialized) return null;
    this.workletNode.port.postMessage({ type: 'getStatus' });
  }
  
  // Event system
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }
  
  off(event, callback) {
    if (this.listeners[event]) {
      const index = this.listeners[event].indexOf(callback);
      if (index > -1) {
        this.listeners[event].splice(index, 1);
      }
    }
  }
  
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
  
  // Convenience methods for REPL
  time() {
    return this.elapsedTime;
  }
  
  bpm() {
    return this.currentBPM;
  }
  
  ticks() {
    return this.tickCount;
  }
  
  running() {
    return this.isRunning;
  }
}

// Create singleton instance
export const clock = new AudioClock();