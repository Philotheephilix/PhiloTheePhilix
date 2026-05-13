export interface DiaryActivity {
  commitsByRepo: Record<string, number>;
  prsOpened: number;
  prsOpenedRepo?: string;
  reviewsGiven: number;
  issuesOpened: number;
}

export interface DiaryEntry {
  date: string;
  dow: string;
  summary: string;
}

export interface DiaryFile {
  lastUpdatedUtc: string;
  entries: DiaryEntry[];
}

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

export function toISTDate(d: Date): string {
  const ist = new Date(d.getTime() + IST_OFFSET_MS);
  return ist.toISOString().slice(0, 10);
}

export function toISTDow(d: Date): string {
  const ist = new Date(d.getTime() + IST_OFFSET_MS);
  return DOW[ist.getUTCDay()]!;
}

export function buildSummary(a: DiaryActivity): string {
  const totalCommits = Object.values(a.commitsByRepo).reduce((acc, n) => acc + n, 0);
  if (totalCommits > 0) {
    const top = Object.entries(a.commitsByRepo).sort((x, y) => y[1] - x[1])[0]!;
    return `shipped ${totalCommits} · ${top[0]}`;
  }
  if (a.prsOpened > 0) {
    const repo = a.prsOpenedRepo ? ` · ${a.prsOpenedRepo}` : "";
    return `opened ${a.prsOpened} PR${repo}`;
  }
  if (a.reviewsGiven > 0) return `reviewed ${a.reviewsGiven} PR`;
  if (a.issuesOpened > 0) return `filed ${a.issuesOpened} issue`;
  return "idle";
}

export function mergeEntry(
  file: DiaryFile,
  entry: DiaryEntry,
  nowUtcIso: string,
): DiaryFile {
  const filtered = file.entries.filter((e) => e.date !== entry.date);
  const next = [entry, ...filtered]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 7);
  return { lastUpdatedUtc: nowUtcIso, entries: next };
}
