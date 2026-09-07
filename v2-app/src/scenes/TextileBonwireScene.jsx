import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

const rows = [-0.9,-0.6,-0.3,0,0.3,0.6,0.9];

export function TextileBonwireScene({ matching, reducedMotion }) {
  const reach = matching ? (reducedMotion ? 0.78 : 1.08) : 0.32;
  return (
    <>
      <Stage background="#0f100d" accent="#8e7a45" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.06,-0.015]} color="#24251d">
          <group name="WOVEN_STRIP_A">
            {rows.map((y,i)=><Bar key={y} position={[0,y,0.17]} size={[1.86,0.08,0.045]} color={i%2?'#a07a48':'#66573a'} />)}
            {[-0.72,-0.36,0,0.36,0.72].map((x)=><Bar key={x} position={[x,0,0.18]} size={[0.065,2.18,0.04]} color="#c2a46c" />)}
          </group>
        </CardPanel>
      </group>
      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.06,0.015]} color="#22261f">
          <group name="WOVEN_STRIP_B">
            {rows.map((y,i)=><Bar key={y} position={[0,y,0.17]} size={[1.86,0.08,0.045]} color={i%2?'#8c6b41':'#576245'} />)}
            {[-0.72,-0.36,0,0.36,0.72].map((x)=><Bar key={x} position={[x,0,0.18]} size={[0.065,2.18,0.04]} color="#b9a26a" />)}
          </group>
        </CardPanel>
      </group>
      <group name="RELATION" position={[0,0,0.5]}>
        <group name="SELVEDGE_JOIN">
          {[-0.72,-0.36,0,0.36,0.72].map((y,i)=><Bar key={y} position={[0,y,0]} size={[reach,0.065,0.04]} color={matching?(i%2?'#c9a96f':'#879469'):'#62594a'} rotation={[0,0,matching?(i%2?0.12:-0.12):0.24]} />)}
          {matching && [-0.54,-0.18,0.18,0.54].map((y)=><Dot key={y} position={[0,y,0.08]} radius={0.065} color="#dcc38e" emissive="#745d2d" emissiveIntensity={0.55} />)}
        </group>
        <group name="TEXTILE_CONTINUATION" visible={matching}>
          <Bar position={[0,1.02,0.02]} size={[1.1,0.08,0.035]} color="#c8ae73" />
        </group>
      </group>
    </>
  );
}
