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
  url: "https://thebetterface.com",          // TODO confirm domain
  locale: "en_PH",
  language: "en-PH",

  // --- NAP ----------------------------------------------------------------
  phoneDisplay: "0927 770 8969",
  phoneE164: "+639277708969",
  whatsapp: "639277708969",                   // digits only, no + or spaces
  email: "hello@thebetterface.com",           // TODO confirm business email
  address: {
    street: "5102 Bridgeway Ave, Vivere Hotel Alabang",
    locality: "Muntinlupa City",
    region: "Metro Manila",
    // Left empty on purpose: fill with the postal code Google Business Profile
    // assigns to the map pin, so the website and GBP stay byte-identical.
    // While empty, the footer/contact just omit it and the schema address
    // stays unpublished (see hasAddress below).
    postalCode: "",
    country: "PH",
  },
  geo: { lat: 0, lng: 0 },                    // TODO from Google Business Profile
  mapUrl: "https://maps.google.com/?q=The+Better+Face", // TODO real place link

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
  metaPixel: "",      // "000000000000000"
  // Where the lead form posts. Point this at the API's lead endpoint —
  // e.g. "http://localhost:4000/api/leads" in dev, your API host in production.
  formEndpoint: `${API_BASE}/api/leads`,

  // Base URL of the backend API. Used by the /admin/ dashboard to log in and
  // manage leads. Comes from PUBLIC_API_BASE (see API_BASE above).
  apiBase: API_BASE,

  // --- media -------------------------------------------------------------
  // Photo of the clinic itself — the business `image` in structured data.
  clinicImage: "/img/t-lobby.jpg",
  // Social sharing (Open Graph / Twitter) images. Treatment pages use their own
  // `image:` from the frontmatter; these cover everything else.
  // Homepage card — the brand mark. Swap for a dedicated 1200×630 image when one exists.
  ogImageHome: "/logo/logo-vertical.png",
  // Fallback for any page without its own image, or whose image is missing on disk.
  ogImageDefault: "/logo/logo-vertical.png",
  // Clinic walkaround video for the homepage. A YouTube/Vimeo link or a
  // self-hosted "/video/walkaround.mp4" path. Leave empty and the homepage
  // shows a "filming soon" placeholder in its place, ready for the footage.
  clinicVideo: "https://youtu.be/ZSaaLSrcjOI",
  clinicVideoPoster: "/img/clinic-video-poster.jpg",
} as const;

// Placeholder guards. Structured data must never publish a "TODO" address or
// 0,0 coordinates — Google treats that as a wrong address, which is worse for
// local ranking than no address at all. These flip to true once the real NAP
// is filled in above, and the schema picks the fields up automatically.
const isReal = (v: string) => v.trim() !== "" && !/TODO/i.test(v);
export const hasAddress =
  isReal(site.address.street) && isReal(site.address.locality) && isReal(site.address.postalCode);
export const hasGeo = site.geo.lat !== 0 && site.geo.lng !== 0;

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:${site.phoneE164}`;
