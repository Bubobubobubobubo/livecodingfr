<script lang="ts">
  type Picture = {
    link: string;
    description: string;
  };
  export let pictures: Picture[];
</script>

<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  {#each pictures as pic}
    <div>
      <img
        class="h-auto max-w-full rounded-lg"
        src={pic.link}
        alt={pic.description}
      />
    </div>
  {/each}
</div>
