import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { swellArtwork } from './CollectibleArtwork.js';

export function SwellMarshallScene({ matching, presentation, backs }) {
 const positions=useCardPositions();
 const left=useMemo(()=>swellArtwork('A',backs?.A,matching),[backs?.A,matching]);
 const right=useMemo(()=>swellArtwork('B',backs?.B,matching),[backs?.B,matching]);
 return <><CardTable color="#d1d0bf"/><group>
  <group name="PAIR_MEMBER_A"><group name="SWELL_VECTOR_A"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="REFRACTED_WAVE_B"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="ISLAND_RELATION" /><group name="WAVE_DEFLECTION_REGISTER" /></group>
 </group></>;
}
