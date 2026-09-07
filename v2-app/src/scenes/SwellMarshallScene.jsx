import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

export function SwellMarshallScene({ matching, reducedMotion }) {
  const spread = matching ? (reducedMotion ? 0.26 : 0.48) : 0.08;
  const waves=[-0.72,-0.36,0,0.36,0.72];
  return (
    <>
      <Stage background="#091216" accent="#4d91a8" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.06,-0.014]} color="#15272d">
          <group name="SWELL_VECTOR_A">
            {waves.map((y,i)=><Bar key={y} position={[0,y,0.17]} size={[1.82,0.07,0.04]} color={i%2?'#6aaabd':'#85c1c8'} rotation={[0,0,0.06*i]} />)}
            <Dot position={[0.68,0.02,0.2]} radius={0.2} color="#c1a66b" />
          </group>
        </CardPanel>
      </group>
      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.06,0.014]} color="#15262c">
          <group name="REFRACTED_WAVE_B">
            {waves.map((y,i)=><Bar key={y} position={[0,y,0.17]} size={[1.82,0.07,0.04]} color={matching?'#8fc8c8':'#637d80'} rotation={[0,0,matching?(i-2)*0.12:(i-2)*0.03]} />)}
            <Dot position={[-0.52,0.0,0.2]} radius={0.22} color="#c7aa6f" />
          </group>
        </CardPanel>
      </group>
      <group name="RELATION" position={[0,0,0.5]}>
        <group name="ISLAND_RELATION">
          <mesh><cylinderGeometry args={[0.34,0.4,0.18,20]}/><meshStandardMaterial color="#8b7b4c" roughness={0.9}/></mesh>
          {waves.slice(1,4).map((y,i)=><Bar key={y} position={[0,(i-1)*0.28,0.08]} size={[matching?1.15:0.58,0.055,0.035]} color={matching?'#80c1c8':'#5d6f70'} rotation={[0,0,matching?(i-1)*spread:0.22]} />)}
        </group>
        <group name="WAVE_DEFLECTION_REGISTER" visible={matching}>
          <Dot position={[0.62,0.48,0.1]} radius={0.075} color="#aee0d7" emissive="#3e7772" emissiveIntensity={0.7}/>
          <Dot position={[0.72,-0.36,0.1]} radius={0.075} color="#aee0d7" emissive="#3e7772" emissiveIntensity={0.7}/>
        </group>
      </group>
    </>
  );
}
