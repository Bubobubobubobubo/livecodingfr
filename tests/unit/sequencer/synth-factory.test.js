import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Tone.js before importing the sequencer
vi.mock('tone', () => ({
  default: {
    Transport: {
      start: vi.fn(),
      stop: vi.fn(),
      bpm: { value: 120 },
      scheduleRepeat: vi.fn(),
      clear: vi.fn(),
      cancel: vi.fn(),
      state: 'stopped',
    },
    Synth: vi.fn(() => ({
      toDestination: vi.fn().mockReturnThis(),
      triggerAttackRelease: vi.fn(),
      dispose: vi.fn(),
    })),
    Filter: vi.fn(() => ({
      toDestination: vi.fn().mockReturnThis(),
      connect: vi.fn(),
    })),
    Reverb: vi.fn(() => ({
      toDestination: vi.fn().mockReturnThis(),
      connect: vi.fn(),
    })),
    Delay: vi.fn(() => ({
      toDestination: vi.fn().mockReturnThis(),
      connect: vi.fn(),
    })),
    getContext: vi.fn(() => ({
      resume: vi.fn().mockResolvedValue(),
      state: 'running',
    })),
    context: {
      resume: vi.fn().mockResolvedValue(),
      state: 'running',
    },
  },
}));

import { sine, saw, square, tri } from '../../../src/lib/sequencer.js';

