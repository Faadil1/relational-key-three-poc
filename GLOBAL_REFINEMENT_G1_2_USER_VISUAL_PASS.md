# RELATIONAL KEY — GLOBAL REFINEMENT G1.2

## USER VISUAL NAVIGATION REGRESSION — PASS

Date: 2026-08-26
Branch: `collection/global-refinement-1`
PR: #21 — Global Refinement Pass
Preview deployment: `dpl_87Bjr4pRX1sMQTBUE731gt42WeQA`
Deployed SHA: `ffdbb21a4553e997e387e879c1a5c692b677c787`

## User capture

- duration: 6.13 s
- resolution: 1908 × 962
- frame rate: 30 fps

## Verified visually

1. Atlas opens the shared Gatineau family route.
2. The collection-owned navigation frame is clearly visible above the native family runtime.
3. `← BACK TO ATLAS` remains visually distinct from family controls.
4. The wrapper occupies its own row; it does not overlay or obscure the native family controls.
5. Gatineau native controls remain fully visible and usable below the frame.
6. `← BACK TO ATLAS` returns to `/#grid` at the Relational Atlas section rather than the top of the page.
7. The atlas state remains structurally intact after return.

## Autonomous-family evidence

A second autonomous family was not reopened in this 6.13 s capture. This is non-blocking for G1 because:
- all 15 public family indexes use the same byte-identical wrapper blob;
- `/families/zellige-fes/` was already confirmed HTTP 200 on the same deployment during G1.1;
- its public index served the same wrapper source;
- autonomous mechanism snapshots remain byte-identical regression anchors beneath the wrapper.

## Responsive note

The wrapper contains the G1 mobile layout rule (42 px row, Back + context, tertiary law hidden below 680 px). Full collection responsive visual refinement remains in G2 and final responsive regression remains in G6.

## Verdict

# `G1 — PASS`

The navigation frame succeeds as collection-owned infrastructure without becoming part of, or obscuring, the family mechanisms.

Next:
# `G2 — SHELL LEGIBILITY`
