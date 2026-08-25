# ROUND 13K.4 — SIKU IMPLEMENTATION GATE

Status: **IMPLEMENTED / LOCAL STRUCTURE + SYNTAX PASS / DEPLOYMENT REQUIRED**

Branch: `round13k/melody-memory-siku`

Implementation commit:
`2522c651055404fd78dc9748eee75bfd9ee2dd5d`

## Edition

**MELODY MEMORY — BOLIVIA / SIKU — INTERLOCK REGISTER**

Canonical law:

**COMPLEMENTARY ABSENCE PRODUCES CONTINUITY.**

Canonical proof:

`IRA ≠ ARKA → ALTERNATION → ONE MELODY`

## Product invariant

**THE RELATIONAL PAIR REMAINS THE PRODUCT.**

Two distinct CR80-like relational cards are visible from the first frame.

- Card A — `IRA`
- Card B — `ARKA`
- Gap — `MELODY INTERLOCK FIELD`

## Real-source material

Primary visual:
`https://commons.wikimedia.org/wiki/File:Siku_bipolar.jpg`

The Wikimedia Commons source describes a typical bipolar siku made in Bolivia, separated for performance by two musicians. The source identifies the left half as Arka and the right half as Ira.

License:
**Public Domain / PD-self.**

Implementation mapping:
- Card A / IRA uses the right half of the source image.
- Card B / ARKA uses the left half.

No generic panpipe illustration replaces the real pair.

## Signature interaction

`NOTE → GAP → ANSWER → INTERLOCK → SCALE → MELODY → REGISTER → CONTINUE`

## Matching Interlock

The center is intentionally **not a waveform** and **not a resonance field**.

Eight illustrative temporal slots form a stepped central route.

Source ownership alternates:
- IRA contributes slots 1, 3, 5, 7;
- ARKA contributes slots 2, 4, 6, 8.

The selected route becomes visually continuous only after both cards contribute.

Matching sequence:
1. `NOTE` — IRA contributes the first event.
2. `GAP` — the next position remains visibly absent on IRA.
3. `ANSWER` — ARKA supplies the complementary next position.
4. `INTERLOCK` — source ownership continues alternating left/right.
5. `SCALE` — distributed positions begin to read as one route.
6. `MELODY` — the final target slot closes the continuous route.
7. `REGISTER` — continuity stabilizes while source ownership remains visible.
8. `CONTINUE` — both instruments remain distinct.

## Other Interlock

`OTHER INTERLOCK` is an editorial demonstration state, not a judgment that a historical siku half is invalid.

Behavior:
- both cards produce valid illustrative note events;
- selected slots 4 and 7 remain visibly silent;
- the route never receives the final continuity glow;
- no red X appears;
- both complements persist;
- final result: target phrase not completed.

This preserves calm resistance.

## Audio implementation

Audio uses browser Web Audio synthesis initiated only by user interaction.

Current illustrative tone map:
`261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25 Hz`

These frequencies are **not claimed to reproduce a documented siku tuning**.

Audio design:
- short predominantly non-overlapping tones;
- IRA panned left;
- ARKA panned right;
- sine fundamental + restrained triangle overtone;
- no simultaneous near-unison tones;
- no beat-frequency proof.

The UI explicitly states that the exact phrase and synthesis are illustrative and are not archival audio, instrument calibration or a claimed traditional melody.

## Critical distinction from Ombak

Ombak:
`SIMULTANEOUS NEAR-UNISON DIFFERENCE → BEAT / RESONANCE`

Siku:
`DISTRIBUTED COMPLEMENTARY NOTE POSITIONS → ALTERNATION → CONTINUITY`

Implementation guardrails:
- no waveform visual;
- no beating circles;
- no frequency-difference display;
- no resonance terminology in the proof field.

## Visual architecture

Card A and Card B use the same public-domain source photograph but expose opposite documented halves.

Each card carries four small editorial source markers.

The center contains:
- eight alternating source slots;
- a faint dotted target route;
- a continuous route glow that appears only for Matching Interlock;
- explicit IRA / ARKA ownership below each slot.

The central field expands only slightly on successful melody formation and never becomes a third card.

## Responsive behavior

At widths below 960px:
- the pair stacks into one column;
- card translations are disabled;
- the central interlock field remains between the two cards;
- source identities and the pair relationship remain visible.

At widths below 560px:
- header and controls stack;
- instrument windows are reduced to preserve card legibility.

## Local validation

Verified before source push:
- HTML title present;
- duplicate DOM IDs: none;
- score slots: 8;
- IRA markers: 4;
- ARKA markers: 4;
- `MATCHING INTERLOCK` present;
- `OTHER INTERLOCK` present;
- explicit `NOT A WAVEFORM` guardrail present;
- AudioContext implementation present;
- silent/missing-slot behavior present;
- inline JavaScript: `node --check` PASS.

## Truthfulness boundary

Documented principle:
- complementary siku halves divide musical material and can be performed by separate musicians in alternation / hocket to create one scale and melody.

Editorial translation:
- CR80 cards;
- exact eight-slot note map;
- exact demonstration phrase;
- selected frequencies;
- source-marker colors;
- central score route;
- Matching / Other Interlock UI.

No claim is made that the interface, frequency map or demonstration phrase is historical.

## Gate decision

**IMPLEMENTATION GATE — PASS FOR DEPLOYMENT.**

This is not a visual or audio pass.

`IMPLEMENTED ≠ READY ≠ LIVE CANDIDATE ≠ USER VISUAL/AUDIO PASS`.

## Next required output

1. create Draft PR / DO NOT MERGE;
2. deploy a dedicated Vercel candidate without overwriting existing family deployments;
3. verify deployment READY and source/live sync;
4. user audit:
   - Matching Interlock visual alternation;
   - Matching Interlock audio alternation;
   - emergence of one continuous route;
   - Other Interlock silent gaps;
   - both cards remain valid;
   - center does not read as waveform/resonance;
5. only then decide `PASS / PATCH / REJECT`.
