import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

export function GaramutSepikRamuScene({ matching, reducedMotion }) {
  const strike = matching ? (reducedMotion ? 0.42 : 0.78) : 0.08;
  return (
    <>
      <Stage background="#100d0b" accent="#8c5d42" />
      <group name="PAIR_MEMBER_A" position={[strike,0,0]}>
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.06,-0.016]} color="#292018">
          <group name="BEATER_IMPACT">
            <mesh position={[0.24,0.08,0.28]} rotation={[0,0,-0.38]}>
              <cylinderGeometry args={[0.11,0.15,1.86,20]} />
              <meshStandardMaterial color="#a47a50" roughness={0.9} />
            </mesh>
            <Dot position={[-0.18,0.9,0.29]} radius={0.2} color="#7a5138" />
            <Bar position={[0,-1.12,0.16]} size={[1.72,0.1,0.04]} color="#b28b5d" />
          </group>
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B" position={[-strike*0.26,0,0]}>
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.06,0.016]} color="#251d17">
          <group name="SLIT_GONG_BODY">
            <mesh position={[0,0,0.24]} rotation={[0,0,Math.PI/2]}>
              <cylinderGeometry args={[0.52,0.64,2.08,28]} />
              <meshStandardMaterial color="#795237" roughness={0.9} emissive={matching?'#241309':'#000'} emissiveIntensity={matching?0.32:0} />
            </mesh>
            <Bar position={[0,0.02,0.53]} size={[1.58,0.105,0.055]} color="#27170f" />
            <Bar position={[0,0.16,0.54]} size={[1.3,0.035,0.03]} color={matching?'#c88d5d':'#684b38'} />
            {matching && [0.34,0.54,0.74].map((r,i)=>(
              <mesh key={r} position={[-0.78,0.02,0.62]} scale={[1,0.72,1]}>
                <torusGeometry args={[r,0.025,8,44]} />
                <meshStandardMaterial color={i%2?'#c59566':'#e0b078'} emissive="#69371d" emissiveIntensity={0.45} roughness={0.5} />
              </mesh>
            ))}
          </group>
        </CardPanel>
      </group>

      <group name="RELATION" position={[0,0.02,0.56]}>
        <group name="EVENT_TRACE">
          <Dot position={[-0.18,0.02,0.12]} radius={matching?0.12:0.065} color={matching?'#efc18b':'#66554a'} emissive={matching?'#8e4d26':'#000'} emissiveIntensity={matching?0.9:0} />
          <Bar position={[0.26,0.02,0.02]} size={[matching?1.02:0.42,0.045,0.03]} color={matching?'#c89a6a':'#5f564b'} />
          {matching && [0.08,0.3,0.52,0.74].map((x,i)=><Dot key={x} position={[x, i%2?0.2:-0.18,0.09]} radius={0.055} color={i%2?'#d0a068':'#9aaa70'} />)}
        </group>
        <group name="ORDERED_IMPACT_REGISTER">
          {[-0.38,0,0.38].map((x,i)=><Bar key={x} position={[x,-0.78,0]} size={[matching?0.28+0.18*i:0.16,0.07,0.035]} color={matching?(i%2?'#bf8d5e':'#8e9f6c'):'#5f554a'} />)}
        </group>
      </group>
    </>
  );
}
