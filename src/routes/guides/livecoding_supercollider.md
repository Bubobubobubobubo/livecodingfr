---
title: 'Introduction au live coding sur SuperCollider (I)'
author: 'Raphaël Maurice Forment'
date: '2023-12-24'
---

<script>
  import Prism from 'prismjs';
  import Info from '$lib/components/Info.svelte';
  let language = 'cpp';
</script>


## Introduction

Après avoir travaillé longtemps sur [Sardine](https://sardine.raphaelforment.fr) et [Topos](https://topos.live), je me suis posé la question de savoir si j'étais encore capable de _live coder_ sur **SuperCollider**. J'ai donc décidé de ramasser tout ce que je sais pour constituer un environnement de _live coding_ minimal et efficace. Ce document est le résultat de cette expérience. Il existe aussi un petit [Quark](https://github.com/Bubobubobubobubo/BuboQuark) qui va un peu plus loin que ce guide, mais que je ne documente pas encore. J'avais une certaine jalousie latente vis à vis des artistes qui utilisent **SuperCollider** sans recourir à aucune extension ou surcouche logicielle qui facilite la tâche. Le langage et l'environnement de **SuperCollider** est _monstrueux_ (de complexité, de détails, etc). Il offre toutefois un avantage intéressant : **SuperCollider** est très versatile. Au sein d'un seul langage / interface, il est possible de passer d'une section du code lié aux patterns musicaux à une autre partie du code directement liée à la synthèse et à l'écriture de traitements sonores. On peut aussi s'en servir pour écrire des utilitaires divers et des interfaces graphiques si besoin. **SuperCollider** est aussi un environnement relativement minimal et économe pour la production et le travail du son, développé depuis plus de vingt ans. Cela garantit de pouvoir le faire tourner sur toutes les machines sans aucun problème.

<br>

**SuperCollider** a joué un rôle crucial dans le développement du _live coding_ au cours de ces 20 dernières années (dès la parution de **SuperCollider 2**). Il est toujours utilisé par l'immense majorité des artistes et _performers_ sous une forme directe ou indirecte (au travers de [Tidal](https://tidalcycles.org), [FoxDot](https://foxdot681713046.wordpress.com/) ou [Sonic Pi](https://sonic-pi.net)). Bien que ces derniers soient aujourd'hui populaires, il est également intéressant de voir que l'on peut réaliser peu ou prou la même chose tout en éliminant toute une catégorie de problèmes liés à l'installation, au déploiement ou à la personnalisation de ces interfaces.

<br>

<Info info="Ce guide est une approche personnelle de <b>SuperCollider</b>. Je ne
suis pas particulièrement expert sur le sujet et j'accueille volontiers toutes
les suggestions pour améliorer cette série d'articles." markdown=false />

<br>

![SuperCollider Logo](/images/supercollider_splash.png)

<br>

## Mise en place

La mise en place est relativement simple. Nous aurons uniquement besoin de l'environnement de base et de la librairie _JITLib_, livrée par défaut avec **SuperCollider**. Nous augmenterons progressivement **SuperCollider** avec des _plugins_ ([Quarks](https://doc.sccode.org/Guides/UsingQuarks.html)) mais cela ne requiert pas d'installation directe et peut même se révéler facultatif.

<br>

1) **Téléchargez** et installez [SuperCollider](https://supercollider.github.io) depuis le site officiel.

2) **Optionnel :** téléchargez [sc3-plugins](https://github.com/supercollider/sc3-plugins), une collection officielle d'objets supplémentaires.

<br>

Il est important de bien comprendre comment est structuré **SuperCollider**. Il s'agit d'un environnement composé de plusieurs briques logicielles interconnectées (ou non) :

- **SCLang** : un langage de programmation inspiré de la famille **C** ou
**SmallTalk**
- **SCSynth** / **SCServer** : un serveur chargé de l'exécution audio
- **SCIDE** : l'éditeur par défaut, qui lie ces deux premiers composants

**SCIDE** est utile, mais si vous préférez utiliser un autre éditeur, il est
possible de lier [VSCode](https://code.visualstudio.com/), [Emacs](https://github.com/supercollider/scel) ou [Neovim](https://github.com/davidgranstrom/scnvim). **SCLang** et **SCSynth** sont les deux composants les plus importants, l'un servant au contrôle de l'autre. L'architecture de **SuperCollider** est toujours axée sur la différence entre un _client_ (le langage) et le _serveur_ (qui exécute l'audio).

<br>

## Commandes de base

Lorsque vous ouvrez **SCIDE**, vous vous trouvez face à un document texte vierge. C'est dans cette zone que vous devez programmer et écrire votre code. **SuperCollider** est un langage interprété. Cela signifie que vous allez graduellement soumettre du code à évaluation et recevoir le résultat des commandes éxecutées. Cela peut parfois poser problème aux débutants qui ne sont pas habitués à cette manière de concevoir la programmation :

- l'évaluation d'un fichier ne s'effectue pas toujours de manière linéaire. On
peut évaluer du code bloc par bloc ou modifier un bloc à la volée.
**SuperCollider** identifie un bloc à l'aide des parenthèses `()`.
- il est possible d'évaluer un fichier de manière linéaire si besoin. Il existe
  des commandes spécifiques pour ce faire (_par ex._ `"blabla/mon_fichier.scd".loadRelative`).
- la librairie standard (classes, extensions) est lue / interprétée de manière
linéaire au démarrage de l'interpréteur. Vous ne pourrez pas démarrer
l'interpréteur si une erreur est identifiée dans cette partie du code : `Library has not been compiled successfully`.

<br>

Selon votre éditeur, les commandes pour évaluer du code ligne par ligne ou bloc par bloc peuvent varier (`Shift + Enter`, `Control + Enter`, etc). Vous pourrez trouvez les commandes dans le menu `Language` de **SCIDE**. Pour vérifier que tout fonctionne, évaluez la ligne suivante (_note :_ les commentaires sont précédés des caractères `//` et ne sont pas évalués) :

```js
s.boot // Démarrage du serveur
```

Attendez quelques secondes pour vérifier que tout se passe correctement puis
tuez le serveur :

```js
Server.killAll // Tuer le serveur
```

**SuperCollider** permet de prendre l'habitude de ne pas considérer le code
comme un texte linéaire mais comme une interface, ce qui est une caractéristique
  commune des outils de _live coding_. C'est aussi une constante des
environnements pour la programmation musicale (_Max/MSP_, _Pure Data_) qui
éliminent / gomment la distinction entre travail sur le programme et exécution
du programme.

<br>

Ce guide ne vous apprendra pas les rudiments du langage. Il existe de très
nombreux guides qui font cela très bien. Notez la parution récente d'un nouvel
ouvrage : [SuperCollider for the Creative Musician](https://global.oup.com/academic/product/supercollider-for-the-creative-musician-9780197616994) par Eli Fieldsteel, également auteur d'une [série de vidéos](https://www.youtube.com/@elifieldsteel) que je recommande.

<br>

## Prérequis

<br>

Dès maintenant, je pars du principe que vous êtes à l'aise avec l'environnement **SuperCollider** et que vous avez au moins quelques rudiments de son utilisation. Il n'est pas nécessaire d'en connaître beaucoup mais au moins de savoir évaluer du code, naviguer dans les fichiers d'aide et de maîtriser quelques raccourcis clavier. Le reste viendra naturellement en pratiquant. Voici quelques suggestions pour découvrir **SuperCollider** et son utilisation :

- se familiariser avec chaque élément de l'interface (`s.scope`,
`s.freqscope`, `s.gui`)
- se familiariser avec la documentation intégrée, lire les guides disponibles
- apprendre comment contrôler le serveur (`s`, `Server.default`) et l'interpréteur
  - démarrer et arrêter le serveur
  - recompiler la librairie / redémarrer l'interpréteur
- apprendre la syntaxe de base d'une `SynthDef` (définition de synthèse)
- apprendre à jouer avec la librairie des patterns (`Pbind`, `Pseq`, etc)

## Paramétrage du serveur

<br>

Nous allons maintenant commencer à travailler sur un fichier de lancement
réutilisable pour **SuperCollider**. Créez un fichier nommé `startup.scd` ou
tout autre nom qui vous permettra de l'identifier facilement.

<br>

### Choisir une interface audio

<br>

Pour connaître le nom des périphériques audio disponibles :

```supercollider
ServerOptions.devices;    // Tout ce qui est disponible
ServerOptions.inDevices;  // Les entrées uniquement
ServerOptions.outDevices; // Les sorties uniquement
```

Il est possible de spécifier une entrée et une sortie différente :

```supercollider
Server.default.options.inDevice_("Built-in Microph");
Server.default.options.outDevice_("Built-in Output");
```

On peut aussi utiliser le même _device_ pour l'entrée et la sortie :

```supercollider
s.options.device = "BlackHole 16ch"; // Choix de l'interface
Server.default.options.device_("BlackHole 16ch"); // Alternative
```

<br>

Pour appliquer les modifications, il sera nécessaire de redémarrer le serveur.
Veillez à ce que votre entrée et votre sortie audio soient à la même fréquence
d'échantillonnage (_sampling rate_). Si ce n'est pas le cas, le serveur refusera
  de démarrer, ce qui est une erreur très courante. Paramétrez votre fréquence
sur `44100hz` ou `48000hz`.

<br>

**Note :** si vous avez pour habitude d'utiliser des écouteurs ou haut-parleurs
  _Bluetooth_, les OS modernes ont tendance à changer automatiquement la
fréquence d'échantillonnage à la connexion/déconnexion. Il en va de même des
micros et carte sons externes.


<br>

### Router le son de SuperCollider vers un autre logiciel

<br>

Il est tout à fait possible d'utiliser **SuperCollider** comme source principale et de router ensuite le son vers un autre logiciel pour le traitement. Cela vous permettra d'enregistrer plus facilement en multipiste, de disposer d'effets ou de synthétiseurs supplémentaires, etc. Vous pourrez aussi contrôler une partie de votre dispositif en **MIDI** ou **OSC** directement depuis **SuperCollider**. Pour pouvoir router librement les signaux sortants de **SuperCollider**, il est préférable d'utiliser une interface virtuelle comme [BlackHole](https://existential.audio/blackhole/) (_cross-platform_), [Loopback](https://rogueamoeba.com/loopback/) (MacOS, payant), [Jack](https://jackaudio.org/) (_cross-platform_) ou [VB-Audio VoiceMeeter](https://vb-audio.com/Voicemeeter/) (Windows, payant). Ces logiciels permettent de créer des _bus_ audio virtuels qui peuvent être utilisés comme entrée ou sortie par **SuperCollider** aussi bien que par n'importe quel autre logiciel. L'utilisation de bus audios virtuels offre une grande flexibilité et je recommande de prendre l'habitude de les utiliser.

<br>

1) Choisir comme entrée/sortie une interface virtuelle (BlackHole, Loopback,
etc).

2) Choisir comme entrée dans le logiciel de traitement le bus virtuel que vous
venez de créer.

3) Traiter / enregistrer le son canal par canal dans votre logiciel.


