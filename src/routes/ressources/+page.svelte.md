<svelte:head>
    <title>Ressources</title> 
</svelte:head>
<script>
  import Info from "$lib/components/Info.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import ResourceCard from "$lib/components/ResourceCard.svelte";
  import YouTubeLazyLoad from "$lib/components/YouTubeLazyLoad.svelte";
  
  const frenchResources = [
    {
      title: "Cookie Collective",
      href: "https://cookie.paris",
      description: "Principal collectif francophone d'artistes live coders. Organisateur d'événements en région parisienne.",
      image: "https://www.cookie.paris/static/04d2e692bcab0866529cd81a3730c09e/a941a/10.webp",
      links: [
        {
          title: "Discord",
          href: "https://discord.gg/cookie",
          description: "Serveur de discussion le plus actif"
        },
        {
          title: "Telegram",
          href: "https://t.me/cookiecollective",
          description: "Canal d'échange secondaire"
        },
        {
          title: "Instagram",
          href: "https://www.instagram.com/cookiecollectif/?hl=en",
          description: "Principal canal pour les annonces",
        },
        {
          title: "CCC Compilation",
          href: "https://ccc.cookie.paris/",
          description: "Compilation audiovisuelle"
        }
      ]
    },
    {
      title: "Hackerspaces",
      href: "#",
      description: "Espaces de création numérique, de militantisme pour le logiciel libre/ouvert, laboratoires artistiques.",
      image: "https://fuz.re/img/17.jpg",
      links: [
        {
          title: "Le Fuz (Paris / Montreuil)",
          href: "https://fuz.re/",
          description: "Ateliers hebdomadaires de live coding"
        },
        {
          title: "Labomedia (Orléans)",
          href: "https://ressources.labomedia.org/live_coding",
          description: "Lieu d'expérimentation et de création"
        },
        {
          title: "Laboratoire Ouvert Lyonnais (Lyon)",
          href: "https://labolyon.fr/",
          description: "Principal hackerspace lyonnais",
        }
      ]
    },
    {
      title: "Centres nationaux de création musicale (CNCM)",
      href: "#",
      description: "Centres nationaux dédiés à la création et recherche en musique électroacoustique. Soutiens de la scène.",
      image: "https://www.grame.fr/assets/f1920x1200-q85-p1/346a0f23/img_3140.jpg.webp",
      links: [
        {
          title: "Athénor (Saint-Nazaire)",
          href: "https://athenor.com/",
          description: "Création musicale et résidences"
        },
        {
          title: "GRAME (Lyon)",
          href: "https://grame.fr",
          description: "Recherche en informatique musicale"
        },
        {
          title: "GRAME présente JIM LAC Algorave",
          href: "https://le-sucre.eu/events/grame-presente-jim-lac-%E2%9C%A6-algorave/",
          description: "Algorave pour la Linux Audio Conference 2025",
        },
        {
          title: "Festival de l'eau (Saint-Nazaire, Athénor)",
          href: "https://www.athenor.com/les-rendez-vous/2024-25/live-coding",
          description: "Performance de live coding (R. Georges, R. Forment)"
        }
      ]
    },
    {
      title: "TOPLAP Strasbourg",
      href: "https://livecodingstrasbourg.github.io/",
      description: "Branche strasbourgeoise du collectif TOPLAP. Ateliers et événements locaux.",
      image: "https://blog.toplap.org/wp-content/uploads/sites/9/2024/08/5x0H0GDY1KWi-toplab-1024x819.png",
      links: [
        {
          title: "Blog et guides (par Crash Server)",
          href: "https://crashserver.fr/blog/5/",
          description: "Guides d'initiation à FoxDot"
        },
        {
          title: "Code Cooking (par Crash Server)",
          href: "https://www.youtube.com/watch?v=bOFr24NGrdw&list=PLIKH_fHtdeLlF9gUUUNSVY9n0iZnZ2yUL",
          description: "Guides d'initiation à FoxDot"
        },
        {
          title: "Site du duo Crash Server",
          href: "https://crashserver.fr/",
          description: "Duo de musiciens (très actif)"
        },
      ]
    },
    {
      title: "Recherche académique",
      href: "",
      description: "Recherche universitaire à propos du live coding",
      image: "https://journee.livecoding.fr/images/jlc_affiche.png",
      links: [
        {
          title: "Journée d'étude sur le live coding",
          href: "https://journee.livecoding.fr/",
          description: "Journée d'étude (2023, Paris 8)"
        },
        {
          title: "Thèse de Florine Fouquart (arts numériques)",
          href: "https://theses.fr/s167590",
          description: "Vivre une expérience mathéma-esthésique : images programmées et mathématiques appliquées au coeur d'une pratique artistique numérique."
        },
        {
          title: "Thèse de Raphaël Forment (musicologie)",
          href: "https://theses.fr/s246917",
          description: "Some thoughts have a certain sound: Esthétiques et techniques du Live Coding en musique."
        },
      ],
    },
    {
      title: "Lieux de concert",
      href: "",
      description: "Lieux accueillant des événements de live coding",
      image: "https://i1.sndcdn.com/artworks-Oq6e5MU2sWztY2JY-TR6qxw-t500x500.jpg",
      links: [
        {
          title: "Chair de Poule",
          href: "https://www.facebook.com/p/Chair-De-Poule-100057514118206/",
          description: "Événements et fabrique à Cookies (Cookie Collective)",
        },
        {
          title: "Grrrnd Zero",
          href: "https://www.grrrndzero.org/",
          description: "Soutien pour l'organisation de l'algorave annuelle de Lyon",
        },
        {
          title: "Localhost",
          href: "https://www.instagram.com/localhost.doesnotexist/",
          description: "Soutien de la communauté live coding lyonnaise",
        },
        {
          title: "AERI",
          href: "https://aeri.ovh/",
          description: "Utopie réelle en expérimentation permanente",
        },

      ]
    }
  ];

  const internationalResources = [
    {
      title: "TOPLAP.org",
      href: "https://toplap.org",
      description: "Collectif historique international du live coding, fondé en 2003.",
      image: "https://blog.toplap.org/wp-content/uploads/sites/9/2024/01/iclc-2023.jpg",
      links: [
        {
          title: "Manifesto Draft",
          href: "https://toplap.org/wiki/ManifestoDraft",
          description: "Manifeste du collectif TOPLAP",
        },
        {
          title: "Algorave.com",
          href: "https://algorave.com",
          description: "Événements de live coding festifs"
        },
        {
          title: "TOPLAP Forum",
          href: "https://forum.toplap.org/",
          description: "Forum de discussion (peu actif)",
        },
        {
          title: "Awesome Live Coding",
          href: "https://github.com/toplap/awesome-livecoding",
          description: "Liste exhaustive de ressources"
        },
        {
          title: "Live Coding Book",
          href: "https://livecodingbook.toplap.org/",
          description: "Manuel collaboratif (MIT Press, 2023)"
        }
      ]
    },
    {
      title: "TOPLAP Nodes",
      href: "http://blog.toplap.org/nodes/",
      description: "Nodes locaux liés à TOPLAP : petites communautés indépendantes de live coders avec leur identité propre",
      image: "/images/toplap_map.png",
      links: [
        {
          title: "Liste de TOPLAP Nodes",
          href: "https://blog.toplap.org/nodes/",
          description: "Liste exhaustive de nodes",
        },
        {
          title: "CliC (Colectivo de Live Coders)",
          href: "https://colectivo-de-livecoders.gitlab.io/#que-somos",
          description: "Collectif argentin",
        },
        {
          title: "TOPLAP Barcelona",
          href: "https://www.toplap.cat/",
          description: "Collectif catalan"
        },
        {
          title: "Live Code NYC",
          href: "https://livecode.nyc/",
          description: "Collectif new-yorkais",
        },
        {
          title: "TOPLAP Karlsruhe",
          href: "https://toplap-ka.de/",
          description: "Collectif allemand",
        },
      ]
    },
    {
      title: "International Conference on Live Coding",
      href: "https://iclc.toplap.org",
      description: "Conférence universitaire (annuelle depuis 2015)",
      image: "/images/iclc_barcelona.png",
      links: [
        {
          title: "ICLC Barcelona (2025)",
          href: "https://iclc.toplap.org/2025/",
          description: "Conférence à Barcelone",
        },
        {
          title: "ICLC Shangaï (2024)",
          href: "https://iclc.toplap.org/2023/",
          description: "Conférence à Shangaï",
        },
        {
          title: "ICLC Utrecht (2023)",
          href: "https://iclc.toplap.org/2023/",
          description: "Conférence à Utrecht",
        },
        {
          title: "ICLC Valdivia (2021)",
          href: "https://iclc.toplap.org/2021/",
          description: "Conférence à valdivia",
        },
        {
          title: "ICLC Limerick (2020)",
          href: "https://iclc.toplap.org/2021/",
          description: "Conférence à Limerick",
        },
      ],
    },
    {
      title: "Réseaux sociaux et sites divers",
      href: "https://archive.org/details/toplap",
      description: "Réseaux d'échange entre live coders",
      image: "https://files.social.toplap.org/site_uploads/files/000/000/001/@1x/1c3ad86fbd5b23e0.png",
      links: [
        {
          title: "TOPLAP Discord",
          href: "https://discord.gg/jtYGAsUggT",
          description: "Principal lieu d'échange",
        },
        {
          title: "TOPLAP Mastodon",
          href: "https://social.toplap.org/about",
          description: "Instance Mastodon auto-hébergée",
        },
        {
          title: "TOPLAP Mailing List",
          href: "https://toplap.org/livecode-archive/",
          description: "Archives de la mailing list TOPLAP"
        },
        {
          title: "TOPLAP Internet Archive",
          href: "https://archive.org/details/toplap",
          description: "Archives audiovisuelles",
        },
      ]
    },
    {
      title: "Demoscene",
      href: "https://www.shadertoy.com/",
      description: "Contre-culture informatique et création numérique audiovisuelle",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Assembly2004-areena01.jpg",
      links: [
        {
          title: "Pouët.net",
          href: "https://www.pouet.net/",
          description: "Site d'échange et de partage de démos",
        },
        {
          title: "Shadertoy",
          href: "https://www.shadertoy.com/",
          description: "Plateforme de partage et création de shaders GLSL.",
        },
        {
          title: "Demozoo",
          href: "https://demozoo.org/",
          description: "Site collaboratif d'archive de démos",
        },
        {
          title: "Revision",
          href: "https://2025.revision-party.net/",
          description: "Plus grosse demoparty annuelle"
        },
      ]
    },
    {
      title: "Communauté Monome",
      href: "https://llllllll.co/",
      description: "Communauté Monome et musique électronique DIY.",
      image: "https://monome.org/image/both.jpg",
      links: [
        {
          title: "Lines Forum",
          href: "https://llllllll.co/",
          description: "Forum fréquenté par des live coders",
        },
        {
          title: "Teletype",
          href: "https://monome.org/docs/teletype/",
          description: "Hardware Eurorack (live codable)"
        },
        {
          title: "ORCA (version Norns)",
          href: "https://norns.community/orca",
          description: "ORCA pour Monome Norns"
        },
        {
          title: "InterNorns",
          href: "https://github.com/schollz/internorns",
          description: "Environnement de live coding pour Norns"
        },
      ]
    },
    {
      title: "Labels musicaux",
      href: "",
      description: "Labels et sorties musicales produites par des live coders",
      image: "https://f4.bcbits.com/img/0032778681_10.jpg",
      links: [
        {
          title: "Ordinateur dans la tête",
          href: "https://ordinateurdanslatete.bandcamp.com/",
          description: "Label lyonnais (cassettes et floppy disks)"
        },
        {
          title: "Call it Anything Record",
          href: "https://callitanythingrecords.bandcamp.com/",
          description: "Plusieurs sorties produites par des live coders",
        },
        {
          title: "Fals.ch",
          href: "https://f4lsch.bandcamp.com/",
          description: "Hypermusic on Purpose",
        },
        {
          title: "Superpang",
          href: "https://superpang.bandcamp.com/",
          description: "Computer Music (généraliste)",
        },
        {
          title: "PC Music",
          href: "https://pcmusic.bandcamp.com/",
          description: "Un peu de live coding dans les angles (Lil Data)",
        },
      ]
    }
  ];

  const otherSoftwareResources = [
    {
      title: "Éditeurs de code",
      href: "",
      description: "Outils pour éditer, débugguer, faire tourner du code, etc. L'outil de base des live coders, craints et chéris.",
      image: "https://raphaelforment.fr/images/stems.png",
      links: [
        {
          title: "Visual Studio Code",
          href: "https://code.visualstudio.com/",
          description: "Éditeur de code gratuit, extensible et personnalisable. Supporte de nombreux langages et environnements.",
        },
        {
          title: "NeoVim",
          href: "https://neovim.io/",
          description: "Éditeur de texte libre et open source, basé sur Vim. Très léger, personnalisable et extensible. Un apprentissage à prévoir mais très libérateur.",
        },
        {
          title: "Emacs",
          href: "https://www.gnu.org/software/emacs/",
          description: "Éditeur de texte libre et open source. Très puissant, mais avec une courbe d'apprentissage plus raide. Un système d'exploitation, avec un très bon support pour les langages de la famille LISP.",
        },
        {
          title: "Zed",
          href: "https://zed.dev/",
          description: "Éditeur de code moderne, rapide et collaboratif. En développement actif.",
        },
        {
          title: "Pulsar",
          href: "https://pulsar-edit.dev/",
          description: "Remplaçant de feu Atom. Parfois nécessaire pour la compatibilité avec d'anciens plugins de live coding."
        }
      ],
    },
    {
      title: "Digital Audio Workstations (DAW)",
      href: "",
      description: "Stations audionumériques. Outils généralistes et grand public pour le travail en informatique musicale.",
      image: "https://raphaelforment.fr/images/global_sampler.png",
      links: [
        {
          title: "Reaper",
          href: "https://www.reaper.fm/",
          description: "DAW léger, personnalisable et extensible. Un standard de l'industrie. Supporte de nombreux formats de plugins.",
        },
        {
          title: "Ardour",
          href: "https://ardour.org/",
          description: "DAW libre et open source. Très complet, mais un peu plus complexe à prendre en main.",
        },
        {
          title: "Audacity",
          href: "https://www.audacityteam.org/",
          description: "Un standard pour l'édition de fichiers audios. De plus en plus commercial, de moins en moins sympathique.",
        },
        {
          title: "Wavacity",
          href: "https://wavacity.com/",
          description: "Le célèbre Audacity, mais pour le web (compilé en WASM).",
        },
        {
          title: "Bitwig",
          href: "https://www.bitwig.com/",
          description: "Station audionumérique généraliste. Disponible en cross-platform, concurrent direct d'Ableton Live."
        },
        {
          title: "Ableton Live",
          href: "https://www.ableton.com/en/live/",
          description: "DAW populaire, avec un support natif pour Max for Live (Max/MSP).",
        },
      ],
    },
    {
      title: "Hôtes pour plugins / Outils modulaires",
      href: "",
      description: "Applications pour faire tourner des plugins audio (VST, LV2, etc.). Souvent utilisés en complément d'une DAW.",
      image: "/images/carla.png",
      links: [
        {
          title: "Carla",
          href: "https://kx.studio/Applications:Carla",
          description: "Hôte de plugins audio libre et open source. Supporte de nombreux formats.",
        },
        {
          title: "Element",
          href: "https://kushview.net/element/",
          description: "Hôte multi-plateforme, relativement récent."
        },
        {
          title: "Ossia",
          href: "https://ossia.io/",
          description: "Environnement de création interactive (audio, visuel, etc.). Séquenceur inter-média pensé pour l'interaction."
        },
        {
          title: "Chataîgne",
          href: "https://benjamin.kuperberg.fr/chataigne/fr",
          description: "Environnement de création modulaire et multi-protocole."
        }
      ]
    },
    {
      title: "Routage audio et MIDI",
      href: "",
      description: "Outils pour router l'audio et le MIDI entre différentes applications.",
      image: "/images/loopback.jpg",
      links: [
        {
          title: "JACK Audio Connection Kit",
          href: "https://jackaudio.org/",
          description: "Outil libre et open source, multi-plateforme. Très puissant, mais complexe à configurer.",
        },
        {
          title: "Loopback (macOS)",
          href: "https://rogueamoeba.com/loopback/",
          description: "Outil payant pour macOS. Très simple à utiliser.",
        },
        {
          title: "BlackHole (macOS)",
          href: "https://existential.audio/blackhole/",
          description: "Outil libre et open source pour macOS. Nécessite un peu plus de configuration.",
        },
        {
          title: "VB-Cable (Windows)",
          href: "https://vb-audio.com/Cable/",
          description: "Outil gratuit pour Windows. Simple à configurer.",
        },
        {
          title: "virtualMIDI (Windows)",
          href: "https://www.tobias-erichsen.de/software/virtualmidi.html",
          description: "Outil gratuit pour Windows. Permet de créer des ports MIDI virtuels.",
        }
      ],
    },
    {
      title: "Visualisation et étude du signal",
      href: "",
      description: "Outils pour visualiser le signal audio en temps réel. Utile pour le monitoring et le debugging.",
      image: "/images/spectrogram.png",
      links: [
        {
          title: "Sonic Visualiser",
          href: "https://sonicvisualiser.org/",
          description: "Outil libre et open source pour l'analyse et la visualisation du signal audio.",
        },
        {
          title: "Spek",
          href: "http://spek.cc/",
          description: "Outil libre et open source pour la visualisation du spectre audio.",
        },
        {
          title: "Mini Meters (MacOS)",
          href: "https://minimeters.app/",
          description: "Outil payant pour macOS. Simple, efficace, très personnalisable.",
        },
        {
          title: "Cava (Linux)",
          href: "https://github.com/karlstav/cava",
          description: "Un petit outil simple pour visualiser grossièrement le signal",
        }
      ],
    },
    {
      title: "Instruments virtuels (standalone)",
      href: "",
      description: "Logiciels de création musicale autonomes.",
      image: "/images/bisetblank.gif",
      links: [
        {
          title: "VCV Rack",
          href: "https://vcvrack.com/",
          description: "Synthétiseur modulaire Eurorack virtuel. Très populaire dans la communauté du live coding.",
        },
        {
          title: "Cardinal",
          href: "https://github.com/karlstav/cava",
          description: "Version libre et open-source de VCVRack. Fork du projet principal."
        },
        {
          title: "SunVox",
          href: "https://warmplace.ru/soft/sunvox/",
          description: "Environnement de création musicale modulaire (tracker-like). Léger, rapide, multi-plateforme. Peu gourmand en ressources.",
        },
        {
          title: "Bespoke Synth",
          href: "https://www.bespokesynth.com/",
          description: "Environnement de création musicale (patching visuel). Utile pour bricoler rapidement un patch. Permet l'inclusion de plugins audio (VSTs, etc).",
        }
      ],
    },
    {
      title: "Instruments virtuels (plugins)",
      href: "",
      description: "Plugins logiciels (synthétiseurs).",
      image: "/images/surge.png",
      links: [
        {
          title: "Vital",
          href: "https://vital.audio/",
          description: "Synthétiseur à tables d'onde. Extrêmement populaire."
        },
        {
          title: "Dexed",
          href: "https://asb2m10.github.io/dexed/",
          description: "Émulation fidèle du Yamaha DX7. Indispensable."
        },
        {
          title: "SurgeXT",
          href: "https://surge-synthesizer.github.io/",
          description: "Synthétiseur possédant de multiples moteurs et des capacités de synthèse avancées. Indispensable."
        },
        {
          title: "Odin 2",
          href: "https://thewavewarden.com/pages/odin-2",
          description: "Un VST 'virtual analog' relativement classique.",
        },
      ],
    },
    {
      title: "Instruments virtuels (effets)",
      href: "",
      description: "Effets au format plugin logiciel.",
      image: "/images/airwindows.png",
      links: [
        {
          title: "Airwindows",
          href: "https://www.airwindows.com/",
          description: "Une collection d'effets, sans interface graphique. Parfait pour le live coding."
        },
        {
          title: "Melda Production",
          href: "https://www.meldaproduction.com/MFreeFXBundle",
          description: "Une collection d'effets virtuels relativement complète."
        },
        {
          title: "Kilohearts Essentials",
          href: "https://kilohearts.com/products/kilohearts_essentials",
          description: "Une autre collection assez complète",
        },
        {
          title: "Socalabs",
          href: "https://socalabs.com/",
          description: "Une collection d'instruments et d'effets particulièrement intéressants pour le chiptune.",
        },
      ],
    },
    {
      title: "Inspection MIDI et OSC",
      href: "",
      description: "Outils pour inspecter les messages MIDI et OSC. Utile pour le debugging.",
      image: "images/protokol.png",
      links: [
        {
          title: "MIDI Monitor (macOS)",
          href: "https://www.snoize.com/MIDIMonitor/",
          description: "Outil gratuit pour macOS. Simple et efficace.",
        },
        {
          title: "Protokol",
          href: "https://hexler.net/protokol",
          description: "Outil propriétaire multiplateforme. Utile, simple, efficace."
        },
        {
          title: "MIDI View (Windows / MacOS)",
          href: "https://hautetechnique.com/midi/midiview/",
          description: "Un outil de visualisation des données MIDI"
        },
        {
          title: "OSC Data Monitor",
          href: "https://www.kasperkamperman.com/blog/processing-code/osc-datamonitor/",
          description: "Un outil simple et multiplateforme."
        }
      ]
    },
    {
      title: "Streaming et enregistrement",
      href: "",
      image: "/images/obs.png",
      description: "Outils pour enregistrer des performances de live coding. Utiles pour le streaming et l'archivage.",
      links: [
        {
          title: "OBS Studio",
          href: "https://obsproject.com/",
          description: "Logiciel libre et open source de streaming et d'enregistrement vidéo.",
        },
        {
          title: "Streamlabs",
          href: "https://streamlabs.com/",
          description: "Solution tout-en-un pour le streaming, avec de nombreuses fonctionnalités intégrées.",
        },
        {
          title: "Owncast",
          href: "https://owncast.online/",
          description: "Solution auto-hébergée pour le streaming vidéo en direct.",
        },

      ],
    }
  ];

  const softwareResources = [
    {
      title: "SuperCollider",
      href: "https://supercollider.github.io/",
      description: "Environnement de programmation audio temps réel. S'il ne fallait en citer qu'un, ce serait celui-là.",
      image: "https://mit-press-new-us.imgix.net/covers/9780262049702.jpg?auto=format&w=298&dpr=1&q=80",
      links: [
        {
          title: "Forum",
          href: "https://scsynth.org/",
          description: "Communauté et support"
        },
        {
          title: "Documentation",
          href: "https://doc.sccode.org/",
          description: "Guide de référence complet"
        },
        {
          title: "sccode.org",
          href: "https://sccode.org/",
          description: "Partage de code et exemples"
        },
        {
          title: "SuperCollider Book v2.0",
          href: "https://mitpress.mit.edu/9780262049702/the-supercollider-book/",
          description: "Principal ouvrage (seconde édition actualisée en 2025)"
        },
        {
          title: "Awesome Live Coding",
          href: "https://github.com/madskjeldgaard/awesome-supercollider",
          description: "Archive d'une liste de ressources collaboratives (2022).",
        }
      ]
    },
    {
      title: "TidalCycles",
      href: "https://tidalcycles.org/",
      description: "Langage de patterns musicaux basé sur Haskell. Puissant, minimaliste, très expressif.",
      image: "https://tidalcycles.org/img/logo.svg",
      links: [
        {
          title: "Documentation",
          href: "https://tidalcycles.org/docs/",
          description: "Tutoriels et guides"
        },
        {
          title: "Forum Club Tidal",
          href: "https://club.tidalcycles.org/",
          description: "Forum de la communauté"
        },
        {
          title: "Slab.org",
          href: "https://slab.org/",
          description: "Blog de recherche (Alex McLean)",
        },
        {
          title: "Tutoriels vidéos par Alex McLean",
          href: "https://www.youtube.com/watch?v=M-Y5pAEBXXQ&list=PL2lW1zNIIwj3bDkh-Y3LUGDuRcoUigoDs",
          description: "Série de vidéos de présentation de l'outil."
        },
        {
          title: "TidalCycles / Strudel",
          href: "https://strudel.tidalcycles.org/",
          description: "Version web de TidalCycles"
        }
      ]
    },
    {
      title: "Strudel",
      href: "https://strudel.tidalcycles.org/",
      description: "Version JavaScript de TidalCycles dans le navigateur. Populaire, accessible, large communauté d'utilisateurs.",
      image: "https://strudel.cc/icons/strudel_icon.png",
      links: [
        {
          title: "Strudel.cc",
          href: "https://strudel.cc",
          description: "Environnement de programmation en ligne",
        },
        {
          title: "Documentation",
          href: "https://strudel.tidalcycles.org/learn/",
          description: "Tutoriels et exemples"
        },
        {
          title: "Codeberg",
          href: "https://codeberg.org/uzu/strudel",
          description: "Code source et développement"
        },
        {
          title: "Uzulangs",
          href: "https://uzu.lurk.org/",
          description: "Langages similaires à Strudel",
        },
        {
          title: "Kabelsalat",
          href: "https://kabel.salat.dev/",
          description: "Langage de programmation orienté signal, live codable dans le web."
        }
      ]
    },
    {
      title: "Sonic Pi",
      href: "https://sonic-pi.net/",
      description: "Outil/instrument accessible et pédagogique, basé sur la programmation impérative. Stable et robuste.",
      image: "https://sonic-pi.net/media/images/home/logo.png",
      links: [
        {
          title: "In-Thread",
          href: "https://in-thread.sonic-pi.net/",
          description: "Forum de la communauté"
        },
        {
          title: "Documentation intégrée",
          href: "https://sonic-pi.net/tutorial.html",
          description: "Tutoriel intégré complet"
        },
        {
          title: "Dave Conservatoire",
          href: "https://youtu.be/4BPKaHV7Q5U?list=PLaitaNxyd8SHvTQjRGnMdKLsARXW7iYyp",
          description: "Série de tutoriels vidéos pour les néophytes."
        },
        {
          title: "Intermediate Sonic Pi (Mister Bomb)",
          href: "https://www.youtube.com/playlist?list=PLIsdHp2z9wFlu3MRII0eS5NysniOOnXL5",
          description: "Tutoriels plus avancés par Mister Bomb (en anglais)"
        },
        {
          title: "Conférence(s) de Sam Aaron",
          href: "https://www.youtube.com/watch?v=eCZaqKTwtvQ",
          description: "Beaucoup de conférences disponibles",
        },
      ]
    },
    {
      title: "FoxDot / Renardo",
      href: "https://foxdot.org/",
      description: "Live coding Python avec SuperCollider.",
      image: "https://ryan-kirkbride.github.io/hydepark.png",
      links: [
        {
          title: "Groupe Telegram",
          href: "https://t.me/foxdot",
          description: "Discussions de la communauté",
        },
        {
          title: "Documentation officielle",
          href: "https://foxdot.org/docs/",
          description: "Documentation originale"
        },
        {
          title: "Renardo (fork moderne)",
          href: "https://renardo.org/",
          description: "Version améliorée et modulaire"
        },
        {
          title: "Code source (GitHub)",
          href: "https://github.com/e-lie/renardo",
          description: "Code source et installation"
        },
        {
          title: "Ressources (TALM Angers x Polytech)",
          href: "https://hackmd.io/@mathieu/ByTDSqbFP",
          description: "Guide par Mathieu Delalle"
        }
      ]
    },
    {
      title: "OrcΛ",
      href: "https://hundredrabbits.itch.io/orca",
      description: "Séquenceur ésotérique et langage de programmation en deux dimensions. Programmation et automates cellulaires.",
      image: "https://raw.githubusercontent.com/wiki/hundredrabbits/Orca-c/PREVIEW.jpg",
      links: [
        {
          title: "Orca-C",
          href: "https://github.com/hundredrabbits/Orca-c",
          description: "Version en langage C de l'outil ORCA.",
        },
        {
          title: "Orca (Norns)",
          href: "https://llllllll.co/t/orca/22492/6",
          description: "Version pour Monome Norns de l'outil ORCA.",
        },
        {
          title: "Orca Web",
          href: "https://hundredrabbits.github.io/Orca/",
          description: "Version web, sans installation requise."
        },
        {
          title: "Lean OrcΛ",
          href: "https://metasyn.srht.site/learn-orca/",
          description: "Tutoriel interactif dans le web."
        },
        {
          title: "Clavier 36",
          href: "https://youtu.be/d8eC9he8iZM",
          description: "Une version alternative d'ORCA avec son propre jeu d'instructions. En cours de développement.",
        }
      ]
    },
    {
      title: "Mercury",
      href: "https://www.timohoogland.com/mercury-livecoding/",
      description: "Environnement de live coding minimaliste, efficace, fréquemment mis à jour. Conçu par Timo Hoogland.",
      image: "/images/timo.png",
      links: [
        {
          title: "Mercury Playground",
          href: "https://mercury-playground.pages.dev/",
          description: "Version web, sans installation requise",
        },
        {
          title: "Documentation officielle",
          href: "https://tmhglnd.github.io/mercury/",
          description: "Site internet du projet Mercury",
        },
        {
          title: "Code source (GitHub)",
          href: "https://github.com/tmhglnd/mercury",
          description: "Le fichier de présentation est riche en informations diverses.",
        },
        {
          title: "Performance de Timo Hoogland (2020)",
          href: "https://youtu.be/fr7vtk1dxJM",
          description: "Démonstration des capacités de Mercury",
        },
        {
          title: "Mercury Tutorials",
          href: "https://www.youtube.com/watch?v=J2tQ7Ku-C-M&list=PLxLPN4JkS2hkMxulEnSehzNO-K4wh41Y3",
          description: "Playlist YouTube de tutoriels consacrés à l'outil",
        },
      ],
    },
    {
      title: "Gibber",
      href: "https://gibber.cc/",
      description: "Environnement audiovisuel de live coding dans le navigateur.",
      image: "https://gibber.cc/gibber_image.jpg",
      links: [
        {
          title: "Gibber Playground",
          href: "https://gibber.cc/",
          description: "Environnement de programmation en ligne"
        },
        {
          title: "Site de Charlie Roberts",
          href: "https://www.charlie-roberts.com/projects.html",
          description: "Liste de projets développés par Charlie Roberts",
        },
        {
          title: "Code source (GitHub)",
          href: "https://github.com/gibber-cc/gibber",
          description: "Code source et documentation"
        },
        {
          title: "Gibberwocky",
          href: "https://github.com/gibber-cc/gibberwocky",
          description: "Version de Gibber interopérable avec Ableton Live"
        }
      ]
    },
    {
      title: "ChucK",
      href: "https://chuck.stanford.edu/",
      description: "Langage fortement temporisé pour la synthèse audio temps réel.",
      image: "https://chuck.stanford.edu/doc/images/chuck-logo2023w.png",
      links: [
        {
          title: "Documentation",
          href: "https://chuck.stanford.edu/doc/",
          description: "Guide de référence complet"
        },
        {
          title: "WebChucK",
          href: "https://chuck.cs.princeton.edu/webchuck/",
          description: "Version navigateur avec IDE"
        },
        {
          title: "GitHub",
          href: "https://github.com/ccrma/chuck",
          description: "Code source et communauté"
        },
        {
          title: "Groupe de discussion Discord",
          href: "https://discord.com/invite/Np5Z7ReesD",
          description: "La principale plateforme d'échange autour de ChucK",
        },
        {
          title: "Performance musicale",
          href: "https://youtu.be/vEqq5zFlrig",
          description: "Performance de Céleste Betancur et Olivia Jack"
        }
      ]
    },

    {
      title: "Hydra",
      href: "https://hydra.ojack.xyz/",
      description: "Live coding vidéo dans le navigateur.",
      image: "https://cdm.link/app/uploads/2021/10/hydra.jpg",
      links: [
        {
          title: "Éditeur en ligne",
          href: "https://hydra.ojack.xyz/",
          description: "Éditeur par défaut"
        },
        {
          title: "Hydra documentation",
          href: "https://hydra.ojack.xyz/docs/",
          description: "Documentation officielle",
        },
        {
          title: "Hydra book",
          href: "https://hydra-book.glitch.me/",
          description: "Guide interactif (non officiel)"
        },
        {
          title: "Hyper-Hydra",
          href: "https://github.com/geikha/hyper-hydra",
          description: "Extensions pour Hydra",
        },
        {
          title: "Références des fonctions",
          href: "https://hydra.ojack.xyz/api/",
          description: "Référence des fonctions"
        }
      ]
    },
    {
      title: "Pure Data / PlugData",
      href: "https://puredata.info/",
      description: "Programmation visuelle pour l'audio temps réel. Principal environnement utilisé pour le live patching.",
      image: "https://plugdata.org/images/app.png",
      links: [
        {
          title: "PlugData",
          href: "https://plugdata.org/",
          description: "Interface moderne et plugin VST/AU"
        },
        {
          title: "Documentation Pd",
          href: "https://puredata.info/docs",
          description: "Documentation officielle"
        },
        {
          title: "PlugData Docs",
          href: "https://plugdata.org/documentation.html",
          description: "Guide PlugData"
        },
        {
          title: "ELSE Library",
          href: "https://github.com/porres/Live-Electronics-Tutorial",
          description: "Tutoriel live electronics"
        },
        {
          title: "Live Coding Bytebeat (Pure Data)",
          href: "https://youtu.be/xEAfMJ9KS9Q",
          description: "Performance bruitiste sur Pure Data"
        }
      ]
    },
    {
      title: "Outils de programmation collaborative",
      href: "",
      description: "Live coder en groupe. Jam sessions, partage du code, outils de création audiovisuelle en réseau.",
      image: "/images/pastagang.png",
      links: [
        {
          title: "Nudel",
          href: "https://nudel.cc",
          description: "Outil de collaboration conçu par le collectif informel du Pastagang. Centré autour des environnements web.",
        },
        {
          title: "Flok",
          href: "https://flok.cc",
          description: "Outil de collaboration généraliste, supporte plusieurs langages et environnements (local et/ou dans le web).",
        },
        {
          title: "Troop",
          href: "https://github.com/Qirky/Troop",
          description: "Outil de collaboration (Python), principalement conçu pour FoxDot. Non maintenu.",
        },
        {
          title: "Estuary",
          href: "https://estuary.mcmaster.ca/",
          description: "Outil de collaboratif conçu par David Ogborn (université McMaster)."
        }
      ],
    },
    {
      title: "Outils de live coding visuel (autres)",
      href: "",
      description: "Environnements de live coding visuel divers et variés.",
      image: "https://raphaelforment.fr/images/bitfielder.png",
      links: [
        {
          title: "P5Live",
          href: "https://teddavis.org/p5live/",
          description: "Environnement de live coding pour P5.js (JavaScript)."
        },
        {
          title: "Bonzomatic",
          href: "https://github.com/Gargaj/Bonzomatic",
          description: "Environnement de live coding pour shaders GLSL."
        },
        {

          title: "KodeLife",
          href: "https://hexler.net/kodelife",
          description: "Environnement de live coding pour shaders GLSL."
        },
        {
          title: "vvvv",
          href: "https://vvvv.org/",
          description: "Environnement de programmation visuelle (nodale). Utilisé pour la création audioviselle temps réel.",
        },
        {
          title: "Tixl",
          href: "https://tixl.app/",
          description: "Environnement de programmation pour l'art visuel génératif (vidéo, installations, shaders, etc).",
        },
        {
          title: "Veda",
          href: "https://veda.gl/",
          description: "Plugin pour l'éditeur Atom (Pulsar) permettant le live coding de shaders GLSL.",
        }
      ],
    },
    {
      title: "Consoles imaginaires",
      href: "",
      description: "Des consoles de jeu qui n'ont jamais existé. Programmables, ouvertes, parfois open-source, etc. Utilisées pour le chiptune, l'art rétro, le code créatif.",
      image: "/images/tic80.png",
      links: [
        {
          title: "TIC-80",
          href: "https://tic.computer/",
          description: "Console virtuelle open-source. Programmable en Lua, JavaScript, Moonscript, Wren, Fennel et Ruby.",
        },
        {
          title: "PICO-8",
          href: "https://www.lexaloffle.com/pico-8.php",
          description: "Console virtuelle propriétaire. Programmable en Lua.",
        },
        {
          title: "Pixel Vision 8",
          href: "https://pixelvision8.github.io/Website/",
          description: "Console virtuelle open-source. Programmable en C# ou Lua.",
        },
        {
          title: "LowRes NX",
          href: "https://lowresnx.inutilis.com/",
          description: "Console virtuelle open-source. Programmable en BASIC.",
        },
        {
          title: "Uxn",
          href: "https://100r.co/site/uxn.html",
          description: "Une machine virtuelle minimaliste et portable. Une oeuvre d'art en soi, intéressant en tant qu'objet.",
        }
      ]
    }
  ];
