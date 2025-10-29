"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "../config";
import { fadeIn, stagger, usePrefersReducedMotionSafe } from "../lib/motion";

export const Gallery: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotionSafe();

  const containerMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.3 }
      };

  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      variants={!prefersReducedMotion ? stagger : undefined}
      {...containerMotionProps}
    >
      {GALLERY_IMAGES.map((src) => (
        <motion.div
          key={src}
          className="group relative overflow-hidden rounded-[22px] border border-rose-100 bg-white/70 shadow-lg shadow-rose-100/50"
          variants={!prefersReducedMotion ? fadeIn : undefined}
        >
          <Image
            src={src}
            alt="แกลเลอรีความทรงจำ"
            width={500}
            height={500}
            className="h-full w-full object-cover transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose-100/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        </motion.div>
      ))}
    </motion.div>
  );
};
