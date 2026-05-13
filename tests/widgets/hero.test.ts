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

describe("hero animation", () => {
  const HERO_INPUT = {
    handle: "PHILOTHEEPHILIX",
    subtitle: "i build the rails between ai agents and on-chain money",
    location: "chennai",
    year: 2026,
    tokens: ["ETH", "STRK", "USDC"],
  };
  it("contains a <style> block with cursor blink keyframes", () => {
    const svg = renderHero(HERO_INPUT);
    expect(svg).toMatch(/<style>[\s\S]*@keyframes blink[\s\S]*<\/style>/);
  });
  it("contains the cursor element with class=\"cursor\"", () => {
    const svg = renderHero(HERO_INPUT);
    expect(svg).toMatch(/<text[^>]*class="cursor"/);
  });
  it("contains a clipPath reveal animation for the subtitle", () => {
    const svg = renderHero(HERO_INPUT);
    expect(svg).toContain('<clipPath');
    expect(svg).toMatch(/<animate[^>]*attributeName="width"/);
  });
});

describe("hero manifesto line", () => {
  const BASE = {
    handle: "PHILOTHEEPHILIX",
    subtitle: "i build the rails between ai agents and on-chain money",
    location: "chennai",
    year: 2026,
    tokens: ["ETH", "STRK", "USDC"],
  };
  it("renders the manifesto line with arrow prefix when provided", () => {
    const svg = renderHero({ ...BASE, manifesto: "rails before runtime" });
    expect(svg).toContain("▸ rails before runtime");
  });
  it("does not render the line when manifesto is empty/undefined", () => {
    const svg = renderHero({ ...BASE });
    expect(svg).not.toContain("▸");
  });
});
