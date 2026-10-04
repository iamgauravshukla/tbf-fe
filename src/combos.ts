// Combo offers from the Treatment Menu card — the single source of truth for
// combo pricing. Each treatment page renders the combos that include it
// (see combosFor). An item's `slug` links to that treatment's page; items with
// no page on the site (e.g. the Hyaluronic Skin Booster) carry a label only.
//
// Prices are the first-visit combo price; `value` is the sum of the members'
// everyday prices, shown struck through so the saving is visible. Combos are
// first visit only, one per client, and cannot be stacked with a single-
// treatment first-visit offer.

export interface ComboItem {
  label: string;
  /** Treatment slug when the member has a page; omitted for off-menu add-ons. */
  slug?: string;
  price: number;
}

export interface Combo {
  slug: string;
  name: string;
  tagline: string;
  items: ComboItem[];
  /** First-visit combo price. */
  price: number;
  /** Sum of the members' everyday prices. */
  value: number;
  bestFor: string;
}

export const combos: Combo[] = [
  {
    slug: 'scalp-revival',
    name: 'Scalp Revival',
    tagline: 'Clean scalp, stronger roots',
    items: [
      { label: 'Scalp Anti-Dandruff', slug: 'scalp-anti-dandruff', price: 1800 },
      { label: 'PRP', slug: 'prp', price: 8500 },
    ],
    price: 2499, value: 10300,
    bestFor: 'Dandruff with early hair fall',
  },
  {
    slug: 'needle-free-hair-starter',
    name: 'Needle-Free Hair Starter',
    tagline: 'Detox, then nourish · no needles',
    items: [
      { label: 'Scalp Anti-Dandruff', slug: 'scalp-anti-dandruff', price: 1800 },
      { label: 'Needle-Free Exosome Scalp', slug: 'hair-regrowth-exosomes', price: 4500 },
    ],
    price: 1799, value: 6300,
    bestFor: 'Thinning hair, needle-shy clients',
  },
  {
    slug: 'glass-skin-glow',
    name: 'Glass Skin Glow',
    tagline: 'Resurface outside, glow inside',
    items: [
      { label: 'Chemical Peel', slug: 'chemical-peel', price: 1800 },
      { label: 'Glutathione IV Drip', slug: 'glutathione-iv-drip', price: 1800 },
    ],
    price: 1499, value: 3600,
    bestFor: 'Dullness, uneven tone',
  },
  {
    slug: 'clear-and-even',
    name: 'Clear & Even',
    tagline: 'Pigment care, inside and out',
    items: [
      { label: 'Melasma Treatment', slug: 'melasma-treatment', price: 4500 },
      { label: 'Glutathione IV Drip', slug: 'glutathione-iv-drip', price: 1800 },
    ],
    price: 1799, value: 6300,
    bestFor: 'Melasma, dark patches',
  },
  {
    slug: 'lift-and-resurface',
    name: 'Lift & Resurface',
    tagline: 'Lift first, then laser renewal',
    items: [
      { label: 'HIFU', slug: 'hifu', price: 11999 },
      { label: 'CO₂ Fractional Laser', slug: 'co2-fractional-laser', price: 6500 },
    ],
    price: 3499, value: 18499,
    bestFor: 'Acne scars, pores, loose skin',
  },
  {
    slug: 'v-line-sculpt',
    name: 'V-Line Sculpt',
    tagline: 'Lift and tighten the jawline',
    items: [
      { label: 'HIFU', slug: 'hifu', price: 11999 },
      { label: 'Exilis', slug: 'exilis', price: 5500 },
    ],
    price: 2999, value: 17499,
    bestFor: 'Jowls, double chin',
  },
  {
    slug: 'barbie-body',
    name: 'Barbie Body',
    tagline: 'Slimmer arms, smoother middle',
    items: [
      { label: 'Barbie Slimming Arms', slug: 'barbie-slimming-arms', price: 4999 },
      { label: 'Exilis · tummy or love handles', slug: 'exilis', price: 5500 },
    ],
    price: 2499, value: 10499,
    bestFor: 'Upper arms, love handles',
  },
  {
    slug: 'glow-and-tone',
    name: 'Glow & Tone',
    tagline: 'The easy first visit',
    items: [
      { label: 'Glutathione IV Drip', slug: 'glutathione-iv-drip', price: 1800 },
      { label: 'Radio Frequency (RF)', slug: 'radio-frequency', price: 1500 },
    ],
    price: 1299, value: 3300,
    bestFor: 'Dull skin, soft contours',
  },
  {
    slug: 'the-better-face-signature',
    name: 'The Better Face Signature',
    tagline: 'Signature 4-in-1 experience',
    items: [
      { label: 'HIFU', slug: 'hifu', price: 11999 },
      { label: 'Exilis', slug: 'exilis', price: 5500 },
      { label: 'Glutathione IV Drip', slug: 'glutathione-iv-drip', price: 1800 },
      { label: 'Hyaluronic Skin Booster', price: 6500 },
    ],
    price: 4999, value: 25799,
    bestFor: 'Special occasions · book 4+ weeks ahead',
  },
];

/** Combos that include a given treatment, in menu order. */
export const combosFor = (treatmentSlug: string): Combo[] =>
  combos.filter((c) => c.items.some((i) => i.slug === treatmentSlug));
