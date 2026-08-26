# RELATIONAL KEY — ÉTAT CANONIQUE COURANT

Date: 2026-08-26
Repository: `Faadil1/relational-key-three-poc`
Canonical working branch: `collection/global-refinement-1`
Global Refinement PR: **#21 — RELATIONAL KEY — Global Refinement Pass**
PR status: `DRAFT / DO NOT MERGE`
Latest verified milestone: `GLOBAL_REFINEMENT_G1_1_LIVE_TECHNICAL_PASS.md`

## Product invariant

# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

## Continental Balance Gate 1
Status: `CLOSED`
Distribution:
# `AFRICA 4 / ASIA 3 / NORTH AMERICA 2 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

Family expansion remains paused during Global Refinement.

## Consolidation baseline — MERGED / IMMUTABLE

PR #20 — `RELATIONAL KEY — Collection Consolidation Gate`
Status: `MERGED`
Merge method: `SQUASH`
Pre-refinement regression anchor:
# `79ba99ec739dfffb40563e9a89edfdffe0fdd3d5`

Validated at that anchor:
- 15 / 15 independent family user gates;
- 15 / 15 consolidated direct live routes;
- collection root live pass;
- shell visual pass;
- filters/search pass;
- collection usability `PASS WITH POLISH`.

Historic consolidation Preview golden reference:
- project `prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`;
- deployment `dpl_EDB2pc91vwmk1n1DnSs52hQD5gjJ`;
- URL `https://relational-key-collectionrelational-key-collection-4834ctm8z.vercel.app`;
- state `READY`.

Existing individual family deployments remain golden references.

# ACTIVE PHASE — GLOBAL REFINEMENT

## G0 — Baseline Freeze
Status: `PASS`
Register: `GLOBAL_REFINEMENT_G0_BASELINE.md`
G0 commit: `9cbedfaaec7857d7d9ad924257a4ccd1b8fd7e58`

## G1 — Collection Navigation Frame

Status:
# **SOURCE PASS / LIVE TECHNICAL PASS / USER VISUAL CHECK REQUIRED**

Registers:
- `GLOBAL_REFINEMENT_G1_NAVIGATION_FRAME.md`
- `GLOBAL_REFINEMENT_G1_1_LIVE_TECHNICAL_PASS.md`

Implementation commits:
- `760f4058a017cc761c8111aaffb27a308fe4ce65`
- `9644849b323db8af8dc659f5d12e744a064647da`

Source-gate register commit:
`cdb91ba401c87087e385eb719f1fcc6851067cae`

Live technical checkpoint commit:
`91b017e58061b265dbb9b1623683472db85e1242`

### G1 architecture

All 15 public family routes use one collection-owned navigation wrapper.

Frame:
- `← BACK TO ATLAS` → `/#grid`;
- family context label;
- `THE PAIR IS THE PRODUCT` collection law;
- 44px desktop / 42px mobile layout row;
- iframe fills the remaining viewport rather than being covered by an overlay.

Shared six-family runtime remains unchanged:
`/families/_shared/round13r/index.html`
blob:
`bed8c2fa6d2f40b9677d327ecfcd6c581238e14d`

Nine autonomous validated prototypes are preserved byte-identical as `snapshot.html` inside their existing family directory. Their original validated blob SHAs remain unchanged.

Wrapper blob used by all 15 route indexes:
`86f6b85796bec16dcb9077ed594a1ec86736b663`

### Current Global Refinement Preview

Vercel project:
`prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`

Deployment:
# `dpl_87Bjr4pRX1sMQTBUE731gt42WeQA`

URL:
`https://relational-key-collectionrelational-key-collection-gsdndspjm.vercel.app`

Environment: `Preview`
State: `READY`
Git branch: `collection/global-refinement-1`
Deployed SHA:
`ffdbb21a4553e997e387e879c1a5c692b677c787`

Confirmed live technically:
- root `/` → HTTP 200;
- shared launcher `/families/city-gatineau/` → HTTP 200;
- exact shared runtime `/families/_shared/round13r/index.html` → HTTP 200;
- autonomous launcher `/families/zellige-fes/` → HTTP 200;
- wrapper includes `← BACK TO ATLAS` → `/#grid`;
- root contains `id="grid"`;
- wrapper uses a separate row rather than overlaying the family UI;
- mobile frame CSS is present and reduces the frame to Back + family context below 680px.

Vercel Authentication makes direct automated iframe-snapshot fetches path-scoped through temporary share tokens, so this does not replace the user visual check.

### Locked regression rule

Do not count wrapper introduction as permission to rewrite family mechanisms. `snapshot.html` and the shared runtime are the mechanism-level regression anchors beneath G1.

### Remaining G1 user visual gate

Need one short authenticated-browser walkthrough:
1. open one shared family (recommended: Gatineau);
2. confirm the navigation frame is visible and native controls are not obscured;
3. click `← BACK TO ATLAS` and confirm return to the atlas;
4. open one autonomous family (recommended: Zellige or Boulle);
5. confirm the exact native prototype is visible below the same frame;
6. optional narrow/mobile check for Back + context usability.

Only then may G1 become `PASS` and G2 begin.

## Future staged gates

### G2 — Shell Legibility
Tiny mono labels, filter chips, card metadata, responsive readability.

### G3 — Atlas Family Individuality
Increase family distinguishability without flags, stereotypes, generic cultural skinning or decorative appropriation.

### G4 — PASS WITH POLISH Backlog
Address family-specific polish items with targeted golden-reference regression.

### G5 — Collection Cohesion
Improve collection ↔ family transitions and shared framing while preserving family-native distinction.

### G6 — Final Collection Validation
Final root, routing, responsive, mechanism regression and deployment audit.

# Immediate next output

# **G1.2 — USER VISUAL NAVIGATION REGRESSION**

Use deployment `dpl_87Bjr4pRX1sMQTBUE731gt42WeQA` and verify one shared family + Back to Atlas + one autonomous family. No family interaction replay required.

Status vocabulary:
`CONSOLIDATION MERGED ≠ G0 PASS ≠ G1 SOURCE PASS ≠ G1 LIVE TECHNICAL PASS ≠ G1 USER VISUAL PASS ≠ G1 PASS ≠ GLOBAL REFINEMENT COMPLETE ≠ FINAL COLLECTION PASS`.

## Persistence protocol

After every significant milestone update this file + `RELATIONAL_KEY_HANDOVER.md` with exact branch, commits, deployments, regression anchors, gate result and next required output.
