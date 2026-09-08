# Holographic pair preview — closeout

Date: 2026-09-08.
User authorized integration and deployment. Target delivered: V2 preview; V1 production unchanged.

## Exact identities

- Tested source: b5251c34f661b2e4878007d599225fe61dadeb97.
- Preview commit: 75c444499c6e9cb667f5b6cfb76321ea3ede4fea (empty trigger commit; identical source tree).
- Work branch: v2/astra-tranche-a-relational-depth-001.
- Preview branch: preview/astra-holo-pair-001.
- Vercel deployment: dpl_VWaB6wbNG1cjrDVQR8YJhdSFVgER.
- Target: preview (target null); state READY; build about 7 seconds.
- URL: https://relational-key-collectionrelational-key-collection-91yb8bf7b.vercel.app/
- V1 rollback / current production: https://relational-key-collectionrelational.vercel.app/

## Verification

- Build CI: https://github.com/Faadil1/relational-key-three-poc/actions/runs/34189761805 — success.
- Holographic pair verification: https://github.com/Faadil1/relational-key-three-poc/actions/runs/34189761825 — success.
- Full runtime comparison: https://github.com/Faadil1/relational-key-three-poc/actions/runs/34189761817 — success.
- Holo artifact: 10041787291; SHA256 ae7fee3a56f8ffe2d51e549907f5da6875b86901ff5946e616ccf52981a21043.

Six targeted cases passed: Metate and Siku each on desktop, mobile and reduced-motion. Captured pixels differ between opposing angles and between foil on/off. Viewing controls preserve relational state. Keyboard completes both mechanisms. Reduced-motion idle frames are identical. One canvas, no page overflow or browser console errors in tested cases.

Inspected the captured Metate desktop foil render and Siku mobile completed state. Both members are in frame. These checks prove bounded runtime behavior, not cultural authenticity, device-wide performance or aesthetic acceptance.

Two failed intermediate shader iterations were corrected before deployment: live material uniforms and explicit demand-frame invalidation are required for the finish switch. The passing evidence above is from the corrected source.

## Scope and limitations

Adaptation of Holo Card Studio's web material principles, with MIT notice included. No generated cultural images or Blender export is claimed. The holographic finish is on the editorial card support, not the represented stone or tubes. The 22 other families do not inherit the new finish. No automatic rotation, stars or continuous render loop.

Metate and Siku remain HUMAN HOLD for material/cultural acceptance. Preview deployment does not promote them to approved production families. Vercel protection remains enabled; a temporary share link was delivered separately and is intentionally not committed.

Post-deploy verification: Vercel reported READY with the exact preview commit. Rendered functional evidence was captured in CI against the identical source tree; it is not claimed to be a browser capture of the protected deployed URL.
