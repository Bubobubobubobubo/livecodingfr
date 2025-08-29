import * as Tone from 'tone';
import { clock } from './audioClock.js';

let patternLength = 16;
let scheduledEvents = new Map();
let namedEvents = new Map();
let synthPool = [];
let synthIndex = 0;
const SYNTH_POOL_SIZE = 8;
let currentScheduleTime = null;

// Effects pools
const effectsPools = {
  reverb: [],
  delay: [],
  filter: [],
  distortion: [],
  chorus: [],
  phaser: [],
  tremolo: [],
  vibrato: [],
  autoFilter: [],
  autoWah: [],
  bitCrusher: [],
  chebyshev: [],
  pingPongDelay: []
};

const EFFECTS_POOL_SIZE = 4;

function getEffect(type, params = {}) {
  if (!effectsPools[type]) {
    effectsPools[type] = [];
  }
  
  let effect = effectsPools[type].find(e => !e.inUse);
  
  if (!effect) {
    // Create new effect based on type
    switch(type) {
      case 'reverb':
        effect = new Tone.Reverb(params.decay || 1.5);
        break;
      case 'delay':
        effect = new Tone.FeedbackDelay(params.time || 0.25, params.feedback || 0.5);
        break;
      case 'filter':
        effect = new Tone.Filter(params.frequency || 1000, params.type || 'lowpass');
        break;
      case 'distortion':
        effect = new Tone.Distortion(params.amount || 0.4);
        break;
      case 'chorus':
        effect = new Tone.Chorus(params.frequency || 1.5, params.delayTime || 3.5, params.depth || 0.7);
        break;
      case 'phaser':
        effect = new Tone.Phaser({
          frequency: params.frequency || 0.5,
          octaves: params.octaves || 3,
          baseFrequency: params.baseFrequency || 350
        });
        break;
      case 'tremolo':
        effect = new Tone.Tremolo(params.frequency || 10, params.depth || 0.5);
        break;
      case 'vibrato':
        effect = new Tone.Vibrato(params.frequency || 5, params.depth || 0.1);
        break;
      case 'autoFilter':
        effect = new Tone.AutoFilter(params.frequency || 1, params.baseFrequency || 200);
        break;
      case 'autoWah':
        effect = new Tone.AutoWah(params.baseFrequency || 100, params.octaves || 6, params.sensitivity || 0);
        break;
      case 'bitCrusher':
        effect = new Tone.BitCrusher(params.bits || 4);
        break;
      case 'chebyshev':
        effect = new Tone.Chebyshev(params.order || 50);
        break;
      case 'pingPongDelay':
        effect = new Tone.PingPongDelay(params.delayTime || 0.25, params.feedback || 0.5);
        break;
    }
    
    effect.inUse = false;
    effectsPools[type].push(effect);
  }
  
  // Update parameters
  switch(type) {
    case 'reverb':
      if (params.decay !== undefined) effect.decay = params.decay;
      break;
    case 'delay':
      if (params.time !== undefined) effect.delayTime.value = params.time;
      if (params.feedback !== undefined) effect.feedback.value = params.feedback;
      break;
    case 'filter':
      if (params.frequency !== undefined) effect.frequency.value = params.frequency;
      if (params.type !== undefined) effect.type = params.type;
      break;
    case 'distortion':
      if (params.amount !== undefined) effect.distortion = params.amount;
      break;
    case 'chorus':
      if (params.frequency !== undefined) effect.frequency.value = params.frequency;
      if (params.depth !== undefined) effect.depth = params.depth;
      break;
    case 'phaser':
      if (params.frequency !== undefined) effect.frequency.value = params.frequency;
      break;
    case 'tremolo':
      if (params.frequency !== undefined) effect.frequency.value = params.frequency;
      if (params.depth !== undefined) effect.depth.value = params.depth;
      break;
    case 'vibrato':
      if (params.frequency !== undefined) effect.frequency.value = params.frequency;
      if (params.depth !== undefined) effect.depth.value = params.depth;
      break;
    case 'autoFilter':
      if (params.frequency !== undefined) effect.frequency.value = params.frequency;
      break;
    case 'bitCrusher':
      if (params.bits !== undefined) effect.bits.value = params.bits;
      break;
  }
  
  effect.inUse = true;
  
  // Auto-release after sound duration
  setTimeout(() => {
    effect.inUse = false;
  }, 5000);
  
  return effect;
}

