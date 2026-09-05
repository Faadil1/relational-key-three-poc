const cords = [
  { x: -0.72, length: 1.5, knots: [-0.28, -0.72] },
  { x: -0.3, length: 1.88, knots: [-0.42, -1.02] },
  { x: 0.12, length: 1.32, knots: [-0.22, -0.62] },
  { x: 0.52, length: 1.72, knots: [-0.48, -1.12] },
];

function CordField({ side, tension, matching }) {
  const primaryY = 0.86;
  const isB = side === 'B';
  const settle = tension * 0.22;
  const mismatch = isB && !matching ? 0.2 : 0;
  return (
    <group name={isB ? 'SECONDARY_CORD' : 'CARRYING_CORD'}>
      <mesh position={[0, primaryY, 0.05]}>
        <boxGeometry args={[1.92, 0.075, 0.075]} />
        <meshStandardMaterial color="#b48a57" roughness={0.62} />
      </mesh>
      {cords.map((cord, index) => {
        const x = cord.x + mismatch * (index % 2 ? 1 : -1);
        const length = cord.length - settle * (0.4 + index * 0.08);
        const y = primaryY - length / 2;
        const rotation = (1 - tension) * (index % 2 ? -0.08 : 0.08) + mismatch * 0.08;
        return (
          <group key={`${side}-${index}`} position={[x, 0, 0.08]} rotation={[0, 0, rotation]}>
            <mesh position={[0, y, 0]}>
              <boxGeometry args={[0.035, length, 0.035]} />
              <meshStandardMaterial color={index % 2 ? '#8e6140' : '#b98a54'} roughness={0.78} />
            </mesh>
            {cord.knots.map((ky, knotIndex) => (
              <mesh key={knotIndex} position={[0, primaryY + ky + settle * 0.35, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.075, 0.025, 8, 18]} />
                <meshStandardMaterial color="#d2a46a" roughness={0.7} />
              </mesh>
            ))}
          </group>
        );
      })}
      <group name="KNOT_REGISTER" position={[0, -0.52 + settle * 0.28, 0.14]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.13, 0.035, 10, 24]} />
          <meshStandardMaterial color={tension > 0.72 && matching ? '#f0c987' : '#a8774c'} emissive={tension > 0.72 && matching ? '#85531d' : '#000000'} emissiveIntensity={tension > 0.72 && matching ? 0.45 : 0} />
        </mesh>
      </group>
    </group>
  );
}

export function KhipuScene({ tension, matching, reducedMotion }) {
  const relationStrength = Math.max(0, Math.min(1, tension));
  const registered = matching && relationStrength >= 0.72;
  const bridgeY = 0.86 - (1 - relationStrength) * 0.22;

  return (
    <>
      <color attach="background" args={['#090806']} />
      <ambientLight intensity={0.86} />
      <directionalLight position={[3, 4.5, 4]} intensity={2.3} color="#ead9ba" />
      <pointLight position={[0, 0.8, 3]} intensity={registered ? 1.2 : 0.45} color="#c89454" />

      <group name="PAIR_MEMBER_A" position={[-1.72, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.7, 3.7, 0.18]} />
          <meshStandardMaterial color="#17120d" roughness={0.94} />
        </mesh>
        <group position={[0, 0.22, 0.16]}>
          <CordField side="A" tension={relationStrength} matching={matching} />
        </group>
      </group>

      <group name="PAIR_MEMBER_B" position={[1.72, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.7, 3.7, 0.18]} />
          <meshStandardMaterial color="#17120d" roughness={0.94} />
        </mesh>
        <group position={[0, 0.22, 0.16]}>
          <CordField side="B" tension={relationStrength} matching={matching} />
        </group>
      </group>

      <group name="RELATION" position={[0, 0.22, 0.4]}>
        <group name="SHARED_TENSION_ATTACHMENT" position={[0, bridgeY, 0]}>
          <mesh rotation={[0, 0, !matching ? 0.11 : 0]}>
            <boxGeometry args={[1.18, 0.045 + relationStrength * 0.03, 0.045]} />
            <meshStandardMaterial color={registered ? '#e7bf7e' : '#8f6844'} emissive={registered ? '#8d5923' : '#000000'} emissiveIntensity={registered ? 0.65 : 0} />
          </mesh>
          <mesh position={[0, -0.12 + relationStrength * 0.1, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.13, 0.035, 10, 24]} />
            <meshStandardMaterial color={registered ? '#f1cc88' : '#8f6745'} emissive={registered ? '#8d5923' : '#000000'} emissiveIntensity={registered ? 0.55 : 0} />
          </mesh>
        </group>
      </group>

      <mesh position={[0, -2.04, -0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#070604" roughness={1} />
      </mesh>
    </>
  );
}
