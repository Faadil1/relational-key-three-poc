# RELATIONAL KEY V2.0A — Pilot Archive Refresh 001

Status: **STRONG ANCHORS FOUND / CORPUS INCOMPLETE / V2.1 BUILD HOLD**
Pilots:
1. `anamorphosis-paris`
2. `coupler-virginia`
3. `ombak-bali`

This is a source register seed, not final corpus promotion.

The V2 preferred corpus minimum remains 12+ distinct records where reasonably available, 2+ source families, and at least one institutional/first-party source when reasonably available.

---

# 1. ANAMORPHOSIS PARIS — Optical / Spatial Pilot

## Mechanism target

`DISTORTED FIELD → CURVED REFLECTION → RECTIFIED LEGIBILITY`

## Strong source anchors

### ANA-A01 — The Metropolitan Museum of Art — Jean François Niceron / circle

Object: **Soldier on Horseback in Catoptric Anamorphosis (after Hendrick Goltzius)**  
Date: ca. 1620–40  
Institution: The Metropolitan Museum of Art  
Object number: `2013.203`  
URL: `https://www.metmuseum.org/art/collection/search/405839`

Source facts useful to V2:
- French / Paris-linked Jean François Niceron;
- object is explicitly identified as catoptric anamorphosis;
- distorted fan-shaped drawing becomes meaningful via mirror-based optical relation;
- Met marks the image **Public Domain** and offers Open Access use.

Use class:
- `DIRECT_VISUAL_REFERENCE` for public-domain study/reference;
- `MECHANISM_ONLY` for the V2 transformation law;
- do not simply texture-map the historical drawing and call the pilot complete.

### ANA-A02 — The Metropolitan Museum of Art — Hans Troschel after Simon Vouet

Object: **Satyrs Admiring the Anamorphosis of an Elephant**  
Date: 17th century  
Institution: The Metropolitan Museum of Art  
Object number: `45.97(78)`  
URL: `https://www.metmuseum.org/art/collection/search/393576`

Source facts useful to V2:
- the distorted drawing resolves as an elephant in a cylindrical mirror;
- the source connects the design to Simon Vouet and Niceron’s *La Perspective curieuse*;
- Met marks the image **Public Domain**.

Use class:
- `DIRECT_VISUAL_REFERENCE` / `MECHANISM_ONLY`.

### ANA-A03 — The Met — “Anamorphosis: The Playground of Perspective”

Institutional exhibition page:  
`https://www.metmuseum.org/exhibitions/listings/2013/drawings-and-prints-august-rotation`

Source facts useful to V2:
- explicitly describes catoptric anamorphosis using a **reflecting cylindrical mirror**;
- states the installation demonstrated step-by-step how the optical distortion was made;
- references multiple seventeenth-to-nineteenth-century examples.

Use class:
- `MECHANISM_ONLY` / `CONTEXT_ONLY`.

### ANA-A04 — The Met audiovisual archive — De Artificiali Perspectiva, or Anamorphosis

URL: `https://www.metmuseum.org/perspectives/from-the-vaults-de-artificiali-perspectiva`

Source facts useful to V2:
- describes anamorphosis as an image becoming visible from a different angle or in a curved mirror;
- useful as process/context evidence, not as an animation asset to copy.

Use class:
- `MECHANISM_ONLY` / `CONTEXT_ONLY`.

## V2 archive-derived interaction implication

The pilot should implement genuine curved-mirror remapping or a physically credible optical approximation. A texture crossfade, mask reveal or generic “magic mirror” effect fails Archive Specificity.

## Current corpus verdict

`PARTIAL_STRONG` — institutional/public-domain anchors are excellent, but expand the corpus before build authorization to include additional objects/diagrams and cylindrical-mirror construction references.

---

# 2. COUPLER VIRGINIA — Mechanical Contact / Load Pilot

## Mechanism target

`CONTACT → ROTARY KNUCKLE / HOOK → CATCH / LOCK → LOAD PATH`

## Strong source anchors

### COU-A01 — National Museum of American History — Janney Coupler model

Object: **Janney Coupler**  
Date: ca. 1870  
Institution: Smithsonian National Museum of American History  
Record: `nmah_881750`  
URL: `https://americanhistory.si.edu/collections/object/nmah_881750`

Use class:
- `SPATIAL_REFERENCE` / `MECHANISM_ONLY` pending image-rights review.

