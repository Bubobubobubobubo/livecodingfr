import { defineMDSveXConfig as defineConfig } from "mdsvex";

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],
  layout: {
    guides: 'src/routes/guides/guides.svelte'
  },
  highlight: {
  },
  smartypants: {
    dashes: "oldschool",
  },

  remarkPlugins: [],
  rehypePlugins: [],
});

export default config;
