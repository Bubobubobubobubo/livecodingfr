<script>
     import Portrait from "$lib/components/Portrait.svelte";
     import Membres from "$lib/data/membres.json";
     let members = Membres;
</script>

# Membres

<div class="lg:grid sm:grid grid-cols-2 md:grid-cols-3 grid-rows-2 md:grid-rows-3 mx-auto gap-4">
     {#each members as {name, description, image, site, mail}, i}
          <div>
               <Portrait name={name} description={description} image={image} site={site} mail={mail}/>
          </div>
     {/each}
</div>
