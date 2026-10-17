"use client";

// Original celebratory chime synthesizer using Web Audio API
// Generates soft bell-like celestial harmonics, delicate sparkle tones, and warm shimmer.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx || audioCtx.state === "closed") {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playWishChime(isMuted: boolean = false): void {
  if (isMuted) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Master gain with gentle limiting
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.7, now);
  masterGain.connect(ctx.destination);

  // Warm low-pass filter for a dreamy music box / celestial bell timbre
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(3200, now);
  filter.Q.setValueAtTime(1.2, now);
  filter.connect(masterGain);

  // Pentatonic celestial chime frequencies: E5, G#5, B5, E6, G#6, B6
  const notes = [
    { freq: 659.25, time: 0.00, dur: 1.8, gain: 0.35 },  // E5
    { freq: 830.61, time: 0.12, dur: 1.9, gain: 0.32 },  // G#5
    { freq: 987.77, time: 0.25, dur: 2.1, gain: 0.30 },  // B5
    { freq: 1318.51, time: 0.40, dur: 2.3, gain: 0.28 }, // E6
    { freq: 1661.22, time: 0.55, dur: 2.4, gain: 0.22 }, // G#6
    { freq: 1975.53, time: 0.72, dur: 2.6, gain: 0.18 }, // B6
  ];

  notes.forEach(({ freq, time, dur, gain }) => {
    const startTime = now + time;

    // Fundamental sine bell
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    // Overtone shimmer
    const overtone = ctx.createOscillator();
    overtone.type = "triangle";
    overtone.frequency.setValueAtTime(freq * 2.02, startTime); // Subtle detune for shimmer

    // Note Envelope
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, startTime);
    // Instant soft bell strike
    noteGain.gain.exponentialRampToValueAtTime(gain, startTime + 0.015);
    // Natural exponential bell decay
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

    // Overtone envelope (decays faster than fundamental)
    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.0001, startTime);
    overtoneGain.gain.exponentialRampToValueAtTime(gain * 0.35, startTime + 0.02);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur * 0.6);

    osc.connect(noteGain);
    overtone.connect(overtoneGain);
    noteGain.connect(filter);
    overtoneGain.connect(filter);

    osc.start(startTime);
    overtone.start(startTime);
    osc.stop(startTime + dur);
    overtone.stop(startTime + dur);
  });

  // Delicate high sparkle cascade (glockenspiel glitter)
  const sparkles = [2637, 3136, 3951, 4186, 5274];
  sparkles.forEach((freq, idx) => {
    const startTime = now + 0.3 + idx * 0.09;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    const sGain = ctx.createGain();
    sGain.gain.setValueAtTime(0.0001, startTime);
    sGain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.01);
    sGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.5);

    osc.connect(sGain);
    sGain.connect(masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.55);
  });
}
