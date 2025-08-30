/**
 * Represents a musical event with timing and audio parameters
 */
export interface PatternEvent {
  start: number;      // Start time relative to query start (in beats)
  duration: number;   // Event duration (in beats)
  value: any;        // Audio parameters for superdough
}

// Also export as Event for backward compatibility
export type Event = PatternEvent;

/**
 * Represents a time span for pattern queries
 */
export interface TimeSpan {
  start: number;   // Start time (in beats)
  end: number;     // End time (in beats)
}

/**
 * Core pattern interface - all patterns implement this
 */
export interface Pattern {
  query(span: TimeSpan): Event[];
}