const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const daysBetween = (a: Date, b: Date): number => {
  const diff = b.getTime() - a.getTime();
  return Math.floor(diff / DAY_IN_MS);
};

export const formatThai = (date: Date): string =>
  date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