</script>

# Ressources et liens documentaires
 
<Info info="Cette page est une liste de ressources pouvant servir à se former un paysage de la pratique du <em>live coding</em>, de ses réseaux et de ses outils. Nous mettons principalement en valeur les sources francophones afin de faciliter leur découverte et en raison de leur rareté.  À leur suite, nous incluons toutes les autres ressources 
disponibles en anglais. Toute contribution est la bienvenue pour parfaire ce petit tour d'horizon." markdown=false />


## France : groupes, collectifs, lieux

<Grid>
  {#each frenchResources as resource}
    <ResourceCard 
      title={resource.title}
      href={resource.href}
      image={resource.image}
      description={resource.description}
      links={resource.links}
    />
  {/each}
</Grid>

<YouTubeLazyLoad src="https://www.youtube.com/embed/aLrBQ8rkrWQ" title="ALGORAVE GRRRND ZERO LYON" />

## International : groupes, collectifs, lieux

<Grid>
  {#each internationalResources as resource}
    <ResourceCard 
      title={resource.title}
      href={resource.href}
      image={resource.image}
      description={resource.description}
      links={resource.links}
    />
  {/each}
</Grid>

<YouTubeLazyLoad src="https://www.youtube.com/embed/jnk644QmFFw" title="type techno - eddyflux algorave set" />

## Environnements de live coding

<Grid>
  {#each softwareResources as resource}
    <ResourceCard 
      title={resource.title}
      href={resource.href}
      image={resource.image}
      description={resource.description}
      links={resource.links}
    />
  {/each}
</Grid>

<YouTubeLazyLoad src="https://www.youtube.com/embed/ntFMuvv2-TY" title="on-the-fly.documentary" className="w-full aspect-video" />

## Autres logiciels utiles

<Grid>
  {#each otherSoftwareResources as resource}
    <ResourceCard 
      title={resource.title}
      href={resource.href}
      image={resource.image}
      description={resource.description}
      links={resource.links}
    />
  {/each}
</Grid>

