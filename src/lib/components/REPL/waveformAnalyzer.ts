let Tone: any = null;

export class WaveformAnalyzer {
  private analyser: any | null = null;
  private dataArray: Float32Array | null = null;
  private isAnalyzing: boolean = false;
  private animationId: number | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private canvasContext: CanvasRenderingContext2D | null = null;
  private bufferLength: number = 2048;

  async init(canvas: HTMLCanvasElement): Promise<void> {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
    
    if (!Tone) {
      Tone = await import('tone');
    }
    
    this.analyser = new Tone.Analyser('waveform', this.bufferLength);
    this.dataArray = new Float32Array(this.bufferLength);
    
    Tone.getDestination().connect(this.analyser);
    
    this.setupCanvas();
    this.startAnalysis();
  }

  setupCanvas(): void {
    if (!this.canvas || !this.canvasContext) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.canvasContext.scale(dpr, dpr);
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
  }

  startAnalysis(): void {
    if (this.isAnalyzing) return;
    
    this.isAnalyzing = true;
    this.draw();
  }

  stopAnalysis(): void {
    this.isAnalyzing = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private draw(): void {
    if (!this.isAnalyzing || !this.analyser || !this.canvasContext || !this.canvas) return;

    this.animationId = requestAnimationFrame(() => this.draw());

    const waveform = this.analyser.getValue() as Float32Array;
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.canvasContext.fillStyle = '#171717';
    this.canvasContext.fillRect(0, 0, width, height);

    this.canvasContext.lineWidth = 1.5;
    this.canvasContext.strokeStyle = '#fb923c';
    this.canvasContext.beginPath();

    const sliceWidth = width / waveform.length;
    let x = 0;

    for (let i = 0; i < waveform.length; i++) {
      const v = (waveform[i] + 1) / 2;
      const y = v * height;

      if (i === 0) {
        this.canvasContext.moveTo(x, y);
      } else {
        this.canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.canvasContext.stroke();

    this.drawGrid();
  }

  private drawGrid(): void {
    if (!this.canvasContext || !this.canvas) return;

    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.canvasContext.strokeStyle = '#262626';
    this.canvasContext.lineWidth = 0.5;
    this.canvasContext.setLineDash([2, 2]);

    this.canvasContext.beginPath();
    this.canvasContext.moveTo(0, height / 2);
    this.canvasContext.lineTo(width, height / 2);
    this.canvasContext.stroke();

    for (let i = 1; i < 4; i++) {
      const y = (height / 4) * i;
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(0, y);
      this.canvasContext.lineTo(width, y);
      this.canvasContext.stroke();
    }

    this.canvasContext.setLineDash([]);
  }

  resize(): void {
    this.setupCanvas();
  }

  destroy(): void {
    this.stopAnalysis();
    if (this.analyser) {
      this.analyser.dispose();
    }
  }
}