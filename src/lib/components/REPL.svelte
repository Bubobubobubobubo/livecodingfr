<script lang="ts">
  import { onMount } from 'svelte';
  import { clock } from '$lib/AudioBackend/audioClock';
  import { sequencer } from '$lib/AudioBackend/sequencer';
  import { createEditor } from './REPL/editorConfig';
  import { CodeExecutor } from './REPL/codeExecution';
  import AudioClockStartup from './REPL/AudioClockStartup.svelte';
  import ClockStatus from './REPL/ClockStatus.svelte';
  import ConsoleOutput from './REPL/ConsoleOutput.svelte';
  import WaveformDisplay from './REPL/WaveformDisplay.svelte';
  
  let editorContainer;
  let view;
  let clockStarted = false;
  let clockStatus = '⏸ Clock not started';
  let editorReady = false;
  
  const codeExecutor = new CodeExecutor();

  function executeCode() {
    const code = view.state.doc.toString();
    codeExecutor.execute(code, clock, sequencer);
  }

  async function initializeEditor() {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (!editorContainer) return;
    
    view = createEditor(editorContainer, executeCode);
  }

  function handleClockStarted() {
    console.log('Clock started event received in REPL');
    clockStarted = true;
    editorReady = true;
    
    // Set initial status immediately
    clockStatus = `▶ Time: 0.00s | Ticks: 0 | BPM: ${clock.bpm()}`;
    console.log('Initial clock status set:', clockStatus);
    
    // Continue listening to clock updates after startup
    clock.on('timeUpdate', (data) => {
      if (data && typeof data.time === 'number') {
        const time = data.time.toFixed(2);
        const ticks = clock.ticks();
        clockStatus = `▶ Time: ${time}s | Ticks: ${ticks} | BPM: ${clock.bpm()}`;
        console.log('Clock status updated:', clockStatus);
      }
    });
    
    initializeEditor();
  }

  function handleStatusUpdate(event) {
    clockStatus = event.detail;
  }

  onMount(() => {
    return () => {
      if (view) {
        view.destroy();
      }
    };
  });
</script>

<div class="repl-container bg-neutral-900 border border-gray-800 p-4 my-4 relative">
  {#if !editorReady}
    <AudioClockStartup 
      on:clockStarted={handleClockStarted}
      on:statusUpdate={handleStatusUpdate}
    />
  {:else}
    <div class="flex gap-2 mb-2">
      <ClockStatus {clockStatus} show={clockStarted} />
      <div class="flex-1">
        <WaveformDisplay isActive={clockStarted} />
      </div>
    </div>
    
    <div class="mb-2">
      <div class="flex gap-2">
        <div class="flex-1" bind:this={editorContainer}></div>
        <button
          on:click={executeCode}
          class="px-4 bg-neutral-800 text-orange-400 border border-gray-800 hover:border-orange-400 hover:bg-neutral-800 transition-all duration-200 text-sm font-semibold uppercase tracking-wider h-[200px]"
        >
          Run<br/>(Ctrl/Cmd+Enter)
        </button>
      </div>
    </div>
    
    <ConsoleOutput 
      outputs={codeExecutor.getOutputs()}
      errorMessage={codeExecutor.getError()}
    />
  {/if}
</div>

<style>
  :global(.cm-editor) {
    font-family: 'IBM Plex Mono', 'Courier New', monospace;
  }
  
  :global(.cm-editor.cm-focused) {
    outline: none;
  }
  
  :global(.cm-scroller) {
    font-family: inherit;
  }
</style>