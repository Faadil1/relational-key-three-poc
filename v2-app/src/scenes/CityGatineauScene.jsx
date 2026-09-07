import { Bar, CardPanel, Dot, Stage } from './Wave005Primitives.jsx';

const routeNodesA = [
  [-0.94,0.88],[-0.62,0.86],[-0.3,0.62],[0.02,0.3],[0.34,0.02],[0.68,-0.12],[0.94,-0.08],
];
const routeNodesB = [
  [-0.94,-0.08],[-0.66,0.02],[-0.34,0.18],[0.02,0.42],[0.34,0.7],[0.68,0.92],[0.96,0.94],
];

function RouteNode({ x, y, live=false, terminal=false }) {
  return <Dot position={[x,y,0.23]} radius={terminal?0.105:0.055} color={terminal?'#d8bd78':(live?'#c5e6d9':'#698882')} emissive={live?'#4d7d74':'#000'} emissiveIntensity={live?0.45:0} />;
}

export function CityGatineauScene({ matching, reducedMotion }) {
  const live = matching;
  const pulseXs = reducedMotion ? [-0.62,0,0.62] : [-0.78,-0.52,-0.26,0,0.26,0.52,0.78];
  return (
    <>
      <Stage background="#081114" accent="#4f9da3" />

      <group name="PAIR_MEMBER_A">
        <CardPanel position={[-1.92, 0, 0]} rotation={[0,0.07,-0.015]} color="#17272a">
          <group name="ROUTE_MEMBER_A">
            <mesh position={[0.98,0,0.12]}>
              <boxGeometry args={[0.18,2.55,0.08]} />
              <meshStandardMaterial color="#153b45" roughness={0.78} />
            </mesh>
            <Bar position={[0.9,0,0.18]} size={[0.035,2.44,0.04]} color="#3d6c72" />
            <Bar position={[-0.62,0.84,0.18]} size={[0.66,0.09,0.045]} color="#79c3bf" />
            <Bar position={[-0.26,0.62,0.19]} size={[0.54,0.09,0.045]} color="#79c3bf" rotation={[0,0,-0.48]} />
            <Bar position={[0.08,0.3,0.19]} size={[0.54,0.09,0.045]} color="#79c3bf" rotation={[0,0,-0.72]} />
            <Bar position={[0.44,0.02,0.19]} size={[0.56,0.09,0.045]} color={live?'#9fded4':'#6b8f89'} rotation={[0,0,-0.34]} />
            <Bar position={[0.76,-0.1,0.2]} size={[0.44,0.09,0.045]} color={live?'#b6e8dd':'#6b8f89'} rotation={[0,0,-0.08]} />
            {routeNodesA.map(([x,y],i)=><RouteNode key={`${x}-${y}`} x={x} y={y} live={live&&i>3} terminal={i===0} />)}
            <group name="VALIDATOR_APERTURE_A" position={[0.8,-0.64,0.25]}>
              <mesh><boxGeometry args={[0.36,0.56,0.08]} /><meshStandardMaterial color="#213b3e" roughness={0.55} /></mesh>
              <Bar position={[0,0.08,0.06]} size={[0.18,0.035,0.03]} color={live?'#9bd8c6':'#7c755f'} />
              <Dot position={[0,-0.11,0.07]} radius={0.045} color={live?'#b6df9c':'#6b6253'} emissive={live?'#5b854b':'#000'} emissiveIntensity={live?0.8:0} />
            </group>
          </group>
        </CardPanel>
      </group>

      <group name="PAIR_MEMBER_B">
        <CardPanel position={[1.92,0,0]} rotation={[0,-0.07,0.015]} color="#17272a">
          <group name="ROUTE_MEMBER_B">
            <mesh position={[-0.98,0,0.12]}>
              <boxGeometry args={[0.18,2.55,0.08]} />
              <meshStandardMaterial color="#153b45" roughness={0.78} />
            </mesh>
            <Bar position={[-0.9,0,0.18]} size={[0.035,2.44,0.04]} color="#3d6c72" />
            <Bar position={[-0.76,-0.08,0.2]} size={[0.44,0.09,0.045]} color={live?'#b6e8dd':'#6b8f89'} rotation={[0,0,0.1]} />
            <Bar position={[-0.42,0.04,0.19]} size={[0.56,0.09,0.045]} color={live?'#9fded4':'#6b8f89'} rotation={[0,0,0.34]} />
            <Bar position={[-0.06,0.3,0.19]} size={[0.54,0.09,0.045]} color="#79c3bf" rotation={[0,0,0.68]} />
            <Bar position={[0.3,0.64,0.19]} size={[0.58,0.09,0.045]} color="#79c3bf" rotation={[0,0,0.5]} />
            <Bar position={[0.66,0.9,0.18]} size={[0.66,0.09,0.045]} color="#79c3bf" />
            {routeNodesB.map(([x,y],i)=><RouteNode key={`${x}-${y}`} x={x} y={y} live={live&&i<3} terminal={i===routeNodesB.length-1} />)}
            <group name="RECEIVER_WINDOW_B" position={[-0.8,-0.64,0.25]}>
              <mesh><boxGeometry args={[0.36,0.56,0.08]} /><meshStandardMaterial color="#213b3e" roughness={0.55} /></mesh>
              <Bar position={[0,0.08,0.06]} size={[0.18,0.035,0.03]} color={live?'#9bd8c6':'#7c755f'} />
              <Dot position={[0,-0.11,0.07]} radius={0.045} color={live?'#b6df9c':'#6b6253'} emissive={live?'#5b854b':'#000'} emissiveIntensity={live?0.8:0} />
            </group>
          </group>
        </CardPanel>
      </group>

      <group name="RELATION" position={[0,-0.08,0.54]}>
        <group name="VALIDATION_SEAM">
          <mesh position={[0,0,-0.04]}><boxGeometry args={[0.32,2.46,0.1]} /><meshStandardMaterial color="#0f3038" roughness={0.86} /></mesh>
          <mesh position={[0,0.02,0.02]} rotation={[0,0,live?0:0.12]}>
            <boxGeometry args={[0.72,0.82,0.12]} />
            <meshStandardMaterial color={live?'#265f56':'#3c3b31'} emissive={live?'#163e39':'#000'} emissiveIntensity={live?0.85:0} roughness={0.6} />
          </mesh>
          <Bar position={[0,0.12,0.1]} size={[0.42,0.05,0.035]} color={live?'#9bdcc8':'#84775e'} />
          <Dot position={[0,-0.17,0.12]} radius={0.075} color={live?'#bfe4a8':'#6d6250'} emissive={live?'#60894e':'#000'} emissiveIntensity={live?0.95:0} />
        </group>

        <group name="ROUTE_CONTINUATION">
          <Bar position={[-0.56,0.02,0.08]} size={[live?1.12:0.34,0.095,0.045]} color={live?'#a4e2d7':'#5e7772'} emissive={live?'#32766f':'#000'} emissiveIntensity={live?0.72:0} rotation={[0,0,-0.08]} />
          <Bar position={[0.56,0.02,0.08]} size={[live?1.12:0.34,0.095,0.045]} color={live?'#a4e2d7':'#5e7772'} emissive={live?'#32766f':'#000'} emissiveIntensity={live?0.72:0} rotation={[0,0,0.08]} />
          {live && pulseXs.map((x,i)=><Dot key={x} position={[x,0.02,0.15]} radius={0.04+(i%3)*0.006} color="#e2e9b5" emissive="#738553" emissiveIntensity={0.72} />)}
          <Bar position={[0,-0.44,0.03]} size={[live?1.54:0.62,0.04,0.025]} color={live?'#6fa4a3':'#425b60'} />
        </group>
      </group>
    </>
  );
}
