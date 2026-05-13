export function isoWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export function pickByWeek<T>(arr: T[], date: Date): T {
  if (arr.length === 0) throw new Error("pickByWeek: array is empty");
  const idx = (isoWeekNumber(date) - 1) % arr.length;
  return arr[idx]!;
}
