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
      { label: 'Scalp Anti-Dandruff', slug: 'scalp-anti-dandruff', price: 12000 },
      { label: 'PRP', slug: 'prp', price: 22000 },
    ],
    price: 2499, value: 34000,
    bestFor: 'Dandruff with early hair fall',
  },
  {
    slug: 'needle-free-hair-starter',
    name: 'Needle-Free Hair Starter',
    tagline: 'Detox, then nourish · no needles',
    items: [
      { label: 'Scalp Anti-Dandruff', slug: 'scalp-anti-dandruff', price: 12000 },
      { label: 'Needle-Free Exosome Scalp', slug: 'hair-regrowth-exosomes', price: 20000 },
    ],
    price: 1799, value: 32000,
    bestFor: 'Thinning hair, needle-shy clients',
  },
  {
    slug: 'glass-skin-glow',
    name: 'Glass Skin Glow',
    tagline: 'Resurface outside, glow inside',
    items: [
      { label: 'Chemical Peel', slug: 'chemical-peel', price: 4000 },
      { label: 'Glutathione IV Drip', slug: 'glutathione-iv-drip', price: 6500 },
    ],
    price: 1499, value: 10500,
    bestFor: 'Dullness, uneven tone',
  },
  {
    slug: 'clear-and-even',
    name: 'Clear & Even',
    tagline: 'Pigment care, inside and out',
    items: [
      { label: 'Melasma Treatment', slug: 'melasma-treatment', price: 18000 },
      { label: 'Glutathione IV Drip', slug: 'glutathione-iv-drip', price: 6500 },
    ],
    price: 1799, value: 24500,
    bestFor: 'Melasma, dark patches',
  },
  {
    slug: 'lift-and-resurface',
    name: 'Lift & Resurface',
    tagline: 'Lift first, then laser renewal',
    items: [
      { label: 'HIFU', slug: 'hifu', price: 35000 },
      { label: 'CO₂ Fractional Laser', slug: 'co2-fractional-laser', price: 25000 },
    ],
    price: 3499, value: 60000,
    bestFor: 'Acne scars, pores, loose skin',
  },
  {
    slug: 'v-line-sculpt',
    name: 'V-Line Sculpt',
    tagline: 'Lift and tighten the jawline',
    items: [
      { label: 'HIFU', slug: 'hifu', price: 35000 },
      { label: 'Exilis', slug: 'exilis', price: 18000 },
    ],
    price: 2999, value: 53000,
    bestFor: 'Jowls, double chin',
  },
  {
    slug: 'barbie-body',
    name: 'Barbie Body',
    tagline: 'Slimmer arms, smoother middle',
    items: [
      { label: 'Barbie Slimming Arms', slug: 'barbie-slimming-arms', price: 15000 },
      { label: 'Exilis · tummy or love handles', slug: 'exilis', price: 18000 },
    ],
    price: 2499, value: 33000,
    bestFor: 'Upper arms, love handles',
  },
  {
    slug: 'glow-and-tone',
    name: 'Glow & Tone',
    tagline: 'The easy first visit',
    items: [
      { label: 'Glutathione IV Drip', slug: 'glutathione-iv-drip', price: 6500 },
      { label: 'Radio Frequency (RF)', slug: 'radio-frequency', price: 6000 },
    ],
    price: 1299, value: 12500,
    bestFor: 'Dull skin, soft contours',
  },
  {
    slug: 'the-better-face-signature',
    name: 'The Better Face Signature',
    tagline: 'Signature 4-in-1 experience',
    items: [
      { label: 'HIFU', slug: 'hifu', price: 35000 },
      { label: 'Exilis', slug: 'exilis', price: 18000 },
      { label: 'Glutathione IV Drip', slug: 'glutathione-iv-drip', price: 6500 },
      { label: 'Hyaluronic Skin Booster', price: 25000 },
    ],
    price: 4999, value: 84500,
    bestFor: 'Special occasions · book 4+ weeks ahead',
  },
];

/** Combos that include a given treatment, in menu order. */
export const combosFor = (treatmentSlug: string): Combo[] =>
  combos.filter((c) => c.items.some((i) => i.slug === treatmentSlug));
