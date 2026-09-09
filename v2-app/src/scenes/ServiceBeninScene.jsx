import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { serviceArtwork } from './CollectibleArtwork.js';

export function ServiceBeninScene({ contact, matching, presentation, backs }) {
 const positions = useCardPositions();
 const left = useMemo(() => serviceArtwork('A', backs?.A, contact, matching), [backs?.A, contact, matching]);
 const right = useMemo(() => serviceArtwork('B', backs?.B, contact, matching), [backs?.B, contact, matching]);
 return <><CardTable color="#d6ccb4"/><group>
  <group name="PAIR_MEMBER_A"><group name="BENIN_TELEPHONE_CARD"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="PUBLIPHONE_WINDOW"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="EDITORIAL_CONTACT"/><group name="SERVICE_WINDOW_RESPONSE"/></group>
 </group></>;
}
