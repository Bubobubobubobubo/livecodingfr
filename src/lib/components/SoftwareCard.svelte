<script lang="ts">
  export let name: string;
  export let creator: string;
  export let link: string;
  export let image: string;
  export let description: string;
</script>

<a
  href={link}
  class="group flex flex-col bg-neutral-900 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-orange-500 hover:scale-[1.005]"
>
  <div class="w-full h-40 overflow-hidden bg-black">
    <img
      class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
      src={image}
      alt={name}
      loading="lazy"
    />
  </div>
  <div class="flex flex-col flex-grow p-4">
    <div class="mb-3">
      <h3 class="text-lg font-bold text-white mb-1 tracking-tight leading-tight group-hover:text-orange-400 transition-colors">
        {name}
      </h3>
      <p class="text-xs uppercase tracking-wider text-orange-400 font-medium">{creator}</p>
    </div>
    <p class="text-sm text-gray-300 leading-relaxed line-clamp-3">
      {description}
    </p>
  </div>
</a>

<style>
  .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
</style>
