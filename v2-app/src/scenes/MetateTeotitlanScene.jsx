import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

const traces=[[-0.58,-0.22],[-0.34,0.02],[-0.1,-0.14],[0.16,0.08],[0.42,-0.04],[-0.38,0.34],[0.08,0.38],[0.52,0.26]];

function StoneBed({ matching=false }) {
  return (
    <group>
      <mesh position={[0,-0.02,0.18]} rotation={[-0.08,0,0]} scale={[1.22,0.82,0.34]}>
        <cylinderGeometry args={[0.82,0.92,0.42,36]} />
        <meshStandardMaterial color="#6f5948" roughness={1} />
      </mesh>
      <mesh position={[0,0.02,0.36]} scale={[1.08,0.54,0.1]}>
        <cylinderGeometry args={[0.76,0.82,0.18,36]} />
        <meshStandardMaterial color={matching?'#927256':'#574b42'} roughness={1} />
      </mesh>
      <Bar position={[0,0.02,0.43]} size={[1.46,0.17,0.028]} color={matching?'#b98e64':'#65574b'} />
    </group>
  );
}

export function MetateTeotitlanScene({ matching, reducedMotion }) {
  const contact = matching ? (reducedMotion ? 0.24 : 0.44) : 0;
  return (
    <>
      <Stage background="#100e0c" accent="#916a4d" />

      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.055,-0.015]} color="#28221d">
          <group name="MANO_STROKE">
            <mesh position={[0.18+contact,0.12,0.3]} rotation={[0,0,Math.PI/2]} scale={[1,1.08,1]}>
              <cylinderGeometry args={[0.25,0.31,1.76,32]} />
              <meshStandardMaterial color="#a27b5c" roughness={0.98} />
            </mesh>
            {[-0.52,-0.18,0.18,0.52].map((x,i)=><Dot key={x} position={[x+contact*0.4,0.12,0.47]} radius={0.035+(i%2)*0.007} color="#c09a73" />)}
            <Bar position={[0,-1.06,0.16]} size={[1.72,0.12,0.05]} color="#675444" />
            <Bar position={[0.62,-0.78,0.18]} size={[0.52,0.07,0.04]} color="#b18b66" />
          </group>
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.055,0.015]} color="#24201d">
          <group name="GRIND_TRACE">
            <StoneBed matching={matching} />
            {traces.map(([x,y],i)=><Dot key={`${x}-${y}`} position={[x,y,0.48]} radius={matching?0.045+0.008*(i%2):0.028} color={matching?'#d5ad77':'#63584e'} emissive={matching?'#6c4a2d':'#000'} emissiveIntensity={matching?0.2:0} />)}
            {matching && [-0.48,-0.16,0.16,0.48].map((x)=><Bar key={x} position={[x,0.02,0.46]} size={[0.22,0.028,0.018]} color="#ddbc8a" />)}
          </group>
        </CardPanel>
      </group>

      <group name="RELATION" position={[0,0.02,0.56]}>
        <group name="ABRASION_INTERFACE">
          <mesh position={[-0.42,0.1,0.02]} rotation={[0,0,Math.PI/2]}>
            <cylinderGeometry args={[0.18,0.21,matching?1.38:0.56,26]} />
            <meshStandardMaterial color={matching?'#ad8059':'#65574b'} roughness={0.96} />
          </mesh>
          <mesh position={[0.4,0.02,0.01]} scale={[0.92,0.4,0.12]}>
            <cylinderGeometry args={[0.64,0.7,0.18,28]} />
            <meshStandardMaterial color={matching?'#8d6e53':'#5f5348'} roughness={1} />
          </mesh>
          <Bar position={[0.38,0.02,0.11]} size={[matching?1.2:0.46,0.16,0.032]} color={matching?'#bd946b':'#62564a'} />
          {matching && traces.slice(0,6).map(([x,y],i)=><Dot key={i} position={[0.22+x*0.5,y*0.42,0.16]} radius={0.035} color="#ddb982" />)}
        </group>
        <Bar position={[0,-0.74,0]} size={[matching?1.78:0.62,0.052,0.028]} color={matching?'#b98f64':'#64594c'} />
        {matching && [-0.6,-0.3,0,0.3,0.6].map((x,i)=><Dot key={x} position={[x,-0.74,0.07]} radius={0.032+(i%2)*0.004} color="#d8b07b" />)}
      </group>
    </>
  );
}
