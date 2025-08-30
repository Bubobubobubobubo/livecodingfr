---
title: "Introduction au live coding sur SuperCollider (II)"
author: "Raphaël Maurice Forment"
date: "2023-12-21"
---

<script>
  import Info from "$lib/components/Info.svelte";
</script>

## Introduction

### Le labyrinthe **SuperCollider**

<div style="margin-bottom:100px">
<br>

<div>
  <a href="https://www.instagram.com/p/CtHWU0fuOKd/"><img style="min-width: 200px;width:30%;height:auto;float:inline-end;padding-right:20px;margin-left:20px" src="/images/supercollider_meme.png" alt="SuperCollider meme" loading="lazy"></a>
</div>

Si vous avez lu et suivi le premier article, tout est en place et vous devriez
maintenant être prêt à jouer. L'une des qualités mais aussi l'un des défauts de **SuperCollider** est de ne
pas vous astreindre à suivre une route particulière concernant la manière dont il vous faut approcher la création sonore lorsque vous débutez. Le logiciel est extrêmement générique et chaque
utilisateur développe progressivement ses propres abstractions et une logique qui lui est propre. Il existe plusieurs dizaines de mécanismes
distincts et la documentation tentaculaire du logiciel recommande souvent des
approches contradictoires ou des solutions qui ne fonctionneront pas
nécessairement avec votre méthode de travail. Il est donc nécessaire d'être toujours
conscient des choix que vous avez opéré et ne pas hésiter à revenir en
arrière si ces derniers ne vous conviennent pas. **SuperCollider** est un logiciel
déjà ancien, et la librairie standard est si vaste qu'il est difficile de la comprendre entièrement et encore moins de la maîtriser. Il
est toutefois possible de développer une certaine expertise pour utiliser **SuperCollider** d'une certaine manière  et de construire progressivement ses connaissances en fonction des projets. 

<br>

</div>

### **JITLib** et le _live coding_

<br>

L'approche que nous suivons dans ce guide repose sur la librairie [JITLib](https://doc.sccode.org/Overviews/JITLib.html). Cette librairie développée par [Julian Rohrhuber](https://www.rsh-duesseldorf.de/institute/institut-fuer-musik-und-medien/lehrende-mitarbeitende/rohrhuber-julian) est devenue si populaire qu'elle est désormais intégrée par défaut à **SuperCollider** lors de l'installation. Les avantages offerts par cette dernière ne sont pas évidents à saisir lorsqu'on débute sur **SuperCollider**. Un grand nombre d'utilisateurs l'ignorent complètement dans leur travail. La raison qui nous pousse à l'utiliser est que cette dernière est prévue, _par défaut_, pour permettre le *live coding*. Même dans ce domaine déjà très spécifique, **JITLib** reste encore relativement générique. Le mécanisme que la librairie implémente est très simple : **JITLib** permet de remplacer _à chaud_, _en temps réel_, n'importe quelle donnée (audio, information) par une information de nature similaire. Voici la traduction du premier paragraphe de la documentation :



<br>

<blockquote class="bg-base-300 px-4 py-8 border-l-2">

La programmation _just in time_ (ou la programmation conversationnelle, le _live coding_, la _programmation à la volée_, la programmation interactive) est un paradigme qui inclut l'activité de programmation dans le déroulement du programme. Dans ce paradigme, le programme n'est pas considéré comme un outil qui est conçu avant d'être utilisé plus tard de manière productive. Plutôt, il s'agit de concevoir la conception dynamique des programmes comme une description et comme une conversation. Écrire du code devient une partie intégrante de l'expérience musicale ou de la pratique expérimentale.

</blockquote>

<br>

**JITLib** intègre ce principe à **SuperCollider** de manière assez approfondie. On se retrouve rarement bloqué du fait d'une incompatibilité entre la librairie standard et **JITLib**. Par ailleurs, **JITLib** est si finement intégré qu'il est parfois délicat de savoir si telle ou telle fonctionnalité relève de cette librairie ou vient de l'installation standard de **SuperCollider**.

