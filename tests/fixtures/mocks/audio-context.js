import { vi } from 'vitest';

// Enhanced AudioContext mock for comprehensive testing
export class MockAudioContext {
  constructor() {
    this.state = 'suspended';
    this.currentTime = 0;
    this.sampleRate = 44100;
    this.destination = this.createDestination();
    this._timeUpdateInterval = null;
    this._isRunning = false;
  }
  
  createDestination() {
    return {
      numberOfInputs: 1,
      numberOfOutputs: 0,
      channelCount: 2,
      channelCountMode: 'max',
      channelInterpretation: 'speakers',
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
  }
  
  createOscillator() {
    return {
      frequency: { 
        value: 440,
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      detune: { value: 0 },
      type: 'sine',
      connect: vi.fn(),
      disconnect: vi.fn(),
      start: vi.fn((when = 0) => {
        this._scheduleStart(when);
      }),
      stop: vi.fn((when = 0) => {
        this._scheduleStop(when);
      }),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      onended: null,
    };
  }
  
  createGain() {
    return {
      gain: { 
        value: 1,
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
  }
  
  createAnalyser() {
    return {
      fftSize: 2048,
      frequencyBinCount: 1024,
      minDecibels: -100,
      maxDecibels: -30,
      smoothingTimeConstant: 0.8,
      connect: vi.fn(),
      disconnect: vi.fn(),
      getByteFrequencyData: vi.fn((array) => {
        // Fill with mock frequency data
        if (array) {
          for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
          }
        }
      }),
      getByteTimeDomainData: vi.fn((array) => {
        // Fill with mock time domain data
        if (array) {
          for (let i = 0; i < array.length; i++) {
            array[i] = 128 + Math.floor(Math.sin(i * 0.1) * 50);
          }
        }
      }),
      getFloatFrequencyData: vi.fn(),
      getFloatTimeDomainData: vi.fn(),
    };
  }
  
  createBufferSource() {
    return {
      buffer: null,
      playbackRate: { value: 1 },
      detune: { value: 0 },
      loop: false,
      loopStart: 0,
      loopEnd: 0,
      connect: vi.fn(),
      disconnect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      onended: null,
    };
  }
  
  createBiquadFilter() {
    return {
      type: 'lowpass',
      frequency: { 
        value: 350,
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
      },
      Q: { value: 1 },
      gain: { value: 0 },
      connect: vi.fn(),
      disconnect: vi.fn(),
      getFrequencyResponse: vi.fn(),
    };
  }
  
  createConvolver() {
    return {
      buffer: null,
      normalize: true,
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
  }
  
  createDelay(maxDelayTime = 1) {
    return {
      delayTime: { 
        value: 0,
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
  }
  
  createDynamicsCompressor() {
    return {
      threshold: { value: -24 },
      knee: { value: 30 },
      ratio: { value: 12 },
      attack: { value: 0.003 },
      release: { value: 0.25 },
      reduction: 0,
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
  }
  
  createWaveShaper() {
    return {
      curve: null,
      oversample: 'none',
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
  }
  
  createBuffer(numberOfChannels, length, sampleRate) {
    const mockBuffer = {
      numberOfChannels,
      length,
      sampleRate,
      duration: length / sampleRate,
      getChannelData: vi.fn((channel) => new Float32Array(length)),
      copyFromChannel: vi.fn(),
      copyToChannel: vi.fn(),
    };
    return mockBuffer;
  }
  
  decodeAudioData(arrayBuffer) {
    return Promise.resolve(this.createBuffer(2, 44100, 44100));
  }
  
  resume() {
    this.state = 'running';
    this._startTimeUpdates();
    return Promise.resolve();
  }
  
  suspend() {
    this.state = 'suspended';
    this._stopTimeUpdates();
    return Promise.resolve();
  }
  
  close() {
    this.state = 'closed';
    this._stopTimeUpdates();
    return Promise.resolve();
  }
  
  _startTimeUpdates() {
    if (!this._isRunning) {
      this._isRunning = true;
      this._timeUpdateInterval = setInterval(() => {
        if (this.state === 'running') {
          this.currentTime += 0.01; // Increment by 10ms
        }
      }, 10);
    }
  }
  
  _stopTimeUpdates() {
    if (this._timeUpdateInterval) {
      clearInterval(this._timeUpdateInterval);
      this._timeUpdateInterval = null;
      this._isRunning = false;
    }
  }
  
  _scheduleStart(when) {
    // Mock scheduling logic for testing
    const scheduleTime = when || this.currentTime;
    setTimeout(() => {
      // Simulate start event
    }, Math.max(0, (scheduleTime - this.currentTime) * 1000));
  }
  
  _scheduleStop(when) {
    // Mock scheduling logic for testing
    const scheduleTime = when || this.currentTime;
    setTimeout(() => {
      // Simulate stop event
    }, Math.max(0, (scheduleTime - this.currentTime) * 1000));
  }
}

// Mock OfflineAudioContext
export class MockOfflineAudioContext extends MockAudioContext {
  constructor(numberOfChannels, length, sampleRate) {
    super();
    this.length = length;
    this.sampleRate = sampleRate;
    this.numberOfChannels = numberOfChannels;
  }
  
  startRendering() {
    return Promise.resolve(this.createBuffer(this.numberOfChannels, this.length, this.sampleRate));
  }
}

// Setup global mocks
if (typeof global !== 'undefined') {
  global.AudioContext = MockAudioContext;
  global.webkitAudioContext = MockAudioContext;
  global.OfflineAudioContext = MockOfflineAudioContext;
  global.webkitOfflineAudioContext = MockOfflineAudioContext;
}

// Mock MediaDevices for getUserMedia
global.navigator = global.navigator || {};
global.navigator.mediaDevices = {
  getUserMedia: vi.fn(() => Promise.resolve({
    getTracks: () => [],
    getAudioTracks: () => [],
    getVideoTracks: () => [],
  })),
  enumerateDevices: vi.fn(() => Promise.resolve([])),
};

export default { MockAudioContext, MockOfflineAudioContext };