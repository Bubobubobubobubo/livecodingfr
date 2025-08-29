<script>
  import { createEventDispatcher } from 'svelte';
  
  export let show = false;
  
  const dispatch = createEventDispatcher();
  
  function handleStart() {
    dispatch('start');
    show = false;
  }
</script>

{#if show}
  <div class="modal-overlay">
    <h2 class="text-2xl font-bold text-orange-400 mb-4">Start Audio Clock</h2>
    <p class="text-gray-300 mb-6">
      This page uses a high-precision audio clock for timing. 
      Click below to start the audio context and enable the clock.
    </p>
    <button
      on:click={handleStart}
      class="px-6 py-2 bg-orange-400 text-black font-semibold uppercase tracking-wider hover:bg-orange-300 transition-colors"
    >
      Start Clock
    </button>
  </div>
{/if}

<style>
  .modal-overlay {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: #262626;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    border: 1px solid #fb923c;
    min-height: 250px;
  }
</style>