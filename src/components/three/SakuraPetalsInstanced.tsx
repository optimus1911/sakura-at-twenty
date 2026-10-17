"use client";

import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { motionState } from "@/lib/device-motion";

interface SakuraPetalsProps {
  petalCount?: number;
  blossomCount?: number;
  areaSize?: [number, number, number];
  windSpeed?: number;
}

interface PetalParticle {
  x: number;
  y: number;
  z: number;
  scale: number;
  fallSpeed: number;
  swaySpeed: number;
  swayAmp: number;
  swayOffset: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Color palette: soft pink, pale blush, and warm ivory
const PETAL_COLORS = [
  new THREE.Color("#F7B5D4"), // Soft pink
  new THREE.Color("#FDEBF3"), // Pale blush
  new THREE.Color("#FFFDF7"), // Warm ivory
  new THREE.Color("#F4A8C8"), // Rich cherry petal
];

// ─── Geometry: Individual Curved Elongated Sakura Petal with Cleft Tip ───
function createPetalGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  // Left curve to widest point
  shape.bezierCurveTo(-0.45, 0.45, -0.55, 1.0, -0.25, 1.4);
  // Left tip cleft notch
  shape.bezierCurveTo(-0.06, 1.55, 0.0, 1.38, 0.0, 1.38);
  // Right tip cleft notch
  shape.bezierCurveTo(0.0, 1.38, 0.06, 1.55, 0.25, 1.4);
  // Right curve back to base
  shape.bezierCurveTo(0.55, 1.0, 0.45, 0.45, 0, 0);

  const geom = new THREE.ShapeGeometry(shape, 10);
  const pos = geom.attributes.position;
  // Subtle 3D cupping curvature across length
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const x = pos.getX(i);
    pos.setZ(i, Math.sin(y * 1.8) * 0.16 + (x * x) * 0.1);
  }
  geom.computeVertexNormals();
  return geom;
}

// ─── Geometry: Five-Lobed Blossom Cluster ───
function createBlossomGeometry(): THREE.BufferGeometry {
  const fullShape = new THREE.Shape();
  const numPetals = 5;
  const lobeLength = 0.5;
  const lobeWidth = 0.32;

  // Build 5 overlapping petal lobes around center
  for (let i = 0; i < numPetals; i++) {
    const angle = (i * 2 * Math.PI) / numPetals;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const cosPerp = Math.cos(angle + Math.PI / 2);
    const sinPerp = Math.sin(angle + Math.PI / 2);

    const tipX = cosA * lobeLength;
    const tipY = sinA * lobeLength;

    if (i === 0) {
      fullShape.moveTo(0, 0);
    }
    // Lobe out
    fullShape.quadraticCurveTo(
      cosA * 0.25 + cosPerp * lobeWidth,
      sinA * 0.25 + sinPerp * lobeWidth,
      tipX,
      tipY
    );
    // Lobe back
    fullShape.quadraticCurveTo(
      cosA * 0.25 - cosPerp * lobeWidth,
      sinA * 0.25 - sinPerp * lobeWidth,
      0,
      0
    );
  }

  const geom = new THREE.ShapeGeometry(fullShape, 8);
  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const dist = Math.hypot(pos.getX(i), pos.getY(i));
    pos.setZ(i, Math.sin(dist * 3.5) * 0.08);
  }
  geom.computeVertexNormals();
  return geom;
}

