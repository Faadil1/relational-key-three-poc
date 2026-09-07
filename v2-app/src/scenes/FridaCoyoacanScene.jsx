import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

function Crosshair({ active=false }) {
  return (
    <group>
      <Bar position={[0,0,0.02]} size={[0.56,0.045,0.03]} color={active?'#dca06d':'#746458'} />
      <Bar position={[0,0,0.02]} size={[0.045,0.56,0.03]} color={active?'#dca06d':'#746458'} />
      <Dot position={[0,0,0.06]} radius={0.045} color={active?'#f0c292':'#6e655d'} emissive={active?'#7b4d2f':'#000'} emissiveIntensity={active?0.7:0} />
    </group>
  );
}

export function FridaCoyoacanScene({ matching, reducedMotion }) {
  const beamY = matching ? 0.14 : 0.68;
  const reach = matching ? (reducedMotion ? 1.1 : 1.5) : 0.68;
  return (
    <>
      <Stage background="#120f10" accent="#a06f64" />

      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.065,-0.018]} color="#292021">
          <group name="MIRROR_TRACE">
            <mesh position={[-0.08,0.42,0.18]} rotation={[Math.PI/2,0,0]} scale={[1.2,1,0.78]}>
              <cylinderGeometry args={[0.76,0.76,0.075,56]} />
              <meshStandardMaterial color="#6c797d" metalness={0.82} roughness={0.13} emissive={matching?'#202c2f':'#000'} emissiveIntensity={matching?0.3:0} />
            </mesh>
            <mesh position={[-0.08,0.42,0.27]} scale={[1.2,0.78,1]}>
              <torusGeometry args={[0.76,0.048,12,72]} />
              <meshStandardMaterial color="#a97d5a" metalness={0.35} roughness={0.42} />
            </mesh>
            <group position={[-0.08,0.42,0.31]} scale={[0.72,0.72,0.72]}><Crosshair active={matching} /></group>
            <Bar position={[0,-0.9,0.15]} size={[1.52,0.11,0.06]} color="#936c55" />
            <Bar position={[-0.55,-1.24,0.14]} size={[0.92,0.09,0.06]} color="#936c55" rotation={[0,0,-0.34]} />
            <Bar position={[0.55,-1.24,0.14]} size={[0.92,0.09,0.06]} color="#936c55" rotation={[0,0,0.34]} />
          </group>
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.065,0.018]} color="#261f1a">
          <group name="EASEL_REGISTER">
            <mesh position={[0,0.28,0.17]}><boxGeometry args={[1.5,1.76,0.09]} /><meshStandardMaterial color="#d7c7aa" roughness={0.88} /></mesh>
            <mesh position={[0,0.28,0.23]}><boxGeometry args={[1.22,1.46,0.025]} /><meshStandardMaterial color="#cfc1a7" roughness={0.95} /></mesh>
            <Bar position={[0,-0.76,0.16]} size={[1.68,0.11,0.06]} color="#845f45" />
            <Bar position={[-0.54,-1.32,0.14]} size={[1.2,0.09,0.05]} color="#845f45" rotation={[0,0,-0.28]} />
            <Bar position={[0.54,-1.32,0.14]} size={[1.2,0.09,0.05]} color="#845f45" rotation={[0,0,0.28]} />
            <Bar position={[0,-1.08,0.13]} size={[0.09,0.78,0.05]} color="#845f45" />
            <group name="PROCEDURAL_TRACE_REGISTER" position={[0,beamY,0.3]}>
              <group scale={[matching?0.88:0.6,matching?0.88:0.6,0.88]}><Crosshair active={matching} /></group>
              {matching && (
                <>
                  <mesh rotation={[0,0,0.35]}><torusGeometry args={[0.28,0.026,8,46,Math.PI*1.55]} /><meshStandardMaterial color="#bb6553" emissive="#6c2d25" emissiveIntensity={0.58} roughness={0.5} /></mesh>
                  <Bar position={[0.17,-0.23,0]} size={[0.34,0.04,0.025]} color="#bb6553" rotation={[0,0,-0.72]} />
                </>
              )}
            </group>
          </group>
        </CardPanel>
      </group>

      <group name="RELATION">
        <group name="REFLECTED_PATH" position={[0,0.34,0.5]}>
          <Bar position={[-0.52,0,0]} size={[reach,0.052,0.042]} color={matching?'#e4bf88':'#75634f'} emissive={matching?'#7b5731':'#000'} emissiveIntensity={matching?0.62:0} rotation={[0,0,matching?-0.08:0.2]} />
          <Dot position={[0,0,0.08]} radius={0.1} color={matching?'#f1d29b':'#625a50'} emissive={matching?'#8e6337':'#000'} emissiveIntensity={matching?0.8:0} />
          <Bar position={[0.52,beamY-0.34,0]} size={[reach,0.052,0.042]} color={matching?'#e4bf88':'#75634f'} emissive={matching?'#7b5731':'#000'} emissiveIntensity={matching?0.62:0} rotation={[0,0,matching?0.04:0.22]} />
          {matching && [-0.68,-0.34,0.34,0.68].map((x)=><Dot key={x} position={[x,x<0?0:beamY-0.34,0.09]} radius={0.035} color="#f0d7a5" />)}
        </group>
      </group>
    </>
  );
}
