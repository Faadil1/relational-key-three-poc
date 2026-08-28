# RELATIONAL KEY — ÉTAT CANONIQUE COURANT

Date: 2026-08-28
Repository: `Faadil1/relational-key-three-poc`
Canonical working branch: `collection/global-refinement-1`
Draft PR: **#21 — RELATIONAL KEY — Global Refinement Pass**
PR status: `DRAFT / DO NOT MERGE`
Latest verified milestone: `CONTINENTAL_BALANCE_B2_3Q_EUROPE_SWISS_MUSIC_BOX_SPEC.md`

# PRODUCT INVARIANT

# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

Immutable pre-refinement anchor:
`79ba99ec739dfffb40563e9a89edfdffe0fdd3d5`

Completed refinement: G0 PASS → G1 PASS → G2 PASS → G3 PASS.
G4 polish remains PARKED until Balance Gate 2 closes.

# CONTINENTAL BALANCE GATE 2 — ACTIVE

Target:
`AFRICA 4 / ASIA 4 / NORTH AMERICA 4 / SOUTH AMERICA 4 / OCEANIA 4 / EUROPE 4`

Current validated:
# `AFRICA 4 / ASIA 3 / NORTH AMERICA 2 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

No research promotion, SOURCE PASS, READY deployment or route availability alone changes a validated count.

# SOURCE-PASS BUILD QUEUE — LIVE/USER PENDING

1. Astrolabe / Isfahan — build `ade670ad03513d972180ef78d717f174f585ed6c`, fix `a756e58d0bead32b90ca1f6470e68592be0c3d00`, blob `2903d6a8023e3ba56168f3efc05994c91a7e49f6`
2. Janney / Virginia — build `fa561bf4ebb20becaaee81856dc59f81b1e8b4c6`, blob `c054bdb50f8d5beafcbdbf48d66cd0cdadfc2cdc`
3. Metate + Metlapil — build `f62e6c2d2371205bdae4f498fe2f7670e17f09bd`, blob `8252beecb7ac6e7c1146cdb092813c2d5cb8a880`
4. Valparaíso Funicular — build `7aff21b59ff88fcbe3e526958cf9fdf67c0d3750`, blob `1e71497d7f9f5411eca2347b36bc0402db8b905b`
5. Mate + Bombilla — build `6b1a12b166b3be5612ba5b1d5a1f731281186379`, blob `6bdebcff2bd3c2b8c57f0c75dc72b20fcba37d55`
6. Tongiaki / Tonga — build `e577bd6669c0d32f41078fa3124a03539cecd460`, blob `55053022e5312274a250a3384a28c07abdcb2f6f`
7. Garamut / East Sepik-Ramu PNG — build `acb90a987f17c35ee94828f9433f5dd0055a0609`, blob `d78ec124d1111ba6a82137b58c0922fa7fdc1a36`
8. Catoptric Anamorphosis / Paris-France — build `a1e4ab388a1c75c4a90350d19a22ca478a43dc7d`, blob `ee44725b47b38079b3264f64e3fd0eb7c3837609`, source register `08a8c1cd57849b07fc501aad4dcb439ce7d0722e`

All eight remain `SOURCE PASS / LIVE + USER PENDING`.

# VERCEL

Latest identified READY Preview:
- `dpl_8GgBz2Kt81mr1YTLTR3UTk9UgMi4`
- URL `https://relational-key-collectionrelational-key-collection-55w553e3i.vercel.app`
- Git SHA `32b67f69b7ead0ff30f443e1efe803222afb31cd`

It contains ancestry through Mate + Bombilla, not the later Tongiaki/Garamut/Anamorphosis builds.
Astrolabe route fetched at HTTP 200.
Janney probe hit SSO 302; neither fail nor PASS.

# EUROPE +2 — ACTIVE

Validated Europe remains `2/4`.

Promotion matrix:
`CONTINENTAL_BALANCE_B2_2J_EUROPE_PROMOTION_MATRIX.md`
commit `e1c4cbfd1c24a34424402dea8eab18acee0b080d`

Promoted:
1. Catoptric Cylinder Anamorphosis / Paris-France
2. Swiss Cylinder Music Box / Swiss Jura

## Europe Slot 1 — Anamorphosis