export function SakuraPetalsInstanced({
  petalCount = 85,
  blossomCount = 16,
  areaSize = [16, 12, 6],
  windSpeed = 0.75,
}: SakuraPetalsProps) {
  const petalMeshRef = useRef<THREE.InstancedMesh>(null);
  const blossomMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Geometries
  const petalGeometry = useMemo(() => createPetalGeometry(), []);
  const blossomGeometry = useMemo(() => createBlossomGeometry(), []);

  // Shared translucent blush material
  const petalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FFFFFF"), // Tinted per-instance via instanceColor
      roughness: 0.45,
      metalness: 0.02,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
    });
  }, []);

  // Blossom material with gentle golden center emissive
  const blossomMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FDE4EF"),
      emissive: new THREE.Color("#EAB7D0"),
      emissiveIntensity: 0.22,
      roughness: 0.5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    });
  }, []);

  // Particle state arrays
  const petalsRef = useRef<PetalParticle[]>([]);
  const blossomsRef = useRef<PetalParticle[]>([]);

  // Initialize petals & blossoms
  useEffect(() => {
    const pList: PetalParticle[] = [];
    for (let i = 0; i < petalCount; i++) {
      const r1 = pseudoRandom(i * 1.3 + 0.1);
      const r2 = pseudoRandom(i * 2.7 + 0.3);
      const r3 = pseudoRandom(i * 3.9 + 0.5);
      const r4 = pseudoRandom(i * 4.4 + 0.7);
      const r5 = pseudoRandom(i * 5.8 + 0.9);
      const r6 = pseudoRandom(i * 6.2 + 0.2);

      // Distribute around edges (|x| > 1.8) or deep behind (z < -0.8) so photo stays clear
      let x: number;
      let z: number;
      if (i % 3 === 0) {
        x = (r1 - 0.5) * areaSize[0];
        z = -1.2 - r3 * 3.2;
      } else {
        const side = r1 < 0.5 ? -1 : 1;
        const spread = 1.9 + r2 * (areaSize[0] * 0.42);
        x = side * spread;
        z = (r3 - 0.5) * areaSize[2];
      }

      const y = (r2 - 0.5) * areaSize[1];
      // Size: 0.14 to 0.24 (recognisable individual petal)
      const scale = 0.14 + r4 * 0.10;
      const fallSpeed = 0.009 + r5 * 0.012;
      const swaySpeed = 0.9 + r6 * 1.1;
      const swayAmp = 0.005 + r1 * 0.007;
      const swayOffset = i * 0.45;

      pList.push({
        x,
        y,
        z,
        scale,
        fallSpeed,
        swaySpeed,
        swayAmp,
        swayOffset,
        rotX: r1 * Math.PI * 2,
        rotY: r2 * Math.PI * 2,
        rotZ: r3 * Math.PI * 2,
        rotSpeedX: (r4 - 0.5) * 0.02,
        rotSpeedY: (r5 - 0.5) * 0.025,
        rotSpeedZ: (r6 - 0.5) * 0.02,
      });

      // Assign individual palette colors
      if (petalMeshRef.current) {
        const color = PETAL_COLORS[i % PETAL_COLORS.length];
        petalMeshRef.current.setColorAt(i, color);
      }
    }
    petalsRef.current = pList;
    if (petalMeshRef.current?.instanceColor) {
      petalMeshRef.current.instanceColor.needsUpdate = true;
    }

    // Initialize 5-lobed blossoms (floating clusters at edges)
    const bList: PetalParticle[] = [];
    for (let i = 0; i < blossomCount; i++) {
      const r1 = pseudoRandom(i * 2.1 + 5.1);
      const r2 = pseudoRandom(i * 3.4 + 7.3);
      const r3 = pseudoRandom(i * 4.7 + 9.5);
      const r4 = pseudoRandom(i * 5.2 + 1.7);

      const side = r1 < 0.5 ? -1 : 1;
      const x = side * (2.8 + r2 * 4.5);
      const y = (r3 - 0.5) * areaSize[1];
      const z = -0.5 - r4 * 2.5;

      bList.push({
        x,
        y,
        z,
        scale: 0.22 + r4 * 0.12,
        fallSpeed: 0.006 + r1 * 0.007,
        swaySpeed: 0.7 + r2 * 0.8,
        swayAmp: 0.004 + r3 * 0.005,
        swayOffset: i * 0.7,
        rotX: r1 * Math.PI * 2,
        rotY: r2 * Math.PI * 2,
        rotZ: r3 * Math.PI * 2,
        rotSpeedX: (r2 - 0.5) * 0.012,
        rotSpeedY: (r3 - 0.5) * 0.015,
        rotSpeedZ: (r4 - 0.5) * 0.012,
      });
    }
    blossomsRef.current = bList;
  }, [petalCount, blossomCount, areaSize]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Responsive breeze & safe bounded shower on movement
    const intensityBoost = prefersReducedMotion ? 0.08 : 1 + motionState.intensity * 2.0;
    const tiltWind = prefersReducedMotion ? 0 : motionState.tiltX * 0.018;

    // ─── 1. Update Falling Petals ───
    if (petalMeshRef.current) {
      const petals = petalsRef.current;
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        if (!p) continue;

        if (!prefersReducedMotion) {
          p.y -= p.fallSpeed * intensityBoost * (delta * 60);
          p.x += (Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayAmp + 0.002 * windSpeed + tiltWind) * (delta * 60);
          p.z += Math.cos(time * (p.swaySpeed * 0.75) + p.swayOffset) * (p.swayAmp * 0.5) * (delta * 60);

          p.rotX += p.rotSpeedX * intensityBoost;
          p.rotY += p.rotSpeedY * intensityBoost;
          p.rotZ += p.rotSpeedZ * intensityBoost;

          // Wrap to top when below bounds
          if (p.y < -areaSize[1] / 2) {
            p.y = areaSize[1] / 2;
            const rSeed = pseudoRandom(time + i);
            if (i % 3 === 0) {
              p.x = (rSeed - 0.5) * areaSize[0];
              p.z = -1.2 - pseudoRandom(time * 2 + i) * 3.2;
            } else {
              const side = rSeed < 0.5 ? -1 : 1;
              p.x = side * (1.9 + pseudoRandom(time * 1.5 + i) * (areaSize[0] * 0.42));
              p.z = (pseudoRandom(time * 2 + i) - 0.5) * areaSize[2];
            }
          }
        }

        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
        dummy.scale.set(p.scale, p.scale, p.scale);
        dummy.updateMatrix();

        petalMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      petalMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // ─── 2. Update Edge Blossom Clusters ───
    if (blossomMeshRef.current) {
      const blossoms = blossomsRef.current;
      for (let i = 0; i < blossoms.length; i++) {
        const b = blossoms[i];
        if (!b) continue;

        if (!prefersReducedMotion) {
          b.y -= b.fallSpeed * intensityBoost * (delta * 60);
          b.x += (Math.sin(time * b.swaySpeed + b.swayOffset) * b.swayAmp + tiltWind * 0.8) * (delta * 60);
          b.rotZ += b.rotSpeedZ * intensityBoost;
          b.rotY += b.rotSpeedY * intensityBoost;

          if (b.y < -areaSize[1] / 2) {
            b.y = areaSize[1] / 2;
            const rSeed = pseudoRandom(time * 3 + i);
            const side = rSeed < 0.5 ? -1 : 1;
            b.x = side * (2.8 + pseudoRandom(time * 1.7 + i) * 4.5);
          }
        }

        dummy.position.set(b.x, b.y, b.z);
        dummy.rotation.set(b.rotX, b.rotY, b.rotZ);
        dummy.scale.set(b.scale, b.scale, b.scale);
        dummy.updateMatrix();

        blossomMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      blossomMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Instanced recognizable falling petals */}
      <instancedMesh
        ref={petalMeshRef}
        args={[petalGeometry, petalMaterial, petalCount]}
        frustumCulled={false}
      />

      {/* Instanced five-lobed blossom clusters at perimeter edges */}
      <instancedMesh
        ref={blossomMeshRef}
        args={[blossomGeometry, blossomMaterial, blossomCount]}
        frustumCulled={false}
      />
    </group>
  );
}
