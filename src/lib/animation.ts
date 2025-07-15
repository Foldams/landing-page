// Animation variants for Framer Motion
import { Variants } from "framer-motion";

// Fade in animation
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none" = "none",
  delay: number = 0
): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

// Staggered container for children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Scale animation
export const scaleIn = (delay: number = 0): Variants => {
  return {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

// Text animation with letter stagger
export const textContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      ease: "easeInOut",
    },
  },
};

export const textVariant = (delay: number = 0): Variants => {
  return {
    hidden: {
      y: 20,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay,
      },
    },
  };
};

// Slide in animation
export const slideIn = (
  direction: "up" | "down" | "left" | "right",
  delay: number = 0,
  duration: number = 0.8
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

// Hover effects
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 },
};