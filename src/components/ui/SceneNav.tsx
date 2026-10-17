"use client";

import React from "react";

interface SceneNavProps {
  currentScene: number;
  totalScenes: number;
  sceneTitles: string[];
  onSelectScene: (index: number) => void;
}

export function SceneNav({
  currentScene,
  totalScenes,
  sceneTitles,
  onSelectScene,
}: SceneNavProps) {
  return (
    <nav aria-label="Experience scenes navigation" className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#30263F]/75 border border-[#EAB7D0]/25 backdrop-blur-md shadow-xl">
        {Array.from({ length: totalScenes }).map((_, idx) => {
          const isActive = currentScene === idx;
          return (
            <button
              key={idx}
              onClick={() => onSelectScene(idx)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none"
              aria-label={`Jump to scene ${idx + 1}: ${sceneTitles[idx]}`}
              title={sceneTitles[idx]}
            >
              {/* Dot indicator */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-6 sm:w-8 h-2 bg-gradient-to-r from-[#EAB7D0] to-[#E7CB92] shadow-sm"
                    : "w-2 h-2 bg-[#FFF8F1]/40 hover:bg-[#FFF8F1]/80 group-hover:scale-125"
                }`}
              />

              {/* Tooltip on hover */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[11px] whitespace-nowrap bg-[#1E1729] text-[#FFF8F1] border border-[#EAB7D0]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {sceneTitles[idx]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
