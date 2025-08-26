<svelte:head>
    <title>Presse</title> 
</svelte:head>
<script>
     import Grid from "$lib/components/Grid.svelte";
     import Press from "$lib/components/Press.svelte";
     import Presse from "$lib/data/presse.json";
     import { shuffleArray } from "$lib/utils";
     let general_press = Presse;
     shuffleArray(general_press);
</script>

# Presse

<Grid>
     {#each general_press as press}
          <Press 
               title={press.title} 
               description={press.author} 
               image={press.picture} 
               link={press.link} 
          />
     {/each}
</Grid>