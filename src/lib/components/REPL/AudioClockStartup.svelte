<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { clock, sequencer } from '$lib/AudioBackend/sequencer';

  const dispatch = createEventDispatcher();

  let clockStatus = '⏸ Clock not started';

  async function startAudioClock() {
    try {
      console.log('Starting audio clock...');
      
      // Initialize Web Audio Context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      console.log('Audio context started');
      
      await clock.init();
      console.log('Clock initialized');
      
      await clock.start();
      console.log('Clock started, running:', clock.running());
      
      sequencer.registerClockListener();
      console.log('Sequencer initialized');
      
      dispatch('clockStarted');
      console.log('Clock startup complete');
    } catch (error) {
      console.error('Failed to start audio clock:', error);
    }
  }
</script>

<div class="start-overlay">
  <h2 class="text-2xl font-bold text-theme-accent-primary mb-4">Démarrer l'horloge audio</h2>
  <p class="text-theme-text-secondary mb-6">
    Ce REPL utilise une horloge audio haute précision pour la synchronisation.<br>
    Cliquez ci-dessous pour démarrer le contexte audio et initialiser l'éditeur.
  </p>
  <button
    on:click={startAudioClock}
    class="px-6 py-2 bg-theme-accent-primary text-theme-bg-primary font-semibold uppercase tracking-wider hover:bg-theme-accent-secondary transition-colors"
  >
    Démarrer l'horloge
  </button>
</div>

<style>
  .start-overlay {
    min-height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
  }
</style>