### COU-A02 — National Museum of American History — Janney rail coupler

Object: **coupler, janney**  
Record: `nmah_841985`  
URL: `https://americanhistory.si.edu/collections/object/nmah_841985`

Use class:
- `SPATIAL_REFERENCE` / `MATERIAL_REFERENCE` / `MECHANISM_ONLY`.

### COU-A03 — National Museum of American History — coupler ca. 1890

Object type: Coupler; Rail  
Date: ca. 1890  
Record: `nmah_843236`  
URL: `https://americanhistory.si.edu/collections/object/nmah_843236`

Use class:
- `SPATIAL_REFERENCE` / `MECHANISM_ONLY`.

### COU-A04 — National Museum of American History — Miller-Janney automatic coupler

Date: ca. 1885  
Record: `nmah_843709`  
URL: `https://americanhistory.si.edu/collections/object/nmah_843709`

Use class:
- `SPATIAL_REFERENCE` / `MECHANISM_ONLY`.

### COU-A05 — Smithsonian Archives Center — “Coupler, Janney”

Collection: Division of Transportation Railroad Reference Files  
Item: Box 44, Folder 4  
Record: `NMAH.AC.0523_ref525`  
URL: `https://americanhistory.si.edu/collections/archival-item/sova-nmah-ac-0523-ref525`

Use class:
- `CONTEXT_ONLY` / potential `SPATIAL_REFERENCE` after inspection.

### COU-A06 — Smithsonian Railroad Trade Literature Collection — Janney Coupler Catalog

Record listing: **“Janney Coupler (Catalog),” 1899**  
Collection: NMAH Railroad Trade Literature Collection  
URL: `https://americanhistory.si.edu/collections/archival-collection/sova-nmah-ac-1136`

Use class:
- `MECHANISM_ONLY` / `SPATIAL_REFERENCE` after record inspection.

### COU-A07 — U.S. National Archives — Patent record context

National Archives Prologue article:  
`https://www.archives.gov/publications/prologue/1997/spring/railroad-records`

Useful documented facts:
- Janney identified as of Alexandria, Virginia;
- patent #138,405 issued in 1873;
- patent jacket includes petition, specifications, correspondence and printed drawings;
- mechanism described as combining a **rotary hook and catch** with a **guard-arm**;
- source quotes Janney’s description that coupling occurs if one hook is open but not if both are closed.

Use class:
- `PRIMARY_MECHANISM_EVIDENCE` / `CONTEXT_ONLY`.

### COU-A08 — U.S. Patent 138,405 — Improvement in Car-Couplings

Patent: `US138405A`  
Inventor: Eli H. Janney, Alexandria, Virginia  
Date: April 29, 1873  
URL: `https://patents.google.com/patent/US138405A/en`

Useful mechanics:
- hook + catch + guard arm;
- top, reversed plan, sectional and side-elevation drawings.

Use class:
- `PRIMARY_MECHANISM_EVIDENCE` / `SPATIAL_REFERENCE`.

## V2 archive-derived interaction implication

The pilot must not use a magnetic snap. The memorable moment must show a mechanically legible approach/contact, rotary-hook/knuckle response, lock state and subsequent load transfer.

The exact modern AAR coupler should not be assumed to be identical to the 1873 patent model. V2 must pick and label the specific historical/mechanical reference it models.

## Current corpus verdict

`PARTIAL_STRONG` — already multi-source and highly mechanical. Expand to 12+ records and resolve which historical geometry is the actual V2 modeling target before implementation.

---

# 3. OMBAK BALI — Temporal / Resonance Pilot

## Mechanism target

`PAIRED SOURCES WITH CONTROLLED DIFFERENCE → INTERFERENCE / BEATING → SHARED TEMPORAL ENVELOPE`

## Strong source anchors

### OMB-A01 — MIT Press, Computer Music Journal — Exploring the Many Tunings of Balinese Gamelan

Article: **Exploring the Many Tunings of Balinese Gamelan**  
URL: `https://direct.mit.edu/comj/article/47/2/21/124238/Exploring-the-Many-Tunings-of-Balinese-Gamelan`

Useful evidence:
- describes a Gamelan Tuning Explorer using measured tuning data from **47 complete gamelan gong kebyar**;
- identifies consistent use of **ombak**, prominent beating between two paired notes played in “unison”;
- explicitly treats paired-tuning ombak as an interactive/visualizable tuning concept.

