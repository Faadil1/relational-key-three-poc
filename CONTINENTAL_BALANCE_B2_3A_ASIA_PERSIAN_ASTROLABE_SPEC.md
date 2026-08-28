# RELATIONAL KEY — CONTINENTAL BALANCE B2.3A

Date: 2026-08-28
Branch: `collection/global-refinement-1`
Promotion matrix: `CONTINENTAL_BALANCE_B2_2B_ASIA_PROMOTION_MATRIX.md`

# ASIA FAMILY ROUND — PERSIAN PLANISPHERIC ASTROLABE

## Status

# `SOURCE PASS / INTERACTION SPEC FROZEN / BUILD CANDIDATE NEXT`

This family is promoted for build research but is **not yet validated** and does not yet change Asia from 3 to 4.

## Geography

- place: **Isfahan, Iran**
- continent: **Asia**
- historical anchor: Persian planispheric astrolabe tradition, with a Smithsonian Isfahan object dated ca. 1715 used as preferred open-access reference.

## Working family identity

Memory family:
# **Celestial / Instrument Memory**

Working edition:
# **Rete Register**

Working route slug:
`astrolabe-isfahan`

## Source anchors

### Primary visual / object anchor

Smithsonian Persian Planispheric Astrolabe, Isfahan, ca. 1715.

Source:
https://www.si.edu/object/persian-planispheric-astrolabe:nmah_997138

Documented components include:
- mater / body;
- five plates;
- rete / star map;
- alidade;
- central pin and wedge.

Smithsonian open-access metadata is preferred for visual reference use where the individual media asset is marked public domain.

### Structural corroboration

Smithsonian National Museum of American History:
https://americanhistory.si.edu/collections/object/nmah_997148

British Museum Safavid Iranian astrolabe, 1712:
https://www.britishmuseum.org/collection/object/W_OA-369

Oxford History of Science Museum astrolabe catalogue:
https://www.mhs.ox.ac.uk/astrolabe/catalogue/browseReport/Astrolabe_ID=209.html

Oxford explicitly describes the rete rotating over the stationary latitude plate.

## Truthfulness boundary

# **THIS EDITION IS NOT A COMPLETE ASTROLABE SIMULATOR.**

The full instrument contains more than two components.

RELATIONAL KEY isolates one real documented subsystem:

# `RETE ↔ LATITUDE PLATE`

The edition must say this clearly in source/microcopy.

Do not imply that the two selected layers alone reproduce every astronomical operation of a historical astrolabe.

## Family-native relational law

# **RELATIVE ROTATION BETWEEN STAR MAP AND HORIZON PRODUCES A CELESTIAL READING.**

Compact proof:

# `RETE ≠ PLATE → OVERLAY → ROTATE → RELATE TO HORIZON → READ`

Working signature:

`RETE → APPROACH → PIN → ROTATE → HORIZON → READ → CONTINUE`

## The two members

### Card A — RETE / STAR MAP

Owns:
- openwork celestial geometry;
- selected star pointers;
- ecliptic ring;
- rotation gesture;
- celestial role label.

It must remain visibly a bounded object before, during and after pairing.

### Card B — LATITUDE PLATE / LOCAL HORIZON

Owns:
- altitude / azimuth curve field;
- horizon geometry;
- latitude identity;
- local-reference role label.

It must remain visibly a bounded object before, during and after pairing.

## Center / gap rule

The center may contain only the **shared rotational axis / pin relationship** and the temporary geometric overlap required to read the relation.

The center must NOT become:
- a decorative astrolabe medallion;
- a standalone data dashboard;
- a large glowing result object;
- a third card.

# `THE PAIR REMAINS THE PRODUCT.`

## Interaction architecture

### Phase 0 — OFFSET

Cards are separated.

Rete and latitude plate are independently readable.

Copy:
`STAR MAP ≠ LOCAL HORIZON`

### Phase 1 — APPROACH

Cards move toward one another but retain identity.

The circular subsystems begin to overlap near the inner edges.

Copy:
`BRING THE CELESTIAL MAP TO A HORIZON`

