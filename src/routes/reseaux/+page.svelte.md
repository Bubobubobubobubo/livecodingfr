<svelte:head>
    <title>Réseaux</title> 
</svelte:head>
<script>
     import SoftwareCard from "$lib/components/SoftwareCard.svelte";
     import Info from "$lib/components/Info.svelte";
     import Reseaux from "$lib/data/reseaux.json";
     import { shuffleArray } from "$lib/utils";
     let reseaux = Reseaux;
     shuffleArray(reseaux);
</script>

# Réseaux

<Info info="Il existe plusieurs collectifs et groupes qui promeuvent la pratique du <i>live coding</i>. Cette page est un recensement des groupes connus. Si vous êtes actifs, faites-le nous savoir ou ajoutez quelque chose ici depuis le dépôt GitHub." markdown=false />

<div class="space-y-6 mt-8">
{#each reseaux as {name, place, description, image, link}, i}
<SoftwareCard name={name} creator={place} description={description}
image={image} link={link} />
{/each}
</div>
