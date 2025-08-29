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

import { cycle, sequencer } from '../../../src/lib/sequencer.js';

describe('cycle function', () => {
  beforeEach(() => {
    // Reset pattern length to default before each test
    sequencer.cycle(16);
  });

  describe('valid range', () => {
    it('should accept minimum value of 1', () => {
      const result = cycle(1);
      expect(result).toBe(1);
      expect(sequencer.getPatternLength()).toBe(1);
    });

    it('should accept maximum value of 32', () => {
      const result = cycle(32);
      expect(result).toBe(32);
      expect(sequencer.getPatternLength()).toBe(32);
    });

    it('should accept values in the middle range', () => {
      const testValues = [4, 8, 16, 24];
      
      testValues.forEach(value => {
        const result = cycle(value);
        expect(result).toBe(value);
        expect(sequencer.getPatternLength()).toBe(value);
      });
    });

    it('should return the current pattern length', () => {
      cycle(8);
      const currentLength = sequencer.getPatternLength();
      expect(currentLength).toBe(8);
    });
  });

  describe('error handling for out of range', () => {
    it('should throw error for values less than 1', () => {
      expect(() => cycle(0)).toThrow('Cycle must be between 1 and 32');
      expect(() => cycle(-1)).toThrow('Cycle must be between 1 and 32');
      expect(() => cycle(-10)).toThrow('Cycle must be between 1 and 32');
    });

    it('should throw error for values greater than 32', () => {
      expect(() => cycle(33)).toThrow('Cycle must be between 1 and 32');
      expect(() => cycle(50)).toThrow('Cycle must be between 1 and 32');
      expect(() => cycle(100)).toThrow('Cycle must be between 1 and 32');
    });

    it('should handle floating point numbers that are effectively integers', () => {
      // The cycle function accepts 1.5, 16.7 etc. as valid (ToneJS handles this)
      // So let's test that it works but doesn't validate integers strictly
      expect(() => cycle(1.5)).not.toThrow();
      expect(() => cycle(16.7)).not.toThrow();
      
      // But still fails for clearly out of range
      expect(() => cycle(0.5)).toThrow('Cycle must be between 1 and 32');
      expect(() => cycle(32.1)).toThrow('Cycle must be between 1 and 32');
    });

    it('should maintain previous pattern length when error occurs', () => {
      cycle(16); // Set to a valid value first
      
      try {
        cycle(50); // Try invalid value
      } catch (e) {
        // Expected to throw
      }
      
      // Should still be the previous valid value
      expect(sequencer.getPatternLength()).toBe(16);
    });
  });

  describe('pattern length updates', () => {
    it('should update pattern length immediately', () => {
      // Start with default
      expect(sequencer.getPatternLength()).toBe(16);
      
      // Change to 8
      cycle(8);
      expect(sequencer.getPatternLength()).toBe(8);
      
      // Change to 4
      cycle(4);
      expect(sequencer.getPatternLength()).toBe(4);
      
      // Change to 32
      cycle(32);
      expect(sequencer.getPatternLength()).toBe(32);
    });

    it('should affect scheduled event validation', () => {
      // Set cycle to 8
      cycle(8);
      
      // Should be able to schedule events up to beat 7 (0-indexed)
      expect(() => sequencer.schedule(7, () => {})).not.toThrow();
      
      // Should not be able to schedule event at beat 8 or higher
      expect(() => sequencer.schedule(8, () => {})).toThrow();
    });

    it('should handle multiple rapid changes correctly', () => {
      const values = [1, 16, 4, 32, 8, 2];
      
      values.forEach(value => {
        cycle(value);
        expect(sequencer.getPatternLength()).toBe(value);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle setting the same value multiple times', () => {
      cycle(16);
      cycle(16);
      cycle(16);
      
      expect(sequencer.getPatternLength()).toBe(16);
    });

    it('should work with floating point numbers that are integers', () => {
      cycle(16.0);
      expect(sequencer.getPatternLength()).toBe(16);
    });
  });
});