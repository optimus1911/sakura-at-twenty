"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { SceneFallback } from "./SceneFallback";

interface ThreeCanvasProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
  fallbackVariant?: "sakura" | "study" | "cake";
}

export function ThreeCanvas({
  children,
  cameraPosition = [0, 1.5, 5],
  fov = 50,
  className = "w-full h-full",
  fallbackVariant = "sakura",
}: ThreeCanvasProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        setHasWebGL(Boolean(gl));
      } catch {
        setHasWebGL(false);
      }
    };
    const animId = requestAnimationFrame(checkWebGL);
    return () => cancelAnimationFrame(animId);
  }, []);

  if (hasWebGL === false || hasError) {
    return <SceneFallback variant={fallbackVariant} />;
  }

  if (hasWebGL === null) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#30263F]/50">
        <div className="w-8 h-8 rounded-full border-2 border-[#EAB7D0] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov }}
        dpr={[1, typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={() => setHasError(true)}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
