// Resolves a page's social-sharing image into an absolute, verified URL.
// Runs at build time only (pages are static), so it can check the file on disk.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { site } from '../site.config';

export interface OgImage {
  url: string;
  width?: number;
  height?: number;
  type?: string;
}

const MIME: Record<string, string> = {
  jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', avif: 'image/avif',
};
const cache = new Map<string, OgImage | null>();
// public/ at build time; dist/client/ when the server-rendered journal runs in production.
const STATIC_ROOTS = [join(process.cwd(), 'public'), join(process.cwd(), 'dist', 'client')];

/** A root-relative path must exist in public/; an absolute URL must be public http(s). */
async function resolveOne(src?: string | null): Promise<OgImage | null> {
  const s = src?.trim();
  if (!s) return null;
  if (cache.has(s)) return cache.get(s)!;

  let out: OgImage | null = null;
  if (/^https?:\/\//i.test(s)) {
    // Remote (e.g. an uploaded journal cover). Can't stat it here; just refuse
    // anything a social crawler could never fetch.
    const host = new URL(s).hostname;
    out = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(host) ? null : { url: s };
  } else if (s.startsWith('/')) {
    const rel = decodeURI(s.split(/[?#]/)[0]);
    const roots = STATIC_ROOTS.filter((r) => existsSync(r));
    const file = roots.map((r) => join(r, rel)).find((f) => existsSync(f));
    if (file) {
      out = { url: new URL(s, site.url).href };
      try {
        const m = await sharp(file).metadata();
        out.width = m.width;
        out.height = m.height;
        out.type = m.format ? MIME[m.format] : undefined;
      } catch { /* dimensions are optional */ }
    } else if (!roots.length) {
      // No static folder to check against (unusual server layout) — trust the path.
      out = { url: new URL(s, site.url).href };
    }
  }

  if (!out) console.warn(`[og] image unusable, falling back to default: ${s}`);
  cache.set(s, out);
  return out;
}

/** The page's own image when usable, otherwise the site default. Never empty. */
export async function resolveOgImage(src?: string | null): Promise<OgImage & { fallback: boolean }> {
  const own = await resolveOne(src);
  if (own) return { ...own, fallback: false };
  const def = (await resolveOne(site.ogImageDefault)) ?? { url: new URL(site.ogImageDefault, site.url).href };
  return { ...def, fallback: true };
}
