# RELATIONAL KEY V2 — Production Artifact Packaging, Preview & Rollback Proof 001

## Verdict

`V2_10A_PRODUCTION_ARTIFACT_PACKAGING_PREVIEW_AND_ROLLBACK_PROOF = PASS`

V2 is now proven as a deployable Vercel artifact without changing any family scene, relational law, archive boundary, or interaction semantics.

This gate does **not** switch production. V1 remains live and authoritative until a separate explicit human production-switch authorization.

## Packaging scope

Base canonical V2 head entering V2_10A:
`5beb5d06b9bc478f18ef7924bd697e99d2b5f315`

Bounded packaging branch:
`v2/v2-10a-production-packaging-001`

Exact browser-tested packaging head:
`3cb8d0d573212052d839be4f690454b128af800e`

Diff from V2_10 canonical contains exactly four files:
- `.github/workflows/v2-react-r3f-pilot-ci.yml`
- `.github/workflows/v2-runtime-compare.yml`
- `README.md`
- `vercel.json`

No scene, family registry, pair law, memorable moment, archive boundary, or V1 product file changed.

## Main README reconciliation

The portfolio README from `main@5076c129c48426733a9a7dbaefa85145ff4b5139` was carried into the V2 production candidate so the production candidate does not silently discard the docs-only main delta created after the frozen V1 product baseline.

## Explicit Vercel packaging contract

`vercel.json` now defines:

```json
{
  "installCommand": "cd v2-app && npm ci --ignore-scripts",
  "buildCommand": "cd v2-app && npm run build",
  "outputDirectory": "v2-app/dist"
}
```

Deployment budget remains default-deny:
- all branches denied by default;
- `main` allowed;
- `preview/**` allowed;
- `preview-*` allowed.

Ordinary `v2/**` work branches therefore do not create Vercel deployments.

## Exact CI proof before preview

Pilot / packaging contract run:
`34162034611` — SUCCESS

Checks included:
- Vercel packaging contract exact match;
- lock graph installation;
- `npm audit --audit-level=high` → 0 vulnerabilities;
- relational contract PASS;
- exactly 24 lazy family entries;
- one `FamilyCanvas` definition;
- Wave005 procedural/truth boundaries PASS;
- production build PASS;
- packaged `v2-app/dist/index.html` and assets present.

Full exact browser runtime run:
`34162053216` — SUCCESS

Exact runtime evidence artifact:
`10033084999`

Artifact digest:
`sha256:8ff12cbcb300ac58d393f27c32856d0fde2c5f3f06371e320c3b8b30c7522341`

The full browser workflow reran:
- V1↔V2 exact browser compare;
- Focus capture;
- scaling build/browser;
- Wave003 regression;
- Wave004 regression;
- Wave005 regression;
- all24 direct chunk isolation;
- V2_9 all24 collection audit.

Final packaging-runtime evidence:
- `ALL24_CHUNK_ISOLATION_PASS`;
- family count `24`;
- chunk-isolation findings `[]`;
- `SCALING_ARCHITECTURE_BROWSER_PASS`;
- V2_9 family count `24`;
- V2_9 findings `[]`;
- V2_9 external requests `[]`;
- V2_9 console errors `[]`;
- V2_9 page errors `[]`;
- V2_9 state-reset failures `[]`;
- desktop/mobile-390/reduced-motion collection runtime contract remains PASS.

The generic runtime report retains informational/performance observations, but no hard runtime failure was produced; the complete workflow conclusion is SUCCESS and the already-closed human V1↔V2 verdicts remain unchanged.

## Single-preview budget

A `preview/**` branch was first created at the exact tested head. Branch creation alone produced no Vercel deployment and therefore did not consume a preview build.

To trigger exactly one preview without changing the tested artifact, an empty Git commit was created with **the exact same Git tree** as the tested head.

Browser-tested head:
`3cb8d0d573212052d839be4f690454b128af800e`

Browser-tested tree:
`597e33ee6f80163d7512a65369075e9e5d8ce775`

Preview transport commit:
`43692003b85c2ab6e84e5ea062cb6d86f9e04dbc`

Comparison:
- ahead by 1 commit;
- changed files: `[]`;
- product/config tree: byte-identical.

Preview branch:
`preview/v2-10a-production-candidate`

Exactly one Vercel preview deployment was created for this gate.

## Live Vercel preview proof

Vercel project:
`prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`

