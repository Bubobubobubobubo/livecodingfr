<script lang="ts">
	export let data;
    import Info from "$lib/components/Info.svelte";
</script>

<h1>Guides</h1>

<Info info="Cette page est un recensement de guides proposés par les membres de la communauté pour apprendre à <i>live coder</i> ou se perfectionner. L'idée est de proposer des articles plus ou moins courts consacrés à un outil ou à une approche particulière du <i>live coding</i> Pour proposer un guide, référez-vous à l'article <a href='/guides/proposer_guide'>Proposer un guide</a>. Nous acceptons toutes les collaborations." markdown=false />

<h2>Articles publiés</h2>

<ul>
	{#each data.guides as post}
		<li class="px-4 pb-4 my-4 rounded-lg bg-base-300 dark:bg-base-300 hover:bg-base-200 hover:dark:bg-base-200 border-1 border-color-base-100">
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
			<p class="pt-2">Publié le : {post.meta.date} par {post.meta.author}</p>
		</li>
	{/each}
</ul>
