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
