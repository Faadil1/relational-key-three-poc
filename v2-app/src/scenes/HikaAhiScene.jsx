import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { hikaArtwork } from './CollectibleArtwork.js';

export function HikaAhiScene({ friction, matching, presentation, backs }) {
 const positions=useCardPositions();
 const left=useMemo(()=>hikaArtwork('A',backs?.A,friction,matching),[backs?.A,friction,matching]);
 const right=useMemo(()=>hikaArtwork('B',backs?.B,friction,matching),[backs?.B,friction,matching]);
 return <><CardTable color="#d6c9b6"/><group>
  <group name="PAIR_MEMBER_A"><group name="HIKA_STROKE"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="GROOVED_BASE"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="FRICTION_INTERFACE"/><group name="EMBER_WITNESS"/></group>
 </group></>;
}
