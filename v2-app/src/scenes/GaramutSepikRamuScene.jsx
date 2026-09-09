import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { garamutArtwork } from './CollectibleArtwork.js';

export function GaramutSepikRamuScene({ matching, presentation, backs }) {
 const positions=useCardPositions();
 const left=useMemo(()=>garamutArtwork('A',backs?.A,matching),[backs?.A,matching]);
 const right=useMemo(()=>garamutArtwork('B',backs?.B,matching),[backs?.B,matching]);
 return <><CardTable color="#d4c5ad"/><group>
  <group name="PAIR_MEMBER_A"><group name="BEATER_IMPACT"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="SLIT_GONG_BODY"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="EVENT_TRACE"/><group name="ORDERED_IMPACT_REGISTER"/></group>
 </group></>;
}
