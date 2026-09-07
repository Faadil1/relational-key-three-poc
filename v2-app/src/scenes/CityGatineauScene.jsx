import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

export function CityGatineauScene({ matching, reducedMotion }) {
  const join = matching ? (reducedMotion ? 0.34 : 0.62) : 0.16;
  const shift = matching ? 0.34 : 0;
  const live = matching;
  return (
    <>
      <Stage background="#0b1112" accent="#4d9ca2" />
      <group name="PAIR_MEMBER_A" position={[-shift, 0, 0]}>
        <CardPanel position={[-1.92, 0, 0]} rotation={[0, 0.07, -0.015]} color="#182526">
          <group name="ROUTE_MEMBER_A">
            <Bar position={[-0.62, 0.72, 0.16]} size={[0.78, 0.11, 0.05]} color="#76c0bd" />
            <Bar position={[-0.08, 0.28, 0.17]} size={[0.82, 0.11, 0.05]} color="#76c0bd" rotation={[0,0,-0.72]} />
            <Bar position={[0.42, -0.28, 0.17]} size={[0.95, 0.11, 0.05]} color="#76c0bd" rotation={[0,0,-0.34]} />
            <Dot position={[-0.98, 0.72, 0.2]} radius={0.13} color="#d2b56e" />
          </group>
        </CardPanel>
      </group>
      <group name="PAIR_MEMBER_B" position={[shift, 0, 0]}>
        <CardPanel position={[1.92, 0, 0]} rotation={[0, -0.07, 0.015]} color="#172326">
          <group name="ROUTE_MEMBER_B">
            <Bar position={[-0.48, -0.22, 0.17]} size={[0.86, 0.11, 0.05]} color="#76c0bd" rotation={[0,0,0.28]} />
            <Bar position={[0.12, 0.26, 0.17]} size={[0.92, 0.11, 0.05]} color="#76c0bd" rotation={[0,0,0.62]} />
            <Bar position={[0.66, 0.76, 0.17]} size={[0.7, 0.11, 0.05]} color="#76c0bd" />
            <Dot position={[0.98, 0.76, 0.2]} radius={0.13} color="#d2b56e" emissive={live?'#6f5b27':'#000'} emissiveIntensity={live?0.7:0} />
          </group>
        </CardPanel>
      </group>
      <group name="RELATION" position={[0, -0.22, 0.48]}>
        <group name="VALIDATION_SEAM">
          <mesh rotation={[0,0,matching?0:0.16]}>
            <boxGeometry args={[0.74, 0.92, 0.1]} />
            <meshStandardMaterial color={live?'#235b54':'#3b3b31'} emissive={live?'#153f3a':'#000'} emissiveIntensity={live?0.8:0} roughness={0.62} />
          </mesh>
          <Bar position={[0,0.12,0.09]} size={[0.42,0.055,0.04]} color={live?'#90d3bc':'#81755d'} />
          <Dot position={[0,-0.18,0.11]} radius={0.08} color={live?'#b7e0a7':'#685c48'} emissive={live?'#5d8e4f':'#000'} emissiveIntensity={live?1:0} />
        </group>
        <group name="ROUTE_CONTINUATION" visible={live}>
          <Bar position={[0, 0.82, 0.05]} size={[join, 0.09, 0.04]} color="#89d7d0" emissive="#2e7573" emissiveIntensity={0.7} />
        </group>
      </group>
    </>
  );
}
