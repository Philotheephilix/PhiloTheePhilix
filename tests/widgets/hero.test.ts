import { describe, it, expect } from "vitest";
import { renderHero } from "../../scripts/widgets/hero.js";

describe("renderHero", () => {
  it("includes the ASCII banner", () => {
    const svg = renderHero({
      handle: "PHILOTHEEPHILIX",
      subtitle: "i build the rails between ai agents and on-chain money",
      location: "chennai",
      year: 2026,
      tokens: ["ETH", "STRK", "USDC"],
    });
    expect(svg).toMatch(/^<svg/);
    expect(svg).toContain("PHILOTHEEPHILIX");
  });

  it("includes the subtitle and signature", () => {
    const svg = renderHero({
      handle: "PHILOTHEEPHILIX",
      subtitle: "i build the rails",
      location: "chennai",
      year: 2026,
      tokens: ["ETH"],
    });
    expect(svg).toContain("i build the rails");
    expect(svg).toContain("chennai");
    expect(svg).toContain("2026");
  });

  it("renders each token in brackets", () => {
    const svg = renderHero({
      handle: "PHILO",
      subtitle: "x",
      location: "c",
      year: 2026,
      tokens: ["ETH", "STRK", "USDC"],
    });
    expect(svg).toContain("[ ETH ]");
    expect(svg).toContain("[ STRK ]");
    expect(svg).toContain("[ USDC ]");
  });
});
