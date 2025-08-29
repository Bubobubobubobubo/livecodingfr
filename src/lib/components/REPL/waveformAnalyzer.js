import * as Tone from 'tone';

export class WaveformAnalyzer {
  constructor() {
    this.analyser = null;
    this.dataArray = null;
    this.isAnalyzing = false;
    this.animationId = null;
    this.canvas = null;
    this.canvasContext = null;
    this.bufferLength = 2048;
  }

  async init(canvas) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
    
    this.analyser = new Tone.Analyser('waveform', this.bufferLength);
    this.dataArray = new Float32Array(this.bufferLength);
    
    Tone.getDestination().connect(this.analyser);
    
    this.setupCanvas();
    this.startAnalysis();
  }

  setupCanvas() {
    if (!this.canvas || !this.canvasContext) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.canvasContext.scale(dpr, dpr);
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
  }

  startAnalysis() {
    if (this.isAnalyzing) return;
    
    this.isAnalyzing = true;
    this.draw();
  }

  stopAnalysis() {
    this.isAnalyzing = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  draw() {
    if (!this.isAnalyzing || !this.analyser || !this.canvasContext) return;

    this.animationId = requestAnimationFrame(() => this.draw());

    const waveform = this.analyser.getValue();
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

  drawGrid() {
    if (!this.canvasContext) return;

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

  resize() {
    this.setupCanvas();
  }

  destroy() {
    this.stopAnalysis();
    if (this.analyser) {
      this.analyser.dispose();
    }
  }
}