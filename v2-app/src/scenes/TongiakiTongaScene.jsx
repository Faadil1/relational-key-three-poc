import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

function Hull({color='#7f6548', lean=0}) {
  return (
    <group rotation={[0,0,lean]}>
      <mesh rotation={[0,0,Math.PI/2]} scale={[1,0.92,1]}>
        <cylinderGeometry args={[0.2,0.34,2.12,28]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <Bar position={[0,0.22,0.12]} size={[1.64,0.115,0.05]} color="#ba9964" />
      <Bar position={[0,-0.18,0.09]} size={[1.34,0.045,0.028]} color="#624b36" />
    </group>
  );
}

export function TongiakiTongaScene({ matching, reducedMotion }) {
  const coupled = matching;
  const lean = matching ? (reducedMotion ? 0.008 : 0.02) : 0.15;
  const slats=[-0.5,-0.3,-0.1,0.1,0.3,0.5];
  return (
    <>
      <Stage background="#081116" accent="#5b8999" />

      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.055,-0.014]} color="#17242a">
          <group name="HULL_A" position={[0,-0.08,0.25]}><Hull color="#8f6d49" lean={-lean} /></group>
          <Dot position={[-0.64,0.82,0.2]} radius={0.105} color="#ccb077" />
          <Bar position={[0,-1.02,0.16]} size={[1.72,0.052,0.032]} color={coupled?'#70a9b0':'#4d6870'} rotation={[0,0,coupled?0:-0.12]} />
          {coupled && [-0.58,0,0.58].map((x)=><Dot key={x} position={[x,-1.02,0.21]} radius={0.03} color="#9ac8c8" />)}
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.055,0.014]} color="#17242a">
          <group name="HULL_B" position={[0,-0.08,0.25]}><Hull color="#7e684b" lean={coupled?lean:-lean} /></group>
          <Dot position={[0.64,0.82,0.2]} radius={0.105} color="#ccb077" />
          <Bar position={[0,-1.02,0.16]} size={[1.72,0.052,0.032]} color={coupled?'#70a9b0':'#4d6870'} rotation={[0,0,coupled?0:0.12]} />
          {coupled && [-0.58,0,0.58].map((x)=><Dot key={x} position={[x,-1.02,0.21]} radius={0.03} color="#9ac8c8" />)}
        </CardPanel>
      </group>

      <group name="RELATION" position={[0,0.04,0.56]}>
        <group name="CROSS_DECK_COUPLING">
          {slats.map((y,i)=><Bar key={y} position={[0,y,0.02+(i%2)*0.018]} size={[coupled?1.62:0.66,0.075,0.045]} color={coupled?(i%2?'#c3a36d':'#ad8958'):'#62594c'} />)}
          {coupled && (
            <>
              <Bar position={[0,0,0]} size={[1.7,0.86,0.025]} color="#68543a" />
              <Bar position={[-0.46,0,0.1]} size={[1.04,0.04,0.028]} color="#d6b77f" rotation={[0,0,0.72]} />
              <Bar position={[0.46,0,0.1]} size={[1.04,0.04,0.028]} color="#d6b77f" rotation={[0,0,-0.72]} />
              <Bar position={[0,0.68,0.08]} size={[1.34,0.05,0.03]} color="#9bb287" />
            </>
          )}
        </group>

        <group name="STABILITY_RESPONSE">
          <Bar position={[0,-0.86,0.02]} size={[coupled?1.82:0.7,0.052,0.03]} color={coupled?'#88bec2':'#53666b'} />
          {coupled && [-0.72,-0.48,-0.24,0,0.24,0.48,0.72].map((x,i)=><Dot key={x} position={[x,-0.86+(i%2?0.025:-0.025),0.09]} radius={0.036} color="#add8d5" emissive="#3e7777" emissiveIntensity={0.45} />)}
          {coupled && (
            <>
              <Bar position={[-0.78,-0.58,0.05]} size={[0.54,0.035,0.022]} color="#5e9099" rotation={[0,0,0.12]} />
              <Bar position={[0.78,-0.58,0.05]} size={[0.54,0.035,0.022]} color="#5e9099" rotation={[0,0,-0.12]} />
            </>
          )}
        </group>
      </group>
    </>
  );
}
