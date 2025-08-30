<script>
  export let clockStatus = '';
  export let show = false;
</script>

{#if show}
  <div class="clock-status">
    <div class="clock-icon">▶</div>
    <div class="clock-info">
      {#each clockStatus.split(' | ') as part}
        <div class="clock-line">{part}</div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .clock-status {
    background: rgb(var(--color-bg-secondary));
    border: 1px solid rgb(var(--color-border-primary));
    height: 80px;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 20px;
    min-width: 280px;
  }

  .clock-icon {
    color: rgb(var(--color-accent-secondary));
    font-size: 18px;
    font-weight: bold;
    animation: pulse 2s infinite;
    flex-shrink: 0;
  }

  .clock-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    justify-content: center;
  }

  .clock-line {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: rgb(var(--color-text-primary));
    font-weight: 500;
    line-height: 1.2;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
</style>