<br>

### Conseils de lecture

<br>

Cette partie du guide est _de loin la plus pénible_. Elle introduit tout les concepts importants que nous manipulerons pour faire de la musique avec **SuperCollider**. Il s'agit en quelque sorte du solfège élémentaire pour un _live coder_ utilisant **SuperCollider**. Je suis conscient que les premiers paragraphes sont particulièrement difficiles pour un utilisateur débutant. N'hésitez pas à continuer votre lecture si un détail vous échappe, vous finirez sans doute par comprendre ultérieurement par la pratique. Ne vous laissez pas arrêter par du vocabulaire ou des concepts peu familiers.

## `ProxySpace` et `Ndefs`

### Le principe de base de la librairie

<br>

Tout commence avec un peu de vocabulaire. **JITLib** introduit la notion de **ProxySpace**, un environnement de références vers des _proxys_ : "_an environment of references on a server_". Une référence est un nom associé à un objet. C'est aussi simple que `~a = 2` ou `~a` est un _proxy_ et `2` un objet. Ce système fonctionne à l'aide de _proxys_, il nous faut donc comprendre ce qu'est un _proxy_. C'est une notion relativement simple, il s'agit d'un objet qui contient _quelque chose_.

<br>
<div class="pl-8 pt-4 pb-4 bg-base-300">

**Proxy:** un _proxy_ est un contenant pour _quelque chose_ qui tourne sur le serveur, généralement un contrôle ou un algorithme audio. C'est un objet vide ou non-vide. Un _proxy_ peut contenir le _node_ d'un oscillateur (_cf._ la suite) mais il pourrait aussi contenir un filtre audio, un synthétiseur que nous venons de créer ou même un pattern algorithmique. Le _proxy_ englobe ce qu'il contient et réalise à notre place tout un tas d'opérations qu'il est d'ordinaire nécessaire de gérer manuellement. Par exemple, on peut remplacer le contenu d'un _proxy_ par un autre _node_ sans interruption du signal, supprimer le contenant d'un _proxy_ sans pour autant supprimer la boîte elle-même.

</div>

<br>

Un **ProxySpace** est un ensemble de clés et de valeurs, un grand sac dans lequel on manipule des _proxy_. Les clés sont des références vers des `NodeProxy`. Tout ceci est sans aucune importance tant que nous ne le manipulons pas pour générer du son.

<br>


### Remplacer l'environnement par défaut par un `ProxySpace`

<br>

Dans le guide précédent se trouvait une ligne assez inhabituelle, celle qui nous servait pour démarrer le serveur :
```supercollider
p = ProxySpace.push(s.boot);
```

Sans entrer dans le détail, cette ligne réalise deux actions distinctes :

<div class="pl-8">

<br>

1) elle démarre le serveur audio de **SuperCollider** (`s.boot`)

2) elle _pousse_ l'environnement par défaut dans un **ProxySpace**

</div>

<br>

Avec la méthode `push`, toutes les variables globales de l'environnement actuel deviennent mécaniquement des `NodeProxy` dans le **ProxySpace**. Pour s'en convaincre, il suffit de taper le nom d'une variable et d'observer la valeur de retour :

<br>

```supercollider
~bob; // -> NodeProxy.nil(localhost, nil)
```

Ce n'est pas très parlant si vous n'êtes oas habitués à **SuperCollider** ou à la programmation. Essayons maintenant de voir ce que cela signifie lorsque nous souhaitons manipuler du son, sans spécifiquement aborder tout les détails. Évaluez le code suivant ligne par ligne :

```cpp
~osc = {SinOsc.ar(200) * 0.5}; // J'évalue, rien ne se passe. Associe une fonction audio à un NodeProxy
~osc.play;                     // On connecte l'audio à la sortie et on joue la fonction
~osc = {SinOsc.ar(400) * 0.5}; // On remplace la fonction précédente par une autre (sans interruption !)
~osc.stop(fadeTime: 4);        // On stoppe avec un joli fade-out
~osc.clear;                    // On libère la mémoire
```

<br>

