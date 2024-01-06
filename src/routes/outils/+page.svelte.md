<svelte:head>
    <title>Outils</title> 
</svelte:head>
<script>
     import SoftwareCard from "$lib/components/SoftwareCard.svelte";
     import Software from "$lib/data/outils.json";
     import Info from "$lib/components/Info.svelte";
     import { shuffleArray } from "$lib/utils";
     let softwares = Software;
     shuffleArray(softwares);
</script>

# Outils

<Info info="Si vous souhaitez consulter une liste fréquemment mise à jour de logiciels et d'interfaces pour le <i>live coding</i>, consulter <a href='https://github.com/toplap/awesome-livecoding'>Awesome LiveCoding</a>. Pour élargir un petit peu, consultez également <a href='https://github.com/noteflakes/awesome-music'>Awesome Music</a>.", markdown=false />


{#each softwares as {name, creator, description, image, link}}
<SoftwareCard name={name} creator={creator} description={description} image={image} link={link} />
{/each}

Éditez le site pour rajouter votre outil ! **Toutes les contributions sont acceptées !**
