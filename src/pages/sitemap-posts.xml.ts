// The journal is server-rendered, so its URLs are not in the static sitemap the
// build generates. This endpoint lists them live from the database instead —
// referenced from public/robots.txt alongside the static sitemap-index.xml.
export const prerender = false;

import type { APIRoute } from 'astro';
import { fetchPosts } from '../lib/blog';
import { site } from '../site.config';

export const GET: APIRoute = async () => {
  const { posts } = await fetchPosts('?limit=100');
  const urls = [
    { loc: `${site.url}/journal/`, lastmod: posts[0]?.publishedAt },
    ...posts.map((p) => ({ loc: `${site.url}/journal/${p.slug}/`, lastmod: p.updatedAt || p.publishedAt })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${new Date(u.lastmod).toISOString().slice(0, 10)}</lastmod>` : ''}</url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
