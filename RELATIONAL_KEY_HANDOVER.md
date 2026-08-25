# RELATIONAL KEY — HANDOVER

Updated: 2026-08-25
Repository: `Faadil1/relational-key-three-poc`
Working branch: `collection/consolidation-gate-1`

## Resume here

RELATIONAL KEY has completed **CONTINENTAL BALANCE GATE 1**.

Canonical invariant:
# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

Final merged distribution:
`AFRICA 4 / ASIA 3 / NORTH AMERICA 2 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

Latest family merge:
- Round 13M / Boulle
- squash merge `540923b02a8b8c8490809a8c381d9e9bfee29d99`

Family expansion is paused.

# ACTIVE PHASE — COLLECTION CONSOLIDATION GATE

C1 status:
# **INVENTORY + ARCHITECTURE FREEZE — PASS**

Read first:
1. `RELATIONAL_KEY_CURRENT_STATE.md`
2. `COLLECTION_CONSOLIDATION_C1_INVENTORY_ARCHITECTURE.md`
3. `collection/families.json`

## Critical discovery

The collection has 15 family slots, but validation is not perfectly uniform.

- 14 have documented user visual / visual+audio gates.
- Japan / Kento Register is the single debt.

Kento:
- branch `round13g/print-memory-kento`
- implementation doc `ROUND13G2_KENTO_REGISTER_IMPLEMENTATION.md`
- doc status `IMPLEMENTED / LIVE VISUAL AUDIT REQUIRED`
- live deployment `dpl_J74TMsqZS2uSWv8PuhLVGPfQfBev`
- Vercel state `READY`
- do not label PROMOTED until user visual audit closes this gate.

## Family source topology

### Six-family restored base
Source branch:
`round13r/relational-pair-restoration`

Contains the canonical restored versions of:
- Gatineau / Registered City Passage
- Benin / Service Register
- Nigeria / Signal Portrait
- Coyoacán / Frida Trace System
- Toyama / Edible Passage
- Asante-Bonwire / Woven Register

User audit:
`ROUND13R4_USER_LIVE_VISUAL_AUDIT.md` → PASS WITH POLISH

Golden multi-family deployment:
`dpl_26HsTL8cVqyzkkqm4oGtnVZZqehn`

### Dedicated validated branches still requiring source capture
- `round13e/craft-memory-zellige` → `dpl_4HV3s3QoWeKyBXaRfdR5zmWEFhzs`
- `round13f/record-memory-khipu` → `dpl_FidjRh6mX1XeDxVE6aXVKnFQbW9Z`
- `round13h/sound-memory-ombak` → `dpl_FCTw3Fxo3YYgZTP1iv2zyRyJZxXy`
- `round13i/navigation-memory-marshall` → `dpl_9ZypFYUDHAthPHpEM3AoxYG3PqUB`

### Candidate branch
- `round13g/print-memory-kento` → `dpl_J74TMsqZS2uSWv8PuhLVGPfQfBev` → audit required

### Later promoted / merged family sources
- `round13j/depth-memory-stereoscopy` → `dpl_4qQoTiev64vzU7tRLXmrYxtbrHjY`
- `round13k/melody-memory-siku` → `dpl_AgwdotABtjmYKDvnx3qoprtPEMsr`
- `round13l/ember-memory-hika-ahi` → `dpl_5nPKiFCMmRERDbDBug3bVvZzyQpR`
- `round13m/complement-memory-boulle` → `dpl_EK1wW4peLBk1f9KHg4T6nerJ4jFy`

## Architecture locked for consolidation

- snapshots live at `/families/<slug>/index.html`;
- source capture is immutable on import;
- no CSS/mechanism normalization during C2;
- machine registry is `/collection/families.json`;
- root collection shell comes only after snapshots exist;
- existing Vercel family projects remain golden regression references;
- final deployment will be one canonical RELATIONAL KEY project.

## Immediate next task

# **C2 — SOURCE CAPTURE & SNAPSHOT IMPORT**

Recommended order:
1. close Kento audit debt or explicitly mark candidate-only;
2. capture six restored base families;
3. capture Zellige / Khipu / Ombak / Swell;
4. capture Stereoscopy / Siku / Hika / Boulle;
5. add Kento only at its verified status;
6. verify all `/families/<slug>/` direct routes;
7. compare against golden references;
8. then proceed to C3 Collection Shell.

Do not start Global Refinement during source capture.

## Accidental PR note

PR #19 was an accidental placeholder created during the transition to consolidation. It was immediately closed, unmerged, with no code change. Ignore it.

## Persistence protocol

After every significant milestone update canonical state + this handover and state the next output explicitly.

If a new conversation starts here, resume at **C2 — SOURCE CAPTURE & SNAPSHOT IMPORT**.
