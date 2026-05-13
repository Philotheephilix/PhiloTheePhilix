import { describe, it, expect } from "vitest";
import { renderActiveLoops } from "../../scripts/widgets/active-loops.js";

describe("renderActiveLoops", () => {
  it("renders up to 5 repos with status glyphs", () => {
    const svg = renderActiveLoops({
      loops: [
        { name: "tenori-labs", status: "shipping", pushedAt: new Date() },
        { name: "starkbase", status: "iterating", pushedAt: new Date() },
      ],
    });
    expect(svg).toContain("ACTIVE LOOPS");
    expect(svg).toContain("●");
    expect(svg).toContain("◐");
    expect(svg).toContain("tenori-labs");
    expect(svg).toContain("starkbase");
  });

  it("shows empty-state row when no loops", () => {
    const svg = renderActiveLoops({ loops: [] });
    expect(svg).toContain("no active loops this week");
  });
});

describe("active-loops animation", () => {
  const loops = [
    { name: "starkbase", status: "shipping" as const, pushedAt: new Date() },
    { name: "ai-browse", status: "iterating" as const, pushedAt: new Date() },
    { name: "old-repo",  status: "idle"      as const, pushedAt: new Date() },
  ];
  it("includes pulse keyframes in <style>", () => {
    const svg = renderActiveLoops({ loops });
    expect(svg).toMatch(/<style>[\s\S]*pulse-shipping[\s\S]*<\/style>/);
    expect(svg).toContain("pulse-iter");
  });
  it("applies pulse-shipping class to shipping glyph", () => {
    const svg = renderActiveLoops({ loops });
    expect(svg).toMatch(/class="pulse-shipping"[^>]*>●/);
  });
  it("applies pulse-iter class to iterating glyph", () => {
    const svg = renderActiveLoops({ loops });
    expect(svg).toMatch(/class="pulse-iter"[^>]*>◐/);
  });
  it("does NOT apply pulse class to idle glyph", () => {
    const svg = renderActiveLoops({ loops });
    expect(svg).not.toMatch(/class="pulse-[a-z]+"[^>]*>○/);
  });
});
