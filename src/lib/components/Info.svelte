<script lang="ts">
  import { onMount } from "svelte";
  import { marked } from "marked";
  export let info: string;
  export let markdown: boolean;
  let htmlContent = "";

  onMount(() => {
    if (markdown) {
      htmlContent = marked(info);
    } else {
      htmlContent = info;
    }
  });
</script>

<div class="alert bg-theme-bg-secondary border-theme-border-primary border mb-6">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    class="stroke-current shrink-0 w-6 h-6 text-theme-accent-primary"
    ><path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    /></svg
  >
  <span class="text-lg text-theme-text-primary font-normal leading-relaxed">{@html info}</span>
</div>
