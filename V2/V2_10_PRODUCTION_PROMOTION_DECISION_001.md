# RELATIONAL KEY V2 — Production Promotion Decision 001

## Verdict

`V2_10_PRODUCTION_PROMOTION_DECISION_AND_V1_REPLACEMENT_AUTHORIZATION = CONDITIONAL_GO`

V2 is approved as the **product successor candidate** to the frozen V1 collection because all 24 families have passed the required relational, runtime, accessibility-within-tested-scope, mobile, reduced-motion, collision-differentiation and human-coherence gates.

However, **V1 replacement is NOT authorized yet**.

The remaining blocker is not product quality. It is deployment shape: the validated V2 is a Vite application under `v2-app/`, while the current Vercel production project still serves the static V1 collection from repository root. A direct branch merge would not constitute a proven V2 production artifact and must not be used as the switch mechanism.

## Current production anchor

Repository default branch:
`main`

Current live main head:
`5076c129c48426733a9a7dbaefa85145ff4b5139`

That commit is one docs-only commit above the frozen V1 product baseline:
`6821cd2a9694635e2e6948747af45785fe7e3afe`

The only file changed by `5076c129...` relative to the V1 baseline is `README.md` (`docs: reposition RELATIONAL KEY for portfolio readers`). The production product itself therefore remains the frozen V1 collection.

Stable production alias:
`https://relational-key-collectionrelational.vercel.app/`

Live verification during V2_10:
- HTTP `200 OK`;
- title: `RELATIONAL KEY — Collection`;
- 24-family V1 collection markup served successfully.

Vercel project:
`prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`

Current production deployment:
`dpl_7BudQj9bccqH7UXxZ6tKT2oBt3YH`

Current deployment source:
`main@5076c129c48426733a9a7dbaefa85145ff4b5139`

Vercel state:
`READY`

Vercel marks this deployment as:
`isRollbackCandidate: true`

This deployment is the primary rollback anchor for any later V2 production switch.

Secondary rollback anchor:
`dpl_HuDASoX8BUWcvjqXVHLZsDSui1oL`

Source:
`main@6821cd2a9694635e2e6948747af45785fe7e3afe`

State:
`READY`

Also marked as a rollback candidate.

## V2 readiness evidence

Canonical V2 branch before V2_10:
`v2/archive-interaction-3d-matrix-001`

Canonical head:
`387a524cae7c5417c2f1bf2442e0cae92d27fbf4`

Collection status:
- 24 / 24 families built;
- 24 / 24 promotion candidates;
- 0 unported families;
- all family-specific human V1↔V2 comparison gates passed;
- all-24 collision / coherence audit passed;
- mobile 390 passed;
- reduced motion passed;
- one active `FamilyCanvas` / WebGL runtime;
- exact duplicate laws: 0;
- exact duplicate memorable moments: 0;
- state-reset failures: 0;
- external V2 requests: 0;
- console errors: 0;
- page errors: 0.

Final V2_9 tested product head:
`34676c1fb40cb262b6f94d707e51d70a4c5314da`

Pilot CI:
`34158897671` — SUCCESS

Exact Browser Runtime Compare:
`34158897632` — SUCCESS

Runtime artifact:
`10032088835`

Artifact digest:
`sha256:9c8541cb8f4858bb3f4dd6e19c01ed9b8306dbb3858f43dbec58786ee75e5e1f`

V2_9 final result:
`TECHNICAL_PASS + HUMAN_COHERENCE_PASS = V2_9_PASS`

## Deployment-shape blocker

The current Vercel project reports:
- `framework: null`;
- Git-linked repository: `Faadil1/relational-key-three-poc`;
- current production deployments sourced from `main`;
- root static collection currently served successfully.

The V2 application has its own package graph at:
`v2-app/package.json`

Its production build contract is:
`vite build && node scripts/check-scaling.mjs`

Dependencies include React 19, React Three Fiber 9.7, Three.js 0.185.1 and Vite 8.2.2.

The repository-level `vercel.json` only controls Git deployment eligibility. It does **not** currently define a V2 root directory, V2 build command or V2 output directory.

Therefore none of the following are authorized in V2_10:
- blindly merge the V2 branch into `main` and assume V2 becomes production;
- repoint production to `v2-app/` without preview validation;
- remove the V1 static root before rollback proof;
- mutate Vercel production configuration directly;
- overwrite or force-push `main`;
- delete the current V1 rollback deployment.

## Main / V2 divergence boundary

`main` and the V2 canonical branch diverge from the frozen V1 baseline.

`main` contains one later docs-only README commit that is not present in the V2 branch.

The V2 canonical branch contains the full V2 evolution history.

A future production candidate must therefore preserve the portfolio README intent from `main` while importing only the deployment-ready V2 product delta. A wholesale force replacement of `main` is prohibited.

## Promotion decision

### Product decision

`APPROVE_V2_AS_PRODUCTION_SUCCESSOR_CANDIDATE`

The V2 collection has earned promotion eligibility.

### Replacement decision

`WITHHOLD_V1_REPLACEMENT_AUTHORIZATION_PENDING_DEPLOYABLE_V2_ARTIFACT`

The current V1 production remains authoritative until an exact V2 deployment candidate is proven.

### Rollback decision

`ROLLBACK_PATH_AVAILABLE_AND_HEALTHY`

Primary rollback deployment:
`dpl_7BudQj9bccqH7UXxZ6tKT2oBt3YH`

Primary rollback Git anchor:
`main@5076c129c48426733a9a7dbaefa85145ff4b5139`

Frozen product baseline:
`6821cd2a9694635e2e6948747af45785fe7e3afe`

## Next bounded gate

`V2_10A_PRODUCTION_ARTIFACT_PACKAGING_PREVIEW_AND_ROLLBACK_PROOF`

This next gate is allowed to build a **deployment-only candidate** without changing family laws or interaction semantics.

Allowed scope:
- reconcile the `main` portfolio README commit with the V2 production candidate;
- define an explicit V2 Vercel build/output contract;
- package `v2-app` as the candidate root experience;
- preserve the V1 root and rollback anchors until final authorization;
- run existing Pilot CI + Exact Browser + V2_9 collection audit against the packaged artifact;
- create exactly one explicit Vercel preview because this gate requires live deployment proof;
- verify root load, 24-family navigation, representative matching/other paths, mobile 390, reduced motion, keyboard focus and no unexpected external requests;
- prove that rollback to the current production deployment remains available.

Not allowed:
- production alias switch;
- production deployment target;
- V1 deletion;
- semantic scene changes;
- family rework unrelated to a packaging defect;
- force-updating `main`.

## Final V2_10 state

`PRODUCT_SUCCESSOR = APPROVED`

`V1_REPLACEMENT = NOT_YET_AUTHORIZED`

`PRODUCTION = CURRENT_V1_STAYS_LIVE`

`ROLLBACK = VERIFIED_AVAILABLE`

`NEXT = V2_10A_PRODUCTION_ARTIFACT_PACKAGING_PREVIEW_AND_ROLLBACK_PROOF`
