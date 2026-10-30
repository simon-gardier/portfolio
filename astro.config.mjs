import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import UnoCSS from '@unocss/astro';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://sgardier.xyz',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { strict: false }]],
  },
  vite: {
    optimizeDeps: {
      // Fuse ships standalone ESM; avoid stale optimized-dependency URLs in dev.
      exclude: ['fuse.js'],
    },
  },
  integrations: [
    mdx(),
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
