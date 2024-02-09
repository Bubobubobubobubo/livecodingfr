<script lang="ts">
  export let data;
  import Info from "$lib/components/Info.svelte";
</script>

<h1>Articles</h1>

<Info
  info="Cette section sert pour tout les articles généralistes qui ne peuvent
  pas réellement être considérés comme des guides. Publiez ce que vous voulez !"
  markdown="false"
/>

<h2>Articles publiés</h2>

<ul class="">
  {#each data.articles as post}
    <li
      class="ml-0 list-none px-4 pb-4 my-4 rounded-lg border-1 border-color-base-100 bg-neutral-800 hover:bg-neutral-700"
    >
      <h2>
        <a href={post.path}>
          {post.meta.title}
        </a>
      </h2>
      <p class="pt-2">
        <b>Publié le :</b>
        {post.meta.date} par <i>{post.meta.author}</i>
      </p>
    </li>
  {/each}
</ul>