Preview deployment:
`dpl_959A57SDwj1jMXN4xQC8Xk6xDrrM`

Deployment URL:
`https://relational-key-collectionrelational-key-collection-7885ckl6c.vercel.app/`

Vercel source metadata:
- branch: `preview/v2-10a-production-candidate`;
- commit: `43692003b85c2ab6e84e5ea062cb6d86f9e04dbc`;
- target: preview (`null`), not production;
- state: `READY`.

Live root fetch:
- HTTP `200 OK`;
- title: `RELATIONAL KEY V2 — Relational Pilots`;
- Vite module asset: `assets/index-BtveDPl0.js`;
- stylesheet: `assets/index-CxnEcetF.css`.

Vercel build log proves the configured packaging was actually used:
- clone branch `preview/v2-10a-production-candidate` at `4369200`;
- install command `cd v2-app && npm ci --ignore-scripts`;
- 0 npm vulnerabilities;
- Vite `8.2.2` production build;
- 87 modules transformed;
- `V2_SCALING_ARCHITECTURE_BUILD_PASS`;
- family count `24`;
- build completed in `/vercel/output`;
- deployment completed successfully.

## Artifact identity / bundle fingerprint

The CI production build and the live Vercel build produced matching hashed bundle names and sizes, including:
- `index-BtveDPl0.js` — 241451 bytes;
- `FamilyCanvas-CU7A_n4X.js` — 880851 bytes;
- `index-CxnEcetF.css` — 10194 bytes;
- the same 24 family entry chunk names;
- the same Wave005 shared primitive chunk.

This fingerprint, plus the empty preview commit (`files: []`), ties the live Vercel preview to the exact source tree that passed the full browser suite.

## Live-interaction evidence boundary

The protected Vercel preview was verified live at the HTTP/build/artifact layer. A second remote Playwright session was not executed against the protected preview URL in this gate environment.

Interactive behavior is therefore supported by two linked proofs rather than falsely described as a remote-browser replay:
1. the full desktop/mobile-390/reduced-motion/keyboard/state-reset browser suite passed on the exact tested Git tree before deployment;
2. Vercel built and served a byte-identical source tree with matching hashed output fingerprints.

No claim is made that a separate remote browser automation was run.

## Production / rollback proof

After the V2 preview became READY, the stable production alias was fetched again:
`https://relational-key-collectionrelational.vercel.app/`

Result:
- HTTP `200 OK`;
- title remains `RELATIONAL KEY — Collection`;
- V1 static 24-family atlas remains served.

Current production deployment remains:
`dpl_7BudQj9bccqH7UXxZ6tKT2oBt3YH`

Source:
`main@5076c129c48426733a9a7dbaefa85145ff4b5139`

State:
`READY`

Vercel rollback status:
`isRollbackCandidate: true`

Secondary frozen-baseline rollback deployment remains:
`dpl_HuDASoX8BUWcvjqXVHLZsDSui1oL`

Source:
`main@6821cd2a9694635e2e6948747af45785fe7e3afe`

State:
`READY`

Rollback candidate:
`true`

The preview did not mutate the production alias or production target.

## V2_10A decision

`DEPLOYABLE_V2_ARTIFACT = PASS`

`EXACT_CI = PASS`

`SINGLE_PREVIEW_BUDGET = PASS`

`LIVE_V2_ROOT = PASS`

`LIVE_BUILD_FINGERPRINT_MATCH = PASS`

`ROLLBACK_PROOF = PASS`

`PRODUCTION_ALIAS_UNCHANGED = PASS`

## What this does not authorize

V2_10A does **not** authorize:
- merging/replacing `main` automatically;
- production alias promotion;
- deleting or invalidating V1;
- force-pushing `main`;
- additional preview deployments;
- semantic family rework.

## Next gate

`V2_10B_FINAL_PRODUCTION_SWITCH_AUTHORIZATION_AND_ALIAS_PROMOTION`

This gate is a human authorization boundary.

Until explicitly authorized:
- `production_replacement_authorized = false`;
- `v2_family_promotion_to_v1_main_authorized = false`;
- the stable production alias stays on V1;
- the V1 rollback anchors remain intact.

Final V2_10A status:

`V2_10A_PASS__DEPLOYABLE_V2_PREVIEW_PROVEN__FINAL_PRODUCTION_SWITCH_AUTHORIZATION_NEXT`
