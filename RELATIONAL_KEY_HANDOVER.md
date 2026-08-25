# RELATIONAL KEY — HANDOVER

Updated: 2026-08-25
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
- G1 Collection Navigation Frame implementation + source gate.

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
# `IMPLEMENTED / SOURCE PASS / LIVE REGRESSION REQUIRED`

Register:
`GLOBAL_REFINEMENT_G1_NAVIGATION_FRAME.md`

Implementation:
- `760f4058a017cc761c8111aaffb27a308fe4ce65` — create wrappers + exact autonomous snapshot copies;
- `9644849b323db8af8dc659f5d12e744a064647da` — harden all wrapper paths to absolute collection routes;
- `cdb91ba401c87087e385eb719f1fcc6851067cae` — record source gate.

Current state update:
`74c51804ad3f605a2eb17d987e14d645afe70e52`

### G1 architecture

Every public `/families/<slug>/` now loads through the same collection-owned wrapper.

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
- Zellige / Khipu / Kento / Ombak / Swell / Stereoscopy / Siku / Hika Ahi / Boulle now keep their exact pre-wrapper prototype as `snapshot.html` in the same directory;
- public index only wraps the snapshot;
- wrapper blob: `86f6b85796bec16dcb9077ed594a1ec86736b663`.

Important: the mechanism-level source is intentionally preserved beneath the wrapper. Do not edit these snapshots during G1.

# IMMEDIATE NEXT TASK — G1.1 LIVE REGRESSION

1. Check Vercel project `prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny` for a Preview from branch `collection/global-refinement-1`.
2. If none exists, create a Preview Deployment manually for that branch in the same project.
3. Keep the consolidation Preview `dpl_EDB2pc91vwmk1n1DnSs52hQD5gjJ` untouched as golden baseline.
4. On the new refinement Preview verify:
   - root collection loads;
   - at least one shared route initializes the intended state;
   - at least one autonomous route loads its exact snapshot;
   - `← BACK TO ATLAS` works;
   - wrapper does not cover family controls;
   - responsive/mobile frame remains acceptable;
   - route integrity remains intact.
5. Record G1 `PASS / PATCH`.
6. Only after G1 PASS begin G2 — Shell Legibility.

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

If a new conversation starts here, resume directly at **G1.1 — GLOBAL REFINEMENT PREVIEW + LIVE REGRESSION**.
