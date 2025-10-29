"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ANNIVERSARY_DATE } from "../config";
import { fadeIn, fadeUp, usePrefersReducedMotionSafe } from "../lib/motion";
import { fireConfetti } from "./ConfettiOnAnniv";

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = MS_IN_SECOND * 60;
const MS_IN_HOUR = MS_IN_MINUTE * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

const getTimeDiff = () => ANNIVERSARY_DATE.getTime() - Date.now();

const formatUnit = (value: number, pad: number) => value.toString().padStart(pad, "0");

export const Countdown: React.FC = () => {
  const [diff, setDiff] = useState<number>(() => getTimeDiff());
  const prefersReducedMotion = usePrefersReducedMotionSafe();
  const firedConfetti = useRef(false);

  useEffect(() => {
    const tick = () => setDiff(getTimeDiff());
    const interval = window.setInterval(tick, 1000);
    tick();
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (diff <= 0 && !firedConfetti.current) {
      firedConfetti.current = true;
      fireConfetti().catch(() => {
        firedConfetti.current = false;
      });
    }
  }, [diff]);

  const timeLeft = useMemo(() => {
    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const days = Math.floor(diff / MS_IN_DAY);
    const hours = Math.floor((diff % MS_IN_DAY) / MS_IN_HOUR);
    const minutes = Math.floor((diff % MS_IN_HOUR) / MS_IN_MINUTE);
    const seconds = Math.floor((diff % MS_IN_MINUTE) / MS_IN_SECOND);
    return { days, hours, minutes, seconds };
  }, [diff]);

  const renderUnit = (label: string, value: number, pad: number) => (
    <div className="card flex flex-col items-center gap-2 px-6 py-4">
      <div className="relative overflow-hidden rounded-xl bg-white/90 px-6 py-3 font-display text-3xl tabular-nums text-rose-500 sm:text-4xl">
        {prefersReducedMotion ? (
          <span>{formatUnit(value, pad)}</span>
        ) : (
          <AnimatePresence mode="wait">
            <motion.span
              key={value}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
              className="block"
            >
              {formatUnit(value, pad)}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <span className="text-sm font-medium uppercase tracking-[0.3em] text-rose-400">
        {label}
      </span>
    </div>
  );

  const hasArrived = diff <= 0;

  const subtitleText = hasArrived
    ? "Anniversary Celebration"
    : `Countdown to ${formatUnit(timeLeft.days, 2)} Days of Love`;

  return (
    <motion.div
      className="flex flex-col items-center gap-8 text-center"
      variants={!prefersReducedMotion ? fadeUp : undefined}
      initial={prefersReducedMotion ? undefined : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.4 }}
    >
      <motion.p
        className="text-sm uppercase tracking-[0.4em] text-rose-400"
        variants={!prefersReducedMotion ? fadeIn : undefined}
      >
        {subtitleText}
      </motion.p>
      {hasArrived ? (
        <motion.div
          className="card flex max-w-md flex-col items-center gap-4 px-10 py-8"
          variants={!prefersReducedMotion ? fadeUp : undefined}
        >
          <motion.span
            className="text-4xl font-semibold text-rose-500"
            animate={
              prefersReducedMotion
                ? undefined
                : { scale: [1, 1.05, 1], transition: { duration: 1.4, repeat: Infinity } }
            }
          >
            ถึงวันครบรอบแล้ว! 🎉
          </motion.span>
          <p className="text-sm text-rose-400">
            ขอให้วันนี้เต็มไปด้วยความสุขและเสียงหัวเราะเหมือนทุกครั้งที่เราอยู่ด้วยกัน
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={!prefersReducedMotion ? fadeIn : undefined}
        >
          {renderUnit("Days", timeLeft.days, 3)}
          {renderUnit("Hours", timeLeft.hours, 2)}
          {renderUnit("Minutes", timeLeft.minutes, 2)}
          {renderUnit("Seconds", timeLeft.seconds, 2)}
        </motion.div>
      )}
    </motion.div>
  );
};
