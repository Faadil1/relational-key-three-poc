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
    matching: 'Two purpose-built views retain their difference while the controlled relation supports a stable depth reading.',
    other: 'Both views remain valid but their disparity refuses the intended fusion.',
    memorable: 'A spatial reading exists only because two flat view cards relate correctly.',
    archiveBoundary:
      'Uses purpose-built neutral views to model documented stereoscopic card/viewer mechanics. No historical view is required for the experience and stereopsis is not required for comprehension.',
  },
  {
    id: 'signal-nigeria',
    label: 'Signal · Nigeria',
    className: 'SIGNAL / ORIENTATION / RELAY',
    law: 'LANLATE UPLINK CARD → SATELLITE RELAY PATH → REMOTE RECEIVE CARD',
    pairMembers: {
      a: 'LANLATE UPLINK CARD',
      relation: 'SATELLITE RELAY PATH',
      b: 'REMOTE RECEIVE CARD',
    },
    matching: 'The uplink orientation establishes a continuous relay path and the receiving card visibly responds.',
    other: 'Both signal cards remain valid, but the relay breaks before the receiving response can register.',
    memorable: 'A carried signal becomes visible only as a path that leaves one card and arrives inside the other.',
    archiveBoundary:
      'Procedural abstraction informed by documented Nigerian satellite-earth-station and telecommunications history; not a certified reconstruction of Lanlate geometry, frequencies, routing or equipment.',
  },
];

export const pilotById = Object.fromEntries(pilots.map((pilot) => [pilot.id, pilot]));
