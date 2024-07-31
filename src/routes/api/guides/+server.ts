import { fetchMarkdownGuides } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
  const allPosts = await fetchMarkdownGuides();
  const sortedArticles = allPosts.sort((a, b) => {
    // Convertir les chaînes de date en objets Date
    const dateA = new Date(a.meta.date);
    const dateB = new Date(b.meta.date);
    // Comparer les timestamps
    return dateB.getTime() - dateA.getTime();
  });
  return json(sortedArticles);
};