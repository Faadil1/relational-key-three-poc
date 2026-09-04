import { Canvas } from '@react-three/fiber';

export function FamilyCanvas({ sceneId, children }) {
  return (
    <Canvas
      data-scene-runtime={sceneId}
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.35, 6.2], fov: 42, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => gl.setClearColor('#c8c3b8')}
    >
      {children}
    </Canvas>
  );
}
