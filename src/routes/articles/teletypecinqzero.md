---
title: "Teletype 5.0"
author: "Raphaël Maurice Forment"
date: "2024-02-03"
---

## Une très brève présentation du Teletype

Le [Monome Teletype](https://monome.org/docs/teletype/) est un module Eurorack _open source_ (relativement cher et rare..) qui embarque un interpréteur pour un petit langage de programmation dédié à la composition algorithmique et au contrôle des synthétiseurs Eurorack. Le Teletype permet aux plus courageux de pratiquer le _live coding_ sans ordinateur, directement au contact de la machine. Un clavier connecté en facade du module constitue l'interface principale pour interagir avec ce dernier. Il est aussi possible de recevoir des signaux (**CV**) et des impulsions  (**Gate**) pour contrôler le déclenchement de scripts ou pour nourrir vos scripts de données externes. Une version [VCVRack](https://vcvrack.com/) (gratuite !) existe également et autorise le _live coding_ directement depuis ce logiciel.

<iframe 
    title="Teletype"
    src="https://player.vimeo.com/video/129271731?h=0070353db0&color=ff7700&title=0&byline=0&portrait=0" 
    width="640" height="360" frameborder="0" 
    allow="autoplay; fullscreen; picture-in-picture allowfullscreen" 
    style="display:block;margin-left:auto;margin-right:auto;margin-top:20px;margin-bottom:20px">
</iframe>

Le _live coding_ sur le _Teletype_ n'est pas la discipline la plus répandue. Les machines conçues par Monome ont une réputation rarement usurpée de minimalisme et d'austérité. Ce sont des machines conçues pour être programmées, modifiées et étendues par leurs utilisateurs. Il existe une myriade de projets construits autour de ces modules, ce qui inclut par ailleurs de nouvelles extensions physiques ([Telexi](https://store.bpcmusic.com/products/telexi?variant=28441435083), [Telexo](https://store.bpcmusic.com/products/telexo?variant=29458964427), [i2c2midi](https://github.com/attowatt/i2c2midi)) ou même des versions alternatives du logiciel à flasher soi-même sur le contrôleur. En raison de ces spécificités, les Teletype peuvent être utilisés comme modules utilitaires, comme outils de composition mais aussi plus rarement... comme outils pour _live coder_ l'intégralité d'un synthétiseur ou d'un système.

<br>

## Nouvelle version du firmware Teletype

Le Teletype, depuis l'an passé, n'est plus produit par Monome. Il est toutefois possible de trouver les [plans](https://llllllll.co/t/teletype-hardware-open/27242) pour en construire soi-même. On peut aussi également contribuer au [code source](https://github.com/monome/teletype). On peut facilement trouver ce module à la revente sur internet, aussi bien neuf que d'occasion. En bref, le Teletype continue sa vie et ne semble pas prêt de disparaître. Une nouvelle version du firmware [vient d'être publiée](https://github.com/monome/teletype/releases/tag/v5.0.0) et apporte une myriade de nouvelles choses :

<blockquote>
- drum ops [Byzero]<br>
- support for multiple faderbanks [Lightbreaker]<br>
- I2C2MIDI ops [attowatt / scanner_darkly]<br>
- new disting ex ops: dual algorithms, EX.M.N#, EX.M.NO#, EX.M.CC# [scanner_darkly]<br>
- new op CV.GET [scanner_darkly]<br>
- new op: SCALE0 [scanner_darkly]<br>
- new ops: $F, $F1, $F2, $L, $L1, $L2, $S, $S1, $S2, I1, I2, FR [scanner_darkly]<br>
- improved TR.P accuracy [scanner_darkly]<br>
- all line endings now accepted for USB files [scanner_darkly]<br>
- basic menu for reading/writing scenes when a USB stick is inserted [Dewb]<br>
- new ops: CV.CAL and CV.CAL.RESET to calibrate CV outputs [Dewb]<br>
- new Disting EX ops: EX.CH, EX.#, EX.N#, EX.NO# [scanner_darkly]<br>
- new dual W/ ops: W/.SEL, W/S.POLY, W/S.POLY.RESET, W/1, W/2 [scanner_darkly]<br>
</blockquote>

Elle est d'ores et déjà disponible pour VCVRack : la mise à jour se fait automatiquement. Pour ceux qui souhaitent découvrir une nouvelle manière de _live coder_ ou même débuter en étant au plus près de la synthèse, c'est sans doute la bonne chose à faire.
