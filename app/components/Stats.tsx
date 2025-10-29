"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { START_DATE } from "../config";
import { daysBetween, formatThai } from "../lib/date";
import { fadeIn, fadeUp, useSmartMotion } from "../lib/motion";

export const Stats: React.FC = () => {
  const { prefersReducedMotion, animateNumber } = useSmartMotion();
  const [displayDays, setDisplayDays] = useState(0);
  const totalDays = daysBetween(START_DATE, new Date());

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayDays(totalDays);
      return;
    }
    setDisplayDays(0);
    const controls = animateNumber(totalDays, {
      from: 0,
      duration: 2.2,
      onUpdate: (value) => setDisplayDays(Math.round(value))
    });
    return () => controls?.stop();
  }, [animateNumber, prefersReducedMotion, totalDays]);

  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  return (
    <motion.div
      className="flex flex-col gap-8"
      variants={!prefersReducedMotion ? fadeUp : undefined}
      initial={prefersReducedMotion ? undefined : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.4 }}
    >
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        variants={!prefersReducedMotion ? fadeIn : undefined}
      >
        <StatCard title="เราอยู่ด้วยกันมา" value={`${displayDays.toLocaleString("th-TH")} วัน`} />
        <StatCard
          title="หรือกว่า"
          value={`${totalHours.toLocaleString("th-TH")} ชั่วโมง`}
        />
        <StatCard
          title="แปลว่า"
          value={`${totalMinutes.toLocaleString("th-TH")} นาทีแห่งความสุข`}
        />
      </motion.div>
      <motion.div
        className="card flex flex-col gap-2 px-6 py-5 text-center md:flex-row md:items-center md:justify-between md:text-left"
        variants={!prefersReducedMotion ? fadeIn : undefined}
      >
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-rose-400">จุดเริ่มต้น</p>
          <p className="mt-1 text-lg font-semibold text-rose-500">
            เราเริ่มคบกันในวันที่ {formatThai(START_DATE)}
          </p>
        </div>
        <p className="text-sm text-rose-400">
          ทุกวันตั้งแต่นั้นมา คือของขวัญที่ทำให้โลกของเราสดใสขึ้นเสมอ 🌸
        </p>
      </motion.div>
    </motion.div>
  );
};

const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="card flex flex-col gap-3 px-6 py-5 text-center md:text-left">
    <p className="text-sm font-medium text-rose-400">{title}</p>
    <p className="text-2xl font-semibold text-rose-500 tabular-nums">{value}</p>
  </div>
);
