export function BoulleScene({ separated, matching, reducedMotion }) {
  const relationResolved = separated && matching;
  const gap = separated ? (relationResolved ? 0.18 : 0.34) : 0.02;
  const motifs = [
    [-0.48, 0.72], [0.1, 0.9], [0.52, 0.42], [-0.22, 0.18], [0.34, -0.2], [-0.5, -0.54], [0.08, -0.78], [0.52, -0.62],
  ];
  const otherB = [
    [-0.56, 0.88], [0.34, 0.7], [0.08, 0.32], [-0.62, 0.04], [0.48, -0.02], [-0.18, -0.42], [0.62, -0.62], [-0.36, -0.82],
  ];

  const card = (side) => {
    const premiere = side === 'A';
    const x = premiere ? -1.72 - gap : 1.72 + gap;
    const ground = premiere ? '#3d2419' : '#bf9552';
    const inlay = premiere ? '#e2bd72' : '#3d2419';
    const name = premiere ? 'PREMIERE_PARTIE' : 'CONTRE_PARTIE';
    const inverse = premiere ? 1 : -1;
    const positions = premiere || relationResolved ? motifs : otherB;

    return (
      <group name={premiere ? 'PAIR_MEMBER_A' : 'PAIR_MEMBER_B'} position={[x, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.7, 3.7, 0.18]} />
          <meshStandardMaterial color="#15110d" roughness={0.92} />
        </mesh>
        <group name={name} position={[0, 0, 0.14]}>
          <mesh>
            <boxGeometry args={[2.28, 3.08, 0.08]} />
            <meshStandardMaterial color={ground} metalness={premiere ? 0.08 : 0.38} roughness={premiere ? 0.62 : 0.34} />
          </mesh>

          {positions.map(([mx, my], index) => {
            const resolvedX = relationResolved ? mx * inverse : premiere ? mx : mx * -0.78;
            const resolvedRotation = relationResolved
              ? (index % 2 ? 0.62 : -0.62) * inverse
              : premiere
                ? (index % 2 ? 0.62 : -0.62)
                : (index % 3 ? -0.15 : 0.88);
            return (
              <mesh key={`${side}-${index}`} position={[resolvedX, my, 0.075]} rotation={[0, 0, resolvedRotation]}>
                <boxGeometry args={[0.34 + (index % 3) * 0.05, 0.17, 0.055]} />
                <meshStandardMaterial
                  color={inlay}
                  metalness={premiere ? 0.58 : 0.08}
                  roughness={premiere ? 0.25 : 0.55}
                  emissive={relationResolved ? inlay : '#000000'}
                  emissiveIntensity={relationResolved ? 0.22 : 0}
                />
              </mesh>
            );
          })}

          {relationResolved && (
            <group name={premiere ? 'SHARED_CUT_TRACE_A' : 'SHARED_CUT_TRACE_B'} position={[0, 0, 0.13]}>
              <mesh position={[0, 0.5, 0]} rotation={[0, 0, premiere ? -0.48 : 0.48]}>
                <boxGeometry args={[1.72, 0.028, 0.022]} />
                <meshStandardMaterial color={premiere ? '#f0ce8b' : '#5b321e'} emissive={premiere ? '#a06c2b' : '#562d1b'} emissiveIntensity={0.7} />
              </mesh>
              <mesh position={[0, -0.48, 0]} rotation={[0, 0, premiere ? 0.48 : -0.48]}>
                <boxGeometry args={[1.72, 0.028, 0.022]} />
                <meshStandardMaterial color={premiere ? '#f0ce8b' : '#5b321e'} emissive={premiere ? '#a06c2b' : '#562d1b'} emissiveIntensity={0.7} />
              </mesh>
            </group>
          )}
        </group>
      </group>
    );
  };

  return (
    <>
      <color attach="background" args={['#090806']} />
      <ambientLight intensity={0.82} />
      <directionalLight position={[2.8, 4.8, 5]} intensity={2.5} color="#f0dfbc" />
      <pointLight position={[0, 0.5, 3]} intensity={relationResolved ? 1.8 : separated ? 0.9 : 0.55} color="#d6a85e" />

      {card('A')}
      {card('B')}

      <group name="RELATION" position={[0, 0, 0.42]}>
        <group name="RECIPROCAL_CUT">
          {relationResolved ? (
            <>
              <mesh position={[0, 0.36, 0]}>
                <boxGeometry args={[1.58, 0.055, 0.055]} />
                <meshStandardMaterial color="#f1d494" emissive="#a86e29" emissiveIntensity={1.05} />
              </mesh>
              <mesh position={[0, -0.36, 0]}>
                <boxGeometry args={[1.58, 0.055, 0.055]} />
                <meshStandardMaterial color="#5a301d" emissive="#7b4224" emissiveIntensity={0.9} />
              </mesh>

              <mesh position={[0.67, 0.36, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.12, 0.25, 3]} />
                <meshStandardMaterial color="#f1d494" emissive="#a86e29" emissiveIntensity={0.95} />
              </mesh>
              <mesh position={[-0.67, -0.36, 0]} rotation={[0, 0, Math.PI / 2]}>
                <coneGeometry args={[0.12, 0.25, 3]} />
                <meshStandardMaterial color="#5a301d" emissive="#7b4224" emissiveIntensity={0.8} />
              </mesh>

              <mesh position={[-0.24, 0.36, 0.09]} rotation={[0, 0, -0.62]}>
                <boxGeometry args={[0.38, 0.18, 0.08]} />
                <meshStandardMaterial color="#e2bd72" emissive="#9f6b2c" emissiveIntensity={0.75} />
              </mesh>
              <mesh position={[0.24, -0.36, 0.09]} rotation={[0, 0, 0.62]}>
                <boxGeometry args={[0.38, 0.18, 0.08]} />
                <meshStandardMaterial color="#3d2419" emissive="#6d3b21" emissiveIntensity={0.65} />
              </mesh>

              <mesh>
                <torusGeometry args={[0.22, 0.035, 12, 28]} />
                <meshStandardMaterial color="#e9c980" emissive="#9f6b2c" emissiveIntensity={0.8} />
              </mesh>
            </>
          ) : (
            <>
              <mesh position={[-0.36, 0.38, 0]} rotation={[0, 0, -0.68]}>
                <boxGeometry args={[0.78, 0.045, 0.045]} />
                <meshStandardMaterial color="#d7ad63" emissive="#8a5724" emissiveIntensity={separated ? 0.38 : 0.12} />
              </mesh>
              <mesh position={[0.42, -0.34, 0]} rotation={[0, 0, 0.52]}>
                <boxGeometry args={[0.74, 0.045, 0.045]} />
                <meshStandardMaterial color="#4d2c1c" emissive="#6d3b21" emissiveIntensity={separated ? 0.3 : 0.08} />
              </mesh>
              <mesh position={[0, 0, -0.02]}>
                <torusGeometry args={[0.2, 0.025, 10, 24, Math.PI * 1.35]} />
                <meshStandardMaterial color="#6f6253" roughness={0.9} />
              </mesh>
            </>
          )}
        </group>
      </group>

      <mesh position={[0, -2.04, -0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#070604" roughness={1} />
      </mesh>
    </>
  );
}
