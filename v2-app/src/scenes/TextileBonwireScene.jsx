import { useMemo } from 'react';
import { BufferGeometry, Vector3, Euler } from 'three';
import { useEffect } from 'react';
import { CollectibleCard, CardTable, useCardPositions } from './CollectibleCard.jsx';
import { textileArtwork } from './CollectibleArtwork.js';
export function TextileBonwireScene({state,presentation,backs}) {
 const positions=useCardPositions(),mobile=positions[0][0]===0;
 const a=useMemo(()=>textileArtwork('A',backs.A,state,mobile),[backs.A,state,mobile]);
 const b=useMemo(()=>textileArtwork('B',backs.B,state,mobile),[backs.B,state,mobile]);
 return <><CardTable color="#cecbb9"/>
  <group name="PAIR_MEMBER_A"><group name="WOVEN_STRIP_A"><CollectibleCard texture={a} position={positions[0]} back={backs.A} presentation={presentation}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="WOVEN_STRIP_B"><CollectibleCard texture={b} position={positions[1]} back={backs.B} presentation={presentation}/></group></group>
  <group name="RELATION"><group name="SELVEDGE_JOIN" userData={{stitches:state.stitches}}>{!backs.A&&!backs.B&&Array.from({length:state.stitches},(_,i)=><Stitch key={i} index={i} mobile={mobile} angle={presentation.angle}/>)}</group><group name="TEXTILE_CONTINUATION" visible={state.stitches===7}/></group>
 </>;
}

function Stitch({index,mobile,angle}) {
 const geometry=useMemo(()=>{
  const t=(index-3)*.19;
  const rotation=new Euler(angle*.18,angle,0);
  const start=new Vector3(...(mobile?[t-.03,-1.008,.025]:[1.6,t-.03,.025])).applyEuler(rotation).add(new Vector3(...(mobile?[0,1.09,0]:[-1.73,0,0])));
  const end=new Vector3(...(mobile?[t+.03,1.008,.025]:[-1.6,t+.03,.025])).applyEuler(rotation).add(new Vector3(...(mobile?[0,-1.09,0]:[1.73,0,0])));
  const middle=start.clone().lerp(end,.5);middle.z+=.04;
  return new BufferGeometry().setFromPoints([start,middle,end]);
 },[index,mobile,angle]);
 useEffect(()=>()=>geometry.dispose(),[geometry]);
 return <line geometry={geometry}><lineBasicMaterial color="#654d2a" toneMapped={false}/></line>;
}
