# RELATIONAL KEY V2.2 — Scaling Architecture Gate / Closeout

Date: 2026-09-04
Branch: `v2/archive-interaction-3d-matrix-001`

## Gate verdict

`V2_2_SCALING_ARCHITECTURE_GATE = PASS`

`V2_2_SCALING_ARCHITECTURE_PATTERN = VALIDATED_ON_3_PILOTS`

`V2_BOUNDED_FAMILY_EXPANSION_ARCHITECTURE = AUTHORIZED`

`V2_FAMILY_PROMOTION_TO_V1_MAIN = NOT_AUTHORIZED`

`V2_REMAINING_21_FAMILIES_BULK_IMPLEMENTATION = NOT_AUTHORIZED`

The gate proves the architecture pattern for bounded expansion. It does not authorize a bulk 21-family port, V1 replacement, production promotion, or weakening of the relational-pair contract.

## Exact implementation identity

Initial atomic implementation commit:

`1340be25b6e6ea3d4871cf8c9bfd78893cbfb353`

That commit exposed a checker-only false positive because Vite 8 represents the product build entry as `index.html` in the manifest rather than `src/main.jsx`.

Checker-only correction commit:

`4fb747c4b654bfc8b65932313b3490263e571312`

No product scene, relation mechanic, V1 source, or runtime behavior changed in the checker correction.

**Exact tested implementation head:**

`4fb747c4b654bfc8b65932313b3490263e571312`

## CI / artifact identity

Build / relational contract / scaling-manifest proof:
- run `33905380103`
- PASS

Exact-browser V1↔V2 + Focus + scaling-isolation proof:
- run `33905380106`
- PASS
- artifact `9949289880`
- digest `sha256:2500050cb25d75fcc1933dc9ffb4cd40de2d3fb095798746b34d15314e447a46`

## Entry state preserved

V2.1 three-pilot pattern remains validated across:
- Anamorphosis · Paris
- Coupler · Virginia
- Ombak · Bali

All three remain `V2_PILOT_PROMOTION_CANDIDATE` only.

The product law remains:

`PAIR MEMBER A → RELATION → PAIR MEMBER B`

The gate preserves:
- V1 frozen baseline identity;
- V2.1 pair mechanics;
- truth boundaries;
- reduced-motion behavior;
- native keyboard controls;
- Focus Experience;
- one-active-Canvas law.

## Validated architecture

### Shared product shell

`src/App.jsx`

Responsibilities:
- product / Focus presentation;
- active family selection;
- relation controls and state;
- status/live-region contract;
- Suspense boundary.

Validated source contract:
- static `@react-three/fiber` imports in shell: **NONE**;
- static family-scene imports in shell: **NONE**.

### Lazy family registry

`src/sceneRegistry.js`

The three pilot entries are loaded through `React.lazy(() => import(...))`.

### Family runtime boundary

`src/FamilyCanvas.jsx`

This is the shared owner of the R3F `<Canvas>` definition.

Each family entry under `src/sceneEntries/` imports:
1. `FamilyCanvas`;
2. exactly one corresponding family scene.

The browser proves that unselected family entries are not requested.

## Build topology proof

Evidence schema:

`RELATIONAL_KEY_V2_SCALING_ARCHITECTURE_BUILD_001`

Verdict:

`SCALING_ARCHITECTURE_BUILD_PASS`

### Initial static shell

- manifest entry: `index.html`
- emitted JS: `assets/index-vo_e8PB6.js`
- initial static JS: `205,246 bytes`
- initial static files: **1 JS file**

The V2.1 pre-scaling build emitted approximately `1,096.97 kB` as one initial JavaScript bundle. V2.2 does not claim that the total application code disappeared; it moves the R3F/Three family runtime and family scenes behind the family boundary.

### Shared dynamic family runtime

- emitted JS: `assets/FamilyCanvas-C2x6tNYe.js`
- size: `880,843 bytes`

This shared R3F/Three runtime is absent from the initial static closure and is fetched when the first family runtime is requested.

### Distinct family entries

Anamorphosis:
- `assets/AnamorphosisEntry-0sqVK7f8.js`
- `5,487 bytes`

Coupler:
- `assets/CouplerEntry-BJC8YiDq.js`
- `4,697 bytes`

