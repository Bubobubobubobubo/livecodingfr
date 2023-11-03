<script>
     import SoftwareCard from "$lib/SoftwareCard.svelte"

     let softwares = [
          {
               name:"Sardine",
               creator:"Raphaël Forment",
               description:"Sardine est un logiciel libre et open source pour Python 3.10+. Sardine transforme Python en un instrument de musique. C'est un framework pour live coder et contrôler du matérial audio depuis Python. Sardine peut se synchroniser à d'autres logiciels ou instances du même logiciel.", image:"https://sardine.raphaelforment.fr/sardine_logo.svg#center",
               link:"https://sardine.raphaelforment.fr" 
          },
          {
               name:"Été",
               creator:"Raphaël Bastide",
               description:"Été mélange live coding (écriture musicale temps réel au travers du code) et percussions. Le programme  considère le clavier comme un instrument percussif. Le musicien peut écrire des instructions algorithmiques et des instructions percussives très précises au sein du même environnement de programmation. Été est une expérimentation qui essaie de lier dans un même programme le temps dédié à la composition algorithmique et celui dédié à l'improvisation spontanée.",
               image:"https://gitlab.com/uploads/-/system/project/avatar/35391245/Screenshot_2023-09-19_16-09-44.jpg",
               link:"https://raphaelbastide.com/ete/"
          } ,
          {
               name:"Topos",
               creator:"Raphaël Forment",
               description:"Topos est un séquenceur algorithmique expérimental dans le web sequencer programmé par BuboBubo (Raphaël Forment) et Amiika (Miika Alonen). Il est écrit en TypeScript, avec Vite. Ce projet est basé sur le Monome Teletype de Brian Crabtree et Kelli Cain. Nous espérons respecter le même esprit de partage et d'expérimentation que les concepteurs originels ! Comment rendre le Teletype plus accessible tout en étendant ses capacités sur le web ?", image:"https://raphaelforment.fr/img/inline_annotation.png",
               link:"https://topos.raphaelforment.fr" 
          },
          {
               name: "OSCII",
               creator: "Adel Faure",
               description: "OSCII est un logiciel pour dessiner et live coder des visuels en text-mode. OSCII produit également du son grâce à WebAudio.",
               image: "https://i1.sndcdn.com/avatars-1Kjtq0wbLSNSpNQH-AqRXfQ-t500x500.jpg",
               link: "https://gitlab.com/adelfaure/oscii",
          },
          {
               name:"Cascade",
               creator:"Raphaël Bastide",
               description:"Cascade est un environnement de live-coding pour le navigateur web. Il transforme les règles du langage CSS en sons !",
               image:"https://raphaelbastide.com/cascade/website/img/poster.svg",
               link:"https://raphaelbastide.com/cascade/" 
          }
     ]
</script>

# Outils

Si vous souhaitez consulter une liste fréquemment mise à jour de logiciels et d'interfaces pour le _live coding_, consulter [Awesome LiveCoding](https://github.com/toplap/awesome-livecoding). Pour élargir un petit peu, consultez également [Awesome Music](https://github.com/noteflakes/awesome-music).

{#each softwares as {name, creator, description, image, link}}
<SoftwareCard name={name} creator={creator} description={description} image={image} link={link} />
{/each}

Éditez le site pour rajouter votre outil ! **Toutes les contributions sont acceptées !**
