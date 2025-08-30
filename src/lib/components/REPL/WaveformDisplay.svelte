<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { WaveformAnalyzer } from './waveformAnalyzer';

  /**
   * Whether the waveform analyzer should be active
   */
  export let isActive: boolean = false;

  let canvas: HTMLCanvasElement;
  let waveformAnalyzer: WaveformAnalyzer | null = null;
  let resizeObserver: ResizeObserver | null = null;

  /**
   * Initialize waveform analyzer and set up resize observer
   */
  onMount(() => {
    try {
      waveformAnalyzer = new WaveformAnalyzer();
      
      if (isActive) {
        initializeWaveform();
      }

      setupResizeObserver();
    } catch (error) {
      console.error('Failed to initialize waveform display:', error);
    }
  });

  /**
   * Clean up resources on component destruction
   */
  onDestroy(() => {
    cleanup();
  });

  /**
   * Initialize the waveform analyzer with the canvas element
   */
  async function initializeWaveform(): Promise<void> {
    if (!waveformAnalyzer || !canvas) {
      console.warn('Cannot initialize waveform: missing analyzer or canvas');
      return;
    }

    try {
      await waveformAnalyzer.init(canvas);
    } catch (error) {
      console.error('Failed to initialize waveform analyzer:', error);
    }
  }

  /**
   * Set up resize observer to handle canvas resizing
   */
  function setupResizeObserver(): void {
    if (typeof ResizeObserver === 'undefined') {
      console.warn('ResizeObserver not supported');
      return;
    }

    resizeObserver = new ResizeObserver(() => {
      if (waveformAnalyzer && canvas) {
        waveformAnalyzer.resize();
      }
    });

    if (canvas) {
      resizeObserver.observe(canvas);
    }
  }

  /**
   * Clean up all resources
   */
  function cleanup(): void {
    if (waveformAnalyzer) {
      waveformAnalyzer.destroy();
      waveformAnalyzer = null;
    }
    
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  }

  /**
   * Reactive statement to handle activation state changes
   */
  $: handleActivationChange(isActive, waveformAnalyzer, canvas);

  /**
   * Handle changes to the activation state
   * @param active - Whether waveform should be active
   * @param analyzer - Current waveform analyzer instance
   * @param canvasElement - Canvas element reference
   */
  function handleActivationChange(
    active: boolean, 
    analyzer: WaveformAnalyzer | null, 
    canvasElement: HTMLCanvasElement
  ): void {
    if (active && analyzer && canvasElement) {
      initializeWaveform();
    } else if (!active && analyzer) {
      analyzer.stopAnalysis();
    }
  }
</script>

<div class="waveform-container">
  <canvas 
    bind:this={canvas}
    class="waveform-canvas"
  ></canvas>
  {#if !isActive}
    <div class="overlay">
      <span class="text-theme-text-muted text-sm">Start audio clock to see waveform</span>
    </div>
  {/if}
</div>

<style>
  .waveform-container {
    background: rgb(var(--color-bg-tertiary));
    border: 1px solid rgb(var(--color-border-primary));
    height: 80px;
    position: relative;
    overflow: hidden;
  }

  .waveform-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--color-bg-primary), 0.8);
  }
</style>