Ombak:
- `assets/OmbakEntry-CoPDBneY.js`
- `4,066 bytes`

Cold family loads include the shared family runtime once. After that shared runtime is cached in the session, switching families adds only the requested family entry chunk.

### Complete build

- JS files: `5`
- total JS bytes: `1,100,339`

Important interpretation:

**V2.2 is a loading-topology improvement, not a claim that total source/runtime weight has vanished.** The initial shell is now bounded, while Three/R3F and family-specific code are deferred until a family is actually used.

No arbitrary performance threshold was introduced.

## Browser isolation proof

Evidence schema:

`RELATIONAL_KEY_V2_SCALING_ARCHITECTURE_BROWSER_001`

Verdict:

`SCALING_ARCHITECTURE_BROWSER_PASS`

### Direct Focus isolation

Anamorphosis direct Focus loaded:
- shared shell;
- shared family runtime;
- Anamorphosis entry;
- Coupler entry: **NOT LOADED**;
- Ombak entry: **NOT LOADED**.

Coupler direct Focus loaded:
- shared shell;
- shared family runtime;
- Coupler entry;
- Anamorphosis entry: **NOT LOADED**;
- Ombak entry: **NOT LOADED**.

Ombak direct Focus loaded:
- shared shell;
- shared family runtime;
- Ombak entry;
- Anamorphosis entry: **NOT LOADED**;
- Coupler entry: **NOT LOADED**.

All three direct Focus cases:
- viewport `1440 / 1440` with no horizontal overflow;
- Canvas count `1`;
- active runtime marker count `1`;
- browser console errors `0`;
- page errors `0`.

### On-demand switching sequence

Observed sequence:

`ANAMORPHOSIS → COUPLER → OMBAK`

After initial Anamorphosis:
- Anamorphosis entry loaded;
- Coupler absent;
- Ombak absent.

After selecting Coupler:
- Coupler entry loaded on demand;
- Ombak still absent.

After selecting Ombak:
- Ombak entry loaded on demand.

Canvas proof:
- peak Canvas count through the entire switch sequence: `1`;
- final Canvas count: `1`;
- final active runtime marker count: `1`.

No browser/page errors were observed in the scaling sequence.

## Regression proof on the same tested head

Existing V2.1 assurance remained green:
- V1 ↔ V2 semantic comparison: PASS;
- MATCHING / OTHER: PASS;
- keyboard activation: PASS;
- reduced motion: PASS;
- mobile `390px` no-overflow: PASS;
- Focus desktop/mobile: PASS;
- explicit pair-member identity rail: PASS;
- runtime errors: NONE.

Runtime diagnostic observations on this exact run:
- Anamorphosis max observed long task: `216 ms`;
- Coupler: `153 ms`;
- Ombak: `61 ms`.

These are run-specific headless Chromium / SwiftShader observations, not generalized user-device guarantees or invented pass thresholds.

## Gate closeout

`V2_2_BUILD_CONTRACT = PASS`

`V2_2_BUILD_SCALING_MANIFEST = PASS`

`V2_2_BROWSER_RUNTIME_REGRESSION = PASS`

`V2_2_FOCUS_REGRESSION = PASS`

`V2_2_BROWSER_FAMILY_ISOLATION = PASS`

`V2_2_ONE_ACTIVE_CANVAS = PASS`

`V2_2_SCALING_ARCHITECTURE_GATE = PASS`

## Authorization boundary

V2.2 authorizes **bounded family expansion using this architecture pattern**.

It does **not** authorize:
- automatic implementation of all remaining 21 families in one batch;
- merging V2 into V1/main;
- replacing the V1 golden baseline;
- production deployment/promotion;
- generic 3D decoration that replaces the relational pair;
- weakening any family truth boundary.

The first expansion wave must remain small enough to prove that the pattern survives additional runtime/mechanism classes before broad rollout.

## Next exact gate

`V2_3_BOUNDED_FAMILY_EXPANSION_WAVE_001`

Status:

`NOT_STARTED`

The next gate should select a small representative subset from the remaining 21 families, migrate them through the validated lazy family boundary, and rerun the same build/runtime/Focus/isolation laws before a larger wave is considered.
