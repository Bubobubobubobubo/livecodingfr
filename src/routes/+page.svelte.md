<script>
     import Info from "$lib/components/Info.svelte";
     import Gallery from "$lib/components/Gallery.svelte";
     import YouTubeLazyLoad from "$lib/components/YouTubeLazyLoad.svelte";

     let intro_gallery = [
        {link: "../images/members/ralt144mi.webp", description: "Rémi Georges"},
        {link: "../images/members/azertype1.webp", description: "Azertype"},
        {link: "../images/members/azertype2.webp", description: "Jules Cipher"},
        {link: "../images/leondenise.jpeg", description: "Léon Denise"},
        {link: "../images/algorave_2025.jpg", description: "Algorave au Grrrnd Zero"},
        {link: "../images/what_is_live_coding.webp", description: "Raphaël Forment"},
     ]
</script>
<svelte:head>
    <title>Live Coding FR</title> 
</svelte:head>

# Bienvenue

[Livecoding.fr](https://livecoding.fr) est un site dédié à la mise en valeur de la pratique du _live coding_ en France. Il est périodiquement maintenu par un [groupe d'artistes](https://livecoding.fr/membres) et de musiciens francophones. Il se destine à servir de portail pour découvrir différents aspects de cette pratique : [évènements](https://livecoding.fr/evenements), [outils](https://livecoding.fr/outils), [réseaux](https://livecoding.fr/reseaux), liens vers le travail des artistes répertoriés, etc. Toute modification est la bienvenue. Le site est conçu pour être maintenu et actualisé facilement, de manière collaborative. Consultez [le dépôt](https://github.com/Bubobubobubobubo/livecodingfr) du site pour en apprendre plus.

<Gallery pictures={intro_gallery}/>

# Qu'est-ce que le live-coding ?

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-theme-text-primary">
<div>
Le <i>live coding</i> est une pratique d'improvisation où les langages de programmation deviennent des instruments de création temps réel. Durant leur performance, les <i>live coders</i> écrivent et modifient du code, le projettent afin que le public puisse suivre leur processus créatif. Cette transparence transforme la programmation en un moment d'expression artistique ouvert, partagé, visible de tous. Cette pratique se situe au croisement de l'informatique musicale, de l'ingéniérie logicielle, de l'improvisation et de la musique algorithmique ou générative. Le <i>live coding</i> est une pratique intrinsèquement pluridisciplinaire. Les artistes entrelacent librement création sonore et visuelle, pensée algorithmique et geste créatif. En transformant l'ordinateur en instrument, le <i>live coding</i> offre un contrepoint intéressant au paysage habituel -- et déjà figé -- des lutheries contemporaines.
</div>
<div>
Au-delà de la performance, le <i>live coding</i> est une pratique qui mène à développer un regard critique sur notre rapport à l'informatique, à la numérisation des pratiques de création, aux industries culturelles. Le <i>live coding</i> est aussi un espace de militantisme, prônant un échange libre des idées et des savoirs. Héritiers de la culture <i>hacker</i> et des philosophies du logiciel libre et <i>open source</i>, les <i>live coders</i> sont attachés à une certaine éthique, à une manière de faire et de travailler. Leur pratique révèle que les logiciels ne sont pas seulement de simples instruments mais des espaces d'exploration et de conversation avec la machine, avec le public, avec eux-mêmes, etc. Ils invitent par leurs performances à nouer un dialogue créatif direct avec l'ordinateur, au contraire de la tendance générale à considérer cet objet comme un simple outil passif pour la création.
</div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-theme-text-primary mt-6">
<div>
Le <i>live coding</i> a été historiquement promu et popularisé par le collectif international <a href="https://toplap.org">TOPLAP</a>. La scène du <i>live coding</i> réunit aujourd'hui de nombreux <a href="https://livecodingbook.toplap.org/">chercheurs</a>, musiciens et développeurs de tous horizons. De nombreux groupes en Europe et dans le monde sont issus de la sphère d'influence de ce collectif et ont depuis trouvé leur voix propre : <a href="https://toplap.cat/en/home">TOPLAP Barcelona</a>, <a href="https://livecode.nyc/">Livecode NYC</a>, parmi d'autres. La pratique du <i>live coding</i> s'est popularisée au travers d'un <a href="https://toplap.org/wiki/ManifestoDraft">manifeste</a> et de nombreuses <a href="https://algorave.com">Algoraves</a> (<i>algorithmic rave parties</i>, à partir de 2012). Toutefois, limiter le <i>live coding</i> à ce seul phénomène culturel revient à ne prêter à attention qu'à l'arbre qui cache la forêt. Le <i>live coding</i> est une pratique ancienne, qui existe <i>a minima</i> depuis la fin des années 1980. Cette dernière s'est disséminée dans l'ensemble des arts numériques, aussi bien en <a href="https://supercollider.github.io/">musique</a> que dans les <a href="https://teddavis.org/p5live/">arts visuels</a>, le <a href="https://chuck.cs.princeton.edu/chunity/">jeu vidéo</a>, etc. Le <i>live coding</i> est une pratique courante en informatique, bien que sa mise en valeur par la performance soit un phénomène plus rare.
</div>
<div class="bg-theme-bg-secondary rounded-lg flex items-center justify-center min-h-[200px]">
<span class="text-theme-text-muted"><img src="../images/buboquark_algorave_grrrnd.webp"/></span>
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