Spec `CONTINENTAL_BALANCE_B2_3O_EUROPE_ANAMORPHOSIS_SPEC.md`, commit `b1c2c073df73cfc2fcfd829685f0d5f52a1d69e8`.
Build register `CONTINENTAL_BALANCE_B2_3P_EUROPE_ANAMORPHOSIS_BUILD_CANDIDATE.md`, register commit `08a8c1cd57849b07fc501aad4dcb439ce7d0722e`.
Candidate `families/anamorphosis-paris/candidate.html`, build `a1e4ab388a1c75c4a90350d19a22ca478a43dc7d`, blob `ee44725b47b38079b3264f64e3fd0eb7c3837609`.
Status `SOURCE PASS / LIVE + USER VISUAL PENDING`.

## B2.3Q — Europe Slot 2 Swiss Music Box Spec

Status:
# **SOURCE PASS / INTERACTION SPEC FROZEN**

Register:
# `CONTINENTAL_BALANCE_B2_3Q_EUROPE_SWISS_MUSIC_BOX_SPEC.md`

Spec commit:
# `988c2d0b9878008500aaf29a68107e171f2e03ca`

Identity:
- slug `music-box-sainte-croix`
- exact object anchor `Paillard & Cie. cylinder music box, Sainte-Croix, Switzerland, 1841`
- broader context `Swiss Jura mechanical-music tradition`
- memory `Mechanical Memory`
- edition `Pin-to-Comb Register`
- topology `R11 mechanical encode/decode`

Canonical law:
# **STORED PIN GEOMETRY BECOMES ORDERED NOTES WHEN A CYLINDER ENGAGES A TUNED COMB.**

Proof:
`PINNED CYLINDER ≠ TUNED COMB → ENGAGE → ROTATE → PIN CONTACT → TOOTH PLUCK → ORDERED NOTES`

Source truth:
- Swiss federal Museum of Music Automatons documents cylinders as sound carriers/storage media and set pins directly plucking tuned teeth in sequence;
- museum documentation states cylinder+comb is the traditional Swiss music-box principle;
- Smithsonian Paillard 1841 object documents cylinder + one-piece 51-tooth comb;
- companion 1838–1842 object documents spring/key drive;
- Museo Nicolis independently confirms pins on rotating cylinder pluck steel-comb teeth in predetermined sequence.

Interaction contract:
- Card A = pinned cylinder / stored sequence;
- Card B = tuned comb / physical decoder;
- explicit editorial engage stage allowed;
- after engagement, user directly rotates cylinder;
- no autoplay and no spring-motor simulation;
- deterministic editorial pin→tooth events;
- tooth visual response must work without audio;
- short synthetic tones only;
- OTHER CYLINDER = different valid editorial phrase;
- no wrong phrase state.

Truth boundaries:
- manual rotation substitutes for historical drive only to isolate cylinder↔comb relation;
- historical spring drive remains contextual;
- simplified pins/teeth and exact phrase are editorial;
- synthetic audio is not authentic Paillard timbre/tuning.

Validated Europe remains `2/4`.

# IMMEDIATE NEXT OUTPUT

# **B2.3R — SWISS CYLINDER MUSIC BOX AUTONOMOUS BUILD CANDIDATE + SOURCE GATE**

Required path:
`families/music-box-sainte-croix/candidate.html`

Acceptance:
- autonomous file only;
- separate cylinder + comb visible;
- engage stage;
- direct manual cylinder rotation;
- deterministic pin→tooth mapping;
- visible tooth response without audio;
- synthetic-audio and editorial-sequence labels;
- spring-drive context label;
- OTHER CYLINDER alternate-valid state;
- reset + keyboard fallback;
- JS syntax PASS;
- responsive CSS;
- no atlas/registry/public route mutation.

After B2.3R SOURCE PASS:
- update CURRENT_STATE + HANDOVER immediately;
- identify latest READY Preview containing all nine expansion candidates if available;
- then begin grouped live/user validation before any validated-count changes.

# G4 POLISH — PARKED

Khipu reversible candidate: `families/khipu-peru/g4-1.html`, commit `64647ea78b04439ea9a57ece47f19490d9185d45`.

# PERSISTENCE PROTOCOL — MANDATORY

After every meaningful milestone:
1. dedicated register;
2. update CURRENT_STATE;
3. update HANDOVER;
4. exact branch/commit/blob/deployment IDs;
5. SOURCE/LIVE/USER/VALIDATED separated;
6. exactly one next output.
