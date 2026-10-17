"use client";

import React, { useEffect, useState } from "react";
import { useDeviceMotion } from "@/lib/device-motion";

interface SakuraBackgroundProps {
  className?: string;
}

export function SakuraBackground({ className = "" }: SakuraBackgroundProps) {
  const { tiltX, tiltY } = useDeviceMotion();
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

  // Parallax offsets (restrained, background only; zero if reduced motion)
  const activeTiltX = prefersReducedMotion ? 0 : tiltX;
  const activeTiltY = prefersReducedMotion ? 0 : tiltY;

  const skyTranslate = `translate3d(${activeTiltX * -6}px, ${activeTiltY * -4}px, 0)`;
  const bokehTranslate = `translate3d(${activeTiltX * 12}px, ${activeTiltY * 8}px, 0)`;
  const silhouetteTranslate = `translate3d(${activeTiltX * -14}px, ${activeTiltY * -5}px, 0)`;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* ─── Layer 1: Smooth Dusty-Pink, Lavender & Warm-Ivory Twilight Gradient ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#180E24] via-[#261738] to-[#160D22]" />

      {/* Atmospheric Radial Gradient Meshes */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: skyTranslate,
          background: `
            radial-gradient(ellipse 70% 55% at 78% 18%, rgba(255, 248, 241, 0.28) 0%, rgba(234, 183, 208, 0.22) 28%, rgba(196, 168, 224, 0.14) 55%, transparent 72%),
            radial-gradient(ellipse 65% 50% at 20% 75%, rgba(196, 168, 224, 0.16) 0%, rgba(234, 183, 208, 0.12) 35%, transparent 65%),
            radial-gradient(circle at 50% 100%, rgba(234, 183, 208, 0.15) 0%, rgba(38, 23, 56, 0.4) 60%, transparent 85%)
          `,
        }}
      />

      {/* ─── Layer 2: Soft Luminous Moon ─── */}
      <div
        className="absolute top-4 sm:top-10 lg:top-14 right-3 sm:right-14 lg:right-28 w-24 sm:w-36 lg:w-44 h-24 sm:h-36 lg:h-44 transition-transform duration-300 ease-out"
        style={{ transform: skyTranslate }}
      >
        {/* Outermost soft blush halo */}
        <div className="absolute inset-0 rounded-full bg-[#EAB7D0]/15 blur-xl sm:blur-2xl transform scale-125 sm:scale-150 animate-pulse duration-[6000ms]" />
        {/* Lavender-ivory middle halo */}
        <div className="absolute inset-2 sm:inset-4 rounded-full bg-gradient-to-tr from-[#C4A8E0]/25 to-[#FFF8F1]/30 blur-md sm:blur-xl" />
        {/* Inner moon disc */}
        <div className="absolute inset-5 sm:inset-8 lg:inset-10 rounded-full bg-gradient-to-br from-[#FFFDF7] via-[#FFF3EB] to-[#FCE4EC] shadow-[0_0_25px_rgba(255,248,241,0.65),0_0_50px_rgba(234,183,208,0.35)]" />
      </div>

      {/* ─── Layer 3: Subtle Bokeh Lights ─── */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: bokehTranslate }}
      >
        {/* Floating bokeh orb 1 - warm ivory */}
        <div className="absolute top-[22%] left-[14%] w-10 h-10 rounded-full bg-[#FFF8F1]/20 blur-md animate-pulse duration-[4500ms]" />
        {/* Floating bokeh orb 2 - blush pink */}
        <div className="absolute top-[38%] left-[28%] w-14 h-14 rounded-full bg-[#EAB7D0]/22 blur-lg animate-pulse duration-[5500ms]" />
        {/* Floating bokeh orb 3 - lavender */}
        <div className="absolute top-[18%] right-[32%] w-12 h-12 rounded-full bg-[#C4A8E0]/18 blur-md animate-pulse duration-[6500ms]" />
        {/* Floating bokeh orb 4 - warm champagne */}
        <div className="absolute top-[52%] right-[16%] w-16 h-16 rounded-full bg-[#E7CB92]/18 blur-lg animate-pulse duration-[5000ms]" />
        {/* Floating bokeh orb 5 - subtle pink accent */}
        <div className="absolute bottom-[28%] left-[8%] w-8 h-8 rounded-full bg-[#F6D9E6]/25 blur-sm animate-pulse duration-[4000ms]" />
        {/* Floating bokeh orb 6 - distant dusk light */}
        <div className="absolute top-[65%] left-[42%] w-12 h-12 rounded-full bg-[#EAB7D0]/16 blur-md animate-pulse duration-[5800ms]" />
      </div>

      {/* ─── Layer 4: Restrained Atmospheric Haze / Mist Bands ─── */}
      <div className="absolute inset-x-0 bottom-24 sm:bottom-32 h-40 bg-gradient-to-t from-transparent via-[#C4A8E0]/8 to-transparent blur-md pointer-events-none" />
      <div className="absolute inset-x-0 bottom-12 sm:bottom-16 h-28 bg-gradient-to-t from-[#160D22]/60 via-[#EAB7D0]/10 to-transparent blur-sm pointer-events-none" />

      {/* ─── Layer 5: Very Distant Japanese Garden Silhouettes (SVG) ─── */}
      {/* Subtle, delicate mountain ridges, distant pagoda spire, torii gate, and soft pine silhouettes */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 sm:h-56 transition-transform duration-300 ease-out overflow-hidden"
        style={{ transform: silhouetteTranslate }}
      >
        <svg
          viewBox="0 0 1440 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full opacity-65"
        >
          <defs>
            <linearGradient id="ridgeGradientFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#352445" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#1C1126" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="ridgeGradientNear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2A1B38" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#150B1F" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="pagodaGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#432F55" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#22152E" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Far Distant Mountain Ridges */}
          <path
            d="M0 160 C 180 125, 340 145, 520 115 C 700 85, 880 130, 1060 100 C 1240 70, 1360 110, 1440 90 L 1440 280 L 0 280 Z"
            fill="url(#ridgeGradientFar)"
          />

          {/* Distant Yasaka / Toji Pagoda Silhouette (Left of center, delicate spire) */}
          <g transform="translate(320, 78) scale(0.68)" fill="url(#pagodaGlow)">
            {/* Spire (sorin) */}
            <rect x="29" y="0" width="2" height="32" />
            <circle cx="30" cy="4" r="3" />
            <circle cx="30" cy="11" r="4" />
            <circle cx="30" cy="18" r="4" />
            <circle cx="30" cy="25" r="4" />
            {/* Tier 5 roof */}
            <path d="M12 38 Q 30 33 48 38 L 43 46 Q 30 42 17 46 Z" />
            <rect x="23" y="44" width="14" height="6" />
            {/* Tier 4 roof */}
            <path d="M8 50 Q 30 45 52 50 L 47 59 Q 30 55 13 59 Z" />
            <rect x="21" y="57" width="18" height="7" />
            {/* Tier 3 roof */}
            <path d="M4 64 Q 30 58 56 64 L 51 74 Q 30 69 9 74 Z" />
            <rect x="19" y="72" width="22" height="8" />
            {/* Tier 2 roof */}
            <path d="M0 79 Q 30 72 60 79 L 55 90 Q 30 84 5 90 Z" />
            <rect x="17" y="88" width="26" height="9" />
            {/* Tier 1 base & roof */}
            <path d="M-4 96 Q 30 88 64 96 L 59 108 Q 30 102 1 108 Z" />
            <rect x="15" y="106" width="30" height="18" />
          </g>

          {/* Distant Torii Gate Silhouette (Right side) */}
          <g transform="translate(1080, 115) scale(0.55)" fill="url(#pagodaGlow)">
            {/* Top Kasagi bar */}
            <path d="M-8 4 Q 30 -2 68 4 L 66 10 Q 30 6 -6 10 Z" />
            {/* Second Shimaki/Nuki bar */}
            <rect x="2" y="15" width="56" height="4" />
            {/* Central Gakuzuka plaque */}
            <rect x="28" y="10" width="4" height="8" />
            {/* Pillars */}
            <rect x="8" y="10" width="5" height="52" />
            <rect x="47" y="10" width="5" height="52" />
            {/* Base stones */}
            <rect x="6" y="60" width="9" height="4" />
            <rect x="45" y="60" width="9" height="4" />
          </g>

          {/* Distant Japanese Pine & Garden Silhouette Layer (Foreground ridge) */}
          <path
            d="M0 200 
               C 120 185, 200 195, 300 180 
               C 420 162, 530 185, 680 172 
               C 810 160, 940 188, 1080 174 
               C 1220 160, 1340 178, 1440 165 
               L 1440 280 L 0 280 Z"
            fill="url(#ridgeGradientNear)"
          />

          {/* Distant Pine Tree Silhouette (Left side) */}
          <g transform="translate(120, 142) scale(0.5)" fill="#231430" opacity="0.8">
            <path d="M28 70 Q 30 35 34 0 Q 38 35 40 70 Z" />
            {/* Needle clouds */}
            <ellipse cx="20" cy="22" rx="18" ry="7" />
            <ellipse cx="44" cy="18" rx="20" ry="8" />
            <ellipse cx="14" cy="38" rx="22" ry="8" />
            <ellipse cx="50" cy="34" rx="24" ry="9" />
            <ellipse cx="32" cy="8" rx="14" ry="6" />
          </g>

          {/* Distant Pine Tree Silhouette (Right edge) */}
          <g transform="translate(1320, 130) scale(0.52)" fill="#231430" opacity="0.8">
            <path d="M28 75 Q 31 38 34 0 Q 37 38 40 75 Z" />
            <ellipse cx="22" cy="18" rx="19" ry="7" />
            <ellipse cx="46" cy="24" rx="21" ry="8" />
            <ellipse cx="16" cy="40" rx="24" ry="9" />
            <ellipse cx="52" cy="42" rx="22" ry="8" />
            <ellipse cx="34" cy="6" rx="15" ry="6" />
          </g>
        </svg>
      </div>

      {/* ─── Bottom Floor Blend (seamless darkness at feet) ─── */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#160D22] to-transparent pointer-events-none" />
    </div>
  );
}
