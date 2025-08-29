// Test setup file for vitest
import { vi } from 'vitest';

// Enhanced Web Audio API Mock
class MockAudioContext {
  constructor() {
    this.state = 'running';
    this.currentTime = 0;
    this.sampleRate = 44100;
    this.destination = {
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
  }
  
  createOscillator() {
    return {
      frequency: { value: 440 },
      type: 'sine',
      connect: vi.fn(),
      disconnect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };
  }
  
  createGain() {
    return {
      gain: { value: 1 },
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
  }
  
  suspend() {
    this.state = 'suspended';
    return Promise.resolve();
  }
  
  resume() {
    this.state = 'running';
    return Promise.resolve();
  }
}

// Mock ToneJS for testing
const mockTone = {
  now: () => 0.1,
  Synth: vi.fn(() => ({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 },
    toDestination: vi.fn(),
    connect: vi.fn(),
    disconnect: vi.fn(),
    triggerAttackRelease: vi.fn()
  })),
  Reverb: vi.fn(() => ({
    decay: 1.5,
    wet: { value: 0.5 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  })),
  FeedbackDelay: vi.fn(() => ({
    delayTime: { value: 0.25 },
    feedback: { value: 0.5 },
    wet: { value: 0.5 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  })),
  Filter: vi.fn(() => ({
    frequency: { value: 1000 },
    type: 'lowpass',
    Q: { value: 1 },
    wet: { value: 0.5 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  })),
  Distortion: vi.fn(() => ({
    distortion: 0.4,
    wet: { value: 1 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  })),
  Chorus: vi.fn(() => ({
    frequency: { value: 1.5 },
    depth: 0.7,
    wet: { value: 0.5 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  })),
  Phaser: vi.fn(() => ({
    frequency: { value: 0.5 },
    octaves: 3,
    baseFrequency: 350,
    wet: { value: 0.5 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  })),
  Tremolo: vi.fn(() => ({
    frequency: { value: 10 },
    depth: { value: 0.5 },
    wet: { value: 1 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  })),
  Vibrato: vi.fn(() => ({
    frequency: { value: 5 },
    depth: { value: 0.1 },
    wet: { value: 1 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  })),
  AutoFilter: vi.fn(() => ({
    frequency: { value: 1 },
    baseFrequency: 200,
    wet: { value: 1 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  })),
  AutoWah: vi.fn(() => ({
    baseFrequency: 100,
    octaves: 6,
    sensitivity: 0,
    wet: { value: 1 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  })),
  BitCrusher: vi.fn(() => ({
    bits: { value: 4 },
    wet: { value: 1 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  })),
  Chebyshev: vi.fn(() => ({
    order: 50,
    wet: { value: 1 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  })),
  PingPongDelay: vi.fn(() => ({
    delayTime: 0.25,
    feedback: { value: 0.5 },
    wet: { value: 0.5 },
    connect: vi.fn(),
    disconnect: vi.fn(),
    toDestination: vi.fn(),
    inUse: false
  }))
};

// Mock AudioClock
const mockClock = {
  on: vi.fn(),
  off: vi.fn(),
  emit: vi.fn(),
  ticks: () => 0,
  time: () => 0.1,
  bpm: () => 120,
  running: () => false
};

// Setup global mocks
global.AudioContext = MockAudioContext;
global.webkitAudioContext = MockAudioContext;

// Make mocks available
vi.mock('tone', () => ({ default: mockTone }));
vi.mock('../../src/lib/audioClock.js', () => ({ clock: mockClock }));

// Performance mock
global.performance = global.performance || {
  now: () => Date.now()
};

// Mock Promise for synchronous testing
global.Promise.resolve = vi.fn(() => ({ then: vi.fn(cb => cb()) }));