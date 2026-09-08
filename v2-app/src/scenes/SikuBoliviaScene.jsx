import { Bar, CardPanel, Stage } from './Wave005Primitives.jsx';
import { sharedPhrase } from '../familyModels/relationalStudies.js';

function PipeSet({ side, active, enabled }) {
  return <>{[1.75,1.52,1.3,1.08].map((height,i) => <group key={i} position={[(i-1.5)*.4,-.6+height/2,.25]}>
    <mesh><cylinderGeometry args={[.14,.155,height,24,1,true]}/><meshStandardMaterial color={enabled ? (side === 'A' ? '#b49159' : '#9e9468') : '#696756'} roughness={.72} side={2}/></mesh>
    <mesh position={[0,height/2,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.128,.018,8,24]}/><meshStandardMaterial color="#d3bc86" roughness={.8}/></mesh>
    <mesh position={[0,height/2-.08,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.12,24]}/><meshStandardMaterial color="#24271c"/></mesh>
    {[0,1,2].map(n => <mesh key={n} position={[0,-height*.3+n*height*.3,0]}><cylinderGeometry args={[.158,.158,.025,24]}/><meshStandardMaterial color="#776a46" roughness={1}/></mesh>)}
    {active === i && <mesh position={[0,height/2+.13,0]}><sphereGeometry args={[.065,12,8]}/><meshStandardMaterial color="#ead8a0" emissive="#bba471" emissiveIntensity={.35}/></mesh>}
  </group>)}</>;
}
export function SikuBoliviaScene({ state }) {
  const last = state.events.at(-1) || [];
  const index = Math.floor((state.events.length-1)/2);
  return <>
    <Stage background="#171910" accent="#ac9661"/>
    <group name="PAIR_MEMBER_A"><CardPanel position={[-1.8,0,0]} color="#303125"><group name="IRA_NOTE_SET"><PipeSet side="A" enabled={state.members !== 'B'} active={last.includes('A') ? index : -1}/></group></CardPanel></group>
    <group name="PAIR_MEMBER_B"><CardPanel position={[1.8,0,0]} color="#272f24"><group name="ARCA_NOTE_SET"><PipeSet side="B" enabled={state.members !== 'A'} active={last.includes('B') ? index : -1}/></group></CardPanel></group>
    <group name="RELATION" position={[0,-1.4,.55]}><group name="INTERLOCK_TRACE">
      {Array.from({length:8},(_,i) => <group key={i} position={[(i-3.5)*.55,0,0]}>
        <Bar size={[.38,.025,.025]} color="#65664f"/>
        {(state.events[i] || []).map(side => <mesh key={side} position={[0,side === 'A' ? .12 : -.12,0]}><boxGeometry args={[.32,.12,.07]}/><meshStandardMaterial color={side === 'A' ? '#d9b77a' : '#a9bd87'} roughness={.8}/></mesh>)}
      </group>)}
    </group><group name="SHARED_PHRASE" visible={sharedPhrase(state)}><Bar position={[0,-.3,0]} size={[4.2,.035,.035]} color="#d0c49b"/></group></group>
  </>;
}
