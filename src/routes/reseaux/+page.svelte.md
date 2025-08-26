<svelte:head>
    <title>Réseaux</title> 
</svelte:head>
<script>
     import Grid from "$lib/components/Grid.svelte";
     import SoftwareCard from "$lib/components/SoftwareCard.svelte";
     import Info from "$lib/components/Info.svelte";
     import Reseaux from "$lib/data/reseaux.json";
     import { shuffleArray } from "$lib/utils";
     let reseaux = Reseaux;
     shuffleArray(reseaux);
</script>

# Réseaux

<Info info="Il existe plusieurs collectifs et groupes qui promeuvent la pratique du <i>live coding</i>. Cette page est un recensement des groupes connus. Si vous êtes actifs, faites-le nous savoir ou ajoutez quelque chose ici depuis le dépôt GitHub." markdown=false />

<Grid>
  {#each reseaux as network}
    <SoftwareCard 
      name={network.name}
      creator={network.place}
      description={network.description}
      image={network.image}
      link={network.link}
    />
  {/each}
</Grid>
