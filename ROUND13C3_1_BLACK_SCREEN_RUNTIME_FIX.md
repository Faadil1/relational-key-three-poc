# ROUND 13C.3.1 — BLACK-SCREEN RUNTIME FIX

## Trigger
User browser validation of the first Edible Passage deployment returned a fully black screen.

## Diagnosis
The first Vercel candidate was marked READY, but the deployment path was still coupled to the ambient Figma/Vite project rather than the Food Memory implementation itself. READY therefore proved transport/build completion, not that the intended Edible Passage document was being served.

The GitHub `food.js` implementation was reviewed and does not contain an obvious first-frame fatal error. The failure was treated as a deployment-source mismatch rather than a visual-design issue.

## Recovery
1. Added `food-standalone.html`: one self-contained Food Memory document with CSS and interaction inline.
2. Removed reliance on the ambient Figma shell, iframe/loader routing, React runtime, or external JS modules.
3. Recreated the Vercel deployment by sending the standalone HTML itself as the deployment file payload.
4. The document renders its full static hierarchy before any JavaScript interaction, so a JS interaction fault should no longer produce a completely empty page.
5. Wikimedia/Commons images remain external real-image sources; missing image loads degrade locally rather than blanking the whole application.

## Current recovery deployment
Project: `relational-key-food-memory-ekiben-v13c3-fixed`
Deployment: `dpl_6SdpLbHEdWCDbrwPf7F1W6QJrNDw`
Alias: `https://relational-key-food-memory-ekiben-v13c3-fixed-faadil1s-projects.vercel.app`

## Status
- First V13C.3 deployment: REJECTED / BLACK SCREEN
- GitHub Food implementation: retained
- Standalone recovery: implemented
- Vercel recovery deployment: READY
- Browser visual/runtime confirmation: PENDING
- PR #7: DO NOT MERGE

## Gate
Do not continue visual refinement until the recovery deployment visibly renders the Food Memory interface in the user's browser.
