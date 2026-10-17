"use client";

import React, { useState, useEffect } from "react";
import { Compass, Check, X, MousePointer } from "lucide-react";
import { useDeviceMotion } from "@/lib/device-motion";

export function MotionPermissionBanner() {
  const { permissionState, requestPermission } = useDeviceMotion();
  const [dismissed, setDismissed] = useState(false);
  const [justActivated, setJustActivated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (dismissed || prefersReducedMotion) return null;

  const handleEnable = async () => {
    const success = await requestPermission();
    if (success) {
      setJustActivated(true);
      setTimeout(() => setDismissed(true), 4000);
    } else {
      setDismissed(true);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 select-none animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#20152C]/90 border border-[#EAB7D0]/35 backdrop-blur-xl shadow-2xl text-[#FFF8F1] text-xs">
        {justActivated ? (
          <span className="flex items-center gap-1.5 text-[#E7CB92] font-medium">
            <Check className="w-3.5 h-3.5" />
            Motion Sensor Active ✨
          </span>
        ) : permissionState === "prompt" ? (
          <>
            <Compass className="w-3.5 h-3.5 text-[#EAB7D0] animate-spin duration-[8000ms]" />
            <button
              onClick={handleEnable}
              className="font-medium text-[#FFF8F1] hover:text-[#EAB7D0] transition-colors underline underline-offset-2"
            >
              Enable Motion
            </button>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss motion banner"
              className="text-[#FFF8F1]/60 hover:text-[#FFF8F1] ml-1 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </>
        ) : permissionState === "granted" ? (
          <span className="flex items-center gap-1.5 text-[#EAB7D0]/90 text-[11px]">
            <Compass className="w-3 h-3 text-[#E7CB92]" />
            Tilt Parallax Active
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-[#FFF8F1]/75 text-[11px]">
            <MousePointer className="w-3 h-3 text-[#EAB7D0]" />
            Mouse Parallax Active
          </span>
        )}
      </div>
    </div>
  );
}
