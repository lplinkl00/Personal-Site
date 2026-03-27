import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        privacy: 'privacy.html',
        cookies: 'cookies.html',
        terms: 'terms.html',
      },
    },
  },
  server: {
    open: true,
  },
});
