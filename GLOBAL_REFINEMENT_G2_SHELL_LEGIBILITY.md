# RELATIONAL KEY — GLOBAL REFINEMENT G2

## SHELL LEGIBILITY

Date: 2026-08-26
Branch: `collection/global-refinement-1`
PR: #21 — Global Refinement Pass

## Status

# `IMPLEMENTED / SOURCE PASS / LIVE VISUAL REQUIRED`

Implementation commit:
`eaee31ec38dcc2f31c46cb630e28357b30357a90`

G1 visual closeout:
`GLOBAL_REFINEMENT_G1_2_USER_VISUAL_PASS.md`

## Scope

G2 is intentionally limited to the collection root shell (`index.html`).

No changes to:
- family wrappers;
- family routes;
- `collection/families.json`;
- shared `round13r` runtime;
- autonomous `snapshot.html` files;
- family mechanisms or interaction timing.

Compare gate from G1 visual checkpoint to G2 implementation:
- 1 file modified: `index.html`;
- 37 lines added;
- 0 deletions.

## Legibility changes

- top-center collection metadata: 6 px → 7.5 px;
- top-right metadata: 6 px → 7 px;
- collection eyebrow: 7 px → 8 px;
- pair proof labels: 6 px → 7 px;
- balance labels/counts: 6 px → 7.5 px;
- explanatory section copy: 12 px → 13 px;
- search control: 43 px / 7 px → 46 px / 8 px;
- filter chips: 38 px / 6 px → 42 px / 7.5 px;
- shell status metadata: 6 px → 7 px;
- family index/continent labels: 6 px → 7 px;
- place label: 6 px → 7.5 px;
- mechanism copy: 12 px → 13 px;
- family memory/open labels: 6 px → 7 px;
- footer metadata: 6 px → 7 px;
- muted-text contrast lifted slightly without changing the palette system;
- keyboard focus-visible outlines added for family cards, chips and search.

## Mobile-specific refinement

Below 680 px:
- search height 48 px;
- chips height 44 px;
- chip text 8 px;
- pair-proof row may wrap instead of overflow;
- family cards gain slightly more vertical room;
- place + memory/open metadata increase again for narrow screens;
- status row handles two-sided metadata without collision.

## Invariant

# `LEGIBILITY ↑ ≠ FAMILY MECHANISM CHANGE`

The collection shell becomes easier to read while the validated relational mechanisms remain byte-stable beneath it.

## Required live gate

Verify on the current Global Refinement Preview:
1. hero hierarchy remains intact;
2. Continental Balance is more readable but still secondary;
3. search + chips remain compact and functional;
4. card metadata becomes readable without making the atlas feel heavy;
5. no 3-column desktop grid collapse;
6. narrow/mobile shell remains usable;
7. opening a family still routes through G1 unchanged.

Only then may G2 become `PASS` and G3 begin.
