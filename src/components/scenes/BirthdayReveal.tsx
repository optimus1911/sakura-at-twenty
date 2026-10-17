"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Sparkles, ChevronDown, Flame, RotateCcw, Volume2, VolumeX, Heart } from "lucide-react";
import { ThreeCanvas } from "../three/ThreeCanvas";
import { BirthdayCake3D } from "../three/BirthdayCake3D";
import { BIRTHDAY_CONFIG } from "@/config/birthday-config";
import { slideUpVariants } from "@/lib/animation-variants";
import { playWishChime } from "@/lib/wish-chime";
import { PhotoFrame } from "../ui/PhotoFrame";

interface BirthdayRevealProps {
  onNext: () => void;
}

export function BirthdayReveal({ onNext }: BirthdayRevealProps) {
  const [wishState, setWishState] = useState<"idle" | "wishing" | "revealed">("idle");
  const [isChimeMuted, setIsChimeMuted] = useState(false);
  const isTransitioningRef = useRef(false);

  const keepsakePhoto = BIRTHDAY_CONFIG.photos.scene6RevealKeepsake;

  const triggerSakuraSparkleBurst = () => {
    // 1. Core golden shimmer & sakura burst around cake
    confetti({
      particleCount: 65,
      spread: 90,
      origin: { x: 0.5, y: 0.52 },
      colors: ["#F6D9E6", "#EAB7D0", "#FFD1DC", "#FFE4B5", "#FFFDF7"],
      shapes: ["circle"],
      scalar: 1.2,
      ticks: 240,
      gravity: 0.7,
      disableForReducedMotion: true,
    });

    // 2. High sparkle glitter
    setTimeout(() => {
      confetti({
        particleCount: 45,
        spread: 120,
        origin: { x: 0.5, y: 0.48 },
        colors: ["#E7CB92", "#FFF8F1", "#F8B7D8"],
        shapes: ["circle"],
        scalar: 0.85,
        ticks: 200,
        gravity: 0.85,
        disableForReducedMotion: true,
      });
    }, 280);
  };

  const handleMakeWish = () => {
    if (isTransitioningRef.current || wishState === "wishing") return;
    isTransitioningRef.current = true;

    // Trigger original Web Audio API chime on direct user interaction
    try {
      playWishChime(isChimeMuted);
    } catch {
      // Audio playback failsafe: visual choreography proceeds unimpeded
    }

    setWishState("wishing");
    triggerSakuraSparkleBurst();

    // Sequence: 1.6s of magical wishing focus, then reveal
    setTimeout(() => {
      setWishState("revealed");
      isTransitioningRef.current = false;
    }, 1800);
  };

  const handleReplayWish = () => {
    if (isTransitioningRef.current) return;
    setWishState("idle");
  };

  return (
    <section
      aria-label="Birthday reveal scene"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#1C1226] via-[#2A1B38] to-[#160D20] text-[#FFF8F1] select-none"
    >
      {/* ─── Layer 0: Ambient Lighting Softening & Golden Aura on Wish ─── */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ease-out ${
          wishState === "wishing" ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Softening dark backdrop */}
        <div className="absolute inset-0 bg-[#0E0614]/40 backdrop-blur-[2px]" />
        {/* Golden warm aura radiating from cake center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#E7CB92]/30 via-[#EAB7D0]/25 to-transparent blur-3xl animate-pulse duration-[2500ms]" />
      </div>

      {/* ─── Layer 1: 3D Cake Canvas with Camera Push-in ─── */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          scale: wishState === "wishing" ? 1.07 : 1,
        }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      >
        <ThreeCanvas cameraPosition={[0, 0.35, 3.8]} fov={45} fallbackVariant="cake">
          <BirthdayCake3D candleLit={true} />
        </ThreeCanvas>
      </motion.div>

      {/* ─── Top Header ─── */}
      <div className="relative z-10 pt-20 px-6 max-w-xl mx-auto text-center pointer-events-none">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F1]/10 border border-[#E7CB92]/40 backdrop-blur-md mb-2 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E7CB92]" />
          <span className="text-xs uppercase tracking-widest text-[#FFF8F1] font-semibold">
            06 • The Birthday Reveal
          </span>
        </motion.div>

        <motion.h2
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          className="text-3xl sm:text-5xl font-serif text-[#FFF8F1] mb-2 tracking-tight drop-shadow-md"
        >
          {BIRTHDAY_CONFIG.reveal.headline}
        </motion.h2>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          className="text-xs sm:text-sm text-[#F6D9E6]/90 font-sans max-w-md mx-auto"
        >
          {BIRTHDAY_CONFIG.reveal.subheadline}
        </motion.p>
      </div>

      {/* ─── Center / Bottom: Interactive Wish Choreography ─── */}
      <div className="relative z-10 pb-16 px-6 max-w-lg mx-auto w-full text-center">
        <AnimatePresence mode="wait">
          {wishState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <button
                onClick={handleMakeWish}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E7CB92] via-[#EAB7D0] to-[#E7CB92] text-[#281533] font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_10px_35px_rgba(231,203,146,0.35)] hover:scale-105 active:scale-95"
              >
                <Flame className="w-4 h-4 text-[#A83D5F] fill-current animate-bounce" />
                <span>Make a little wish</span>
                <Sparkles className="w-4 h-4 text-[#A83D5F]" />
              </button>

              <div className="flex items-center gap-3 mt-1">
                <p className="text-xs text-[#FFF8F1]/75 font-sans italic">
                  {BIRTHDAY_CONFIG.reveal.wishPrompt}
                </p>
                {/* Chime sound mute toggle */}
                <button
                  onClick={() => setIsChimeMuted(!isChimeMuted)}
                  title={isChimeMuted ? "Unmute chime" : "Mute chime"}
                  aria-label={isChimeMuted ? "Unmute chime" : "Mute chime"}
                  className="text-[#EAB7D0]/70 hover:text-[#FFF8F1] transition-colors p-1"
                >
                  {isChimeMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </motion.div>
          )}

          {wishState === "wishing" && (
            <motion.div
              key="wishing"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="py-4"
            >
              <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#FFF8F1]/20 border border-[#E7CB92] backdrop-blur-xl shadow-[0_0_35px_rgba(231,203,146,0.5)]">
                <Sparkles className="w-4 h-4 text-[#E7CB92] animate-spin duration-[4000ms]" />
                <span className="font-serif italic text-lg sm:text-xl text-[#FFF8F1] tracking-wide">
                  Make a wish, Mansiii ✨
                </span>
                <Sparkles className="w-4 h-4 text-[#E7CB92] animate-spin duration-[4000ms]" />
              </div>
            </motion.div>
          )}

          {wishState === "revealed" && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col items-center"
            >
              {/* Confirmed Blessing & Keepsake Photo Card */}
              <div className="w-full p-5 sm:p-6 rounded-3xl bg-[#281838]/85 border border-[#E7CB92]/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,8,25,0.7),0_0_35px_rgba(231,203,146,0.2)]">
                <p className="text-base sm:text-lg font-serif text-[#FFF8F1] mb-2 leading-relaxed">
                  {BIRTHDAY_CONFIG.reveal.wishConfirmedMessage}
                </p>
                <p className="text-xs sm:text-sm text-[#F6D9E6]/90 font-sans leading-relaxed mb-4">
                  May all your quiet sacrifices, early morning study hours, and heartfelt prayers blossom into golden milestones.
                </p>

                {/* Keepsake Photo: Photo 1 - Playful Moments with Heart Stickers */}
                <div className="flex items-center justify-center gap-4 py-2 border-t border-[#FFF8F1]/15 mt-3 pt-4">
                  <div className="relative w-16 sm:w-20 aspect-square rounded-xl overflow-hidden border border-[#FFF8F1]/40 shadow-md">
                    <PhotoFrame
                      src={keepsakePhoto.imageSrc}
                      fallbackSrc={keepsakePhoto.fallbackPlaceholder}
                      alt={keepsakePhoto.title}
                      aspectRatio="square"
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase tracking-wider text-[#E7CB92] font-semibold flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-[#EAB7D0] text-[#EAB7D0]" />
                      Keepsake Moment
                    </span>
                    <h4 className="font-serif text-sm text-[#FFF8F1] leading-tight">
                      {keepsakePhoto.title}
                    </h4>
                    <p className="text-[10px] text-[#DCD3F8]/80 font-sans">
                      {keepsakePhoto.date}
                    </p>
                  </div>
                </div>

                {/* Replay Wish Button */}
                <div className="mt-4 pt-3 border-t border-[#FFF8F1]/10 flex justify-center">
                  <button
                    onClick={handleReplayWish}
                    className="inline-flex items-center gap-2 text-xs text-[#EAB7D0] hover:text-[#FFF8F1] transition-colors py-1 px-3 rounded-full hover:bg-[#FFF8F1]/10"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Make another wish 🕯️</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Button to Scene 7 */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onNext}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFF8F1]/10 hover:bg-[#FFF8F1]/20 border border-[#EAB7D0]/30 backdrop-blur-md text-[#FFF8F1] text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            <span>The Final Goodnight</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
