import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

function Hull({color='#7f6548'}){
  return <group><mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.22,0.34,2.1,24]}/><meshStandardMaterial color={color} roughness={0.9}/></mesh><Bar position={[0,0.22,0.12]} size={[1.62,0.12,0.05]} color="#b89762"/></group>;
}

export function TongiakiTongaScene({ matching, reducedMotion }) {
  const coupled = matching;
  const lean = matching ? (reducedMotion ? 0.015 : 0.05) : 0.16;
  return (
    <>
      <Stage background="#091116" accent="#5b8797" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.055,-0.014]} color="#17242a">
          <group name="HULL_A" position={[0,-0.1,0.25]} rotation={[0,0,-lean]}><Hull color="#896b49"/></group>
          <Dot position={[-0.62,0.82,0.2]} radius={0.11} color="#c5aa73" />
        </CardPanel>
      </group>
      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.055,0.014]} color="#17242a">
          <group name="HULL_B" position={[0,-0.1,0.25]} rotation={[0,0,coupled?-lean:lean]}><Hull color="#79644a"/></group>
          <Dot position={[0.62,0.82,0.2]} radius={0.11} color="#c5aa73" />
        </CardPanel>
      </group>
      <group name="RELATION" position={[0,0.04,0.52]}>
        <group name="CROSS_DECK_COUPLING">
          {[-0.42,0,0.42].map((y)=><Bar key={y} position={[0,y,0]} size={[coupled?1.52:0.68,0.09,0.05]} color={coupled?'#b79a65':'#62594c'} />)}
          <Bar position={[0,0.68,0]} size={[coupled?1.24:0.54,0.08,0.04]} color={coupled?'#8ca06d':'#5b5d50'} />
        </group>
        <group name="STABILITY_RESPONSE" visible={coupled}>
          <Dot position={[-0.46,-0.74,0.06]} radius={0.075} color="#8dc2c2" emissive="#33696d" emissiveIntensity={0.6}/>
          <Dot position={[0.46,-0.74,0.06]} radius={0.075} color="#8dc2c2" emissive="#33696d" emissiveIntensity={0.6}/>
        </group>
      </group>
    </>
  );
}
