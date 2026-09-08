import { useLayoutEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';

function FitPair() {
  const { camera, size, invalidate } = useThree();
  useLayoutEffect(() => {
    const tangent = Math.tan(camera.fov * Math.PI / 360);
    camera.position.set(0, 0, Math.max(3.7 / (tangent * (size.width / size.height)), 2.3 / tangent) + .8);
    camera.lookAt(0,0,0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, size.width, size.height, invalidate]);
  return null;
}
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
      {['metate-teotitlan', 'siku-bolivia'].includes(sceneId) && <FitPair />}
      {children}
    </Canvas>
  );
}
