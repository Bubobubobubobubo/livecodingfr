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

<ul>
  {#each data.articles as post}
    <li
      class="px-4 pb-4 my-4 rounded-lg bg-base-300 dark:bg-base-300 hover:bg-base-200 hover:dark:bg-base-200 border-1 border-color-base-100"
    >
      <h2>
        <a href={post.path}>
          {post.meta.title}
        </a>
      </h2>
      <p class="pt-2">Publié le : {post.meta.date} par {post.meta.author}</p>
    </li>
  {/each}
</ul>
