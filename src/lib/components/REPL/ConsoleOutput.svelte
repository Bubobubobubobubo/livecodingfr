<script>
  export let outputs = [];
  export let errorMessage = '';
</script>

{#if outputs.length > 0 || errorMessage}
  <div class="output-container">
    <div class="text-sm font-semibold text-theme-text-secondary uppercase tracking-wider mb-1">Console:</div>
    <div class="bg-theme-bg-tertiary p-2">
      {#each outputs as output}
        <div class="console-line mb-1">
          {#if output.type === 'log'}
            <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-theme-text-primary">{output.message}</code></pre>
          {:else if output.type === 'error'}
            <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-red-400">✖ {output.message}</code></pre>
          {:else if output.type === 'warn'}
            <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-yellow-400">⚠ {output.message}</code></pre>
          {:else if output.type === 'info'}
            <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-blue-400">ℹ {output.message}</code></pre>
          {:else if output.type === 'debug'}
            <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-theme-text-muted">{output.message}</code></pre>
          {:else if output.type === 'return'}
            <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-green-400">← {output.message}</code></pre>
          {/if}
        </div>
      {/each}
      
      {#if errorMessage}
        <div class="console-line">
          <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-red-500">✖ Uncaught {errorMessage}</code></pre>
        </div>
      {/if}
    </div>
  </div>
{/if}