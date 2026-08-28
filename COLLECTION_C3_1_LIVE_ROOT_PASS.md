# RELATIONAL KEY — C3.1 LIVE ROOT PASS

Date: 2026-08-25
Branch: `collection/consolidation-gate-1`
PR: #20 — Draft / DO NOT MERGE

## Vercel project

Project ID: `prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`
Actual project name: `relational-key-collectionrelational-key-collection`
Repository: `Faadil1/relational-key-three-poc`

## Consolidation preview

Deployment ID: `dpl_EDB2pc91vwmk1n1DnSs52hQD5gjJ`
Deployment URL: `https://relational-key-collectionrelational-key-collection-4834ctm8z.vercel.app`
Branch shown by Vercel: `collection/consolidation-gate-1`
Vercel state: `READY`
Visible source checkpoint at deployment creation: `7dd9d82…`

## Root verification

Direct authenticated Vercel fetch returned:
- HTTP 200;
- title `RELATIONAL KEY — Collection`;
- hero thesis `The pair is the product.`;
- continental balance `4 / 3 / 2 / 2 / 2 / 2`;
- `Relational atlas`;
- collection shell script fetching `/collection/families.json`;
- deployment injection identifies `dpl_EDB2pc91vwmk1n1DnSs52hQD5gjJ`.

Therefore:
# `C3.1 ROOT LIVE = PASS`

## Sub-route verification constraint

The Preview Deployment is protected by Vercel Authentication. Independent connector fetches to `/collection/families.json` and `/families/<slug>/` are redirected with HTTP 302 to Vercel SSO.

This is an access-control condition, not evidence of a route defect.

The source gate already verifies:
- registry contains 15 families / 0 candidates;
- all 15 direct route records exist;
- C2 snapshot files exist in the consolidation source tree;
- the C3 shell did not modify family snapshots.

However, do **not** label the live routes 15/15 HTTP PASS until they are traversed from an authenticated browser session or otherwise directly observed.

## Next gate

# `C3.2 — COLLECTION USER WALKTHROUGH / LIVE ROUTE + VISUAL USABILITY GATE`

User walkthrough should:
1. open the collection root from the authenticated Vercel preview;
2. scroll through the atlas;
3. test at least one continent filter;
4. test one text search;
5. open family cards across the collection, including the six shared-runtime launchers;
6. confirm launchers initialize CITY / SERVICE / SIGNAL / FRIDA / FOOD / TEXTILE as intended;
7. spot-check autonomous routes such as Zellige, Khipu, Kento, Ombak, Swell, Stereoscopy, Siku, Hika Ahi and Boulle;
8. return to the collection shell and assess whether the collection reads as one product rather than fifteen unrelated demos.

Global Refinement remains CLOSED until this gate is reviewed.

`ROOT LIVE PASS ≠ LIVE ROUTE PASS ≠ COLLECTION VISUAL PASS ≠ GLOBAL REFINEMENT`.
