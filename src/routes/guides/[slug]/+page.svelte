<script>
	export let data;
</script>

<article>
	<h1>{data.title}</h1>
	<div class="pt-4 flex justify-between">
		<p class="inline font-bold">Publié le : {data.date}</p>
		<p class="inline font-bold">Auteur : {data.author}</p>
	</div>
	<svelte:component this={data.content} />
</article>