import { describe, it, expect } from "vitest";
import {
  buildSummary,
  mergeEntry,
  toISTDate,
  toISTDow,
  type DiaryActivity,
  type DiaryFile,
  type DiaryEntry,
} from "../../scripts/lib/diary.js";

describe("buildSummary", () => {
  it("returns 'shipped N · repo' when commits exist", () => {
    const a: DiaryActivity = {
      commitsByRepo: { starkbase: 4, "ai-browse": 1 },
      prsOpened: 0,
      reviewsGiven: 0,
      issuesOpened: 0,
    };
    expect(buildSummary(a)).toBe("shipped 5 · starkbase");
  });
  it("returns 'opened N PR · repo' when no commits but PR opened", () => {
    expect(buildSummary({ commitsByRepo: {}, prsOpened: 1, prsOpenedRepo: "starkbase", reviewsGiven: 0, issuesOpened: 0 })).toBe("opened 1 PR · starkbase");
  });
  it("returns 'reviewed N PR' when only reviews", () => {
    expect(buildSummary({ commitsByRepo: {}, prsOpened: 0, reviewsGiven: 2, issuesOpened: 0 })).toBe("reviewed 2 PR");
  });
  it("returns 'filed N issue' when only issues", () => {
    expect(buildSummary({ commitsByRepo: {}, prsOpened: 0, reviewsGiven: 0, issuesOpened: 1 })).toBe("filed 1 issue");
  });
  it("returns 'idle' when no activity", () => {
    expect(buildSummary({ commitsByRepo: {}, prsOpened: 0, reviewsGiven: 0, issuesOpened: 0 })).toBe("idle");
  });
});

describe("mergeEntry", () => {
  const t = (date: string, summary = "x"): DiaryEntry => ({ date, dow: "MON", summary });
  it("appends to empty diary", () => {
    const file: DiaryFile = { lastUpdatedUtc: "", entries: [] };
    const out = mergeEntry(file, t("2026-05-13", "today"), "2026-05-13T09:30:00Z");
    expect(out.entries).toHaveLength(1);
    expect(out.entries[0]!.summary).toBe("today");
  });
  it("replaces same-day entry instead of duplicating", () => {
    const file: DiaryFile = { lastUpdatedUtc: "", entries: [t("2026-05-13", "old")] };
    const out = mergeEntry(file, t("2026-05-13", "new"), "2026-05-13T09:30:00Z");
    expect(out.entries).toHaveLength(1);
    expect(out.entries[0]!.summary).toBe("new");
  });
  it("prunes to last 7 entries, newest first", () => {
    const dates = ["05-01","05-02","05-03","05-04","05-05","05-06","05-07","05-08"].map(d => `2026-${d}`);
    const file: DiaryFile = { lastUpdatedUtc: "", entries: dates.slice(0,7).reverse().map(d => t(d)) };
    const out = mergeEntry(file, t("2026-05-08", "new"), "2026-05-08T09:30:00Z");
    expect(out.entries).toHaveLength(7);
    expect(out.entries[0]!.date).toBe("2026-05-08");
    expect(out.entries[6]!.date).toBe("2026-05-02");
  });
});

describe("toISTDate", () => {
  it("converts UTC 09:30 to IST date 15:00 on the same calendar day", () => {
    expect(toISTDate(new Date("2026-05-13T09:30:00Z"))).toBe("2026-05-13");
  });
  it("converts UTC 23:00 to next IST date", () => {
    expect(toISTDate(new Date("2026-05-12T23:00:00Z"))).toBe("2026-05-13");
  });
  it("converts UTC 18:00 (=23:30 IST) to same IST date", () => {
    expect(toISTDate(new Date("2026-05-13T18:00:00Z"))).toBe("2026-05-13");
  });
});

describe("toISTDow", () => {
  it("returns uppercase 3-letter dow", () => {
    expect(toISTDow(new Date("2026-05-13T09:30:00Z"))).toBe("WED");
  });
});
