import { describe, it, expect, beforeEach } from 'vitest';

describe('AudioContext Mock', () => {
  let audioContext;

  beforeEach(() => {
    audioContext = new global.AudioContext();
  });

  it('should initialize with correct default state', () => {
    expect(audioContext.state).toBe('running');
    expect(audioContext.currentTime).toBe(0);
    expect(audioContext.destination).toBeDefined();
  });

  it('should resume and suspend correctly', async () => {
    expect(audioContext.state).toBe('running');
    
    await audioContext.suspend();
    expect(audioContext.state).toBe('suspended');
    
    await audioContext.resume();
    expect(audioContext.state).toBe('running');
  });

  it('should create various audio nodes', () => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const analyser = audioContext.createAnalyser();
    
    expect(oscillator).toBeDefined();
    expect(gain).toBeDefined();
    expect(analyser).toBeDefined();
  });

  it('should have proper oscillator properties', () => {
    const oscillator = audioContext.createOscillator();
    expect(oscillator.frequency.value).toBe(440);
    expect(oscillator.type).toBe('sine');
  });

  it('should have proper gain properties', () => {
    const gain = audioContext.createGain();
    expect(gain.gain.value).toBe(1);
  });

  it('should have proper analyser properties', () => {
    const analyser = audioContext.createAnalyser();
    expect(analyser.fftSize).toBe(2048);
    expect(analyser.frequencyBinCount).toBe(1024);
  });
});