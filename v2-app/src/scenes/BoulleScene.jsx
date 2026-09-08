import { useMemo } from 'react';
import { CollectibleCard, CardTable, useCardPositions } from './CollectibleCard.jsx';
import { boulleArtwork } from './CollectibleArtwork.js';
export function BoulleScene({separated,matching,presentation,backs}) {
 const positions=useCardPositions();
 const a=useMemo(()=>boulleArtwork('A',backs.A,separated,matching),[backs.A,separated,matching]);
 const b=useMemo(()=>boulleArtwork('B',backs.B,separated,matching),[backs.B,separated,matching]);
 return <><CardTable color="#c9beaa"/>
  <group name="PAIR_MEMBER_A"><group name="PREMIERE_PARTIE"><CollectibleCard texture={a} position={positions[0]} back={backs.A} presentation={presentation} edge="#a48d61"/></group></group>
  <group name="PAIR_MEMBER_B"><group name="CONTRE_PARTIE"><CollectibleCard texture={b} position={positions[1]} back={backs.B} presentation={presentation} edge="#a48d61"/></group></group>
  <group name="RELATION"><group name="RECIPROCAL_CUT" userData={{matching,separated}}/></group>
 </>;
}
