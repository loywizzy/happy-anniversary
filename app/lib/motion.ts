"use client";

import {
  Transition,
  Variants,
  useReducedMotion,
  AnimationPlaybackControls,
  animate
} from "framer-motion";
import { useCallback, useMemo } from "react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export const pop: Variants = {
  hidden: { scale: 0.96, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 }
  }
};

export const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const floatValentine: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
};

export const usePrefersReducedMotionSafe = (): boolean => {
  const prefers = useReducedMotion();
  if (typeof window === "undefined") {
    return false;
  }
  return prefers ?? false;
};

export const useSmartMotion = () => {
  const prefersReducedMotion = usePrefersReducedMotionSafe();

  const transitionFor = useCallback(
    (transition: Transition, reducedOverride?: Transition): Transition => {
      if (!prefersReducedMotion) {
        return transition;
      }
      return reducedOverride ?? { duration: 0.2, ease: "linear" };
    },
    [prefersReducedMotion]
  );

  const animateNumber = useCallback(
    (
      to: number,
      options?: {
        from?: number;
        duration?: number;
        onUpdate?: (value: number) => void;
      }
    ): AnimationPlaybackControls | null => {
      if (prefersReducedMotion) {
        options?.onUpdate?.(to);
        return null;
      }

      return animate(options?.from ?? 0, to, {
        duration: options?.duration ?? 1.8,
        ease: [0.22, 0.61, 0.36, 1],
        onUpdate: options?.onUpdate
      });
    },
    [prefersReducedMotion]
  );

  return useMemo(
    () => ({ prefersReducedMotion, transitionFor, animateNumber }),
    [prefersReducedMotion, transitionFor, animateNumber]
  );
};
