---
title: "ChucK Web IDE: le retour de ChucK sur le web"
author: "Raphaël Maurice Forment"
date: "2024-10-02"
---

<img alt="Chuck Logo" src="../images/chuck_logo.png" style="display:block;margin-left:auto;margin-right:auto;max-width:500px;width:90%;height:auto" />

<br>

## Qu'est-ce que ChucK ?
 
[ChucK](https://chuck.stanford.edu/) est l'un des langages importants de ces deux dernières décennies pour
ce qui concerne la programmation musicale en temps réel. Développé par [Ge
Wang](https://music.stanford.edu/people/ge-wang) à l'université de Princeton à
partir de 2003, il
est toujours utilisé là-bas par les musiciens du [PlorK](https://plork.princeton.edu/) (_Princeton Laptop
Orchestra_). Il reste également utilisé dans cette même université pour enseigner la musique électronique. ChucK appartient à la même génération que d'autres langages comme [ExTempore](https://extemporelang.github.io/) d'Andrew Sorensen. L'idée flottait dans l'air à cette époque là qu'il fallait développer des langages permettant de mieux exprimer la relation entre temps, synthèse, écriture musicale et interaction de l'utilisateur. ChucK est désormais utilisé par le [SlorK](https://slork.stanford.edu/) (_Stanford Laptop Orchestra_) et par un certain nombre de musiciens _live coders_ tels que [Celeste Betancur](https://www.celestebetancur.com/code.html). Le créateur du langage est un défenseur de longue date de la pratique du _live coding_. Il est également un pionnier du phénomène des _Laptop Orchestras_, des orchestres d'ordinateur qui cherchent à utiliser les qualités uniques de l'ordinateur portable et des ordinateurs embarqués pour la composition de pièces collaboratives (synchronisation en réseau, spatialisation des musiciens, etc). En fouillant un peu sur internet, on trouve toujours des traces de la pratique du _live coding_ sur ChucK :

<br>

<iframe width="800" height="400" src="https://www.youtube.com/embed/gj5asouhVkM" title="ChucK Live Code Performance" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="display:block;margin-left:auto;margin-right:auto;max-width:800px;width:90%;height:500px"></iframe>

<br>

ChucK est un langage que l'on rencontre aujourd'hui assez peu dans les discussions autour du _live coding_. Je n'ai encore jamais vu personne l'utiliser pour une
performance. Je ne connais (plus) personne qui l'utilise. SuperCollider règne en maître, avec quelques artistes qui
jurent toujours par CSound, Max/MSP ou Pure Data. C'est d'autant plus étonnant
que le langage est explicitement conçu pour l'expérimentation temps réel. La
sémantique et la syntaxe du langage sont construites autour de cette idée et le système des [shred et du spork](https://chuck.cs.princeton.edu/doc/language/spork.html) fait tout pour encourager l'expérimentation.

## ChucK sur le web


<img alt="WebChuck" src="../images/webchuck.png" style="display:block;margin-left:auto;margin-right:auto;max-width:1000px;width:90%;height:auto" />

<br>

J'ai vu passer, il y a peu, des mentions d'une nouvelle version de ChucK qui
tourne directement dans un navigateur internet : [voici le lien](https://chuck.stanford.edu/ide/). Phénomène générationnel là aussi, il s'agit maintenant de tout faire fonctionner à partir de [WebAssembly](https://webassembly.org/) et des nouvelles technologies de l'audio sur le web. Quelques articles universitaires ont été publiés sur le sujet comme [celui-ci](https://mcd.stanford.edu/publish/files/2023-smc-ide.pdf) ou [celui-là](https://www.gewang.com/publish/files/2023-nime-webchuck.pdf). Le travail est en cours, avance bien, et pour le peu que j'ai pu tester, cela ressemble à s'y méprendre à la version native qui existe toujours et qui tourne toujours très bien sur la plupart des OS. Cela peut valoir le coup de donner une chance à ce langage pour les plus curieux. Beaucoup d'exemples ont déjà été portés et/ou réécrits depuis l'IDE de base qui en fournissait déjà pas mal. Le travail réalisé est déjà impressionnant et il y a fort à parier que cela va se stabiliser très vite.

