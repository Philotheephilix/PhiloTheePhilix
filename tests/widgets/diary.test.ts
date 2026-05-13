import { describe, it, expect } from "vitest";
import { renderDiary } from "../../scripts/widgets/diary.js";

describe("renderDiary", () => {
  const entries = [
    { date: "2026-05-13", dow: "WED", summary: "shipped 4 · starkbase" },
    { date: "2026-05-12", dow: "TUE", summary: "reviewed 2 PR" },
    { date: "2026-05-11", dow: "MON", summary: "idle" },
  ];
  it("renders today's row with arrow marker", () => {
    const svg = renderDiary({ entries, today: "2026-05-13" });
    expect(svg).toContain("→");
    expect(svg).toContain("WED");
    expect(svg).toContain("shipped 4 · starkbase");
  });
  it("renders non-today rows without the arrow marker", () => {
    const svg = renderDiary({ entries, today: "2026-05-13" });
    const arrowMatches = svg.match(/→/g) ?? [];
    expect(arrowMatches).toHaveLength(1);
  });
  it("pads to 7 rows with 'warming up' placeholders when fewer than 7 entries", () => {
    const svg = renderDiary({ entries, today: "2026-05-13" });
    const warmingMatches = svg.match(/warming up/g) ?? [];
    expect(warmingMatches.length).toBeGreaterThanOrEqual(4);
  });
  it("renders 'no data' when entries is empty", () => {
    const svg = renderDiary({ entries: [], today: "2026-05-13" });
    expect(svg).toContain("warming up");
  });
});
