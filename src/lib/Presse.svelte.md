<script>
     import Press from "$lib/Press.svelte";

     let general_press = [
          {
               title: "Aux « algoraves », on danse sur une musique codée en direct",
               picture: "https://img.lemde.fr/2019/04/12/0/0/5122/3467/800/0/75/0/f22d969_x_FC8S1alEp4TYxEfX9-vnhW.jpg",
               link: "https://www.lemonde.fr/pixels/article/2019/04/13/aux-algoraves-on-danse-sur-une-musique-codee-en-direct_5449894_4408996.html",
               author: "Bruno Lus (Le Monde)",
          },
          {
               title: "OK Computer: Live coding creates music for dancing or dreaming in France's biggest algorave",
               picture: "https://static.euronews.com/articles/stories/07/52/54/80/1200x675_cmsv2_eb8921b9-1953-5db0-853f-6479b45a22c6-7525480.jpg",
               link: "https://www.euronews.com/culture/2023/05/03/ok-computer-live-coding-creates-music-for-dancing-or-dreaming-in-frances-biggest-algorave",
               author: "Gaël Camba (Euronews)",
          },
          {
               title: "Live coding : de la musique codée en direct pour danser ou rêver",
               picture: "https://static.euronews.com/articles/stories/07/52/54/80/1200x675_cmsv2_2c54c051-fb9c-5807-8429-da05ee6ef77d-7525480.jpg",
               link: "https://fr.euronews.com/culture/2023/04/26/live-coding-de-la-musique-codee-en-direct-pour-danser-ou-rever#:~:text=Live%20coding%20:%20de%20la%20musique%20cod%C3%A9e%20en%20direct%20pour%20danser%20ou%20r%C3%AAver,-Francesco%20Corvi%20se&text=Entre%20technique%20exp%C3%A9rimentale%20et%20composition,en%20programmant%20du%20code%20informatique.",
               author: "Gaël Camba (Euronews)",
          },
          {
               title: "Culture numérique : la Micro-folie sillonnera le territoire Barséquanais",
               picture: "",
               link: "https://www.lest-eclair.fr/id531959/article/2023-10-20/la-micro-folie-sillonnera-le-territoire-barsequanais",
               author: "??? (L'Est Éclair)",
          },
          {
               title: "Qu’est-ce que l’algorave, ce nouveau clubbing où ...",
               picture: "https://trxprds3.s3.amazonaws.com/uploads/2020/03/by-dan-hett.jpg",
               link: "https://www.traxmag.com/algorave-live-coding-dancefloor/",
               author: "Loïc Hecht (Trax Magazine)",
          },
     ]


</script>

# Presse

<div class="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-8 mx-auto gap-4"> {#each general_press as {title, picture, link, author}, i}
          <Press title={title} description={author} image={picture} link={link} />
     {/each}
</div>
