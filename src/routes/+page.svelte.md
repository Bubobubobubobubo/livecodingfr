<script>
     import Info from "$lib/components/Info.svelte";
     import Gallery from "$lib/components/Gallery.svelte";

     let intro_gallery = [
        {link: "https://ralt144mi.remigeorges.fr/Ralt144MI3.png", description: "Rémi Georges"},
        {link: "https://www.cookie.paris/static/bc65c5fd7f7c76dc70bcd9892dc17a4d/5cc0d/16.webp", description: "Azertype"},
        {link: "https://www.cookie.paris/static/9dbc442f1f54a41b9210b3ba1b835226/5cc0d/13.webp", description: "Jules Cipher"},
        {link: "../images/leondenise.jpeg", description: "Léon Denise"},
        {link: "https://renardo.org/images/screenshot1.png", description: "Renardo"},
        {link: "https://sardine.raphaelforment.fr/presentation/what_is_live_coding.jpeg#center", description: "Raphaël Forment"},
     ]
</script>
<svelte:head>
    <title>LC.FR</title> 
</svelte:head>

# Bienvenue

[Livecoding.fr](https://livecoding.fr) est un site d'information consacré à la pratique du _live coding_. Il est maintenu par l'effort communautaire d'un groupe d'artistes, de musiciens et de développeurs francophones. Son objectif est de centraliser les informations sur cette pratique et de servir de portail : guides, articles, évènements, information sur les artistes, etc. Tout ajout est le bienvenu. Consulter [ce guide](/guides/ajouter_information) ou [ce guide](/guides/proposer_guide) pour apprendre comment ajouter une information.

<Gallery pictures={intro_gallery}/>

# Qu'est-ce que le live-coding ?

<Info info="Le <i>live coding</i> est une pratique qui fait de l'acte de programmation un geste expressif, performatif et artistique. Les <i>live coders</i> considèrent l'interface de programmation comme un instrument pour la création temps réel. Le <i>live coding</i> est un art au croisement entre synthèse sonore, improvisation musicale et musique algorithmique générative.<br><br> Le <i>live coding</i> est au croisement de plusieurs arts et encourage des approches transdisciplinaires de la création : musique, arts visuels, informatique, jeux vidéos, danse, etc. Plus largement, le <i>live coding</i> est une approche critique de la création qui encourage les artistes à ré-imaginer leur rapport à l'informatique. Le <i>live coding</i> est traversé par la culture <i>hacker</i>, par la philosophie du logiciel libre et <i>open source</i>. C'est une pratique qui cherche à développer une nouvelle forme d'expressivité au sein des arts. Le <i>live coding</i> considère l'ordinateur comme un outil pour la <i>programmation exploratoire</i> ou la <i>programmation conversationnelle</i>, comme un outil de discussion et de médiation." markdown=false />

Historiquement, le _live coding_ est un type de création porté par le collectif [TOPLAP](https://toplap.org). Il existe de nombreux groupes en Europe et dans le monde qui sont issus de ce collectif : [TOPLAP Barcelona](https://toplap.cat/en/home), [Livecode NYC](https://livecode.nyc/), parmi d'autres. La pratique du _live coding_ s'est popularisée au travers du [Manifeste TOPLAP]() et des [Algoraves](https://algorave.com) (_algorithmic rave parties_). Il s'agit pourtant de _l'arbre qui cache la forêt_ : le _live coding_ est une pratique qui existe depuis la fin des années 1980, et que l'on retrouve un peu partout dans les arts numériques.

# À propos de ce site

Ce site est une collection de ressources. Il est conçu pour combler un vide. La communauté francophone du _live coding_ ne possédait pas de site permettant aux artistes et musiciens français de se trouver et d'échanger facilement. Disposer d'un site dédié permet de rompre avec la nécessité de se tenir informé sans cesse sur les réseaux sociaux sous peine de manquer une information. Ce site est conçu et maintenu par [Raphaël Forment](https://raphaelforment.fr) (BuboBubo).

L'information sur chacune des pages est randomisée pour favoriser la découverte.

# Comment contribuer ?

Le site est hébergé sur [GitHub](https://github.com/Bubobubobubobubo/livecodingfr). Pour ajouter une information au site, veuillez créer une [Pull Request](https://docs.github.com/fr/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). Vous pouvez aussi contacter l'un des membres qui se chargera de transmettre l'information.
