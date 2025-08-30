/**
 * Sandboxed execution context for REPL code
 * Provides isolated environment without polluting global scope
 */

import { 
  transformPlayerSyntax, 
  sine, 
  sawtooth, 
  createPlayer,
  startScheduler,
  stopScheduler,
  testPattern
} from '../../transform/playerSyntax';

interface Clock {
  time(): number;
  bpm(): number;
  ticks(): number;
  setBPM(value: number): void;
  stop(): void;
  start(): void;
  running(): boolean;
}

interface ScheduledEvent {
  name: string;
  beats: number | number[];
  callback: () => void;
}

interface Sequencer {
  cycle: (length: number) => void;
  schedule: (name: string, beats: number | number[], callback: () => void) => void;
  clearSchedule: (name?: string) => void;
  listScheduled: () => ScheduledEvent[];
}

/**
 * Creates an isolated execution context for user code
 */
export class SandboxContext {
  private context: Record<string, any> = {};

  /**
   * Initialize the sandbox with audio and utility functions
   * @param clock - Audio timing clock instance
   * @param sequencer - Pattern sequencer instance
   */
  constructor(clock: Clock, sequencer: Sequencer) {
    // Audio timing functions
    this.context.time = () => clock.time();
    this.context.bpm = () => clock.bpm();
    this.context.ticks = () => clock.ticks();
    this.context.setBPM = (value: number) => clock.setBPM(value);
    this.context.stopClock = () => clock.stop();
    this.context.startClock = () => clock.start();
    this.context.isRunning = () => clock.running();

    // Sequencer functions
    this.context.cycle = sequencer.cycle.bind(sequencer);
    this.context.schedule = sequencer.schedule.bind(sequencer);
    this.context.clearSchedule = sequencer.clearSchedule.bind(sequencer);
    this.context.listScheduled = sequencer.listScheduled.bind(sequencer);

    // Pattern system functions
    this.context.sine = sine;
    this.context.sawtooth = sawtooth;
    this.context.createPlayer = createPlayer;
    this.context.startScheduler = startScheduler;
    this.context.stopScheduler = stopScheduler;
    this.context.testPattern = testPattern;

    // Utility functions
    this.context.console = console; // Allow console access
    this.context.Math = Math; // Allow Math functions
    this.context.Date = Date; // Allow Date functions
    this.context.JSON = JSON; // Allow JSON functions
    this.context.Array = Array; // Allow Array constructor
    this.context.Object = Object; // Allow Object methods
    this.context.String = String; // Allow String constructor
    this.context.Number = Number; // Allow Number constructor
    this.context.Boolean = Boolean; // Allow Boolean constructor
    this.context.RegExp = RegExp; // Allow RegExp constructor

    // Prevent access to dangerous globals
    this.context.eval = undefined;
    this.context.Function = undefined;
    this.context.window = undefined;
    this.context.document = undefined;
    this.context.globalThis = undefined;
    this.context.global = undefined;
    this.context.process = undefined;
  }

  /**
   * Execute code in the sandboxed context
   * @param code - JavaScript code to execute
   * @returns Execution result
   */
  execute(code: string): any {
    // Transform code for audio syntax
    const transformedCode = transformPlayerSyntax(code);

    // Create function with controlled scope
    const contextKeys = Object.keys(this.context);
    const contextValues = contextKeys.map(key => this.context[key]);

    // Build function parameter list and body
    const functionBody = `
      "use strict";
      return (function() {
        ${transformedCode}
      })();
    `;

    try {
      // Create function with sandboxed context as parameters
      const fn = new Function(...contextKeys, functionBody);
      
      // Execute with context values
      return fn(...contextValues);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add a custom function or value to the context
   * @param name - Name to bind in context
   * @param value - Value to bind
   */
  addToContext(name: string, value: any): void {
    // Validate name is safe
    if (name.startsWith('_') || ['eval', 'Function', 'constructor'].includes(name)) {
      throw new Error(`Invalid context name: ${name}`);
    }
    
    this.context[name] = value;
  }

  /**
   * Remove a binding from the context
   * @param name - Name to remove from context
   */
  removeFromContext(name: string): void {
    delete this.context[name];
  }

  /**
   * Get a copy of the current context keys
   * @returns Array of context key names
   */
  getContextKeys(): string[] {
    return Object.keys(this.context);
  }

  /**
   * Clear user-added context bindings (keeps core audio functions)
   */
  resetUserContext(): void {
    const coreKeys = [
      'time', 'bpm', 'ticks', 'setBPM', 'stopClock', 'startClock', 'isRunning',
      'cycle', 'schedule', 'clearSchedule', 'listScheduled',
      'sine', 'sawtooth', 'square', 'triangle', 'createPlayer',
      'console', 'Math', 'Date', 'JSON', 'Array', 'Object', 'String', 'Number', 'Boolean', 'RegExp'
    ];

    const userKeys = Object.keys(this.context).filter(key => !coreKeys.includes(key));
    userKeys.forEach(key => delete this.context[key]);
  }
}