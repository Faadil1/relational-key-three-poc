# COLLECTION CONSOLIDATION — C2A DEDICATED SNAPSHOT IMPORT

Date: 2026-08-25
Branch: `collection/consolidation-gate-1`

## Scope

Capture the nine families that already exist as one self-contained `index.html` per canonical source branch.

Import rule:
**COPY SOURCE BLOB EXACTLY — NO REWRITE DURING C2A.**

The imported HTML blob must be byte-identical to the source branch `index.html` blob. This preserves validated interactions before any collection-shell work.

## Snapshot routes / source blobs

- `/families/zellige-fes/index.html` ← `round13e/craft-memory-zellige:index.html` — blob `d2d5acff4a44c75a91825cc98808520d01bf1345`
- `/families/khipu-peru/index.html` ← `round13f/record-memory-khipu:index.html` — blob `cdc06bebbc2054463f4d2f61e59e5de261979ef9`
- `/families/kento-japan/index.html` ← `round13g/print-memory-kento:index.html` — blob `b3d6a8b6b4384d7b13a0504bbecb3dba14075e36`
- `/families/ombak-bali/index.html` ← `round13h/sound-memory-ombak:index.html` — blob `70334d97a632cecea05bc2180a9a952dd86b91f2`
- `/families/swell-marshall/index.html` ← `round13i/navigation-memory-marshall:index.html` — blob `5a4249bddb97fc56d0d9a349ee5e440a999be94d`
- `/families/stereoscopy-uk/index.html` ← `round13j/depth-memory-stereoscopy:index.html` — blob `a36695a0fc52040870f6175f1ac983e9a14dcb0d`
- `/families/siku-bolivia/index.html` ← `round13k/melody-memory-siku:index.html` — blob `ac23037f3b2bda101e6bb83b5dfe9eefa6587b45`
- `/families/hika-ahi-aotearoa/index.html` ← `round13l/ember-memory-hika-ahi:index.html` — blob `32abce7eede0456c982fa96d1a80d9cdd5d1134a`
- `/families/boulle-france/index.html` ← `round13m/complement-memory-boulle:index.html` — blob `1ba5e626cb00e46166481c90e3254b07e89585ae`

## Gate

C2A passes only when all nine routes exist on the consolidation branch with the exact source blob SHA.

No visual polish, navigation injection, CSS normalization, or mechanism refactor is allowed in this step.
