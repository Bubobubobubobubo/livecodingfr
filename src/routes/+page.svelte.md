<script>
     import Info from "$lib/components/Info.svelte";
     import Gallery from "$lib/components/Gallery.svelte";

     let intro_gallery = [
        {link: "https://ralt144mi.remigeorges.fr/Ralt144MI3.png", description: "Rémi Georges"},
        {link: "https://www.cookie.paris/static/bc65c5fd7f7c76dc70bcd9892dc17a4d/7c735/16.webp", description: "Azertype"},
        {link: "https://www.cookie.paris/static/9dbc442f1f54a41b9210b3ba1b835226/7c735/13.webp", description: "Jules Cipher"},
        {link: "../images/leondenise.jpeg", description: "Léon Denise"},
        {link: "https://renardo.org/images/screenshot1.png", description: "Renardo"},
        {link: "https://sardine.raphaelforment.fr/presentation/what_is_live_coding.jpeg#center", description: "Raphaël Forment"},
     ]
</script>
<svelte:head>
    <title>LC.FR</title> 
</svelte:head>

# Bienvenue

[Livecoding.fr](https://livecoding.fr) est un site consacré à la pratique du _live coding_ en France. Il est périodiquement maintenu par un groupe d'artistes, de musiciens et de _live coders_ francophones. Ce site est destiné à servir de base de ressources et de portail pour découvrir les différents aspects de cette pratique : guides, articles, évènements, information sur les artistes, etc. Toute modification est bienvenue, le site étant conçu comme un support libre et _open source_. Nous vous renvoyez vers [ce guide](/guides/ajouter_information) ou [ce guide](/guides/proposer_guide) pour apprendre comment modifier le site.

<Gallery pictures={intro_gallery}/>

# Qu'est-ce que le live-coding ?

<Info info="Le <i>live coding</i> est une pratique d'improvisation musicale ou visuelle centrée autour de l'utilisation des langages de programmation comme instruments, au fil de la performance. Le <em>live coder</em> partage généralement son code à l'intention du public, en le projettant sur une surface. L'objectif est de faire de la programmation un geste expressif, artistique et ouvert. Le <em>live coding</em> est une pratique souvent située au croisement entre informatique musicale, synthèse sonore, improvisation et musique algorithmique ou générative.<br><br> Cette pratique encourage une approche pluri-disciplinaire de la création artistique. Musique, visuels, jeux vidéos et danse sont souvent mêlés au cours des performances. Le <em>live coding</em>, du fait de son histoire, est aussi un domaine de réflexion critique autour de notre rapport à l'informatique, à la technologie et à la culture numérique. De nombreux <i>live coders</i> sont traversés par l'influence de la culture <i>hacker</i>, par les philosophies du logiciel libre et <i>open source</i>. Cette pratique, mécaniquement, encourage à percevoir les logiciels comme des supports <i>exploratoires</i> ou <i>conversationnels</i>, et non seulement comme de simples outils pour la création." markdown=false />

Historiquement, le _live coding_ a été promu et popularisé par le collectif [TOPLAP](https://toplap.org), aujourd'hui composé de [chercheurs](https://livecodingbook.toplap.org/), de musiciens et de développeurs de tous horizons. De nombreux groupes en Europe et dans le monde sont issus de la sphère d'influence de ce collectif : [TOPLAP Barcelona](https://toplap.cat/en/home), [Livecode NYC](https://livecode.nyc/), parmi d'autres. La pratique du _live coding_ s'est popularisée au travers du [Manifeste TOPLAP]() et des [Algoraves](https://algorave.com) (_algorithmic rave parties_). Toutefois, limiter le <i>live coding</i> à ce seul phénomène culturel revient à ne prêter à attention qu'à l'arbre qui cache la forêt. Le _live coding_ est une pratique ancienne, qui existe <i>a minima</i> depuis la fin des années 1980. Cette dernière s'est disséminée dans l'ensemble des arts numériques, aussi bien en [musique](https://supercollider.github.io/) que dans les [arts visuels](https://teddavis.org/p5live/), le [jeu vidéo](https://chuck.cs.princeton.edu/chunity/), etc.

# À propos de ce site

Ce site est conçu pour combler le vide qui existe aujourd'hui en France autour de ces pratiques. La communauté francophone du _live coding_ ne possédait pas jusqu'à présent de site permettant aux artistes et musiciens français de se rencontrer et d'échanger facilement. Disposer d'un site dédié permet de rompre avec la nécessité de se tenir informé sans cesse sur les réseaux sociaux sous peine de manquer une information. Ce site est conçu et maintenu par [Raphaël Forment](https://raphaelforment.fr) (BuboBubo). L'information de chacune des pages est structurée par aléatoire afin de favoriser la découverte.

# Comment contribuer ?

Le site est hébergé sur [GitHub](https://github.com/Bubobubobubobubo/livecodingfr). Pour ajouter une information au site, veuillez créer une [Pull Request](https://docs.github.com/fr/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). Vous pouvez aussi contacter l'un des artistes cités sur cette page, sur pourra se charger de relayer l'information.
