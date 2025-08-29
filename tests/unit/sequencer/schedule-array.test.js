import { describe, it, expect, beforeEach, vi } from 'vitest';
import { schedule, clearSchedule, cycle, listScheduled } from '../../../src/lib/sequencer.js';

describe('Schedule with Array of Beats', () => {
  beforeEach(() => {
    clearSchedule();
    cycle(16); // Default pattern length
  });

  describe('Basic array scheduling', () => {
    it('should schedule event on multiple beats with array', () => {
      const callback = vi.fn();
      schedule('test', [0, 4, 8, 12], callback);
      
      const scheduled = listScheduled();
      expect(scheduled).toHaveLength(4);
      expect(scheduled.map(s => s.beat)).toEqual([0, 4, 8, 12]);
    });

    it('should work with single beat in array', () => {
      const callback = vi.fn();
      schedule('test', [5], callback);
      
      const scheduled = listScheduled();
      expect(scheduled).toHaveLength(1);
      expect(scheduled[0].beat).toBe(5);
    });

    it('should work with floats in array', () => {
      const callback = vi.fn();
      schedule('test', [1.5, 3.75, 7.25], callback);
      
      const scheduled = listScheduled();
      expect(scheduled).toHaveLength(3);
      expect(scheduled.map(s => s.beat)).toEqual([1.5, 3.75, 7.25]);
    });

    it('should still work with single number (not array)', () => {
      const callback = vi.fn();
      schedule('test', 7, callback);
      
      const scheduled = listScheduled();
      expect(scheduled).toHaveLength(1);
      expect(scheduled[0].beat).toBe(7);
    });
  });

  describe('Named events with arrays', () => {
    it('should replace all beats when rescheduling named event', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      schedule('pattern', [0, 2, 4], callback1);
      let scheduled = listScheduled();
      expect(scheduled).toHaveLength(3);
      
      schedule('pattern', [1, 3, 5, 7], callback2);
      scheduled = listScheduled();
      expect(scheduled).toHaveLength(4);
      expect(scheduled.map(s => s.beat)).toEqual([1, 3, 5, 7]);
    });

    it('should clear all beats for named event', () => {
      const callback = vi.fn();
      schedule('drums', [0, 4, 8, 12], callback);
      
      expect(listScheduled()).toHaveLength(4);
      
      clearSchedule('drums');
      expect(listScheduled()).toHaveLength(0);
    });

    it('should handle multiple named patterns independently', () => {
      schedule('kick', [0, 8], () => {});
      schedule('snare', [4, 12], () => {});
      schedule('hat', [2, 6, 10, 14], () => {});
      
      const scheduled = listScheduled();
      expect(scheduled).toHaveLength(8);
      
      clearSchedule('snare');
      expect(listScheduled()).toHaveLength(6);
      
      clearSchedule('kick');
      expect(listScheduled()).toHaveLength(4);
    });
  });

  describe('Anonymous events with arrays', () => {
    it('should create multiple anonymous events', () => {
      const callback = vi.fn();
      const result = schedule([1, 5, 9], callback);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(3);
      
      const scheduled = listScheduled();
      expect(scheduled).toHaveLength(3);
      expect(scheduled.map(s => s.beat)).toEqual([1, 5, 9]);
    });

    it('should not interfere with other anonymous events', () => {
      schedule([0, 4], () => {});
      schedule([2, 6], () => {});
      
      const scheduled = listScheduled();
      expect(scheduled).toHaveLength(4);
      expect(scheduled.map(s => s.beat).sort((a, b) => a - b)).toEqual([0, 2, 4, 6]);
    });
  });

  describe('Edge cases and validation', () => {
    it('should validate all beats in array', () => {
      expect(() => {
        schedule('test', [0, 20, 4], () => {});
      }).toThrow('Beat 20 is out of range for pattern length 16');
    });

    it('should reject non-number values in array', () => {
      expect(() => {
        schedule('test', [0, 'foo', 4], () => {});
      }).toThrow('Beat must be a number');
    });

    it('should handle empty array gracefully', () => {
      const callback = vi.fn();
      schedule('test', [], callback);
      
      const scheduled = listScheduled();
      expect(scheduled).toHaveLength(0);
    });

    it('should work with different pattern lengths', () => {
      cycle(8);
      schedule('test', [0, 2, 4, 6], () => {});
      
      expect(listScheduled()).toHaveLength(4);
      
      expect(() => {
        schedule('test2', [0, 2, 4, 8], () => {});
      }).toThrow('Beat 8 is out of range for pattern length 8');
    });

    it('should handle duplicate beats in array', () => {
      schedule('test', [0, 2, 2, 4, 4, 4], () => {});
      
      const scheduled = listScheduled();
      expect(scheduled).toHaveLength(6); // All duplicates are scheduled
      
      const beats = scheduled.map(s => s.beat);
      expect(beats.filter(b => b === 2)).toHaveLength(2);
      expect(beats.filter(b => b === 4)).toHaveLength(3);
    });
  });

  describe('Practical musical patterns', () => {
    it('should create a basic drum pattern', () => {
      schedule('kick', [0, 8], () => {});
      schedule('snare', [4, 12], () => {});
      schedule('hihat', [0, 2, 4, 6, 8, 10, 12, 14], () => {});
      
      const scheduled = listScheduled();
      expect(scheduled).toHaveLength(12);
    });

    it('should create polyrhythmic patterns', () => {
      cycle(12); // 12 beat pattern
      
      // 3 against 4 polyrhythm
      schedule('pattern1', [0, 3, 6, 9], () => {}); // Every 3 beats
      schedule('pattern2', [0, 4, 8], () => {}); // Every 4 beats
      
      const scheduled = listScheduled();
      expect(scheduled).toHaveLength(7);
    });

    it('should support euclidean rhythm patterns', () => {
      // Euclidean rhythm E(5,8) = [1,0,1,0,1,1,0,1]
      const euclidean_5_8 = [0, 2, 4, 5, 7];
      schedule('euclidean', euclidean_5_8, () => {});
      
      expect(listScheduled().map(s => s.beat)).toEqual(euclidean_5_8);
    });
  });
});