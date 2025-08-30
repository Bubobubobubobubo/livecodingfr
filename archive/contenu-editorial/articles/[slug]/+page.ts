export async function load({ params }) {
	const articles = await import(`../${params.slug}.md`);
	const { title, date, author } = articles.metadata;
	const content = articles.default;
	return {
		title,
		date,
		author,
		content
	};
}