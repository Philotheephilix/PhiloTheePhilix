import { describe, it, expect } from "vitest";
import { renderCurrently } from "../../scripts/widgets/currently.js";

describe("renderCurrently", () => {
  const items = ["shipping ai agents", "building starkbase", "fucking with linux"];
  it("renders the CURRENTLY caption", () => {
    const svg = renderCurrently({ items });
    expect(svg).toContain("CURRENTLY");
  });
  it("uses └─ glyph for the last item and ├─ for others", () => {
    const svg = renderCurrently({ items });
    expect(svg).toContain("├─");
    expect(svg).toContain("└─");
    const lastGlyphIdx = svg.lastIndexOf("└─");
    const lastBranchIdx = svg.lastIndexOf("├─");
    expect(lastGlyphIdx).toBeGreaterThan(lastBranchIdx);
  });
  it("renders all items verbatim", () => {
    const svg = renderCurrently({ items });
    for (const item of items) expect(svg).toContain(item);
  });
  it("handles single-item input (only └─ glyph)", () => {
    const svg = renderCurrently({ items: ["solo"] });
    expect(svg).toContain("└─");
    expect(svg).toContain("solo");
    expect(svg).not.toContain("├─");
  });
});
