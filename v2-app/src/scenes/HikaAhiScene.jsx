export function HikaAhiScene({ friction, matching, reducedMotion }) {
  const progress = Math.max(0, Math.min(1, friction));
  const ember = matching && progress >= 0.72;
  const stroke = (reducedMotion ? 0.08 : 0.18) * (progress - 0.5);
  const heat = matching ? progress : progress * 0.42;
  const approach = matching ? progress : progress * 0.22;
  const stickX = 0.2 + approach * (reducedMotion ? 0.86 : 1.05);
  const stickAngle = -0.28 - approach * (reducedMotion ? 0.82 : 1.25);
  const baseShift = approach * (reducedMotion ? 0.42 : 0.52);
  const contactX = 0.42;

  return (
    <>
      <color attach="background" args={['#0e0d0b']} />
      <ambientLight intensity={1.02} />
      <directionalLight position={[3.5, 5, 4]} intensity={2.9} color="#f0d1a0" />
      <pointLight position={[contactX, 0.02, 2.8]} intensity={ember ? 2.6 : 0.45 + heat * 0.2} color="#e86f34" />

      <group name="PAIR_MEMBER_A" position={[-1.92, 0, 0]} rotation={[0, 0.08, -0.018]}>
        <group name="HIKA_STROKE">
          <mesh>
            <boxGeometry args={[2.65, 3.55, 0.22]} />
            <meshStandardMaterial color="#241c15" roughness={0.94} />
          </mesh>
          <mesh position={[stickX + stroke, 0.05, 0.32]} rotation={[0, 0, stickAngle]}>
            <cylinderGeometry args={[0.16, 0.12, 2.3, 20]} />
            <meshStandardMaterial color="#9b6b3e" roughness={0.9} />
          </mesh>
          <mesh position={[-0.54, -1.08, 0.31]}>
            <sphereGeometry args={[0.13, 18, 18]} />
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
          <mesh position={[-0.06 - baseShift, -0.1, 0.23]} rotation={[0, 0, 0.04]}>
            <boxGeometry args={[2.0, 0.62, 0.22]} />
            <meshStandardMaterial color="#845832" roughness={0.91} />
          </mesh>
          <mesh position={[0.06 - baseShift, -0.08, 0.37]} rotation={[0, 0, 0.04]}>
            <boxGeometry args={[1.5, 0.08, 0.045]} />
            <meshStandardMaterial color={ember ? '#3d2011' : '#2b1b12'} emissive={ember ? '#6f2d14' : '#000000'} emissiveIntensity={ember ? 0.42 : 0} roughness={1} />
          </mesh>
        </group>
      </group>

      <group name="RELATION" position={[contactX, -0.04, 0.48]}>
        <group name="FRICTION_INTERFACE">
          <mesh scale={1 + heat * 0.34}>
            <ringGeometry args={[0.16, 0.23, 40]} />
            <meshStandardMaterial color={heat > 0.55 ? '#d07038' : '#65503c'} emissive={heat > 0.55 ? '#8a3419' : '#000000'} emissiveIntensity={heat * 0.78} transparent opacity={0.34 + heat * 0.5} side={2} />
          </mesh>
          <mesh position={[0, 0, 0.035]} scale={ember ? 1 : 0.42}>
            <sphereGeometry args={[0.12, 20, 20]} />
            <meshStandardMaterial color={ember ? '#ffb45d' : '#5a3422'} emissive={ember ? '#e2602c' : '#000000'} emissiveIntensity={ember ? 1.6 : 0} />
          </mesh>
        </group>
        <group name="EMBER_WITNESS" visible={ember} position={[0, 0, 0.075]}>
          <mesh>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#fff0bd" emissive="#e96b30" emissiveIntensity={2.35} />
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
