import * as Tone from 'tone';
import { clock } from './audioClock.js';

let patternLength = 16;
let scheduledEvents = new Map();
let namedEvents = new Map();
let synthPool = [];
let synthIndex = 0;
const SYNTH_POOL_SIZE = 8;
let currentScheduleTime = null;

export function cycle(beats) {
  if (beats < 1 || beats > 32) {
    throw new Error('Cycle must be between 1 and 32');
  }
  patternLength = beats;
  return patternLength;
}

export function schedule(idOrBeat, beatOrCallback, callbackOrUndefined) {
  let id, beat, callback;
  
  if (typeof idOrBeat === 'string') {
    id = idOrBeat;
    beat = beatOrCallback;
    callback = callbackOrUndefined;
  } else {
    id = null;
    beat = idOrBeat;
    callback = beatOrCallback;
  }
  
  if (beat < 0 || beat >= patternLength) {
    throw new Error(`Beat ${beat} is out of range for pattern length ${patternLength}`);
  }
  
  // Wrap callback to provide scheduling context
  const wrappedCallback = (time) => {
    currentScheduleTime = time;
    try {
      callback(time);
    } finally {
      currentScheduleTime = null;
    }
  };
  
  if (id) {
    if (namedEvents.has(id)) {
      const existingEventKey = namedEvents.get(id);
      scheduledEvents.delete(existingEventKey);
    }
    
    const eventKey = `named_${id}`;
    scheduledEvents.set(eventKey, { beat, callback: wrappedCallback, id });
    namedEvents.set(id, eventKey);
    
    return id;
  } else {
    const eventKey = `anon_${Date.now()}_${Math.random()}`;
    scheduledEvents.set(eventKey, { beat, callback: wrappedCallback });
    return eventKey;
  }
}

export function clearSchedule(id = null) {
  if (id) {
    if (namedEvents.has(id)) {
      const eventKey = namedEvents.get(id);
      scheduledEvents.delete(eventKey);
      namedEvents.delete(id);
    }
  } else {
    scheduledEvents.clear();
    namedEvents.clear();
  }
}

export function initSynthPool() {
  if (synthPool.length === 0) {
    for (let i = 0; i < SYNTH_POOL_SIZE; i++) {
      synthPool.push(new Tone.Synth({
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0,
          release: 0.1
        }
      }).toDestination());
    }
  }
  return synthPool;
}

function getNextSynth() {
  if (synthPool.length === 0) {
    initSynthPool();
  }
  const synth = synthPool[synthIndex];
  synthIndex = (synthIndex + 1) % SYNTH_POOL_SIZE;
  return synth;
}

class SynthEvent {
  constructor(freq = 440, type = 'sine') {
    this._freq = freq;
    this._attack = 0.01;
    this._decay = 0.1;
    this._sustain = 0;
    this._release = 0.1;
    this._velocity = 0.8;
    this._type = type;
    
    // Auto-play if in scheduling context
    if (currentScheduleTime !== null) {
      this.play(currentScheduleTime);
    }
  }
  
  freq(value) {
    this._freq = value;
    if (currentScheduleTime !== null) {
      this.play(currentScheduleTime);
    }
    return this;
  }
  
  dur(value) {
    // dur is total duration, split between attack and decay
    this._attack = value * 0.1; // 10% attack
    this._decay = value * 0.9;  // 90% decay
    this._sustain = 0;
    if (currentScheduleTime !== null) {
      this.play(currentScheduleTime);
    }
    return this;
  }
  
  attack(value) {
    this._attack = value;
    if (currentScheduleTime !== null) {
      this.play(currentScheduleTime);
    }
    return this;
  }
  
  decay(value) {
    this._decay = value;
    if (currentScheduleTime !== null) {
      this.play(currentScheduleTime);
    }
    return this;
  }
  
  sustain(value) {
    this._sustain = value;
    if (currentScheduleTime !== null) {
      this.play(currentScheduleTime);
    }
    return this;
  }
  
  release(value) {
    this._release = value;
    if (currentScheduleTime !== null) {
      this.play(currentScheduleTime);
    }
    return this;
  }
  
  vel(value) {
    this._velocity = value;
    if (currentScheduleTime !== null) {
      this.play(currentScheduleTime);
    }
    return this;
  }
  
  play(time) {
    const synth = getNextSynth();
    const startTime = time !== undefined ? time : Tone.now();
    
    synth.oscillator.type = this._type;
    synth.envelope.attack = this._attack;
    synth.envelope.decay = this._decay;
    synth.envelope.sustain = this._sustain;
    synth.envelope.release = this._release;
    
    // Duration is attack + decay when sustain is 0
    const duration = this._attack + this._decay;
    
    synth.triggerAttackRelease(this._freq, duration, startTime, this._velocity);
    
    return this;
  }
}

// Simplified synth functions that auto-play in schedule context
export function sine(freq = 440, dur = null) {
  const synth = new SynthEvent(freq, 'sine');
  if (dur !== null) {
    synth.dur(dur);
  }
  return synth;
}

export function saw(freq = 440, dur = null) {
  const synth = new SynthEvent(freq, 'sawtooth');
  if (dur !== null) {
    synth.dur(dur);
  }
  return synth;
}

export function square(freq = 440, dur = null) {
  const synth = new SynthEvent(freq, 'square');
  if (dur !== null) {
    synth.dur(dur);
  }
  return synth;
}

export function tri(freq = 440, dur = null) {
  const synth = new SynthEvent(freq, 'triangle');
  if (dur !== null) {
    synth.dur(dur);
  }
  return synth;
}

export function listScheduled() {
  const events = [];
  scheduledEvents.forEach((event, key) => {
    events.push({
      id: event.id || key,
      beat: event.beat,
      named: !!event.id
    });
  });
  return events.sort((a, b) => a.beat - b.beat);
}

let lastTick = -1;
clock.on('timeUpdate', (data) => {
  const currentTick = clock.ticks();
  
  if (currentTick !== lastTick) {
    const currentBeat = currentTick % patternLength;
    
    scheduledEvents.forEach((event) => {
      if (event.beat === currentBeat) {
        try {
          const preciseTime = data.time;
          event.callback(preciseTime);
        } catch (error) {
          console.error('Schedule callback error:', error);
        }
      }
    });
    
    lastTick = currentTick;
  }
});

export const sequencer = {
  cycle,
  schedule,
  clearSchedule,
  sine,
  saw,
  square,
  tri,
  initSynthPool,
  listScheduled,
  getPatternLength: () => patternLength,
  getScheduledEvents: () => Array.from(scheduledEvents.values())
};