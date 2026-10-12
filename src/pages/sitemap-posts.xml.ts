// The journal is server-rendered, so its URLs are not in the static sitemap the
// build generates. This endpoint lists them live from the database instead —
// linked from sitemap-index.xml (see astro.config.mjs) and public/robots.txt.
// Only indexable posts are listed: a short intro-only post is noindexed by its
// page (see isIndexable) and so must not be submitted here either.
export const prerender = false;

import type { APIRoute } from 'astro';
import { fetchPosts, isIndexable } from '../lib/blog';
import { site } from '../site.config';

const day = (iso: string) => new Date(iso).toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const { posts } = await fetchPosts('?limit=100');
  const listed = posts.filter(isIndexable);
  const modified = (p: (typeof posts)[number]) => p.updatedAt || p.publishedAt;
  // The hub changes whenever any post is published or edited — including the
  // unlisted ones, which still appear on it.
  const hubLastmod = posts.map(modified).filter(Boolean).sort().at(-1);
  const urls = [
    { loc: `${site.url}/journal/`, lastmod: hubLastmod },
    ...listed.map((p) => ({ loc: `${site.url}/journal/${p.slug}/`, lastmod: modified(p) })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${day(u.lastmod)}</lastmod>` : ''}</url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
