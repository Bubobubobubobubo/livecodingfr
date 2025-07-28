<script>
  export let data;
</script>

<article>
  <h1>{data.title}</h1>
  <div class="pt-4 flex justify-between mb-12">
    <p class="inline font-bold">Publié le : {data.date}</p>
    <p class="inline font-bold">Auteur : {data.author}</p>
  </div>
  <div class="lg:px-24 md:px-12 content-center">
    <svelte:component this={data.content} />
    <p class="font-bold border-2 py-2 pl-2 mt-8 bg-neutral-800">
      <a href="/guides">Revenir à l'index</a>
    </p>
  </div>
</article>
