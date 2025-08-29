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

describe('effects chain', () => {
  let synth;

  beforeEach(() => {
    vi.clearAllMocks();
    synth = sine(440); // Start with a fresh synth for each test
  });

  describe('each effect method adds to chain', () => {
    it('should add filter effects to chain', () => {
      synth.lowpass(1000);
      expect(synth._effects).toHaveLength(1);
      expect(synth._effects[0].type).toBe('filter');
      expect(synth._effects[0].params.type).toBe('lowpass');
      expect(synth._effects[0].params.frequency).toBe(1000);

      synth.highpass(500);
      expect(synth._effects).toHaveLength(2);
      expect(synth._effects[1].type).toBe('filter');
      expect(synth._effects[1].params.type).toBe('highpass');
      expect(synth._effects[1].params.frequency).toBe(500);

      synth.bandpass(800);
      expect(synth._effects).toHaveLength(3);
      expect(synth._effects[2].type).toBe('filter');
      expect(synth._effects[2].params.type).toBe('bandpass');
      expect(synth._effects[2].params.frequency).toBe(800);
    });

    it('should add time-based effects to chain', () => {
      synth.reverb(2, 0.7);
      expect(synth._effects).toHaveLength(1);
      expect(synth._effects[0].type).toBe('reverb');
      expect(synth._effects[0].params.decay).toBe(2);
      expect(synth._effects[0].wet).toBe(0.7);

      synth.delay(0.5, 0.3, 0.6);
      expect(synth._effects).toHaveLength(2);
      expect(synth._effects[1].type).toBe('delay');
      expect(synth._effects[1].params.time).toBe(0.5);
      expect(synth._effects[1].params.feedback).toBe(0.3);
      expect(synth._effects[1].wet).toBe(0.6);

      synth.pingpong(0.25, 0.4, 0.8);
      expect(synth._effects).toHaveLength(3);
      expect(synth._effects[2].type).toBe('pingPongDelay');
      expect(synth._effects[2].params.delayTime).toBe(0.25);
      expect(synth._effects[2].params.feedback).toBe(0.4);
      expect(synth._effects[2].wet).toBe(0.8);
    });

    it('should add modulation effects to chain', () => {
      synth.chorus(1.5, 0.7, 0.5);
      expect(synth._effects).toHaveLength(1);
      expect(synth._effects[0].type).toBe('chorus');
      expect(synth._effects[0].params.frequency).toBe(1.5);
      expect(synth._effects[0].params.depth).toBe(0.7);
      expect(synth._effects[0].wet).toBe(0.5);

      synth.phaser(0.5, 3, 0.5);
      expect(synth._effects).toHaveLength(2);
      expect(synth._effects[1].type).toBe('phaser');
      expect(synth._effects[1].params.frequency).toBe(0.5);
      expect(synth._effects[1].params.octaves).toBe(3);
      expect(synth._effects[1].wet).toBe(0.5);

      synth.tremolo(10, 0.5);
      expect(synth._effects).toHaveLength(3);
      expect(synth._effects[2].type).toBe('tremolo');
      expect(synth._effects[2].params.frequency).toBe(10);
      expect(synth._effects[2].params.depth).toBe(0.5);
      expect(synth._effects[2].wet).toBe(1);

      synth.vibrato(5, 0.1);
      expect(synth._effects).toHaveLength(4);
      expect(synth._effects[3].type).toBe('vibrato');
      expect(synth._effects[3].params.frequency).toBe(5);
      expect(synth._effects[3].params.depth).toBe(0.1);
      expect(synth._effects[3].wet).toBe(1);
    });

    it('should add distortion effects to chain', () => {
      synth.distort(0.4);
      expect(synth._effects).toHaveLength(1);
      expect(synth._effects[0].type).toBe('distortion');
      expect(synth._effects[0].params.amount).toBe(0.4);
      expect(synth._effects[0].wet).toBe(1);

      synth.crush(4);
      expect(synth._effects).toHaveLength(2);
      expect(synth._effects[1].type).toBe('bitCrusher');
      expect(synth._effects[1].params.bits).toBe(4);
      expect(synth._effects[1].wet).toBe(1);

      synth.chebyshev(50);
      expect(synth._effects).toHaveLength(3);
      expect(synth._effects[2].type).toBe('chebyshev');
      expect(synth._effects[2].params.order).toBe(50);
      expect(synth._effects[2].wet).toBe(1);
    });

    it('should add auto effects to chain', () => {
      synth.autowah(100, 6, 0);
      expect(synth._effects).toHaveLength(1);
      expect(synth._effects[0].type).toBe('autoWah');
      expect(synth._effects[0].params.baseFrequency).toBe(100);
      expect(synth._effects[0].params.octaves).toBe(6);
      expect(synth._effects[0].params.sensitivity).toBe(0);
      expect(synth._effects[0].wet).toBe(1);

      synth.autofilter(1, 200);
      expect(synth._effects).toHaveLength(2);
      expect(synth._effects[1].type).toBe('autoFilter');
      expect(synth._effects[1].params.frequency).toBe(1);
      expect(synth._effects[1].params.baseFrequency).toBe(200);
      expect(synth._effects[1].wet).toBe(1);
    });
  });

  describe('effect parameters are stored correctly', () => {
    it('should store default parameters when not provided', () => {
      synth.reverb();
      expect(synth._effects[0].params.decay).toBe(1.5);
      expect(synth._effects[0].wet).toBe(0.5);

      synth.delay();
      expect(synth._effects[1].params.time).toBe(0.25);
      expect(synth._effects[1].params.feedback).toBe(0.5);
      expect(synth._effects[1].wet).toBe(0.5);

      synth.chorus();
      expect(synth._effects[2].params.frequency).toBe(1.5);
      expect(synth._effects[2].params.depth).toBe(0.7);
      expect(synth._effects[2].wet).toBe(0.5);
    });

    it('should store custom parameters correctly', () => {
      synth.lowpass(800, 2);
      expect(synth._effects[0].params.frequency).toBe(800);
      expect(synth._effects[0].params.Q).toBe(2);

      synth.reverb(3, 0.8);
      expect(synth._effects[1].params.decay).toBe(3);
      expect(synth._effects[1].wet).toBe(0.8);

      synth.delay(0.125, 0.7, 0.4);
      expect(synth._effects[2].params.time).toBe(0.125);
      expect(synth._effects[2].params.feedback).toBe(0.7);
      expect(synth._effects[2].wet).toBe(0.4);
    });

    it('should handle edge case parameter values', () => {
      synth.lowpass(0);
      expect(synth._effects[0].params.frequency).toBe(0);

      synth.reverb(0, 0);
      expect(synth._effects[1].params.decay).toBe(0);
      expect(synth._effects[1].wet).toBe(0);

      synth.delay(0, 0, 0);
      expect(synth._effects[2].params.time).toBe(0);
      expect(synth._effects[2].params.feedback).toBe(0);
      expect(synth._effects[2].wet).toBe(0);

      synth.chorus(0, 0, 0);
      expect(synth._effects[3].params.frequency).toBe(0);
      expect(synth._effects[3].params.depth).toBe(0);
      expect(synth._effects[3].wet).toBe(0);
    });

    it('should handle very large parameter values', () => {
      synth.lowpass(20000);
      expect(synth._effects[0].params.frequency).toBe(20000);

      synth.reverb(100, 1);
      expect(synth._effects[1].params.decay).toBe(100);

      synth.delay(10, 0.99, 1);
      expect(synth._effects[2].params.time).toBe(10);
      expect(synth._effects[2].params.feedback).toBe(0.99);
    });

    it('should store precise floating point values', () => {
      synth.lowpass(1234.567);
      expect(synth._effects[0].params.frequency).toBe(1234.567);

      synth.reverb(2.718281828, 0.333333);
      expect(synth._effects[1].params.decay).toBe(2.718281828);
      expect(synth._effects[1].wet).toBe(0.333333);
    });
  });

  describe('chain order is preserved', () => {
    it('should maintain order of simple effect chain', () => {
      synth
        .lowpass(1000)
        .reverb(2)
        .delay(0.5);

      expect(synth._effects).toHaveLength(3);
      expect(synth._effects[0].type).toBe('filter');
      expect(synth._effects[1].type).toBe('reverb');
      expect(synth._effects[2].type).toBe('delay');
    });

    it('should maintain order of complex effect chain', () => {
      synth
        .highpass(200)
        .distort(0.3)
        .chorus(1.2)
        .lowpass(5000)
        .reverb(1.5)
        .delay(0.25, 0.4)
        .tremolo(8, 0.3);

      expect(synth._effects).toHaveLength(7);
      
      const expectedTypes = [
        'filter',      // highpass
        'distortion',  // distort
        'chorus',      // chorus
        'filter',      // lowpass
        'reverb',      // reverb
        'delay',       // delay
        'tremolo'      // tremolo
      ];

      synth._effects.forEach((effect, index) => {
        expect(effect.type).toBe(expectedTypes[index]);
      });
    });

    it('should handle multiple filters in sequence', () => {
      synth
        .lowpass(2000)
        .highpass(100)
        .bandpass(800)
        .lowpass(1500);

      expect(synth._effects).toHaveLength(4);
      
      expect(synth._effects[0].params.type).toBe('lowpass');
      expect(synth._effects[0].params.frequency).toBe(2000);
      
      expect(synth._effects[1].params.type).toBe('highpass');
      expect(synth._effects[1].params.frequency).toBe(100);
      
      expect(synth._effects[2].params.type).toBe('bandpass');
      expect(synth._effects[2].params.frequency).toBe(800);
      
      expect(synth._effects[3].params.type).toBe('lowpass');
      expect(synth._effects[3].params.frequency).toBe(1500);
    });

    it('should handle same effect type with different parameters', () => {
      synth
        .reverb(1, 0.3)
        .reverb(3, 0.7)
        .reverb(0.5, 0.2);

      expect(synth._effects).toHaveLength(3);
      
      expect(synth._effects[0].params.decay).toBe(1);
      expect(synth._effects[0].wet).toBe(0.3);
      
      expect(synth._effects[1].params.decay).toBe(3);
      expect(synth._effects[1].wet).toBe(0.7);
      
      expect(synth._effects[2].params.decay).toBe(0.5);
      expect(synth._effects[2].wet).toBe(0.2);
    });

    it('should preserve order when mixed with parameter methods', () => {
      synth
        .freq(880)
        .lowpass(1000)
        .dur(2)
        .reverb(1.5)
        .vel(0.9)
        .delay(0.25);

      expect(synth._effects).toHaveLength(3);
      expect(synth._effects[0].type).toBe('filter');
      expect(synth._effects[1].type).toBe('reverb');
      expect(synth._effects[2].type).toBe('delay');
      
      // Parameter methods should still work
      expect(synth._freq).toBe(880);
      expect(synth._velocity).toBe(0.9);
    });
  });

  describe('no side effects during chaining', () => {
    it('should not modify synth parameters when adding effects', () => {
      const originalFreq = synth._freq;
      const originalAttack = synth._attack;
      const originalVelocity = synth._velocity;
      const originalType = synth._type;

      synth
        .lowpass(1000)
        .reverb(2)
        .delay(0.5);

      expect(synth._freq).toBe(originalFreq);
      expect(synth._attack).toBe(originalAttack);
      expect(synth._velocity).toBe(originalVelocity);
      expect(synth._type).toBe(originalType);
    });

    it('should not affect other synth instances', () => {
      const synth2 = saw(880);
      
      synth
        .lowpass(1000)
        .reverb(2);
      
      synth2
        .highpass(500)
        .delay(0.25);

      expect(synth._effects).toHaveLength(2);
      expect(synth2._effects).toHaveLength(2);
      
      expect(synth._effects[0].type).toBe('filter');
      expect(synth._effects[0].params.type).toBe('lowpass');
      
      expect(synth2._effects[0].type).toBe('filter');
      expect(synth2._effects[0].params.type).toBe('highpass');
    });

    it('should not affect played state during effect chaining', () => {
      expect(synth._played).toBe(false);
      
      synth
        .lowpass(1000)
        .reverb(2)
        .delay(0.5);

      expect(synth._played).toBe(false);
    });

    it('should maintain immutable effect chain', () => {
      synth.lowpass(1000);
      const firstEffectsBefore = [...synth._effects];
      
      synth.reverb(2);
      
      // Original effects should not be modified
      expect(firstEffectsBefore).toHaveLength(1);
      expect(firstEffectsBefore[0].type).toBe('filter');
      
      // New effects should be added
      expect(synth._effects).toHaveLength(2);
      expect(synth._effects[0]).toEqual(firstEffectsBefore[0]);
      expect(synth._effects[1].type).toBe('reverb');
    });

    it('should return same instance reference for chaining', () => {
      const result1 = synth.lowpass(1000);
      const result2 = result1.reverb(2);
      const result3 = result2.delay(0.5);

      expect(result1).toBe(synth);
      expect(result2).toBe(synth);
      expect(result3).toBe(synth);
    });

    it('should not trigger play during effect chaining', () => {
      // Mock the play method to track calls
      synth.play = vi.fn().mockReturnValue(synth);
      
      synth
        .lowpass(1000)
        .reverb(2)
        .delay(0.5);

      expect(synth.play).not.toHaveBeenCalled();
    });
  });

  describe('effects work with all waveform types', () => {
    it('should work identically with sine, saw, square, and tri', () => {
      const synths = [
        sine(440),
        saw(440),
        square(440),
        tri(440)
      ];

      synths.forEach((testSynth, index) => {
        testSynth
          .lowpass(1000)
          .reverb(2, 0.7)
          .delay(0.25, 0.5, 0.6);

        expect(testSynth._effects).toHaveLength(3);
        expect(testSynth._effects[0].type).toBe('filter');
        expect(testSynth._effects[1].type).toBe('reverb');
        expect(testSynth._effects[2].type).toBe('delay');
      });
    });

    it('should preserve waveform type when effects are applied', () => {
      const sineWith = sine(440).lowpass(1000).reverb(2);
      const sawWith = saw(440).lowpass(1000).reverb(2);
      const squareWith = square(440).lowpass(1000).reverb(2);
      const triWith = tri(440).lowpass(1000).reverb(2);

      expect(sineWith._type).toBe('sine');
      expect(sawWith._type).toBe('sawtooth');
      expect(squareWith._type).toBe('square');
      expect(triWith._type).toBe('triangle');
    });
  });

  describe('complex real-world effect chains', () => {
    it('should handle typical lead synth chain', () => {
      const lead = sine(880)
        .dur(1.5)
        .attack(0.1)
        .highpass(200)
        .lowpass(8000)
        .distort(0.2)
        .chorus(1.2, 0.4)
        .delay(0.125, 0.3, 0.4)
        .reverb(2, 0.3)
        .vel(0.8);

      expect(lead._effects).toHaveLength(6);
      expect(lead._freq).toBe(880);
      expect(lead._velocity).toBe(0.8);
      expect(lead._attack).toBe(0.1);
    });

    it('should handle typical bass synth chain', () => {
      const bass = saw(110)
        .dur(0.5)
        .lowpass(400)
        .distort(0.1)
        .vel(0.9);

      expect(bass._effects).toHaveLength(2); // lowpass and distort
      expect(bass._freq).toBe(110);
      expect(bass._velocity).toBe(0.9);
    });

    it('should handle experimental effect chain', () => {
      const experimental = square(220)
        .crush(6)
        .autofilter(2, 300)
        .phaser(0.3, 4)
        .pingpong(0.0625, 0.8)
        .chebyshev(25)
        .tremolo(16, 0.7)
        .reverb(8, 0.9);

      expect(experimental._effects).toHaveLength(7);
      expect(experimental._type).toBe('square');
      expect(experimental._freq).toBe(220);
    });
  });
});