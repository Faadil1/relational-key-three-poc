# ROUND 13B.4.1 — ABOVE-THE-FOLD POSITIONING HOTFIX

## Trigger
Browser screenshot at ~1700×958 showed the V13B.4 scene still starting too low, leaving a large dead-space band between the compact header and the artifact/archive experience. The control deck consequently appeared to cut across the lower part of the object.

## Diagnosis
The desktop `.experience` container still inherited a fixed viewport-relative height and vertical centering behavior. Even though the hero copy had been removed, the scene was still being laid out inside a large centered stage instead of flowing immediately beneath the header.

## Correction
A dedicated `layout-hotfix.css` now overrides desktop positioning only:
- `.experience`: `height:auto`, `min-height:0`, `align-items:start`
- artifact/archive columns: `justify-content:flex-start`
- card: no vertical auto margin
- archive field and seam: explicit matched physical heights
- control deck: normal flow beneath the scene
- desktop large-screen sizes remain responsive

## Canonical intent
The first viewport should read:
HEADER → ARTIFACT / SEAM / ARCHIVE → CONTROLS

There should be no large decorative dead-space band between header and object.

## Deployment
Candidate: `relational-key-cultural-figure-frida-v1341`
Deployment: `dpl_9GMzq5UYHXwE9Zz3yoqcLJRwbczm`
Source commit pinned by deployment loader: `51cbab599ad75f60b510d65bcf7d770d57d8821d`

## Status
IMPLEMENTED / DEPLOYED
Browser validation required before PASS.
