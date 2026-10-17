"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export type MotionPermissionState = "unsupported" | "prompt" | "granted" | "denied";

export interface MotionData {
  tiltX: number; // Normalized -1 to 1
  tiltY: number; // Normalized -1 to 1
  intensity: number; // Normalized 0 to 1 based on acceleration/movement
  permissionState: MotionPermissionState;
  requestPermission: () => Promise<boolean>;
}

// Global shared state for 3D useFrame and DOM access
export const motionState = {
  tiltX: 0,
  tiltY: 0,
  targetTiltX: 0,
  targetTiltY: 0,
  intensity: 0,
  targetIntensity: 0,
  lastBeta: 0,
  lastGamma: 0,
  permissionState: "prompt" as MotionPermissionState,
};

function getInitialPermissionState(): MotionPermissionState {
  if (typeof window === "undefined") return "prompt";
  const hasOrientation = "DeviceOrientationEvent" in window;
  const reqPerm = (window as unknown as { DeviceOrientationEvent?: { requestPermission?: () => Promise<string> } })
    ?.DeviceOrientationEvent?.requestPermission;

  if (!hasOrientation) return "unsupported";
  if (typeof reqPerm === "function") return "prompt";
  return "granted";
}

export function useDeviceMotion(): MotionData {
  const [permissionState, setPermissionState] = useState<MotionPermissionState>(getInitialPermissionState);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [intensity, setIntensity] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    const gamma = e.gamma ?? 0;
    const beta = e.beta ?? 0;

    const normX = Math.max(-1, Math.min(1, gamma / 35));
    const normY = Math.max(-1, Math.min(1, (beta - 35) / 35));

    const deltaG = Math.abs(gamma - motionState.lastGamma);
    const deltaB = Math.abs(beta - motionState.lastBeta);
    const moveRate = Math.min(1, (deltaG + deltaB) / 25);

    motionState.lastGamma = gamma;
    motionState.lastBeta = beta;

    motionState.targetTiltX = normX;
    motionState.targetTiltY = normY;
    if (moveRate > 0.15) {
      motionState.targetIntensity = Math.min(1, motionState.targetIntensity + moveRate * 0.5);
    }
  }, []);

  const attachOrientationListener = useCallback(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    }
  }, [handleOrientation]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    motionState.permissionState = permissionState;

    if (permissionState === "granted") {
      attachOrientationListener();
    }

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;

      const deltaX = Math.abs(normX - motionState.targetTiltX);
      const deltaY = Math.abs(normY - motionState.targetTiltY);
      const mouseSpeed = Math.min(1, (deltaX + deltaY) * 3);

      motionState.targetTiltX = Math.max(-1, Math.min(1, normX));
      motionState.targetTiltY = Math.max(-1, Math.min(1, normY));
      motionState.targetIntensity = Math.min(1, motionState.targetIntensity + mouseSpeed * 0.4);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const smoothLoop = () => {
      motionState.tiltX += (motionState.targetTiltX - motionState.tiltX) * 0.08;
      motionState.tiltY += (motionState.targetTiltY - motionState.tiltY) * 0.08;

      motionState.targetIntensity *= 0.94;
      motionState.intensity += (motionState.targetIntensity - motionState.intensity) * 0.1;

      setTilt({ x: motionState.tiltX, y: motionState.tiltY });
      setIntensity(motionState.intensity);

      animFrameRef.current = requestAnimationFrame(smoothLoop);
    };
    animFrameRef.current = requestAnimationFrame(smoothLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleOrientation);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [permissionState, attachOrientationListener, handleOrientation]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    const DeviceOrientation = (window as unknown as {
      DeviceOrientationEvent?: { requestPermission?: () => Promise<string> };
    })?.DeviceOrientationEvent;

    if (typeof DeviceOrientation?.requestPermission === "function") {
      try {
        const response = await DeviceOrientation.requestPermission();
        if (response === "granted") {
          setPermissionState("granted");
          motionState.permissionState = "granted";
          attachOrientationListener();
          return true;
        } else {
          setPermissionState("denied");
          motionState.permissionState = "denied";
          return false;
        }
      } catch {
        setPermissionState("denied");
        motionState.permissionState = "denied";
        return false;
      }
    } else {
      setPermissionState("granted");
      motionState.permissionState = "granted";
      attachOrientationListener();
      return true;
    }
  }, [attachOrientationListener]);

  return {
    tiltX: tilt.x,
    tiltY: tilt.y,
    intensity,
    permissionState,
    requestPermission,
  };
}
