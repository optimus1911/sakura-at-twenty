"use client";

import dynamic from "next/dynamic";

const BirthdayExperience = dynamic(
  () =>
    import("@/components/experience/BirthdayExperience").then(
      (mod) => mod.BirthdayExperience
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#30263F] text-[#FFF8F1]">
        <div className="w-12 h-12 rounded-full border-2 border-[#EAB7D0] border-t-transparent animate-spin mb-4" />
        <p className="font-serif text-lg tracking-widest text-[#EAB7D0] animate-pulse">
          Sakura at Twenty
        </p>
        <p className="text-xs text-[#FFF8F1]/60 mt-1">
          Preparing your dreamscape...
        </p>
      </div>
    ),
  }
);

export default function Home() {
  return <BirthdayExperience />;
}
