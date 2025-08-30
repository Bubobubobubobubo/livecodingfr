import type { Pattern, Event, TimeSpan } from './types';

/**
 * Player holds a pattern and provides query interface for scheduler
 */
export class Player {
  private pattern: Pattern | null = null;
  
  constructor(public readonly name: string) {}

  /**
   * Set the pattern for this player
   */
  setPattern(pattern: Pattern): void {
    this.pattern = pattern;
  }

  /**
   * Query player for events in time span
   */
  queryTimeSpan(span: TimeSpan): Event[] {
    if (!this.pattern) return [];
    return this.pattern.query(span);
  }

  /**
   * Check if player has an active pattern
   */
  hasPattern(): boolean {
    return this.pattern !== null;
  }

  /**
   * Clear the current pattern
   */
  clear(): void {
    this.pattern = null;
  }
}