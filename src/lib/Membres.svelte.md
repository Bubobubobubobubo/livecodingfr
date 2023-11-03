<script>
     import Portrait from "$lib/Portrait.svelte";
     let members = [
          {
               name: "Raphaël Forment",
               description: "BuboBubo",
               image: "https://avatars.githubusercontent.com/u/45191785?s=400&u=3ee9062082ce04b6f08f811e657797fe9528d106&v=4",
               site: "https://raphaelforment.fr",
               mail: ""
          },
          {
               name: "Rémi Georges",
               description: "Ralt144Mi",
               image: "https://avatars.githubusercontent.com/u/75539795?v=4",
               site: "https://remigeorges.fr/",
               mail: "",
          },
          {
               name: "Agathe Herrou",
               description: "th4",
               image : "https://club.tidalcycles.org/user_avatar/club.tidalcycles.org/th4/144/505_2.png",
               site: "https://th4music.net",
               mail: "",
          },
          {
               name: "Raphaël Bastide",
               description: "",
               image: "https://radicalnetworks.org/archives/2018/participants/raphael-bastide/raphaelbastide.jpg",
               site: "https://raphaelbastide.com",
               mail: "",
          },
          {
               name: "Raphaël Bastide",
               description: "",
               image: "https://radicalnetworks.org/archives/2018/participants/raphael-bastide/raphaelbastide.jpg",
               site: "https://raphaelbastide.com",
               mail: "",
          },
          {
               name: "Raphaël Bastide",
               description: "",
               image: "https://radicalnetworks.org/archives/2018/participants/raphael-bastide/raphaelbastide.jpg",
               site: "https://raphaelbastide.com",
               mail: "",
          },


     ]
</script>

# Membres

<div class="lg:grid sm:grid grid-cols-2 md:grid-cols-3 grid-rows-2 md:grid-rows-3 mx-auto gap-4">
     {#each members as {name, description, image, site, mail}, i}
          <div>
               <Portrait name={name} description={description} image={image} site={site} mail={mail}/>
          </div>
     {/each}
</div>
