# RELATIONAL KEY V2 — All-24 Collection-Level Audit 001

## Verdict

`V2_9_ALL24_COLLECTION_LEVEL_COLLISION_ACCESSIBILITY_RUNTIME_AND_HUMAN_COHERENCE_AUDIT = PASS`

All 24 V2 families pass the collection-level collision, navigation, state-reset, accessibility-within-tested-scope, mobile, reduced-motion, runtime, metadata-differentiation and human-coherence gates.

This closes V2_9 only. It does **not** authorize V1 replacement, production promotion, Vercel preview, or an in-place rewrite of V1.

## Scope

The audit covers the complete 24-family V2 collection as one navigable system rather than as isolated family builds.

Required collection-level checks:

- exactly 24 family tabs;
- one active family identity at a time;
- one active `FamilyCanvas` / WebGL runtime at a time;
- deterministic switch-away / re-entry state reset;
- keyboard-focusable family navigation;
- live-region status contract;
- correctly associated range labels;
- desktop 1440 no horizontal overflow;
- mobile 390 no horizontal overflow;
- reduced-motion state active and usable;
- no V2 external requests;
- no console or page errors;
- no exact duplicate pair laws;
- no exact duplicate memorable moments;
- no missing pair-member metadata;
- human collision/coherence review by mechanism cluster.

## Initial V2_9 technical audit — preserved HOLD

Initial QA-only head:
`50afd0c9e857987ae10c7e8848250fbd3bc741f2`

Initial Exact Browser Runtime Compare:
`34157543412` — FAILURE at collection audit

Initial evidence artifact:
`10031645369`

Initial artifact digest:
`sha256:a3c94e6f09a3aabcc60e98020e7d0bbd0361bc719b2d6d078cf22659d0b6d6f8`

Initial collection verdict:
`V2_9_COLLECTION_AUDIT_HOLD_STATE_RESET_OR_TECHNICAL_DEFECT`

The initial audit produced 28 findings across 15 affected families:

- 14 families retained controlled family state after switch-away and re-entry;
- 14 families exposed one or more range inputs without an explicit input-label association;
- `funicular-valparaiso` had the label issue without a state-reset failure;
- `boulle-france` had the state-reset issue without a range-label issue.

The HOLD was not a scene-quality regression. Prior Wave 005 runtime, scaling and all-24 chunk-isolation gates remained green.

### Root cause — state reset

`selectFamily()` changed `activeId` and reset `relationMode`, but the family-specific controlled values remained owned by the shared `App` shell. Unmounting/remounting the scene therefore did not reset those shell-level values.

### Root cause — range labels

The range-control markup placed an `<output>` before the `<input>` inside a wrapping `<label>`. Because `<output>` is labelable, implicit wrapping did not provide the range input with the required label association in the tested DOM.

## Bounded technical remediation

Exact remediation head:
`34676c1fb40cb262b6f94d707e51d70a4c5314da`

Commit message:
`fix(v2): reset family state and explicitly label range controls`

Scope remained bounded to `v2-app/src/App.jsx`.

The remediation:

1. resets the family being exited before changing `activeId`;
2. preserves `relationMode = other` on family entry;
3. keeps the existing explicit RESET control behavior;
4. adds unique `id` values to all 16 range inputs;
5. adds explicit `htmlFor` associations to the corresponding range labels;
6. changes no family law, archive boundary, scene geometry, memorable moment, truth claim, V1 file, production route or deployment configuration.

## Final exact technical evidence

Exact tested product head:
`34676c1fb40cb262b6f94d707e51d70a4c5314da`

Pilot CI:
`34158897671` — SUCCESS

Exact Browser Runtime Compare:
`34158897632` — SUCCESS

Runtime artifact:
`10032088835`

Artifact digest:
`sha256:9c8541cb8f4858bb3f4dd6e19c01ed9b8306dbb3858f43dbec58786ee75e5e1f`

Collection report schema:
`RELATIONAL_KEY_V2_ALL24_COLLECTION_AUDIT_001`

Collection report verdict:
`V2_9_COLLECTION_TECHNICAL_PASS_PENDING_HUMAN_COHERENCE`

Final exact values:

- family count: `24`;
- findings: `[]`;
- state-reset failures: `[]`;
- external requests: `0`;
- console errors: `0`;
- page errors: `0`;
- desktop canvas peak: `1`;
- mobile-390 canvas peak: `1`;
- reduced-motion canvas peak: `1`;
- exact duplicate laws: `[]`;
- exact duplicate memorable moments: `[]`;
- missing pair members: `[]`.

