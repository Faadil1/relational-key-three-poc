# RELATIONAL KEY — HANDOVER

Updated: 2026-08-26
Repository: `Faadil1/relational-key-three-poc`
Working branch: `collection/global-refinement-1`
Draft PR: **#21 — RELATIONAL KEY — Global Refinement Pass**
PR status: `DRAFT / DO NOT MERGE`

# RESUME HERE

RELATIONAL KEY has completed:
- Continental Balance Gate 1;
- full Collection Consolidation;
- 15 / 15 independent family user gates;
- 15 / 15 consolidated direct live route verification;
- collection shell visual + functional pass with polish;
- PR #20 consolidation squash merge;
- Global Refinement G0 baseline freeze;
- G1 Collection Navigation Frame implementation + source gate;
- G1.1 Global Refinement Preview deployment + live technical regression.

Canonical invariant:
# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

Distribution:
`AFRICA 4 / ASIA 3 / NORTH AMERICA 2 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

Family expansion remains paused.

# IMMUTABLE PRE-REFINEMENT BASELINE

Consolidation merge / regression anchor:
# `79ba99ec739dfffb40563e9a89edfdffe0fdd3d5`

Historic collection Preview golden reference:
- project `prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`;
- deployment `dpl_EDB2pc91vwmk1n1DnSs52hQD5gjJ`;
- URL `https://relational-key-collectionrelational-key-collection-4834ctm8z.vercel.app`;
- state `READY`.

Existing per-family Vercel deployments also remain golden references.

# GLOBAL REFINEMENT

## G0 — BASELINE FREEZE
Status: `PASS`
Register: `GLOBAL_REFINEMENT_G0_BASELINE.md`

## G1 — COLLECTION NAVIGATION FRAME

Status:
# `SOURCE PASS / LIVE TECHNICAL PASS / USER VISUAL CHECK REQUIRED`

Registers:
- `GLOBAL_REFINEMENT_G1_NAVIGATION_FRAME.md`
- `GLOBAL_REFINEMENT_G1_1_LIVE_TECHNICAL_PASS.md`

Implementation:
- `760f4058a017cc761c8111aaffb27a308fe4ce65` — create wrappers + exact autonomous snapshot copies;
- `9644849b323db8af8dc659f5d12e744a064647da` — harden wrapper paths;
- `cdb91ba401c87087e385eb719f1fcc6851067cae` — source gate;
- `91b017e58061b265dbb9b1623683472db85e1242` — live technical checkpoint.

### Current G1 Preview

Project:
`prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`

Deployment:
# `dpl_87Bjr4pRX1sMQTBUE731gt42WeQA`

URL:
`https://relational-key-collectionrelational-key-collection-gsdndspjm.vercel.app`

Environment: `Preview`
State: `READY`
Git ref: `collection/global-refinement-1`
Deployed SHA:
`ffdbb21a4553e997e387e879c1a5c692b677c787`

Live technical evidence already confirmed:
- root `/` HTTP 200 and correct collection shell;
- shared launcher `/families/city-gatineau/` HTTP 200;
- shared runtime `/families/_shared/round13r/index.html` HTTP 200;
- autonomous launcher `/families/zellige-fes/` HTTP 200;
- G1 wrapper contains `← BACK TO ATLAS` → `/#grid`;
- atlas root contains `id="grid"`;
- wrapper has a dedicated 44px desktop / 42px mobile row, not an overlay;
- mobile CSS keeps Back + context and removes the tertiary law below 680px.

Vercel Authentication can redirect direct automated fetches of nested iframe snapshot paths because temporary share tokens are path-scoped. Treat this as tooling/auth limitation, not visual evidence.

### G1 architecture

Every public `/families/<slug>/` loads through the same collection-owned wrapper.

Wrapper provides:
- `← BACK TO ATLAS` → `/#grid`;
- family context label;
- collection law `THE PAIR IS THE PRODUCT`;
- separate 44px desktop / 42px mobile navigation row;
- family iframe below it, not covered by overlay UI.

Shared historical routes:
- CITY / SERVICE / SIGNAL / FRIDA / FOOD / TEXTILE still load the exact shared runtime;
- shared runtime blob unchanged: `bed8c2fa6d2f40b9677d327ecfcd6c581238e14d`.

Autonomous routes:
- Zellige / Khipu / Kento / Ombak / Swell / Stereoscopy / Siku / Hika Ahi / Boulle keep their exact pre-wrapper prototype as `snapshot.html`;
- public index only wraps the snapshot;
- wrapper blob: `86f6b85796bec16dcb9077ed594a1ec86736b663`.

Important: the mechanism-level source is intentionally preserved beneath the wrapper. Do not edit these snapshots during G1.

# IMMEDIATE NEXT TASK — G1.2 USER VISUAL NAVIGATION REGRESSION

In the authenticated browser using deployment `dpl_87Bjr4pRX1sMQTBUE731gt42WeQA`:

1. open one shared family, preferably Gatineau;
2. confirm `← BACK TO ATLAS` is visible and the family controls remain unobscured;
3. click Back to Atlas and confirm return to the atlas section;
4. open one autonomous family, preferably Zellige or Boulle;
5. confirm its native prototype appears correctly below the same frame;
6. optionally narrow the viewport and confirm Back + context remain usable.

No need to replay the family relationship interactions.

If this visual regression passes:
- record `G1 PASS`;
- immediately begin **G2 — Shell Legibility**.

# FUTURE GATES

G2 — Shell Legibility.
G3 — Atlas Family Individuality.
G4 — Family PASS WITH POLISH backlog.
G5 — Collection Cohesion.
G6 — Final Collection Validation.

## Recovery note

A transient documentation-only branch update was detected during G1 construction and immediately discarded before live/deployment. Canonical branch history was restored to the atomic G1 implementation before further work. No validated family source or live deployment was affected.

## Persistence protocol

After every significant milestone update `RELATIONAL_KEY_CURRENT_STATE.md` + this handover with exact commits, deployments and next gate.

If a new conversation starts here, resume directly at **G1.2 — USER VISUAL NAVIGATION REGRESSION**.
