import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { mateArtwork } from './CollectibleArtwork.js';

export function MateBombillaScene({ insertion, matching, presentation, backs }) {
 const positions=useCardPositions();
 const left=useMemo(()=>mateArtwork('A',backs?.A,insertion,matching),[backs?.A,insertion,matching]);
 const right=useMemo(()=>mateArtwork('B',backs?.B,insertion,matching),[backs?.B,insertion,matching]);
 return <><CardTable color="#d9d1bd"/><group>
  <group name="PAIR_MEMBER_A"><group name="PARTICLE_FIELD"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="PERFORATED_FILTER"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="SELECTIVE_PASSAGE"/></group>
 </group></>;
}
