# RELATIONAL KEY — ÉTAT CANONIQUE COURANT

Date: 2026-08-25
Repository: `Faadil1/relational-key-three-poc`
Canonical working branch: `collection/consolidation-gate-1`
Latest verified milestone: `COLLECTION_CONSOLIDATION_C1_INVENTORY_ARCHITECTURE.md`

## Product invariant

# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

## Continental Balance Gate 1 — CLOSED

Round 13K — South America #2 — MERGED / CLOSED
- Siku / Interlock Register
- merge: `ca8851db034fac0cc60507d310b1623fb459366c`

Round 13L — Oceania #2 — MERGED / CLOSED
- Hika Ahi / Friction Register
- merge: `2e9cf84a11b2f5c08a7cf974b1f9b9530be88a4b`

Round 13M — Europe #2 — MERGED / CLOSED
- Boulle / Reciprocal Cut Register
- merge: `540923b02a8b8c8490809a8c381d9e9bfee29d99`

Final Gate 1 distribution:
# `AFRICA 4 / ASIA 3 / NORTH AMERICA 2 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

Family expansion is paused.

# ACTIVE PHASE — COLLECTION CONSOLIDATION GATE

Branch:
`collection/consolidation-gate-1`

C1 register:
`COLLECTION_CONSOLIDATION_C1_INVENTORY_ARCHITECTURE.md`

Machine-readable registry:
`collection/families.json`

## C1 verdict

Status:
# **INVENTORY + ARCHITECTURE FREEZE — PASS**

The collection contains 15 family slots.

Validation ledger:
- **14 families have documented user visual / visual+audio gates**;
- **1 family — Japan / Kento Register — is READY but still lacks a documented user visual audit**.

Kento source evidence:
`ROUND13G2_KENTO_REGISTER_IMPLEMENTATION.md` explicitly states `IMPLEMENTED / LIVE VISUAL AUDIT REQUIRED`.

Kento golden live:
`dpl_J74TMsqZS2uSWv8PuhLVGPfQfBev`

Therefore do not call Kento PROMOTED until that visual gate is closed.

## Consolidation architecture — LOCKED

1. Capture each family as an immutable source snapshot first.
2. Store family routes under `/families/<slug>/index.html`.
3. Do not normalize or rewrite family CSS / mechanism during import.
4. Maintain one registry at `/collection/families.json`.
5. Build one root collection shell after snapshots are captured.
6. Collection shell may normalize navigation / metadata / framing, but must not replace family-native mechanisms with one generic resolver.
7. Keep existing family Vercel deployments as golden regression references.
8. Final output becomes one canonical RELATIONAL KEY product + one canonical Vercel project.

## Source topology discovered

Not all validated families exist in the current base `index.html`.

Six restored families live in:
`round13r/relational-pair-restoration`

Additional validated family sources remain on dedicated branches:
- `round13e/craft-memory-zellige`
- `round13f/record-memory-khipu`
- `round13h/sound-memory-ombak`
- `round13i/navigation-memory-marshall`

Kento candidate source:
- `round13g/print-memory-kento`

Merged later-family sources:
- `round13j/depth-memory-stereoscopy`
- `round13k/melody-memory-siku`
- `round13l/ember-memory-hika-ahi`
- `round13m/complement-memory-boulle`

This means consolidation must be a deliberate source capture, not a simple refactor of the current `index.html`.

## Immediate next output

# **C2 — SOURCE CAPTURE & SNAPSHOT IMPORT**

Before final collection promotion:
1. close the missing Kento user visual gate, or retain it explicitly as candidate-only;
2. capture each validated family from its canonical source branch;
3. write immutable snapshots to `/families/<slug>/index.html`;
4. verify all direct routes;
5. compare imports against golden deployments;
6. no global refinement yet;
7. update canonical state + handover.

Status vocabulary:
`SOURCE CAPTURE ≠ COLLECTION SHELL ≠ GLOBAL REFINEMENT ≠ FINAL COLLECTION PASS`.

## Persistence protocol

After every significant milestone:
1. update this file;
2. update `RELATIONAL_KEY_HANDOVER.md`;
3. record source branch / commit / deployment / route identifiers;
4. state next output explicitly;
5. never infer an unverified pass.
