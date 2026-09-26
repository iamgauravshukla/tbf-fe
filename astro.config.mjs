import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://thebetterface.com',   // keep in sync with src/site.config.ts
  // Node adapter: every page stays prerendered static EXCEPT the journal, which
  // is server-rendered on demand so posts published from /admin/ go live (and
  // are crawlable) instantly, with no rebuild. Deploy runs dist/server/entry.mjs.
  adapter: node({ mode: 'standalone' }),
  // Ad landing pages, the conversion page and 404 are noindex — keeping them out
  // of the sitemap as well stops Search Console reporting them as errors.
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/lp/') &&
        !page.includes('/thank-you/') &&
        !page.includes('/admin') &&
        !page.includes('/404'),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
