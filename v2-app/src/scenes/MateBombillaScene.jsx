const particles = [
  [-0.62, 0.38], [-0.35, 0.18], [-0.1, 0.44], [0.2, 0.2], [0.52, 0.38],
  [-0.48, -0.12], [-0.16, -0.24], [0.18, -0.1], [0.48, -0.28], [-0.02, -0.5],
];

function Bombilla({ insertion, matching }) {
  const engaged = matching && insertion >= 0.72;
  const x = 0.62 - insertion * 0.68;
  const y = 0.26 - insertion * 0.34;
  return (
    <group position={[x, y, 0.2]} rotation={[0, 0, -1.06]}>
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 1.65, 18]} />
        <meshStandardMaterial color="#a9aba7" metalness={0.76} roughness={0.26} />
      </mesh>
      <group name="PERFORATED_FILTER" position={[0, -0.12, 0]}>
        <mesh>
          <sphereGeometry args={[0.19, 18, 12]} />
          <meshStandardMaterial color="#8c908c" metalness={0.68} roughness={0.32} emissive={engaged ? '#6d6a51' : '#000000'} emissiveIntensity={engaged ? 0.22 : 0} />
        </mesh>
        {[-0.08, 0, 0.08].map((px) => (
          <mesh key={px} position={[px, 0, 0.17]}>
            <sphereGeometry args={[0.018, 8, 6]} />
            <meshStandardMaterial color="#252824" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function MateBombillaScene({ insertion, matching, reducedMotion }) {
  const engaged = matching && insertion >= 0.72;
  const flow = engaged ? Math.min(1, (insertion - 0.72) / 0.28) : 0;

  return (
    <>
      <color attach="background" args={['#090806']} />
      <ambientLight intensity={0.88} />
      <directionalLight position={[3, 4.6, 4]} intensity={2.45} color="#eee0c2" />
      <pointLight position={[0, 0.4, 3]} intensity={engaged ? 1.25 : 0.45} color="#b99a66" />

      <group name="PAIR_MEMBER_A" position={[-1.72, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.7, 3.7, 0.18]} />
          <meshStandardMaterial color="#17120e" roughness={0.95} />
        </mesh>
        <group name="PARTICLE_FIELD" position={[0, -0.18, 0.2]}>
          <mesh position={[0, -0.22, 0]} scale={[1.05, 1.1, 0.55]}>
            <sphereGeometry args={[0.92, 28, 18]} />
            <meshStandardMaterial color="#704b30" roughness={0.76} side={2} />
          </mesh>
          <mesh position={[0, 0.5, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.79, 0.08, 12, 32]} />
            <meshStandardMaterial color="#9b7045" roughness={0.62} />
          </mesh>
          {particles.map(([px, py], index) => (
            <mesh key={index} position={[px, py, 0.58]} rotation={[0, 0, index * 0.43]}>
              <sphereGeometry args={[0.075 + (index % 3) * 0.012, 9, 6]} />
              <meshStandardMaterial color={index % 2 ? '#71805a' : '#5d6d49'} roughness={0.9} />
            </mesh>
          ))}
        </group>
      </group>

      <group name="PAIR_MEMBER_B" position={[1.72, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.7, 3.7, 0.18]} />
          <meshStandardMaterial color="#17120e" roughness={0.95} />
        </mesh>
        <group position={[-0.1, -0.1, 0.18]}>
          <Bombilla insertion={insertion} matching={matching} />
        </group>
        <group name="SELECTIVE_PASSAGE" position={[0.15, 0.55, 0.36]} rotation={[0, 0, -1.06]}>
          {engaged && [0, 1, 2, 3].map((index) => (
            <mesh key={index} position={[0, index * 0.32 + flow * 0.12, 0]}>
              <sphereGeometry args={[0.05, 10, 8]} />
              <meshStandardMaterial color="#d4c28f" emissive="#887343" emissiveIntensity={0.45} />
            </mesh>
          ))}
        </group>
      </group>

      <group name="RELATION" position={[0, -0.22, 0.48]}>
        <mesh rotation={[0, 0, -0.18]}>
          <boxGeometry args={[1.16, 0.045, 0.045]} />
          <meshStandardMaterial color={engaged ? '#e5cf9f' : '#746450'} emissive={engaged ? '#8a7042' : '#000000'} emissiveIntensity={engaged ? 0.68 : 0} />
        </mesh>
        {engaged && [0, 1, 2].map((index) => (
          <mesh key={index} position={[-0.38 + index * 0.38, 0.03, 0.04]}>
            <sphereGeometry args={[0.05, 10, 8]} />
            <meshStandardMaterial color="#e7d39f" emissive="#8a7042" emissiveIntensity={0.65} />
          </mesh>
        ))}
      </group>

      <mesh position={[0, -2.04, -0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#070604" roughness={1} />
      </mesh>
    </>
  );
}
