<script lang="ts">
  export let src: string;
  export let alt: string;
  export let className: string = '';
  export let loading: 'lazy' | 'eager' = 'lazy';
  
  let loaded = false;
  let imageElement: HTMLImageElement;
  
  // Generate WebP source if original is JPG/PNG
  $: webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
  $: shouldUseWebp = /\.(jpe?g|png)$/i.test(src);
  
  function handleLoad() {
    loaded = true;
  }
</script>

{#if shouldUseWebp}
  <picture>
    <source srcset={webpSrc} type="image/webp">
    <img 
      {src} 
      {alt} 
      {loading}
      class="{className} {loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300"
      bind:this={imageElement}
      on:load={handleLoad}
    >
  </picture>
{:else}
  <img 
    {src} 
    {alt} 
    {loading}
    class="{className} {loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300"
    bind:this={imageElement}
    on:load={handleLoad}
  >
{/if}