Nous avons associé une fonction audio (`{SinOsc.ar(200) * 0.5}`) à une référence (`~osc`). C'est tout le principe de **JITLib**. Cette association peut être remplacée à tout moment sans interruption grâce au _proxy_. Le `NodeProxy` nommé `~osc` accepte un grand nombre de manipulations différentes et son rôle est totalement redéfini par rapport au comportement habituel d'une variable en dehors de l'utilisation de **JITLib**. 

<br>

Ce n'est plus une variable, c'est un `Proxy` dans notre `ProxySpace`. La ligne `~osc.stop(fadeTime: 4)` démontre aussi que les `NodeProxy` intègrent de nombreuses méthodes destinées à gérer l'audio: _fade in_, _fade out_, contrôle du niveau des sources : etc.

<br>

Nous allons utiliser ce principe fondamental introduit par **JITLib** tout au long de ce guide pour contrôler tout ce que nous souhaitons / pouvons contrôler : **algorithmes audio**, **patterns algorithmiques**, **effets sonores**, etc. Il est **essentiel** de retenir ce principe du _proxy_ car il nous permet de savoir réellement ce que nous sommes en train de manipuler à tout moment au cours du jeu : essentiellement des `NodeProxy`.


<br>

Sans en savoir beaucoup plus, il est déjà possible de faire un petit peu de musique en s'amusant à remplacer une source par un autre :

```cpp
~osc = {SinOsc.ar([200, 100]) * 0.5}; // On associe une source à un NodeProxy, un double oscillateur
~osc.play(fadeTime: 4);               // On lance le NodeProxy avec un fade-in
~osc.fadeTime = 4;                    // On change le fadeTime général

~osc = {LPF.ar(SinOsc.ar([400, 100]), SinOsc.ar(1/4).range(200,2000)) * 0.5}; // On remplace la source
~osc = {LPF.ar(SinOsc.ar([800, 350]), SinOsc.ar(1/4).range(200,2000)) * 0.5}; // On remplace la source
~osc = {LPF.ar(SinOsc.ar([200, 150]), SinOsc.ar(1/4).range(200,2000)) * 0.5}; // On remplace la source

~osc.stop(fadeTime: 4);               // Fade-out
~osc.clear;                           // On libère la mémoire
```

<br>

Même si tout reste assez primitif pour le moment, on peut déjà faire beaucoup de choses en suivant ce principe. Il est possible d'utiliser n'importe quel algorithme audio et de le mettre à jour graduellement tout au long d'une performance. Ce type de _live coding_ centré autour de la musique à jour d'un générateur sonore se prête plutôt bien à de la musique électro-acoustique, _ambient_, _noise_, etc.

<br>

### Les `Ndefs` : une autre manière de faire la même chose

<br>

La technique que nous utilisons avec `ProxySpace.push(s.boot)` _dissimule_ l'utilisation que nous faisons des `NodeProxy`. Cette fonctionnalité a été intégrée car elle permet de gagner du temps de frappe mais elle a pour désavantage de rendre plus difficilement perceptible ce que nous sommes réellement en train de faire. À première vue, il semble que `~a = 2` soit juste une assignation de variable comme dans un langage de programmation classique. Pourtant, il s'agit d'une opération qui crée/modifie un `NodeProxy`.

<br>

Nous occultons le fait que les variables globales de **SuperCollider** sont maintenant des `NodeProxy`. Il est possible de se passer entièrement de `Proxyspace.push` et de cet avantage/désagrément en utilisant les `Ndefs`. Il s'agit d'une préférence personnelle, presque d'ordre stylistique.

<br>

<Info info="Pour être plus précis, <code>ProxySpace.push(...)</code> transforme le <em>scope</em> global en un <code>ProxySpace</code>. Seule les variables de <code>a</code> à <code>z</code> sont épargnées." markdown=false />

<br>

Le terme de **NDef** est un raccourci pour _Node Proxy Definition_. On retrouve du vocabulaire familier. C'est une autre manière de désigner exactement le même type d'objet que ce que nous manipulons depuis le début ! Seule la syntaxe diffère. Profitons-en quand même pour évoquer rapidement ce qu'est un _node_ :