Use class:
- `MECHANISM_ONLY` / `TEMPORAL_REFERENCE`;
- article figures/data require their own rights review before direct reproduction.

### OMB-A02 — Smithsonian National Museum of Asian Art — Acoustic Concept essay

Essay: **Lightbulb Ensemble: The Acoustic Concept of an American Gamelan**  
URL: `https://asia.si.edu/research/essays/baumbusch/`

Useful evidence:
- explains paired `+ / –` tuning and beating relationships;
- describes Balinese gong kebyar paired instruments and discusses approximately fixed beating relationships across registers;
- useful for understanding amplitude beating as a relation between paired sources.

Use class:
- `MECHANISM_ONLY` / `TEMPORAL_REFERENCE` / `CONTEXT_ONLY`.

### OMB-A03 — Smithsonian National Museum of Asian Art — Kamasan tuning context

Essay: **Defending the Past, Present, and Future of Gamelan Semara Pegulingan Saih Pitu in Kamasan, Bali**  
URL: `https://asia.si.edu/essays/article-yamin/`

Useful evidence:
- discusses historical field notes and tuning analysis;
- explicitly references accepted detuning between paired instruments (`umbang-isep`).

Use class:
- `CONTEXT_ONLY` / `TEMPORAL_REFERENCE`.

### OMB-A04 — Smithsonian Folkways / UNESCO Collection — Bali: Court Music and Banjar Music

URL: `https://folkways.si.edu/bali-court-music-and-banjar-music/world/music/album/smithsonian`

Useful evidence:
- institutional field recording context for Balinese gamelan;
- liner notes discuss cooperative/interlocking musical relations.

Use class:
- `CONTEXT_ONLY` / audio is **not** authorized for reuse by this register.

### OMB-A05 — Smithsonian Folkways — From Kuno to Kebyar: Balinese Gamelan Angklung

URL: `https://folkways.si.edu/from-kuno-to-kebyar-balinese-gamelan-angklung/sacred-world/music/album/smithsonian`

Useful evidence:
- extensive field recordings, notes, photos and glossary across multiple Balinese ensembles.

Use class:
- `CONTEXT_ONLY` / `MATERIAL_REFERENCE` after rights review;
- recordings are not default V2 assets.

### OMB-A06 — Smithsonian Folkways — The Bali Sessions: Living Art, Sounding Spirit

URL: `https://folkways.si.edu/the-bali-sessions-living-art-sounding-spirit/world/music/album/smithsonian`

Useful evidence:
- extensive recorded ensemble context and credited ethnomusicology/liner-note contributors.

Use class:
- `CONTEXT_ONLY`; any audio/photo reuse requires explicit rights clearance.

## V2 archive-derived interaction implication

The pilot may generate synthetic oscillator tones to demonstrate the documented **paired beating relation** without copying a field recording. The product moment must be the beat/interference that disappears when either source is removed.

Do not flatten Balinese gamelan into one standardized tuning number or generic music visualizer. Instrument/ensemble type and the exact ombak claim must remain bounded to the chosen source set.

## Current corpus verdict

`PARTIAL_STRONG` — mechanism evidence is excellent and explicitly relational, but V2 still needs a tighter object/instrument corpus, rights classification, and a specific ensemble/instrument scope before build authorization.

---

# 4. Cross-pilot decision

The three pilots remain complementary:

| Pilot | Primitive | Archive strength now | Main unresolved archive task |
|---|---|---|---|
| Anamorphosis | optical remapping / reflection | strong institutional + public-domain examples | broaden object/process corpus and exact cylinder geometry |
| Coupler | contact / pivot / lock / load | strong museum + archive + patent corpus | select exact historical geometry and complete 12+ record set |
| Ombak | paired temporal/acoustic interference | strong academic + Smithsonian mechanism evidence | narrow ensemble/instrument scope and rights-safe object/audio corpus |

## Gate result

`V2_0A_ARCHIVE_REFRESH_001 = IN_PROGRESS / BUILD_HOLD`

No React/R3F implementation is authorized yet.

Next required output:

**`V2_0A — COMPLETE THREE PILOT ARCHIVE CORPORA + RIGHTS / SENSITIVITY / TRUTH BOUNDARIES`**
