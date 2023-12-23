import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '.',
  resolve: {
    alias: {
      '$': path.resolve(__dirname, './src'),
      '$lib': path.resolve(__dirname, './src/lib'),
      '$data': path.resolve(__dirname, './src/data'),
    },
  },
  root: 'src',
  plugins: [sveltekit()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
  }

});
