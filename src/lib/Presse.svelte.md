<script>
     import Press from "$lib/Press.svelte";
     import Presse from "../data/presse.json";
     let general_press = Presse;
</script>

# Presse

<div class="lg:grid sm:grid grid-cols-2 md:grid-cols-3 grid-rows-2 md:grid-rows-3 mx-auto gap-4">
     {#each general_press as {title, picture, link, author}, i}
          <Press title={title} description={author} image={picture} link={link} />
     {/each}
</div>