export function cycle(beats) {
  if (beats < 1 || beats > 32) {
    throw new Error('Cycle must be between 1 and 32');
  }
  patternLength = beats;
  return patternLength;
}

export function schedule(idOrBeat, beatOrCallback, callbackOrUndefined) {
  let id, beats, callback;
  
  if (typeof idOrBeat === 'string') {
    id = idOrBeat;
    beats = beatOrCallback;
    callback = callbackOrUndefined;
  } else {
    id = null;
    beats = idOrBeat;
    callback = beatOrCallback;
  }
  
  // Normalize beats to array
  if (!Array.isArray(beats)) {
    beats = [beats];
  }
  
  // Validate all beats
  for (const beat of beats) {
    if (typeof beat !== 'number') {
      throw new Error(`Beat must be a number, got ${typeof beat}`);
    }
    if (beat < 0 || beat >= patternLength) {
      throw new Error(`Beat ${beat} is out of range for pattern length ${patternLength}`);
    }
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
  
  const eventKeys = [];
  
  if (id) {
    // Clear existing events with this id
    if (namedEvents.has(id)) {
      const existingKeys = namedEvents.get(id);
      const keysArray = Array.isArray(existingKeys) ? existingKeys : [existingKeys];
      keysArray.forEach(key => scheduledEvents.delete(key));
    }
    
    const newKeys = [];
    beats.forEach((beat, index) => {
      const eventKey = `named_${id}_${index}`;
      scheduledEvents.set(eventKey, { beat, callback: wrappedCallback, id });
      newKeys.push(eventKey);
      eventKeys.push(eventKey);
    });
    
    namedEvents.set(id, newKeys);
    return id;
  } else {
    // Anonymous events
    beats.forEach(beat => {
      const eventKey = `anon_${Date.now()}_${Math.random()}`;
      scheduledEvents.set(eventKey, { beat, callback: wrappedCallback });
      eventKeys.push(eventKey);
    });
    return eventKeys;
  }
}

export function clearSchedule(id = null) {
  if (id) {
    if (namedEvents.has(id)) {
      const eventKeys = namedEvents.get(id);
      const keysArray = Array.isArray(eventKeys) ? eventKeys : [eventKeys];
      keysArray.forEach(key => scheduledEvents.delete(key));
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
      }));
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
    this._effects = [];
    this._played = false;
    this._scheduleTime = null;
    this._autoPlayTimeout = null;
    
    // Auto-play if in scheduling context
    if (currentScheduleTime !== null) {
      this._scheduleTime = currentScheduleTime;
      // Use setTimeout instead of Promise.resolve for better cross-platform compatibility
      this._autoPlayTimeout = setTimeout(() => {
        if (!this._played && this._scheduleTime !== null) {
          this.play(this._scheduleTime);
        }
      }, 0);
    }
  }
  
  _deferAutoPlay() {
    // Cancel existing timeout and reschedule to allow for method chaining
    if (this._autoPlayTimeout) {
      clearTimeout(this._autoPlayTimeout);
    }
    if (this._scheduleTime !== null && !this._played) {
      this._autoPlayTimeout = setTimeout(() => {
        if (!this._played && this._scheduleTime !== null) {
          this.play(this._scheduleTime);
        }
      }, 0);
    }
  }
  
  freq(value) {
    this._freq = value;
    this._deferAutoPlay();
    return this;
  }
  
  dur(value) {
    // dur is total duration, split between attack and decay
    this._attack = value * 0.1; // 10% attack
    this._decay = value * 0.9;  // 90% decay
    this._sustain = 0;
    this._deferAutoPlay();
    return this;
  }
  
  attack(value) {
    this._attack = value;
    this._deferAutoPlay();
    return this;
  }
  
  decay(value) {
    this._decay = value;
    this._deferAutoPlay();
    return this;
  }
  
  sustain(value) {
    this._sustain = value;
    this._deferAutoPlay();
    return this;
  }
  
  release(value) {
    this._release = value;
    this._deferAutoPlay();
    return this;
  }
  
  vel(value) {
    this._velocity = value;
    this._deferAutoPlay();
    return this;
  }
  
  // Filter effects
  lowpass(freq, q) {
    this._effects.push({ type: 'filter', params: { frequency: freq, type: 'lowpass', Q: q } });
    this._deferAutoPlay();
    return this;
  }
  
  highpass(freq, q) {
    this._effects.push({ type: 'filter', params: { frequency: freq, type: 'highpass', Q: q } });
    this._deferAutoPlay();
    return this;
  }
  
  bandpass(freq, q) {
    this._effects.push({ type: 'filter', params: { frequency: freq, type: 'bandpass', Q: q } });
    this._deferAutoPlay();
    return this;
  }
  
  // Time-based effects
  reverb(decay = 1.5, wet = 0.5) {
    this._effects.push({ type: 'reverb', params: { decay }, wet });
    this._deferAutoPlay();
    return this;
  }
  
  delay(time = 0.25, feedback = 0.5, wet = 0.5) {
    this._effects.push({ type: 'delay', params: { time, feedback }, wet });
    this._deferAutoPlay();
    return this;
  }
  
  pingpong(time = 0.25, feedback = 0.5, wet = 0.5) {
    this._effects.push({ type: 'pingPongDelay', params: { delayTime: time, feedback }, wet });
    this._deferAutoPlay();
    return this;
  }
  
  // Modulation effects
  chorus(freq = 1.5, depth = 0.7, wet = 0.5) {
    this._effects.push({ type: 'chorus', params: { frequency: freq, depth }, wet });
    this._deferAutoPlay();
    return this;
  }
  
  phaser(freq = 0.5, octaves = 3, wet = 0.5) {
    this._effects.push({ type: 'phaser', params: { frequency: freq, octaves }, wet });
    this._deferAutoPlay();
    return this;
  }
  
  tremolo(freq = 10, depth = 0.5) {
    this._effects.push({ type: 'tremolo', params: { frequency: freq, depth }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  vibrato(freq = 5, depth = 0.1) {
    this._effects.push({ type: 'vibrato', params: { frequency: freq, depth }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  // Distortion effects
  distort(amount = 0.4) {
    this._effects.push({ type: 'distortion', params: { amount }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  crush(bits = 4) {
    this._effects.push({ type: 'bitCrusher', params: { bits }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  chebyshev(order = 50) {
    this._effects.push({ type: 'chebyshev', params: { order }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  // Auto effects
  autowah(baseFreq = 100, octaves = 6, sensitivity = 0) {
    this._effects.push({ type: 'autoWah', params: { baseFrequency: baseFreq, octaves, sensitivity }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  autofilter(freq = 1, baseFreq = 200) {
    this._effects.push({ type: 'autoFilter', params: { frequency: freq, baseFrequency: baseFreq }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  play(time) {
    if (this._played) return this; // Prevent multiple plays
    this._played = true;
    
    // Clear auto-play timeout since we're playing explicitly
    if (this._autoPlayTimeout) {
      clearTimeout(this._autoPlayTimeout);
      this._autoPlayTimeout = null;
    }
    
    const synth = getNextSynth();
    const startTime = time !== undefined ? time : Tone.now();
    
    synth.oscillator.type = this._type;
    synth.envelope.attack = this._attack;
    synth.envelope.decay = this._decay;
    synth.envelope.sustain = this._sustain;
    synth.envelope.release = this._release;
    
    // Build effects chain
    let currentNode = synth;
    const effectNodes = [];
    
    for (const effectConfig of this._effects) {
      const effect = getEffect(effectConfig.type, effectConfig.params);
      if (effectConfig.wet !== undefined && effect.wet) {
        effect.wet.value = effectConfig.wet;
      }
      currentNode.connect(effect);
      currentNode = effect;
      effectNodes.push(effect);
    }
    
    // Connect final node to destination
    currentNode.toDestination();
    
    // Duration is attack + decay when sustain is 0
    const duration = this._attack + this._decay;
    
    synth.triggerAttackRelease(this._freq, duration, startTime, this._velocity);
    
    // Clean up connections after sound ends
    setTimeout(() => {
      synth.disconnect();
      effectNodes.forEach(effect => {
        effect.disconnect();
      });
      // Reconnect synth directly for next use
      synth.toDestination();
    }, (duration + this._release) * 1000 + 100);
    
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