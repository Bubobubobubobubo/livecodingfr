class ClockProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.isRunning = false;
    this.nextTickTime = 0;
    this.tickInterval = 0.125; // 8th notes at 120 BPM (60/120/4)
    this.bpm = 120;
    this.startTime = 0;
    this.tickCount = 0;
    this.currentTime = 0;
    this.currentFrame = 0;
    
    this.port.onmessage = (event) => {
      const { type, data } = event.data;
      
      switch(type) {
        case 'start':
          this.isRunning = true;
          this.startTime = this.currentTime;
          this.nextTickTime = this.currentTime;
          this.tickCount = 0;
          this.port.postMessage({ 
            type: 'started', 
            data: {
              time: this.currentTime,
              frame: this.currentFrame 
            }
          });
          break;
          
        case 'stop':
          this.isRunning = false;
          this.tickCount = 0;
          this.port.postMessage({ type: 'stopped' });
          break;
          
        case 'setBPM':
          this.bpm = data.bpm;
          this.tickInterval = 60 / this.bpm / 4; // 16th notes
          break;
          
        case 'getStatus':
          this.port.postMessage({
            type: 'status',
            data: {
              isRunning: this.isRunning,
              bpm: this.bpm,
              time: this.currentTime - this.startTime,
              tickCount: this.tickCount,
              currentTime: this.currentTime,
              currentFrame: this.currentFrame,
              sampleRate: sampleRate
            }
          });
          break;
      }
    };
  }
  
  process(inputs, outputs, parameters) {
    // Update our internal time tracking
    this.currentTime = currentTime;
    this.currentFrame = currentFrame;
    
    if (!this.isRunning) {
      return true;
    }
    
    // Check if we've passed the next tick time
    while (this.currentTime >= this.nextTickTime) {
      // Send tick message
      this.port.postMessage({
        type: 'tick',
        data: {
          tickNumber: this.tickCount,
          time: this.nextTickTime,
          actualTime: this.currentTime,
          elapsedTime: this.currentTime - this.startTime,
          bpm: this.bpm
        }
      });
      
      this.tickCount++;
      this.nextTickTime += this.tickInterval;
    }
    
    // Send periodic time updates (every ~100ms)
    if (this.currentFrame % (sampleRate * 0.1) < 128) {
      this.port.postMessage({
        type: 'timeUpdate',
        data: {
          time: this.currentTime - this.startTime,
          currentTime: this.currentTime,
          frame: this.currentFrame,
          tickCount: this.tickCount
        }
      });
    }
    
    return true;
  }
}

registerProcessor('clock-processor', ClockProcessor);