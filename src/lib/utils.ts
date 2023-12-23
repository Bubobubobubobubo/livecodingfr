export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const fetchMarkdownGuides = async () => {
  const allGuideFiles = import.meta.glob('/src/routes/guides/*.md');
  const iterableGuideFiles = Object.entries(allGuideFiles);
  // Also return the content
  const allGuides = await Promise.all(
    iterableGuideFiles.map(async ([path, resolver]) => {
      const { metadata } = await (resolver() as Promise<{ metadata: any }>);
      const guidePath = path.slice(11, -3);
      return {
        meta: metadata,
        path: guidePath,
      };
    })
  );

	return allGuides;
};
