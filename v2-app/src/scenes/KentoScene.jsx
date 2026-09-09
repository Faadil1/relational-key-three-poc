import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { kentoArtwork } from './CollectibleArtwork.js';

export function KentoScene({ offset, pressed, matching, presentation, backs }) {
 const positions = useCardPositions();
 const left = useMemo(() => kentoArtwork('A', backs?.A, offset, pressed, matching), [backs?.A, offset, pressed, matching]);
 const right = useMemo(() => kentoArtwork('B', backs?.B, offset, pressed, matching), [backs?.B, offset, pressed, matching]);
 return <><CardTable color="#d7c8b4"/><group>
  <group name="PAIR_MEMBER_A"><group name="WOODBLOCK_KENTO"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="RECEIVING_SHEET_TRANSFER"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="REGISTRATION_PRESS"/><group name="TRANSFER_PROOF"/></group>
 </group></>;
}
