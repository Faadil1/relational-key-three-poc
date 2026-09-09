import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { foodArtwork } from './CollectibleArtwork.js';

export function FoodToyamaScene({ release, matching, presentation, backs }) {
 const positions = useCardPositions();
 const left = useMemo(() => foodArtwork('A', backs?.A, release, matching), [backs?.A, release, matching]);
 const right = useMemo(() => foodArtwork('B', backs?.B, release, matching), [backs?.B, release, matching]);
 return <><CardTable color="#d2c4a5"/><group>
  <group name="PAIR_MEMBER_A"><group name="PRESS_PACKAGE_CONSTRAINT"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="BAMBOO_LEAF_REVEAL"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="ORDERED_RELEASE"/><group name="REVEAL_RESPONSE"/></group>
 </group></>;
}
