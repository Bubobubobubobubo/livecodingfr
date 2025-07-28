<script>
     import Portrait from "$lib/components/Portrait.svelte";
     import Membres from "$lib/data/membres.json";
     import { shuffleArray } from "$lib/utils";
     let members = Membres;
     shuffleArray(members);
</script>
<svelte:head>
    <title>Membres</title> 
</svelte:head>



# Membres

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
     {#each members as {name, description, image, site, mail}, i}
          <div>
               <Portrait name={name} description={description} image={image} site={site} mail={mail}/>
          </div>
     {/each}
</div>
