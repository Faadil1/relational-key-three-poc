# RELATIONAL KEY — B2.4D-R1A SWISS MUSIC BOX DIRECT-DRAG UX PATCH

Date: 2026-08-29
Repository: `Faadil1/relational-key-three-poc`
Branch: `collection/global-refinement-1`
Draft PR: #21 — `DRAFT / DO NOT MERGE`

# PRODUCT INVARIANT

**THE RELATIONAL PAIR REMAINS THE PRODUCT.**

Audit model:
`PAIR MEMBER → RELATION → OTHER MEMBER RESPONSE`

For Swiss Cylinder Music Box:
`PINNED CYLINDER → PIN/TOOTH CONTACT → TUNED COMB RESPONSE`

No substitute rotation button was introduced. The cylinder itself remains the direct manipulated pair member.

# INPUT USER FINDING

The B2.4D-R1 manual-rotation micro-retest could not be completed reliably because direct manipulation of the cylinder remained effectively at its principal `+000°` state for the user.

This is classified as an interaction reliability problem, not as missing conceptual behavior.

# SOURCE DIAGNOSIS

The deployed candidate already contained the intended causal logic:

- `pointerdown` on `cylinderWrap`;
- horizontal delta mapped to cylinder angle at approximately `1.15° / px`;
- pattern A first crossing at `+18°`;
- crossing triggers `PIN → TOOTH`, comb-tooth flash, event trace, decoded-event counter and optional synthetic tone.

However, drag continuity depended on pointer capture owned by the cylinder wrapper. This was too fragile for an independent USER gate.

# UX PATCH APPLIED

Patched file:
`families/music-box-sainte-croix/candidate.html`

Patch commit:
`1054722fa8d72a092c61ffd41eabacae30c9cd07`

Changes:

1. direct pointer start remains on the cylinder wrapper;
2. pointer movement/up/cancel are now tracked on `window` during the active drag;
3. the implementation no longer relies on `setPointerCapture` for drag continuity;
4. `preventDefault()` is applied during direct drag;
5. cylinder interaction layer is raised with explicit z-index;
6. text selection is disabled on the drag surface;
7. immediate feedback now shows `DIRECT INPUT · CYLINDER DRAG ACTIVE`;
8. if the user releases before a pin crossing, the interface explicitly requests a farther drag;
9. keyboard ArrowLeft/ArrowRight support remains as accessibility/fallback evidence but does not replace the required direct-cylinder USER proof.

# LIVE STATUS

GitHub commit status:
`Vercel — success`

Live deployment is therefore technically available from the canonical Collection project.

This LIVE success proves deployment only. It does not prove direct-user interaction.

# VALIDATION STATE

SOURCE PATCH: **PASS**
LIVE DEPLOYMENT: **PASS**
USER DIRECT-DRAG RETEST: **PENDING**
VALIDATED FAMILY: **NO CHANGE**

Continental distribution remains:

`AFRICA 4 / ASIA 4 / NORTH AMERICA 4 / SOUTH AMERICA 4 / OCEANIA 4 / EUROPE 3`

Swiss Cylinder Music Box remains the sole pending Balance-Gate family.

# NEXT EXACT OUTPUT

## **B2.4D-R1B — SWISS MUSIC BOX DIRECT-DRAG USER MICRO-RETEST**

Required USER evidence only:

1. open Swiss Cylinder Music Box;
2. press `ENGAGE CYLINDER + COMB`;
3. show `ENGAGED · NO AUTOPLAY`;
4. press/hold directly on the large gold cylinder in Card A;
5. drag horizontally far enough for the angle to leave `+000°`;
6. show at least one `DECODED EVENT` and/or visible comb-tooth reaction caused by that drag.

Recommended drag: approximately 60–100 px to cross multiple pins visibly.

No need to repeat `OTHER CYLINDER`.

If this USER retest passes:

- Swiss Cylinder Music Box → `PASS / VALIDATED`;
- Europe `3/4 → 4/4`;
- all six continents reach `4/4`;
- next gate becomes `B2.5 — 24-FAMILY COLLECTION REGRESSION`.

Do not resume G4 before B2.5 closes.
