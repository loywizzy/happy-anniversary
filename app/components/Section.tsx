"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, stagger, usePrefersReducedMotionSafe } from "../lib/motion";

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className
}) => {
  const prefersReducedMotion = usePrefersReducedMotionSafe();

  const sectionMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.4 }
      };

  return (
    <motion.section
      id={id}
      className={`relative py-16 sm:py-20 ${className ?? ""}`}
      variants={!prefersReducedMotion ? stagger : undefined}
      {...sectionMotionProps}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 md:px-8">
        <motion.div
          className="text-center"
          variants={!prefersReducedMotion ? fadeUp : undefined}
        >
          <p className="heading-accent text-sm uppercase tracking-[.4em] text-rose-500/80">
            {subtitle ?? "Love Celebration"}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-rose-600 sm:text-4xl">
            {title}
          </h2>
        </motion.div>
        <motion.div
          className="relative"
          variants={!prefersReducedMotion ? fadeIn : undefined}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};
