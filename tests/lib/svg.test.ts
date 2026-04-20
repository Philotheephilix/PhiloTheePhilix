import { describe, it, expect } from "vitest";
import {
  sparkline,
  box,
  svgDocument,
  TUI_PALETTE,
} from "../../scripts/lib/svg.js";

describe("sparkline", () => {
  it("maps values to block chars", () => {
    expect(sparkline([0, 1, 2, 3, 4, 5, 6, 7, 8])).toBe("▁▁▂▃▄▅▆▇█");
  });

  it("handles empty input", () => {
    expect(sparkline([])).toBe("");
  });

  it("handles all-zero input", () => {
    expect(sparkline([0, 0, 0, 0])).toBe("▁▁▁▁");
  });
});

describe("box", () => {
  it("wraps a single line in a box", () => {
    const result = box(["hello"]);
    expect(result).toContain("┌");
    expect(result).toContain("└");
    expect(result).toContain("│ hello │");
  });

  it("pads lines to equal width", () => {
    const result = box(["a", "bbbb"]);
    const lines = result.split("\n");
    expect(lines[1]!.length).toBe(lines[2]!.length);
  });
});

describe("svgDocument", () => {
  it("produces a valid SVG root", () => {
    const out = svgDocument({ width: 300, height: 100, children: "<text/>" });
    expect(out).toMatch(/^<svg /);
    expect(out).toContain('width="300"');
    expect(out).toContain('height="100"');
    expect(out).toContain("<text/>");
  });
});

describe("TUI_PALETTE", () => {
  it("exposes expected colors", () => {
    expect(TUI_PALETTE.green).toBe("#7bd88f");
    expect(TUI_PALETTE.amber).toBe("#ffb454");
    expect(TUI_PALETTE.cyan).toBe("#7ac6ff");
  });
});
