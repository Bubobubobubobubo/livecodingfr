import { describe, it, expect, beforeEach } from 'vitest';

describe('Sequencer Setup Test', () => {
  beforeEach(() => {
    // Clear any previous state
  });

  it('should have access to testing framework', () => {
    expect(expect).toBeDefined();
    expect(describe).toBeDefined();
    expect(it).toBeDefined();
  });

  it('should have access to AudioContext mock', () => {
    expect(global.AudioContext).toBeDefined();
    expect(typeof global.AudioContext).toBe('function');
  });

  it('should create AudioContext mock successfully', () => {
    const audioContext = new global.AudioContext();
    expect(audioContext).toBeDefined();
    expect(audioContext.state).toBe('running');
    expect(audioContext.currentTime).toBe(0);
  });

  it('should create oscillator node with proper methods', () => {
    const audioContext = new global.AudioContext();
    const oscillator = audioContext.createOscillator();
    
    expect(oscillator.frequency.value).toBe(440);
    expect(oscillator.type).toBe('sine');
    expect(oscillator.connect).toBeDefined();
    expect(oscillator.disconnect).toBeDefined();
    expect(oscillator.start).toBeDefined();
    expect(oscillator.stop).toBeDefined();
  });

  it('should provide performance.now for timing', () => {
    expect(performance.now).toBeDefined();
    expect(typeof performance.now()).toBe('number');
  });
});