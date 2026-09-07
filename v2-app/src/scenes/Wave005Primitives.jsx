export function Stage({ background = '#0d0c0a', warm = '#f0d5a4', accent = '#6ca08b' }) {
  return (
    <>
      <color attach="background" args={[background]} />
      <ambientLight intensity={1.02} />
      <directionalLight position={[3.8, 5.2, 4]} intensity={2.9} color={warm} />
      <pointLight position={[-3, 1.4, 2.8]} intensity={1.05} color={accent} />
      <mesh position={[0, -2.0, -0.58]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#090907" roughness={1} />
      </mesh>
    </>
  );
}

export function CardPanel({ position, rotation = [0, 0, 0], color = '#211d17', children }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[2.62, 3.52, 0.22]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      {children}
    </group>
  );
}

export function Bar({ position = [0, 0, 0], size = [1, 0.08, 0.05], color = '#b89358', emissive = '#000000', emissiveIntensity = 0, rotation = [0, 0, 0] }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={emissiveIntensity} roughness={0.68} />
    </mesh>
  );
}

export function Dot({ position = [0, 0, 0], radius = 0.09, color = '#d5b06c', emissive = '#000000', emissiveIntensity = 0 }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 18, 18]} />
      <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={emissiveIntensity} roughness={0.64} />
    </mesh>
  );
}
