import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { stereoscopyArtwork } from './CollectibleArtwork.js';

export function StereoscopyScene({ disparity, matching, presentation, backs }) {
 const positions = useCardPositions();
 const left = useMemo(() => stereoscopyArtwork('A', backs?.A, disparity, matching), [backs?.A, disparity, matching]);
 const right = useMemo(() => stereoscopyArtwork('B', backs?.B, disparity, matching), [backs?.B, disparity, matching]);
 return <><CardTable color="#cfd1cf"/><group>
  <group name="PAIR_MEMBER_A"><group name="LEFT_VIEW_CARD"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="RIGHT_VIEW_CARD"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="CONTROLLED_DISPARITY"/><group name="BINOCULAR_DEPTH_RESPONSE"/></group>
 </group></>;
}
