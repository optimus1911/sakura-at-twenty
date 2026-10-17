"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { SakuraPetalsInstanced } from "./SakuraPetalsInstanced";
import { motionState } from "@/lib/device-motion";

interface SakuraWorldProps {
  interactive?: boolean;
}

export function SakuraWorld({ interactive = true }: SakuraWorldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const isMobile = size.width < 1024;

  useFrame(() => {
    // Restrained smooth parallax for the drifting petals layer
    if (interactive && groupRef.current) {
      const targetX = motionState.tiltX * 0.22;
      const targetY = -motionState.tiltY * 0.15;
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        0.04
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.04
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Soft warm twilight ambient illumination for drifting petals & edge blossoms */}
      <ambientLight intensity={1.8} color="#FCEAF3" />
      <directionalLight position={[4, 7, 4]} intensity={1.5} color="#FFFDF7" />
      <pointLight position={[0, 2, 4]} intensity={1.0} color="#FFD8EB" distance={12} decay={2} />

      {/* Instanced recognisable sakura petals and perimeter blossom clusters */}
      <SakuraPetalsInstanced
        petalCount={isMobile ? 24 : 85}
        blossomCount={isMobile ? 4 : 16}
        areaSize={[16, 12, 6]}
        windSpeed={0.8}
      />
    </group>
  );
}
