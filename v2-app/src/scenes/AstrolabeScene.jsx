import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { astrolabeArtwork } from './CollectibleArtwork.js';

export function AstrolabeScene({ angle, setAngle, plateMode, presentation, backs }) {
 const positions = useCardPositions();
 const left = useMemo(() => astrolabeArtwork('A', backs?.A, angle, plateMode), [backs?.A, angle, plateMode]);
 const right = useMemo(() => astrolabeArtwork('B', backs?.B, angle, plateMode), [backs?.B, angle, plateMode]);
 const rotate = (event) => {
  if (!event.uv) return;
  const x = event.uv.x - .5, y = event.uv.y - .5;
  setAngle?.(Math.round(Math.atan2(y, x) * 180 / Math.PI));
 };
 return <><CardTable color="#d7c5a5"/><group>
  <group name="PAIR_MEMBER_A"><group name="RETE_STAR_MAP"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="LATITUDE_PLATE_HORIZON"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="SHARED_AXIS"/><group name="RELATIVE_ROTATION_READING"/></group>
  {!backs?.A && <mesh position={[positions[0][0],positions[0][1],.08]} onPointerDown={(event)=>{event.stopPropagation();rotate(event);}} onPointerMove={(event)=>{if(event.buttons===1)rotate(event);}}><planeGeometry args={[3.2,2.016]}/><meshBasicMaterial transparent opacity={0}/></mesh>}
 </group></>;
}
