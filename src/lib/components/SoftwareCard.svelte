<script lang="ts">
  export let name: string;
  export let creator: string;
  export let link: string;
  export let image: string;
  export let description: string;
</script>

<a
  href={link}
  class="group flex flex-col bg-theme-bg-secondary overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-theme-border-secondary hover:border-theme-accent-primary hover:scale-[1.005]"
>
  <div class="w-full h-40 overflow-hidden bg-theme-bg-tertiary">
    <img
      class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
      src={image}
      alt={name}
      loading="lazy"
    />
  </div>
  <div class="flex flex-col flex-grow p-4">
    <div class="mb-3">
      <h3 class="text-lg font-bold text-theme-text-primary mb-1 tracking-tight leading-tight group-hover:text-theme-accent-primary transition-colors">
        {name}
      </h3>
      <p class="text-xs uppercase tracking-wider text-theme-accent-primary font-medium">{creator}</p>
    </div>
    <p class="text-sm text-theme-text-secondary leading-relaxed line-clamp-3">
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
