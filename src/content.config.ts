import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** One Markdown file per treatment. Adding a treatment = adding a file. */
const treatments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/treatments' }),
  schema: z.object({
    title: z.string(),
    // The <h1> and the <title> differ on purpose: the h1 speaks to a human,
    // the title tag carries the keyword. See README, SEO section.
    seoTitle: z.string(),
    metaDescription: z.string().max(158),
    /** Top-level menu split. Drives the homepage slider tabs and the index. */
    group: z.enum(['Skin', 'Hair', 'Wellness']),
    /** The small label on the card. Free-form within this list. */
    category: z.enum(['Aesthetics', 'Dermatology', 'Laser', 'Body', 'Wellness', 'Hair Removal', 'Hair Restoration', 'Scalp']),
    summary: z.string(),
    /** Everyday price ("Our Price" on the Treatment Menu). Shown as "from ₱X"
     *  on cards and as the standing price on the treatment page. Null → "Price
     *  on consultation". Also used for the schema.org offer price. */
    priceFrom: z.number().nullable(),
    /** Regular anchor price, struck through beside the everyday price. */
    priceRegular: z.number().nullable().default(null),
    /** One-time first-visit offer (one per client). Shown as a promo on the
     *  treatment page only — kept off the standing price and structured data. */
    promoPrice: z.number().nullable().default(null),
    /** What the first-visit offer covers, e.g. "Jawline / V-line", "One area". */
    promoScope: z.string().optional(),
    /** Unit shown after prices on the page: per session or per area. */
    priceUnit: z.enum(['session', 'area']).default('session'),
    duration: z.string(),
    course: z.string(),
    downtime: z.string(),
    /** Plain-language, honest. Shown as a bulleted list. */
    suitableFor: z.array(z.string()),
    notSuitableFor: z.array(z.string()),
    order: z.number().default(50),
    image: z.string().optional(),
    /** Describes what `image` shows (hero alt text + social card alt). Say what
     *  is in the photo, plainly — not a keyword list. Defaults to the title. */
    imageAlt: z.string().optional(),
    /** Extra showcase images for the treatment page's experience section.
     *  Leave empty and the page falls back to curated clinic photography. */
    gallery: z.array(z.string()).default([]),
    /** Photo gallery section (grid + full-screen viewer). Each entry is a path,
     *  or { src, alt, caption } — alt says what is in the photo. Leave empty and
     *  the page shows `image` plus curated clinic photography instead. */
    photos: z.array(z.union([
      z.string(),
      z.object({ src: z.string(), alt: z.string().optional(), caption: z.string().optional() }),
    ])).default([]),

    /** Optional treatment walkthrough video. A YouTube/Vimeo link, or a
     *  self-hosted `/video/xxx.mp4` path. When set, the treatment page shows a
     *  click-to-play video section; when empty it shows a documented placeholder
     *  so the section exists on every page, ready for footage. */
    video: z.string().optional(),
    /** Poster frame for the video. Falls back to `image`. */
    videoPoster: z.string().optional(),

    /** Before / after pairs. LEFT EMPTY BY DESIGN.
     *  Aesthetic before/after imagery is regulated in the Philippines (FDA/DOH)
     *  and restricted by Meta in paid ads. Only populate this once every image
     *  has written per-patient consent, was shot in identical conditions,
     *  unretouched, and dated. Until then the page shows the photography
     *  standard as a placeholder — see /results/ for the same stance. */
    beforeAfter: z.array(z.object({
      before: z.string(),
      after: z.string(),
      caption: z.string().optional(),
      date: z.string().optional(),
    })).default([]),

    draft: z.boolean().default(false),
  }),
});

// NOTE: the journal moved out of markdown and into the database — posts are
// written in /admin/blog and served by the API; the /journal/ pages render
// them on demand. See src/lib/blog.ts.

export const collections = { treatments };
