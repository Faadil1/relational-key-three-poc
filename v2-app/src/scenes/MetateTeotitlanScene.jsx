import { useMemo } from 'react';
import { CollectibleCard, CardTable, useCardPositions } from './CollectibleCard.jsx';
import { metateArtwork } from './CollectibleArtwork.js';
export function MetateTeotitlanScene({state,presentation,backs}) {
 const positions=useCardPositions();
 const a=useMemo(()=>metateArtwork('A',backs.A,state),[backs.A,state]);
 const b=useMemo(()=>metateArtwork('B',backs.B,state),[backs.B,state]);
 return <><CardTable color="#c7c5b6"/>
  <group name="PAIR_MEMBER_A"><group name="MANO_STROKE"><CollectibleCard texture={a} position={positions[0]} back={backs.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="GRIND_TRACE"><CollectibleCard texture={b} position={positions[1]} back={backs.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="ABRASION_INTERFACE" userData={{contact:state.contact,work:state.work}}/></group>
 </>;
}
