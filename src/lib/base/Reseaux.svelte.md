<script>
     import SoftwareCard from "$lib/components/SoftwareCard.svelte";
     import Info from "$lib/components/Info.svelte";
     import Reseaux from "$lib/data/reseaux.json";
     let reseaux = Reseaux;
</script>

# Réseaux

<Info info="Il existe plusieurs collectifs et groupes qui promeuvent la pratique du <i>live coding</i>. Cette page est un recensement des groupes connus. Si vous êtes actifs, ajoutez quelque chose ici." markdown=false />

{#each reseaux as {name, place, description, image, link}, i}
<SoftwareCard name={name} creator={place} description={description}
image={image} link={link} />
{/each}
