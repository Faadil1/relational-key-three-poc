import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Color, Matrix4, Vector3 } from 'three';

// Parallax and noise adapted from Holo Card Studio (MIT); see THIRD_PARTY_NOTICES.md.
const vertex = `varying vec2 vUv;
void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const fragment = `
varying vec2 vUv;
uniform vec3 uView, uBase;
uniform float uFoil, uKind;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
vec2 parallax(vec2 p,float depth){return p+uView.xy/max(abs(uView.z),.35)*depth*.14;}
void main(){
 vec2 p=parallax(vUv,-.25);
 float grain=noise(p*95.);
 float fibers=noise(vec2(p.x*140.,p.y*5.));
 vec3 base=uBase*(.87+.25*mix(grain,fibers,uKind));
 float rim=1.-smoothstep(.025,.065,min(min(vUv.x,1.-vUv.x),min(vUv.y,1.-vUv.y)));
 float band=.5+.5*sin((p.x*.848-p.y*.530+uView.x*2.4+uView.y)*19.+noise(p*7.)*3.);
 vec3 spectrum=.5+.5*cos(6.283*(band+vec3(0.,.33,.67)));
 float sweep=pow(max(0.,sin((vUv.x*.83+vUv.y*.35+uView.x*1.8+uView.y*.9)*6.283)),12.);
 // Quiet center keeps the physical members readable; foil belongs to the editorial card stock.
 float mask=max(rim*.85,smoothstep(.18,.45,abs(vUv.x-.5))*.3);
 vec3 color=base+uFoil*mask*(spectrum*.3+vec3(.8,.7,.5)*sweep*.35);
 gl_FragColor=vec4(color,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`;

export function HoloPairCard({ position, color, children, presentation, kind = 0 }) {
  const root = useRef();
  const material = useRef();
  const invalidate = useThree(state => state.invalidate);
  const inverse = useMemo(() => new Matrix4(), []);
  const uniforms = useMemo(() => ({ uView:{value:new Vector3(0,0,1)}, uBase:{value:new Color(color)}, uFoil:{value:0}, uKind:{value:kind} }), [color,kind]);
  useLayoutEffect(() => {
    invalidate();
  }, [presentation.foil, uniforms, invalidate]);
  useFrame(({camera}) => {
    root.current.updateWorldMatrix(true,false);
    inverse.copy(root.current.matrixWorld).invert();
    material.current.uniforms.uFoil.value = presentation.foil ? .65 : 0;
    material.current.uniforms.uView.value.copy(camera.position).applyMatrix4(inverse).normalize();
  });
  return <group ref={root} position={position} rotation={[presentation.angle*.18,presentation.angle,0]}>
    <mesh><boxGeometry args={[2.62,3.52,.22]}/><meshStandardMaterial color={color} roughness={.85}/></mesh>
    <mesh position={[0,0,.112]}><planeGeometry args={[2.6,3.5]}/><shaderMaterial ref={material} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms}/></mesh>
    <group position={[0,0,.06]}>{children}</group>
  </group>;
}
