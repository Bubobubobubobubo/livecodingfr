<script>
	export let data;
</script>

<h1>Articles</h1>

<p>Pour proposer un article, référez-vous à l'article <a href="/guides/propose:-un-article">Proposer un article</a>. Nous acceptons toutes les collaborations.</p>

<ul>
	{#each data.guides as post}
		<li class="px-4 my-4 rounded-lg bg-base-300 dark:bg-base-300">
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
			<p class="pt-2">Publié le : {post.meta.date} par {post.meta.author}</p>
		</li>
	{/each}
</ul>
