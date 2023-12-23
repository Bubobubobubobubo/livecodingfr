export const load = async ({ fetch }) => {
	const response = await fetch(`/api/guides`);
	const guides = await response.json();
	return { guides };
};