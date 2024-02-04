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

<Info info="Cette page recense les outils conçus par la communauté francophone du <i>live coding</i>. Pour une page plus généraliste, consulter <a href='https://github.com/toplap/awesome-livecoding'>Awesome Live Coding</a>. Pour élargir un petit peu, consultez également <a href='https://github.com/noteflakes/awesome-music'>Awesome Music</a> et autres listes sur les logiciels DIY. Éditez le site pour rajouter votre outil ! <b>Toutes les contributions sont acceptées !</b>", markdown=false />


{#each softwares as {name, creator, description, image, link}}
<SoftwareCard name={name} creator={creator} description={description} image={image} link={link} />
{/each}

