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
    background: #262626;
    border: 1px solid #1f2937;
    height: 80px;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 20px;
    min-width: 280px;
  }

  .clock-icon {
    color: #10b981;
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
    color: #ffffff;
    font-weight: 500;
    line-height: 1.2;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
</style>