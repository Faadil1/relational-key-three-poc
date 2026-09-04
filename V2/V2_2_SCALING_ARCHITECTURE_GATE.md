# RELATIONAL KEY V2.2 — Scaling Architecture Gate

Date: 2026-09-04
Branch: `v2/archive-interaction-3d-matrix-001`

## Entry state

V2.1 three-pilot pattern is validated across:
- Anamorphosis · Paris
- Coupler · Virginia
- Ombak · Bali

All three remain `V2_PILOT_PROMOTION_CANDIDATE` only.

`V2_FAMILY_PROMOTION_TO_V1_MAIN = NOT_AUTHORIZED`

`V2_REMAINING_21_FAMILIES = NOT_AUTHORIZED`

The scaling gate exists because the V2.1 product shell still eagerly imported `@react-three/fiber` and all three scenes, causing the initial production graph to absorb the whole Three/R3F family runtime before the user selected a family.

## Gate objective

Prove that RELATIONAL KEY can scale beyond three pilot families without turning the product shell into one eager 24-family JavaScript graph.

The gate must preserve the product law:

`PAIR MEMBER A → RELATION → PAIR MEMBER B`

and must not weaken:
- V1 frozen baseline identity;
- V2.1 pair mechanics;
- truth boundaries;
- reduced-motion behavior;
- native keyboard controls;
- Focus Experience;
- one-active-Canvas law.

## Architecture under test

### Shared shell

`src/App.jsx`

Responsibilities:
- product / Focus presentation;
- active family selection;
- relation controls and state;
- status/live-region contract;
- Suspense boundary.

Forbidden in the shared shell:
- static import of `@react-three/fiber`;
- static import of any family scene module.

### Lazy family registry

`src/sceneRegistry.js`

Exactly three pilot entries are loaded through `React.lazy(() => import(...))` during this gate.

### Family runtime boundary

`src/FamilyCanvas.jsx`

This is the only shared owner of the R3F `<Canvas>` definition.

Each family entry under `src/sceneEntries/` imports:
1. `FamilyCanvas`;
2. exactly one corresponding family scene.

The active family entry is mounted behind the shared shell. Unselected family entries must not be requested by the browser.

## Build proof

Vite build emits `.vite/manifest.json`.

`scripts/check-scaling.mjs` must fail closed unless:
1. `src/main.jsx` remains the product entry;
2. Anamorphosis, Coupler and Ombak each emit a distinct dynamic family entry;
3. each family entry is referenced by a dynamic import;
4. no family dynamic entry belongs to the initial static closure;
5. the three family entry files are distinct;
6. measured initial/static and per-family incremental bytes are recorded without inventing arbitrary pass thresholds.

Build evidence schema:

`RELATIONAL_KEY_V2_SCALING_ARCHITECTURE_BUILD_001`

## Browser proof

`qa/scaling-architecture.mjs` must fail closed unless:
1. direct Focus load of one family requests that family entry;
2. direct Focus load does not request either of the two unrelated family entries;
3. switching Anamorphosis → Coupler loads Coupler only on demand;
4. Ombak is still absent until Ombak is selected;
5. switching to Ombak then loads Ombak on demand;
6. resolved DOM contains exactly one Canvas and one active scene runtime marker;
7. peak Canvas count through the switching sequence never exceeds one;
8. no browser/page errors appear during the scaling proof.

Browser evidence schema:

`RELATIONAL_KEY_V2_SCALING_ARCHITECTURE_BROWSER_001`

## Regression proof

The existing exact-browser gate remains mandatory on the same head:
- V1 ↔ V2 semantic comparison;
- MATCHING / OTHER;
- keyboard activation;
- reduced motion;
- mobile 390px no-overflow;
- Focus desktop/mobile;
- explicit pair-member identity rail;
- no runtime errors.

## Current implementation state

`V2_2_SCALING_ARCHITECTURE_IMPLEMENTED = TRUE`

`V2_2_SCALING_ARCHITECTURE_CI = PENDING`

`V2_2_SCALING_ARCHITECTURE_GATE = NOT_YET_PASS`

No V1/main merge, production deployment, or 21-family expansion is authorized by this implementation commit alone.

## Passage rule

Only after the exact implementation head passes:
- build/contract CI;
- build scaling manifest proof;
- exact-browser V1 ↔ V2 regression;
- Focus Experience regression;
- browser scaling/isolation proof;

may this document be updated to:

`V2_2_SCALING_ARCHITECTURE_GATE = PASS`

A PASS authorizes the **architecture pattern for bounded family expansion**, not automatic bulk implementation of all 21 remaining families and not promotion to V1/main.
