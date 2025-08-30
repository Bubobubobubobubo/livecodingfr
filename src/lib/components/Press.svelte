<script lang="ts">
  export let title: string;
  export let description: string;
  export let image: string;
  export let link: string;

  const truncateString = (title: string, length: number) => {
    return title.length > length ? title.slice(0, length - 3) + "..." : title;
  };
</script>

<div
  class="w-full bg-theme-bg-secondary shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] flex flex-col h-full border border-theme-border-secondary hover:border-theme-accent-primary"
>
  <a href={link} target="_blank" rel="noopener noreferrer">
    <img class="h-40 w-full object-cover" src={image} alt="" loading="lazy" />
  </a>
  <div class="p-4 flex flex-col flex-1 border-t-2 border-theme-accent-primary">
    <a href={link} target="_blank" rel="noopener noreferrer">
      <h3 class="mb-2 text-base font-semibold text-theme-text-primary leading-tight hover:text-theme-accent-secondary transition-colors duration-200">
        {truncateString(title, 60)}
      </h3>
    </a>
    <p class="mb-4 text-sm text-theme-text-muted font-normal leading-relaxed flex-1">
      {description}
    </p>
    <div class="mt-auto">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center text-sm font-medium text-theme-accent-secondary hover:text-theme-accent-primary transition-colors duration-200"
      >
        Lire l'article →
      </a>
    </div>
  </div>
</div>
