import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '.',
  root: 'src',
  plugins: [sveltekit()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
  }

});
