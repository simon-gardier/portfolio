import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import UnoCSS from '@unocss/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://sgdr.xyz',
  integrations: [
    solidJs(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    UnoCSS({
      injectReset: true,
    }),
  ],
});
