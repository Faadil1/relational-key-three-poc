# Collectible batch 001 — closeout

Four families: Metate, Siku, Textile, Boulle.

Source candidate: `cdba1564e3dccc4c1ebfa4975e284ebee2da9c38`.
Source tree: `038d34629c47f25545cefa6c8e698caece8b940e`.
Base: approved City direction, `cae67609cd3fdae6cda7e1017ba71b6a1ac74e85`.

The first visual pass found pale OTHER/RESET controls on the light tabletop. These were corrected before deployment. A bounded contact shadow strengthens the physical card silhouette. Textile now has a visibly displaced receiving card before registration and a 3D joining thread after each stitch. Both thread endpoints follow the manually selected shared viewing angle.

## Evidence

First full 24-family runtime comparison: [34257794711](https://github.com/Faadil1/relational-key-three-poc/actions/runs/34257794711), PASS on `d209ebda039c0a614c1c0ef4df31372f1bde78a0`. The later edits only refine the four cards’ contrast, shadow and Textile offset.

- Eight mechanism unit tests pass.
- Build, 24-family lazy-loading and cultural-boundary contracts pass.
- Initial rendered batch: [34257794776](https://github.com/Faadil1/relational-key-three-poc/actions/runs/34257794776), 12/12 pass; desktop/mobile/reduced motion, rectos, both versos, complete/OTHER/reset, keyboard actions, no horizontal overflow or browser errors.
- Initial artifact: `10068653550`, SHA-256 `019738391f65a6e7accd71e1afb32989c70dfce74bf55724beff0110dbf54684`.
- Final build: [34258683001](https://github.com/Faadil1/relational-key-three-poc/actions/runs/34258683001), PASS.
- Final batch verification: [34258683044](https://github.com/Faadil1/relational-key-three-poc/actions/runs/34258683044), 12/12 PASS.
- Final batch artifact: `10069098358`, SHA-256 `4c6eea48cd13211aaef6735e0a282546b74ad5e729408a349e3e71433273f8a2`.
- Final holographic regression: [34258683077](https://github.com/Faadil1/relational-key-three-poc/actions/runs/34258683077), PASS.
- Final City regression: [34258683025](https://github.com/Faadil1/relational-key-three-poc/actions/runs/34258683025), PASS.
- Broad collection comparison: [34258682985](https://github.com/Faadil1/relational-key-three-poc/actions/runs/34258682985), PASS.

## Review boundary

Only City has user visual acceptance. These four are implemented, testable candidates; human approval of their visual and cultural/material treatment remains pending. The Siku representation is a silent editorial event score, not a reconstruction of a particular instrument. The Textile source establishes sewn narrow-strip assembly, not a universal motif vocabulary. Boulle uses an original abstract contour and simulated printing/foil, not historic animal material.

V1 production and the prior City preview remain rollback references. No production promotion is included. The next implementation batch must again contain at most four families.

## Deployment blocked by platform quota

A single preview deployment was requested via `preview/collectible-batch-001`, commit `c02aed8125735281212b676766e2c14a154dab0b`. It has the exact source tree above. At **2026-09-08 17:43:08 UTC**, the Vercel commit status returned:

> Deployment rate limited — retry in 24 hours.

[Exact commit status](https://github.com/Faadil1/relational-key-three-poc/commit/c02aed8125735281212b676766e2c14a154dab0b).

No new READY deployment or new live URL exists for this batch. Do not describe the previous City preview as this batch's deployment. This is an external deployment quota, not a compile failure or an automatic approval rejection. No quota workaround or production promotion was attempted.

Resume after the platform's stated interval (approximately 2026-09-09 17:43 UTC or later): first check current Vercel availability, then retry this exact preview source tree once. Do not replace the production alias. The user has already authorized this preview deployment; a new design approval is not needed merely to retry it.

## Build quota discipline

Vercel is limited to 100 builds per 24 hours on the current account tier. For the next batches, use this operating rule:

- Work on normal implementation branches and rely on GitHub Actions artifacts/screenshots for iteration.
- Do not push every small commit to a Vercel-deployed branch.
- Use one preview branch per closed batch, with at most one Vercel preview attempt after local and Actions checks are green.
- If Vercel returns a rate limit, stop retrying until the stated reset window. Do not create alternate projects, teams, aliases or production promotions as quota workarounds.
- Keep branch protection/deployment settings strict: `main` for production, `preview/*` for intentional previews, implementation branches for CI only.
- When a visual reference is found during the day, record it as a design note for the next batch rather than triggering a fresh preview build immediately.

The newly shared TypingMind artifact is therefore treated as future visual reference material, not a reason to redeploy this batch. Any idea borrowed from it must still pass the same product rule: pair member, relation, other member response.
