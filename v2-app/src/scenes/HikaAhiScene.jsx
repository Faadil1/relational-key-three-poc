export function HikaAhiScene({ friction, matching, reducedMotion }) {
  const progress = Math.max(0, Math.min(1, friction));
  const ember = matching && progress >= 0.72;
  const stroke = (reducedMotion ? 0.18 : 0.5) * (progress - 0.5);
  const heat = matching ? progress : progress * 0.42;

  return (
    <>
      <color attach="background" args={['#0e0d0b']} />
      <ambientLight intensity={1.02} />
      <directionalLight position={[3.5, 5, 4]} intensity={2.9} color="#f0d1a0" />
      <pointLight position={[0, 0.2, 2.8]} intensity={ember ? 2.4 : 0.55} color="#e86f34" />

      <group name="PAIR_MEMBER_A" position={[-1.92, 0, 0]} rotation={[0, 0.08, -0.018]}>
        <group name="HIKA_STROKE">
          <mesh>
            <boxGeometry args={[2.65, 3.55, 0.22]} />
            <meshStandardMaterial color="#241c15" roughness={0.94} />
          </mesh>
          <mesh position={[0.2 + stroke, 0.05, 0.32]} rotation={[0, 0, -0.28]}>
            <cylinderGeometry args={[0.16, 0.12, 2.3, 20]} />
            <meshStandardMaterial color="#9b6b3e" roughness={0.9} />
          </mesh>
          <mesh position={[0.57 + stroke, -0.91, 0.36]} rotation={[0, 0, -0.28]}>
            <sphereGeometry args={[0.17, 18, 18]} />
            <meshStandardMaterial color="#352319" roughness={0.96} />
          </mesh>
        </group>
      </group>

      <group name="PAIR_MEMBER_B" position={[1.92, 0, 0]} rotation={[0, -0.08, 0.018]}>
        <group name="GROOVED_BASE">
          <mesh>
            <boxGeometry args={[2.65, 3.55, 0.22]} />
            <meshStandardMaterial color="#211b15" roughness={0.94} />
          </mesh>
          <mesh position={[-0.06, -0.1, 0.23]} rotation={[0, 0, 0.08]}>
            <boxGeometry args={[2.0, 0.62, 0.22]} />
            <meshStandardMaterial color="#845832" roughness={0.91} />
          </mesh>
          <mesh position={[0.06, -0.08, 0.37]} rotation={[0, 0, 0.08]}>
            <boxGeometry args={[1.5, 0.08, 0.045]} />
            <meshStandardMaterial color="#2b1b12" roughness={1} />
          </mesh>
        </group>
      </group>

      <group name="RELATION" position={[0, -0.08, 0.48]}>
        <group name="FRICTION_INTERFACE">
          <mesh rotation={[0, 0, matching ? 0 : 0.16]}>
            <boxGeometry args={[1.12, 0.1, 0.08]} />
            <meshStandardMaterial color={heat > 0.55 ? '#b85d2f' : '#65503c'} emissive={heat > 0.55 ? '#8a3419' : '#000000'} emissiveIntensity={heat * 0.72} />
          </mesh>
          <mesh position={[0.36, 0.08, 0.05]} scale={ember ? 1 : 0.42}>
            <sphereGeometry args={[0.13, 20, 20]} />
            <meshStandardMaterial color={ember ? '#ffb45d' : '#5a3422'} emissive={ember ? '#e2602c' : '#000000'} emissiveIntensity={ember ? 1.5 : 0} />
          </mesh>
          <mesh position={[-0.2, -0.2, 0]}>
            <ringGeometry args={[0.22, 0.27, 32]} />
            <meshStandardMaterial color={matching ? '#b36b3d' : '#665447'} transparent opacity={0.45 + heat * 0.35} side={2} />
          </mesh>
        </group>
        <group name="EMBER_WITNESS" visible={ember} position={[0.36, 0.08, 0.08]}>
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#fff0bd" emissive="#e96b30" emissiveIntensity={2.2} />
          </mesh>
        </group>
      </group>

      <mesh position={[0, -2.0, -0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#0a0908" roughness={1} />
      </mesh>
    </>
  );
}
