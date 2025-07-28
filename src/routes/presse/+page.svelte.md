<svelte:head>
    <title>Presse</title> 
</svelte:head>
<script>
     import Press from "$lib/components/Press.svelte";
     import Presse from "$lib/data/presse.json";
     import { shuffleArray } from "$lib/utils";
     let general_press = Presse;
     shuffleArray(general_press);
</script>

# Presse

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
     {#each general_press as {title, picture, link, author}, i}
          <Press title={title} description={author} image={picture} link={link} />
     {/each}
</div>
