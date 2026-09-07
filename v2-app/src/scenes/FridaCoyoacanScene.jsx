import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

export function FridaCoyoacanScene({ matching, reducedMotion }) {
  const beamY = matching ? 0.18 : 0.72;
  const reach = matching ? (reducedMotion ? 1.0 : 1.42) : 0.72;
  return (
    <>
      <Stage background="#120f10" accent="#9a6f65" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92, 0, 0]} rotation={[0,0.065,-0.018]} color="#2a2020">
          <group name="MIRROR_TRACE">
            <mesh position={[-0.12, 0.28, 0.18]}>
              <cylinderGeometry args={[0.82,0.82,0.08,48]} />
              <meshStandardMaterial color="#727d7e" metalness={0.72} roughness={0.24} />
            </mesh>
            <Bar position={[0,-0.92,0.15]} size={[1.38,0.12,0.06]} color="#936c55" />
            <Bar position={[-0.48,-1.24,0.14]} size={[0.82,0.09,0.06]} color="#936c55" rotation={[0,0,-0.35]} />
            <Bar position={[0.48,-1.24,0.14]} size={[0.82,0.09,0.06]} color="#936c55" rotation={[0,0,0.35]} />
          </group>
        </CardPanel>
      </group>
      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92, 0, 0]} rotation={[0,-0.065,0.018]} color="#261f1a">
          <group name="EASEL_REGISTER">
            <Bar position={[0,0.16,0.18]} size={[1.52,1.72,0.08]} color="#d3c2a4" />
            <Bar position={[0,-1.0,0.16]} size={[1.75,0.12,0.06]} color="#845f45" />
            <Bar position={[-0.52,-1.36,0.14]} size={[1.0,0.09,0.05]} color="#845f45" rotation={[0,0,-0.28]} />
            <Bar position={[0.52,-1.36,0.14]} size={[1.0,0.09,0.05]} color="#845f45" rotation={[0,0,0.28]} />
            <Dot position={[0,beamY,0.26]} radius={matching?0.15:0.09} color={matching?'#c66f59':'#66584b'} emissive={matching?'#7b3226':'#000'} emissiveIntensity={matching?0.8:0} />
          </group>
        </CardPanel>
      </group>
      <group name="RELATION">
        <group name="REFLECTED_PATH" position={[0,0.26,0.48]} rotation={[0,0,matching?-0.03:0.22]}>
          <Bar position={[-0.5,0,0]} size={[reach,0.055,0.045]} color={matching?'#d8b27a':'#75634f'} emissive={matching?'#7b5731':'#000'} emissiveIntensity={matching?0.55:0} />
          <Bar position={[0.52,beamY-0.26,0]} size={[reach,0.055,0.045]} color={matching?'#d8b27a':'#75634f'} emissive={matching?'#7b5731':'#000'} emissiveIntensity={matching?0.55:0} />
        </group>
        <Dot position={[0,0.26,0.52]} radius={0.11} color={matching?'#e8c791':'#625a50'} />
      </group>
    </>
  );
}
