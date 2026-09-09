import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { musicBoxArtwork } from './CollectibleArtwork.js';

const PATTERNS = {
 A: [{ angle: 18, tooth: 0 }, { angle: 52, tooth: 2 }, { angle: 88, tooth: 4 }, { angle: 126, tooth: 1 }, { angle: 164, tooth: 5 }],
 B: [{ angle: 28, tooth: 5 }, { angle: 68, tooth: 3 }, { angle: 110, tooth: 1 }, { angle: 154, tooth: 4 }, { angle: 198, tooth: 2 }],
};

export function MusicBoxScene({ engaged, angle, setAngle, pattern, presentation, backs }) {
 const positions = useCardPositions();
 const normalized = ((angle % 360) + 360) % 360;
 const activePin = engaged ? PATTERNS[pattern].find((pin) => Math.abs(((normalized - pin.angle + 180) % 360) - 180) <= 7) : null;
 const state = { engaged, angle, pattern, activePin };
 const left = useMemo(() => musicBoxArtwork('A', backs?.A, state), [backs?.A, engaged, angle, pattern]);
 const right = useMemo(() => musicBoxArtwork('B', backs?.B, state), [backs?.B, engaged, angle, pattern]);
 return <><CardTable color="#d6c7ac"/><group>
  <group name="PAIR_MEMBER_A"><group name="PINNED_CYLINDER_MEMORY"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="TUNED_COMB_DECODER"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="PIN_TO_TOOTH_CONTACT"/><group name="ORDERED_CONTACT_EVENTS"/></group>
  {!backs?.A && <mesh position={[positions[0][0],positions[0][1],.08]} onPointerDown={(event)=>{event.stopPropagation();setAngle?.(Math.round((event.uv?.x ?? .5)*359));}} onPointerMove={(event)=>{if(event.buttons===1)setAngle?.(Math.round((event.uv?.x ?? .5)*359));}}><planeGeometry args={[3.2,2.016]}/><meshBasicMaterial transparent opacity={0}/></mesh>}
 </group></>;
}
