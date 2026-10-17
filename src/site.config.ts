// ============================================================================
// Single source of truth for NAP, contact and tracking.
// Everything on the site — header, footer, schema, WhatsApp links, ad landing
// pages — reads from here. Change it once.
//
// >>> REPLACE EVERY PLACEHOLDER BELOW BEFORE LAUNCH. <<<
// NAP must be byte-identical here, on Google Business Profile, and on every
// directory listing. Mismatched NAP is the most common local-SEO own goal.
// ============================================================================

// Backend API base URL, read at BUILD time from the PUBLIC_API_BASE env var.
// Set it on the frontend host (or in client/.env.production) to your deployed
// API; local dev falls back to localhost. Trailing slashes are stripped. The
// value is baked into the static build and used by the /admin/ dashboard and
// the lead form.
const API_BASE = (import.meta.env.PUBLIC_API_BASE || "http://localhost:4000").replace(/\/+$/, "");

export const site = {
  name: "The Better Face",
  legalName: "The Better Face Wellness & Aesthetic Clinic",
  tagline: "The better skin. The better you.",
  pillars: ["Skin", "Wellness", "Confidence"],
  description:
    "Premium skin, aesthetics and wellness. Clinical expertise delivered through a calm, considered experience — personalised treatment plans from qualified practitioners.",

  // --- domain -------------------------------------------------------------
  // Canonical origin: https + www, no trailing slash. Every canonical tag,
  // og:url, schema @id and sitemap URL is built from this, so it must match
  // `site` in astro.config.mjs. The apex host 301s here (hostinger.entry.js).
  url: "https://www.thebetterface.com",
  locale: "en_PH",
  language: "en-PH",

  // --- NAP ----------------------------------------------------------------
  phoneDisplay: "0927 770 8969",
  phoneE164: "+639277708969",
  whatsapp: "639277708969",                   // digits only, no + or spaces
  messenger: "TheBetterFace",                  // Facebook Page username → m.me/<this>
  email: "hello@thebetterface.com",           // TODO confirm business email
  address: {
    street: "5102 Bridgeway Ave, Vivere Hotel Alabang",
    locality: "Muntinlupa City",
    region: "Metro Manila",
    // Left empty on purpose: fill with the postal code Google Business Profile
    // assigns to the map pin, so the website and GBP stay byte-identical.
    // While empty, the footer/contact and the schema address just omit it.
    postalCode: "",
    country: "PH",
  },
  // Short form of the address above for titles and descriptions — the place
  // people actually search for ("skin clinic Alabang").
  locationLabel: "Alabang, Muntinlupa",
  geo: { lat: 0, lng: 0 },                    // TODO from Google Business Profile
  // Directions link: searches the name *and* street, so it lands on this clinic
  // rather than any business called "The Better Face". Replace with the Google
  // Business Profile share link (maps.app.goo.gl/…) when available — only a
  // real place link is published as schema `hasMap` (see hasMapPlace below).
  mapUrl: "https://www.google.com/maps/search/?api=1&query=The+Better+Face%2C+5102+Bridgeway+Ave%2C+Vivere+Hotel+Alabang%2C+Muntinlupa+City",

  // DOH licence / PRC registration line for the footer. Shown only once filled
  // in — a public "TODO" where a licence should be costs trust.
  registration: "",

  hours: [
    { days: "Monday – Sunday", open: "09:00", close: "19:00" },
  ],
  // schema.org format — keep in sync with the human-readable list above
  hoursSpec: [
    { days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "09:00", closes: "19:00" },
  ],

  social: {
    facebook: "https://facebook.com/thebetterface",   // TODO confirm
    instagram: "https://instagram.com/thebetterface", // TODO confirm
  },

  // --- tracking -----------------------------------------------------------
  // Leave empty to disable. Nothing loads until these are filled in, so the
  // site stays fast and cookie-free during development.
  ga4: "G-CTFXC3FD7Y", // Google Analytics 4 measurement ID
  metaPixel: "1761773535045212", // Meta (Facebook) Pixel ID
  // Where the lead form posts. Point this at the API's lead endpoint —
  // e.g. "http://localhost:4000/api/leads" in dev, your API host in production.
  formEndpoint: `${API_BASE}/api/leads`,
  // Where the API sends the browser after a successful POST (the form's `_next`).
  // Deliberately left on the apex host the API has always accepted; the server
  // 301s it on to https://www.thebetterface.com/thank-you/, where the
  // conversion fires. Switch to `${url}/thank-you/` once the API is confirmed
  // to accept the www host.
  formReturnUrl: "https://thebetterface.com/thank-you/",

  // Base URL of the backend API. Used by the /admin/ dashboard to log in and
  // manage leads. Comes from PUBLIC_API_BASE (see API_BASE above).
  apiBase: API_BASE,

  // --- media -------------------------------------------------------------
  // Photo of the clinic itself — the business `image` in structured data.
  clinicImage: "/img/t-lobby.jpg",
  // Social sharing (Open Graph / Twitter) images. Treatment pages use their own
  // `image:` from the frontmatter; these cover everything else.
  // Homepage card — storefront + reception, already a wide social-card shape.
  ogImageHome: "/img/clinic-video-poster.jpg",
  // Fallback for any page without its own image (contact, legal, landing pages…):
  // a wide crop of the storefront photo that keeps the sign in frame.
  ogImageDefault: "/img/og-storefront.jpg",
  // Clinic walkaround video for the homepage. A YouTube/Vimeo link or a
  // self-hosted "/video/walkaround.mp4" path. Leave empty and the homepage
  // shows a "filming soon" placeholder in its place, ready for the footage.
  clinicVideo: "https://www.youtube.com/watch?v=FGrvdsgUTyg",
  clinicVideoPoster: "/img/clinic-video-poster.jpg",
} as const;

// Placeholder guards. Structured data must never publish a "TODO" address or
// 0,0 coordinates — Google treats that as a wrong address, which is worse for
// local ranking than no address at all. These flip to true once the real NAP
// is filled in above, and the schema picks the fields up automatically.
const isReal = (v: string) => v.trim() !== "" && !/TODO/i.test(v);
// Street and city are real and already shown in the footer and on /contact/,
// so the schema publishes them; the postcode joins once it is filled in.
export const hasAddress = isReal(site.address.street) && isReal(site.address.locality);
export const hasPostalCode = isReal(site.address.postalCode);
// A real place link (GBP share / maps.app.goo.gl), not a search query.
export const hasMapPlace = !/[?&](q|query)=/.test(site.mapUrl);
export const hasGeo = site.geo.lat !== 0 && site.geo.lng !== 0;

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

// Facebook Messenger deep link to the Page chat. Unlike WhatsApp, m.me cannot
// pre-fill the message text, so the chat opens blank for the visitor to type.
export const messengerLink = `https://m.me/${site.messenger}`;

export const telLink = `tel:${site.phoneE164}`;
