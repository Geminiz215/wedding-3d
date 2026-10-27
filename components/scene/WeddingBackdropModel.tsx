'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

interface WeddingBackdropModelProps {
  url: string;
  sway: boolean; // slow showcase rotation behind the opening card
  reducedMotion: boolean;
  onReady: () => void;
}

/**
 * Renders Backdrop_Pernikahan_Romantis_Updated.glb with its original 15 PBR materials untouched.
 * Only shadow flags are set. The pivot is the measured bounding-box centre, not the file origin.
 */
export function WeddingBackdropModel({ url, sway, reducedMotion, onReady }: WeddingBackdropModelProps) {
  const { scene } = useGLTF(url);
  const pivotRef = useRef<THREE.Group>(null);

  const { center, chandelier, flower } = useMemo(() => {
    let chandelier: THREE.Object3D | undefined;
    let flower: THREE.Object3D | undefined;
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
      if (child.name.includes('Chandelier_Crystals')) chandelier = child;
      if (child.name.includes('Giant_Central_Flower')) flower = child;
    });
    const center = new THREE.Box3().setFromObject(scene).getCenter(new THREE.Vector3());
    return { center, chandelier, flower };
  }, [scene]);

  useEffect(() => {
    onReady();
  }, [scene, onReady]);

  useFrame((state, delta) => {
    const pivot = pivotRef.current;
    if (!pivot) return;
    const t = state.clock.elapsedTime;
    const targetY = sway ? Math.sin(t * 0.22) * 0.38 : 0;
    pivot.rotation.y = THREE.MathUtils.damp(pivot.rotation.y, targetY, 1.2, Math.min(delta, 0.1));
    if (reducedMotion) return;
    // Barely-there life: crystals catch light, the central bloom breathes.
    if (chandelier) chandelier.rotation.y = Math.sin(t * 0.5) * 0.012;
    if (flower) flower.scale.setScalar(1 + Math.sin(t * 0.7) * 0.0025);
  });

  return (
    <group ref={pivotRef} position={[center.x, 0, center.z]}>
      <primitive object={scene} position={[-center.x, 0, -center.z]} />
    </group>
  );
}
