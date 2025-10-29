"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { fadeIn, fadeUp, useSmartMotion } from "../lib/motion";

export const LoveLetter: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { prefersReducedMotion } = useSmartMotion();

  return (
    <motion.div
      className="mx-auto w-full max-w-3xl"
      variants={!prefersReducedMotion ? fadeUp : undefined}
      initial={prefersReducedMotion ? undefined : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.4 }}
    >
      <div className="card overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-rose-400">Love Letter</p>
            <h3 className="mt-2 font-display text-2xl text-rose-500">
              ความในใจสำหรับเธอ
            </h3>
          </div>
          <motion.span
            className="rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-500 shadow-inner"
            animate={
              prefersReducedMotion
                ? { rotate: open ? 0 : 180 }
                : { rotate: open ? 0 : 180, transition: { duration: 0.4, ease: "easeOut" } }
            }
          >
            {open ? "ปิดไว้ก่อน" : "เปิดอ่านข้อความ"}
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <motion.div
                className="flex flex-col gap-4 px-6 pb-6 text-rose-500"
                variants={!prefersReducedMotion ? fadeIn : undefined}
              >
                <p>
                  สวัสดีจ้าน้องยูที่น่ารักของพี่ 💖
                </p>
                <p>
                  วันนี้ก็ครบรอบอีกเดือนนึงแล้วที่เราได้เดินทางมาด้วยกัน พี่ยูอยากบอกว่า
                  ขอบคุณมาก ๆ นะที่อยู่ข้าง ๆ พี่ในทุกช่วงเวลา ไม่ว่าจะสุขหรือทุกข์ น้องยูก็อยู่เป็นกำลังใจให้เสมอ
                </p>
                <p>
                  รักน้องยูมาก ๆ นะ ขอให้ความรักและความสุขที่เรามีร่วมกันนี้
                  เติบโตขึ้นเรื่อย ๆ ในทุก ๆ วัน
                  และขอให้เราสร้างความทรงจำดี ๆ ร่วมกันอีกมากมายในอนาคต
                  ที่กำลังจะมาถึงนี้นะจ๊ะ 💕
                </p>
                <p className="mt-4 text-right font-display text-xl text-rose-400">
                  — จากพี่ยู
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
