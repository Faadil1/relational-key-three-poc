# RELATIONAL KEY — HANDOVER

Updated: 2026-08-28
Repository: `Faadil1/relational-key-three-poc`
Working branch: `collection/global-refinement-1`
Draft PR: **#21 — RELATIONAL KEY — Global Refinement Pass**
PR status: `DRAFT / DO NOT MERGE`

# RESUME HERE

# **B2.3I — MATE + BOMBILLA SOURCE + INTERACTION SPEC**

Do not resume G4 polish. Do not change validated counts for source-pass candidates.

# CANONICAL INVARIANT

# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

Immutable anchor:
`79ba99ec739dfffb40563e9a89edfdffe0fdd3d5`

# BALANCE GATE 2

Target:
`AFRICA 4 / ASIA 4 / NORTH AMERICA 4 / SOUTH AMERICA 4 / OCEANIA 4 / EUROPE 4`

Current validated:
`AFRICA 4 / ASIA 3 / NORTH AMERICA 2 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

# CURRENT SOURCE-PASS BUILDS

1. Astrolabe / Isfahan
   - `families/astrolabe-isfahan/candidate.html`
   - build `ade670ad03513d972180ef78d717f174f585ed6c`
   - fix `a756e58d0bead32b90ca1f6470e68592be0c3d00`
   - blob `2903d6a8023e3ba56168f3efc05994c91a7e49f6`

2. Janney / Virginia
   - `families/coupler-virginia/candidate.html`
   - build `fa561bf4ebb20becaaee81856dc59f81b1e8b4c6`
   - blob `c054bdb50f8d5beafcbdbf48d66cd0cdadfc2cdc`

3. Metate / Teotitlán del Valle
   - `families/metate-teotitlan/candidate.html`
   - build `f62e6c2d2371205bdae4f498fe2f7670e17f09bd`
   - blob `8252beecb7ac6e7c1146cdb092813c2d5cb8a880`
   - direct thresholded reciprocal work / MAIZE+CACAO / JS PASS

4. Valparaíso Funicular / Chile
   - spec `CONTINENTAL_BALANCE_B2_3G_SOUTH_AMERICA_VALPARAISO_FUNicular_SPEC.md`
   - build register `CONTINENTAL_BALANCE_B2_3H_SOUTH_AMERICA_VALPARAISO_BUILD_CANDIDATE.md`
   - `families/funicular-valparaiso/candidate.html`
   - law `ON A SHARED FUNICULAR, ONE CAR'S ASCENT IS COUNTERBALANCED BY THE OTHER'S DESCENT.`
   - spec `f06731fc0e001c09524e21fc81da8fe6697aa313`
   - build `7aff21b59ff88fcbe3e526958cf9fdf67c0d3750`
   - blob `1e71497d7f9f5411eca2347b36bc0402db8b905b`
   - build register commit `2c928f57f5a22208ae078974ac9f5a500cb1f782`
   - direct A↔B inverse drag + keyboard + swap/reset + JS PASS

All status:
`SOURCE PASS / LIVE + USER PENDING`.

No continental count changes.

# SOUTH AMERICA SLOT 2 — MATE + BOMBILLA

Promotion source:
`CONTINENTAL_BALANCE_B2_2F_SOUTH_AMERICA_PROMOTION_MATRIX.md`

Working identity:
- context anchor `Argentina`, broader South American mate context acknowledged;
- edition `Filter Register`;
- memory `Flow / Infusion Memory`;
- topology `R7 selective passage / containment`.

Candidate law:
# **A FILTERING STRAW TURNS A PARTICULATE INFUSION INTO SELECTIVE FLOW.**

Authoritative evidence already verified:

Argentina cultural heritage inventory:
https://www.argentina.gob.ar/cultura/manifestaciones-del-patrimonio-cultural-inmaterial/entre-rios/mate
- describes yerba mate placed in a vessel;
- hot water poured in;
- beverage taken through a bombilla;
- practice may be individual/shared and has broader social meaning.

British Museum:
https://www.britishmuseum.org/collection/term/x7826
- classifies bombilla explicitly as `mate-strainer`.

Smithsonian NMAI:
https://www.si.edu/object/mate-strawbombilla%3ANMAI_207196
- documented South American bombilla object evidence.

# B2.3I SPEC REQUIREMENTS

## Pair

Card A:
`MATE VESSEL / INFUSION FIELD`

Owns:
- vessel;
- yerba/particulate field;
- represented liquid level.

Card B:
`BOMBILLA / FILTERING STRAW`

Owns:
- filtering end;
- tube / flow path;
- insertion depth/position.

Center:
- relation/insertion guidance only;
- never a mouth, person, cup of finished drink or separate filter dashboard.

## Interaction

Preferred sequence:
`MATE ≠ BOMBILLA → INSERT → FILTER SUBMERGED → DRAW → LIQUID PASSES / YERBA REMAINS → RELEASE → CONTINUE`

Important:
- insertion establishes the functional relation;
- user must apply a restrained DRAW action after insertion;
- flow visualization should stay inside Card B / tube and source vessel;
- particulate yerba stays inside Card A;
- no human mouth/body depiction is necessary;
- no claim of accurate fluid dynamics.

Potential direct control:
- drag bombilla into vessel or use INSERT control if direct spatial move is cleaner;
- DRAW can be press-and-hold, drag along tube, or restrained slider;
- must not become a one-click particle animation.

## Alternate-valid semantics

No fake wrong mate state required.

Potential valid contexts only if source-grounded:
- different vessel/yerba fill presentation;
- shared vs individual contextual label should NOT alter filter mechanics.

Safer first build:
- one documented particulate infusion context;
- no mismatch;
- RESET separates Bombilla and restores flow state.

## Truth boundary

Must say:
- interaction translates only the vessel↔bombilla filtering subsystem;
- does not represent the full social/ritual practice;
- does not claim mate as exclusively Argentine;
- does not simulate drinking physiology or accurate hydraulic resistance.

## Anti-overlap

Not Metate:
- selective passage/filtration rather than abrasion.

Not Toyama:
- no edible reveal/transformation.

Not Janney:
- no latch.

Not Valparaíso:
- no linked inverse motion.

# NEXT AFTER SPEC

Create dedicated register:
`CONTINENTAL_BALANCE_B2_3I_SOUTH_AMERICA_MATE_BOMBILLA_SPEC.md`

Immediately update CURRENT_STATE + HANDOVER.

Then:
# `B2.3J — MATE + BOMBILLA AUTONOMOUS BUILD CANDIDATE + SOURCE GATE`

Candidate path target:
`families/mate-bombilla-argentina/candidate.html`

# INFRASTRUCTURE

Recent Vercel Hobby blocker:
`Deployment rate limited — retry in 24 hours.`

No invented live pass.

# PERSISTENCE — MANDATORY

Dedicated register → CURRENT_STATE → HANDOVER after every meaningful milestone; exact IDs; explicit SOURCE/LIVE/USER/VALIDATED status; exactly one next output.
