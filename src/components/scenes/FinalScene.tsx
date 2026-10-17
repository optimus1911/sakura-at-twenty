"use client";

import React from "react";
import { motion } from "motion/react";
import { Moon, RotateCcw } from "lucide-react";
import { BIRTHDAY_CONFIG } from "@/config/birthday-config";
import { slideUpVariants } from "@/lib/animation-variants";

interface FinalSceneProps {
  onReplay: () => void;
}

export function FinalScene({ onReplay }: FinalSceneProps) {
  return (
    <section aria-label="Closing scene" className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[#1E1729] via-[#2A1F3B] to-[#160F1E] px-6 text-center select-none text-[#FFF8F1]">
      {/* Background Moon & Ambient Radiance */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Glowing Moon in Lavender Sky */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#FFF8F1]/90 shadow-[0_0_80px_rgba(234,183,208,0.4)]" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#DCD3F8]/20 filter blur-2xl" />

        {/* Ambient Petal Flurries */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-3 rounded-full bg-[#F6D9E6]/40"
            style={{
              top: `${(i * 23 + 12) % 85}%`,
              left: `${(i * 17 + 8) % 92}%`,
            }}
            animate={{
              y: [0, 60, 120],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
              rotate: [0, 90, 180],
              opacity: [0.2, 0.6, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Closing Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
        className="relative z-10 max-w-xl mx-auto flex flex-col items-center mt-36"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F1]/10 border border-[#EAB7D0]/30 backdrop-blur-md mb-6">
          <Moon className="w-3.5 h-3.5 text-[#EAB7D0]" />
          <span className="text-xs uppercase tracking-widest text-[#FFF8F1] font-semibold">
            07 • The Final Goodnight
          </span>
        </div>

        {/* Closing Handwritten Quote */}
        <h2 className="text-3xl sm:text-5xl font-serif text-[#FFF8F1] leading-tight mb-4">
          &ldquo;{BIRTHDAY_CONFIG.goodnight.closingQuote}&rdquo;
        </h2>

        <p className="text-base sm:text-lg font-handwriting text-[#EAB7D0] mb-3">
          {BIRTHDAY_CONFIG.goodnight.farewellMessage}
        </p>

        <p className="text-xs sm:text-sm text-[#FFF8F1]/70 max-w-md mx-auto mb-10 leading-relaxed font-sans">
          Happy 20th Birthday, {BIRTHDAY_CONFIG.recipient.name}. May the road ahead be gentle, your courage steadfast, and your smile radiant.
        </p>

        {/* Replay Button */}
        <button
          onClick={onReplay}
          className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#FFF8F1]/15 hover:bg-[#FFF8F1]/25 border border-[#EAB7D0]/40 backdrop-blur-md text-[#FFF8F1] text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
        >
          <RotateCcw className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-180" />
          <span>Replay the Dreamscape</span>
        </button>
      </motion.div>
    </section>
  );
}
