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
];

export const previewLotById = Object.fromEntries(previewLots.map((lot) => [lot.id, lot]));
