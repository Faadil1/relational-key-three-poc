export const wave3Families = [
  {
    id: 'boulle-france',
    label: 'Boulle · France',
    className: 'RECIPROCAL CUT / MATERIAL INVERSION',
    law: 'STACKED MATERIAL A + B → ONE SHARED CUT → TWO RECIPROCAL INVERSE SURFACES',
    pair: ['PREMIÈRE PARTIE MATERIAL FIELD', 'SHARED CUT / RECIPROCAL EXCHANGE', 'CONTRE-PARTIE MATERIAL FIELD'],
    matching: 'MATCHING · one shared cut yields two reciprocal material inverses while both members remain distinct.',
    other: 'OTHER · both material fields remain valid, but the cut paths do not resolve into one reciprocal map.',
    memorable: 'One gesture creates two opposite outcomes at once; neither final surface can be explained without the other.',
    boundary: 'Procedural material study grounded in museum-documented Boulle partie / contre-partie logic. No wildlife material is used or recommended, and this is not a fabrication recipe.',
  },
  {
    id: 'khipu-peru',
    label: 'Khipu · Peru',
    className: 'CORD / TENSION / STRUCTURAL REGISTER',
    law: 'PRIMARY CORD TENSION → SHARED ATTACHMENT RELATION → SECONDARY CORD + KNOT POSITION RESPONSE',
    pair: ['PRIMARY / CARRYING CORD FIELD', 'SHARED TENSION / ATTACHMENT', 'SECONDARY CORD + KNOT FIELD'],
    matching: 'MATCHING · shared tension settles the structural attachment and knot-position relation.',
    other: 'OTHER · both cord systems remain valid, but tension and attachment positions retain a visible residual.',
    memorable: 'A slack structural gap becomes ordered only when both cord fields carry the same relation.',
    boundary: 'Procedural-only structural translation. No numeric, linguistic, administrative or historical khipu decoding is claimed.',
  },
  {
    id: 'mate-bombilla-argentina',
    label: 'Mate + Bombilla · Argentina',
    className: 'FILTER / SELECTIVE PASSAGE / CONTAINMENT',
    law: 'MATE MEDIUM + PARTICLES → BOMBILLA INSERTION / PERFORATED FILTER → SELECTIVE PASSAGE + CONTAINMENT',
    pair: ['MATE / PARTICLE FIELD', 'BOMBILLA INSERTION + PERFORATED FILTER', 'SELECTIVE FLOW PATH'],
    matching: 'MATCHING · represented liquid passes through the filter path while particulate matter remains contained.',
    other: 'OTHER · both members remain valid, but partial insertion does not establish a complete selective passage.',
    memorable: 'At the pair interface, one represented material passes while another visibly cannot.',
    boundary: 'Structural subsystem study only. It does not model the full social practice of mate, hydraulics or physiology.',
  },
];

export const wave3ById = Object.fromEntries(wave3Families.map((family) => [family.id, family]));
