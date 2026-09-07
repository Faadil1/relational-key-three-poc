import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

function ResonanceRing({ r, index }) {
  return (
    <mesh position={[-0.78,0.02,0.64]} scale={[1,0.72,1]}>
      <torusGeometry args={[r,0.024,8,48]} />
      <meshStandardMaterial color={index%2?'#c99a6b':'#e1b27c'} emissive="#6b391e" emissiveIntensity={0.46} roughness={0.48} />
    </mesh>
  );
}

export function GaramutSepikRamuScene({ matching, reducedMotion }) {
  const strike = matching ? (reducedMotion ? 0.4 : 0.76) : 0.08;
  return (
    <>
      <Stage background="#100d0b" accent="#905f43" />

      <group name="PAIR_MEMBER_A" position={[strike,0,0]}>
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.06,-0.016]} color="#292018">
          <group name="BEATER_IMPACT">
            <mesh position={[0.24,0.08,0.28]} rotation={[0,0,-0.38]}>
              <cylinderGeometry args={[0.11,0.15,1.86,24]} />
              <meshStandardMaterial color="#a77b50" roughness={0.9} />
            </mesh>
            <Dot position={[-0.18,0.9,0.3]} radius={0.2} color="#7d5339" />
            <Dot position={[0.56,-0.3,0.36]} radius={matching?0.08:0.045} color={matching?'#efbd82':'#70584a'} emissive={matching?'#83431f':'#000'} emissiveIntensity={matching?0.8:0} />
            <Bar position={[0,-1.12,0.16]} size={[1.72,0.1,0.04]} color="#b58d5e" />
          </group>
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B" position={[-strike*0.24,0,0]}>
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.06,0.016]} color="#251d17">
          <group name="SLIT_GONG_BODY">
            <mesh position={[0,0,0.24]} rotation={[0,0,Math.PI/2]}>
              <cylinderGeometry args={[0.52,0.64,2.1,32]} />
              <meshStandardMaterial color="#7d5438" roughness={0.9} emissive={matching?'#261409':'#000'} emissiveIntensity={matching?0.34:0} />
            </mesh>
            <mesh position={[0,0.02,0.54]}>
              <boxGeometry args={[1.58,0.11,0.07]} />
              <meshStandardMaterial color="#25160f" roughness={0.96} />
            </mesh>
            <Bar position={[0,0.17,0.55]} size={[1.32,0.032,0.028]} color={matching?'#cc915f':'#684b38'} />
            <Bar position={[0,-0.13,0.55]} size={[1.2,0.025,0.025]} color={matching?'#9f6f4d':'#5f4737'} />
            {matching && [0.3,0.48,0.66,0.84].map((r,i)=><ResonanceRing key={r} r={r} index={i} />)}
            {matching && [-0.56,-0.28,0,0.28,0.56].map((x,i)=><Dot key={x} position={[x,0.02,0.66]} radius={0.032+(i%2)*0.005} color="#dfb17c" emissive="#75401f" emissiveIntensity={0.35} />)}
          </group>
        </CardPanel>
      </group>

      <group name="RELATION" position={[0,0.02,0.58]}>
        <group name="EVENT_TRACE">
          <Dot position={[-0.2,0.02,0.13]} radius={matching?0.12:0.064} color={matching?'#f0c38c':'#66554a'} emissive={matching?'#8f4d26':'#000'} emissiveIntensity={matching?0.92:0} />
          <Bar position={[0.2,0.02,0.02]} size={[matching?0.9:0.4,0.042,0.028]} color={matching?'#ca9b6a':'#5f564b'} />
          {matching && [0.04,0.22,0.4,0.58,0.76].map((x,i)=><Dot key={x} position={[x,(i%2?0.18:-0.16)*(1-i*0.08),0.1]} radius={0.045+(i===0?0.012:0)} color={i%2?'#d1a16a':'#9dad72'} />)}
        </group>
        <group name="ORDERED_IMPACT_REGISTER">
          {[-0.42,-0.14,0.14,0.42].map((x,i)=><Bar key={x} position={[x,-0.8,0]} size={[matching?0.2+0.14*i:0.14,0.065,0.032]} color={matching?(i%2?'#c18f60':'#91a16f'):'#5f554a'} />)}
          {matching && <Bar position={[0,-0.96,0]} size={[1.28,0.035,0.022]} color="#9b724e" />}
        </group>
      </group>
    </>
  );
}
