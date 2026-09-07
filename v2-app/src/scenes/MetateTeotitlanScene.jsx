import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

export function MetateTeotitlanScene({ matching, reducedMotion }) {
  const contact = matching ? (reducedMotion ? 0.34 : 0.64) : 0;
  const traces=[[-0.52,-0.2],[-0.28,0.04],[-0.02,-0.12],[0.22,0.1],[0.48,-0.02],[-0.34,0.34],[0.18,0.4]];
  return (
    <>
      <Stage background="#100e0c" accent="#8f684d" />
      <group name="PAIR_MEMBER_A" position={[contact,0,0]}>
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.055,-0.015]} color="#28221d">
          <group name="MANO_STROKE">
            <mesh position={[0.15,0.12,0.28]} rotation={[0,0,-0.18]}><cylinderGeometry args={[0.23,0.28,1.86,28]}/><meshStandardMaterial color="#9d7658" roughness={0.98}/></mesh>
            <Bar position={[0,-1.06,0.16]} size={[1.72,0.12,0.05]} color="#675444" />
          </group>
        </CardPanel>
      </group>
      <group name="PAIR_MEMBER_B" position={[-contact*0.42,0,0]}>
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.055,0.015]} color="#24201d">
          <group name="GRIND_TRACE">
            <mesh position={[0,-0.02,0.18]}><boxGeometry args={[1.92,1.26,0.16]}/><meshStandardMaterial color="#6d5747" roughness={1}/></mesh>
            <mesh position={[0,0,0.29]}><boxGeometry args={[1.58,0.9,0.03]}/><meshStandardMaterial color={matching?'#8e7054':'#564b42'} roughness={1}/></mesh>
            {traces.map(([x,y],i)=><Dot key={`${x}-${y}`} position={[x,y,0.34]} radius={matching?0.07+0.01*(i%2):0.035} color={matching?'#c5a071':'#63584e'} />)}
          </group>
        </CardPanel>
      </group>
      <group name="RELATION" position={[0,-0.02,0.52]}>
        <group name="ABRASION_INTERFACE">
          <mesh rotation={[0,0,matching?-0.08:0.22]}><boxGeometry args={[1.18,0.18,0.08]}/><meshStandardMaterial color={matching?'#a97c56':'#65574b'} roughness={0.96}/></mesh>
          {matching && traces.slice(0,5).map(([x,y],i)=><Dot key={i} position={[x*0.65,y*0.55,0.09]} radius={0.045} color="#d0aa78" />)}
        </group>
        <Bar position={[0,-0.66,0]} size={[matching?1.36:0.62,0.055,0.03]} color={matching?'#b08a60':'#64594c'} />
      </group>
    </>
  );
}