<br>

<div class="pl-8 pt-4 pb-4 bg-base-300">


**Node:** un _node_ est un objet défini en interne par le serveur audio de **SuperCollider**. Un synthétiseur est un _node_, beaucoup d'objets présents sur le serveur sont des _nodes_. Il s'agit d'un objet générique utilisé pour une opération audio : contrôle ou synthétiseur. C'est un objet abstrait, qu'on ne manipule jamais directement. Les fonctions audio que nous venons d'utiliser dans l'exemple précédent sont des _nodes_ que l'on associe à un _proxy_. Un _node_ tire ce nom du fait que ce sont des _noeuds_ dans un graphe audio, des objets qui ont une position dans un graphe de traitement du signal.

</div>

<br>

Les `Ndefs` ont pour avantage de ne pas se propager dans l'environnement local. Elles rendent tout un petit peu plus clair. Réécrivons l'exemple précédent en utilisant uniquement des `Ndefs` :

```cpp
Ndef(\osc, {SinOsc.ar([200, 100]) * 0.5});  // On associe une source à un NodeProxy, un double oscillateur
Ndef(\osc).play(fadeTime: 4);               // On lance le NodeProxy avec un fade-in
Ndef(\osc).fadeTime = 4;                    // On change le fadeTime général

Ndef(\osc, {LPF.ar(SinOsc.ar([400, 100]), SinOsc.ar(1/4).range(200,2000)) * 0.5}); // On remplace la source
Ndef(\osc, {LPF.ar(SinOsc.ar([800, 350]), SinOsc.ar(1/4).range(200,2000)) * 0.5}); // On remplace la source
Ndef(\osc, {LPF.ar(SinOsc.ar([200, 150]), SinOsc.ar(1/4).range(200,2000)) * 0.5}); // On remplace la source

Ndef(\osc).stop(fadeTime: 4);               // Fade-out
Ndef(\osc).clear;                           // On libère la mémoire
```

C'est à vous de choisir quelle est la syntaxe que vous préférez.

## Gestion des `NodeProxy`

### `fadeTime`

Nous avons déjà utilisé la capacité des `NodeProxy` à opérer des _fade-ins_ et des _fade-outs_. C'est une fonctionnalité très pratique, surtout lorsque vous manipulez des sources audio dynamiques et que vous souhaitez faire des transitions souples de l'une à l'autre. Il existe trois types de _fade_ :

- _fade-in_ à l'entrée : c'est un argument de la méthode `.play` : `~osc.play(fadeTime: 4)` ou `Ndef(\osc).play(fadeTime: 4)`
- _fade-in_ en sortie : c'est un argument de la méthode `.stop` ou `.clear` : `~osc.stop(fadeTime: 4)` ou `Ndef(\osc).stop(fadeTime: 4)`
- _fade_ général : c'est un attribut du `NodeProxy` que l'on contrôle avec la syntaxe `~osc.fadeTime = 4`;

```cpp
~osc = {SinOsc.ar(200) * 0.5}; // On crée une source audio

~osc.play(fadeTime: 1);        // On fait entrer doucement

~osc.fadeTime = 12;            // Transition très longue

~osc = {SinOsc.ar(2000) * 0.5}; // Transition lente vers la fréquence voulue

~osc.clear(fadeTime: 4);       // On s'arrête
```


<br>

### `.stop` / `.clear`

Les méthodes `.stop` et `.clear` ne réalisent pas la même opération :

- `.stop` : déconnecte le `NodeProxy` du reste de la chaîne audio. Il continue à tourner (et à consommer des ressources) mais en silence ! Vous pourrez le reconnecter plus tard.
- `.clear` : détruit le `NodeProxy`. Vous pouvez réaliser la même opération en tapant : `~osc = nil`. Notez toutefois que `.clear` permet de spécifier un _fade-out_ avant la destruction.

Si vous souhaitez vous débarrasser de tout les `NodeProxy` actifs, il existe cette commande :

