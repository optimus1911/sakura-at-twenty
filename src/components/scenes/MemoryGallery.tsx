"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, X, ChevronDown, Calendar, Sparkles } from "lucide-react";
import { BIRTHDAY_CONFIG, MemoryPhoto } from "@/config/birthday-config";
import { slideUpVariants, scaleUpVariants } from "@/lib/animation-variants";
import { PhotoFrame } from "../ui/PhotoFrame";

interface MemoryGalleryProps {
  onNext: () => void;
}

export function MemoryGallery({ onNext }: MemoryGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const featuredPhoto = BIRTHDAY_CONFIG.photos.scene4Cinematic;

  // Keyboard navigation & dismissal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section aria-label="Memory gallery scene" className="relative w-full min-h-screen py-16 sm:py-20 px-4 sm:px-6 flex flex-col justify-between bg-gradient-to-b from-[#20182E] via-[#30263F] to-[#251C33] text-[#FFF8F1]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-[#EAB7D0] filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#8C78B8] filter blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-2xl mx-auto text-center mb-6 sm:mb-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F1]/10 border border-[#EAB7D0]/30 backdrop-blur-md mb-3"
        >
          <Camera className="w-3.5 h-3.5 text-[#EAB7D0]" />
          <span className="text-xs uppercase tracking-widest text-[#FFF8F1] font-semibold">
            04 • Little Moments, Big Memories
          </span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpVariants}
          className="text-3xl sm:text-5xl font-serif text-[#FFF8F1] mb-2"
        >
          Snapshots of Mansiii
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpVariants}
          className="text-sm sm:text-base text-[#F6D9E6]/80 font-sans max-w-md mx-auto"
        >
          A celebration of grace, quiet laughter, and memories held dear. Click any photograph to view in high resolution.
        </motion.p>
      </div>

      {/* Hero Featured Cinematic Card + Gallery Row */}
      <div className="relative z-10 max-w-5xl mx-auto w-full mb-14">
        {/* Large Cinematic Hero: Portrait in Black & Glasses */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => setSelectedPhoto(featuredPhoto)}
          className="cursor-pointer group relative max-w-sm mx-auto rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EC] to-[#F5E6DC] shadow-2xl border-2 border-[#EAB7D0]/50 mb-8 sm:mb-10 hover:scale-[1.02] transition-all duration-300"
        >
          {/* Subtle gold ribbon tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#30263F] text-[#FFF8F1] text-[11px] font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 text-[#E7CB92]" />
            <span>Featured Cinematic Portrait</span>
          </div>

          <PhotoFrame
            src={featuredPhoto.imageSrc}
            fallbackSrc={featuredPhoto.fallbackPlaceholder}
            alt={featuredPhoto.title}
            aspectRatio="portrait"
            className="mx-auto w-full max-w-[220px] rounded-2xl shadow-xl border border-[#30263F]/10"
            priority={true}
          />

          <div className="pt-4 text-center">
            <div className="text-xs font-sans text-[#8C78B8] uppercase tracking-wider font-semibold mb-1 flex items-center justify-center gap-1">
              <Calendar className="w-3 h-3" />
              {featuredPhoto.date}
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#30263F] group-hover:text-[#B96D86] transition-colors">
              {featuredPhoto.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#6A5478] font-sans mt-1">
              {featuredPhoto.caption}
            </p>
          </div>
        </motion.div>

        {/* Varied Gallery Grid of Other Moments */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {BIRTHDAY_CONFIG.memories
            .filter((p) => p.id !== featuredPhoto.id)
            .map((photo, idx) => {
              const rotations = [-2, 2, -1.5, 2.5, -2, 1.5];
              const rot = rotations[idx % rotations.length];

              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
                  style={{ rotate: `${rot}deg` }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="cursor-pointer group bg-[#FFFDF9] rounded-xl p-3 sm:p-4 shadow-xl border border-[#EAB7D0]/20 flex flex-col"
                >
                  <div className="w-12 h-3.5 mx-auto -mt-5 mb-2 bg-[#EAB7D0]/60 rounded-sm shadow-inner backdrop-blur-sm transform -rotate-1" />

                  <PhotoFrame
                    src={photo.imageSrc}
                    fallbackSrc={photo.fallbackPlaceholder}
                    alt={photo.title}
                    aspectRatio={photo.aspectRatio || "portrait"}
                    className="rounded-lg shadow-inner border border-[#30263F]/10"
                  />

                  <div className="pt-3 text-center">
                    <h4 className="font-serif text-sm font-semibold text-[#30263F] group-hover:text-[#B96D86] transition-colors truncate">
                      {photo.title}
                    </h4>
                    <p className="text-[11px] text-[#8C78B8] font-sans mt-0.5 truncate">
                      {photo.date}
                    </p>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1A1224]/90 backdrop-blur-xl"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={scaleUpVariants}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 text-[#30263F] shadow-2xl border border-[#EAB7D0]/40 flex flex-col"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo view"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#30263F]/10 hover:bg-[#30263F]/20 text-[#30263F] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <PhotoFrame
                src={selectedPhoto.imageSrc}
                fallbackSrc={selectedPhoto.fallbackPlaceholder}
                alt={selectedPhoto.title}
                aspectRatio="portrait"
                objectFit="contain"
                className="w-full max-h-[460px] rounded-xl bg-[#30263F]/5 border border-[#30263F]/10 mb-4"
              />

              <div className="text-center">
                <span className="text-xs uppercase tracking-widest text-[#B96D86] font-semibold">
                  {selectedPhoto.date}
                </span>
                <h3 className="font-serif text-2xl text-[#30263F] mt-1 mb-1">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-[#4A3442] font-sans leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Footer */}
      <div className="relative z-10 flex justify-center pb-24 sm:pb-6">
        <button
          onClick={onNext}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFF8F1]/15 hover:bg-[#FFF8F1]/25 border border-[#EAB7D0]/40 backdrop-blur-md text-[#FFF8F1] text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
        >
          <span>Open Mansiii&apos;s Birthday Letter</span>
          <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
}
