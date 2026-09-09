import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { fridaArtwork } from './CollectibleArtwork.js';

export function FridaCoyoacanScene({ matching, presentation, backs }) {
 const positions=useCardPositions();
 const left=useMemo(()=>fridaArtwork('A',backs?.A,matching),[backs?.A,matching]);
 const right=useMemo(()=>fridaArtwork('B',backs?.B,matching),[backs?.B,matching]);
 return <><CardTable color="#d8d0bd"/><group>
  <group name="PAIR_MEMBER_A"><group name="MIRROR_TRACE"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="EASEL_REGISTER"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="REFLECTED_PATH" /></group>
 </group></>;
}
