import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

function ShoulderArc({ x, y, rotation=0, color='#83c0c8' }) {
  return (
    <mesh position={[x,y,0.22]} rotation={[0,0,rotation]}>
      <torusGeometry args={[0.52,0.035,8,36,Math.PI*1.15]} />
      <meshStandardMaterial color={color} emissive="#244d54" emissiveIntensity={0.22} roughness={0.5} />
    </mesh>
  );
}

export function SwellMarshallScene({ matching, reducedMotion }) {
  const waves=[-0.72,-0.36,0,0.36,0.72];
  const spread = reducedMotion ? 0.28 : 0.48;
  return (
    <>
      <Stage background="#091216" accent="#4d91a8" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.06,-0.014]} color="#15272d">
          <group name="SWELL_VECTOR_A">
            {waves.map((y,i)=><Bar key={y} position={[-0.05,y,0.17]} size={[1.8,0.065,0.04]} color={i%2?'#6aaabd':'#85c1c8'} rotation={[0,0,0.025*i]} />)}
            <Dot position={[0.72,0.02,0.22]} radius={0.22} color="#c1a66b" />
            <Bar position={[0.78,0,0.16]} size={[0.08,1.9,0.04]} color="#6a7357" />
          </group>
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.06,0.014]} color="#15262c">
          <group name="REFRACTED_WAVE_B">
            <Dot position={[-0.48,0,0.22]} radius={0.26} color="#c7aa6f" />
            {matching ? (
              <>
                <ShoulderArc x={-0.12} y={0.34} rotation={-0.35} />
                <ShoulderArc x={-0.12} y={-0.34} rotation={Math.PI+0.35} />
                <Bar position={[0.42,0.22,0.2]} size={[1.05,0.065,0.04]} color="#94d0cf" rotation={[0,0,-spread]} />
                <Bar position={[0.42,-0.22,0.2]} size={[1.05,0.065,0.04]} color="#94d0cf" rotation={[0,0,spread]} />
                <Dot position={[0.78,0,0.24]} radius={0.09} color="#b8e0d8" emissive="#477d76" emissiveIntensity={0.7} />
              </>
            ) : (
              waves.map((y,i)=><Bar key={y} position={[0,y,0.17]} size={[1.82,0.065,0.04]} color="#617a7d" rotation={[0,0,(i-2)*0.03]} />)
            )}
          </group>
        </CardPanel>
      </group>

      <group name="RELATION" position={[0,0,0.54]}>
        <group name="ISLAND_RELATION">
          <mesh>
            <cylinderGeometry args={[0.34,0.42,0.18,22]} />
            <meshStandardMaterial color="#8b7b4c" roughness={0.9} />
          </mesh>
          {matching && (
            <>
              <ShoulderArc x={0} y={0.34} rotation={-0.48} color="#8fcac8" />
              <ShoulderArc x={0} y={-0.34} rotation={Math.PI+0.48} color="#8fcac8" />
            </>
          )}
        </group>
        <group name="WAVE_DEFLECTION_REGISTER">
          <Bar position={[0.64,0.16,0.08]} size={[matching?0.94:0.36,0.05,0.03]} color={matching?'#9bd6d3':'#5c7072'} rotation={[0,0,matching?-0.48:0.08]} />
          <Bar position={[0.64,-0.16,0.08]} size={[matching?0.94:0.36,0.05,0.03]} color={matching?'#9bd6d3':'#5c7072'} rotation={[0,0,matching?0.48:-0.08]} />
          {matching && <Dot position={[0.94,0,0.12]} radius={0.08} color="#c5e6dd" emissive="#4e837e" emissiveIntensity={0.7}/>} 
        </group>
      </group>
    </>
  );
}
