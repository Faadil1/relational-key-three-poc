import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

const tilePositions=[[-0.58,0.64],[-0.02,0.64],[0.54,0.64],[-0.58,0.08],[-0.02,0.08],[0.54,0.08],[-0.58,-0.48],[-0.02,-0.48],[0.54,-0.48]];

function Tile({x,y,active=false,rotation=0}){
  return <mesh position={[x,y,0.18]} rotation={[0,0,rotation]}><cylinderGeometry args={[0.27,0.27,0.07,8]} /><meshStandardMaterial color={active?'#66a79d':'#aa8b56'} emissive={active?'#285f58':'#000'} emissiveIntensity={active?0.55:0} roughness={0.72}/></mesh>;
}

export function ZelligeFesScene({ matching, reducedMotion }) {
  const seat = matching ? (reducedMotion ? 0.18 : 0.42) : 0;
  return (
    <>
      <Stage background="#0c1010" accent="#4b8d88" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.065,-0.018]} color="#182526">
          <group name="CUT_PROFILE_A">
            {tilePositions.map(([x,y],i)=><Tile key={`${x}-${y}`} x={x} y={y} rotation={(i%3)*0.18} />)}
            <mesh position={[0,-1.1,0.2]} rotation={[0,0,0.39]}><cylinderGeometry args={[0.36,0.36,0.08,8]}/><meshStandardMaterial color="#d0b06b" roughness={0.7}/></mesh>
          </group>
        </CardPanel>
      </group>
      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.065,0.018]} color="#172326">
          <group name="TESSELLATION_B">
            {tilePositions.map(([x,y],i)=><Tile key={`${x}-${y}`} x={x} y={y} active={matching&&i===4} rotation={-(i%3)*0.18} />)}
            <mesh position={[0,-1.1,0.2]} rotation={[0,0,-0.39]}><cylinderGeometry args={[0.36,0.36,0.08,8]}/><meshStandardMaterial color="#87926b" roughness={0.7}/></mesh>
          </group>
        </CardPanel>
      </group>
      <group name="RELATION" position={[0,-0.05,0.5]}>
        <group name="MATERIAL_FIT" position={[matching?seat:0,matching?0:0.28,0]} rotation={[0,0,matching?0:-0.26]}>
          <mesh><cylinderGeometry args={[0.46,0.46,0.12,8]}/><meshStandardMaterial color={matching?'#d5b46b':'#665e4e'} emissive={matching?'#70551d':'#000'} emissiveIntensity={matching?0.45:0} roughness={0.64}/></mesh>
          <Dot position={[0,0,0.12]} radius={0.08} color={matching?'#82b6a5':'#5f594e'} />
        </group>
        <Bar position={[0,-0.72,0]} size={[matching?1.1:0.58,0.07,0.04]} color={matching?'#78afa0':'#61584a'} />
      </group>
    </>
  );
}
