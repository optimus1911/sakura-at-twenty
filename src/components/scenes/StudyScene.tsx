"use client";

import React from "react";
import { motion } from "motion/react";
import { ChevronDown, BookOpen, Coffee, Sparkles } from "lucide-react";
import { ThreeCanvas } from "../three/ThreeCanvas";
import { StudyDesk3D } from "../three/StudyDesk3D";
import { BIRTHDAY_CONFIG } from "@/config/birthday-config";
import { slideUpVariants } from "@/lib/animation-variants";
import { PhotoFrame } from "../ui/PhotoFrame";

interface StudySceneProps {
  onNext: () => void;
}

export function StudyScene({ onNext }: StudySceneProps) {
  const studyPhoto = BIRTHDAY_CONFIG.photos.scene3Study;

  return (
    <section aria-label="Study universe scene" className="relative w-full h-full min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#251C33] via-[#30263F] to-[#20182E] text-[#FFF8F1]">
      {/* 3D Study Desk Canvas */}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas cameraPosition={[0, 1.2, 3.6]} fov={45} fallbackVariant="study">
          <StudyDesk3D />
        </ThreeCanvas>
      </div>

      {/* Top Header */}
      <div className="relative z-10 pt-20 px-6 max-w-xl mx-auto text-center pointer-events-none">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F1]/15 border border-[#EAB7D0]/30 backdrop-blur-md mb-2 shadow-lg"
        >
          <Coffee className="w-3.5 h-3.5 text-[#E7CB92]" />
          <span className="text-xs uppercase tracking-widest text-[#FFF8F1] font-semibold">
            03 • Her Study Universe
          </span>
        </motion.div>

        <motion.h2
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          className="text-2xl sm:text-4xl font-serif text-[#FFF8F1] mb-1"
        >
          Dedicated Hours &amp; Quiet Dreams
        </motion.h2>
      </div>

      {/* Floating Photographic Memory: Rooftop in White Outfit with Glasses on Head */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 my-auto pt-4">
        {/* Floating Photo Card */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -3 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.04, rotate: 0 }}
          className="relative w-48 sm:w-56 p-3 pb-5 rounded-2xl bg-[#FFFDF9] shadow-2xl border border-[#EAB7D0]/40 transform -rotate-2"
        >
          {/* Washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#EAB7D0]/70 rounded-sm shadow-inner backdrop-blur-sm transform rotate-1" />

          <PhotoFrame
            src={studyPhoto.imageSrc}
            fallbackSrc={studyPhoto.fallbackPlaceholder}
            alt={studyPhoto.title}
            aspectRatio="portrait"
            className="rounded-xl shadow-inner border border-[#30263F]/10"
          />

          <div className="mt-2.5 text-center">
            <p className="font-handwriting text-lg text-[#30263F] font-semibold leading-tight">
              {studyPhoto.title}
            </p>
            <p className="text-[10px] text-[#8C78B8] font-sans uppercase tracking-wider">
              {studyPhoto.date}
            </p>
          </div>
        </motion.div>

        {/* Parchment Encouragement Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="parchment-card rounded-2xl p-5 sm:p-7 text-[#30263F] relative overflow-hidden max-w-lg shadow-2xl"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#B96D86] mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Dedicated to Mansiii&apos;s Journey</span>
          </div>

          <p className="font-serif text-base sm:text-lg italic leading-relaxed text-[#30263F] mb-4">
            &ldquo;{BIRTHDAY_CONFIG.studyDesk.quote}&rdquo;
          </p>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4">
            {BIRTHDAY_CONFIG.studyDesk.subjectPills.map((subj, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#30263F]/10 text-[#30263F] border border-[#B96D86]/20"
              >
                <Sparkles className="w-2.5 h-2.5 text-[#B96D86]" />
                {subj}
              </span>
            ))}
          </div>

          <div className="bg-[#FFF4DE] border-l-4 border-[#E7CB92] p-3 rounded-r-lg text-xs font-handwriting text-base text-[#614922] shadow-sm">
            📌 {BIRTHDAY_CONFIG.studyDesk.stickyNoteText}
          </div>
        </motion.div>
      </div>

      {/* Navigation Footer */}
      <div className="relative z-10 pb-12 flex justify-center">
        <button
          onClick={onNext}
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFF8F1]/15 hover:bg-[#FFF8F1]/25 border border-[#EAB7D0]/40 backdrop-blur-md text-[#FFF8F1] text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
        >
          <span>Turn the page to memories</span>
          <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
}
