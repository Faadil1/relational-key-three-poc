# RELATIONAL KEY — HANDOVER

Updated: 2026-08-29
Repository: `Faadil1/relational-key-three-poc`
Working branch: `collection/global-refinement-1`
Draft PR: **#21 — RELATIONAL KEY — Global Refinement Pass**
PR status: `DRAFT / DO NOT MERGE`

# RESUME HERE

# **B2.4D-R1B — SWISS MUSIC BOX DIRECT-DRAG USER MICRO-RETEST**

Canonical invariant:
# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

Signature reference:
`RELATIONAL KEY — Three.js Signature POC`
`https://relational-key-collectionrelational.vercel.app/`

Primary validation chain:
`PAIR MEMBER → RELATION → OTHER MEMBER RESPONSE`

Swiss chain:
`PINNED CYLINDER → PIN/TOOTH CONTACT → TUNED COMB RESPONSE`

Buttons, center/gap, status panels and helper animations cannot replace direct pair-member proof.

Immutable anchor: `79ba99ec739dfffb40563e9a89edfdffe0fdd3d5`.
G4 remains PARKED.

# CURRENT VALIDATED DISTRIBUTION

Target:
`AFRICA 4 / ASIA 4 / NORTH AMERICA 4 / SOUTH AMERICA 4 / OCEANIA 4 / EUROPE 4`

Current:
# `AFRICA 4 / ASIA 4 / NORTH AMERICA 4 / SOUTH AMERICA 4 / OCEANIA 4 / EUROPE 3`

Only Swiss Cylinder Music Box remains unvalidated among the nine Balance-Gate candidates.

# CLOSED GATES

## Group A — PASS
Astrolabe / Janney / Metate.
Register: `CONTINENTAL_BALANCE_B2_4B_USER_WALKTHROUGH_GROUP_A_PASS.md`
commit `545d3e4e829e5773e8773eb4bddcd9b81690dd93`.

## Group B — PASS
Mate + Bombilla / Tongiaki validated in R1; Valparaíso validated in R2.
R1 register: `CONTINENTAL_BALANCE_B2_4C_R1_GROUP_B_PARTIAL_PASS_VALPARAISO_MICRO_RETEST.md`, commit `f6f585dcd220acc4233fcdc251ebec5675c572d4`.
R2 register: `CONTINENTAL_BALANCE_B2_4C_R2_VALPARAISO_CAR_A_MICRO_RETEST_PASS.md`, commit `2ed80cb0dff8ac4d072b694089b77c93a4179bb0`.

## Group C — PARTIAL PASS
Register: `CONTINENTAL_BALANCE_B2_4D_GROUP_C_PARTIAL_PASS_MUSIC_BOX_MICRO_RETEST.md`
commit `304825cda9a7fd5a697797945326d3cea5c3a9b8`.

Validated:
- Garamut — PASS → Oceania `4/4`.
- Catoptric Anamorphosis — PASS → Europe `3/4`.

Swiss Music Box remained pending because the user recording proved `ENGAGED · NO AUTOPLAY` and `OTHER CYLINDER`, but not a direct cylinder rotation away from `+000°` producing a decoded pin→tooth event.

# B2.4D-R1A — DIRECT-DRAG UX PATCH

User independently reported that the cylinder could not be made to change reliably and stayed at its principal state.

This triggered the pre-declared UX PATCH route rather than a forced validation.

Register:
`CONTINENTAL_BALANCE_B2_4D_R1A_SWISS_MUSIC_BOX_DIRECT_DRAG_UX_PATCH.md`
register commit `206d99f4f6c3c687d155e79c43f89a7301ffab37`

Patched file:
`families/music-box-sainte-croix/candidate.html`
patch commit `1054722fa8d72a092c61ffd41eabacae30c9cd07`

Patch characteristics:
- direct pointer start remains on the actual cylinder;
- no substitute rotation button was added;
- active pointer movement/up/cancel are tracked on `window`;
- dependency on `setPointerCapture` was removed;
- drag surface has explicit z-index, `touch-action:none`, `user-select:none` and `preventDefault()` behavior;
- immediate feedback displays `DIRECT INPUT · CYLINDER DRAG ACTIVE`;
- if released before a pin crossing, the interface requests a farther drag;
- keyboard arrow support remains fallback/accessibility only.

Technical state:
- SOURCE PATCH: **PASS**
- LIVE DEPLOYMENT: **PASS**
- GitHub commit status for `1054722f…`: `Vercel — success`
- USER RETEST: **PENDING**
- VALIDATED COUNT: **NO CHANGE**

Canonical Collection URL:
`https://relational-key-collectionrelational-key-collection-1wq2g2b7e.vercel.app`

Direct Swiss route:
`https://relational-key-collectionrelational-key-collection-1wq2g2b7e.vercel.app/families/music-box-sainte-croix/candidate.html`

# NEXT EXACT OUTPUT

# **B2.4D-R1B — SWISS MUSIC BOX DIRECT-DRAG USER MICRO-RETEST**

Required only:
1. open the direct Swiss route;
2. press `ENGAGE CYLINDER + COMB`;
3. pause briefly on `ENGAGED · NO AUTOPLAY`;
4. press/hold directly on the large gold cylinder in Card A;
5. drag horizontally approximately 60–100 px;
6. angle must visibly leave `+000°`;
7. show at least one `DECODED EVENT` and/or visible comb-tooth response caused by that drag.

No need to repeat `OTHER CYLINDER`.
Audio is supportive only.
A ~5–12 second recording is sufficient.

After USER PASS:
- Swiss Cylinder Music Box → PASS / VALIDATED;
- Europe `3/4 → 4/4`;
- all six continents reach `4/4`;
- next exact gate becomes `B2.5 — 24-FAMILY COLLECTION REGRESSION`.

Do not resume G4 until B2.5 closes.

Persistence protocol: dedicated register → CURRENT_STATE → HANDOVER → exact IDs → SOURCE/LIVE/USER/VALIDATED separated → exactly one next output.
