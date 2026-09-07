import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

const rows = [-0.9,-0.6,-0.3,0,0.3,0.6,0.9];
const warps = [-0.82,-0.62,-0.42,-0.22,0,0.22,0.42,0.62,0.82];
const warpColorsA = ['#b18443','#5f6845','#a0573f','#c3a45d','#6d4d38','#a87b43','#536343','#c29758','#7a4f39'];
const warpColorsB = ['#7f6640','#a47842','#596748','#b58b4d','#6f5139','#bfa260','#536143','#9d6a42','#75603f'];

function WovenStrip({ side }) {
  const colors = side === 'A' ? warpColorsA : warpColorsB;
  return (
    <group>
      {warps.map((x,i)=><Bar key={`w-${x}`} position={[x,0,0.18]} size={[0.105,2.24,0.045]} color={colors[i]} />)}
      {rows.map((y,i)=><Bar key={`r-${y}`} position={[0,y,0.2]} size={[1.86,0.045,0.035]} color={i%2?'#d0b16e':'#8d7047'} />)}
      <Bar position={[side==='A'?0.96:-0.96,0,0.24]} size={[0.1,2.32,0.05]} color="#d8bd78" />
    </group>
  );
}

export function TextileBonwireScene({ matching, reducedMotion }) {
  const reach = matching ? (reducedMotion ? 0.92 : 1.2) : 0.28;
  return (
    <>
      <Stage background="#0f100d" accent="#8e7a45" />
      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92,0,0]} rotation={[0,0.06,-0.015]} color="#24251d">
          <group name="WOVEN_STRIP_A"><WovenStrip side="A" /></group>
        </CardPanel>
      </group>
      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.06,0.015]} color="#22261f">
          <group name="WOVEN_STRIP_B"><WovenStrip side="B" /></group>
        </CardPanel>
      </group>

      <group name="RELATION" position={[0,0,0.52]}>
        <group name="SELVEDGE_JOIN">
          {[-0.78,-0.52,-0.26,0,0.26,0.52,0.78].map((y,i)=>(
            <Bar
              key={y}
              position={[0,y,0]}
              size={[reach,0.055,0.04]}
              color={matching?(i%2?'#d7b66e':'#8fa06d'):'#62594a'}
              rotation={[0,0,matching?(i%2?0.42:-0.42):0.16]}
            />
          ))}
          {matching && [-0.65,-0.39,-0.13,0.13,0.39,0.65].map((y,i)=><Dot key={y} position={[0,y,0.08]} radius={0.055} color={i%2?'#e3c98f':'#9ca872'} emissive="#6b582f" emissiveIntensity={0.45} />)}
        </group>
        <group name="TEXTILE_CONTINUATION" visible={matching}>
          <Bar position={[0,1.04,0.02]} size={[1.4,0.07,0.035]} color="#c9af72" />
          <Bar position={[0,-1.04,0.02]} size={[1.4,0.07,0.035]} color="#c9af72" />
        </group>
      </group>
    </>
  );
}
