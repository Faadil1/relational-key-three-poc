import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

const field = [
  [-0.62,0.62], [0,0.62], [0.62,0.62],
  [-0.62,0],               [0.62,0],
  [-0.62,-0.62],[0,-0.62],[0.62,-0.62],
];

function Diamond({ x, y, color='#ad8c55', active=false, scale=1, z=0.2 }) {
  return (
    <mesh position={[x,y,z]} rotation={[0,0,Math.PI/4]} scale={scale}>
      <boxGeometry args={[0.42,0.42,0.08]} />
      <meshStandardMaterial color={color} emissive={active?'#245f58':'#000'} emissiveIntensity={active?0.58:0} roughness={0.7} metalness={0.03} />
    </mesh>
  );
}

export function ZelligeFesScene({ matching, reducedMotion }) {
  const pieceX = matching ? 1.92 : (reducedMotion ? -0.16 : -0.58);
  const pieceZ = matching ? 0.08 : 0.24;
  return (
    <>
      <Stage background="#0b1010" accent="#4e918a" />

      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.065,-0.018]} color="#182526">
          <group name="CUT_PROFILE_A">
            {[-0.72,-0.24,0.24,0.72].map((y,i)=><Diamond key={y} x={0.2+(i%2)*0.34} y={y} color={i%2?'#d1ae69':'#8da172'} scale={0.9} z={0.22+(i%2)*0.02} />)}
            <Bar position={[-0.56,0,0.18]} size={[0.08,2.18,0.05]} color="#cfb26f" />
            <Bar position={[0.58,0,0.17]} size={[0.08,2.18,0.05]} color="#6f8d76" />
            <group position={[0,-1.05,0.28]}>
              <Diamond x={-0.34} y={0} color="#d7b66f" scale={0.72} />
              <Diamond x={0.04} y={0} color="#8fa174" scale={0.72} />
              <Diamond x={0.42} y={0} color="#b98d56" scale={0.72} />
            </group>
          </group>
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.065,0.018]} color="#172326">
          <group name="TESSELLATION_B">
            {field.map(([x,y],i)=><Diamond key={`${x}-${y}`} x={x} y={y} color={i%2?'#b28f57':'#7f986d'} active={matching && i%3===1} z={0.21+(i%2)*0.02} />)}
            <mesh position={[0,0,0.16]} rotation={[0,0,Math.PI/4]}>
              <boxGeometry args={[0.5,0.5,0.055]} />
              <meshStandardMaterial color="#0d1515" roughness={0.9} />
            </mesh>
            {[-0.94,-0.47,0,0.47,0.94].map((x)=><Bar key={x} position={[x,-1.04,0.16]} size={[0.04,0.16,0.03]} color="#4c665d" />)}
          </group>
        </CardPanel>
      </group>

      <group name="RELATION" position={[0,0,0.56]}>
        <group name="MATERIAL_FIT" position={[pieceX,0,pieceZ]}>
          <Diamond x={0} y={0} color={matching?'#d9b870':'#6d6250'} active={matching} scale={1.04} z={0.2} />
          <mesh position={[0,0,0.28]} rotation={[0,0,Math.PI/4]}>
            <boxGeometry args={[0.24,0.24,0.022]} />
            <meshStandardMaterial color={matching?'#91c6ae':'#5f5a51'} roughness={0.7} />
          </mesh>
        </group>
        <Bar position={[0,-0.88,0]} size={[matching?2.98:0.72,0.055,0.035]} color={matching?'#7cb2a2':'#61584a'} />
        {matching && [-0.84,-0.56,-0.28,0,0.28,0.56,0.84].map((x,i)=><Dot key={x} position={[x,-0.88,0.08]} radius={0.034+(i%2)*0.005} color={i%2?'#d5bc7a':'#9fc09e'} emissive="#3d685e" emissiveIntensity={0.32} />)}
        {matching && (
          <group position={[1.92,0,0.14]}>
            <mesh rotation={[0,0,Math.PI/4]}><torusGeometry args={[0.4,0.025,8,36]} /><meshStandardMaterial color="#8ec3aa" emissive="#315f55" emissiveIntensity={0.42} roughness={0.55} /></mesh>
          </group>
        )}
      </group>
    </>
  );
}
