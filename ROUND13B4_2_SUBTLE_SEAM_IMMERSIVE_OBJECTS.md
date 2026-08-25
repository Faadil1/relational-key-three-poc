# ROUND 13B.4.2 — SUBTLE SEAM + IMMERSIVE OBJECTS

## Status
IMPLEMENTED IN GITHUB — DEPLOYMENT VALIDATION PENDING

## User feedback that triggered this pass
The connection between the credential and the archive counterpart remained too visually dominant, while the two objects themselves still felt too much like UI panels.

## New visual law
**OBJECTS FIRST → CONNECTION SECOND → EXPLANATION LAST**

Supporting principle:
**The relationship should be felt before it is diagrammed.**

## Changes
- Added `immersive-pass.css` after the positioning hotfix.
- Reduced the desktop seam column width.
- Reduced the idle junction from a large hero object to a 48px latent registration mark.
- Reduced idle seam rails to 3px with very low opacity.
- Removed idle outer junction rings and strong shadow/glow.
- Registration now wakes the seam up modestly rather than turning it into spectacle.
- Increased credential width and physical shadow/depth.
- Increased archive field width/height and reduced panel chrome.
- Reduced archive gaps/padding to make photographs feel more edge-to-edge.
- Added restrained image depth/hover scaling.
- Removed secondary object/archive notes on desktop.
- Reduced control deck visual weight so it cannot compete with the objects.
- Preserved real-image-only material, FRONT/BACK/MACRO, match/no-match semantics, drawer explanation, haptics and reduced-motion support.

## Truthfulness
No source, rights, or institutional claims changed. Visible cultural material remains real public-domain / CC0 photography. RELATIONAL KEY supplies composition, geometry and interaction only.

## Promotion gate
Do not merge PR #6 until browser review confirms:
1. the seam is clearly subordinate at rest,
2. it becomes legible only during registration,
3. the credential feels like a collectible object rather than a UI card,
4. the archive reads as an immersive counterpart rather than a dashboard,
5. controls remain secondary,
6. no-match remains calm and does not invalidate the credential.
