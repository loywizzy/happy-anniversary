"use client";

let confettiLoader: Promise<typeof import("canvas-confetti")> | null = null;

const loadConfetti = async () => {
  if (!confettiLoader) {
    confettiLoader = import("canvas-confetti");
  }
  return confettiLoader;
};

export const fireConfetti = async () => {
  const { default: confetti } = await loadConfetti();
  const base = {
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  };

  confetti({
    ...base,
    angle: 60,
    startVelocity: 55
  });

  confetti({
    ...base,
    angle: 120,
    startVelocity: 55
  });

  confetti({
    ...base,
    particleCount: 180,
    scalar: 0.9,
    startVelocity: 65
  });
};

const ConfettiOnAnniv = () => null;

export default ConfettiOnAnniv;
