'use client';

import React, { Component, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, OrbitControls, PerformanceMonitor, Sparkles } from '@react-three/drei';
import { CAMERA_KEYFRAMES, MODEL_PALETTE, SectionId } from '@/config/theme';
import { WeddingBackdropModel } from './WeddingBackdropModel';

interface RigProps {
  shot: SectionId;
  explore: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
}

/** Damps the camera toward the active keyframe each frame. Pointer parallax lives in refs, never in React state. */
function CinematicCameraRig({ shot, explore, isMobile, reducedMotion }: RigProps) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const lookAt = useRef(new THREE.Vector3(...CAMERA_KEYFRAMES.opening.target));
  const pointer = useRef({ x: 0, y: 0 });
  const tmpPos = useRef(new THREE.Vector3());

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reducedMotion]);

  useFrame((_, rawDelta) => {
    if (explore) return; // OrbitControls own the camera
    const delta = Math.min(rawDelta, 0.1); // no jump after a backgrounded tab
    const kf = CAMERA_KEYFRAMES[shot];
    const pos = isMobile ? kf.mobilePosition : kf.position;
    const target = isMobile ? kf.mobileTarget : kf.target;
    const fov = isMobile ? kf.mobileFov : kf.fov;
    const lambda = reducedMotion ? 30 : 1.5;

    const p = tmpPos.current.set(pos[0] + pointer.current.x * 0.014, pos[1] - pointer.current.y * 0.008, pos[2]);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, p.x, lambda, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, p.y, lambda, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, p.z, lambda, delta);
    lookAt.current.x = THREE.MathUtils.damp(lookAt.current.x, target[0], lambda, delta);
    lookAt.current.y = THREE.MathUtils.damp(lookAt.current.y, target[1], lambda, delta);
    lookAt.current.z = THREE.MathUtils.damp(lookAt.current.z, target[2], lambda, delta);
    camera.lookAt(lookAt.current);

    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = THREE.MathUtils.damp(camera.fov, fov, lambda, delta);
      camera.updateProjectionMatrix();
    }
  });

  if (!explore) return null;
  return (
    <OrbitControls
      target={lookAt.current}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={isMobile ? 0.35 : 0.5}
      zoomSpeed={0.6}
      minDistance={0.16}
      maxDistance={isMobile ? 0.85 : 0.7}
      minPolarAngle={0.95}
      maxPolarAngle={1.52}
      minAzimuthAngle={-0.75}
      maxAzimuthAngle={0.75}
    />
  );
}

class SceneErrorBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error('3D venue failed to render:', error);
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export interface VenueSceneCanvasProps {
  modelUrl: string | null;
  shot: SectionId;
  intro: boolean;
  explore: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  onReady: () => void;
  onError: () => void;
}

export function VenueSceneCanvas({
  modelUrl,
  shot,
  intro,
  explore,
  isMobile,
  reducedMotion,
  onReady,
  onError,
}: VenueSceneCanvasProps) {
  const [dpr, setDpr] = useState(isMobile ? 1.25 : 1.75);
  const start = CAMERA_KEYFRAMES.opening;

  return (
    <Canvas
      shadows={!isMobile}
      dpr={dpr}
      gl={{ antialias: true, toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 1.0, powerPreference: 'high-performance' }}
      camera={{
        position: isMobile ? start.mobilePosition : start.position,
        fov: isMobile ? start.mobileFov : start.fov,
        near: 0.01,
        far: 10,
      }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          onError();
        });
      }}
      aria-hidden
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <color attach="background" args={[MODEL_PALETTE.stageWarmIvory]} />
      {/* Distance fog in the stage colour: the venue emerges from the ivory as the camera walks in */}
      <fog attach="fog" args={[MODEL_PALETTE.stageWarmIvory, 0.6, 1.6]} />

      <hemisphereLight args={['#FFF8EC', MODEL_PALETTE.oliveGreenDrape, 0.55]} />
      <directionalLight
        position={[0.32, 0.5, 0.42]}
        intensity={1.5}
        color="#FFF3E0"
        castShadow={!isMobile}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.002}
        shadow-camera-left={-0.3}
        shadow-camera-right={0.3}
        shadow-camera-top={0.3}
        shadow-camera-bottom={-0.3}
        shadow-camera-near={0.05}
        shadow-camera-far={1.5}
      />
      <directionalLight position={[-0.4, 0.22, 0.3]} intensity={0.45} color={MODEL_PALETTE.giantFlowerBlush} />
      {/* Candle / chandelier warmth */}
      <pointLight position={[0, 0.16, 0.03]} intensity={0.06} distance={0.4} decay={2} color="#FFD9A0" />

      {/* Studio reflections without a network HDR: gold and crystal need something to reflect */}
      <Environment resolution={isMobile ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#FFF4E2" position={[0, 2, 1]} scale={[4, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#F6E3D6" position={[-2, 0.6, 1]} rotation-y={Math.PI / 2} scale={[3, 1.5, 1]} />
        <Lightformer form="rect" intensity={1.0} color="#FFF8EC" position={[2, 0.6, 1]} rotation-y={-Math.PI / 2} scale={[3, 1.5, 1]} />
        <Lightformer form="ring" intensity={1.5} color="#FFE6B8" position={[0, 1, 3]} scale={1.2} />
      </Environment>

      <SceneErrorBoundary onError={onError}>
        <Suspense fallback={null}>
          {modelUrl && (
            <WeddingBackdropModel url={modelUrl} sway={intro && !reducedMotion} reducedMotion={reducedMotion} onReady={onReady} />
          )}
        </Suspense>
      </SceneErrorBoundary>

      {!reducedMotion && modelUrl && (
        <Sparkles
          count={isMobile ? 16 : 34}
          scale={[0.42, 0.22, 0.4]}
          position={[0, 0.11, 0.08]}
          size={isMobile ? 1.2 : 1.6}
          speed={0.12}
          opacity={0.55}
          noise={0.4}
          color={MODEL_PALETTE.flowerCoreGold}
        />
      )}

      <CinematicCameraRig shot={shot} explore={explore} isMobile={isMobile} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
