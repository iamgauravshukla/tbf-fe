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
    slug: 'head-to-face-reset',
    name: 'Head-to-Face Reset',
    tagline: 'Scalp detox, regrowth, then a glow',
    items: [
      { label: 'Scalp Detox for Dandruff', slug: 'scalp-anti-dandruff', price: 12000 },
      { label: 'Needle-free Exosome', slug: 'hair-regrowth-exosomes', price: 20000 },
      { label: 'Hydra Glow Facial', slug: 'hydra-glow-facial', price: 12000 },
    ],
    price: 1999, value: 44000,
    bestFor: 'Dandruff, thinning hair, tired skin',
  },
  {
    slug: 'hair-regrowth-power-trio',
    name: 'Hair Regrowth Power Trio',
    tagline: 'Clean scalp, PRP roots, exosome boost',
    items: [
      { label: 'Scalp Detox for Dandruff', slug: 'scalp-anti-dandruff', price: 12000 },
      { label: 'PRP · Scalp', slug: 'prp', price: 22000 },
      { label: 'Needle-free Exosome', slug: 'hair-regrowth-exosomes', price: 20000 },
    ],
    price: 2499, value: 54000,
    bestFor: 'Hair fall, thinning, dandruff',
  },
  {
    slug: 'lift-and-glow-trio',
    name: 'Lift & Glow Trio',
    tagline: '12D lift, hydra glow, RF firming',
    items: [
      { label: '12D HIFU · Jawline & V-line', slug: 'hifu', price: 14000 },
      { label: 'Hydra Glow Facial', slug: 'hydra-glow-facial', price: 12000 },
      { label: 'Radio Frequency (RF) · face', slug: 'radio-frequency', price: 6000 },
    ],
    price: 2499, value: 32000,
    bestFor: 'Jawline lift plus fresh, firm skin',
  },
  {
    slug: 'melasma-and-glow-trio',
    name: 'Melasma & Glow Trio',
    tagline: 'Pico for pigment, hydra, glow drip',
    items: [
      { label: 'Pico Laser · Melasma', slug: 'melasma-treatment', price: 18000 },
      { label: 'Hydra Glow Facial', slug: 'hydra-glow-facial', price: 12000 },
      { label: 'Glutathione IV Drip', slug: 'glutathione-iv-drip', price: 6500 },
    ],
    price: 1999, value: 36500,
    bestFor: 'Melasma, dark spots, dull skin',
  },
  {
    slug: 'acne-rescue-trio',
    name: 'Acne Rescue Trio',
    tagline: 'Clear breakouts, flatten pimples, hydrate',
    items: [
      { label: 'Acne Clear Facial', slug: 'acne-clear-facial', price: 4500 },
      { label: '3 × Pimple Injection', slug: 'pimple-injection', price: 2700 },
      { label: 'Hydra Glow Facial', slug: 'hydra-glow-facial', price: 12000 },
    ],
    price: 1499, value: 19200,
    bestFor: 'Active breakouts, clogged pores',
  },
  {
    slug: '12d-lift-and-resurface',
    name: '12D Lift & Resurface',
    tagline: '12D lift, then laser renewal',
    items: [
      { label: '12D HIFU · Jawline & V-line', slug: 'hifu', price: 14000 },
      { label: 'CO₂ Fractional Laser', slug: 'co2-fractional-laser', price: 25000 },
    ],
    price: 2999, value: 39000,
    bestFor: 'Acne scars, pores, loose skin',
  },
  {
    slug: 'arms-tummy-jaw-sculpt',
    name: 'Arms, Tummy & Jaw Sculpt',
    tagline: 'Three areas in one visit',
    items: [
      { label: 'Barbie Slimming Arms', slug: 'barbie-slimming-arms', price: 15000 },
      { label: 'Exilis · tummy', slug: 'exilis', price: 18000 },
      { label: '7D HIFU · Jawline & V-line', slug: 'hifu', price: 10000 },
    ],
    price: 2499, value: 43000,
    bestFor: 'Upper arms, tummy, soft jawline',
  },
  {
    slug: 'first-visit-glow-pass',
    name: 'First-Visit Glow Pass',
    tagline: 'Four treatments to try us out',
    items: [
      { label: 'Chemical Peel', slug: 'chemical-peel', price: 4000 },
      { label: 'Glutathione IV Drip', slug: 'glutathione-iv-drip', price: 6500 },
      { label: 'Radio Frequency (RF)', slug: 'radio-frequency', price: 6000 },
      { label: 'Pimple Injection', slug: 'pimple-injection', price: 900 },
    ],
    price: 1299, value: 17400,
    bestFor: 'First-timers, quick refresh',
  },
  {
    slug: 'the-better-face-signature',
    name: 'The Better Face Signature',
    tagline: 'Signature 4-in-1 experience',
    items: [
      { label: '12D HIFU · Full Face', slug: 'hifu', price: 20000 },
      { label: 'Hydra Glow Facial', slug: 'hydra-glow-facial', price: 12000 },
      { label: 'Glutathione IV Drip', slug: 'glutathione-iv-drip', price: 6500 },
      { label: 'Hyaluronic Skin Booster', price: 25000 },
    ],
    price: 5499, value: 63500,
    bestFor: 'Special occasions · book 4+ weeks ahead',
  },
];

/** Combos that include a given treatment, in menu order. */
export const combosFor = (treatmentSlug: string): Combo[] =>
  combos.filter((c) => c.items.some((i) => i.slug === treatmentSlug));
