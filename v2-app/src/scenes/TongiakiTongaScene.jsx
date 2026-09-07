import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

function Hull({color='#7f6548', lean=0}) {
  return (
    <group rotation={[0,0,lean]}>
      <mesh rotation={[0,0,Math.PI/2]}>
        <cylinderGeometry args={[0.22,0.34,2.1,24]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <Bar position={[0,0.22,0.12]} size={[1.62,0.12,0.05]} color="#b89762" />
    </group>
  );
}

export function TongiakiTongaScene({ matching, reducedMotion }) {
  const coupled = matching;
  const lean = matching ? (reducedMotion ? 0.01 : 0.025) : 0.15;
  return (
    <>
      <Stage background="#091116" accent="#5b8797" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.055,-0.014]} color="#17242a">
          <group name="HULL_A" position={[0,-0.08,0.25]}><Hull color="#896b49" lean={-lean} /></group>
          <Dot position={[-0.62,0.82,0.2]} radius={0.11} color="#c5aa73" />
          <Bar position={[0,-1.04,0.16]} size={[1.7,0.055,0.035]} color={coupled?'#6ba4ac':'#4d6870'} rotation={[0,0,coupled?0:-0.12]} />
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.055,0.014]} color="#17242a">
          <group name="HULL_B" position={[0,-0.08,0.25]}><Hull color="#79644a" lean={coupled?lean:-lean} /></group>
          <Dot position={[0.62,0.82,0.2]} radius={0.11} color="#c5aa73" />
          <Bar position={[0,-1.04,0.16]} size={[1.7,0.055,0.035]} color={coupled?'#6ba4ac':'#4d6870'} rotation={[0,0,coupled?0:0.12]} />
        </CardPanel>
      </group>

      <group name="RELATION" position={[0,0.04,0.54]}>
        <group name="CROSS_DECK_COUPLING">
          {[-0.48,-0.16,0.16,0.48].map((y)=><Bar key={y} position={[0,y,0]} size={[coupled?1.58:0.66,0.085,0.05]} color={coupled?'#c0a16b':'#62594c'} />)}
          {coupled && (
            <>
              <Bar position={[0,0,0.02]} size={[1.64,0.76,0.035]} color="#6b573b" />
              <Bar position={[-0.46,0,0.08]} size={[1.04,0.045,0.03]} color="#d0b27c" rotation={[0,0,0.72]} />
              <Bar position={[0.46,0,0.08]} size={[1.04,0.045,0.03]} color="#d0b27c" rotation={[0,0,-0.72]} />
            </>
          )}
        </group>
        <group name="STABILITY_RESPONSE">
          <Bar position={[0,-0.82,0.02]} size={[coupled?1.74:0.7,0.055,0.03]} color={coupled?'#82b8bd':'#53666b'} />
          {coupled && [-0.64,-0.32,0,0.32,0.64].map((x)=><Dot key={x} position={[x,-0.82,0.08]} radius={0.043} color="#a7d3d1" emissive="#3d7475" emissiveIntensity={0.5} />)}
        </group>
      </group>
    </>
  );
}
