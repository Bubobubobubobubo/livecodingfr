<script>
  import { onMount, onDestroy } from 'svelte';
  import { WaveformAnalyzer } from './waveformAnalyzer.js';

  export let isActive = false;

  let canvas;
  let waveformAnalyzer;
  let resizeObserver;

  onMount(() => {
    waveformAnalyzer = new WaveformAnalyzer();
    
    if (isActive) {
      initializeWaveform();
    }

    resizeObserver = new ResizeObserver(() => {
      if (waveformAnalyzer && canvas) {
        waveformAnalyzer.resize();
      }
    });

    if (canvas) {
      resizeObserver.observe(canvas);
    }
  });

  onDestroy(() => {
    if (waveformAnalyzer) {
      waveformAnalyzer.destroy();
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  });

  async function initializeWaveform() {
    if (waveformAnalyzer && canvas) {
      await waveformAnalyzer.init(canvas);
    }
  }

  $: if (isActive && waveformAnalyzer && canvas) {
    initializeWaveform();
  } else if (!isActive && waveformAnalyzer) {
    waveformAnalyzer.stopAnalysis();
  }
</script>

<div class="waveform-container">
  <canvas 
    bind:this={canvas}
    class="waveform-canvas"
  ></canvas>
  {#if !isActive}
    <div class="overlay">
      <span class="text-gray-500 text-sm">Start audio clock to see waveform</span>
    </div>
  {/if}
</div>

<style>
  .waveform-container {
    background: #262626;
    border: 1px solid #1f2937;
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
    background: rgba(23, 23, 23, 0.8);
  }
</style>