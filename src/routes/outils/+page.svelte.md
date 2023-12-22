<svelte:head>
    <title>Outils</title> 
</svelte:head>
<script>
     import SoftwareCard from "$lib/components/SoftwareCard.svelte";
     import Software from "$lib/data/outils.json";
     import { shuffleArray } from "$lib/utils";
     let softwares = Software;
     shuffleArray(softwares);
</script>

# Outils

Si vous souhaitez consulter une liste fréquemment mise à jour de logiciels et d'interfaces pour le _live coding_, consulter [Awesome LiveCoding](https://github.com/toplap/awesome-livecoding). Pour élargir un petit peu, consultez également [Awesome Music](https://github.com/noteflakes/awesome-music).

{#each softwares as {name, creator, description, image, link}}
<SoftwareCard name={name} creator={creator} description={description} image={image} link={link} />
{/each}

Éditez le site pour rajouter votre outil ! **Toutes les contributions sont acceptées !**
