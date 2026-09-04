export const pilots = [
  {
    id: 'anamorphosis-paris',
    label: 'Anamorphosis · Paris',
    className: 'OPTICAL / SPATIAL',
    law: 'DISTORTED FIELD → CYLINDRICAL REFLECTOR → RECTIFIED LEGIBILITY',
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
    matching: 'Two close synthetic sources produce a stable audible and visible beating relation.',
    other: 'Each source remains valid alone, but the selected pair relation no longer produces the intended envelope.',
    memorable: 'A third temporal experience exists between the sources and disappears if either member is removed.',
    archiveBoundary:
      'Uses synthetic tones to model documented paired-tuning / ombak mechanics. No archive recording is reproduced and no universal Bali-wide beat rate is claimed.',
  },
];

export const pilotById = Object.fromEntries(pilots.map((pilot) => [pilot.id, pilot]));
