import { LightClock } from './lightClock';
import { musicalTime } from './musicalTime';

// Create singleton clock instance 
const clock = new LightClock();

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

let patternLength: number = 16;
let lastTick = -1;
let clockListenerRegistered = false;
let currentScheduleTime: number | null = null;

const scheduledEvents = new Map<string, ScheduledEvent>();
const namedEvents = new Map<string, string[]>();

export function cycle(beats: number): number {
  if (beats < 1 || beats > 32) {
    throw new Error('Cycle must be between 1 and 32');
  }
  patternLength = beats;
  return patternLength;
}

export function schedule(
  idOrBeat: string | number | number[],
  beatOrCallback?: number | number[] | ((time: number) => void),
  callbackOrUndefined?: ((time: number) => void)
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

export function registerClockListener() {
  if (clockListenerRegistered) return;

  clock.on('timeUpdate', (data) => {
    const currentTick = clock.ticks();

    if (currentTick !== lastTick) {
      const currentBeat = currentTick % patternLength;

      scheduledEvents.forEach((event) => {
        if (event.beat === currentBeat) {
          try {
            const preciseTime = data.time || 0;
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

export function scheduleAtNextBar(callback: (time: number) => void, id: string): void {
  const nextBarTick = musicalTime.getNextBarTick();
  const currentTick = clock.ticks();
  const ticksToWait = nextBarTick - currentTick;

  // Convert ticks to beats for scheduling (assuming 4 ticks per beat)
  const beatsToWait = Math.ceil(ticksToWait / 4);
  const targetBeat = (Math.floor(currentTick / 4) + beatsToWait) % patternLength;

  schedule(id, [targetBeat], callback);
}

export function timeSignature(beatsPerBar: number, ticksPerBeat: number = 4): void {
  musicalTime.setTimeSignature(beatsPerBar, ticksPerBeat);
}

export function getMusicalPosition() {
  return musicalTime.getCurrentMusicalPosition();
}

export function getTimingInfo() {
  return musicalTime.getTimingInfo();
}

export function formatMusicalPosition(pos?: any) {
  return musicalTime.formatMusicalPosition(pos);
}

export function getNextBarTick() {
  return musicalTime.getNextBarTick();
}

export function isAtBarStart() {
  return musicalTime.isAtBarStart();
}

export function isAtBeatStart() {
  return musicalTime.isAtBeatStart();
}

export { clock };

export const sequencer = {
  cycle,
  schedule,
  clearSchedule,
  registerClockListener,
  listScheduled,
  scheduleAtNextBar,
  timeSignature,
  getMusicalPosition,
  getTimingInfo,
  formatMusicalPosition,
  getNextBarTick,
  isAtBarStart,
  isAtBeatStart,
  getPatternLength: (): number => patternLength,
  getScheduledEvents: () => Array.from(scheduledEvents.values())
};