<br>

![Routage de SuperCollider dans Reaper](/images/reaper_supercollider_1.png)

<br>

### Protéger ses oreilles

<br>

**SuperCollider** vous permet de manipuler le son sans aucune restriction. C'est très utile mais c'est aussi assez dangereux non seulement pour vous mais aussi pour votre public si vous vous produisez sur scène : _larsens_, _clipping_, explosion du volume, etc. Heureusement, ce problème est connu et il existe des moyens efficaces de se protéger. Nous allons utiliser le système de _plugins_ interne pour installer un **Quark** très utile. Avec la commande suivante, installez [BatLib](https://github.com/supercollider-quarks/BatLib):

```supercollider
Quarks.install("https://github.com/supercollider-quarks/BatLib")
```

Recompilez ensuite la librairie et vous pourrez utiliser le `StageLimiter`. Il vous sauvera sans doute la vie de nombreuses fois. Vous verrez comment on le démarre dans le récapitulatif plus bas. TLDR, la commande est :

```supercollider
StageLimiter.activate;
```

Notez que pour certains types de musique, il peut être intéressant de ne pas activer le `StageLimiter`. La protection a tendance à colorer le son et peut aller à l'encontre de ce que vous souhaitez réellement faire : distortion numérique, _clipping_ volontaire. Il existe d'[autres types de protection](https://github.com/adcxyz/SafetyNet) (le **Quark** _SafetyNet_) ou bien, tout simplement, vous pouvez vous fier à votre oreille et à votre expérience pour ne pas dépasser les limites.

<br>

### Choisir un dossier de stockage

<br>

Plutôt que de tout stocker dans le dossier par défaut, je préfère utiliser un
dossier qui contient tout ce dont j'ai besoin pour travailler : configuration,
définitions de synthèse, échantillons sonores. Cela permet de n'avoir qu'une
seule route à retenir si le système est relativement unifié. J'ai choisi de tout
stocker dans `.config/livecoding/`, ce qui est une route assez prévisible pour
tout ceux qui sont habitués à utiliser le terminal sur **MacOS** / **Linux**.
Voici à quoi ressemble mon dossier :

```bash
.
├── Configuration.scd
├── README.md
├── Synthdefs.scd
└── samples
```
<Info info="Ce graphe est généré avec la commande <code>tree -L 1</code>" markdown=false />

<br>

Toute la configuration sera chargée à partir de la route
`/Users/bubo/.config/livecoding`. Il vous faudra changer ce chemin pour que cela
cole avec le dossier que vous aurez choisi. Pareillement, vous n'êtes pas
obligés de suivre cette étape qui repose uniquement sur une préférence
personnelle.

<br>

### Chargement automatique des échantillons

<br>

Plutôt que de charger les échantillons sonores au cas par cas, en précisant chaque chemin individuellement, je préfère automatiquement charger une grande bibliothèque d'échantillons. Par défaut, il n'existe aucun mécanisme permettant de gérer cela. Beaucoup de musiciens ont toutefois trouvé des solutions élégantes et assez minimales. Je me suis fié à la technique utilisé par [Scott Carver](https://github.com/scztt). Il utilise une série d'extensions conçues spécialement par ses soins.  

<br>

Pour installer les **Quarks**, on utilise une nouvelle fois la commande `Quarks.install` :

```supercollider
Quarks.install("https://github.com/scztt/Require.quark");
Quarks.install("https://github.com/scztt/Singleton.quark");
```

<br>

Une fois que cela est fait, il nous reste à installer la pièce finale, [SAMP]( https://gist.github.com/scztt/73a2ae402d9765294ae8f72979d1720e), qui est mentionnée dans un [topic](https://scsynth.org/t/making-own-sounds-libraries/4593/7) de discussion du forum **SuperCollider**. Il vous faudra créer ce fichier dans le dossier **Extensions**. Vous pouvez y accéder dans votre dossier de configuration **SuperCollider** (dépend de l'**OS**). Pour obtenir le chemin vers ce dossier, évaluez le code suivant dans **SuperCollider** :

```supercollider
Platform.userExtensionDir
```

Créez ensuite **SAMP.sc** dans le dossier **Extensions** et collez le code du
lien précédemment ouvert. C'est tout ce dont vous avez besoin. Fermez tout et
recompilez la librairie une nouvelle fois. Nous détaillerons ultérieurement l'utilisation de **SAMP** pour gérer vos échantillons. Sachez que vous y avez maintenant accès !

<br>

**Note :** **SAMP** permet de réaliser un _lazy loading_ des échantillons. Il s'agit d'une technique qui permet de ne pas surcharger d'entrée de jeu la RAM de votre ordinateur en mettant en cache trop d'échantillons. L'utilisation des ressources sera progressive, les échantillons étant chargés uniquement lorsque l'utilisateur les requiert.

<br>

### Récapitulatif

<br>

Voici le code complet que j'utilise pour le démarrage et la configuration d'un serveur audio minimal pour le _live coding_ :

```supercollider
(
  s.options.numBuffers = 1024 * 128;   // Nombre de buffers disponibles pour stocker des samples
  s.options.memSize = 8192 * 64;       // Mémoire disponible pour le serveur
	s.options.numWireBufs = 2048;        // Augmenter ce nombre si "exceeded number of interconnect buffers"
	s.options.maxNodes = 1024 * 32;      // Changer cette valeur si le son saute avec le message "too many nodes"
	s.options.device = "BlackHole 16ch"; // Choix de l'interface audio à utiliser
	s.options.numOutputBusChannels = 2;  // Indiquer le nombre de sorties de son interface audio
	s.options.numInputBusChannels = 2;   // Indiquer le nombre d'entrées de son interface audio
  p=ProxySpace.push(s.boot);           // Démarrage du serveur dans un ProxySpace (JITLIB)
  p.makeTempoClock;                    // Gestion du tempo
  p.clock.tempo = 120/60;
  SAMP.root = "/Users/bubo/.config/livecoding/samples/"; // Chemin vers les samples
  SAMP.lazyLoading = true; // Chargement paresseux (permet de ne pas remplir la mémoire pour rien)
  s.waitForBoot({
    "/Users/bubo/.config/livecoding/Synthdefs.scd".load; // Chargement des synthétiseurs
    StageLimiter.activate;                               // StageLimiter pour les oreilles
    "== 💻 LIVE CODING PRÊT 💻 == ".postln;
  });
)
```

Sauvegardez cet extrait de code dans un fichier **.scd** situé dans votre dossier de stockage. Vous pourrez ensuite l'évaluer à chaque fois que vous voudrez démarrer à l'aide de la commande suivante qu'il vous faudra évaluer dans l'interpréteur :

```supercollider
"/Users/bubo/.config/livecoding/Configuration.scd".load;
```

Si vous souhaitez démarrer **SuperCollider** avec cette configuration par défaut, vous pouvez également tirer parti du fichier de démarrage, qui s'exécute automatiquement à l'ouverture de **SCIDe**. Ce dernier se situe dans votre dossier de configuration **SuperCollider**. Vous pouvez le trouver en évaluant le code suivant :

```supercollider
Platform.userAppSupportDir
```

Il devrait exister un fichier `startup.scd` que vous pouvez remplir avec la
configuration ci-dessus, en adaptant les chemins.

## Conclusion

Cette configuration sera amenée à évoluer et pourra même faire l'objet d'une
refonte complète lorsque vous serez amenés à pré-charger d'autres composants :
synthétiseurs, effets pré-déclarés, etc. Nous y reviendrons.
