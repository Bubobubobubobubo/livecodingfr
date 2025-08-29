import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '$': path.resolve('./src'),
      '$lib': path.resolve('./src/lib'),
      '$data': path.resolve('./src/data'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules/**', '.svelte-kit/**', 'dist/**', 'src/**/*.{test,spec}.{js,ts}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/fixtures/',
        'tests/mocks/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/build/',
        '**/dist/',
        '**/.svelte-kit/',
      ],
    },
    deps: {
      inline: ['@testing-library/svelte'],
      external: ['tone']
    },
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  },
});