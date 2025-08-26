<script lang="ts">
  export let src: string = '';
  export let title: string = '';
  export let className: string = 'w-full h-full';
  
  let loaded = false;
  let videoId = '';
  let thumbnailError = false;
  let thumbnailQuality = 'maxresdefault';
  
  // Extract video ID from YouTube URL
  $: if (src) {
    const match = src.match(/embed\/([^?]+)/);
    if (match) {
      videoId = match[1];
    }
  }
  
  function loadVideo() {
    loaded = true;
  }
  
  function handleThumbnailError() {
    // Try different quality levels in order
    const qualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
    const currentIndex = qualities.indexOf(thumbnailQuality);
    
    if (currentIndex < qualities.length - 1) {
      thumbnailQuality = qualities[currentIndex + 1];
    } else {
      // All thumbnail qualities failed
      thumbnailError = true;
    }
  }
</script>

{#if !loaded}
  <button
    on:click={loadVideo}
    class="relative {className} bg-black group cursor-pointer overflow-hidden"
    aria-label="Play video: {title}"
  >
    <!-- YouTube thumbnail or placeholder -->
    {#if !thumbnailError}
      <img
        src="https://img.youtube.com/vi/{videoId}/{thumbnailQuality}.jpg"
        alt={title}
        class="w-full h-full object-cover"
        loading="lazy"
        on:error={handleThumbnailError}
      />
    {:else}
      <!-- Elegant placeholder when no thumbnail is available -->
      <div class="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
        <div class="text-center">
          <svg
            class="w-16 h-16 mx-auto mb-3 text-orange-400 opacity-50"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23 9.04c0-.21-.02-.41-.05-.61-.06-.52-.19-1.02-.38-1.5-.38-.97-1.03-1.77-1.89-2.26-.43-.25-.91-.42-1.42-.51-.2-.04-.41-.06-.62-.08C18.05 4.01 17.44 4 16.83 4H7.17c-.61 0-1.22.01-1.81.08-.21.02-.42.04-.62.08-.51.09-.99.26-1.42.51-.86.49-1.51 1.29-1.89 2.26-.19.48-.32.98-.38 1.5-.03.2-.05.4-.05.61C1 9.63 1 10.24 1 10.85v2.3c0 .61 0 1.22.05 1.81.03.21.05.41.08.61.06.52.19 1.02.38 1.5.38.97 1.03 1.77 1.89 2.26.43.25.91.42 1.42.51.2.04.41.06.62.08.59.07 1.2.08 1.81.08h9.66c.61 0 1.22-.01 1.81-.08.21-.02.42-.04.62-.08.51-.09.99-.26 1.42-.51.86-.49 1.51-1.29 1.89-2.26.19-.48.32-.98.38-1.5.03-.2.05-.4.08-.61.05-.59.05-1.2.05-1.81v-2.3c0-.61 0-1.22-.05-1.81zM9.54 15.85V8.15l6.92 3.85-6.92 3.85z"/>
          </svg>
          <p class="text-gray-400 text-sm">Vidéo YouTube</p>
        </div>
      </div>
    {/if}
    
    <!-- Play button overlay -->
    <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-200">
      <div class="bg-red-600 rounded-xl p-4 group-hover:scale-110 transition-transform duration-200">
        <svg
          class="w-12 h-12 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
    
    <!-- Video title -->
    {#if title}
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p class="text-white text-sm font-medium">{title}</p>
      </div>
    {/if}
  </button>
{:else}
  <iframe
    {src}
    {title}
    class={className}
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  />
{/if}