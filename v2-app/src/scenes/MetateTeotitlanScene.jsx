import { HoloPairCard } from './HoloPairCard.jsx';
import { useMemo } from 'react';
import { Bar, Stage } from './Wave005Primitives.jsx';

// Explicitly editorial surface: its record is driven only by accumulated work.
export function MetateTeotitlanScene({ state, presentation }) {
  const grains = useMemo(() => Array.from({ length: 64 }, (_, i) => ({
    x: Math.sin(i * 127.1) * .87, y: Math.cos(i * 43.7) * .48,
    radius: .015 + (i % 4) * .004,
  })), []);
  return <>
    <Stage background="#141412" accent="#a99c81" />
    <group name="PAIR_MEMBER_A">
      <HoloPairCard presentation={presentation} position={[-1.8,0,0]} color="#30312c">
        <group name="MANO_STROKE" position={[state.position * .35,0,state.contact ? .25 : .65]}>
          <mesh rotation={[0,0,Math.PI / 2]}><capsuleGeometry args={[.24,1.15,8,24]} /><meshStandardMaterial color="#8b8b80" roughness={.94} /></mesh>
          {grains.slice(0,24).map((g,i) => <mesh key={i} position={[g.x*.7,g.y*.35,.23]}><sphereGeometry args={[g.radius,6,4]} /><meshStandardMaterial color={i%2 ? '#6e7168' : '#b0afa1'} roughness={1}/></mesh>)}
        </group>
      </HoloPairCard>
    </group>
    <group name="PAIR_MEMBER_B">
      <HoloPairCard presentation={presentation} position={[1.8,0,0]} color="#282c28">
        <group name="GRIND_TRACE">
          <mesh position={[0,0,.25]} scale={[1.08,.7,.25]}><sphereGeometry args={[1,40,24]} /><meshStandardMaterial color="#686c64" roughness={.98}/></mesh>
          <mesh position={[0,0,.48]} scale={[.9,.5,.035]}><sphereGeometry args={[1,32,16]} /><meshStandardMaterial color="#454940" roughness={1}/></mesh>
          {grains.map((g,i) => <mesh key={i} position={[g.x,g.y,.52]} scale={i / grains.length < state.work ? [1.8,.8,.3] : [1,1,1]}><sphereGeometry args={[g.radius,6,4]} /><meshStandardMaterial color={i / grains.length < state.work ? '#d5bf92' : '#64675d'} roughness={1}/></mesh>)}
          <Bar position={[state.position*.72,0,.56]} size={[.06,1,.025]} color={state.contact ? '#b8a27a' : '#53584d'} />
        </group>
      </HoloPairCard>
    </group>
    <group name="RELATION"><group name="ABRASION_INTERFACE">
      <Bar position={[0,-.9,.3]} size={[state.contact ? 1.05 : .28,.045,.04]} color={state.contact ? '#bfa77b' : '#62695a'} />
    </group></group>
  </>;
}
