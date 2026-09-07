import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

export function GaramutSepikRamuScene({ matching, reducedMotion }) {
  const strike = matching ? (reducedMotion ? 0.34 : 0.68) : 0.08;
  const events=[-0.62,-0.3,0,0.3,0.62];
  return (
    <>
      <Stage background="#100d0b" accent="#8c5d42" />
      <group name="PAIR_MEMBER_A" position={[strike,0,0]}>
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.06,-0.016]} color="#292018">
          <group name="BEATER_IMPACT">
            <mesh position={[0.2,0.15,0.28]} rotation={[0,0,-0.46]}><cylinderGeometry args={[0.11,0.15,2.0,20]}/><meshStandardMaterial color="#a47a50" roughness={0.9}/></mesh>
            <Dot position={[-0.24,0.98,0.29]} radius={0.2} color="#7a5138" />
            <Bar position={[0,-1.12,0.16]} size={[1.72,0.1,0.04]} color="#b28b5d" />
          </group>
        </CardPanel>
      </group>
      <group name="PAIR_MEMBER_B" position={[-strike*0.32,0,0]}>
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.06,0.016]} color="#251d17">
          <group name="SLIT_GONG_BODY">
            <mesh position={[0,0,0.24]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.52,0.64,2.08,28]}/><meshStandardMaterial color="#795237" roughness={0.9}/></mesh>
            <Bar position={[0,0.02,0.52]} size={[1.52,0.1,0.05]} color="#2d1c13" />
            {[-0.52,0.52].map((x)=><Dot key={x} position={[x,0.02,0.58]} radius={0.09} color={matching?'#d0a068':'#665143'} emissive={matching?'#71421f':'#000'} emissiveIntensity={matching?0.75:0}/>) }
          </group>
        </CardPanel>
      </group>
      <group name="RELATION" position={[0,0.02,0.52]}>
        <group name="EVENT_TRACE">
          {events.map((x,i)=><Dot key={x} position={[x,(i%2?0.3:-0.3),0]} radius={matching?0.1:0.055} color={matching?(i%2?'#c08b5e':'#8ea06d'):'#5d544b'} emissive={matching?'#5a3422':'#000'} emissiveIntensity={matching?0.55:0}/>) }
          <Bar position={[0,0, -0.02]} size={[matching?1.55:0.62,0.045,0.03]} color={matching?'#b68f62':'#5f564b'} />
        </group>
        <group name="ORDERED_IMPACT_REGISTER" visible={matching}>
          <Dot position={[0,0.76,0.06]} radius={0.12} color="#e0b77c" emissive="#7c4a27" emissiveIntensity={0.9}/>
        </group>
      </group>
    </>
  );
}
