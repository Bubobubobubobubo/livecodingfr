/**
 * Test setup configuration for Vitest
 * Provides global mocks and utilities for testing
 */

import { vi } from 'vitest';

// Mock Web Audio API components for testing
const mockAudioContext = {
  createAnalyser: vi.fn(() => ({
    fftSize: 2048,
    smoothingTimeConstant: 0.8,
    frequencyBinCount: 1024,
    connect: vi.fn(),
    disconnect: vi.fn(),
    getFloatTimeDomainData: vi.fn()
  })),
  createGain: vi.fn(() => ({
    connect: vi.fn(),
    disconnect: vi.fn(),
    gain: { value: 1.0 }
  })),
  createOscillator: vi.fn(() => ({
    connect: vi.fn(),
    disconnect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    frequency: { value: 440 },
    type: 'sine'
  })),
  destination: {},
  currentTime: 0,
  state: 'running',
  resume: vi.fn().mockResolvedValue(undefined)
};

// Mock AudioContext constructor
global.AudioContext = vi.fn(() => mockAudioContext);
global.webkitAudioContext = vi.fn(() => mockAudioContext);

// Mock canvas and rendering APIs
const mockCanvas = {
  getContext: vi.fn(() => ({
    fillStyle: '',
    fillRect: vi.fn(),
    strokeStyle: '',
    lineWidth: 1,
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    scale: vi.fn(),
    setLineDash: vi.fn()
  })),
  width: 300,
  height: 150,
  clientWidth: 300,
  clientHeight: 150,
  getBoundingClientRect: vi.fn(() => ({
    width: 300,
    height: 150,
    top: 0,
    left: 0,
    right: 300,
    bottom: 150
  })),
  style: {}
};

global.HTMLCanvasElement = vi.fn(() => mockCanvas);

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn()
}));

// Mock window.devicePixelRatio
Object.defineProperty(window, 'devicePixelRatio', {
  value: 1,
  writable: true
});

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  setTimeout(cb, 16);
  return 1;
});

global.cancelAnimationFrame = vi.fn();

// Mock performance.now for timing tests
global.performance = {
  now: vi.fn(() => Date.now())
};

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});

console.log('✓ Test setup complete - Web Audio API and DOM mocks initialized');