# RELATIONAL KEY — CONTINENTAL BALANCE B2.3F

Date: 2026-08-28
Branch: `collection/global-refinement-1`
Spec: `CONTINENTAL_BALANCE_B2_3E_NORTH_AMERICA_METATE_SPEC.md`

# NORTH AMERICA FAMILY ROUND 2 — METATE + METLAPIL BUILD CANDIDATE

Status:
# **SOURCE PASS / LIVE + USER VISUAL GATE PENDING**

Validated North America count remains:
# `2 / 4`

No atlas, registry, validated-count or public-route promotion occurs at this gate.

---

# Candidate

Path:
`families/metate-teotitlan/candidate.html`

Implementation commit:
# `f62e6c2d2371205bdae4f498fe2f7670e17f09bd`

Candidate blob at source gate:
# `8252beecb7ac6e7c1146cdb092813c2d5cb8a880`

Implementation compare:
- base `3f669872aff2d4397638b0324e97e9e450bf26f0`
- head `f62e6c2d2371205bdae4f498fe2f7670e17f09bd`
- one commit ahead;
- only `families/metate-teotitlan/candidate.html` added;
- 107 additions / 0 deletions;
- no existing family, shell, atlas, `collection/families.json`, wrapper or route changed.

---

# Frozen law implemented

# **PRESSURE AND RECIPROCAL STROKE BETWEEN COMPLEMENTARY STONES PRODUCE GRINDING.**

Implemented sequence:

`METATE ≠ METLAPIL → PAIR → CONTACT → DIRECT RECIPROCAL STROKE → ABRASION ACCUMULATES → FINER GRIND → CONTINUE`

Pair ownership:
- Card A owns metate + material field;
- Card B owns metlapil + direct drag interaction;
- center owns only contact/relationship metadata.

No central finished-product object exists.

---

# Interaction implementation

## Pair

`PAIR STONES`:
- transitions `idle → approach → contact`;
- pairing does NOT automatically advance grinding;
- metlapil becomes interactive only after contact.

## Direct metlapil work

Primary input:
- pointer/touch drag directly on the metlapil stone.

Keyboard fallback:
- Left/Right arrows when the metlapil is focused.

Working range:
- clamped to `−100…+100` display units.

Pass threshold:
- `EXTREME = 72`.

A pass is credited only after the metlapil reaches one deliberate extreme and subsequently reaches the opposite extreme.

Consequences:
- small local pointer jitter does not count;
- repeatedly shaking at one side does not count;
- first arrival at one edge only primes the reciprocal relation;
- movement to the opposite side increments one completed pass.

## Progressive grind state

Maximum represented progression:
- `MAX_PASSES = 8`.

Material labels:
- `COARSE` below 4 passes;
- `MEDIUM` from 4 passes;
- `FINE` from 7 passes.

The material particle field stays inside Card A and reduces in represented scale as passes accumulate.

The progress track is subordinate metadata below the pair, not a central product.

---

# Alternate-valid material contexts

Controls:
- `MAIZE`
- `CACAO`

Both are source-grounded valid grinding contexts.

Changing context:
- changes material color/label;
- does not invalidate either stone;
- does not create a success/failure test;
- does not claim scientifically accurate relative grinding rates.

---

# Reset

`RESET`:
- clears timers;
- restores `idle` relation;
- returns metlapil to center;
- resets passes to 0;
- restores coarse material;
- preserves selected valid material context;
- restores the two members as independent valid objects.

---

# Source / truthfulness treatment

Candidate footer includes:

`STRUCTURAL TRANSLATION · DOCUMENTED METATE ↔ METLAPIL GRINDING RELATION · NOT A UNIVERSAL OR EXCLUSIVE CULTURAL CLAIM`

Source footer anchors:
- Museo Nacional de Antropología / INAH `Metate zapoteco`;
- INAH glossary documentation;
- INAH research on Mesoamerican grinding technologies.

The UI explicitly states Teotitlán del Valle is a specific museum-context anchor and not an exclusivity claim for the technology.

No copied Zapotec motif, glyph or generic Mesoamerican decorative skin is used.

---

# Source checks

Passed:
- autonomous single-file candidate;
- exact implementation diff limited to candidate file;
- two bounded members remain primary in source architecture;
- direct metlapil input implemented;
- reciprocal extreme-to-extreme pass logic implemented;
- jitter cannot trivially increment progression;
- MAIZE / CACAO both valid;
- reset path implemented;
- source/truthfulness footer present;
- responsive CSS breakpoints present at `980px` and `560px`;
- JavaScript extracted from candidate passes `node --check`.

Not yet claimed:
- no live Preview containing this candidate confirmed;
- no user visual/interaction audit;
- no measured responsive visual PASS;
- no atlas entry;
- no public family route;
- North America count is NOT 3/4 or 4/4 yet.

---

# Grouped live-validation queue

When Vercel deployment capacity returns, prefer one descendant Preview containing all current source-pass candidates:
1. Astrolabe / Isfahan;
2. Janney Coupler / Virginia;
3. Metate + Metlapil / Teotitlán del Valle.

Each family still requires an independent user verdict even if one deployment hosts all three.

---

# Gate verdict

# **B2.3F — SOURCE PASS**

North America validated count remains `2 / 4`.

# Next output

# **B2.2E — SOUTH AMERICA +2 SOURCE-FIRST CANDIDATE POOL**

Existing South America mechanisms to avoid duplicating:
- Peru / Khipu — tension + knot registration;
- Bolivia / Siku — complementary absence + temporal interlock.

Research at least six credible source-grounded candidates before promoting two.
