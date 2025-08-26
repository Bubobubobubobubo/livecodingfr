<script>
     import Grid from "$lib/components/Grid.svelte";
     import Portrait from "$lib/components/Portrait.svelte";
     import Membres from "$lib/data/membres.json";
     import { shuffleArray } from "$lib/utils";
     let members = Membres;
     shuffleArray(members);
</script>
<svelte:head>
    <title>Membres</title> 
</svelte:head>



# Membres

<Grid columns={3} gap={1}>
     {#each members as member}
          <Portrait 
               name={member.name} 
               description={member.description} 
               image={member.image} 
               site={member.site} 
               mail={member.mail}
          />
     {/each}
</Grid>