import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Shape, ShapeGeometry, CanvasTexture } from 'three';

// Pocket-card proportion inherited from the approved City pair; artwork stays family-owned.
function roundedCard() {
 const s=new Shape(),w=3.2,h=2.016,r=.12,x=-w/2,y=-h/2;
 s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}
const foilVertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
// A bounded interference strip on editorial card stock, not on the historical object.
const foilFragment=`varying vec2 vUv;uniform float angle;void main(){float p=vUv.y+angle*2.8;vec3 spectrum=.5+.5*cos(6.283*(p+vec3(0.,.33,.67)));float grain=fract(sin(dot(vUv,vec2(127.1,311.7)))*43758.5453);gl_FragColor=vec4(mix(vec3(.63,.59,.43),spectrum,.46)+grain*.07,1.);}`;
export function CollectibleCard({texture,position,back,presentation={angle:0,foil:true},edge='#b6b0a1',children}) {
 const shadow=useMemo(()=>{
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=328;
  const c=canvas.getContext('2d');c.shadowColor='rgba(20,20,12,.16)';c.shadowBlur=14;c.fillStyle='rgba(20,20,12,.12)';c.beginPath();c.roundRect(24,24,464,280,20);c.fill();
  return new CanvasTexture(canvas);
 },[]);
 useEffect(()=>()=>shadow.dispose(),[shadow]);
 const shape=useMemo(roundedCard,[]);
 const face=useMemo(()=>{const g=new ShapeGeometry(shape,16),p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,(p.getX(i)+1.6)/3.2,(p.getY(i)+1.008)/2.016);return g;},[shape]);
 const uniforms=useMemo(()=>({angle:{value:presentation.angle}}),[presentation.angle]);
 useEffect(()=>()=>face.dispose(),[face]);
 useEffect(()=>()=>texture.dispose(),[texture]);
 return <group position={position}>
  <group rotation={[presentation.angle*.18,presentation.angle,0]}>
  <mesh position={[.015,-.035,-.055]}><planeGeometry args={[3.55,2.36]}/><meshBasicMaterial map={shadow} transparent depthWrite={false} toneMapped={false}/></mesh>
  <mesh position={[0,0,-.035]}><extrudeGeometry args={[shape,{depth:.035,bevelEnabled:true,bevelSize:.008,bevelThickness:.008,bevelSegments:3,steps:1}]}/><meshStandardMaterial color={edge} roughness={.5} metalness={.18}/></mesh>
  <mesh geometry={face} position={[0,0,.012]}><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
  {!back && presentation.foil && <mesh position={[1.47,.06,.018]}><planeGeometry args={[.018,1.48]}/><shaderMaterial vertexShader={foilVertex} fragmentShader={foilFragment} uniforms={uniforms} toneMapped={false}/></mesh>}
  {!back && <group position={[0,0,.02]}>{children}</group>}
  </group>
 </group>;
}
export function useCardPositions() {
 const mobile=useThree(s=>s.size.width<600);
 return mobile?[[0,1.09,0],[0,-1.09,0]]:[[-1.73,0,0],[1.73,0,0]];
}
export function CardTable({color='#cec8ba'}) {
 return <><color attach="background" args={[color]}/><ambientLight intensity={1.5}/><directionalLight position={[-3,5,7]} intensity={2}/></>;
}
