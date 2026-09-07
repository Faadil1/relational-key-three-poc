import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

const traces=[[-0.58,-0.22],[-0.34,0.02],[-0.1,-0.14],[0.16,0.08],[0.42,-0.04],[-0.38,0.34],[0.08,0.38],[0.52,0.26]];

export function MetateTeotitlanScene({ matching, reducedMotion }) {
  const contact = matching ? (reducedMotion ? 0.26 : 0.48) : 0;
  return (
    <>
      <Stage background="#100e0c" accent="#8f684d" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.055,-0.015]} color="#28221d">
          <group name="MANO_STROKE">
            <mesh position={[0.24+contact,0.12,0.28]} rotation={[0,0,Math.PI/2]}>
              <cylinderGeometry args={[0.24,0.29,1.72,28]} />
              <meshStandardMaterial color="#9d7658" roughness={0.98} />
            </mesh>
            <Bar position={[0,-1.06,0.16]} size={[1.72,0.12,0.05]} color="#675444" />
            <Bar position={[0.62,-0.78,0.18]} size={[0.52,0.07,0.04]} color="#b18b66" />
          </group>
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.055,0.015]} color="#24201d">
          <group name="GRIND_TRACE">
            <mesh position={[0,-0.02,0.18]} rotation={[-0.08,0,0]}>
              <boxGeometry args={[2.0,1.34,0.18]} />
              <meshStandardMaterial color="#6d5747" roughness={1} />
            </mesh>
            <mesh position={[0,0,0.29]}>
              <boxGeometry args={[1.62,0.82,0.035]} />
              <meshStandardMaterial color={matching?'#8e7054':'#564b42'} roughness={1} />
            </mesh>
            <Bar position={[0,0.02,0.34]} size={[1.46,0.18,0.025]} color={matching?'#b08762':'#65574b'} />
            {traces.map(([x,y],i)=><Dot key={`${x}-${y}`} position={[x,y,0.36]} radius={matching?0.045+0.008*(i%2):0.03} color={matching?'#d1aa76':'#63584e'} />)}
          </group>
        </CardPanel>
      </group>

      <group name="RELATION" position={[0,0.02,0.54]}>
        <group name="ABRASION_INTERFACE">
          <mesh position={[-0.4,0.12,0]} rotation={[0,0,Math.PI/2]}>
            <cylinderGeometry args={[0.18,0.2,matching?1.35:0.54,24]} />
            <meshStandardMaterial color={matching?'#a97c56':'#65574b'} roughness={0.96} />
          </mesh>
          <Bar position={[0.38,0.02,0.02]} size={[matching?1.18:0.46,0.2,0.04]} color={matching?'#b68c63':'#62564a'} />
          {matching && traces.slice(0,6).map(([x,y],i)=><Dot key={i} position={[0.22+x*0.5,y*0.45,0.1]} radius={0.038} color="#d4ad78" />)}
        </group>
        <Bar position={[0,-0.72,0]} size={[matching?1.72:0.62,0.055,0.03]} color={matching?'#b08a60':'#64594c'} />
      </group>
    </>
  );
}
