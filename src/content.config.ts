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
    /** Displayed as "from ₱X". Leave null to show "Price on consultation". */
    priceFrom: z.number().nullable(),
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
