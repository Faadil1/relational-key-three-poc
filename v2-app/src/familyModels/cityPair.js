export const initialCity = () => ({gap: .85, offset: 0, backA: false, backB: false, transferred: false});
export const cityReady = s => s.gap <= .04 && Math.abs(s.offset) <= .08 && !s.backA && !s.backB;
export function cityReducer(s,a) {
  if(a.type==='reset') return initialCity();
  if(a.type==='move' && Number.isFinite(a.gap)) return {...s,gap:Math.max(0,Math.min(1,a.gap)),transferred:false};
  if(a.type==='offset') return {...s,offset:a.value ? .48 : 0,transferred:false};
  if(a.type==='flip') return {...s,[a.member==='A'?'backA':'backB']:!s[a.member==='A'?'backA':'backB'],transferred:false};
  if(a.type==='send') return cityReady(s) ? {...s,transferred:true} : s;
  return s;
}
export function cityStatus(s) {
 if(s.transferred) return 'MATCHING · PASSAGE TRANSMIS · le tracé de A se poursuit dans B.';
 if(s.backA || s.backB) return 'OTHER · VERSO OUVERT · retournez les deux cartes pour tester la liaison.';
 if(s.gap > .04) return 'OTHER · DEUX FRAGMENTS · rapprochez les cartes pour présenter leurs raccords.';
 if(Math.abs(s.offset) > .08) return 'OTHER · RACCORD DÉCALÉ · les deux cartes restent valides, le passage reste ouvert.';
 return 'MATCHING · RACCORD PRÊT · faites passer la trace vers la carte B.';
}