### Phase 2 — PIN / AXIS ENGAGEMENT

The two circular systems share an axis.

No result is declared yet.

Copy:
`SHARED AXIS · READING NOT YET SET`

### Phase 3 — ROTATE

User directly rotates the rete.

Required input:
- pointer drag around the rete circumference on desktop;
- accessible slider / buttons as fallback;
- touch rotation or equivalent simple horizontal/arc gesture on narrow screens.

The latitude plate remains stationary.

### Phase 4 — RELATION / READ

As the rete rotates, star pointers visibly move relative to the plate's horizon/altitude geometry.

The prototype should show a **structural relation reading**, not pretend to calculate exact historical astronomy unless a verified calculation is implemented.

Acceptable conceptual readout examples:
- `STAR POINTER ABOVE / BELOW HORIZON LINE`
- `RELATION ANGLE · 042°`
- `LOCAL PLATE · ACTIVE`

Required disclaimer:
`STRUCTURAL TRANSLATION · NOT AN ASTRONOMICAL CALCULATOR`

## MATCHING / OTHER semantics

Do NOT use `MATCH` versus `WRONG`.

Preferred controls:

- `LOCAL LATITUDE PLATE`
- `OTHER LATITUDE PLATE`

Both are valid historical instrument states because astrolabes use different plates for different latitudes.

### Local plate

Relationship label:
`LOCAL HORIZON ACTIVE`

### Other plate

Relationship label:
`VALID PLATE · DIFFERENT HORIZON`

The alternate state must not mark either component invalid.

## Motion language

Primary motion:
- actual circular rotation;
- subtle card approach;
- restrained axis engagement.

Avoid:
- orbiting decorative stars;
- particles;
- glowing cosmic effects;
- generic sci-fi interfaces;
- gamified success bursts.

The motion should feel like a precision instrument.

## Visual language

### Source-led palette

Use restrained material cues derived from documented brass instruments:
- dark oxidized brass / brown-black ground;
- warm engraved metal lines;
- pale worn-metal highlights;
- very limited muted silver only if supported by the selected source object.

No national flag colors.

### Geometry

Use actual astrolabe structural categories:
- rete openwork silhouette;
- star pointers;
- ecliptic circle;
- horizon / altitude / azimuth line field.

Do not invent pseudo-Arabic calligraphy or generic Islamic/Persian ornament to make the family appear cultural.

Cultural specificity must come from the instrument itself.

## Text hierarchy

Suggested top line:
`ISFAHAN · PERSIAN PLANISPHERIC ASTROLABE · STRUCTURAL TRANSLATION`

Headline candidate:
`A star map becomes readable against a local horizon.`

Card roles:
- `CARD A · RETE / CELESTIAL MAP`
- `CARD B · LATITUDE PLATE / LOCAL HORIZON`

Source footer should identify the Smithsonian anchor and corroborating museum references.

## Anti-duplication test

This family must NOT reduce to:

`move two pictures until they align`.

The proof of novelty is:

1. the members share a rotational axis;
2. one member rotates continuously while the other remains stationary;
3. the meaning changes continuously with relative angle;
4. alternate latitude plates remain valid contexts;
5. the relation is measurement/calibration-like, not binary completion.

## Build gate requirements

Before visual user gate:

- source anchor preserved;
- Card A / Card B remain distinct;
- rete rotation is direct and legible;
- latitude plate stays stationary;
- local/other plate states both valid;
- no exact astronomical claims unless verified;
- source/disclaimer microcopy visible;
- desktop + narrow interaction usable;
- no decorative cultural skinning;
- no existing family files modified.

## Candidate architecture

Build as a **new autonomous family candidate**, not inside the shared six-family runtime.

Preferred initial path:
`families/astrolabe-isfahan/candidate.html`

Do not add it to `collection/families.json` validated count or public atlas until independent gates pass.

## Next output

# **B2.3B — PERSIAN ASTROLABE BUILD CANDIDATE**

Implement the smallest source-faithful interactive prototype consistent with this frozen spec.
