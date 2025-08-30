import { SandboxContext } from './sandboxContext';

interface ConsoleOutput {
  type: 'log' | 'error' | 'warn' | 'info' | 'debug' | 'return';
  message: string;
}

interface OriginalConsole {
  log: typeof console.log;
  error: typeof console.error;
  warn: typeof console.warn;
  info: typeof console.info;
  debug: typeof console.debug;
}

/**
 * Interface for audio timing clock functionality
 */
interface Clock {
  time(): number;
  bpm(): number;
  ticks(): number;
  setBPM(value: number): void;
  stop(): void;
  start(): void;
  running(): boolean;
}

/**
 * Interface for pattern sequencing functionality
 */
interface Sequencer {
  cycle: (length: number) => void;
  schedule: (name: string, beats: number | number[], callback: () => void) => void;
  clearSchedule: (name?: string) => void;
  listScheduled: () => ScheduledEvent[];
}

/**
 * Represents a scheduled audio event
 */
interface ScheduledEvent {
  name: string;
  beats: number | number[];
  callback: () => void;
}

/**
 * Handles JavaScript code execution in a sandboxed environment
 * with console output capture and audio API integration
 */
export class CodeExecutor {
  private outputs: ConsoleOutput[] = [];
  private errorMessage: string = '';
  private originalConsole: OriginalConsole | null = null;
  private sandbox: SandboxContext | null = null;

  /**
   * Retrieve all captured console outputs
   * @returns Array of console output messages with types
   */
  getOutputs(): ConsoleOutput[] {
    return this.outputs;
  }

  /**
   * Get the last execution error message
   * @returns Error message or empty string if no error
   */
  getError(): string {
    return this.errorMessage;
  }

  /**
   * Clear all captured outputs and error messages
   */
  clearOutput(): void {
    this.outputs = [];
    this.errorMessage = '';
  }

  /**
   * Format console arguments for display
   * @param args - Arguments passed to console methods
   * @returns Formatted string representation
   */
  private formatArgs(args: unknown[]): string {
    return args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
  }

  /**
   * Hijack console methods to capture output for display
   */
  private setupConsoleCapture(): void {
    this.originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug
    };

    console.log = (...args: any[]) => {
      this.outputs.push({ type: 'log', message: this.formatArgs(args) });
      this.originalConsole!.log(...args);
    };

    console.error = (...args: any[]) => {
      this.outputs.push({ type: 'error', message: this.formatArgs(args) });
      this.originalConsole!.error(...args);
    };

    console.warn = (...args: any[]) => {
      this.outputs.push({ type: 'warn', message: this.formatArgs(args) });
      this.originalConsole!.warn(...args);
    };

    console.info = (...args: any[]) => {
      this.outputs.push({ type: 'info', message: this.formatArgs(args) });
      this.originalConsole!.info(...args);
    };

    console.debug = (...args: any[]) => {
      this.outputs.push({ type: 'debug', message: this.formatArgs(args) });
      this.originalConsole!.debug(...args);
    };
  }

  /**
   * Restore original console methods
   */
  private restoreConsole(): void {
    if (this.originalConsole) {
      Object.assign(console, this.originalConsole);
      this.originalConsole = null;
    }
  }

  /**
   * Initialize or update the sandbox context
   * @param clock - Audio timing clock instance
   * @param sequencer - Pattern sequencer instance
   */
  private initializeSandbox(clock: Clock, sequencer: Sequencer): void {
    if (!this.sandbox) {
      this.sandbox = new SandboxContext(clock, sequencer);
    }
  }

  /**
   * Execute JavaScript code directly in page context
   * @param code - JavaScript code to execute
   * @param clock - Audio timing clock instance
   * @param sequencer - Pattern sequencer instance
   */
  execute(code: string, clock: Clock, sequencer: Sequencer): void {
    this.clearOutput();
    
    try {
      this.setupConsoleCapture();
      
      // Make audio functions available globally during execution
      (window as any).clock = clock;
      (window as any).sequencer = sequencer;
      (window as any).time = () => clock.time();
      (window as any).bpm = () => clock.bpm();
      (window as any).ticks = () => clock.ticks();
      (window as any).setBPM = (value: number) => clock.setBPM(value);
      
      // Execute code directly with eval
      const result = eval(code);
      
      this.restoreConsole();
      
      // Show return value if there's no console output and result exists
      if (this.outputs.length === 0 && result !== undefined) {
        this.outputs.push({ type: 'return', message: String(result) });
      }
      
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.toString() : String(error);
      this.restoreConsole();
    }
  }
}