import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

const field = [
  [-0.58,0.58], [0,0.58], [0.58,0.58],
  [-0.58,0],               [0.58,0],
  [-0.58,-0.58],[0,-0.58],[0.58,-0.58],
];

function Diamond({ x, y, color='#ad8c55', active=false, scale=1 }) {
  return (
    <mesh position={[x,y,0.2]} rotation={[0,0,Math.PI/4]} scale={scale}>
      <boxGeometry args={[0.42,0.42,0.08]} />
      <meshStandardMaterial color={color} emissive={active?'#245f58':'#000'} emissiveIntensity={active?0.55:0} roughness={0.72} />
    </mesh>
  );
}

export function ZelligeFesScene({ matching, reducedMotion }) {
  const pieceX = matching ? 1.92 : (reducedMotion ? -0.12 : -0.52);
  return (
    <>
      <Stage background="#0c1010" accent="#4b8d88" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.065,-0.018]} color="#182526">
          <group name="CUT_PROFILE_A">
            {[-0.72,-0.24,0.24,0.72].map((y,i)=><Diamond key={y} x={0.2+(i%2)*0.34} y={y} color={i%2?'#d1ae69':'#8da172'} scale={0.9} />)}
            <Bar position={[-0.56,0,0.18]} size={[0.08,2.18,0.05]} color="#cfb26f" />
            <Bar position={[0.58,0,0.17]} size={[0.08,2.18,0.05]} color="#6f8d76" />
          </group>
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.065,0.018]} color="#172326">
          <group name="TESSELLATION_B">
            {field.map(([x,y],i)=><Diamond key={`${x}-${y}`} x={x} y={y} color={i%2?'#b28f57':'#7f986d'} active={matching && i%3===1} />)}
            <Bar position={[0,0,0.16]} size={[0.72,0.72,0.03]} color="#101819" rotation={[0,0,Math.PI/4]} />
          </group>
        </CardPanel>
      </group>

      <group name="RELATION" position={[0,0,0.54]}>
        <group name="MATERIAL_FIT" position={[pieceX,0,0]}>
          <Diamond x={0} y={0} color={matching?'#d6b46d':'#6d6250'} active={matching} scale={1.04} />
          <Dot position={[0,0,0.14]} radius={0.06} color={matching?'#9ad0b7':'#635d52'} />
        </group>
        <Bar position={[0,-0.86,0]} size={[matching?2.9:0.72,0.055,0.035]} color={matching?'#79afa0':'#61584a'} />
        {matching && [-0.72,-0.36,0,0.36,0.72].map((x)=><Dot key={x} position={[x,-0.86,0.07]} radius={0.038} color="#a9c6a2" />)}
      </group>
    </>
  );
}
