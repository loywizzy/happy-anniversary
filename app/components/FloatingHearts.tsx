"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { usePrefersReducedMotionSafe } from "../lib/motion";

type FloatingHeart = {
  top: string;
  left: string;
  size: number;
  delay: number;
  opacity: number;
};

const HEART_PATH =
  "M24 42s-18-10.4-18-24C6 10.74 10.477 6 16 6c3.764 0 6.345 2.345 8 4.814C25.655 8.345 28.236 6 32 6c5.523 0 10 4.74 10 12 0 13.6-18 24-18 24z";

export const FloatingHearts: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotionSafe();

  const hearts = useMemo<FloatingHeart[]>(
    () => [
      { top: "8%", left: "15%", size: 48, delay: 0, opacity: 0.35 },
      { top: "18%", left: "70%", size: 36, delay: 0.6, opacity: 0.4 },
      { top: "30%", left: "8%", size: 32, delay: 1.2, opacity: 0.25 },
      { top: "50%", left: "85%", size: 40, delay: 1.5, opacity: 0.5 },
      { top: "68%", left: "12%", size: 28, delay: 2.1, opacity: 0.3 },
      { top: "78%", left: "60%", size: 36, delay: 2.4, opacity: 0.38 },
      { top: "22%", left: "45%", size: 42, delay: 0.9, opacity: 0.33 },
      { top: "60%", left: "35%", size: 34, delay: 1.8, opacity: 0.27 }
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {hearts.map((heart, index) => (
        <motion.svg
          key={index}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute text-rose-300"
          style={{
            top: heart.top,
            left: heart.left,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity
          }}
          initial={{ y: 0, scale: 0.9 }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -12, 0],
                  scale: [0.95, 1.05, 0.95]
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 6,
                  delay: heart.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
          }
        >
          <path d={HEART_PATH} fill="currentColor" />
        </motion.svg>
      ))}
    </div>
  );
};
