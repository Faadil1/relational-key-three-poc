function GalleryView({ side, viewShift, controlled }) {
  const xShift = side * viewShift;
  const warm = controlled ? '#d9bc83' : side < 0 ? '#7da7d9' : '#d98e8b';
  const cool = side < 0 ? '#7da7d9' : '#d98e8b';

  return (
    <group position={[xShift, 0, 0.1]}>
      <mesh position={[0, 0.78, 0]}>
        <boxGeometry args={[1.88, 0.06, 0.04]} />
        <meshStandardMaterial color="#8f8a7f" />
      </mesh>
      <mesh position={[0, -1.05, 0]}>
        <boxGeometry args={[1.94, 0.055, 0.04]} />
        <meshStandardMaterial color="#a19b8d" />
      </mesh>

      {[-0.66, -0.22, 0.22, 0.66].map((x, index) => (
        <group key={x} position={[x + side * index * 0.018, -0.1, 0.015 + index * 0.006]}>
          <mesh>
            <boxGeometry args={[0.08, 1.62, 0.05]} />
            <meshStandardMaterial color={index % 2 ? '#d7c48e' : cool} roughness={0.72} />
          </mesh>
          <mesh position={[0, 0.84, 0]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.18, 0.035, 8, 20, Math.PI]} />
            <meshStandardMaterial color={warm} roughness={0.62} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0.02, 0.028]}>
        <boxGeometry args={[0.58, 0.92, 0.04]} />
        <meshStandardMaterial color="#151a1f" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.25, 0.055]}>
        <boxGeometry args={[0.34, 0.42, 0.04]} />
        <meshStandardMaterial color={warm} roughness={0.58} />
      </mesh>

      {[-0.72, -0.36, 0.36, 0.72].map((x, index) => (
        <mesh key={`floor-${x}`} position={[x * 0.72, -0.72 + index * 0.035, 0.035]} rotation={[0, 0, x * -0.22]}>
          <boxGeometry args={[0.72, 0.025, 0.025]} />
          <meshStandardMaterial color="#696b68" />
        </mesh>
      ))}
    </group>
  );
}

export function StereoscopyScene({ disparity, matching, reducedMotion }) {
  const controlled = matching && disparity <= 0.24;
  const depth = controlled ? (reducedMotion ? 0.16 : 0.38) : 0.04;
  const viewShift = disparity * 0.16;

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
        <GalleryView side={-1} viewShift={viewShift} controlled={controlled} />
      </group>

      <group name="PAIR_MEMBER_B" position={[1.82, 0, 0]} rotation={[0, -0.1, 0]}>
        <mesh>
          <boxGeometry args={[2.7, 3.7, 0.14]} />
          <meshStandardMaterial color="#252c33" roughness={0.86} />
        </mesh>
        <GalleryView side={1} viewShift={viewShift} controlled={controlled} />
      </group>

      <group name="RELATION" position={[0, 0.04, 0.42]}>
        {[
          { y: 0.58, z: -depth, w: 0.84 },
          { y: 0.02, z: 0, w: 0.98 },
          { y: -0.58, z: depth, w: 1.12 },
        ].map((plane, index) => (
          <mesh key={index} position={[0, plane.y, plane.z]}>
            <boxGeometry args={[plane.w, 0.3, 0.045]} />
            <meshStandardMaterial
              color={controlled ? '#e0b36a' : index % 2 ? '#d98e8b' : '#7da7d9'}
              transparent
              opacity={controlled ? 0.78 - index * 0.12 : 0.18}
              emissive={controlled ? '#5c4524' : '#11151a'}
              emissiveIntensity={controlled ? 0.38 : 0.05}
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
