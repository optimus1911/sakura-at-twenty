"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface BirthdayCake3DProps {
  candleLit?: boolean;
}

export function BirthdayCake3D({ candleLit = true }: BirthdayCake3DProps) {
  const cakeGroupRef = useRef<THREE.Group>(null);
  const flameLightRef = useRef<THREE.PointLight>(null);
  const flameMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Slow, stately rotation
    if (cakeGroupRef.current) {
      cakeGroupRef.current.rotation.y = time * 0.25;
      cakeGroupRef.current.position.y = Math.sin(time * 1.2) * 0.04 - 0.2;
    }

    // Flame flicker
    if (candleLit) {
      if (flameLightRef.current) {
        flameLightRef.current.intensity = 2.4 + Math.sin(time * 12) * 0.4 + Math.cos(time * 24) * 0.2;
      }
      if (flameMeshRef.current) {
        const scaleY = 1 + Math.sin(time * 15) * 0.15;
        const scaleX = 1 + Math.cos(time * 12) * 0.1;
        flameMeshRef.current.scale.set(scaleX, scaleY, scaleX);
      }
    }
  });

  return (
    <group ref={cakeGroupRef} position={[0, -0.2, 0]}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.65} color="#FFF5F7" />
      <directionalLight position={[3, 5, 4]} intensity={1.0} color="#FFF8F1" />

      {/* Porcelain Cake Stand */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[1.4, 1.45, 0.08, 36]} />
        <meshStandardMaterial color="#FAF5EE" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Stand Pedestal */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.22, 0.45, 0.42, 24]} />
        <meshStandardMaterial color="#FAF5EE" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Bottom Cake Tier (Soft strawberry-blush cream) */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.52, 36]} />
        <meshStandardMaterial color="#F6D9E6" roughness={0.4} />
      </mesh>
      {/* Bottom tier decorative cream pearls */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const x = Math.cos(angle) * 1.14;
        const z = Math.sin(angle) * 1.14;
        return (
          <mesh key={i} position={[x, -0.38, z]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#FFF8F1" roughness={0.2} />
          </mesh>
        );
      })}

      {/* Top Cake Tier (Warm vanilla-cream) */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 0.42, 36]} />
        <meshStandardMaterial color="#FFF8F1" roughness={0.35} />
      </mesh>
      {/* Top tier decorative cream pearls */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const x = Math.cos(angle) * 0.76;
        const z = Math.sin(angle) * 0.76;
        return (
          <mesh key={i} position={[x, 0.1, z]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#EAB7D0" roughness={0.3} />
          </mesh>
        );
      })}

      {/* Gold drip / ribbon accent around top tier */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.03, 36]} />
        <meshStandardMaterial color="#E7CB92" metalness={0.7} roughness={0.25} />
      </mesh>

      {/* Number '2' candle in gold */}
      <group position={[-0.18, 0.65, 0]} scale={[0.18, 0.18, 0.18]}>
        {/* Top curve */}
        <mesh position={[0, 0.8, 0]}>
          <torusGeometry args={[0.45, 0.12, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#E7CB92" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Diagonal stroke */}
        <mesh position={[-0.1, 0.25, 0]} rotation={[0, 0, -0.65]}>
          <boxGeometry args={[0.2, 0.9, 0.16]} />
          <meshStandardMaterial color="#E7CB92" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Base stroke */}
        <mesh position={[0.05, -0.25, 0]}>
          <boxGeometry args={[0.9, 0.2, 0.16]} />
          <meshStandardMaterial color="#E7CB92" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Number '0' candle in gold */}
      <group position={[0.18, 0.72, 0]} scale={[0.18, 0.18, 0.18]}>
        <mesh>
          <torusGeometry args={[0.45, 0.12, 16, 28]} />
          <meshStandardMaterial color="#E7CB92" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Candle Wicks */}
      <mesh position={[-0.18, 0.88, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.1, 8]} />
        <meshBasicMaterial color="#30263F" />
      </mesh>
      <mesh position={[0.18, 0.88, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.1, 8]} />
        <meshBasicMaterial color="#30263F" />
      </mesh>

      {/* Flame on candle (when lit) */}
      {candleLit && (
        <group position={[0, 0.98, 0]}>
          {/* Flame mesh */}
          <mesh ref={flameMeshRef} position={[0, 0, 0]}>
            <coneGeometry args={[0.08, 0.22, 12]} />
            <meshBasicMaterial color="#FFD166" />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <coneGeometry args={[0.04, 0.14, 12]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          {/* Golden candlelight glow */}
          <pointLight
            ref={flameLightRef}
            position={[0, 0.05, 0]}
            color="#FFC870"
            intensity={2.8}
            distance={4}
            decay={1.8}
          />
        </group>
      )}
    </group>
  );
}
