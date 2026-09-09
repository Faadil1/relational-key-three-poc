import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { khipuArtwork } from './CollectibleArtwork.js';

export function KhipuScene({ tension, matching, presentation, backs }) {
 const positions=useCardPositions();
 const left=useMemo(()=>khipuArtwork('A',backs?.A,tension,matching),[backs?.A,tension,matching]);
 const right=useMemo(()=>khipuArtwork('B',backs?.B,tension,matching),[backs?.B,tension,matching]);
 return <><CardTable color="#d8cbb8"/><group>
  <group name="PAIR_MEMBER_A"><group name="CARRYING_CORD"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="SECONDARY_CORD"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="SHARED_TENSION_ATTACHMENT"/><group name="KNOT_REGISTER"/></group>
 </group></>;
}
