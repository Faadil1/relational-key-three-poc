export function StereoscopyScene({ disparity, matching, reducedMotion }) {
  const controlled = matching && disparity <= 0.24;
  const depth = controlled ? (reducedMotion ? 0.18 : 0.42) : 0.06;
  const viewShift = disparity * 0.22;

  const markers = [
    [-0.62, 0.62, 0.16],
    [0.48, 0.56, 0.18],
    [-0.22, -0.08, 0.2],
    [0.58, -0.58, 0.14],
    [-0.68, -0.62, 0.12],
  ];

  return (
    <>
      <color attach="background" args={['#10151b']} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 5]} intensity={2.8} color="#f2dfb8" />
      <pointLight position={[0, 1.5, 3]} intensity={1.4} color="#7da7d9" />

      <group name="PAIR_MEMBER_A" position={[-1.82, 0, 0]} rotation={[0, 0.1, 0]}>
        <mesh>
          <boxGeometry args={[2.7, 3.7, 0.14]} />
          <meshStandardMaterial color="#252c33" roughness={0.86} />
        </mesh>
        {markers.map(([x, y, size], index) => (
          <mesh key={`left-${index}`} position={[x - viewShift, y, 0.1]}>
            <boxGeometry args={[size * 2.2, size * 2.2, 0.04]} />
            <meshStandardMaterial color={index % 2 ? '#d7c48e' : '#7da7d9'} roughness={0.6} />
          </mesh>
        ))}
        <mesh position={[0, -1.28, 0.1]}>
          <boxGeometry args={[1.75, 0.04, 0.035]} />
          <meshStandardMaterial color="#9b978c" />
        </mesh>
      </group>

      <group name="PAIR_MEMBER_B" position={[1.82, 0, 0]} rotation={[0, -0.1, 0]}>
        <mesh>
          <boxGeometry args={[2.7, 3.7, 0.14]} />
          <meshStandardMaterial color="#252c33" roughness={0.86} />
        </mesh>
        {markers.map(([x, y, size], index) => (
          <mesh key={`right-${index}`} position={[x + viewShift, y, 0.1]}>
            <boxGeometry args={[size * 2.2, size * 2.2, 0.04]} />
            <meshStandardMaterial color={index % 2 ? '#d7c48e' : '#d98e8b'} roughness={0.6} />
          </mesh>
        ))}
        <mesh position={[0, -1.28, 0.1]}>
          <boxGeometry args={[1.75, 0.04, 0.035]} />
          <meshStandardMaterial color="#9b978c" />
        </mesh>
      </group>

      <group name="RELATION" position={[0, 0.04, 0.42]}>
        {[0, 1, 2].map((index) => (
          <mesh key={index} position={[0, (index - 1) * 0.52, (index - 1) * depth]} scale={[1 - index * 0.08, 1 - index * 0.08, 1]}>
            <boxGeometry args={[0.92, 0.36, 0.045]} />
            <meshStandardMaterial
              color={controlled ? '#e0b36a' : index % 2 ? '#d98e8b' : '#7da7d9'}
              transparent
              opacity={controlled ? 0.72 - index * 0.12 : 0.2}
            />
          </mesh>
        ))}
        <mesh>
          <sphereGeometry args={[0.1, 18, 12]} />
          <meshStandardMaterial color={controlled ? '#f2c879' : '#696d72'} emissive={controlled ? '#8a642b' : '#171a1e'} emissiveIntensity={controlled ? 0.8 : 0.1} />
        </mesh>
      </group>

      <mesh position={[0, -2.02, -0.45]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#0b0e12" roughness={1} />
      </mesh>
    </>
  );
}
