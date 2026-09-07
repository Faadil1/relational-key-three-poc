import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

export function FridaCoyoacanScene({ matching, reducedMotion }) {
  const beamY = matching ? 0.14 : 0.72;
  const reach = matching ? (reducedMotion ? 1.08 : 1.48) : 0.68;
  return (
    <>
      <Stage background="#120f10" accent="#9a6f65" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92, 0, 0]} rotation={[0,0.065,-0.018]} color="#292021">
          <group name="MIRROR_TRACE">
            <mesh position={[-0.08, 0.42, 0.2]} rotation={[Math.PI/2,0,0]} scale={[1.18,1,0.76]}>
              <cylinderGeometry args={[0.76,0.76,0.07,48]} />
              <meshStandardMaterial color="#69787c" metalness={0.8} roughness={0.16} emissive={matching?'#202c2f':'#000'} emissiveIntensity={matching?0.25:0} />
            </mesh>
            <mesh position={[-0.08,0.42,0.26]} scale={[1.18,0.76,1]}>
              <torusGeometry args={[0.76,0.045,12,64]} />
              <meshStandardMaterial color="#a37a58" metalness={0.35} roughness={0.48} />
            </mesh>
            <Dot position={[-0.08,0.42,0.3]} radius={matching?0.11:0.07} color={matching?'#d9c6aa':'#7b756d'} emissive={matching?'#6f5740':'#000'} emissiveIntensity={matching?0.65:0} />
            <Bar position={[0,-0.9,0.15]} size={[1.52,0.11,0.06]} color="#936c55" />
            <Bar position={[-0.55,-1.24,0.14]} size={[0.92,0.09,0.06]} color="#936c55" rotation={[0,0,-0.34]} />
            <Bar position={[0.55,-1.24,0.14]} size={[0.92,0.09,0.06]} color="#936c55" rotation={[0,0,0.34]} />
          </group>
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92, 0, 0]} rotation={[0,-0.065,0.018]} color="#261f1a">
          <group name="EASEL_REGISTER">
            <Bar position={[0,0.28,0.17]} size={[1.46,1.72,0.09]} color="#d7c7aa" />
            <Bar position={[0,-0.76,0.16]} size={[1.68,0.11,0.06]} color="#845f45" />
            <Bar position={[-0.54,-1.32,0.14]} size={[1.2,0.09,0.05]} color="#845f45" rotation={[0,0,-0.28]} />
            <Bar position={[0.54,-1.32,0.14]} size={[1.2,0.09,0.05]} color="#845f45" rotation={[0,0,0.28]} />
            <Bar position={[0,-1.08,0.13]} size={[0.09,0.78,0.05]} color="#845f45" />
            {matching && (
              <group name="PROCEDURAL_TRACE_REGISTER" position={[0,beamY,0.28]}>
                <mesh>
                  <torusGeometry args={[0.22,0.035,10,42,Math.PI*1.55]} />
                  <meshStandardMaterial color="#b85f50" emissive="#6d2c24" emissiveIntensity={0.6} roughness={0.5} />
                </mesh>
                <Bar position={[0.12,-0.24,0]} size={[0.34,0.045,0.03]} color="#b85f50" rotation={[0,0,-0.8]} />
                <Dot position={[0.18,0.08,0.02]} radius={0.045} color="#e4a08d" />
              </group>
            )}
          </group>
        </CardPanel>
      </group>

      <group name="RELATION">
        <group name="REFLECTED_PATH" position={[0,0.34,0.5]}>
          <Bar position={[-0.48,0,0]} size={[reach,0.055,0.045]} color={matching?'#e3be86':'#75634f'} emissive={matching?'#7b5731':'#000'} emissiveIntensity={matching?0.6:0} rotation={[0,0,matching?-0.06:0.2]} />
          <Dot position={[0,0,0.08]} radius={0.1} color={matching?'#f0d29d':'#625a50'} emissive={matching?'#8e6337':'#000'} emissiveIntensity={matching?0.75:0} />
          <Bar position={[0.5,beamY-0.34,0]} size={[reach,0.055,0.045]} color={matching?'#e3be86':'#75634f'} emissive={matching?'#7b5731':'#000'} emissiveIntensity={matching?0.6:0} rotation={[0,0,matching?0.04:0.22]} />
          {matching && [0.18,0.42,0.66].map((x)=><Dot key={x} position={[x,beamY-0.34,0.08]} radius={0.04} color="#f2d6a5" />)}
        </group>
      </group>
    </>
  );
}
