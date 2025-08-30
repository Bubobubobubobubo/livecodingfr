import type { Pattern, Event, TimeSpan } from './types';

/**
 * Simple sequence pattern that cycles through values
 */
export class SequencePattern implements Pattern {
  constructor(
    private values: any[], 
    private cycleDuration: number = 1
  ) {}

  query(span: TimeSpan): Event[] {
    if (this.values.length === 0) return [];
    
    const events: Event[] = [];
    const eventDuration = this.cycleDuration / this.values.length;
    
    // Calculate which events overlap with the query span
    const startIndex = Math.floor(span.start / eventDuration);
    const endIndex = Math.ceil(span.end / eventDuration);
    
    for (let i = startIndex; i < endIndex; i++) {
      const eventStart = i * eventDuration;
      const eventEnd = eventStart + eventDuration;
      
      // Only include events that overlap with the query span
      if (eventEnd > span.start && eventStart < span.end) {
        const value = this.values[i % this.values.length];
        events.push({
          start: Math.max(0, eventStart - span.start),
          duration: Math.min(eventDuration, span.end - Math.max(span.start, eventStart)),
          value
        });
      }
    }
    
    return events;
  }

  /**
   * Apply gain transformation - returns new pattern
   */
  gain(gainValue: number): Pattern {
    return new TransformPattern(this, (value) => ({
      ...value,
      gain: (value.gain || 1) * gainValue
    }));
  }

  /**
   * Speed up pattern by factor
   */
  fast(factor: number): Pattern {
    return new FastPattern(this, factor);
  }
}

/**
 * Transform pattern that applies function to all event values
 */
class TransformPattern implements Pattern {
  constructor(
    private pattern: Pattern,
    private transform: (value: any) => any
  ) {}

  query(span: TimeSpan): Event[] {
    const events = this.pattern.query(span);
    return events.map(event => ({
      ...event,
      value: this.transform(event.value)
    }));
  }
}

/**
 * Fast pattern that speeds up timing
 */
class FastPattern implements Pattern {
  constructor(
    private pattern: Pattern, 
    private factor: number
  ) {}

  query(span: TimeSpan): Event[] {
    // Query compressed time span
    const compressedSpan = {
      start: span.start * this.factor,
      end: span.end * this.factor
    };
    
    const events = this.pattern.query(compressedSpan);
    
    // Stretch events back to original timespan
    return events.map(event => ({
      ...event,
      start: event.start / this.factor,
      duration: event.duration / this.factor
    }));
  }
}

/**
 * Create a sine wave sequence pattern
 */
export function sine(notes: (string | number)[]): SequencePattern {
  return new SequencePattern(notes.map(note => ({ s: 'sine', note })));
}

/**
 * Test function to verify pattern system is working
 */
export function testPattern(): void {
  console.log('Testing pattern system...');
  const pattern = sine(['c4', 'e4', 'g4']);
  const events = pattern.query({ start: 0, end: 1 });
  console.log('Pattern events for first beat:', events);
  console.log('Pattern test complete!');
}

/**
 * Create a sawtooth sequence pattern
 */
export function sawtooth(notes: (string | number)[]): SequencePattern {
  return new SequencePattern(notes.map(note => ({ s: 'sawtooth', note })));
}