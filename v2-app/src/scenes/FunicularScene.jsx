import { useMemo } from 'react';
import { CardTable, CollectibleCard, useCardPositions } from './CollectibleCard.jsx';
import { funicularArtwork } from './CollectibleArtwork.js';

export function FunicularScene({ positionA, setPositionA, presentation, backs }) {
 const positions = useCardPositions();
 const positionB = 1 - positionA;
 const left = useMemo(() => funicularArtwork('A', backs?.A, positionA), [backs?.A, positionA]);
 const right = useMemo(() => funicularArtwork('B', backs?.B, positionA), [backs?.B, positionA]);
 const move = (event, side) => {
  if (!event.uv) return;
  const value = Math.max(0, Math.min(1, event.uv.y));
  setPositionA?.(side === 'A' ? value : 1 - value);
 };
 return <><CardTable color="#d5c7b0"/><group>
  <group name="PAIR_MEMBER_A"><group name="FUNICULAR_CAR_A"><CollectibleCard texture={left} position={positions[0]} back={backs?.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="FUNICULAR_CAR_B_INVERSE"><CollectibleCard texture={right} position={positions[1]} back={backs?.B} presentation={presentation}/></group></group>
  <group name="RELATION" userData={{ positionB }}><group name="SHARED_COUNTERWEIGHT"/><group name="INVERSE_POSITION_RESPONSE"/></group>
  {!backs?.A && <mesh position={[positions[0][0],positions[0][1],.08]} onPointerDown={(event)=>{event.stopPropagation();move(event,'A');}} onPointerMove={(event)=>{if(event.buttons===1)move(event,'A');}}><planeGeometry args={[3.2,2.016]}/><meshBasicMaterial transparent opacity={0}/></mesh>}
  {!backs?.B && <mesh position={[positions[1][0],positions[1][1],.08]} onPointerDown={(event)=>{event.stopPropagation();move(event,'B');}} onPointerMove={(event)=>{if(event.buttons===1)move(event,'B');}}><planeGeometry args={[3.2,2.016]}/><meshBasicMaterial transparent opacity={0}/></mesh>}
 </group></>;
}
