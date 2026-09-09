import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { zelligeArtwork } from './CollectibleArtwork.js';

export function ZelligeFesScene({ matching, presentation, backs }) {
 const positions=useCardPositions();
 const left=useMemo(()=>zelligeArtwork('A',backs?.A,matching),[backs?.A,matching]);
 const right=useMemo(()=>zelligeArtwork('B',backs?.B,matching),[backs?.B,matching]);
 return <><CardTable color="#d9d3bf"/><group>
  <group name="PAIR_MEMBER_A"><group name="CUT_PROFILE_A"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="TESSELLATION_B"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="MATERIAL_FIT" /></group>
 </group></>;
}
