<script>
  import ResourceCard from './ResourceCard.svelte';
  
  export let resources = [];
</script>

<div class="resource-grid">
  {#each resources as resource}
    <ResourceCard 
      title={resource.title}
      href={resource.href}
      image={resource.image}
      description={resource.description}
      links={resource.links}
    />
  {/each}
</div>

<style>
  .resource-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  @media (min-width: 640px) {
    .resource-grid {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    }
  }

  @media (min-width: 1024px) {
    .resource-grid {
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }
  }
</style>