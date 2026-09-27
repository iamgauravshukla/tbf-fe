// Blog data + rendering helpers.
//
// Posts live in the API's database (written from /admin/blog). Static pages
// (homepage teasers, treatment asides) fetch at BUILD time and fail soft; the
// journal pages are server-rendered per request (prerender = false) so a post
// published in the dashboard is live immediately.
import { site } from '../site.config';
import { marked } from 'marked';

/** API base: runtime env first (SSR on the host), then the built-in value. */
export const apiBase = () =>
  (typeof process !== 'undefined' && process.env?.API_BASE) || site.apiBase;

export interface PostSummary {
  slug: string; title: string; excerpt: string;
  metaDescription?: string; seoTitle?: string; coverImage?: string | null;
  related: string[]; authorName: string; authorRole: string;
  publishedAt: string; updatedAt?: string; readMins: number;
}
export interface Post extends PostSummary { content: string }

export async function fetchPosts(qs = ''): Promise<{ total: number; posts: PostSummary[] }> {
  try {
    const r = await fetch(`${apiBase()}/api/posts${qs}`);
    if (!r.ok) return { total: 0, posts: [] };
    const j = await r.json();
    return { total: j.total ?? 0, posts: j.posts ?? [] };
  } catch {
    return { total: 0, posts: [] };
  }
}

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const r = await fetch(`${apiBase()}/api/posts/${encodeURIComponent(slug)}`);
    if (!r.ok) return null;
    const j = await r.json();
    return j.post ?? null;
  } catch {
    return null;
  }
}

const headingSlug = (s: string) =>
  s.toLowerCase().replace(/<[^>]*>/g, '').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const stripTags = (s: string) => s.replace(/<[^>]*>/g, '');

/** Markdown → HTML with ids on h2/h3, plus an auto table of contents (h2s). */
export function renderMarkdown(md: string): { html: string; toc: { slug: string; text: string }[] } {
  const raw = marked.parse(md || '', { async: false }) as string;
  const toc: { slug: string; text: string }[] = [];
  const html = raw.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, level, inner) => {
    const slug = headingSlug(inner);
    if (level === '2') toc.push({ slug, text: stripTags(inner) });
    return `<h${level} id="${slug}">${inner}</h${level}>`;
  });
  return { html, toc };
}

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-PH', { day: 'numeric', month: 'long', year: 'numeric' });
