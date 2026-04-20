import { describe, it, expect } from "vitest";
import { renderBanner } from "../../scripts/lib/figlet.js";

describe("renderBanner", () => {
  it("produces multi-line ASCII for the handle", () => {
    const out = renderBanner("PHILO");
    const lines = out.split("\n");
    expect(lines.length).toBeGreaterThanOrEqual(3);
    expect(out.length).toBeGreaterThan("PHILO".length);
  });

  it("fits under the maxCols budget", () => {
    const out = renderBanner("PHILOTHEEPHILIX", { maxCols: 100 });
    const maxLine = Math.max(...out.split("\n").map((l) => l.length));
    expect(maxLine).toBeLessThanOrEqual(100);
  });
});
