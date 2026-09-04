# RELATIONAL KEY — CONTINENTAL BALANCE B2.3B

Date: 2026-08-28
Branch: `collection/global-refinement-1`
PR: #21 — `DRAFT / DO NOT MERGE`
Parent spec: `CONTINENTAL_BALANCE_B2_3A_ASIA_PERSIAN_ASTROLABE_SPEC.md`

# PERSIAN ASTROLABE BUILD CANDIDATE

## Status

# `SOURCE PASS / LIVE + USER VISUAL GATE PENDING`

This candidate is not yet a validated family and Asia remains at **3 validated families** until independent live/visual gates pass.

## Candidate

Path:
`families/astrolabe-isfahan/candidate.html`

Initial implementation commit:
`ade670ad03513d972180ef78d717f174f585ed6c`

Signed-angle formatting fix:
`a756e58d0bead32b90ca1f6470e68592be0c3d00`

Current candidate blob:
`2903d6a8023e3ba56168f3efc05994c91a7e49f6`

## Source-diff discipline

Initial build compare from frozen spec commit `505110cbae56e309d827ff2e9c9e8dd0bbc00f67`:
- one new file only: `families/astrolabe-isfahan/candidate.html`;
- no existing family, atlas, registry, wrapper or validated route changed.

Follow-up fix compare from `ade670ad…` to `a756e58d…`:
- same candidate file only;
- 1 addition / 1 deletion;
- presentation-only angle formatter correction.

## Verified candidate invariants

### Pair architecture
- Card A = `RETE / CELESTIAL MAP`;
- Card B = `LATITUDE PLATE / LOCAL HORIZON`;
- members remain visually bounded;
- center contains only shared-axis/pin framing and relation label;
- no third result card or standalone astrolabe medallion introduced.

### Interaction
- `PAIR RETE + PLATE` performs approach → shared-axis engagement;
- rete is rotatable directly by pointer drag;
- range slider provides accessible/fallback relative-angle control;
- latitude plate remains stationary;
- relative angle drives the structural relation reading.

### Alternate valid context
Controls:
- `LOCAL LATITUDE PLATE`;
- `OTHER LATITUDE PLATE`.

`OTHER` changes the horizon/curve context and remains explicitly valid rather than being treated as an error state.

### Truthfulness
Visible disclaimer:
`STRUCTURAL TRANSLATION · RETE ↔ LATITUDE-PLATE SUBSYSTEM · NOT AN ASTRONOMICAL CALCULATOR`

Visible source footer names:
- Smithsonian Persian planispheric astrolabe, Isfahan, ca. 1715;
- British Museum Persian/Safavid astrolabe, Iran, 1712;
- Oxford History of Science Museum mechanism documentation.

The prototype does not claim to reproduce the full historical instrument or exact astronomical calculations.

### Responsive intent
- desktop side-by-side pair;
- narrow layout stacks the two bounded cards and their owned circular subsystems;
- controls collapse to a one-column structure where needed.

Live narrow behavior remains to be visually validated.

## Bug fix gate

The first source version formatted negative angles incorrectly because the sign was embedded before zero-padding.

Fixed formatter:
`sign + abs(angle).padStart(3)`

Verified examples:
- `−005°`
- `+000°`
- `+042°`
- `−180°`

The formatter fix does not alter rotation geometry or state semantics.

## JS source check

A lightweight syntax check of the candidate interaction logic passed after the formatter correction.

## Family law retained

# **RELATIVE ROTATION BETWEEN STAR MAP AND HORIZON PRODUCES A CELESTIAL READING.**

Signature:
`RETE → APPROACH → PIN → ROTATE → HORIZON → READ → CONTINUE`

## What remains unverified

Do not infer PASS from source alone.

Required independent live/user evidence:
1. initial pair remains visibly two members;
2. approach/pin does not make the center the product;
3. direct rete drag feels rotational rather than like card movement;
4. slider and pointer rotation agree;
5. local → other latitude plate visibly changes context while remaining valid;
6. negative and positive angles render correctly;
7. narrow/mobile presentation remains usable;
8. visual language reads as a precision instrument, not generic sci-fi or decorative Persian styling.

## Deployment note

Vercel Hobby currently reports:
`Deployment rate limited — retry in 24 hours.`

Therefore no live preview is claimed by this register.

## Verdict

# `B2.3B SOURCE PASS`

Asia validated count remains:
# `3 / 4`

Candidate state:
# `PROMOTED BUILD CANDIDATE / NOT YET VALIDATED`

## Next live gate

# **B2.4A — ASIA ASTROLABE LIVE + USER VISUAL GATE**

When Vercel deployment capacity returns, create/identify a Preview containing `a756e58d…` or a later descendant and audit the candidate before atlas/registry promotion.

While infrastructure is blocked, source-first research may continue for North America's two open slots; this does not waive the Asia validation gate.
