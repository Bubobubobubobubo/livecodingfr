import { fetchMarkdownGuides } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
    const allPosts = await fetchMarkdownGuides();

    const sortedGuides = allPosts.sort((a, b) => {
        return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

    console.log(sortedGuides)
    return json(sortedGuides);
};
