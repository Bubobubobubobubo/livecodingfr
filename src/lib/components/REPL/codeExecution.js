export class CodeExecutor {
  constructor() {
    this.outputs = [];
    this.errorMessage = '';
    this.originalConsole = null;
  }

  getOutputs() {
    return this.outputs;
  }

  getError() {
    return this.errorMessage;
  }

  clearOutput() {
    this.outputs = [];
    this.errorMessage = '';
  }

  formatArgs(args) {
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

  setupConsoleCapture() {
    this.originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug
    };

    console.log = (...args) => {
      this.outputs.push({ type: 'log', message: this.formatArgs(args) });
      this.originalConsole.log(...args);
    };

    console.error = (...args) => {
      this.outputs.push({ type: 'error', message: this.formatArgs(args) });
      this.originalConsole.error(...args);
    };

    console.warn = (...args) => {
      this.outputs.push({ type: 'warn', message: this.formatArgs(args) });
      this.originalConsole.warn(...args);
    };

    console.info = (...args) => {
      this.outputs.push({ type: 'info', message: this.formatArgs(args) });
      this.originalConsole.info(...args);
    };

    console.debug = (...args) => {
      this.outputs.push({ type: 'debug', message: this.formatArgs(args) });
      this.originalConsole.debug(...args);
    };
  }

  restoreConsole() {
    if (this.originalConsole) {
      Object.assign(console, this.originalConsole);
      this.originalConsole = null;
    }
  }

  createExecutionContext(code, clock, sequencer) {
    return `
      const time = () => clock.time();
      const bpm = () => clock.bpm();
      const ticks = () => clock.ticks();
      const setBPM = (value) => clock.setBPM(value);
      const stopClock = () => clock.stop();
      const startClock = () => clock.start();
      const isRunning = () => clock.running();
      
      const cycle = sequencer.cycle;
      const schedule = sequencer.schedule;
      const clearSchedule = sequencer.clearSchedule;
      const sine = sequencer.sine;
      const saw = sequencer.saw;
      const square = sequencer.square;
      const tri = sequencer.tri;
      const listScheduled = sequencer.listScheduled;
      
      ${code}
    `;
  }

  execute(code, clock, sequencer) {
    this.clearOutput();
    
    try {
      this.setupConsoleCapture();
      
      const executionContext = this.createExecutionContext(code, clock, sequencer);
      const result = eval(executionContext);
      
      this.restoreConsole();
      
      if (this.outputs.length === 0 && result !== undefined) {
        this.outputs.push({ type: 'return', message: String(result) });
      }
    } catch (error) {
      this.errorMessage = error.toString();
      this.restoreConsole();
    }
  }
}