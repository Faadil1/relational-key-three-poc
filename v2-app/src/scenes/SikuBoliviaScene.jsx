import { useMemo } from 'react';
import { CollectibleCard, CardTable, useCardPositions } from './CollectibleCard.jsx';
import { sikuArtwork } from './CollectibleArtwork.js';
import { sharedPhrase } from '../familyModels/relationalStudies.js';
export function SikuBoliviaScene({state,presentation,backs}) {
 const positions=useCardPositions();
 const a=useMemo(()=>sikuArtwork('A',backs.A,state),[backs.A,state]);
 const b=useMemo(()=>sikuArtwork('B',backs.B,state),[backs.B,state]);
 return <><CardTable color="#d8c9ae"/>
  <group name="PAIR_MEMBER_A"><group name="IRA_NOTE_SET"><CollectibleCard texture={a} position={positions[0]} back={backs.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="ARCA_NOTE_SET"><CollectibleCard texture={b} position={positions[1]} back={backs.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="INTERLOCK_TRACE" userData={{events:state.events}}/><group name="SHARED_PHRASE" visible={sharedPhrase(state)}/></group>
 </>;
}
