<script lang="ts">
  type Picture = {
    link: string;
    description: string;
  };
  export let pictures: Picture[];
</script>

<div class="grid grid-cols-2 md:grid-cols-3 gap-6 my-8">
  {#each pictures as pic}
    <div class="group relative overflow-hidden bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
      <div class="aspect-square overflow-hidden">
        <img
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={pic.link}
          alt={pic.description}
          loading="lazy"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="absolute bottom-4 left-4 right-4">
          <p class="text-white text-sm font-medium truncate">{pic.description}</p>
        </div>
      </div>
    </div>
  {/each}
</div>
