# COLLECTION CONSOLIDATION GATE — C1 INVENTORY & ARCHITECTURE FREEZE

Date: 2026-08-25
Repository: `Faadil1/relational-key-three-poc`
Branch: `collection/consolidation-gate-1`
Base merge: `540923b02a8b8c8490809a8c381d9e9bfee29d99`

## Gate transition

Continental Balance Gate 1 is complete.

Distribution:
`AFRICA 4 / ASIA 3 / NORTH AMERICA 2 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

Family expansion is paused.

The active phase is now:
# **COLLECTION CONSOLIDATION GATE**

Canonical invariant remains:
# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

## Inventory — 15 family slots

| # | Continent | Edition / mechanism | Canonical source | Golden / audit reference | Validation state |
|---|---|---|---|---|---|
| 01 | North America | Gatineau — Registered City Passage | `round13r/relational-pair-restoration` | `dpl_26HsTL8cVqyzkkqm4oGtnVZZqehn` | PASS WITH POLISH |
| 02 | Africa | Benin — Service Register / Service as Storyboard | `round13r/relational-pair-restoration` | `dpl_26HsTL8cVqyzkkqm4oGtnVZZqehn` | PASS WITH POLISH |
| 03 | Africa | Nigeria — Signal Portrait / Infrastructure as Portrait | `round13r/relational-pair-restoration` | `dpl_26HsTL8cVqyzkkqm4oGtnVZZqehn` | PASS WITH POLISH |
| 04 | North America | Coyoacán / Frida — Cultural Figure / Trace System | `round13r/relational-pair-restoration` | `dpl_26HsTL8cVqyzkkqm4oGtnVZZqehn` | PASS WITH POLISH |
| 05 | Asia | Toyama — Food Memory / Edible Passage | `round13r/relational-pair-restoration` | `dpl_26HsTL8cVqyzkkqm4oGtnVZZqehn` | PASS WITH POLISH |
| 06 | Africa | Asante / Bonwire — Textile Memory / Woven Register | `round13r/relational-pair-restoration` | `dpl_26HsTL8cVqyzkkqm4oGtnVZZqehn` | PASS WITH POLISH |
| 07 | Africa | Fès — Craft Memory / Zellige Register | `round13e/craft-memory-zellige` | `dpl_4HV3s3QoWeKyBXaRfdR5zmWEFhzs` | PASS WITH POLISH |
| 08 | South America | Peru — Record Memory / Khipu Knotted Register | `round13f/record-memory-khipu` | `dpl_FidjRh6mX1XeDxVE6aXVKnFQbW9Z` | PASS WITH POLISH |
| 09 | Asia | Japan — Print Memory / Kento Register | `round13g/print-memory-kento` | `dpl_J74TMsqZS2uSWv8PuhLVGPfQfBev` | **READY / USER VISUAL AUDIT REQUIRED** |
| 10 | Asia | Bali — Sound Memory / Ombak Register | `round13h/sound-memory-ombak` | `dpl_FCTw3Fxo3YYgZTP1iv2zyRyJZxXy` | PASS WITH POLISH |
| 11 | Oceania | Marshall Islands — Navigation Memory / Swell Register | `round13i/navigation-memory-marshall` | `dpl_9ZypFYUDHAthPHpEM3AoxYG3PqUB` | PASS WITH POLISH |
| 12 | Europe | United Kingdom — Depth Memory / Binocular Register | `round13j/depth-memory-stereoscopy` | `dpl_4qQoTiev64vzU7tRLXmrYxtbrHjY` | VISUAL PASS / MERGED |
| 13 | South America | Bolivia — Melody Memory / Siku Interlock Register | `round13k/melody-memory-siku` | `dpl_AgwdotABtjmYKDvnx3qoprtPEMsr` | VISUAL+AUDIO PASS / MERGED |
| 14 | Oceania | Aotearoa — Ember Memory / Hika Ahi Friction Register | `round13l/ember-memory-hika-ahi` | `dpl_5nPKiFCMmRERDbDBug3bVvZzyQpR` | VISUAL PASS / MERGED |
| 15 | Europe | France — Complement Memory / Boulle Reciprocal Cut Register | `round13m/complement-memory-boulle` | `dpl_EK1wW4peLBk1f9KHg4T6nerJ4jFy` | VISUAL PASS / MERGED |

## Validation debt discovered in C1

Kento is the only slot without a documented user visual gate.

Its implementation register explicitly says:
`IMPLEMENTED / LIVE VISUAL AUDIT REQUIRED`.

Therefore:
- Kento may be imported as a candidate snapshot;
- Kento must not be labeled PROMOTED in the canonical collection until its visual gate is closed;
- the canonical collection currently has **14 user-validated families + 1 live candidate requiring audit**.

This does not reopen Kento research or concept selection. It is a missing validation gate only.

## Consolidation architecture — LOCKED FOR C2

### 1. Immutable family snapshots first

Every family is captured from its validated source branch into:

`/families/<slug>/index.html`

Examples:
- `/families/city-gatineau/`
- `/families/service-benin/`
- `/families/zellige-fes/`
- `/families/khipu-peru/`
- `/families/stereoscopy-uk/`
- `/families/siku-bolivia/`
- `/families/hika-ahi-aotearoa/`
- `/families/boulle-france/`

Import rule:
# **SNAPSHOT FIRST — NO REWRITE DURING IMPORT.**

Do not normalize CSS, animation timing, interaction logic, or cultural material while capturing a family.

### 2. One machine-readable registry

Create:
`/collection/families.json`

Each record must include at minimum:
- id / slug;
- edition name;
- country / place;
- continent;
- memory family;
- relational mechanism / law;
- source branch;
- golden deployment;
- validation state;
- route;
- polish backlog flag.

### 3. One canonical collection shell

The root product becomes a collection/navigation layer, not another family interaction.

Required collection functions:
- browse all families;
- filter by continent;
- filter by relational mechanism / memory family;
- open a family as a full interaction;
- preserve direct family URLs;
- show validation state internally during build;
- later support compare/explore without flattening family interactions into static cards.

### 4. Family interaction remains autonomous

The collection shell must never turn the 15 mechanisms into one generic resolver animation.

Shared product grammar may include navigation, typography, spacing, metadata and transition framing.

Mechanism-specific behavior remains family-native.

### 5. Golden references remain external regression anchors

Existing family Vercel projects are not deleted during consolidation.

They remain comparison evidence for visual regression and mechanism fidelity.

### 6. One final deployment

After source capture + collection shell + regression audit, deploy one canonical RELATIONAL KEY Vercel project.

Per-family deployments remain archive/golden references only.

## C2 required output

# **C2 — SOURCE CAPTURE & SNAPSHOT IMPORT**

Sequence:
1. close Kento visual-gate debt or keep it explicitly candidate-only;
2. create `collection/families.json`;
3. capture source snapshots for all validated family implementations;
4. place each under `/families/<slug>/index.html`;
5. verify every direct route loads independently;
6. compare each imported route against its golden reference;
7. no global visual refinement yet;
8. update canonical state + handover.

`SOURCE CAPTURE ≠ COLLECTION SHELL ≠ GLOBAL REFINEMENT ≠ FINAL COLLECTION PASS`.
