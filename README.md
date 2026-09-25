# The Better Face — website

Static marketing site built to the TBF brand guidelines (v2.2). Astro, zero
JavaScript shipped by default, content in Markdown so the clinic can add
treatments and articles without a developer.

---

## Why this stack

| Requirement (from the brief) | How it is met |
| --- | --- |
| Blogs | `src/content/journal/*.md` — one file per article, schema-validated at build |
| Good SEO | Server-rendered HTML, per-page title/description/canonical, JSON-LD, auto sitemap |
| Faster load | No framework, no external JS file, self-hosted fonts, static HTML on a CDN |
| List treatments | `src/content/treatments/*.md` — one file per treatment, auto-listed and cross-linked |
| Skin / Hair categories | `group: Skin \| Hair` in frontmatter drives the homepage slider tabs and the treatments index |
| Multiple ad landing pages | `src/campaigns.ts` — one object per page, generated at `/lp/<slug>/`, noindex |
| Form leads + messaging leads | `LeadForm` posts to any endpoint; WhatsApp and click-to-call on every page and in a fixed mobile bar |

Astro was chosen over WordPress because a clinic site is read far more often
than it is written, and over Next.js because nothing here needs a server. The
whole site is files on a CDN: nothing to patch, nothing to hack, and no plugin
that breaks the design six months from now.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview    # serve dist/ locally
```

Node 20+ required. The build is entirely static — deploy `dist/` to Cloudflare
Pages, Netlify or Vercel. Build command `npm run build`, output directory `dist`.

---

## Before launch — the list

Everything below is marked `TODO` in the code. The site builds without them; it
should not go live with them.

1. **`src/site.config.ts`** — street address, city, postcode, latitude/longitude,
   Google Maps place link, business email, confirmed domain, social URLs.
   *This NAP must be byte-identical here, on Google Business Profile and on every
   directory listing. Mismatched NAP is the most common local-SEO own goal.*
2. **`ga4` and `metaPixel`** in the same file. Nothing tracking-related loads
   until these are set, which is why development stays fast and cookie-free.
3. **`formEndpoint`** in the same file. Until it is set the lead form renders
   **disabled with a visible warning** — deliberately, so no enquiry is ever
   silently lost. Any endpoint that accepts a POST works (Cloudflare Worker,
   Netlify Forms, Formspree). It must redirect to `/thank-you/`, where the
   conversion fires.
4. **`src/pages/about.astro`** — real team names, roles, PRC numbers and
   photographs. This is the single strongest trust and local-SEO signal a clinic
   has, and it is currently the largest gap on the site.
   Author bios on journal posts carry the same TODO.
5. **The homepage testimonials** — the "What clients say" slider (two cards on
   desktop, one on a phone, in `Testimonials.astro`) ships with placeholder
   quotes in `src/pages/index.astro`. Replace them with real, consented reviews
   from Google Business Profile. Do not publish any you cannot evidence.
   **`clinicVideo`** in `src/site.config.ts` — the homepage "A look around the
   clinic" section shows a "filming soon" placeholder until you set this to a
   YouTube/Vimeo link or a self-hosted `/video/xxx.mp4` path.
6. **Legal pages** (`privacy`, `terms`, `consent`) — drafted to the structure
   RA 10173 and DOH/FDA advertising rules require, but they are scaffolds, not
   legal advice. Counsel reviews them, then you delete the amber notice at the
   top of each.
7. **Footer** — PRC / DOH registration line.
8. **Photography for the hair treatments.** The three hair pages currently reuse
   skin and product shots from the brand kit, because no hair photography exists
   yet. Laser hair removal, PRP and scalp therapy each need their own image
   before launch — a product still on a hair-removal page is the kind of detail
   that quietly costs trust.
9. **`IV Therapy` sits under `group: Skin`.** With only two top-level groups it
   had to go somewhere. If the clinic's wellness menu grows, add a third group
   to the enum in `src/content.config.ts` and to the `GROUPS` arrays in
   `TreatmentSlider.astro` and `treatments/index.astro` — three places, one
   minute.

---

## Adding content

**A treatment** — copy any file in `src/content/treatments/`, change the
frontmatter, save. It appears in the homepage slider under its `group`, on the
treatments index, in "often considered alongside" on sibling pages, and in the
sitemap. `order` controls position; `draft: true` hides it.

`group` is the top-level split (`Skin` or `Hair`) and drives the slider tabs and
the index sections. `category` is the small label on the card. A value outside
the allowed list fails the build rather than quietly creating an orphan group.

`notSuitableFor` is required by the schema. That is on purpose — it is the field
most clinics leave out and the one that earns the most trust.

**A treatment video.** Set `video:` in the frontmatter to a YouTube or Vimeo
link, or a self-hosted `/video/xxx.mp4` path. The treatment page then shows a
click-to-play walkthrough (the third-party player only loads when the visitor
presses play, so the page stays fast and cookie-free until then). `videoPoster:`
overrides the still frame; it defaults to `image`. **Every treatment already
carries the section** — with no `video` set it renders a documented "filming
soon" placeholder, so the slot is present and ready for footage on day one.

**Before / after.** `beforeAfter:` takes a list of
`{ before, after, caption?, date? }` pairs and renders an interactive
drag-to-reveal slider. It ships **empty on purpose.** Aesthetic before/after
imagery is regulated in the Philippines (FDA/DOH) and restricted by Meta in paid
ads, so until every image has written per-patient consent, identical capture
conditions, no retouching and a date, the section shows the photography standard
instead of results — the same stance as `/results/`. Do not populate it with
stock or borrowed images.

**An article** — copy any file in `src/content/journal/`. `related` takes
treatment slugs and builds the internal link from education content to the
commercial page, which is what makes a blog pull its weight in search.

`metaDescription` is capped at 158 characters by the schema, so the build fails
rather than letting a truncated snippet ship.

**An ad landing page** — add an object to `src/campaigns.ts`. It builds to
`/lp/<slug>/` with no navigation, `noindex`, a form above the fold, a fixed
call/WhatsApp bar on mobile, and its own FAQ.

---

## SEO

- **Titles and H1s differ on purpose.** `seoTitle` carries the keyword, `title`
  speaks to a human. Both are in the frontmatter.
- **JSON-LD** (`src/components/Schema.astro`): `MedicalBusiness` +
  `HealthAndBeautyBusiness` sitewide with a stable `@id`, `MedicalProcedure` on
  treatment pages, `Article` on journal posts, `BreadcrumbList` everywhere.
  `aggregateRating` is **deliberately omitted** — marking up ratings you cannot
  evidence is a manual-action risk, not a shortcut. Add it only when real
  reviews are published on the site.
- **`/lp/` is disallowed in `robots.txt` and filtered out of the sitemap**, so
  paid landing pages never compete with the SEO treatment pages for the same
  keyword.
- **Sitemap** is generated at `/sitemap-index.xml`. Submit it in Search Console.

### Local / GEO
The brief's local checklist is met in the code by: NAP in the footer and on
`/contact/` sourced from one config object, `LocalBusiness` schema with geo and
opening hours, and a map link. The rest is off-site work the clinic must do —
claim and complete the Google Business Profile, matching NAP on every directory,
and a steady flow of real reviews. The site cannot manufacture those.

---

## Tracking

Every CTA carries `data-ev` and `data-loc`. One delegated click listener
(~400 bytes, no framework) in `src/components/Analytics.astro` forwards them.

| Event | Where |
| --- | --- |
| `book_click` | header, hero, mobile bar, treatment pages, bands |
| `call_click` | header, footer, mobile bar, landing pages |
| `whatsapp_click` | mobile bar, landing pages, treatment pages |
| `form_submit` | contact, `landing:<slug>` |
| `generate_lead` | `/thank-you/` — **this is the conversion** |

Mark `generate_lead` as the GA4 key event and the Meta `Lead` standard event.
**Do not mark `form_submit`** — it fires before the endpoint has accepted
anything and will over-report against ad spend. `generate_lead` is guarded with
`sessionStorage` so a refresh or back-button return does not double count.

---

## Performance

Measured on the production build:

- **No external JavaScript file at all** — nothing to download, parse or block.
  Inline script per page: **~1 KB** on most pages (the scroll reveal and the
  header's scrolled state), **~3 KB** on the homepage (plus the slider's
  arrows, end-states and progress rail), **~1.5 KB** on `/thank-you/` (plus
  the conversion event).
- CSS is inlined per page by Astro where it is small enough to beat a round trip.
- Two font files preloaded (Playfair 400, Instrument Sans variable); the other
  cuts load on demand with `font-display: swap`.
- All below-fold images are `loading="lazy"` with explicit `width`/`height`, so
  nothing shifts as the page settles.

### Motion

Subtle only, and never load-bearing. Sections fade and rise as they enter view;
images settle slowly on hover. Both are opt-in per element with `data-reveal`,
and the hiding CSS is scoped behind a class the script adds — so if scripting
fails, or the visitor has *Reduce motion* on, everything renders immediately at
full opacity. **Content is never hidden behind JavaScript.**

Remaining performance work is images: the JPEGs in `public/img/` came from the
brand kit and are not yet responsive. Move them through Astro's `<Image>`
component (`sharp` is already installed) to emit AVIF/WebP at several widths
once the final photography is shot.

---

## Brand fidelity

Tokens in `src/styles/global.css` are ported from the guidelines with page
references in the comments: palette p.15–18, type scale p.21, 8px rhythm p.22,
the champagne rule p.25, buttons and the mandatory disclaimer p.33.

Two guideline rules are enforced structurally rather than by memory:

- **Champagne is never used for text**, only hairlines and eyebrow labels on
  light backgrounds.
- **The disclaimer appears above every booking CTA.** It is in the hero, on every
  treatment page, in the form, and in each closing band.

A white card inside a dark section uses `.light-island` to opt out of the
inverse colour cascade — without it, body copy renders ivory-on-white.

The homepage treatments block is a **contained grid**, not a horizontal scroll
rail — nothing bleeds off the viewport, which reads calmer and more premium. The
Skin/Hair toggle is radio inputs switched with CSS `:has()`, not JavaScript, so
the panels change even if scripting fails. The cards use the bordered "chrome"
variant of `TreatmentCard` here; the borderless variant is still used in the
dense index and related-treatment grids.

The homepage closes on an **embedded lead form** (`LeadForm`, in the booking
band) rather than only a button, so the primary conversion happens on the page.
WhatsApp and click-to-call sit beside it for visitors who would rather message.

The mobile menu in the header is a native `<details>` element: it opens and
closes with no script and is keyboard-operable out of the box. The bottom
action bar still carries Call, WhatsApp and Book on small screens.

The header lockup is the monogram plus the wordmark, sourced from the brand kit
(`public/logo/icon-512.png` for the mark and the favicon). Treatment
walkthroughs (`TreatmentVideo`) use a click-to-play facade so no third-party
player script loads until a visitor asks for it.

---

## Two decisions that need the clinic, not the developer

1. **Urgency on ad landing pages.** The brief asked for "limited slots or dates".
   Guidelines p.7 and p.33 forbid manufactured scarcity, and an untrue scarcity
   claim is also a DTI advertising risk. The compromise in `src/campaigns.ts` is
   an `availability` field that must state something factual and evidenced — real
   consultation capacity, a real cohort size, a real end date. It ships empty.
   Leave it empty rather than invent one.

2. **Before-and-after imagery.** `/results/` and the new per-treatment
   before/after section both ship as documented placeholders. Aesthetic-procedure
   advertising and before/after imagery fall under FDA and DOH rules in the
   Philippines, and Meta restricts before/after in paid ads regardless. Both
   places publish the photography standard instead — written consent per image,
   identical capture conditions, no retouching, everything dated. Populate
   `cases` in `src/pages/results.astro`, and `beforeAfter:` in each treatment's
   frontmatter, only after your regulatory adviser signs off. The treatment
   section already has the drag-to-reveal slider built; it turns on the moment
   real consented pairs are supplied.

3. **Treatment walkthrough videos.** Every treatment page carries a video
   section that renders a "filming soon" placeholder until you set `video:` in
   the frontmatter. No footage is invented; add real clips when they exist.

---

## Structure

```
src/
  site.config.ts        one source of truth: NAP, contact, tracking IDs
  campaigns.ts          one object per ad landing page
  content.config.ts     Zod schemas — a bad content file fails the build
  content/
    treatments/*.md
    journal/*.md
  components/           Head, Schema, Analytics, Header, Footer, LeadForm,
                        TreatmentCard (borderless + chrome variants),
                        TreatmentSlider (Skin/Hair contained grid),
                        TreatmentVideo (click-to-play), BeforeAfter (slider +
                        documented placeholder)
  layouts/              Base (site), Landing (ads, no nav), Legal
  pages/
    index, about, results, contact, thank-you, 404
    treatments/         index + [...slug]
    journal/            index + [...slug]
    lp/[campaign]       generated from campaigns.ts
    privacy, terms, consent
  styles/global.css     brand tokens
public/
  fonts/ img/ logo/ robots.txt
```
