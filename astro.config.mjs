import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://thebetterface.com',   // keep in sync with src/site.config.ts
  // Node adapter: every page stays prerendered static EXCEPT the journal, which
  // is server-rendered on demand so posts published from /admin/ go live (and
  // are crawlable) instantly, with no rebuild. Deploy runs dist/server/entry.mjs.
  adapter: node({ mode: 'standalone' }),
  // One URL per page. Every internal link, canonical and sitemap entry already
  // ends in "/"; this makes the slashless variant redirect to it instead of
  // serving a duplicate 200.
  trailingSlash: 'always',
  // Ad landing pages, the conversion page and 404 are noindex — keeping them out
  // of the sitemap as well stops Search Console reporting them as errors.
  // /journal/ is listed (with a real lastmod) by /sitemap-posts.xml instead.
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/lp/') &&
        !page.includes('/thank-you/') &&
        !page.includes('/admin') &&
        !page.includes('/404') &&
        new URL(page).pathname !== '/journal/',
    }),
  ],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
