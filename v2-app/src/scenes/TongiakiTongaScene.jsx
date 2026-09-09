import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { tongiakiArtwork } from './CollectibleArtwork.js';

export function TongiakiTongaScene({ matching, presentation, backs }) {
 const positions=useCardPositions();
 const left=useMemo(()=>tongiakiArtwork('A',backs?.A,matching),[backs?.A,matching]);
 const right=useMemo(()=>tongiakiArtwork('B',backs?.B,matching),[backs?.B,matching]);
 return <><CardTable color="#d5cfbb"/><group>
  <group name="PAIR_MEMBER_A"><group name="HULL_A"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="HULL_B"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="CROSS_DECK_COUPLING" /><group name="STABILITY_RESPONSE" /></group>
 </group></>;
}
