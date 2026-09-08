import { useEffect, useMemo, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Shape, ShapeGeometry } from 'three';
import { cityArtwork } from './CityCardArtwork.js';
import { Bar } from './Wave005Primitives.jsx';
import { cityReady } from '../familyModels/cityPair.js';

function roundedCard() {
 const s=new Shape(),w=3.2,h=2.016,r=.12,x=-w/2,y=-h/2;
 s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
 return s;
}
function PrintedCard({member,back,mobile,transferred,position,drag}) {
 const shape=useMemo(roundedCard,[]);
 const face=useMemo(()=>{const g=new ShapeGeometry(shape,16),p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,(p.getX(i)+1.6)/3.2,(p.getY(i)+1.008)/2.016);return g;},[shape]);
 const texture=useMemo(()=>cityArtwork(member,back,mobile,transferred),[member,back,mobile,transferred]);
 useEffect(()=>()=>texture.dispose(),[texture]);useEffect(()=>()=>face.dispose(),[face]);
 return <group position={position} {...drag}>
  <mesh position={[0,0,-.025]}><extrudeGeometry args={[shape,{depth:.035,bevelEnabled:true,bevelSize:.008,bevelThickness:.008,bevelSegments:3,steps:1}]}/><meshStandardMaterial color="#c4c7bd" roughness={.43} metalness={.12}/></mesh>
  <mesh geometry={face} position={[0,0,.02]}><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
  {!back && <mesh position={[member==='A'?-1.47:1.47,.21,.024]}><planeGeometry args={[.035,1.23]}/><meshPhysicalMaterial color="#c9d9c8" metalness={.45} roughness={.3} iridescence={1} iridescenceIOR={1.3} iridescenceThicknessRange={[180,380]}/></mesh>}
 </group>;
}
export function CityGatineauScene({state,dispatch}) {
 const {size,viewport,camera}=useThree();const mobile=size.width<600;const start=useRef(null);
 const distance=mobile?1.035+state.gap*.46:1.625+state.gap*.42;
 const a=mobile?[0,distance,0]:[-distance,0,0];const b=mobile?[state.offset*.55,-distance,0]:[distance,state.offset,0];
 const drag={onPointerDown:e=>{e.stopPropagation();start.current={x:e.clientX,y:e.clientY,gap:state.gap};e.target.setPointerCapture(e.pointerId);},onPointerMove:e=>{if(!start.current)return;e.stopPropagation();const view=viewport.getCurrentViewport(camera);const delta=mobile?(e.clientY-start.current.y)/size.height*view.height:(e.clientX-start.current.x)/size.width*view.width;dispatch({type:'move',gap:start.current.gap+delta/(mobile?.46:.42)});},onPointerUp:e=>{if(!start.current)return;start.current=null;e.target.releasePointerCapture(e.pointerId);},onPointerCancel:()=>{start.current=null;}};
 return <>
  <color attach="background" args={['#c8cbc0']}/><ambientLight intensity={1.8}/><directionalLight position={[-3,5,7]} intensity={2}/>
  <group name="PAIR_MEMBER_A"><group name="ROUTE_MEMBER_A"><PrintedCard member="A" back={state.backA} mobile={mobile} transferred={state.transferred} position={a}/></group></group>
  <group name="PAIR_MEMBER_B"><group name="ROUTE_MEMBER_B"><PrintedCard member="B" back={state.backB} mobile={mobile} transferred={state.transferred} position={b} drag={drag}/></group></group>
  <group name="RELATION"><group name="VALIDATION_SEAM"><group name="ROUTE_CONTINUATION" visible={cityReady(state)}><Bar position={[0,0,.025]} size={mobile?[.03,.07,.015]:[.07,.03,.015]} color={state.transferred?'#dcbc54':'#e7e9dc'}/></group></group></group>
 </>;
}
