---
title: "Scheme for Max/Pure Data : LISP encore et toujours"
author: "Raphaël Maurice Forment"
date: "2024-02-11"
---

<img src="https://repository-images.githubusercontent.com/232438669/2786d100-7d94-11ea-81b9-74d9e19db04a" alt="Biset Blank" style="display:block; margin-left:auto;margin-right:auto;max-width:500px;width:75%" loading="lazy" />

<br>

## Présentation

Iain Duncan est l'auteur de deux utilitaires, [Scheme for Max](https://github.com/iainctduncan/scheme-for-max) et [Scheme for Pure
Data](https://github.com/iainctduncan/scheme-for-pd). Ces deux outils font
sensiblement la même chose, à différents niveaux d'avancement. Ils intègrent un
interpréteur pour le langage [S7 Scheme](https://ccrma.stanford.edu/software/snd/snd/s7.html) (publié par Bill Schottstaedt au [CCRMA](https://ccrma.stanford.edu/)) et permettent de contrôler plus ou moins finement Max ou Pure Data directement depuis LISP. Vous pouvez programmer vos propres séquenceurs, manipuler des données, générer des tableaux et des _buffers_ etc. S7 est un dialecte de Scheme/LISP qui a été conçu pour être facilement intégré dans différentes applications. C'est un langage léger et facile à porter un peu partout. Il a initialement été développé par un musicien pour des musiciens. Il existe une longue tradition dans les milieux créatifs qui consiste à présenter les langages de la famille LISP comme particulièrement adaptés au travail en musique. Il suffit de regarder des outils comme [OpusModus](https://opusmodus.com/forums/live-coding-instrument/), [ExTempore](https://extemporelang.github.io/), [Overtone](https://github.com/overtone/overtone), [Incudine](https://incudine.sourceforge.net/), [cl-collider](https://github.com/byulparan/cl-collider) ou encore [OpenMusic](https://www.ircam.fr/transmission/formations-professionnelles/openmusic) pour s'en convaincre. Tous réinventent la même idée : faire de LISP un environnement de choix pour la composition électronique/algorithmique. L'utilisation de Scheme for Max et de Scheme for Pure Data s'adresse à des _live coders_ expérimentés et qui maîtrisent déjà un petit peu la programmation et l'utilisation de Max/Pure Data. Il ne faut pas non plus être effrayé de l'aspect académique et un peu _nerd_ de l'expérience. On fait beaucoup de programmation et de technique pour développer, _in fine_, des super pouvoirs et une maîtrise inégalée de l'environnement de composition.

<br>

<iframe width="800" height="600" src="https://www.youtube.com/embed/rcLWTjN4qBI" title="Stochastic Study #1 for Scheme for Max and modular synthesizer, Iain C.T. Duncan (2021)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="display:block; margin-left:auto;margin-right:auto;max-width:800px;width:75%" ></iframe>

<br>

Iain Duncan est l'un des derniers musiciens frappés par le sortilège LISP et il a pris le
temps de publier [quelques](https://iainctduncan.github.io/scheme-for-max-docs/s7.html#about-s7-and-s74-scheme) [documents](https://iainctduncan.github.io/scheme-for-max-docs/motivations.html) qui détaillent les avantages de LISP pour le travail en musique. Ces outils s'adressent à un public qui aime expérimenter et qui préfère développer de petites librairies/fonctions réutilisables entre différents _patchs_ plutôt que de tout sacrifier pour apprendre l'utilisation d'un _framework_ ou d'un outil/usine à gaz. La documentation est très bien faite et cela vaut le coup de tout lire ne serait-ce que pour s'en imprégner. Même si le fait d'apprendre LISP peut engendrer des réticences plus ou moins justifiées, faire un petit _patch_ pour essayer n'a jamais tué personne. Contrairement à d'autres familles de langages, LISP, il est vrai, à l'air _naturellement_ et presque par accident adapté à la pratique du _live coding_. 

<br>

## Conclusion

<br>

<img src="https://imgs.xkcd.com/comics/lisp_cycles.png" alt="Biset Blank" style="display:block; margin-left:auto;margin-right:auto;max-width:800px;width:75%" loading="lazy" />

<br>


Quelle conclusion tirer de tout cela ? Aucune idée. Parler des langages LISP comme d'un outil ou d'une expérience magique est un poncif un peu usant à la longue. Si les langages LISPs étaient vraiment nécessaires et adaptés, pourquoi ne sont-ils pas utilisé partout et tout le temps ? Il semble que le vent ait juste tourné et que les langages LISP se soient retrouvés dans une niche qu'ils n'arrivent désormais plus vraiment à quitter. Les langages LISP restent présents un peu partout en informatique musicale, surtout dans les coulisses, et ressurgissent périodiquement pour nous rappeler à quel point ils sont élégants, adaptés et efficaces. Essayez Scheme for Pure Data et faites vous une idée par vous-même.
