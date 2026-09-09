import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { signalArtwork } from './CollectibleArtwork.js';

export function SignalScene({ alignment, matching, presentation, backs }) {
 const positions = useCardPositions();
 const left = useMemo(() => signalArtwork('A', backs?.A, alignment, matching), [backs?.A, alignment, matching]);
 const right = useMemo(() => signalArtwork('B', backs?.B, alignment, matching), [backs?.B, alignment, matching]);
 return <><CardTable color="#cbd8c7"/><group>
  <group name="PAIR_MEMBER_A"><group name="LANLATE_CAPTURE_CARD"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="REPEATER_HANDOFF_CHAIN"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="CARRIED_SIGNAL"/><group name="HANDOFF_RESPONSE"/></group>
 </group></>;
}
