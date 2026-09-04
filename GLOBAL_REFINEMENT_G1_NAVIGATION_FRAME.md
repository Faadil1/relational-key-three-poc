# RELATIONAL KEY — GLOBAL REFINEMENT G1 — COLLECTION NAVIGATION FRAME

Date: 2026-08-25
Branch: `collection/global-refinement-1`
Pre-refinement regression anchor: `79ba99ec739dfffb40563e9a89edfdffe0fdd3d5`
Draft PR: #21

## Goal
Add an explicit collection-level `← BACK TO ATLAS` affordance around every family route without rewriting family-native mechanisms.

## Implementation strategy

A collection wrapper now owns navigation and leaves each family mechanism beneath it.

Public route pattern:
`/families/<slug>/index.html`

Wrapper behavior:
- 44px collection frame above the family;
- `← BACK TO ATLAS` returns to `/#grid`;
- center label identifies the loaded family;
- right-side law states `THE PAIR IS THE PRODUCT`;
- family content is rendered in a full remaining-height iframe;
- mobile frame reduces to 42px and hides the right-side law.

Shared restored families:
- CITY / SERVICE / SIGNAL / FRIDA / FOOD / TEXTILE still load the exact shared runtime at `/families/_shared/round13r/index.html`;
- the wrapper selects the intended existing `data-e` state after iframe load;
- shared runtime blob remains `bed8c2fa6d2f40b9677d327ecfcd6c581238e14d`.

Autonomous families:
- their previously validated HTML was copied byte-identical to `snapshot.html` in the same family directory;
- public `index.html` now wraps that exact snapshot;
- keeping `snapshot.html` in the same directory preserves relative asset resolution.

Exact autonomous snapshot anchors:
- Zellige: `d2d5acff4a44c75a91825cc98808520d01bf1345`
- Khipu: `cdc06bebbc2054463f4d2f61e59e5de261979ef9`
- Kento: `b3d6a8b6b4384d7b13a0504bbecb3dba14075e36`
- Ombak: `70334d97a632cecea05bc2180a9a952dd86b91f2`
- Swell: `5a4249bddb97fc56d0d9a349ee5e440a999be94d`
- Stereoscopy: `a36695a0fc52040870f6175f1ac983e9a14dcb0d`
- Siku: `ac23037f3b2bda101e6bb83b5dfe9eefa6587b45`
- Hika Ahi: `32abce7eede0456c982fa96d1a80d9cdd5d1134a`
- Boulle: `1ba5e626cb00e46166481c90e3254b07e89585ae`

Shared wrapper blob used by all 15 route indexes:
`86f6b85796bec16dcb9077ed594a1ec86736b663`

Implementation commits:
- `760f4058a017cc761c8111aaffb27a308fe4ce65` — wrapper + exact snapshot copies
- `9644849b323db8af8dc659f5d12e744a064647da` — absolute-path hardening

## Source gate

Verified:
- 15 public route indexes use one wrapper implementation;
- 9 autonomous snapshots preserve their original validated blob SHA;
- shared round13r runtime is unchanged;
- wrapper occupies its own layout row rather than overlaying family controls;
- route targeting is absolute, avoiding trailing-slash ambiguity;
- navigation frame is collection-owned rather than inserted into family-native source.

## Verdict

# `G1 IMPLEMENTED / SOURCE PASS / LIVE REGRESSION REQUIRED`

Do not claim G1 PASS until a Global Refinement Preview verifies:
1. collection root still loads;
2. representative shared route initializes correctly;
3. representative autonomous snapshot initializes correctly;
4. `← BACK TO ATLAS` returns to the collection;
5. frame does not cover critical family controls at desktop;
6. mobile framing remains acceptable;
7. affected route set has no regression.

`SOURCE PASS ≠ LIVE REGRESSION PASS ≠ G1 PASS`.
