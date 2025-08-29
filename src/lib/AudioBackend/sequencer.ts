let Tone: any = null;
import { clock } from './audioClock';

type WaveformType = 'sine' | 'sawtooth' | 'square' | 'triangle';
type FilterType = 'lowpass' | 'highpass' | 'bandpass';
type EffectType = 'reverb' | 'delay' | 'filter' | 'distortion' | 'chorus' | 'phaser' | 'tremolo' | 'vibrato' | 'autoFilter' | 'autoWah' | 'bitCrusher' | 'chebyshev' | 'pingPongDelay';

interface EffectParams {
  [key: string]: any;
}

interface EffectConfig {
  type: EffectType;
  params: EffectParams;
  wet?: number;
}

interface ScheduledEvent {
  beat: number;
  callback: (time: number) => void;
  id?: string;
}

interface ListedEvent {
  id: string;
  beat: number;
  named: boolean;
}

interface PooledEffect {
  inUse: boolean;
  connect: (destination: any) => void;
  disconnect: () => void;
  [key: string]: any;
}

let patternLength: number = 16;
const scheduledEvents = new Map<string, ScheduledEvent>();
const namedEvents = new Map<string, string[]>();
const synthPool: any[] = [];
let synthIndex: number = 0;
const SYNTH_POOL_SIZE: number = 8;
let currentScheduleTime: number | null = null;

