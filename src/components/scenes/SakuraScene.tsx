"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown, Wind, Sparkles } from "lucide-react";
import { ThreeCanvas } from "../three/ThreeCanvas";
import { SakuraWorld } from "../three/SakuraWorld";
import { BIRTHDAY_CONFIG } from "@/config/birthday-config";
import { slideUpVariants } from "@/lib/animation-variants";

interface SakuraSceneProps {
  onNext: () => void;
}

export function SakuraScene({ onNext }: SakuraSceneProps) {
  const bgPhoto = BIRTHDAY_CONFIG.photos.scene2Background;
  const [imgError, setImgError] = useState(false);
  const [pathwayError, setPathwayError] = useState(false);

  // ── hover / focus / tap-to-reveal state ──────────────────────────────────
  const [textRevealed, setTextRevealed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Detect touch device (coarse pointer) for tap-hint
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Respect prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const td = reducedMotion ? "0ms" : "300ms";

  // Toggle on tap (touch devices only)
  const handlePanelClick = useCallback(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setTextRevealed((r) => !r);
    }
  }, []);

  const handleMouseEnter = () => setTextRevealed(true);
  const handleMouseLeave = () => setTextRevealed(false);
  const handleFocus = () => setTextRevealed(true);
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!panelRef.current?.contains(e.relatedTarget as Node)) {
      setTextRevealed(false);
    }
  };

  return (
    <section
      aria-label="Sakura dreamscape scene"
      className="relative w-full h-full min-h-screen flex flex-col justify-between overflow-x-hidden overflow-y-auto lg:overflow-hidden select-none"
    >
      {/*
        ──────────────────────────────────────────────────────────────────────
        LAYER 0 — SAKURA PATHWAY + FEATHERED BOUQUET PORTRAIT
        Two sub-layers stacked:
          0a (back)  — supplied sakura pathway, object-fit:cover.
          0b (front) — complete bouquet portrait, object-fit:contain, with
                       softly feathered edges and responsive placement.
        ──────────────────────────────────────────────────────────────────────
      */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#180E24]" aria-hidden="true">
        {/* ── 0a: Supplied pathway — covers the viewport without distortion ── */}
        <Image
          src={pathwayError ? bgPhoto.fallbackPlaceholder : "/images/sakura-pathway-background.png"}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            filter: "saturate(0.92) brightness(0.82)",
          }}
          className="object-[center_64%] lg:object-center"
          unoptimized
          onError={() => setPathwayError(true)}
        />

        {/* Subtle dusty-pink / lavender ambient color grade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(196,168,224,0.16) 0%, rgba(234,183,208,0.12) 48%, rgba(231,203,146,0.06) 100%)",
          }}
        />

        {/*
          ── Gradient overlays (all pointer-events-none) ──
          These sit above both image layers but below the foreground content.
          They provide:
          • Left band   — reading contrast for the text panel
          • Top fade    — scene badge readability
          • Bottom fade — navigation-button readability
        */}

        {/* Left reading-band — text column contrast only */}
        <div
          className="absolute inset-y-0 left-0 w-[45%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(20,12,32,0.72) 0%, rgba(20,12,32,0.28) 70%, transparent 100%)",
          }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-28 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(22,13,34,0.60) 0%, transparent 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(22,13,34,0.78) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Mobile keeps the figure smaller and grounded; desktop retains its existing frame. */}
      <div className="absolute inset-x-0 top-[38svh] z-[15] flex h-[36svh] items-end justify-center lg:inset-y-0 lg:top-20 lg:bottom-0 lg:left-1/2 lg:right-auto lg:z-0 lg:h-auto lg:w-[min(62vh,54vw)] lg:-translate-x-1/2">
        <Image
          src={imgError ? bgPhoto.fallbackPlaceholder : "/images/memories/photo-2-bouquet-cutout.png"}
          alt={bgPhoto.title || "Mansiii holding a vibrant bouquet of flowers"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 62vh"
          style={{
            objectFit: "contain",
            objectPosition: "center bottom",
            filter:
              "saturate(0.97) contrast(1.02) drop-shadow(0 18px 28px rgba(24,12,32,0.38)) drop-shadow(0 0 14px rgba(234,183,208,0.12))",
          }}
          className="lg:!object-center"
          unoptimized
          onError={() => setImgError(true)}
        />
      </div>

      {/*
        ──────────────────────────────────────────────────────────────────────
        LAYER 1 — Atmosphere (bokeh, haze) — restrained over the pathway
        ──────────────────────────────────────────────────────────────────────
      */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Restrained bokeh near edges only */}
        <div className="absolute top-[12%] left-[4%] w-7 h-7 rounded-full bg-[#FFF8F1]/12 blur-md animate-pulse" style={{ animationDuration: "4.5s" }} />
        <div className="absolute top-[58%] left-[2%] w-10 h-10 rounded-full bg-[#EAB7D0]/14 blur-lg animate-pulse" style={{ animationDuration: "5.5s" }} />
        <div className="absolute top-[74%] right-[4%] w-10 h-10 rounded-full bg-[#C4A8E0]/12 blur-md animate-pulse" style={{ animationDuration: "6.5s" }} />
        {/* Subtle haze band near bottom */}
        <div className="absolute inset-x-0 bottom-24 h-24 bg-gradient-to-t from-transparent via-[#C4A8E0]/5 to-transparent blur-md" />
      </div>

      {/*
        ──────────────────────────────────────────────────────────────────────
        LAYER 2 — 3D Sakura Petals canvas (pointer-events-none)
        ──────────────────────────────────────────────────────────────────────
      */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <ThreeCanvas cameraPosition={[0, 0, 5.0]} fov={46} fallbackVariant="sakura">
          <SakuraWorld interactive={true} />
        </ThreeCanvas>
      </div>

      {/*
        ──────────────────────────────────────────────────────────────────────
        LAYER 3 — Foreground editorial content (z-20)
        Scene badge, hover/tap-to-reveal text panel, next-scene buttons.
        Text sits on the left — well away from her face (right side of photo).
        ──────────────────────────────────────────────────────────────────────
      */}
      <div className="relative z-20 w-full flex-1 flex flex-col justify-between pt-[4.75rem] sm:pt-16 lg:pt-16 pb-28 lg:pb-6 px-3 sm:px-8 lg:px-14">

        {/* Scene badge — always legible */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E1D3F]/85 border border-[#EAB7D0]/35 backdrop-blur-md shadow-xl ring-1 ring-[#FFF8F1]/10"
        >
          <Wind className="w-3.5 h-3.5 text-[#EAB7D0]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#FFF8F1] font-semibold">
            02 • The Sakura Dreamscape
          </span>
        </motion.div>

        {/* Text panel — bottom-left area, away from her face */}
        <div className="flex-1 flex items-start sm:items-center pt-2 sm:pt-0 pb-4 sm:pb-0">
          {/*
            The panel uses inline style transitions for the glass backing.
            pointer-events are set so only the panel intercepts interaction —
            not the photo or navigation buttons.
          */}
          <div
            ref={panelRef}
            role="region"
            aria-label="Scene description. Hover or tap to fully reveal."
            tabIndex={0}
            className="w-full max-w-[min(20rem,calc(100vw-1.5rem))] sm:max-w-sm lg:max-w-md cursor-default outline-none focus-visible:ring-2 focus-visible:ring-[#EAB7D0]/60 rounded-2xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handlePanelClick}
          >
            {/* Glass backing — appears on reveal */}
            <div
              className="rounded-2xl p-3 sm:p-5 lg:p-6"
              style={{
                background: textRevealed
                  ? "rgba(38,22,54,0.65)"
                  : "rgba(38,22,54,0.12)",
                backdropFilter: textRevealed ? "blur(12px)" : "blur(0px)",
                WebkitBackdropFilter: textRevealed ? "blur(12px)" : "blur(0px)",
                border: textRevealed
                  ? "1px solid rgba(255,248,241,0.18)"
                  : "1px solid rgba(255,248,241,0.04)",
                boxShadow: textRevealed
                  ? "0 8px 32px rgba(15,8,25,0.50), 0 0 0 1px rgba(234,183,208,0.14)"
                  : "none",
                transition: reducedMotion
                  ? "none"
                  : `background ${td} ease, backdrop-filter ${td} ease, -webkit-backdrop-filter ${td} ease, border ${td} ease, box-shadow ${td} ease`,
              }}
            >
              {/* Headline */}
              <motion.h2
                initial="hidden"
                animate="visible"
                variants={slideUpVariants}
                className="text-2xl sm:text-4xl lg:text-5xl font-serif tracking-tight leading-[1.1] mb-1.5 sm:mb-3 drop-shadow"
                style={{
                  color: textRevealed ? "rgba(255,248,241,1.0)" : "rgba(255,248,241,0.80)",
                  textShadow: textRevealed
                    ? "0 2px 18px rgba(15,8,25,0.65)"
                    : "0 1px 8px rgba(15,8,25,0.45)",
                  transition: reducedMotion ? "none" : `color ${td} ease, text-shadow ${td} ease`,
                }}
              >
                Mansiii in{" "}
                <span
                  className="italic font-light"
                  style={{
                    background: "linear-gradient(to right, #FFF8F1, #F6D9E6, #EAB7D0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: textRevealed ? 1 : 0.80,
                    transition: reducedMotion ? "none" : `opacity ${td} ease`,
                  }}
                >
                  Full Bloom
                </span>
              </motion.h2>

              {/* Poetic divider */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideUpVariants}
                className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-xs tracking-widest uppercase font-medium mb-2 sm:mb-3"
                style={{
                  color: textRevealed ? "rgba(234,183,208,1.0)" : "rgba(234,183,208,0.65)",
                  transition: reducedMotion ? "none" : `color ${td} ease`,
                }}
              >
                <span className="w-6 h-px bg-[#EAB7D0]/50" />
                <span>Kyoto Twilight • 満開の光</span>
                <span className="w-6 h-px bg-[#EAB7D0]/50" />
              </motion.div>

              {/* Dedication text */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideUpVariants}
                style={{
                  opacity: textRevealed ? 1 : 0.68,
                  transition: reducedMotion ? "none" : `opacity ${td} ease`,
                }}
              >
                <p
                  className="text-xs sm:text-base font-serif italic leading-snug sm:leading-relaxed mb-1 sm:mb-1.5"
                  style={{
                    color: textRevealed ? "rgba(255,248,241,1.0)" : "rgba(255,248,241,0.78)",
                    transition: reducedMotion ? "none" : `color ${td} ease`,
                  }}
                >
                  &ldquo;Holding a radiant bouquet of crimson roses, smiling under the soft Kyoto twilight.&rdquo;
                </p>
                <p
                  className="text-[10px] sm:text-sm font-sans leading-snug sm:leading-relaxed"
                  style={{
                    color: textRevealed ? "rgba(246,217,230,0.95)" : "rgba(246,217,230,0.62)",
                    transition: reducedMotion ? "none" : `color ${td} ease`,
                  }}
                >
                  Framed by twilight whispers and drifting cherry blossoms, this moment captures the radiant grace and warmth of entering twenty.
                </p>
              </motion.div>

              {/* Touch tap-hint — visible on coarse-pointer devices when not revealed */}
              {isTouchDevice && !textRevealed && (
                <p
                  className="mt-3 text-[10px] tracking-wider uppercase font-medium animate-pulse"
                  style={{ color: "rgba(234,183,208,0.70)", animationDuration: "2.5s" }}
                  aria-label="Tap to reveal the dedication text"
                >
                  ✦ Tap to read
                </p>
              )}
            </div>

            {/* Desktop next-scene button */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUpVariants}
              className="mt-4 hidden lg:flex"
            >
              <button
                onClick={onNext}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3C2952]/90 to-[#2A1B3B]/90 hover:from-[#523770] hover:to-[#382450] border border-[#EAB7D0]/50 backdrop-blur-md text-[#FFF8F1] text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-[0_0_25px_rgba(234,183,208,0.35)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E7CB92] transition-transform duration-300 group-hover:rotate-12" />
                <span>Step into the study corner</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile next-scene button */}
        <div className="flex lg:hidden justify-center pt-4 pb-2">
          <button
            onClick={onNext}
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#3C2952]/90 to-[#2A1B3B]/90 hover:from-[#523770] hover:to-[#382450] border border-[#EAB7D0]/50 backdrop-blur-md text-[#FFF8F1] text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E7CB92]" />
            <span>Step into the study corner</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
