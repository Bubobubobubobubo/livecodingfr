import { transformPlayerSyntax, sine, sawtooth, square, triangle, createPlayer } from '../../transform/playerSyntax';

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

interface Clock {
  time(): number;
  bpm(): number;
  ticks(): number;
  setBPM(value: number): void;
  stop(): void;
  start(): void;
  running(): boolean;
}

interface Sequencer {
  cycle: (length: number) => void;
  schedule: (name: string, beats: number | number[], callback: () => void) => void;
  clearSchedule: (name?: string) => void;
  listScheduled: () => any[];
}

export class CodeExecutor {
  private outputs: ConsoleOutput[] = [];
  private errorMessage: string = '';
  private originalConsole: OriginalConsole | null = null;

  getOutputs(): ConsoleOutput[] {
    return this.outputs;
  }

  getError(): string {
    return this.errorMessage;
  }

  clearOutput(): void {
    this.outputs = [];
    this.errorMessage = '';
  }

  formatArgs(args: any[]): string {
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

  setupConsoleCapture(): void {
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

  restoreConsole(): void {
    if (this.originalConsole) {
      Object.assign(console, this.originalConsole);
      this.originalConsole = null;
    }
  }

  createExecutionContext(code: string, clock: Clock, sequencer: Sequencer): string {
    // Make functions available in global scope for eval
    (globalThis as any).time = () => clock.time();
    (globalThis as any).bpm = () => clock.bpm();
    (globalThis as any).ticks = () => clock.ticks();
    (globalThis as any).setBPM = (value: number) => clock.setBPM(value);
    (globalThis as any).stopClock = () => clock.stop();
    (globalThis as any).startClock = () => clock.start();
    (globalThis as any).isRunning = () => clock.running();
    
    (globalThis as any).cycle = sequencer.cycle.bind(sequencer);
    (globalThis as any).schedule = sequencer.schedule.bind(sequencer);
    (globalThis as any).clearSchedule = sequencer.clearSchedule.bind(sequencer);
    (globalThis as any).listScheduled = sequencer.listScheduled.bind(sequencer);
    
    (globalThis as any).sine = sine;
    (globalThis as any).sawtooth = sawtooth;
    (globalThis as any).square = square;
    (globalThis as any).triangle = triangle;
    (globalThis as any).createPlayer = createPlayer;
    
    return code;
  }

  execute(code: string, clock: Clock, sequencer: Sequencer): void {
    this.clearOutput();
    
    try {
      this.setupConsoleCapture();
      
      const transformedCode = transformPlayerSyntax(code);
      console.log('Original code:', code);
      console.log('Transformed code:', transformedCode);
      
      const executionContext = this.createExecutionContext(transformedCode, clock, sequencer);
      const result = eval(executionContext);
      
      this.restoreConsole();
      
      if (this.outputs.length === 0 && result !== undefined) {
        this.outputs.push({ type: 'return', message: String(result) });
      }
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.toString() : String(error);
      this.restoreConsole();
    }
  }
}