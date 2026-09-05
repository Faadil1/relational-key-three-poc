export function FoodToyamaScene({ release, matching, reducedMotion }) {
  const progress = Math.max(0, Math.min(1, release));
  const revealed = matching && progress >= 0.72;
  const relationShift = progress * (reducedMotion ? 0.28 : 0.62);
  const fan = revealed ? (reducedMotion ? 0.34 : 0.62) : progress * 0.22;

  const leafAngles = [-1.05, -0.7, -0.35, 0, 0.35, 0.7, 1.05];

  return (
    <>
      <color attach="background" args={['#11110c']} />
      <ambientLight intensity={1.05} />
      <directionalLight position={[3.4, 5, 4]} intensity={3.0} color="#f3deb4" />
      <pointLight position={[-3, 1, 2.4]} intensity={1.4} color="#c08f4d" />

      <group name="PAIR_MEMBER_A" position={[-1.92 + relationShift * 0.28, 0, 0]} rotation={[0, 0.075, -0.02]}>
        <group name="PRESS_PACKAGE_CONSTRAINT">
          <mesh>
            <boxGeometry args={[2.65, 3.55, 0.22]} />
            <meshStandardMaterial color="#2a2116" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.25, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.92, 0.92, 0.18, 48]} />
            <meshStandardMaterial color="#c7a16f" roughness={0.74} />
          </mesh>
          <mesh position={[0, 1.15 - progress * 0.2, 0.22]}>
            <cylinderGeometry args={[0.42, 0.54, 0.24, 32]} />
            <meshStandardMaterial color="#5e5a4f" roughness={0.82} />
          </mesh>
          <mesh position={[0, 0.25, 0.29]}>
            <boxGeometry args={[1.88, 0.1, 0.05]} />
            <meshStandardMaterial color="#d7b678" roughness={0.66} />
          </mesh>
          <mesh position={[0, 0.25, 0.3]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[1.88, 0.1, 0.05]} />
            <meshStandardMaterial color="#d7b678" roughness={0.66} />
          </mesh>
        </group>
      </group>

      <group name="PAIR_MEMBER_B" position={[1.92 - relationShift * 0.28, 0, 0]} rotation={[0, -0.075, 0.02]}>
        <group name="BAMBOO_LEAF_REVEAL">
          <mesh>
            <boxGeometry args={[2.65, 3.55, 0.22]} />
            <meshStandardMaterial color="#172117" roughness={0.92} />
          </mesh>
          <mesh position={[0, 0.1, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.95, 0.95, 0.16, 48]} />
            <meshStandardMaterial color="#c6a271" roughness={0.74} />
          </mesh>
          <mesh position={[0, 0.1, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.72, 0.72, 0.07, 48]} />
            <meshStandardMaterial color={revealed ? '#d98667' : '#274f31'} roughness={0.82} />
          </mesh>
          {leafAngles.map((angle, index) => {
            const spread = angle * fan;
            const x = Math.sin(spread) * (0.52 + fan * 0.44);
            const y = Math.cos(spread) * (0.34 + fan * 0.3);
            return (
              <mesh key={angle} position={[x, 0.1 + y, 0.34 + index * 0.004]} rotation={[0, 0, spread - Math.PI / 2]}>
                <boxGeometry args={[0.92, 0.24, 0.035]} />
                <meshStandardMaterial color={index % 2 ? '#4d7448' : '#315d39'} roughness={0.9} />
              </mesh>
            );
          })}
        </group>
      </group>

      <group name="RELATION" position={[0, 0.05, 0.44]}>
        <group name="ORDERED_RELEASE">
          <mesh position={[0, 0.42 - relationShift * 0.36, 0]}>
            <boxGeometry args={[0.18, 1.25, 0.09]} />
            <meshStandardMaterial color="#b89057" roughness={0.66} />
          </mesh>
          <mesh position={[0, -0.38, 0]} rotation={[0, 0, matching ? 0 : -0.15]}>
            <torusGeometry args={[0.46 + relationShift * 0.12, 0.045, 12, 48]} />
            <meshStandardMaterial color={revealed ? '#d6bd7d' : '#75664b'} metalness={0.2} roughness={0.52} />
          </mesh>
        </group>
      </group>

      <mesh position={[0, -2.0, -0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#0b0c08" roughness={1} />
      </mesh>
    </>
  );
}
