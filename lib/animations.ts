"use client"

import type { Variants, Transition } from "framer-motion"

// Animation configuration
export const EASING = [0.25, 0.8, 0.25, 1] as const
export const DURATION_MICRO = 0.3
export const DURATION_PAGE = 0.6

// Base transition configurations
export const microTransition: Transition = {
  duration: DURATION_MICRO,
  ease: EASING,
}

export const pageTransition: Transition = {
  duration: DURATION_PAGE,
  ease: EASING,
}

// Common animation variants
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: pageTransition,
  },
}

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: pageTransition,
  },
}

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: pageTransition,
  },
}

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: pageTransition,
  },
}

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: pageTransition,
  },
}

export const slideInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: pageTransition,
  },
}

// Stagger container for multiple children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Hover and tap animations
export const hoverScale = {
  scale: 1.05,
  transition: microTransition,
}

export const tapScale = {
  scale: 0.95,
  transition: microTransition,
}

// Button animations
export const buttonVariants: Variants = {
  idle: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: microTransition,
  },
  tap: {
    scale: 0.95,
    transition: microTransition,
  },
}

// Card animations
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: pageTransition,
  },
  hover: {
    y: -5,
    transition: microTransition,
  },
}

// Typewriter effect
export const typewriterVariants: Variants = {
  hidden: {
    width: 0,
  },
  visible: {
    width: "100%",
    transition: {
      duration: 2,
      ease: "linear",
    },
  },
}

// Glow pulse animation
export const glowPulse: Variants = {
  initial: {
    boxShadow: "0 0 20px rgba(163, 255, 0, 0.3)",
  },
  animate: {
    boxShadow: [
      "0 0 20px rgba(163, 255, 0, 0.3)",
      "0 0 40px rgba(163, 255, 0, 0.8)",
      "0 0 20px rgba(163, 255, 0, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: EASING,
    },
  },
}

// Rotation animation
export const rotateYoyo: Variants = {
  animate: {
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 1,
      ease: EASING,
    },
  },
}

// Counter animation
export const counterVariants: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: pageTransition,
  },
  glow: {
    scale: 1.1,
    color: "#A3FF00",
    textShadow: "0 0 20px #A3FF00",
    transition: microTransition,
  },
}

// 3D card animation
export const card3D: Variants = {
  idle: {
    rotateX: 5,
    rotateY: 5,
    y: 0,
  },
  hover: {
    rotateX: 5,
    rotateY: 5,
    y: -5,
    transition: microTransition,
  },
}

// Background gradient animation
export const backgroundGradient: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASING,
    },
  },
}

// Flip animation for testimonials
export const flipUp: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 90,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: {
      ...pageTransition,
      transformPerspective: 1000,
    },
  },
}

// Utility function to check for reduced motion preference
export const shouldReduceMotion = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }
  return false
}

// Reduced motion variants
export const getReducedMotionVariants = (variants: Variants): Variants => {
  if (shouldReduceMotion()) {
    const reducedVariants: Variants = {}
    Object.keys(variants).forEach((key) => {
      const variant = variants[key]
      if (typeof variant === "object" && variant !== null) {
        reducedVariants[key] = {
          ...variant,
          transition: {
            duration: 0.01,
          },
        }
      } else {
        reducedVariants[key] = variant
      }
    })
    return reducedVariants
  }
  return variants
}
