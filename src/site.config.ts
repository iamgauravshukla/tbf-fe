// ============================================================================
// Single source of truth for NAP, contact and tracking.
// Everything on the site — header, footer, schema, WhatsApp links, ad landing
// pages — reads from here. Change it once.
//
// >>> REPLACE EVERY PLACEHOLDER BELOW BEFORE LAUNCH. <<<
// NAP must be byte-identical here, on Google Business Profile, and on every
// directory listing. Mismatched NAP is the most common local-SEO own goal.
// ============================================================================

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
  language: "en",

  // --- NAP ----------------------------------------------------------------
  phoneDisplay: "0927 770 8969",
  phoneE164: "+639277708969",
  whatsapp: "639277708969",                   // digits only, no + or spaces
  email: "hello@thebetterface.com",           // TODO confirm business email
  address: {
    street: "TODO — Street address",
    locality: "TODO — City",
    region: "Metro Manila",
    postalCode: "TODO",
    country: "PH",
  },
  geo: { lat: 0, lng: 0 },                    // TODO from Google Business Profile
  mapUrl: "https://maps.google.com/?q=The+Better+Face", // TODO real place link

  hours: [
    { days: "Monday – Saturday", open: "09:00", close: "19:00" },
    { days: "Sunday", open: "Closed", close: "" },
  ],
  // schema.org format — keep in sync with the human-readable list above
  hoursSpec: [
    { days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "09:00", closes: "19:00" },
  ],

  social: {
    facebook: "https://facebook.com/thebetterface",   // TODO confirm
    instagram: "https://instagram.com/thebetterface", // TODO confirm
  },

  // --- tracking -----------------------------------------------------------
  // Leave empty to disable. Nothing loads until these are filled in, so the
  // site stays fast and cookie-free during development.
  ga4: "",            // "G-XXXXXXXXXX"
  metaPixel: "",      // "000000000000000"
  // Where the lead form posts. Point this at the API's lead endpoint —
  // e.g. "http://localhost:4000/api/leads" in dev, your API host in production.
  formEndpoint: "http://localhost:4000/api/leads",

  // Base URL of the backend API. Used by the /admin/ dashboard to log in and
  // manage leads. Set to your API host in production.
  apiBase: "http://localhost:4000",

  // --- media -------------------------------------------------------------
  // Clinic walkaround video for the homepage. A YouTube/Vimeo link or a
  // self-hosted "/video/walkaround.mp4" path. Leave empty and the homepage
  // shows a "filming soon" placeholder in its place, ready for the footage.
  clinicVideo: "",
  clinicVideoPoster: "/img/t-lobby.jpg",
} as const;

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:${site.phoneE164}`;
