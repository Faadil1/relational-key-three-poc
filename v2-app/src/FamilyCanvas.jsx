import { useLayoutEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';

function FitPair({ sceneId }) {
  const { camera, size, invalidate } = useThree();
  useLayoutEffect(() => {
    const tangent = Math.tan(camera.fov * Math.PI / 360);
    const city = [
      'city-gatineau','metate-teotitlan','siku-bolivia','textile-bonwire','boulle-france',
      'frida-coyoacan','zellige-fes','swell-marshall','tongiaki-tonga',
      'garamut-sepik-ramu','khipu-peru','mate-bombilla-argentina','hika-ahi-aotearoa',
      'music-box-sainte-croix','funicular-valparaiso','signal-nigeria','astrolabe-isfahan',
      'service-benin','food-toyama','kento-japan','stereoscopy-uk',
    ].includes(sceneId);
    const narrow = size.width < 600;
    const halfWidth = city ? (narrow ? 1.72 : 4.0) : 3.7;
    const halfHeight = city ? (narrow ? 2.55 : 1.5) : 2.3;
    camera.position.set(0, 0, Math.max(halfWidth / (tangent * (size.width / size.height)), halfHeight / tangent) + .8);
    camera.lookAt(0,0,0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, size.width, size.height, invalidate, sceneId]);
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
      {[
        'metate-teotitlan', 'siku-bolivia', 'city-gatineau', 'textile-bonwire', 'boulle-france',
        'frida-coyoacan', 'zellige-fes', 'swell-marshall', 'tongiaki-tonga',
        'garamut-sepik-ramu', 'khipu-peru', 'mate-bombilla-argentina', 'hika-ahi-aotearoa',
        'music-box-sainte-croix', 'funicular-valparaiso', 'signal-nigeria', 'astrolabe-isfahan',
        'service-benin', 'food-toyama', 'kento-japan', 'stereoscopy-uk',
      ].includes(sceneId) && <FitPair sceneId={sceneId} />}
      {children}
    </Canvas>
  );
}
