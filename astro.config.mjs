// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { site as siteData } from './src/data/site.ts';

// https://astro.build/config
export default defineConfig({
  site: siteData.url,
  integrations: [sitemap({ filter: (page) => !page.includes('/maintenance') })],
  build: {
    inlineStylesheets: 'always',
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Three.js (~600 Ko, ~150 Ko gzip) est volontairement isolé dans un chunk chargé à la demande (maison 3D).
      chunkSizeWarningLimit: 700,
    },
  },
});
