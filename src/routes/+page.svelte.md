<script>
     import Info from "$lib/components/Info.svelte";
     import Gallery from "$lib/components/Gallery.svelte";

     let intro_gallery = [
        {link: "https://ralt144mi.remigeorges.fr/Ralt144MI3.png", description: "Rémi Georges"},
        {link: "https://www.cookie.paris/static/bc65c5fd7f7c76dc70bcd9892dc17a4d/7c735/16.webp", description: "Azertype"},
        {link: "https://www.cookie.paris/static/9dbc442f1f54a41b9210b3ba1b835226/7c735/13.webp", description: "Jules Cipher"},
        {link: "../images/leondenise.jpeg", description: "Léon Denise"},
        {link: "../images/algorave_2025.jpg", description: "Algorave au Grrrnd Zero"},
        {link: "https://sardine.raphaelforment.fr/presentation/what_is_live_coding.jpeg#center", description: "Raphaël Forment"},
     ]
</script>
<svelte:head>
    <title>Live Coding FR</title> 
</svelte:head>

# Bienvenue

[Livecoding.fr](https://livecoding.fr) est un site consacré à la mise en valeur de la pratique du _live coding_ en France. Il est périodiquement maintenu par un [groupe d'artistes](https://livecoding.fr/membres) et de musiciens francophones. Il se destine à servir de portail pour découvrir différents aspects de cette pratique : [évènements](https://livecoding.fr/evenements), [outils](https://livecoding.fr/outils), [réseaux](https://livecoding.fr/reseaux), liens vers le travail des artistes répertoriés, etc. Toute modification est la bienvenue. Le site est conçu pour être maintenu et actualisé facilement, de manière collaborative. Consultez [le dépôt](https://github.com/Bubobubobubobubo/livecodingfr) du site pour en apprendre plus.

<Gallery pictures={intro_gallery}/>

# Qu'est-ce que le live-coding ?

<Info info="Le <i>live coding</i> est une pratique d'improvisation musicale ou visuelle centrée autour de l'utilisation des langages de programmation comme instruments, au fil de la performance. Le <em>live coder</em> partage généralement son code à l'intention du public, en le projettant sur une surface. L'objectif est de faire de la programmation un geste expressif, artistique et ouvert. Le <em>live coding</em> est une pratique souvent située au croisement entre informatique musicale, synthèse sonore, improvisation et musique algorithmique ou générative.<br><br> Cette pratique encourage une approche pluri-disciplinaire de la création artistique. Musique, visuels, jeux vidéos et danse sont souvent mêlés au cours des performances. Le <em>live coding</em>, du fait de son histoire, est aussi un domaine de réflexion critique autour de notre rapport à l'informatique, à la technologie et à la culture numérique. De nombreux <i>live coders</i> sont traversés par l'influence de la culture <i>hacker</i>, par les philosophies du logiciel libre et <i>open source</i>. Cette pratique, mécaniquement, encourage à percevoir les logiciels comme des supports <i>exploratoires</i> ou <i>conversationnels</i>, et non seulement comme de simples outils pour la création." markdown=false />

Le _live coding_ a été historiquement promu et popularisé par le collectif international [TOPLAP](https://toplap.org). La scène du _live coding_ réunit aujourd'hui de nombreux [chercheurs](https://livecodingbook.toplap.org/), musiciens et développeurs de tous horizons. De nombreux groupes en Europe et dans le monde sont issus de la sphère d'influence de ce collectif et ont depuis trouvé leur voix propre : [TOPLAP Barcelona](https://toplap.cat/en/home), [Livecode NYC](https://livecode.nyc/), parmi d'autres. La pratique du _live coding_ s'est popularisée au travers d'un [manifeste](https://toplap.org/wiki/ManifestoDraft) et de nombreuses [Algoraves](https://algorave.com) (_algorithmic rave parties_, à partir de 2012). Toutefois, limiter le <i>live coding</i> à ce seul phénomène culturel revient à ne prêter à attention qu'à l'arbre qui cache la forêt. Le _live coding_ est une pratique ancienne, qui existe <i>a minima</i> depuis la fin des années 1980. Cette dernière s'est disséminée dans l'ensemble des arts numériques, aussi bien en [musique](https://supercollider.github.io/) que dans les [arts visuels](https://teddavis.org/p5live/), le [jeu vidéo](https://chuck.cs.princeton.edu/chunity/), etc. Le _live coding_ est une pratique courante en informatique, bien que sa mise en valeur par la performance soit un phénomène plus rare.

<iframe src="https://www.youtube.com/embed/2GSNAGLkvGw" title="Algorave Lyon 2025 - 18h - 6h @GrrrndZero" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
