import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

export function CityGatineauScene({ matching, reducedMotion }) {
  const join = matching ? (reducedMotion ? 0.72 : 1.02) : 0.24;
  const shift = matching ? 0.2 : 0;
  const live = matching;
  return (
    <>
      <Stage background="#091113" accent="#4d9ca2" />
      <group name="PAIR_MEMBER_A" position={[-shift, 0, 0]}>
        <CardPanel position={[-1.92, 0, 0]} rotation={[0, 0.07, -0.015]} color="#172526">
          <group name="ROUTE_MEMBER_A">
            <Bar position={[-0.66, 0.84, 0.16]} size={[0.72, 0.1, 0.05]} color="#76c0bd" />
            <Bar position={[-0.12, 0.46, 0.17]} size={[0.76, 0.1, 0.05]} color="#76c0bd" rotation={[0,0,-0.58]} />
            <Bar position={[0.42, 0.02, 0.17]} size={[0.78, 0.1, 0.05]} color="#76c0bd" rotation={[0,0,-0.32]} />
            <Bar position={[0.82, -0.22, 0.18]} size={[0.48, 0.1, 0.05]} color={live?'#9bd7cf':'#668984'} rotation={[0,0,-0.12]} />
            <Bar position={[0.98, 0, 0.14]} size={[0.12, 2.48, 0.06]} color="#244f55" />
            <Dot position={[-0.98, 0.84, 0.2]} radius={0.13} color="#d2b56e" />
            <Dot position={[0.98, -0.06, 0.22]} radius={0.09} color={live?'#b9e0d4':'#81745e'} emissive={live?'#3e7b72':'#000'} emissiveIntensity={live?0.8:0} />
          </group>
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B" position={[shift, 0, 0]}>
        <CardPanel position={[1.92, 0, 0]} rotation={[0, -0.07, 0.015]} color="#172426">
          <group name="ROUTE_MEMBER_B">
            <Bar position={[-0.98, -0.06, 0.14]} size={[0.12, 2.48, 0.06]} color="#244f55" />
            <Bar position={[-0.82, -0.04, 0.18]} size={[0.48, 0.1, 0.05]} color={live?'#9bd7cf':'#668984'} rotation={[0,0,0.12]} />
            <Bar position={[-0.42, 0.18, 0.17]} size={[0.8, 0.1, 0.05]} color="#76c0bd" rotation={[0,0,0.28]} />
            <Bar position={[0.1, 0.58, 0.17]} size={[0.84, 0.1, 0.05]} color="#76c0bd" rotation={[0,0,0.58]} />
            <Bar position={[0.66, 0.94, 0.17]} size={[0.7, 0.1, 0.05]} color="#76c0bd" />
            <Dot position={[0.98, 0.94, 0.2]} radius={0.13} color="#d2b56e" emissive={live?'#6f5b27':'#000'} emissiveIntensity={live?0.7:0} />
            <Dot position={[-0.98, -0.06, 0.22]} radius={0.09} color={live?'#b9e0d4':'#81745e'} emissive={live?'#3e7b72':'#000'} emissiveIntensity={live?0.8:0} />
          </group>
        </CardPanel>
      </group>

      <group name="RELATION" position={[0, -0.06, 0.48]}>
        <group name="VALIDATION_SEAM">
          <mesh position={[0,0.02,-0.03]}>
            <boxGeometry args={[0.34, 2.34, 0.08]} />
            <meshStandardMaterial color="#102f38" roughness={0.84} />
          </mesh>
          <mesh rotation={[0,0,matching?0:0.14]}>
            <boxGeometry args={[0.7, 0.84, 0.12]} />
            <meshStandardMaterial color={live?'#235b54':'#3b3b31'} emissive={live?'#153f3a':'#000'} emissiveIntensity={live?0.8:0} roughness={0.62} />
          </mesh>
          <Bar position={[0,0.12,0.1]} size={[0.42,0.055,0.04]} color={live?'#90d3bc':'#81755d'} />
          <Dot position={[0,-0.18,0.12]} radius={0.08} color={live?'#b7e0a7':'#685c48'} emissive={live?'#5d8e4f':'#000'} emissiveIntensity={live?1:0} />
        </group>

        <group name="ROUTE_CONTINUATION">
          <Bar position={[-0.52, -0.02, 0.08]} size={[live?join:0.28, 0.09, 0.045]} color={live?'#9ad9d0':'#5d746f'} emissive={live?'#2e7573':'#000'} emissiveIntensity={live?0.8:0} rotation={[0,0,-0.1]} />
          <Bar position={[0.52, -0.02, 0.08]} size={[live?join:0.28, 0.09, 0.045]} color={live?'#9ad9d0':'#5d746f'} emissive={live?'#2e7573':'#000'} emissiveIntensity={live?0.8:0} rotation={[0,0,0.1]} />
          {live && [-0.72,-0.36,0,0.36,0.72].map((x)=><Dot key={x} position={[x,-0.02,0.14]} radius={0.045} color="#d9e6b1" emissive="#6f8650" emissiveIntensity={0.7}/>)}
        </group>
      </group>
    </>
  );
}
