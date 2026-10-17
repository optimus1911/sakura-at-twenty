"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ChevronDown, Sparkles, RotateCcw } from "lucide-react";
import { BIRTHDAY_CONFIG } from "@/config/birthday-config";
import { slideUpVariants, letterUnfoldVariants } from "@/lib/animation-variants";
import { PhotoFrame } from "../ui/PhotoFrame";

interface BirthdayLetterProps {
  onNext: () => void;
}

export function BirthdayLetter({ onNext }: BirthdayLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const letterPhoto = BIRTHDAY_CONFIG.photos.scene5Letter;

  return (
    <section aria-label="Birthday letter scene" className="relative w-full min-h-screen py-14 sm:py-16 lg:py-12 px-4 sm:px-6 flex flex-col justify-between items-center bg-gradient-to-b from-[#251C33] via-[#30263F] to-[#20182E] text-[#FFF8F1]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#EAB7D0] filter blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8C78B8] filter blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-xl mx-auto text-center mb-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F1]/10 border border-[#EAB7D0]/30 backdrop-blur-md mb-3"
        >
          <Mail className="w-3.5 h-3.5 text-[#EAB7D0]" />
          <span className="text-xs uppercase tracking-widest text-[#FFF8F1] font-semibold">
            05 • A Letter for Twenty
          </span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpVariants}
          className="text-3xl sm:text-5xl font-serif text-[#FFF8F1] mb-2"
        >
          Words for Mansiii
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpVariants}
          className="text-sm sm:text-base text-[#F6D9E6]/80 font-sans"
        >
          Tap the envelope to break the wax seal and read your birthday letter.
        </motion.p>
      </div>

      {/* Main Container: Envelope/Letter + Floating Memory Card (Photo 7: Black Embroidered Skyline) */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 my-auto min-h-[360px] lg:min-h-[400px]">
        {/* Memory Card: Photo 7 - Skyline & Embroidered Elegance */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.03, rotate: 0 }}
          className="relative w-72 sm:w-80 p-3 sm:p-4 pb-5 rounded-2xl bg-[#FFFDF9] shadow-[0_20px_50px_rgba(20,10,30,0.6),0_0_30px_rgba(234,183,208,0.2)] border border-[#EAB7D0]/40 transform -rotate-1.5"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-gradient-to-r from-[#EAB7D0]/80 via-[#E7CB92]/80 to-[#EAB7D0]/80 rounded-sm shadow-sm backdrop-blur-sm transform rotate-1" />

          <PhotoFrame
            src={letterPhoto.imageSrc}
            fallbackSrc={letterPhoto.fallbackPlaceholder}
            alt={letterPhoto.title}
            aspectRatio="landscape"
            objectPosition="center"
            className="rounded-xl shadow-inner border border-[#30263F]/10 overflow-hidden"
          />

          <div className="mt-3 text-center">
            <p className="font-handwriting text-lg text-[#30263F] font-semibold leading-tight">
              {letterPhoto.title}
            </p>
            <p className="text-[10px] text-[#8C78B8] font-sans uppercase tracking-wider mt-0.5">
              {letterPhoto.date}
            </p>
          </div>
        </motion.div>

        {/* Envelope & Letter Parchment */}
        <div className="max-w-xl w-full flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Sealed Envelope */
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsOpen(true)}
                className="cursor-pointer group relative w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#FFF5EC] to-[#EBD5C5] p-6 shadow-2xl border border-[#B96D86]/30 flex flex-col items-center justify-center transform hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="none">
                    <path d="M0,0 L200,140 L400,0" fill="none" stroke="#D3B8A5" strokeWidth="1.5" />
                    <path d="M0,250 L160,110" fill="none" stroke="#D3B8A5" strokeWidth="1.5" opacity="0.6" />
                    <path d="M400,250 L240,110" fill="none" stroke="#D3B8A5" strokeWidth="1.5" opacity="0.6" />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8B2643] via-[#B96D86] to-[#E91E63] shadow-xl flex items-center justify-center border-2 border-[#D88A9F] group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">🌸</span>
                  </div>
                  <span className="mt-4 text-xs uppercase tracking-widest font-semibold text-[#8B485A]">
                    Click to Unfold Letter
                  </span>
                  <span className="text-[12px] font-serif italic text-[#6E4B3E] mt-1">
                    For: {BIRTHDAY_CONFIG.recipient.name}
                  </span>
                </div>
              </motion.div>
            ) : (
              /* Unfolded Letter Parchment */
              <motion.div
                key="letter"
                initial="closed"
                animate="open"
                exit="closed"
                variants={letterUnfoldVariants}
                className="parchment-card rounded-2xl p-6 sm:p-9 w-full text-[#30263F] shadow-2xl relative border border-[#B96D86]/25"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-xs flex items-center gap-1 text-[#8C78B8] hover:text-[#30263F] transition-colors"
                  title="Fold envelope"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Fold</span>
                </button>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#30263F] mb-5">
                  {BIRTHDAY_CONFIG.letter.salutation}
                </h3>

                <div className="space-y-3.5 font-sans text-sm sm:text-base leading-relaxed text-[#4A3854]">
                  {BIRTHDAY_CONFIG.letter.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#B96D86]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-sans text-[#7A6170] italic">
                      {BIRTHDAY_CONFIG.letter.signOff}
                    </p>
                    <p className="font-handwriting text-2xl sm:text-3xl text-[#B96D86] font-semibold mt-1">
                      {BIRTHDAY_CONFIG.letter.signature}
                    </p>
                  </div>

                  {BIRTHDAY_CONFIG.letter.postScript && (
                    <div className="text-xs bg-[#FFF3F6] p-2.5 rounded-lg border border-[#F6D9E6] text-[#7A4B59] max-w-xs font-serif italic">
                      {BIRTHDAY_CONFIG.letter.postScript}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="relative z-10 flex justify-center pt-8 pb-20 sm:pb-0 -translate-y-16 sm:translate-y-0">
        <button
          onClick={onNext}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#EAB7D0] to-[#E7CB92] text-[#30263F] text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-[#30263F]" />
          <span>Proceed to Mansiii&apos;s Birthday Reveal</span>
          <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
}
