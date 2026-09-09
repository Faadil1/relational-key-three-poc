export const previewLots = [
  {
    id: 'city-card-001',
    title: 'City / Gatineau collectible pair',
    status: 'User-approved direction',
    note: 'La carte physique locale reste la référence de tangibilité. Le chemin doit traverser la couture validée.',
    families: ['city-gatineau'],
  },
  {
    id: 'collectible-batch-001',
    title: 'Collectible batch 001',
    status: 'Implemented candidate · human hold',
    note: 'Premier bloc de quatre familles imprimées. Chaque carte doit rester utilisable comme vraie paire, pas comme simple effet.',
    families: ['metate-teotitlan', 'siku-bolivia', 'textile-bonwire', 'boulle-france'],
  },
  {
    id: 'collectible-batch-002',
    title: 'Collectible batch 002',
    status: 'Implementation candidate · source hold',
    note: 'Deuxième bloc de quatre familles imprimées : trace/reflet, assise matérielle, houle transformée, double coque couplée.',
    families: ['frida-coyoacan', 'zellige-fes', 'swell-marshall', 'tongiaki-tonga'],
  },
  {
    id: 'collectible-batch-003',
    title: 'Collectible batch 003',
    status: 'Implementation candidate · human hold',
    note: 'Troisième bloc de quatre familles imprimées : impact, tension, filtration et friction comme relations matérielles.',
    families: ['garamut-sepik-ramu', 'khipu-peru', 'mate-bombilla-argentina', 'hika-ahi-aotearoa'],
  },
];

export const previewLotById = Object.fromEntries(previewLots.map((lot) => [lot.id, lot]));
