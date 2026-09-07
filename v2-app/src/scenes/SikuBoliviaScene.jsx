import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

const pipeHeights=[1.75,1.52,1.3,1.08,0.88];

function PipeSet({side=1,color='#9a744a'}){
  return <>{pipeHeights.map((h,i)=><mesh key={h} position={[(i-2)*0.34*side,-0.45+h/2,0.18]}><cylinderGeometry args={[0.12,0.14,h,18]}/><meshStandardMaterial color={color} roughness={0.86}/></mesh>)}</>;
}

export function SikuBoliviaScene({ matching, reducedMotion }) {
  const beat = matching ? (reducedMotion ? 0.12 : 0.28) : 0;
  const events=[-0.72,-0.48,-0.24,0,0.24,0.48,0.72];
  return (
    <>
      <Stage background="#11100c" accent="#a27b47" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.06,-0.015]} color="#282217">
          <group name="IRA_NOTE_SET"><PipeSet side={1} color="#a47743"/><Bar position={[0,-1.14,0.17]} size={[1.8,0.1,0.05]} color="#d0aa68"/></group>
        </CardPanel>
      </group>
      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.06,0.015]} color="#25231a">
          <group name="ARCA_NOTE_SET"><PipeSet side={-1} color="#7d875a"/><Bar position={[0,-1.14,0.17]} size={[1.8,0.1,0.05]} color="#b6a56d"/></group>
        </CardPanel>
      </group>
      <group name="RELATION" position={[0,0.1,0.5]}>
        <group name="INTERLOCK_TRACE">
          {events.map((x,i)=><Dot key={x} position={[x,(i%2?0.28:-0.28)+(matching?(i%2?beat:-beat):0),0]} radius={matching?0.105:0.07} color={i%2?'#93a46c':'#c39757'} emissive={matching?(i%2?'#3a4c27':'#6c421e'):'#000'} emissiveIntensity={matching?0.65:0}/>) }
          <Bar position={[0,0, -0.02]} size={[matching?1.7:0.72,0.045,0.03]} color={matching?'#d1b77a':'#625b4d'} />
        </group>
        <group name="SHARED_PHRASE" visible={matching}>
          <Dot position={[0,0.72,0.06]} radius={0.11} color="#dfc78d" emissive="#705c2e" emissiveIntensity={0.8}/>
        </group>
      </group>
    </>
  );
}
