import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

function ShoulderArc({ x, y, rotation=0, color='#83c0c8', radius=0.52 }) {
  return (
    <mesh position={[x,y,0.22]} rotation={[0,0,rotation]}>
      <torusGeometry args={[radius,0.035,8,40,Math.PI*1.18]} />
      <meshStandardMaterial color={color} emissive="#244d54" emissiveIntensity={0.24} roughness={0.48} />
    </mesh>
  );
}

function AtollRing({ active=false }) {
  return (
    <group>
      <mesh rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[0.31,0.1,12,48]} />
        <meshStandardMaterial color="#9c8752" roughness={0.9} emissive={active?'#332b16':'#000'} emissiveIntensity={active?0.24:0} />
      </mesh>
      <mesh position={[0,0,0.04]} rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[0.19,0.022,8,36]} />
        <meshStandardMaterial color="#4e7b7b" roughness={0.7} />
      </mesh>
    </group>
  );
}

export function SwellMarshallScene({ matching, reducedMotion }) {
  const waves=[-0.72,-0.36,0,0.36,0.72];
  const spread = reducedMotion ? 0.26 : 0.46;
  return (
    <>
      <Stage background="#081216" accent="#4e93ab" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.06,-0.014]} color="#15272d">
          <group name="SWELL_VECTOR_A">
            {waves.map((y,i)=><Bar key={y} position={[-0.08,y,0.17+(i%2)*0.015]} size={[1.78,0.062,0.04]} color={i%2?'#6aaabd':'#89c6cd'} rotation={[0,0,0.02*i]} />)}
            <group position={[0.7,0.02,0.24]}><AtollRing active={false} /></group>
            <Bar position={[0.82,0,0.16]} size={[0.055,1.92,0.04]} color="#6d7658" />
          </group>
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.06,0.014]} color="#15262c">
          <group name="REFRACTED_WAVE_B">
            <group position={[-0.5,0,0.24]}><AtollRing active={matching} /></group>
            {matching ? (
              <>
                <ShoulderArc x={-0.08} y={0.35} rotation={-0.38} color="#96d0d0" />
                <ShoulderArc x={-0.08} y={-0.35} rotation={Math.PI+0.38} color="#96d0d0" />
                <ShoulderArc x={0.16} y={0.5} rotation={-0.58} color="#6eaeb8" radius={0.42} />
                <ShoulderArc x={0.16} y={-0.5} rotation={Math.PI+0.58} color="#6eaeb8" radius={0.42} />
                <Bar position={[0.46,0.24,0.2]} size={[1.02,0.06,0.04]} color="#9bd5d3" rotation={[0,0,-spread]} />
                <Bar position={[0.46,-0.24,0.2]} size={[1.02,0.06,0.04]} color="#9bd5d3" rotation={[0,0,spread]} />
                <Bar position={[0.68,0,0.21]} size={[0.58,0.045,0.035]} color="#b9dfd9" />
                <Dot position={[0.92,0,0.25]} radius={0.08} color="#c8ebe2" emissive="#4b807b" emissiveIntensity={0.72} />
              </>
            ) : waves.map((y,i)=><Bar key={y} position={[0,y,0.17]} size={[1.8,0.062,0.04]} color="#617a7d" rotation={[0,0,(i-2)*0.03]} />)}
          </group>
        </CardPanel>
      </group>

      <group name="RELATION" position={[0,0,0.56]}>
        <group name="ISLAND_RELATION">
          <AtollRing active={matching} />
          {matching && (
            <>
              <ShoulderArc x={0} y={0.34} rotation={-0.5} color="#94cfcd" />
              <ShoulderArc x={0} y={-0.34} rotation={Math.PI+0.5} color="#94cfcd" />
            </>
          )}
        </group>
        <group name="WAVE_DEFLECTION_REGISTER">
          <Bar position={[0.62,0.17,0.08]} size={[matching?0.92:0.34,0.048,0.03]} color={matching?'#a0d9d5':'#5c7072'} rotation={[0,0,matching?-0.46:0.08]} />
          <Bar position={[0.62,-0.17,0.08]} size={[matching?0.92:0.34,0.048,0.03]} color={matching?'#a0d9d5':'#5c7072'} rotation={[0,0,matching?0.46:-0.08]} />
          <Bar position={[0.76,0,0.1]} size={[matching?0.78:0.22,0.04,0.025]} color={matching?'#c2e4dd':'#586b6d'} />
          {matching && [0.52,0.72,0.92].map((x)=><Dot key={x} position={[x,0,0.14]} radius={0.035} color="#d4eee6" emissive="#4c817d" emissiveIntensity={0.5} />)}
        </group>
      </group>
    </>
  );
}
