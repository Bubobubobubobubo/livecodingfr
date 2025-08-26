<script>
     import Info from "$lib/components/Info.svelte";
     import Gallery from "$lib/components/Gallery.svelte";
     import YouTubeLazyLoad from "$lib/components/YouTubeLazyLoad.svelte";

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

[Livecoding.fr](https://livecoding.fr) est un site dédié à la mise en valeur de la pratique du _live coding_ en France. Il est périodiquement maintenu par un [groupe d'artistes](https://livecoding.fr/membres) et de musiciens francophones. Il se destine à servir de portail pour découvrir différents aspects de cette pratique : [évènements](https://livecoding.fr/evenements), [outils](https://livecoding.fr/outils), [réseaux](https://livecoding.fr/reseaux), liens vers le travail des artistes répertoriés, etc. Toute modification est la bienvenue. Le site est conçu pour être maintenu et actualisé facilement, de manière collaborative. Consultez [le dépôt](https://github.com/Bubobubobubobubo/livecodingfr) du site pour en apprendre plus.

<Gallery pictures={intro_gallery}/>

# Qu'est-ce que le live-coding ?

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black dark:text-white">
<div>
Le <i>live coding</i> est une pratique d'improvisation où les langages de programmation deviennent instruments de création en temps réel. Durant leur performance, les <i>live coders</i> écrivent et modifient du code, le projettent afin que le public puisse suivre leur processus créatif. Cette transparence transforme la programmation en un moment d'expression artistique ouvert et visible de tous. Cette pratique se situe au croisement de l'informatique musicale, des domaines de la technique, de l'improvisation et de la musique algorithmique ou générative. Le <i>live coding</i> est une pratique intrinsèquement pluridisciplinaire. Les artistes entrelacent librement création sonore et visuelle, pensée algorithmique et geste créatif. En transformant l'ordinateur en instrument, le <i>live coding</i> offre un contrepoint intéressant au paysage habituel -- et déjà trop familier -- des lutheries contemporaines.
</div>
<div>
Au-delà de la performance, le <i>live coding</i> offre un regard critique sur notre rapport à l'informatique, à la numérisation de la production culturelle et de sa consommation. Héritiers de la culture <i>hacker</i> et des philosophies du logiciel libre et <i>open source</i>, les <i>live coders</i> redéfinissent -- parfois malgré eux -- la relation qu'ils entretiennent et que nous entretenons aux arts numériques. Leur pratique révèle les logiciels non comme de simples instruments, mais comme des espaces <i>exploratoires</i> et <i>conversationnels</i> — invitant à un dialogue créatif avec la machine, plutôt qu'à son utilisation passive. Les logiciels y sont tantôt employés comme des outils pour porter un discours, tantôt considérés comme des oeuvres d'art. Ils sont autant sujet et objet de fascination.
</div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black dark:text-white mt-6">
<div>
Le <i>live coding</i> a été historiquement promu et popularisé par le collectif international <a href="https://toplap.org">TOPLAP</a>. La scène du <i>live coding</i> réunit aujourd'hui de nombreux <a href="https://livecodingbook.toplap.org/">chercheurs</a>, musiciens et développeurs de tous horizons. De nombreux groupes en Europe et dans le monde sont issus de la sphère d'influence de ce collectif et ont depuis trouvé leur voix propre : <a href="https://toplap.cat/en/home">TOPLAP Barcelona</a>, <a href="https://livecode.nyc/">Livecode NYC</a>, parmi d'autres. La pratique du <i>live coding</i> s'est popularisée au travers d'un <a href="https://toplap.org/wiki/ManifestoDraft">manifeste</a> et de nombreuses <a href="https://algorave.com">Algoraves</a> (<i>algorithmic rave parties</i>, à partir de 2012). Toutefois, limiter le <i>live coding</i> à ce seul phénomène culturel revient à ne prêter à attention qu'à l'arbre qui cache la forêt. Le <i>live coding</i> est une pratique ancienne, qui existe <i>a minima</i> depuis la fin des années 1980. Cette dernière s'est disséminée dans l'ensemble des arts numériques, aussi bien en <a href="https://supercollider.github.io/">musique</a> que dans les <a href="https://teddavis.org/p5live/">arts visuels</a>, le <a href="https://chuck.cs.princeton.edu/chunity/">jeu vidéo</a>, etc. Le <i>live coding</i> est une pratique courante en informatique, bien que sa mise en valeur par la performance soit un phénomène plus rare.
</div>
<div class="bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center min-h-[200px]">
<span class="text-gray-500 dark:text-gray-400">Image placeholder</span>
</div>
</div>

<div style="margin-top: 30px; margin-bottom: 30px;"></div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="aspect-video">
        <YouTubeLazyLoad
            className="w-full h-full"
            src="https://www.youtube.com/embed/2GSNAGLkvGw"
            title="Algorave Lyon 2025 - 18h - 6h @GrrrndZero"
        />
    </div>
    <div class="aspect-video">
        <YouTubeLazyLoad
            className="w-full h-full"
            src="https://www.youtube.com/embed/Crz6R4p_owI"
            title="Algorave : la teuf en open source | Tracks | ARTE"
        />
    </div>
</div>

<div style="margin-top: 10px; margin-bottom: 10px;"></div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="aspect-video">
        <YouTubeLazyLoad
            className="w-full h-full"
            src="https://www.youtube.com/embed/PsfTdFUQUVA"
            title="Algorave Lyon 2025 - 18h - 6h @GrrrndZero"
        />
    </div>
    <div class="aspect-video">
        <YouTubeLazyLoad
            className="w-full h-full"
            src="https://youtube.com/embed/vG8UA8uYAM0"
            title="Algorave : la teuf en open source | Tracks | ARTE"
        />
    </div>
</div>
