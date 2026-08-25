# ROUND 13J.4 — DEPTH EMERGENCE VISUAL PATCH

Status: PATCH IMPLEMENTED / REDEPLOY + USER VISUAL RE-AUDIT REQUIRED

## Gate that triggered this patch

The first live visual audit passed the family concept, pair-native architecture, controlled-disparity law, Matching View semantics, and Other View semantics.

The only failed visual criterion was perceptual emergence:

> Depth was understandable, but still read too much like UI drawn over the stereograph rather than spatial information emerging from the pair itself.

## Patch objective

Preserve the existing family and interaction architecture while making `FUSE → DEPTH` happen primarily inside the photographic material.

No redesign of the cards, source material, controls, or Other View was authorized.

## Changes

### 1. Separate runtime phases

The previous Matching View moved directly into a generic `registered` visual state.

It now uses distinct phases:

`approach → fused → depth → registered`

The canonical interaction remains:

`OFFSET → APPROACH → PAIR → FUSE → DEPTH → REGISTER → CONTINUE`

### 2. Paired photographic parallax

The fusion field now contains three editorial depth bands:

- `depthBack`
- `depthMid`
- `depthFore`

Each band is composited from **both** stereoscopic source views. During `DEPTH`, the bands separate by only a few pixels and slightly different scale values, producing an illustrative layered-space cue before settling at registration.

This is intentionally not a recovered or measured historical depth map.

### 3. Diagram becomes secondary

The three rectangular depth planes are retained as a transitional search cue during `FUSE`, but their opacity collapses during `DEPTH` and `REGISTER`.

The intended proof is now the changing photograph rather than the diagram around it.

### 4. Fusion field emphasis

The center briefly scales up during `DEPTH` and settles back during `REGISTER` so the emergent relational result receives a perceptual beat without becoming a third product card.

### 5. Other View preserved

`OTHER VIEW` is intentionally unchanged in logic:

- larger residual remains visible;
- no single depth cue is selected;
- both views remain valid;
- no card is marked as wrong or rejected.

## Truthfulness boundary

The central layered parallax remains an editorial translation of the documented stereoscopic principle.

It does **not** claim:

- exact interocular geometry;
- historical optical calibration;
- a reconstructed depth map of the 1871 stereocard;
- that the interface existed historically.

## Patch commit

`f2ae7fbb3903db4d4c1ba1dd4190bdc5ed057dc8`

## Deployment state

At the time of this checkpoint, Vercel had **not** produced a new deployment from the GitHub patch. The previously audited deployment remains the latest deployment and must not be treated as evidence for this patch.

## Required gate

Redeploy the patched branch, then re-audit:

1. `MATCHING VIEW → TEST RELATIONSHIP`
2. verify the photograph itself opens into layered space during `DEPTH`;
3. verify the depth planes no longer dominate the proof;
4. verify the temporary center scale does not turn the fusion field into a third card;
5. `OTHER VIEW → TEST RELATIONSHIP`
6. verify unresolved disparity still reads as non-registration rather than object invalidation.

`PATCH IMPLEMENTED ≠ VISUAL PASS.`
