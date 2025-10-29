"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ANNIVERSARY_DATE, HERO_IMAGES, NAMES } from "../config";
import { fadeUp, fadeIn, pop, stagger, usePrefersReducedMotionSafe } from "../lib/motion";
import { formatThai } from "../lib/date";
import { FloatingHearts } from "./FloatingHearts";

export const Hero: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotionSafe();

  const sectionMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden" as const,
        animate: "visible" as const
      };

  const scrollToNext = () => {
    const nextSection = document.querySelector<HTMLElement>("#countdown");
    nextSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-soft">
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 via-white/75 to-rose-100/80" />
        <div
          className="absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{ backgroundImage: "url('/stars.svg')", backgroundSize: "280px" }}
        />
      </div>
      <FloatingHearts />
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24 md:flex-row md:items-center md:gap-16 md:px-10"
        variants={!prefersReducedMotion ? stagger : undefined}
        {...sectionMotionProps}
      >
        <div className="flex-1 text-center md:text-left">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-rose-500 shadow-sm shadow-rose-100/40 backdrop-blur"
            variants={!prefersReducedMotion ? fadeIn : undefined}
          >
            <span className="text-base leading-none">💝</span> Forever Celebration
          </motion.span>
          <motion.h1
            className="mt-6 font-display text-4xl leading-tight text-rose-600 sm:text-5xl lg:text-6xl"
            variants={!prefersReducedMotion ? fadeUp : undefined}
          >
            {NAMES}
          </motion.h1>
          <motion.p
            className="mt-4 text-base leading-relaxed text-rose-500 sm:text-lg"
            variants={!prefersReducedMotion ? fadeIn : undefined}
          >
            เราเดินทางมาด้วยกัน เติมเต็มหัวใจด้วยรอยยิ้ม
            และความทรงจำละมุนที่ไม่มีวันลืม
          </motion.p>
          <motion.p
            className="mt-4 text-sm font-medium text-rose-400"
            variants={!prefersReducedMotion ? fadeIn : undefined}
          >
            ครบรอบครั้งนี้: {formatThai(ANNIVERSARY_DATE)}
          </motion.p>
          <motion.button
            type="button"
            onClick={scrollToNext}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-3 font-medium text-white shadow-lg shadow-rose-200 transition hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
            variants={!prefersReducedMotion ? pop : undefined}
            whileHover={
              prefersReducedMotion
                ? undefined
                : { scale: 1.03, transition: { duration: 0.2 } }
            }
            whileTap={
              prefersReducedMotion ? undefined : { scale: 0.97, transition: { duration: 0.15 } }
            }
          >
            เลื่อนลงไปดูกัน
          </motion.button>
        </div>
        <motion.div
          className="relative flex flex-1 justify-center md:justify-end"
          variants={!prefersReducedMotion ? fadeIn : undefined}
        >
          <div className="relative flex w-full max-w-xl justify-center gap-4">
            {HERO_IMAGES.map((src, index) => (
              <motion.div
                key={src}
                className="card relative flex w-36 overflow-hidden sm:w-40 md:w-48 lg:w-52"
                variants={!prefersReducedMotion ? fadeUp : undefined}
                style={{
                  rotate: index === 0 ? "-4deg" : index === 1 ? 2 : -1.5,
                  zIndex: HERO_IMAGES.length - index
                }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { delay: 0.2 + index * 0.15, duration: 0.7, ease: "easeOut" }
                }
              >
                <Image
                  src={src}
                  alt={`ความทรงจำที่ ${index + 1}`}
                  width={320}
                  height={400}
                  className="h-full w-full object-cover"
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