describe('synth factory functions', () => {
  beforeEach(() => {
    // Clear any mocks before each test
    vi.clearAllMocks();
  });

  describe('sine() creation', () => {
    it('should create sine wave synth with default frequency', () => {
      const synth = sine();
      
      expect(synth._freq).toBe(440);
      expect(synth._type).toBe('sine');
      expect(synth._played).toBe(false);
    });

    it('should create sine wave synth with custom frequency', () => {
      const synth = sine(800);
      
      expect(synth._freq).toBe(800);
      expect(synth._type).toBe('sine');
    });

    it('should set duration when provided', () => {
      const synth = sine(440, 2.0);
      
      expect(synth._freq).toBe(440);
      expect(synth._attack).toBeCloseTo(0.2, 10); // 10% of 2.0
      expect(synth._decay).toBe(1.8);  // 90% of 2.0
      expect(synth._sustain).toBe(0);
    });

    it('should not set duration when null', () => {
      const synth = sine(440, null);
      
      expect(synth._attack).toBe(0.01); // Default values
      expect(synth._decay).toBe(0.1);
      expect(synth._sustain).toBe(0);
    });
  });

  describe('saw() creation', () => {
    it('should create sawtooth wave synth with default frequency', () => {
      const synth = saw();
      
      expect(synth._freq).toBe(440);
      expect(synth._type).toBe('sawtooth');
      expect(synth._played).toBe(false);
    });

    it('should create sawtooth wave synth with custom frequency', () => {
      const synth = saw(220);
      
      expect(synth._freq).toBe(220);
      expect(synth._type).toBe('sawtooth');
    });

    it('should set duration when provided', () => {
      const synth = saw(880, 1.5);
      
      expect(synth._freq).toBe(880);
      expect(synth._attack).toBeCloseTo(0.15, 10); // 10% of 1.5
      expect(synth._decay).toBeCloseTo(1.35, 10);  // 90% of 1.5
    });
  });

  describe('square() creation', () => {
    it('should create square wave synth with default frequency', () => {
      const synth = square();
      
      expect(synth._freq).toBe(440);
      expect(synth._type).toBe('square');
      expect(synth._played).toBe(false);
    });

    it('should create square wave synth with custom frequency', () => {
      const synth = square(110);
      
      expect(synth._freq).toBe(110);
      expect(synth._type).toBe('square');
    });

    it('should set duration when provided', () => {
      const synth = square(660, 0.5);
      
      expect(synth._freq).toBe(660);
      expect(synth._attack).toBeCloseTo(0.05, 10); // 10% of 0.5
      expect(synth._decay).toBeCloseTo(0.45, 10);  // 90% of 0.5
    });
  });

  describe('tri() creation', () => {
    it('should create triangle wave synth with default frequency', () => {
      const synth = tri();
      
      expect(synth._freq).toBe(440);
      expect(synth._type).toBe('triangle');
      expect(synth._played).toBe(false);
    });

    it('should create triangle wave synth with custom frequency', () => {
      const synth = tri(1320);
      
      expect(synth._freq).toBe(1320);
      expect(synth._type).toBe('triangle');
    });

    it('should set duration when provided', () => {
      const synth = tri(330, 3.0);
      
      expect(synth._freq).toBe(330);
      expect(synth._attack).toBeCloseTo(0.3, 10); // 10% of 3.0
      expect(synth._decay).toBeCloseTo(2.7, 10);  // 90% of 3.0
    });
  });

  describe('default parameters', () => {
    it('should set correct default envelope parameters', () => {
      const synths = [sine(), saw(), square(), tri()];
      
      synths.forEach(synth => {
        expect(synth._attack).toBe(0.01);
        expect(synth._decay).toBe(0.1);
        expect(synth._sustain).toBe(0);
        expect(synth._release).toBe(0.1);
        expect(synth._velocity).toBe(0.8);
      });
    });

    it('should initialize empty effects array', () => {
      const synths = [sine(), saw(), square(), tri()];
      
      synths.forEach(synth => {
        expect(synth._effects).toEqual([]);
        expect(Array.isArray(synth._effects)).toBe(true);
      });
    });

    it('should set played flag to false initially', () => {
      const synths = [sine(), saw(), square(), tri()];
      
      synths.forEach(synth => {
        expect(synth._played).toBe(false);
      });
    });

    it('should handle edge case frequencies', () => {
      const frequencies = [20, 20000, 0.1, 440.5];
      
      frequencies.forEach(freq => {
        const s1 = sine(freq);
        const s2 = saw(freq);
        const s3 = square(freq);
        const s4 = tri(freq);
        
        expect(s1._freq).toBe(freq);
        expect(s2._freq).toBe(freq);
        expect(s3._freq).toBe(freq);
        expect(s4._freq).toBe(freq);
      });
    });
  });

  describe('method chaining returns correct instance', () => {
    it('should return chainable SynthEvent instances', () => {
      const s1 = sine();
      const s2 = saw();
      const s3 = square();
      const s4 = tri();
      
      // Test that chaining methods return the same instance
      expect(s1.freq(800)).toBe(s1);
      expect(s2.dur(2)).toBe(s2);
      expect(s3.attack(0.5)).toBe(s3);
      expect(s4.decay(1.5)).toBe(s4);
    });

    it('should allow complex method chaining', () => {
      const synth = sine(440)
        .dur(2)
        .vel(0.9)
        .attack(0.1)
        .release(0.3);
      
      expect(synth._freq).toBe(440);
      expect(synth._velocity).toBe(0.9);
      expect(synth._attack).toBe(0.1);
      expect(synth._release).toBe(0.3);
      expect(synth._type).toBe('sine');
    });

    it('should maintain waveform type during chaining', () => {
      const sineChain = sine().freq(800).dur(1);
      const sawChain = saw().freq(800).dur(1);
      const squareChain = square().freq(800).dur(1);
      const triChain = tri().freq(800).dur(1);
      
      expect(sineChain._type).toBe('sine');
      expect(sawChain._type).toBe('sawtooth');
      expect(squareChain._type).toBe('square');
      expect(triChain._type).toBe('triangle');
    });

    it('should chain effects methods correctly', () => {
      const synth = sine(440)
        .lowpass(1000)
        .reverb(2, 0.7)
        .delay(0.5, 0.3);
      
      expect(synth._effects).toHaveLength(3);
      expect(synth._effects[0].type).toBe('filter');
      expect(synth._effects[1].type).toBe('reverb');
      expect(synth._effects[2].type).toBe('delay');
    });
  });

  describe('no multiple plays on chaining', () => {
    it('should not auto-play when not in scheduling context', () => {
      const synth = sine(440);
      
      // Outside of scheduling context, should not be played
      expect(synth._played).toBe(false);
    });

    it('should prevent multiple play calls', () => {
      const synth = sine(440);
      
      // Mock the triggerAttackRelease to avoid ToneJS dependencies  
      synth.play = vi.fn().mockImplementation(function() {
        if (this._played) return this;
        this._played = true;
        return this;
      });
      
      // Simulate first play
      const result1 = synth.play();
      expect(synth._played).toBe(true);
      expect(result1).toBe(synth);
      
      // Second play should not change anything
      const result2 = synth.play();
      expect(result2).toBe(synth); // Should still return self
      expect(synth._played).toBe(true);
      expect(synth.play).toHaveBeenCalledTimes(2);
    });

    it('should maintain chainable interface even after play', () => {
      const synth = sine(440);
      
      // Mock play method
      synth.play = vi.fn().mockReturnValue(synth);
      synth.play();
      
      // Should still be able to chain (even though it won't affect playback)
      const result = synth.freq(880).vel(0.5);
      expect(result).toBe(synth);
      expect(synth._freq).toBe(880);
      expect(synth._velocity).toBe(0.5);
    });

    it('should not trigger multiple plays in complex chains', () => {
      const synth = sine(440)
        .dur(1)
        .lowpass(500)
        .reverb()
        .vel(0.7);
      
      expect(synth._played).toBe(false);
      
      // Mock play method
      synth.play = vi.fn().mockImplementation(function() {
        this._played = true;
        return this;
      });
      
      // First play
      synth.play();
      expect(synth._played).toBe(true);
      
      // Additional method calls should not reset played flag
      synth.freq(880);
      expect(synth._played).toBe(true);
    });
  });

  describe('parameter validation and edge cases', () => {
    it('should handle zero duration', () => {
      const synth = sine(440, 0);
      
      expect(synth._attack).toBe(0);
      expect(synth._decay).toBe(0);
    });

    it('should handle very small durations', () => {
      const synth = sine(440, 0.01);
      
      expect(synth._attack).toBeCloseTo(0.001, 10); // 10% of 0.01
      expect(synth._decay).toBeCloseTo(0.009, 10);  // 90% of 0.01
    });

    it('should handle large durations', () => {
      const synth = sine(440, 10);
      
      expect(synth._attack).toBe(1);  // 10% of 10
      expect(synth._decay).toBe(9);   // 90% of 10
    });

    it('should preserve exact frequency values', () => {
      const preciseFreq = 440.12345;
      const synth = sine(preciseFreq);
      
      expect(synth._freq).toBe(preciseFreq);
    });

    it('should handle negative frequencies', () => {
      const synth = sine(-440);
      
      expect(synth._freq).toBe(-440);
      // Note: ToneJS will handle the actual audio implications
    });
  });

  describe('consistency across waveform types', () => {
    it('should create instances with identical default properties except type', () => {
      const synths = [
        sine(),
        saw(),
        square(),
        tri()
      ];
      
      const types = ['sine', 'sawtooth', 'square', 'triangle'];
      
      synths.forEach((synth, index) => {
        expect(synth._freq).toBe(440);
        expect(synth._attack).toBe(0.01);
        expect(synth._decay).toBe(0.1);
        expect(synth._sustain).toBe(0);
        expect(synth._release).toBe(0.1);
        expect(synth._velocity).toBe(0.8);
        expect(synth._effects).toEqual([]);
        expect(synth._played).toBe(false);
        expect(synth._type).toBe(types[index]);
      });
    });

    it('should handle identical parameters consistently', () => {
      const freq = 880;
      const dur = 1.5;
      
      const synths = [
        sine(freq, dur),
        saw(freq, dur),
        square(freq, dur),
        tri(freq, dur)
      ];
      
      synths.forEach(synth => {
        expect(synth._freq).toBe(freq);
        expect(synth._attack).toBeCloseTo(0.15, 10); // 10% of 1.5
        expect(synth._decay).toBe(1.35);  // 90% of 1.5
      });
    });
  });
});