// ============================================================================
// AD LANDING PAGES
// One object here = one landing page at /lp/<slug>/. Duplicate an entry, change
// the copy, ship a new page. No developer needed after launch.
//
// All /lp/ pages are noindex and disallowed in robots.txt — they must never
// compete with the SEO treatment pages for the same keyword.
//
// ON URGENCY: the brief asked for "limited slots or dates". Guidelines p.7 and
// p.33 forbid manufactured scarcity. The compromise used here is `availability`
// — a factual statement the clinic must be able to evidence (real consultation
// capacity, a real cohort size, a real end date). Leave it empty rather than
// invent one. An untrue scarcity line is also a PH DTI advertising risk.
// ============================================================================

export interface Campaign {
  slug: string;
  /** Match this to the ad copy — message match is the single biggest driver of LP conversion. */
  headline: string;
  subhead: string;
  title: string;
  metaDescription: string;
  image: string;
  /** Treatment slugs this campaign sells. Populates the form dropdown. */
  treatments: string[];
  /** Plain-language names for the form dropdown. */
  treatmentLabels: string[];
  bullets: { t: string; d: string }[];
  priceLine: string;
  /** Factual, evidenced, or empty. See note above. */
  availability: string;
  faqs: { q: string; a: string }[];
  waMessage: string;
}

export const campaigns: Campaign[] = [
  {
    slug: 'pigmentation',
    headline: 'Pigmentation that has not shifted with creams.',
    subhead:
      'A consultation with a qualified clinician, a patch test, and an honest answer about what laser can and cannot do for your skin.',
    title: 'Pigmentation Treatment Consultation | The Better Face',
    metaDescription:
      'Book a pigmentation consultation at The Better Face. Assessment, patch test and a written plan from a qualified clinician.',
    image: '/img/f-skin.jpg',
    treatments: ['melasma-treatment', 'chemical-peel', 'co2-fractional-laser'],
    treatmentLabels: ['Non-Invasive Melasma Treatment', 'Chemical Peel', 'CO₂ Fractional Laser'],
    bullets: [
      { t: 'Assessed, not guessed', d: 'We look at the type of pigmentation you actually have. Melasma and sun damage are not the same problem and do not take the same treatment.' },
      { t: 'Patch tested first', d: 'Every laser course starts with a test patch. On deeper skin tones this is not optional.' },
      { t: 'Written plan and price', d: 'You leave the consultation knowing the number of sessions and the total cost. Nothing is added later.' },
      { t: 'We will tell you no', d: 'If your pigmentation will not clear, we say so at the consultation rather than after four sessions.' },
    ],
    priceLine: 'Consultation ₱1,000 — credited against your first treatment. Treatment pricing quoted at consultation.',
    availability: '',
    faqs: [
      { q: 'How many sessions will I need?', a: 'Most pigmentation courses run three to six sessions, four weeks apart. Your clinician will give you a number at consultation based on what they see, not an average.' },
      { q: 'Is it safe on brown skin?', a: 'Pico is generally the safer choice on deeper skin tones because it puts less heat into the tissue. It still requires a patch test and a clinician who has treated your skin type before.' },
      { q: 'Will it come back?', a: 'It can, and with melasma it usually does without maintenance. Daily SPF 50 is the difference between a result that holds and one that does not.' },
    ],
    waMessage: "Hi The Better Face, I saw your pigmentation page and I'd like to book a consultation.",
  },
  {
    slug: 'skin-tightening',
    headline: 'Lift and firmness, without surgery.',
    subhead:
      'HIFU reaches the same support layer a surgeon works on. A consultation tells you whether it will work on your face — or whether it will not.',
    title: 'Non-Surgical Skin Tightening Consultation | The Better Face',
    metaDescription:
      'HIFU skin tightening consultation at The Better Face. Honest assessment of whether non-surgical lift suits your degree of laxity.',
    image: '/img/f-care.jpg',
    treatments: ['hifu', 'exilis'],
    treatmentLabels: ['HIFU Skin Tightening', 'Exilis Treatment'],
    bullets: [
      { t: 'One session, reviewed at three months', d: 'HIFU works through collagen remodelling, so the result builds slowly. We review at twelve weeks, not twelve days.' },
      { t: 'Delivered by a clinician', d: 'Depth and energy settings are a clinical decision. Ours are made by a licensed practitioner, every time.' },
      { t: 'Honest about the ceiling', d: 'Significant laxity gets a better result from surgery. If that is you, we will say so and refer you.' },
      { t: 'No downtime', d: 'Mild tenderness for a few days. You can go back to work the same afternoon.' },
    ],
    priceLine: 'Consultation ₱1,000 — credited against treatment. HIFU and Exilis quoted by area at consultation.',
    availability: '',
    faqs: [
      { q: 'Does it hurt?', a: 'You will feel heat and a deep prickling as the energy is delivered. Most people describe it as uncomfortable rather than painful, and it stops the moment the session ends.' },
      { q: 'When will I see a result?', a: 'Some tightening is visible in the first few weeks, but the real change appears between eight and twelve weeks as new collagen forms.' },
      { q: 'How long does it last?', a: 'Typically twelve to eighteen months. It slows ageing rather than reversing it, and it does not stop it.' },
    ],
    waMessage: "Hi The Better Face, I saw your skin tightening page and I'd like to book a consultation.",
  },
];