const effectsPools: Record<EffectType, PooledEffect[]> = {
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

const EFFECTS_POOL_SIZE: number = 4;

async function getEffect(type: EffectType, params: EffectParams = {}): Promise<PooledEffect> {
  if (!Tone) {
    Tone = await import('tone');
  }
  if (!effectsPools[type]) {
    effectsPools[type] = [];
  }
  
  let effect = effectsPools[type].find(e => !e.inUse);
  
  if (!effect) {
    let newEffect: any;
    
    switch(type) {
      case 'reverb':
        newEffect = new Tone.Reverb(params.decay || 1.5);
        break;
      case 'delay':
        newEffect = new Tone.FeedbackDelay(params.time || 0.25, params.feedback || 0.5);
        break;
      case 'filter':
        newEffect = new Tone.Filter(params.frequency || 1000, params.type || 'lowpass');
        break;
      case 'distortion':
        newEffect = new Tone.Distortion(params.amount || 0.4);
        break;
      case 'chorus':
        newEffect = new Tone.Chorus(params.frequency || 1.5, params.delayTime || 3.5, params.depth || 0.7);
        break;
      case 'phaser':
        newEffect = new Tone.Phaser({
          frequency: params.frequency || 0.5,
          octaves: params.octaves || 3,
          baseFrequency: params.baseFrequency || 350
        });
        break;
      case 'tremolo':
        newEffect = new Tone.Tremolo(params.frequency || 10, params.depth || 0.5);
        break;
      case 'vibrato':
        newEffect = new Tone.Vibrato(params.frequency || 5, params.depth || 0.1);
        break;
      case 'autoFilter':
        newEffect = new Tone.AutoFilter(params.frequency || 1, params.baseFrequency || 200);
        break;
      case 'autoWah':
        newEffect = new Tone.AutoWah(params.baseFrequency || 100, params.octaves || 6, params.sensitivity || 0);
        break;
      case 'bitCrusher':
        newEffect = new Tone.BitCrusher(params.bits || 4);
        break;
      case 'chebyshev':
        newEffect = new Tone.Chebyshev(params.order || 50);
        break;
      case 'pingPongDelay':
        newEffect = new Tone.PingPongDelay(params.delayTime || 0.25, params.feedback || 0.5);
        break;
      default:
        throw new Error(`Unknown effect type: ${type}`);
    }
    
    effect = newEffect as PooledEffect;
    effect.inUse = false;
    effectsPools[type].push(effect);
  }
  
  updateEffectParams(effect, type, params);
  effect.inUse = true;
  
  setTimeout(() => {
    effect.inUse = false;
  }, 5000);
  
  return effect;
}

function updateEffectParams(effect: PooledEffect, type: EffectType, params: EffectParams): void {
  switch(type) {
    case 'reverb':
      if (params.decay !== undefined && 'decay' in effect) effect.decay = params.decay;
      break;
    case 'delay':
      if (params.time !== undefined && 'delayTime' in effect) (effect as any).delayTime.value = params.time;
      if (params.feedback !== undefined && 'feedback' in effect) (effect as any).feedback.value = params.feedback;
      break;
    case 'filter':
      if (params.frequency !== undefined && 'frequency' in effect) (effect as any).frequency.value = params.frequency;
      if (params.type !== undefined && 'type' in effect) (effect as any).type = params.type;
      break;
    case 'distortion':
      if (params.amount !== undefined && 'distortion' in effect) (effect as any).distortion = params.amount;
      break;
    case 'chorus':
      if (params.frequency !== undefined && 'frequency' in effect) (effect as any).frequency.value = params.frequency;
      if (params.depth !== undefined && 'depth' in effect) (effect as any).depth = params.depth;
      break;
    case 'phaser':
      if (params.frequency !== undefined && 'frequency' in effect) (effect as any).frequency.value = params.frequency;
      break;
    case 'tremolo':
      if (params.frequency !== undefined && 'frequency' in effect) (effect as any).frequency.value = params.frequency;
      if (params.depth !== undefined && 'depth' in effect) (effect as any).depth.value = params.depth;
      break;
    case 'vibrato':
      if (params.frequency !== undefined && 'frequency' in effect) (effect as any).frequency.value = params.frequency;
      if (params.depth !== undefined && 'depth' in effect) (effect as any).depth.value = params.depth;
      break;
    case 'autoFilter':
      if (params.frequency !== undefined && 'frequency' in effect) (effect as any).frequency.value = params.frequency;
      break;
    case 'bitCrusher':
      if (params.bits !== undefined && 'bits' in effect) (effect as any).bits.value = params.bits;
      break;
  }
}

export function cycle(beats: number): number {
  if (beats < 1 || beats > 32) {
    throw new Error('Cycle must be between 1 and 32');
  }
  patternLength = beats;
  return patternLength;
}

export function schedule(
  idOrBeat: string | number | number[],
  beatOrCallback?: number | number[] | (() => void),
  callbackOrUndefined?: (() => void)
): string | string[] {
  let id: string | null;
  let beats: number[];
  let callback: (time: number) => void;
  
  if (typeof idOrBeat === 'string') {
    id = idOrBeat;
    beats = Array.isArray(beatOrCallback) ? beatOrCallback : [beatOrCallback as number];
    callback = callbackOrUndefined as (time: number) => void;
  } else {
    id = null;
    beats = Array.isArray(idOrBeat) ? idOrBeat : [idOrBeat];
    callback = beatOrCallback as (time: number) => void;
  }
  
  for (const beat of beats) {
    if (typeof beat !== 'number') {
      throw new Error(`Beat must be a number, got ${typeof beat}`);
    }
    if (beat < 0 || beat >= patternLength) {
      throw new Error(`Beat ${beat} is out of range for pattern length ${patternLength}`);
    }
  }
  
  const wrappedCallback = (time: number) => {
    currentScheduleTime = time;
    try {
      callback(time);
    } finally {
      currentScheduleTime = null;
    }
  };
  
  const eventKeys: string[] = [];
  
  if (id) {
    if (namedEvents.has(id)) {
      const existingKeys = namedEvents.get(id)!;
      existingKeys.forEach(key => scheduledEvents.delete(key));
    }
    
    const newKeys: string[] = [];
    beats.forEach((beat, index) => {
      const eventKey = `named_${id}_${index}`;
      scheduledEvents.set(eventKey, { beat, callback: wrappedCallback, id });
      newKeys.push(eventKey);
      eventKeys.push(eventKey);
    });
    
    namedEvents.set(id, newKeys);
    return id;
  } else {
    beats.forEach(beat => {
      const eventKey = `anon_${Date.now()}_${Math.random()}`;
      scheduledEvents.set(eventKey, { beat, callback: wrappedCallback });
      eventKeys.push(eventKey);
    });
    return eventKeys;
  }
}

export function clearSchedule(id?: string): void {
  if (id) {
    if (namedEvents.has(id)) {
      const eventKeys = namedEvents.get(id)!;
      eventKeys.forEach(key => scheduledEvents.delete(key));
      namedEvents.delete(id);
    }
  } else {
    scheduledEvents.clear();
    namedEvents.clear();
  }
}

export async function initSynthPool(): Promise<any[]> {
  if (!Tone) {
    Tone = await import('tone');
  }
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

async function getNextSynth(): Promise<any> {
  if (synthPool.length === 0) {
    await initSynthPool();
  }
  const synth = synthPool[synthIndex];
  synthIndex = (synthIndex + 1) % SYNTH_POOL_SIZE;
  return synth;
}

class SynthEvent {
  private _freq: number;
  private _attack: number = 0.01;
  private _decay: number = 0.1;
  private _sustain: number = 0;
  private _release: number = 0.1;
  private _velocity: number = 0.8;
  private _type: WaveformType;
  private _effects: EffectConfig[] = [];
  private _played: boolean = false;
  private _scheduleTime: number | null = null;
  private _autoPlayTimeout: number | null = null;
  
  constructor(freq: number = 440, type: WaveformType = 'sine') {
    this._freq = freq;
    this._type = type;
    
    if (currentScheduleTime !== null) {
      this._scheduleTime = currentScheduleTime;
      this._autoPlayTimeout = window.setTimeout(() => {
        if (!this._played && this._scheduleTime !== null) {
          this.play(this._scheduleTime);
        }
      }, 0);
    }
  }
  
  private _deferAutoPlay(): void {
    if (this._autoPlayTimeout) {
      clearTimeout(this._autoPlayTimeout);
    }
    if (this._scheduleTime !== null && !this._played) {
      this._autoPlayTimeout = window.setTimeout(() => {
        if (!this._played && this._scheduleTime !== null) {
          this.play(this._scheduleTime);
        }
      }, 0);
    }
  }
  
  freq(value: number): this {
    this._freq = value;
    this._deferAutoPlay();
    return this;
  }
  
  dur(value: number): this {
    this._attack = value * 0.1;
    this._decay = value * 0.9;
    this._sustain = 0;
    this._deferAutoPlay();
    return this;
  }
  
  attack(value: number): this {
    this._attack = value;
    this._deferAutoPlay();
    return this;
  }
  
  decay(value: number): this {
    this._decay = value;
    this._deferAutoPlay();
    return this;
  }
  
  sustain(value: number): this {
    this._sustain = value;
    this._deferAutoPlay();
    return this;
  }
  
  release(value: number): this {
    this._release = value;
    this._deferAutoPlay();
    return this;
  }
  
  vel(value: number): this {
    this._velocity = value;
    this._deferAutoPlay();
    return this;
  }
  
  lowpass(freq: number, q?: number): this {
    this._effects.push({ type: 'filter', params: { frequency: freq, type: 'lowpass', Q: q } });
    this._deferAutoPlay();
    return this;
  }
  
  highpass(freq: number, q?: number): this {
    this._effects.push({ type: 'filter', params: { frequency: freq, type: 'highpass', Q: q } });
    this._deferAutoPlay();
    return this;
  }
  
  bandpass(freq: number, q?: number): this {
    this._effects.push({ type: 'filter', params: { frequency: freq, type: 'bandpass', Q: q } });
    this._deferAutoPlay();
    return this;
  }
  
  reverb(decay: number = 1.5, wet: number = 0.5): this {
    this._effects.push({ type: 'reverb', params: { decay }, wet });
    this._deferAutoPlay();
    return this;
  }
  
  delay(time: number = 0.25, feedback: number = 0.5, wet: number = 0.5): this {
    this._effects.push({ type: 'delay', params: { time, feedback }, wet });
    this._deferAutoPlay();
    return this;
  }
  
  pingpong(time: number = 0.25, feedback: number = 0.5, wet: number = 0.5): this {
    this._effects.push({ type: 'pingPongDelay', params: { delayTime: time, feedback }, wet });
    this._deferAutoPlay();
    return this;
  }
  
  chorus(freq: number = 1.5, depth: number = 0.7, wet: number = 0.5): this {
    this._effects.push({ type: 'chorus', params: { frequency: freq, depth }, wet });
    this._deferAutoPlay();
    return this;
  }
  
  phaser(freq: number = 0.5, octaves: number = 3, wet: number = 0.5): this {
    this._effects.push({ type: 'phaser', params: { frequency: freq, octaves }, wet });
    this._deferAutoPlay();
    return this;
  }
  
  tremolo(freq: number = 10, depth: number = 0.5): this {
    this._effects.push({ type: 'tremolo', params: { frequency: freq, depth }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  vibrato(freq: number = 5, depth: number = 0.1): this {
    this._effects.push({ type: 'vibrato', params: { frequency: freq, depth }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  distort(amount: number = 0.4): this {
    this._effects.push({ type: 'distortion', params: { amount }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  crush(bits: number = 4): this {
    this._effects.push({ type: 'bitCrusher', params: { bits }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  chebyshev(order: number = 50): this {
    this._effects.push({ type: 'chebyshev', params: { order }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  autowah(baseFreq: number = 100, octaves: number = 6, sensitivity: number = 0): this {
    this._effects.push({ type: 'autoWah', params: { baseFrequency: baseFreq, octaves, sensitivity }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  autofilter(freq: number = 1, baseFreq: number = 200): this {
    this._effects.push({ type: 'autoFilter', params: { frequency: freq, baseFrequency: baseFreq }, wet: 1 });
    this._deferAutoPlay();
    return this;
  }
  
  async play(time?: number): Promise<this> {
    if (this._played) return this;
    this._played = true;
    
    if (this._autoPlayTimeout) {
      clearTimeout(this._autoPlayTimeout);
      this._autoPlayTimeout = null;
    }
    
    const synth = await getNextSynth();
    const startTime = time !== undefined ? time : (Tone ? Tone.now() : performance.now() / 1000);
    
    synth.oscillator.type = this._type;
    synth.envelope.attack = this._attack;
    synth.envelope.decay = this._decay;
    synth.envelope.sustain = this._sustain;
    synth.envelope.release = this._release;
    
    let currentNode: any = synth;
    const effectNodes: PooledEffect[] = [];
    
    for (const effectConfig of this._effects) {
      const effect = await getEffect(effectConfig.type, effectConfig.params);
      if (effectConfig.wet !== undefined && 'wet' in effect && (effect as any).wet) {
        (effect as any).wet.value = effectConfig.wet;
      }
      currentNode.connect(effect);
      currentNode = effect;
      effectNodes.push(effect);
    }
    
    currentNode.toDestination();
    
    const duration = this._attack + this._decay;
    
    synth.triggerAttackRelease(this._freq, duration, startTime, this._velocity);
    
    setTimeout(() => {
      synth.disconnect();
      effectNodes.forEach(effect => {
        effect.disconnect();
      });
      synth.toDestination();
    }, (duration + this._release) * 1000 + 100);
    
    return this;
  }
}

export function sine(freq: number = 440, dur?: number): SynthEvent {
  const synth = new SynthEvent(freq, 'sine');
  if (dur !== undefined) {
    synth.dur(dur);
  }
  return synth;
}

export function saw(freq: number = 440, dur?: number): SynthEvent {
  const synth = new SynthEvent(freq, 'sawtooth');
  if (dur !== undefined) {
    synth.dur(dur);
  }
  return synth;
}

export function square(freq: number = 440, dur?: number): SynthEvent {
  const synth = new SynthEvent(freq, 'square');
  if (dur !== undefined) {
    synth.dur(dur);
  }
  return synth;
}

export function tri(freq: number = 440, dur?: number): SynthEvent {
  const synth = new SynthEvent(freq, 'triangle');
  if (dur !== undefined) {
    synth.dur(dur);
  }
  return synth;
}

export function listScheduled(): ListedEvent[] {
  const events: ListedEvent[] = [];
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
let clockListenerRegistered = false;

export function registerClockListener() {
  if (clockListenerRegistered) return;
  
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
  
  clockListenerRegistered = true;
}

export const sequencer = {
  cycle,
  schedule,
  clearSchedule,
  sine,
  saw,
  square,
  tri,
  initSynthPool,
  registerClockListener,
  listScheduled,
  getPatternLength: (): number => patternLength,
  getScheduledEvents: (): ScheduledEvent[] => Array.from(scheduledEvents.values())
};