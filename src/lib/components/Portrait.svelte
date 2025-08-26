<script lang="ts">
  export let image: string;
  export let name: string;
  export let site: string;
  export let description: string;
</script>

<div
  class="w-full max-w-sm mx-auto h-96 bg-neutral-800 shadow-lg transition-all hover:scale-105 hover:shadow-xl duration-200 flex flex-col border border-gray-700 hover:border-orange-400"
>
  <div class="flex flex-col items-center p-6 h-full border-t-2 border-orange-400">
    <!-- Profile Image -->
    <div class="w-28 h-28 sm:w-32 sm:h-32 mb-4 shadow-lg overflow-hidden">
      <img 
        src={image} 
        alt={name}
        class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    
    <!-- Name -->
    <h3 class="mb-3 text-lg font-semibold text-white text-center member-name">
      {name}
    </h3>
    
    <!-- Description -->
    <div class="flex-1 overflow-hidden mb-4">
      <p class="text-sm text-gray-400 text-center leading-relaxed line-clamp-4 overflow-hidden font-normal">
        {description}
      </p>
    </div>
    
    <!-- Button -->
    <div class="pb-2">
      <a
        href={site}
        class="btn btn-sm bg-neutral-700 hover:bg-neutral-600 text-white border-none transition-colors duration-200 px-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        Site
      </a>
    </div>
  </div>
</div>
