import { Variants, Transition } from "motion/react";

// Standardized timing tokens
export const TIMING = {
  instant: 0.15,
  fast: 0.3,
  standard: 0.6,
  cinematic: 1.2,
  dreamy: 2.0,
};

// Physics springs
export const SPRINGS = {
  soft: { type: "spring", stiffness: 120, damping: 20 } as Transition,
  bouncy: { type: "spring", stiffness: 260, damping: 15 } as Transition,
  gentle: { type: "spring", stiffness: 80, damping: 18, mass: 1 } as Transition,
};

// Smooth easing curves
export const EASINGS = {
  easeOutCubic: [0.33, 1, 0.68, 1] as const,
  easeInOutCubic: [0.65, 0, 0.35, 1] as const,
  dreamyFade: [0.16, 1, 0.3, 1] as const,
};

// Reusable Motion Variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: TIMING.standard, ease: EASINGS.easeOutCubic }
  },
  exit: {
    opacity: 0,
    transition: { duration: TIMING.fast, ease: EASINGS.easeInOutCubic }
  }
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASINGS.dreamyFade }
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: { duration: 0.4, ease: EASINGS.easeInOutCubic }
  }
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASINGS.dreamyFade }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 }
  }
};

export const letterUnfoldVariants: Variants = {
  closed: {
    rotateX: -90,
    opacity: 0,
    transformOrigin: "top center"
  },
  open: {
    rotateX: 0,
    opacity: 1,
    transformOrigin: "top center",
    transition: {
      duration: 1.1,
      ease: [0.19, 1, 0.22, 1],
      delay: 0.3
    }
  }
};
