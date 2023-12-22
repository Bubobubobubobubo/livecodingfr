export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const fetchMarkdownGuides = async () => {
const allPostFiles = import.meta.glob('/src/routes/guides/*.md');
const iterablePostFiles = Object.entries(allPostFiles);

const allPosts = await Promise.all(
  iterablePostFiles.map(async ([path, resolver]) => {
    const { metadata } = await (resolver() as Promise<{ metadata: any }>);
    const postPath = path.slice(11, -3);
    return {
      meta: metadata,
      path: postPath
    };
  })
);

	return allPosts;
};
