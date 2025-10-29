declare module "canvas-confetti" {
  type ConfettiOptions = {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
    [key: string]: unknown;
  };

  type Confetti = (options?: ConfettiOptions) => void;

  const confetti: Confetti;
  export default confetti;
}
