export async function load({ params }) {
	const guides = await import(`../${params.slug}.md`);
	const { title, date, author } = guides.metadata;
	const content = guides.default;
	return {
		title,
		date,
		author,
		content
	};
}