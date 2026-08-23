# V3 Runtime Hotfix

Date: 2026-08-23

## Failure observed
The V3 page shell rendered, but the Three.js canvas stayed blank.

## Root cause
The first animation frame in the deployed bundle referenced `g` without declaring it in ES-module strict mode, causing a runtime `ReferenceError` before `renderer.render(...)`.

## Fix
The render loop now declares the gap explicitly:

```js
const g = gap();
```

The production hotfix also adds:
- an initial `renderOnce()` before the animation loop;
- a guarded animation loop with a visible runtime fallback instead of a silent blank canvas;
- the same Family Plus / ROAM and Standard / ASTC semantic resolver scenarios.

## Production verification
Vercel deployment: `dpl_DE78ei5gUnqJEQTpa4pFD2s3AMFN`

Production alias:
https://relational-key-relational-instrument-v3-faadil1s-projects.vercel.app

HTTP delivery: 200 OK.

The served production source has been re-read and confirms the corrected `const g = gap();` declaration and runtime guard.

## Gate
Delivery/source verification: PASS
Independent visual browser validation: PENDING
Do not merge V3 until the canvas and interaction are visually verified in-browser.
