import { vi } from 'vitest';

// Mock Tone.js modules
export const mockTone = {
  Transport: {
    start: vi.fn(),
    stop: vi.fn(),
    pause: vi.fn(),
    bpm: { value: 120 },
    scheduleRepeat: vi.fn(),
    scheduleOnce: vi.fn(),
    clear: vi.fn(),
    cancel: vi.fn(),
    state: 'stopped',
    position: '0:0:0',
    seconds: 0,
  },
  
  Player: vi.fn().mockImplementation((url) => ({
    toDestination: vi.fn().mockReturnThis(),
    start: vi.fn(),
    stop: vi.fn(),
    dispose: vi.fn(),
    loaded: true,
    volume: { value: -10 },
    playbackRate: 1,
    loop: false,
    autostart: false,
  })),
  
  Sampler: vi.fn().mockImplementation((samples) => ({
    toDestination: vi.fn().mockReturnThis(),
    triggerAttack: vi.fn(),
    triggerRelease: vi.fn(),
    triggerAttackRelease: vi.fn(),
    dispose: vi.fn(),
    loaded: true,
    volume: { value: -10 },
  })),
  
  Synth: vi.fn().mockImplementation(() => ({
    toDestination: vi.fn().mockReturnThis(),
    triggerAttack: vi.fn(),
    triggerRelease: vi.fn(),
    triggerAttackRelease: vi.fn(),
    dispose: vi.fn(),
    volume: { value: -10 },
    envelope: {
      attack: 0.02,
      decay: 0.1,
      sustain: 0.3,
      release: 1.2,
    },
  })),
  
  PolySynth: vi.fn().mockImplementation(() => ({
    toDestination: vi.fn().mockReturnThis(),
    triggerAttack: vi.fn(),
    triggerRelease: vi.fn(),
    triggerAttackRelease: vi.fn(),
    dispose: vi.fn(),
    volume: { value: -10 },
  })),
  
  Sequence: vi.fn().mockImplementation((callback, events, subdivision) => ({
    start: vi.fn(),
    stop: vi.fn(),
    dispose: vi.fn(),
    loop: true,
    events: events || [],
    subdivision: subdivision || '8n',
  })),
  
  Loop: vi.fn().mockImplementation((callback, interval) => ({
    start: vi.fn(),
    stop: vi.fn(),
    dispose: vi.fn(),
    interval: interval || '4n',
  })),
  
  Filter: vi.fn().mockImplementation(() => ({
    toDestination: vi.fn().mockReturnThis(),
    connect: vi.fn(),
    disconnect: vi.fn(),
    frequency: { value: 350 },
    Q: { value: 1 },
    type: 'lowpass',
  })),
  
  Reverb: vi.fn().mockImplementation(() => ({
    toDestination: vi.fn().mockReturnThis(),
    connect: vi.fn(),
    disconnect: vi.fn(),
    roomSize: { value: 0.7 },
    dampening: { value: 3000 },
  })),
  
  Delay: vi.fn().mockImplementation(() => ({
    toDestination: vi.fn().mockReturnThis(),
    connect: vi.fn(),
    disconnect: vi.fn(),
    delayTime: { value: 0.25 },
    feedback: { value: 0.125 },
  })),
  
  Master: {
    volume: { value: -10 },
    mute: false,
  },
  
  context: {
    resume: vi.fn().mockResolvedValue(),
    suspend: vi.fn().mockResolvedValue(),
    state: 'running',
  },
  
  start: vi.fn(),
  getContext: vi.fn(() => mockTone.context),
  
  // Time utilities
  Time: vi.fn().mockImplementation((time) => ({
    toSeconds: () => typeof time === 'number' ? time : 1,
    toString: () => time?.toString() || '1n',
  })),
  
  // Note utilities
  Frequency: vi.fn().mockImplementation((freq) => ({
    toFrequency: () => typeof freq === 'number' ? freq : 440,
    toNote: () => 'C4',
  })),
};

// Mock the entire Tone module
vi.mock('tone', () => ({
  default: mockTone,
  ...mockTone,
}));

export default mockTone;