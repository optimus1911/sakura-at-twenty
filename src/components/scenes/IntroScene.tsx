"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { BIRTHDAY_CONFIG } from "@/config/birthday-config";
import { fadeInVariants, slideUpVariants } from "@/lib/animation-variants";
import { PhotoFrame } from "../ui/PhotoFrame";

interface IntroSceneProps {
  onEnter: () => void;
}

export function IntroScene({ onEnter }: IntroSceneProps) {
  const introPhoto = BIRTHDAY_CONFIG.photos.scene1Intro;

  return (
    <section aria-label="Introduction scene" className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#2B1B3A] via-[#352548] to-[#1C1226] px-6 py-20 text-center select-none">
      {/* Layered Parallax Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#EAB7D0]/20 via-[#DCD3F8]/20 to-transparent filter blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#8C78B8]/15 filter blur-3xl" />

        {/* Ambient floating petal dust */}
        <div className="absolute inset-0">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-3.5 rounded-full bg-[#F6D9E6]/60 backdrop-blur-sm"
              style={{
                top: `${(i * 19 + 7) % 90}%`,
                left: `${(i * 23 + 5) % 95}%`,
              }}
              animate={{
                y: [0, -45, 0],
                x: [0, (i % 2 === 0 ? 25 : -25), 0],
                rotate: [0, 60, 120],
                opacity: [0.3, 0.75, 0.3],
              }}
              transition={{
                duration: 6 + (i % 4) * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-8"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        {/* Milestone Badge */}
        <motion.div
          variants={slideUpVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF8F1]/10 border border-[#EAB7D0]/30 backdrop-blur-md mb-5 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E7CB92]" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FFF8F1]">
            Chapter Twenty • {BIRTHDAY_CONFIG.recipient.birthDateFormatted}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={slideUpVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[#FFF8F1] tracking-tight mb-2 drop-shadow-md"
        >
          Sakura at Twenty
        </motion.h1>

        {/* Japanese Accent & Dedication for Mansiii */}
        <motion.p
          variants={slideUpVariants}
          className="text-lg sm:text-2xl font-handwriting text-[#EAB7D0] mb-6 tracking-wide flex items-center justify-center gap-2"
        >
          <span>二十歳の桜</span>
          <span className="text-[#FFF8F1]/50">•</span>
          <span className="text-[#FFF8F1]">For {BIRTHDAY_CONFIG.recipient.name}</span>
          <Heart className="w-4 h-4 fill-[#EAB7D0] text-[#EAB7D0] inline-block" />
        </motion.p>

        {/* Scene 1 Hero Opening Reveal: Sunset Reflections in Lavender-Grey Saree */}
        <motion.div
          variants={slideUpVariants}
          className="mb-8 relative group"
        >
          <div className="relative w-56 sm:w-64 md:w-72 p-3 sm:p-3.5 pb-5 rounded-2xl sm:rounded-3xl bg-[#FFFDF9] shadow-[0_20px_50px_rgba(20,10,30,0.6),0_0_30px_rgba(234,183,208,0.25)] border border-[#EAB7D0]/40 transform -rotate-1 hover:rotate-0 hover:scale-[1.03] transition-all duration-300">
            {/* Elegant gold washi tape accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-gradient-to-r from-[#EAB7D0]/80 via-[#E7CB92]/80 to-[#EAB7D0]/80 rounded-sm shadow-sm backdrop-blur-sm transform rotate-1" />

            <PhotoFrame
              src={introPhoto.imageSrc}
              fallbackSrc={introPhoto.fallbackPlaceholder}
              alt={introPhoto.title}
              aspectRatio="portrait"
              objectPosition="50% 20%"
              className="rounded-xl sm:rounded-2xl shadow-inner border border-[#30263F]/10 overflow-hidden"
              priority={true}
            />

            <div className="mt-3 text-center">
              <p className="font-handwriting text-xl text-[#30263F] font-semibold leading-tight">
                Mansiii ✨
              </p>
              <p className="text-[11px] text-[#8C78B8] font-sans uppercase tracking-wider mt-0.5">
                Sunset Serenity • Turning 20
              </p>
            </div>
          </div>
        </motion.div>

        {/* Supportive Subtext */}
        <motion.p
          variants={slideUpVariants}
          className="text-sm sm:text-base text-[#FFF8F1]/85 max-w-lg mb-8 font-sans leading-relaxed"
        >
          Dedicated to a hardworking friend quietly reaching for her medical dreams.
          Step into a Kyoto dreamscape of pastel blossoms, twilight breezes, and cherished memories.
        </motion.p>

        {/* Action Button */}
        <motion.div variants={slideUpVariants}>
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#EAB7D0] to-[#E7CB92] text-[#30263F] font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-xl hover:shadow-[#EAB7D0]/30 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Enter your little world</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
