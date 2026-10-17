"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function StudyDesk3D() {
  const groupRef = useRef<THREE.Group>(null);
  const steamGroupRef = useRef<THREE.Group>(null);
  const lampLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Subtle breathing mouse parallax
    if (groupRef.current) {
      const targetRotY = state.pointer.x * 0.15;
      const targetRotX = -state.pointer.y * 0.08;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    }

    // Animated rising coffee steam particles
    if (steamGroupRef.current) {
      steamGroupRef.current.children.forEach((child, index) => {
        const offset = index * 0.8;
        child.position.y = 0.5 + ((time * 0.4 + offset) % 1.2);
        const progress = ((time * 0.4 + offset) % 1.2) / 1.2;
        child.position.x = Math.sin(time * 2 + index) * 0.05 * progress;
        child.scale.setScalar(0.04 + progress * 0.08);
        (child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>).material.opacity = (1 - progress) * 0.45;
      });
    }

    // Warm lamp gentle hum/glow
    if (lampLightRef.current) {
      lampLightRef.current.intensity = 2.0 + Math.sin(time * 3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 1.2]}>
      {/* Warm ambient interior light */}
      <ambientLight intensity={0.5} color="#DCD3F8" />
      <directionalLight position={[2, 4, 3]} intensity={0.8} color="#FFF8F1" />

      {/* Desk Surface (Warm walnut/cherry wood) */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.14, 2.8]} />
        <meshStandardMaterial color="#3D2B24" roughness={0.65} metalness={0.1} />
      </mesh>

      {/* Desk Lamp (Warm Brass & Lamp shade) */}
      <group position={[1.3, 0.0, -0.6]}>
        {/* Lamp Base */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.22, 0.25, 0.04, 24]} />
          <meshStandardMaterial color="#C5A059" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Curved stem */}
        <mesh position={[-0.1, 0.45, 0]} rotation={[0, 0, -0.25]}>
          <cylinderGeometry args={[0.025, 0.025, 0.9, 16]} />
          <meshStandardMaterial color="#C5A059" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Lamp shade */}
        <mesh position={[-0.26, 0.85, 0]} rotation={[0, 0, 0.35]}>
          <coneGeometry args={[0.26, 0.32, 24, 1, true]} />
          <meshStandardMaterial color="#2E4A40" roughness={0.4} side={THREE.DoubleSide} />
        </mesh>
        {/* Bulb emissive */}
        <mesh position={[-0.26, 0.78, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#FFE8B0" />
        </mesh>
        {/* Warm lamp point light */}
        <pointLight
          ref={lampLightRef}
          position={[-0.26, 0.74, 0]}
          color="#FFE2A3"
          intensity={2.2}
          distance={4.5}
          decay={1.8}
        />
      </group>

      {/* Open Notebook (Cream paper, stitched spine) */}
      <group position={[-0.2, 0.02, 0.2]} rotation={[0, 0.08, 0]}>
        {/* Left page */}
        <mesh position={[-0.32, 0.015, 0]} rotation={[0, 0, 0.02]}>
          <boxGeometry args={[0.62, 0.025, 0.84]} />
          <meshStandardMaterial color="#FFF8F1" roughness={0.9} />
        </mesh>
        {/* Right page */}
        <mesh position={[0.32, 0.015, 0]} rotation={[0, 0, -0.02]}>
          <boxGeometry args={[0.62, 0.025, 0.84]} />
          <meshStandardMaterial color="#FCF5EB" roughness={0.9} />
        </mesh>
        {/* Spine cover back */}
        <mesh position={[0, 0.005, 0]}>
          <boxGeometry args={[1.3, 0.01, 0.88]} />
          <meshStandardMaterial color="#5C4235" roughness={0.7} />
        </mesh>
        {/* Subtle diagram grid / lines texture indicator on page */}
        <mesh position={[-0.32, 0.03, 0]}>
          <planeGeometry args={[0.54, 0.74]} />
          <meshBasicMaterial color="#E8D8CF" transparent opacity={0.35} />
        </mesh>
      </group>

      {/* The ONE Pair of Black Eyeglasses resting on the open notebook */}
      <group position={[-0.18, 0.06, 0.22]} rotation={[-0.1, 0.22, 0]}>
        {/* Left Rim */}
        <mesh position={[-0.18, 0, 0]}>
          <torusGeometry args={[0.09, 0.015, 12, 28]} />
          <meshStandardMaterial color="#111113" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Right Rim */}
        <mesh position={[0.18, 0, 0]}>
          <torusGeometry args={[0.09, 0.015, 12, 28]} />
          <meshStandardMaterial color="#111113" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Center Bridge */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
          <meshStandardMaterial color="#111113" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Left Temple arm (folded) */}
        <mesh position={[-0.26, -0.02, -0.14]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.012, 0.012, 0.28]} />
          <meshStandardMaterial color="#111113" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Right Temple arm (folded) */}
        <mesh position={[0.26, -0.02, -0.14]} rotation={[0, -0.35, 0]}>
          <boxGeometry args={[0.012, 0.012, 0.28]} />
          <meshStandardMaterial color="#111113" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Subtle Lens Glass */}
        <mesh position={[-0.18, 0, 0]}>
          <circleGeometry args={[0.08, 20]} />
          <meshStandardMaterial color="#DCD3F8" transparent opacity={0.25} roughness={0.1} />
        </mesh>
        <mesh position={[0.18, 0, 0]}>
          <circleGeometry args={[0.08, 20]} />
          <meshStandardMaterial color="#DCD3F8" transparent opacity={0.25} roughness={0.1} />
        </mesh>
      </group>

      {/* The ONE Coffee Cup with rising steam */}
      <group position={[0.82, 0.0, 0.2]}>
        {/* Ceramic Saucer */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.3, 0.24, 0.02, 24]} />
          <meshStandardMaterial color="#F4EAE1" roughness={0.3} />
        </mesh>
        {/* Ceramic Mug */}
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.18, 0.15, 0.28, 24]} />
          <meshStandardMaterial color="#FAF5EE" roughness={0.3} />
        </mesh>
        {/* Dark rich coffee liquid */}
        <mesh position={[0, 0.27, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.16, 24]} />
          <meshStandardMaterial color="#301A0E" roughness={0.1} />
        </mesh>
        {/* Mug Handle */}
        <mesh position={[0.21, 0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.09, 0.02, 12, 18, Math.PI]} />
          <meshStandardMaterial color="#FAF5EE" roughness={0.3} />
        </mesh>
        {/* Animated Rising Steam Particles */}
        <group ref={steamGroupRef} position={[0, 0.32, 0]}>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[0, i * 0.25, 0]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshBasicMaterial color="#FFF8F1" transparent opacity={0.3} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Coherent Study Book Stack (Discreet NEET / Biology detail) */}
      <group position={[-1.25, 0.0, -0.3]} rotation={[0, -0.15, 0]}>
        {/* Bottom thick book (Deep emerald) */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.72, 0.1, 0.96]} />
          <meshStandardMaterial color="#223E36" roughness={0.7} />
        </mesh>
        {/* Middle book (Twilight plum) */}
        <mesh position={[0.02, 0.13, 0.01]} rotation={[0, 0.08, 0]}>
          <boxGeometry args={[0.68, 0.07, 0.92]} />
          <meshStandardMaterial color="#4A3459" roughness={0.7} />
        </mesh>
        {/* Top book (Muted rose cover - Human Anatomy & Physiology) */}
        <mesh position={[-0.01, 0.2, 0.02]} rotation={[0, -0.05, 0]}>
          <boxGeometry args={[0.64, 0.06, 0.88]} />
          <meshStandardMaterial color="#B96D86" roughness={0.7} />
        </mesh>
        {/* Ribbon bookmark draped from top book */}
        <mesh position={[0.32, 0.14, 0.15]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.04, 0.15, 0.01]} />
          <meshStandardMaterial color="#E7CB92" roughness={0.5} />
        </mesh>
      </group>

      {/* Delicate Vase with a Sakura Twig */}
      <group position={[-0.9, 0.0, 0.5]}>
        {/* Ceramic vase */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.07, 0.14, 0.44, 20]} />
          <meshStandardMaterial color="#EDE3E7" roughness={0.35} />
        </mesh>
        {/* Sakura twig */}
        <mesh position={[0.04, 0.48, 0]} rotation={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.012, 0.018, 0.4, 8]} />
          <meshStandardMaterial color="#4A3442" roughness={0.8} />
        </mesh>
        {/* Small sakura blossoms on twig */}
        <mesh position={[0.1, 0.65, 0.02]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#F6D9E6" emissive="#EAB7D0" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.05, 0.56, -0.04]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#FFF0F5" />
        </mesh>
      </group>

      {/* A single landed sakura petal resting near the notebook */}
      <mesh position={[0.3, 0.01, 0.65]} rotation={[-Math.PI / 2, 0, 0.4]}>
        <planeGeometry args={[0.08, 0.12]} />
        <meshStandardMaterial color="#F6D9E6" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
