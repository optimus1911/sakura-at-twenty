"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SceneNav } from "../ui/SceneNav";
import { MusicController } from "../audio/MusicController";
import { MotionPermissionBanner } from "../ui/MotionPermissionBanner";
import { IntroScene } from "../scenes/IntroScene";
import { SakuraScene } from "../scenes/SakuraScene";
import { StudyScene } from "../scenes/StudyScene";
import { MemoryGallery } from "../scenes/MemoryGallery";
import { BirthdayLetter } from "../scenes/BirthdayLetter";
import { BirthdayReveal } from "../scenes/BirthdayReveal";
import { FinalScene } from "../scenes/FinalScene";

const SCENE_TITLES = [
  "01 First Breath",
  "02 Sakura Dreamscape",
  "03 Study Universe",
  "04 Memories",
  "05 Letter",
  "06 Birthday Reveal",
  "07 Goodnight",
];

export function BirthdayExperience() {
  const [currentScene, setCurrentScene] = useState(0);

  // Keyboard navigation between scenes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrentScene((prev) => Math.min(prev + 1, SCENE_TITLES.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrentScene((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const goToScene = (index: number) => {
    setCurrentScene(Math.max(0, Math.min(index, SCENE_TITLES.length - 1)));
  };

  const nextScene = () => {
    setCurrentScene((prev) => Math.min(prev + 1, SCENE_TITLES.length - 1));
  };

  return (
    <main className="relative w-full min-h-screen bg-[#30263F] overflow-hidden">
      {/* Persistent Scene Navigation Bar */}
      <SceneNav
        currentScene={currentScene}
        totalScenes={SCENE_TITLES.length}
        sceneTitles={SCENE_TITLES}
        onSelectScene={goToScene}
      />

      {/* Persistent Official YouTube Music Controller */}
      <MusicController />

      {/* Persistent Motion Parallax Activator */}
      <MotionPermissionBanner />

      {/* Cinematic Scene Transition Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="w-full min-h-screen"
        >
          {currentScene === 0 && <IntroScene onEnter={nextScene} />}
          {currentScene === 1 && <SakuraScene onNext={nextScene} />}
          {currentScene === 2 && <StudyScene onNext={nextScene} />}
          {currentScene === 3 && <MemoryGallery onNext={nextScene} />}
          {currentScene === 4 && <BirthdayLetter onNext={nextScene} />}
          {currentScene === 5 && <BirthdayReveal onNext={nextScene} />}
          {currentScene === 6 && <FinalScene onReplay={() => goToScene(0)} />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
