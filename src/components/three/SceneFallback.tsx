"use client";

import React from "react";

interface SceneFallbackProps {
  variant: "sakura" | "study" | "cake";
}

export function SceneFallback({ variant }: SceneFallbackProps) {
  if (variant === "study") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#30263F] to-[#1E1729]">
        <div className="relative w-72 h-72 rounded-2xl bg-[#FFF8F1]/10 border border-[#EAB7D0]/30 backdrop-blur-md flex flex-col items-center justify-center p-6 shadow-2xl">
          <div className="text-4xl mb-3">☕ 👓 📖</div>
          <p className="text-xs uppercase tracking-widest text-[#EAB7D0] font-semibold mb-2">
            The Study Corner
          </p>
          <p className="text-sm text-[#FFF8F1]/80 italic font-serif">
            Warm coffee, signature glasses, and quiet dedication toward NEET.
          </p>
        </div>
      </div>
    );
  }

  if (variant === "cake") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#30263F] to-[#20182E]">
        <div className="relative w-72 h-72 rounded-2xl bg-[#FFF8F1]/10 border border-[#E7CB92]/40 backdrop-blur-md flex flex-col items-center justify-center p-6 shadow-2xl">
          <div className="text-5xl mb-3 animate-pulse">🎂 ✨</div>
          <p className="text-xs uppercase tracking-widest text-[#E7CB92] font-semibold mb-2">
            Milestone Twenty
          </p>
          <p className="text-sm text-[#FFF8F1]/90 font-serif">
            A glowing celebration for a very special friend.
          </p>
        </div>
      </div>
    );
  }

  // Default: Sakura Dreamscape fallback
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#30263F] via-[#46365B] to-[#1E1729] overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-[#EAB7D0] filter blur-3xl absolute -top-10 -right-10" />
        <div className="w-96 h-96 rounded-full bg-[#8C78B8] filter blur-3xl absolute -bottom-10 -left-10" />
      </div>
      <div className="relative z-10 w-72 h-72 rounded-2xl bg-[#FFF8F1]/10 border border-[#F6D9E6]/30 backdrop-blur-md flex flex-col items-center justify-center p-6 shadow-2xl">
        <div className="text-4xl mb-3">🌸 🌙</div>
        <p className="text-xs uppercase tracking-widest text-[#F6D9E6] font-semibold mb-2">
          Sakura Twilight
        </p>
        <p className="text-sm text-[#FFF8F1]/85 italic font-serif">
          Drifting petals under a soft Kyoto sky.
        </p>
      </div>
    </div>
  );
}
