import { describe, it, expect } from "vitest";
import { renderActivity } from "../../scripts/widgets/activity.js";

describe("renderActivity", () => {
  it("renders SVG with label and 30 sparkline chars", () => {
    const svg = renderActivity({ daily: Array(30).fill(0).map((_, i) => i) });
    expect(svg).toMatch(/^<svg/);
    expect(svg).toContain("SHIPPING CADENCE");
    expect(svg).toContain("30D");
  });

  it("handles dormant (empty data) gracefully", () => {
    const svg = renderActivity({ daily: [] });
    expect(svg).toContain("widget dormant");
  });
});

describe("activity animation", () => {
  it("wraps the sparkline in a clipPath reveal", () => {
    const svg = renderActivity({ daily: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
    expect(svg).toContain('<clipPath');
    expect(svg).toMatch(/<animate[^>]*attributeName="width"/);
  });
  it("does not animate when daily is empty", () => {
    const svg = renderActivity({ daily: [] });
    expect(svg).not.toContain('<clipPath');
  });
});
