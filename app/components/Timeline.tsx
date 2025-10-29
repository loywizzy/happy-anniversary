"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { fadeUp, usePrefersReducedMotionSafe } from "../lib/motion";
import { formatThai } from "../lib/date";

type TimelineItem = {
  title: string;
  date: Date;
  description: string;
};

const timelineItems: TimelineItem[] = [
  {
    title: "วันที่เราไปสวนสาธารณะด้วยกัน",
    date: new Date("2023-07-27T17:30:00"),
    description: "วันที่เราไปสวนสาธารณะด้วยกันครั้งแรก ท่ามกลางแสงไฟและเสียงหัวเราะที่เติมเต็มหัวใจ"
  },
  {
    title: "วันที่พาน้องยูมาบ้านครั้งแรก",
    date: new Date("2023-07-29T08:00:00"),
    description: "วันที่เราพาน้องยูมาบ้านครั้งแรก รอยยิ้มและความสุขที่ไม่มีวันลืม"
  },
  {
    title: "เราตกลงใจจะก้าวต่อไปด้วยกัน",
    date: new Date("2023-07-30T20:00"),
    description: "วันที่เราตกลงเป็นแฟนกัน ท่ามกลางแสงดาวและความรู้สึกที่อบอุ่นในใจ"
  }
];

export const Timeline: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotionSafe();
  const orderedItems = useMemo(
    () =>
      [...timelineItems].sort((a, b) => a.date.getTime() - b.date.getTime()),
    []
  );

  return (
    <motion.ol
      className="relative ms-4 flex flex-col gap-8 border-s border-rose-200/80 ps-8"
      variants={!prefersReducedMotion ? fadeUp : undefined}
      initial={prefersReducedMotion ? undefined : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.4 }}
    >
      <div className="timeline-line absolute left-0 top-0 h-full w-px" />
      {orderedItems.map((item, index) => (
        <motion.li
          key={item.title}
          className="relative"
          variants={!prefersReducedMotion ? fadeUp : undefined}
        >
          <span className="absolute -start-8 top-3 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-rose-200 text-rose-500 shadow-md shadow-rose-100">
            ♥
          </span>
          <div className="card flex flex-col gap-3 px-6 py-5">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-400">
              {formatThai(item.date)}
            </p>
            <h3 className="text-lg font-semibold text-rose-500">{item.title}</h3>
            <p className="text-sm leading-relaxed text-rose-400">{item.description}</p>
            <div className="mt-1 h-px w-full bg-gradient-to-r from-rose-100 to-transparent" />
            <p className="text-xs text-rose-300">
              บันทึกที่ {index + 1} ของเราสองคน
            </p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
};
