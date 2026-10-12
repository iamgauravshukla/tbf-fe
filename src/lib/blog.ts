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

// ---------------------------------------------------------------------------
// SEO helpers — shared by the post page, the posts sitemap and the treatment
// pages so all three agree on what is indexable and how it is described.
// ---------------------------------------------------------------------------

/** A post under ~200 words (the API reports readMins 1) is an intro, not a
 *  guide. It stays readable on the site but is noindexed and kept out of the
 *  sitemap until it is written up — at which point it is picked up
 *  automatically, no code change needed. */
export const isIndexable = (p: Pick<PostSummary, 'readMins'>) => (p.readMins ?? 0) >= 2;

/** Trim to `max` chars at a sentence end if one is close, else at a word. */
function clampText(text: string, max: number): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sentence = cut.lastIndexOf('. ');
  if (sentence >= max * 0.55) return cut.slice(0, sentence + 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s—–-]+$/, '') + '…';
}

/** The editor's meta description when it is a complete sentence of sensible
 *  length; otherwise one built from the excerpt. Imported posts carry a meta
 *  description hard-cut at 170 characters mid-word ("…sensit"), which would
 *  otherwise be shown as-is in search results. */
export function metaDescriptionFor(p: Pick<PostSummary, 'metaDescription' | 'excerpt' | 'title'>): string {
  const md = (p.metaDescription || '').trim();
  if (md && md.length <= 160 && /[.!?…)"”’]$/.test(md)) return md;
  return clampText(p.excerpt || md || p.title, 155);
}

/** The editor's SEO title, with the brand appended when it is missing and
 *  there is room for it before Google truncates (~65 characters). */
export function seoTitleFor(p: Pick<PostSummary, 'seoTitle' | 'title'>): string {
  const t = (p.seoTitle || p.title).trim();
  const withBrand = `${t} | ${site.name}`;
  return t.includes(site.name) || withBrand.length > 65 ? t : withBrand;
}

/** Treatment pages a post is about, read from its title and slug. Used only
 *  when the editor has not picked `related` treatments, so every guide links
 *  to the service it discusses (and the service page links back). */
const TOPICS: [RegExp, string[]][] = [
  [/\bhifu\b/i, ['hifu']],
  [/\bco2\b|co₂|fractional laser|acne scar/i, ['co2-fractional-laser']],
  [/melasma|pigmentation|dark patch/i, ['melasma-treatment']],
  [/chemical peel/i, ['chemical-peel']],
  [/\bprp\b|platelet/i, ['prp']],
  [/\bpdrn\b/i, ['hair-growth-pdrn']],
  [/exosome/i, ['hair-regrowth-exosomes']],
  [/hair loss|thinning hair|hair specialist/i, ['hair-growth-pdrn', 'hair-regrowth-exosomes']],
  [/dandruff/i, ['scalp-anti-dandruff']],
  [/glutathione/i, ['glutathione-iv-drip']],
  [/exilis/i, ['exilis']],
  [/radio ?frequency/i, ['radio-frequency']],
  [/\bwarts?\b/i, ['warts-removal']],
  [/pimple|cystic/i, ['pimple-injection']],
];
export function relatedFor(p: Pick<PostSummary, 'related' | 'title' | 'slug'>): string[] {
  if (p.related?.length) return p.related;
  const text = `${p.title} ${p.slug.replace(/-/g, ' ')}`;
  const ids = TOPICS.filter(([re]) => re.test(text)).flatMap(([, s]) => s);
  return [...new Set(ids)].slice(0, 4);
}

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-PH', { day: 'numeric', month: 'long', year: 'numeric' });
