import { describe, it, expect } from "vitest";
import { renderHackathon } from "../../scripts/widgets/hackathon.js";

describe("renderHackathon", () => {
  it("renders wins, played and display ratio", () => {
    const svg = renderHackathon({ wins: 23, played: 40, win_ratio_display: "55%" });
    expect(svg).toContain("23W");
    expect(svg).toContain("17L");
    expect(svg).toContain("40 PLAYED");
    expect(svg).toContain("55% WIN");
  });
});
