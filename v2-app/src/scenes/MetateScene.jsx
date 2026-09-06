const grains = [
  [-0.72, 0.36], [-0.48, 0.08], [-0.18, 0.32], [0.08, 0.02], [0.38, 0.3], [0.68, 0.06],
  [-0.6, -0.34], [-0.3, -0.18], [0.02, -0.38], [0.32, -0.14], [0.62, -0.36],
];

export function MetateScene({ progress, matching, reducedMotion }) {
  const worked = Math.max(0, Math.min(1, progress));
  const offset = matching ? 0 : 0.32;
  const fine = matching ? worked : worked * 0.42;
  const strokeX = -0.58 + worked * 1.16;

  return (
    <>
      <color attach="background" args={['#090806']} />
      <ambientLight intensity={0.84} />
      <directionalLight position={[3.2, 4.8, 4]} intensity={2.5} color="#eee0c7" />
      <pointLight position={[0, 0.3, 3]} intensity={0.55 + fine * 0.75} color="#caa56d" />

      <group name="PAIR_MEMBER_A" position={[-1.72, 0, 0]}>
        <mesh><boxGeometry args={[2.7, 3.7, 0.18]} /><meshStandardMaterial color="#171410" roughness={0.94} /></mesh>
        <group name="METATE_RECEIVING_SURFACE" position={[0, -0.12, 0.2]}>
          <mesh rotation={[-0.12, 0, 0]} scale={[1.14, 1.35, 0.32]}>
            <boxGeometry args={[1.55, 1.7, 0.35]} />
            <meshStandardMaterial color="#55514b" roughness={0.98} />
          </mesh>
          <mesh position={[offset, -0.02, 0.28]} scale={[0.55 + fine * 0.6, 0.5, 0.03]}>
            <boxGeometry args={[1.45, 1.1, 0.12]} />
            <meshStandardMaterial color={matching ? '#a98054' : '#8b6545'} roughness={0.9} transparent opacity={0.3 + fine * 0.55} />
          </mesh>
          {grains.map(([x, y], index) => {
            const spread = matching ? 1 - fine * 0.36 : 1 + worked * 0.15;
            const ridge = matching ? 0 : 0.28 * worked;
            return (
              <mesh key={index} position={[x * spread + ridge, y * spread, 0.36]} scale={0.7 - fine * 0.36}>
                <dodecahedronGeometry args={[0.07 + (index % 3) * 0.012, 0]} />
                <meshStandardMaterial color={index % 2 ? '#b08a59' : '#916841'} roughness={0.92} />
              </mesh>
            );
          })}
        </group>
      </group>

      <group name="PAIR_MEMBER_B" position={[1.72, 0, 0]}>
        <mesh><boxGeometry args={[2.7, 3.7, 0.18]} /><meshStandardMaterial color="#171410" roughness={0.94} /></mesh>
        <group name="METLAPIL_MOVING_STONE" position={[0, 0, 0.25]} rotation={[0.08, 0, matching ? -0.08 : 0.15]}>
          <mesh scale={[1.3, 0.42, 0.44]}>
            <capsuleGeometry args={[0.42, 1.35, 8, 18]} />
            <meshStandardMaterial color="#66615a" roughness={0.96} />
          </mesh>
          <mesh position={[strokeX * 0.5, -0.78, 0.12]} scale={[0.46, 0.08, 0.06]}>
            <boxGeometry args={[1.2, 1, 1]} />
            <meshStandardMaterial color="#c7a06b" emissive="#6e4d29" emissiveIntensity={worked * 0.28} />
          </mesh>
        </group>
      </group>

      <group name="RELATION" position={[0, -0.1 + offset * 0.25, 0.44]}>
        <group name="RECIPROCAL_ABRASION_LANE">
          <mesh position={[strokeX, 0, 0]} rotation={[0, 0, matching ? 0 : 0.16]}>
            <boxGeometry args={[0.54, 0.06, 0.06]} />
            <meshStandardMaterial color="#e0bd83" emissive="#8a6136" emissiveIntensity={0.24 + worked * 0.48} />
          </mesh>
          {[0, 1, 2, 3, 4].map((index) => (
            <mesh key={index} position={[-0.48 + index * 0.24, matching ? 0 : 0.18, 0.04]} scale={[0.07 + fine * 0.09, 0.025, 0.025]}>
              <sphereGeometry args={[1, 8, 6]} />
              <meshStandardMaterial color={matching ? '#d6b27a' : '#9f7350'} transparent opacity={0.2 + fine * 0.72} />
            </mesh>
          ))}
        </group>
      </group>

      <mesh position={[0, -2.04, -0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} /><meshStandardMaterial color="#070604" roughness={1} />
      </mesh>
    </>
  );
}
