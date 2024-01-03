export const load = async ({ fetch }) => {
	const response = await fetch(`/api/articles`);
	const articles = await response.json();
	return { articles };
};