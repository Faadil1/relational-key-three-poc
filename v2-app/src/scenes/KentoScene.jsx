export function KentoScene({ offset, pressed, matching, reducedMotion }) {
  const registered = matching && Math.abs(offset) <= 0.08;
  const shift = offset * 1.25;
  const pressDepth = pressed ? (reducedMotion ? 0.08 : 0.18) : 0;

  return (
    <>
      <color attach="background" args={['#15120e']} />
      <ambientLight intensity={1.0} />
      <directionalLight position={[2.8, 5, 5]} intensity={3.2} color="#fff0cd" />
      <pointLight position={[-3, 1.5, 2]} intensity={1.8} color="#d8a866" />

      <group name="PAIR_MEMBER_A" position={[-1.82, 0, 0]} rotation={[0, 0.11, -0.015]}>
        <mesh>
          <boxGeometry args={[2.65, 3.72, 0.22]} />
          <meshStandardMaterial color="#493020" roughness={0.9} />
        </mesh>
        <mesh position={[0.72, 0.18, 0.14]}>
          <boxGeometry args={[0.75, 0.07, 0.08]} />
          <meshStandardMaterial color="#d0a566" roughness={0.62} />
        </mesh>
        <mesh position={[0.38, -0.32, 0.14]}>
          <boxGeometry args={[0.07, 0.92, 0.08]} />
          <meshStandardMaterial color="#d0a566" roughness={0.62} />
        </mesh>
        <mesh position={[-0.35, 0.45, 0.14]}>
          <torusGeometry args={[0.58, 0.055, 10, 34, Math.PI * 1.55]} />
          <meshStandardMaterial color="#8a5d3c" roughness={0.78} />
        </mesh>
        <mesh position={[-0.18, -0.72, 0.14]} rotation={[0, 0, -0.22]}>
          <boxGeometry args={[1.65, 0.09, 0.07]} />
          <meshStandardMaterial color="#a8774d" roughness={0.72} />
        </mesh>
      </group>

      <group name="PAIR_MEMBER_B" position={[1.82, shift * 0.22, -pressDepth]} rotation={[0, -0.09, 0.012]}>
        <mesh>
          <boxGeometry args={[2.65, 3.72, 0.12]} />
          <meshStandardMaterial color="#e5dcc8" roughness={0.98} />
        </mesh>
        <mesh position={[-0.72 + shift * 0.08, 0.18 + shift, 0.085]}>
          <boxGeometry args={[0.75, 0.055, 0.035]} />
          <meshStandardMaterial color="#7b6544" roughness={0.72} />
        </mesh>
        <mesh position={[-0.38 + shift * 0.08, -0.32 + shift, 0.085]}>
          <boxGeometry args={[0.055, 0.92, 0.035]} />
          <meshStandardMaterial color="#7b6544" roughness={0.72} />
        </mesh>

        {pressed && (
          <group position={[shift, shift * 0.4, 0.09]}>
            <mesh position={[-0.2, -0.1, 0]}>
              <boxGeometry args={[1.75, 0.42, 0.025]} />
              <meshStandardMaterial color="#557e91" transparent opacity={0.78} />
            </mesh>
            <mesh position={[0.18, 0.34, 0.01]} rotation={[0, 0, 0.18]}>
              <boxGeometry args={[1.46, 0.38, 0.025]} />
              <meshStandardMaterial color="#b67f52" transparent opacity={0.76} />
            </mesh>
            <mesh position={[0.06, -0.54, 0.02]} rotation={[0, 0, -0.1]}>
              <boxGeometry args={[1.22, 0.32, 0.025]} />
              <meshStandardMaterial color="#728d73" transparent opacity={0.8} />
            </mesh>
          </group>
        )}
      </group>

      <group name="RELATION" position={[0, 0, 0.45]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.54, 0.045, 12, 48]} />
          <meshStandardMaterial color={registered && pressed ? '#dfbd75' : '#655b4c'} metalness={0.35} roughness={0.48} />
        </mesh>
        <mesh position={[0, -0.72, 0]}>
          <boxGeometry args={[0.07, 1.18, 0.07]} />
          <meshStandardMaterial color={registered ? '#c7a36b' : '#6f6556'} />
        </mesh>
      </group>

      <mesh position={[0, -2.0, -0.45]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#0f0e0b" roughness={1} />
      </mesh>
    </>
  );
}