The same workflow also retained the prior exact V1/V2, scaling, Wave 003, Wave 004, Wave 005 and all-24 chunk-isolation gates as green.

## Human coherence review

Human review used the final 48 collection captures: one OTHER and one MATCHING capture for each of the 24 families.

The review asks a collection-level question that exact metadata checks cannot answer: when adjacent families share broad interaction vocabulary, do their objects, relation mechanism and memorable response remain visibly different enough that the collection does not collapse into repeated generic motifs?

### Alignment / registration

Families:
- `kento-japan`
- `astrolabe-isfahan`
- `stereoscopy-uk`
- `city-gatineau`
- `zellige-fes`

Verdict: `PASS`.

Reasons:
- Kento reads as block/sheet registration plus transferred layer;
- Astrolabe reads as rete/plate relative rotation around a shared axis;
- Stereoscopy reads as two view cards plus disparity/fusion depth relation;
- City reads as paired route fields joined through a bounded seam/handoff;
- Zellige reads as cut-profile seating into a tessellation continuation.

Shared alignment vocabulary does not erase mechanism identity.

### Reflection / trace

Families:
- `anamorphosis-paris`
- `frida-coyoacan`

Verdict: `PASS`.

Reasons:
- Anamorphosis depends on cylindrical reflector registration;
- Frida depends on mirror-to-receiving-surface trace transfer.

The reflected consequences are visually and structurally distinct.

### Tension / structural coupling

Families:
- `khipu-peru`
- `textile-bonwire`
- `tongiaki-tonga`
- `funicular-valparaiso`

Verdict: `PASS`.

Reasons:
- Khipu uses cord tension and knot-position register;
- Textile uses facing woven edges and a central structural join;
- Tongiaki uses coupled hull/platform response;
- Funicular uses inverse positional motion between cars.

The shared structural-coupling theme does not create a repeated interaction template.

### Wave / signal / temporal coupling

Families:
- `ombak-bali`
- `signal-nigeria`
- `swell-marshall`
- `siku-bolivia`
- `garamut-sepik-ramu`
- `music-box-sainte-croix`

Verdict: `PASS`.

Reasons:
- Ombak exposes paired synthetic-frequency interference;
- Signal exposes a relay-path handoff;
- Swell exposes bounded wave refraction / lee crossing;
- Siku exposes complementary pipe-row interlock;
- Garamut exposes impact-to-body resonance;
- Music Box exposes cylinder-pin to comb-tooth contact decoding.

`ombak-bali` and `swell-marshall` are the closest visual neighbors because both contain wave witnesses, but the source members and relation consequences remain clearly different. No bounded rework is required.

### Contact / material transformation

Families:
- `coupler-virginia`
- `hika-ahi-aotearoa`
- `metate-teotitlan`
- `mate-bombilla-argentina`
- `food-toyama`
- `service-benin`

Verdict: `PASS`.

Reasons:
- Coupler reads as approach/lock/load-path transfer;
- Hika Ahi reads as sustained friction with localized ember witness;
- Metate reads as reciprocal abrasion / accumulated receiving trace;
- Mate + Bombilla reads as insertion enabling selective passage;
- Food reads as ordered package release and leaf-fan reveal;
- Service reads as registered telecom contact and bounded service-window response.

The mechanisms remain domain-native rather than generic contact animations.

### Boulle singleton

Family:
- `boulle-france`

Verdict: `PASS`.

The reciprocal inverse cut relation remains visually specific and does not need to be grouped with another collision family for differentiation.

## Human coherence verdict

`V2_9_HUMAN_COHERENCE = PASS`

No additional family rework is authorized or required by V2_9.

## Final V2_9 result

`TECHNICAL_PASS + HUMAN_COHERENCE_PASS = V2_9_PASS`

The full 24-family V2 collection is now technically coherent and human-coherent within the tested scope.

Promotion candidate count remains:
`24 / 24`

Unported family count remains:
`0`

## What this does not authorize

V2_9 does not authorize:

- replacing V1 production;
- merging V2 into a production/main route as a replacement;
- deleting the frozen V1 baseline;
- Vercel preview or production deployment;
- claiming V2 COMPLETE as production without a separate explicit promotion decision.

The frozen V1 production head remains:
`6821cd2a9694635e2e6948747af45785fe7e3afe`

## Next gate

`V2_10_PRODUCTION_PROMOTION_DECISION_AND_V1_REPLACEMENT_AUTHORIZATION`

This is a decision gate, not an automatic deployment gate.

Until explicit human authorization is recorded:

- `production_replacement_authorized = false`;
- `v2_family_promotion_to_v1_main_authorized = false`;
- V1 remains immutable;
- Vercel preview remains unauthorized.