```supercollider
currentEnvironment.free;
```

Elle applique la fonction `free` à tout ce qui compose l'environnement global.
Puisque ce dernier est un `ProxySpace`, on libère tout les `NodeProxy`.

## Modifier un/des paramètres

Vous n'êtes pas obligés de réévaluer l'algorithme dans son intégralité pour modifier une valeur sur un `NodeProxy`. Parfois, il est préférable de mettre à jour un paramètre sans que le _fade-in_ et le _fade-out_ ne s'appliquent. Ce problème sera particulièrement sensible lorsque vous utiliserez des effets tels qu'un délai ou une réverbération. 

<br>

Si vous changez uniquement de valeur en réévaluant l'algorithme en entier, cela causera des problèmes avec l'amplitude générale du signal. Cela peut aussi causer un effet de brouillon lié à la superposition de plusieurs algorithmes en cours de _fade-in_ / _fade-out_. Deux méthodes existent pour mettre à jour un paramètre : `.set` (instantané) et `.xset` (progressif).

### `.set`

La méthode `.set` met immédiatement à jour un paramètre **immédiatement**, dès que possible :

```cpp
~osc = { arg freq=200; SinOsc.ar(freq) * 0.5};
~osc.play(fadeTime: 2);
~osc.set(\freq, 800);
~osc.set(\freq, 400);
~osc.clear(2);
```

### `.xset`

La méthode `.xset` met immédiatement à jour un paramètre **progressivement**, suivant le `fadeTime` :

```cpp
~osc = { arg freq=200; SinOsc.ar(freq) * 0.5};
~osc.play(fadeTime: 2);
~osc.fadeTime = 8; // On change le fadeTime pour .xset
~osc.xset(\freq, 800);
~osc.xset(\freq, 400);
~osc.clear(2);
```

### Contrôler plusieurs paramètres

<br>

Il est possible de contrôler plusieurs paramètres en une seule commande si
besoin est :


```supercollider
~osc.xset(\freq, 800, \amp, 0.2);
```

Tout dépend de ce dont vous avez besoin. Réévaluer la fonction entière peut
aussi être une stratégie intéressante dans certains cas.

## Communication entre `NodeProxies`


On peut associer plusieurs `NodeProxies` pour former des algorithmes audio plus complexes et modulaires. Chaque `NodeProxy` peut être imaginé comme un module remplissant une fonction particulière dans un synthétiseur modulaire plus imposant. Pensez au _patching_ dans un environnement comme _Max/MSP_ ou _Pure Data_ ou au _patching_ analogique d'un synthétiseur physique. 

<br>

Il est possible de définir un `NodeProxy` oscillateur puis un contrôle (de type _LFO_) pour moduler la fréquence de cet oscillateur. Voici la méthode la plus simple que vous puissiez employer :

```cpp
~source = {arg freq=400; SinOsc.ar(freq) * 0.5}; // Une source que l'on souhaite moduler
~source.play;
~source.set(\freq, 300);              // On peut utiliser set pour une valeur statique
~freq = { SinOsc.ar(1/2) * 400 };   // Voici un LFO (Low Frequency Oscillator)
~source.map(\\freq, ~freq);          // Utilisation de la fonction map
```

`.map` possède une fonction alternative, nommée `.xmap`. Elle fonctionne tout
comme `.set` et `.xset`.

## Conclusion

Dans cette section du guide, nous avons appris :

- Ce qu'est un `NodeProxy` et un `ProxySpace`, l'outil de base offert par **JITLib**
- La différence entre `ProxySpace.push` et l'utilisation explicite des `NDefs`
- Comment démarrer, stopper et arrêter un `NodeProxy`
- Comment contrôler le _fade-in_ et le _fade-out_ et la transition entre algorithmes

Je ne fais ici qu'effleurer les différentes commandes que possèdent les `NodeProxy`. Si vous souhaitez en apprendre plus, allez voir la documentation. Nous utiliserons un nombre limité de méthodes au fur et à mesure, lorsque nous en aurons besoin.
