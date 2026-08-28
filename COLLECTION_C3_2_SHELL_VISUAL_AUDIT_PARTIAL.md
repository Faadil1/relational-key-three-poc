# RELATIONAL KEY — C3.2 SHELL VISUAL AUDIT — PARTIAL

Date: 2026-08-25
Branch: `collection/consolidation-gate-1`
Deployment under review: `dpl_EDB2pc91vwmk1n1DnSs52hQD5gjJ`
Preview: `https://relational-key-collectionrelational-key-collection-4834ctm8z.vercel.app`
User capture: 10.6 s, 1912×966, 30 fps.

## Verdict

# `SHELL VISUAL PASS / FUNCTIONAL WALKTHROUGH REQUIRED`

This recording is sufficient to judge the collection shell's visual hierarchy and full-atlas presentation, but it does **not** exercise filters, search, or any family route.

Therefore:
- collection shell visual framing: `PASS`;
- atlas full-scroll visibility: `PASS`;
- continental balance presentation: `PASS`;
- 15-family catalog visibility: `PASS`;
- filter behavior: `UNVERIFIED`;
- search behavior: `UNVERIFIED`;
- six restored/shared route initialization: `UNVERIFIED`;
- nine autonomous family routes: `UNVERIFIED`;
- 15/15 live-route gate: `NOT YET CLAIMED`;
- collection navigation/usability gate: `INCOMPLETE`.

## What visually passes

1. **The collection reads as a single editorial system.**
   - The root is no longer experienced as a prototype selector.
   - `The pair is the product.` establishes one clear thesis above all families.
   - The warm black / ivory / brass system gives the collection a consistent frame without reskinning family-native mechanisms.

2. **Continental balance is immediately legible.**
   - The `4 / 3 / 2 / 2 / 2 / 2` distribution is visible beside the thesis rather than buried as metadata.
   - Geography is presented as collection structure, not as decorative cultural labeling.

3. **Relational Atlas hierarchy works at desktop scale.**
   - Search + continent lenses occupy one persistent control layer.
   - Family cards read in a stable three-column rhythm.
   - Place, family title, mechanism, memory class and route affordance remain visually separated.

4. **All fifteen family cards are visibly represented in the recorded scroll.**
   - The recording reaches the final row containing Siku, Hika Ahi and Boulle.
   - No obvious missing card, collapsed grid block or catastrophic layout break is visible in the captured desktop viewport.

5. **The abstract pair thumbnail strategy is coherent.**
   - It reinforces the product invariant `object A — relation — object B`.
   - It avoids reducing each culture to a generic decorative motif.

## Non-blocking visual polish observations

- Secondary mono labels, filter-chip labels and some card metadata are very small relative to the large editorial typography at 1912×966.
- The repeated abstract pair thumbnails make the atlas coherent, but also intentionally flatten visual distinction at the shell level; this is acceptable for C3 because family-native identity is preserved inside each route. Revisit only during Global Refinement.
- The shell currently proves collection coherence better than family individuality. This is not a C3 blocker, but it should be part of the future refinement brief.

## Missing evidence from this recording

The user did not:
- activate a continent filter;
- type/clear a text search;
- open Gatineau, Benin, Nigeria, Frida/Coyoacán, Toyama or Bonwire;
- open Zellige, Khipu, Kento, Ombak, Swell, Stereoscopy, Siku, Hika Ahi or Boulle;
- demonstrate return navigation from a family route back to the collection.

Because the preview is protected by Vercel Authentication and connector requests to sub-routes redirect to SSO, this missing evidence cannot be replaced by stateless automated fetches.

## Required next gate

# `C3.2B — FUNCTIONAL ROUTE WALKTHROUGH`

Record one interaction-focused walkthrough:
1. activate any continent filter and return to `All`;
2. search for one known family/mechanism and clear the query;
3. open the six restored/shared families and confirm intended initialization:
   - Gatineau / CITY;
   - Benin / SERVICE;
   - Nigeria / SIGNAL;
   - Frida / FRIDA;
   - Toyama / FOOD;
   - Bonwire / TEXTILE;
4. spot-check the nine autonomous routes;
5. show at least one return path to the collection.

No need to replay the family-native interactions themselves; those already have independent validation gates.

`SHELL VISUAL PASS ≠ LIVE ROUTE PASS ≠ COLLECTION USABILITY PASS ≠ GLOBAL REFINEMENT`.
