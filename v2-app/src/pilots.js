export const pilots = [
  {
    id: 'anamorphosis-paris',
    label: 'Anamorphosis · Paris',
    className: 'OPTICAL / SPATIAL',
    law: 'DISTORTED FIELD → CYLINDRICAL REFLECTOR → RECTIFIED LEGIBILITY',
    pairMembers: {
      a: 'DISTORTED FIELD',
      relation: 'CURVED REFLECTION',
      b: 'CYLINDRICAL REFLECTOR',
    },
    matching: 'The curved reflector resolves the distorted field into a legible registered form.',
    other: 'Both members remain valid, but the reflected form refuses legibility.',
    memorable: 'Meaning appears only inside the other member’s curved reflection.',
    archiveBoundary:
      'Models documented catoptric cylindrical-mirror anamorphosis. The procedural field is not an archival artifact.',
  },
  {
    id: 'coupler-virginia',
    label: 'Coupler · Virginia',
    className: 'MECHANICAL / CONTACT / LOAD',
    law: 'APPROACH → ROTARY HOOK CONTACT → CATCH / LOCK → SHARED LOAD PATH',
    pairMembers: {
      a: 'PIVOTING HEAD',
      relation: 'ROTARY HOOK / LATCH',
      b: 'MATING HEAD',
    },
    matching: 'Contact rotates the hook into a locked relation; subsequent pull transfers motion through the pair.',
    other: 'Both couplers remain valid, but the relation does not lock and load cannot transfer.',
    memorable: 'A touch becomes a mechanical relationship that carries force across the pair.',
    archiveBoundary:
      'Pilot geometry is a bounded procedural interpretation of Eli H. Janney’s 1873 Alexandria patent mechanism, not a certified modern AAR coupler simulation.',
  },
  {
    id: 'ombak-bali',
    label: 'Ombak · Bali',
    className: 'TEMPORAL / RESONANCE',
    law: 'LOWER SOURCE + HIGHER SOURCE → FREQUENCY DIFFERENCE → SHARED BEAT ENVELOPE',
    pairMembers: {
      a: 'PENGUMBANG',
      relation: 'SHARED BEAT ENVELOPE',
      b: 'PENGISUP',
    },
    matching: 'Two close synthetic sources produce a stable audible and visible beating relation.',
    other: 'Each source remains valid alone, but the selected pair relation no longer produces the intended envelope.',
    memorable: 'A third temporal experience exists between the sources and disappears if either member is removed.',
    archiveBoundary:
      'Uses synthetic tones to model documented paired-tuning / ombak mechanics. No archive recording is reproduced and no universal Bali-wide beat rate is claimed.',
  },
  {
    id: 'kento-japan',
    label: 'Kento · Japan',
    className: 'PRINT / REGISTRATION / TRANSFER',
    law: 'WOODBLOCK KENTŌ → REGISTRATION / PRESS → RECEIVING SHEET TRANSFER',
    pairMembers: {
      a: 'WOODBLOCK / KENTŌ',
      relation: 'REGISTRATION + PRESS',
      b: 'RECEIVING SHEET',
    },
    matching: 'The block-side kentō and receiving sheet agree before pressure transfers the procedural layer.',
    other: 'Both cards remain valid, but pressure transfers the layer off-register.',
    memorable: 'The cards separate after pressure and the receiving sheet reveals whether the pair truly registered.',
    archiveBoundary:
      'Mechanism is grounded in institutional descriptions of kentō registration. Geometry and transferred marks are procedural; no specific historical artwork is reproduced.',
  },
  {
    id: 'stereoscopy-uk',
    label: 'Stereoscopy · UK',
    className: 'OPTICAL / DISPARITY / DEPTH',
    law: 'LEFT VIEW CARD + RIGHT VIEW CARD → CONTROLLED DISPARITY / FUSION → BINOCULAR DEPTH',
    pairMembers: {
      a: 'LEFT VIEW CARD',
      relation: 'CONTROLLED DISPARITY / FUSION',
      b: 'RIGHT VIEW CARD',
    },
    matching: 'Two archive-derived gallery views retain their difference while the controlled relation supports a stable depth reading.',
    other: 'Both views remain valid but their disparity refuses the intended fusion.',
    memorable: 'A spatial reading exists only because two flat view cards relate correctly.',
    archiveBoundary:
      'Procedural paired gallery views are grounded in the same 1871 exhibition-room stereocard lineage used by V1; no archival raster is reproduced. Controlled viewpoint difference, not decorative 3D, drives the depth relation, and stereopsis is not required for comprehension.',
  },
  {
    id: 'signal-nigeria',
    label: 'Signal · Nigeria',
    className: 'SIGNAL / CARRIED LINK / REPEATER HANDOFF',
    law: 'LANLATE EARTH-STATION CAPTURE → CARRIED SIGNAL / REPEATER HANDOFF → IKORODU · OGIDO · ALABATA CHAIN',
    pairMembers: {
      a: 'LANLATE EARTH-STATION CARD',
      relation: 'CARRIED SIGNAL / REPEATER HANDOFF',
      b: 'IKORODU → OGIDO → ALABATA CHAIN',
    },
    matching: 'Lanlate capture establishes a carried path; the three source-backed repeater handoffs register before link output.',
    other: 'Both cards remain valid, but the handoff chain breaks before the final repeater can register the carried link.',
    memorable: 'A carried signal visibly leaves the earth-station card and only completes when the repeater chain on the other card responds.',
    archiveBoundary:
      'Site names are source-backed. Routing, geometry, frequencies, hop timing and signal behavior remain illustrative rather than a certified historical engineering diagram.',
  },
];

export const pilotById = Object.fromEntries(pilots.map((pilot) => [pilot.id, pilot]));
