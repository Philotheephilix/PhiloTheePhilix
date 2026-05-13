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

import {
  animationStyle,
  cursorSpan,
  clipPathReveal,
  pulseAnimate,
  hueDriftAnimate,
  radarPingCircle,
} from "../../scripts/lib/svg.js";

describe("animationStyle", () => {
  it("wraps keyframes in a <style> block", () => {
    const out = animationStyle([
      "@keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }",
    ]);
    expect(out).toMatch(/<style>[\s\S]*@keyframes blink[\s\S]*<\/style>/);
  });
  it("joins multiple keyframes with no extra whitespace", () => {
    const out = animationStyle(["@keyframes a{}", "@keyframes b{}"]);
    expect(out).toContain("@keyframes a{}");
    expect(out).toContain("@keyframes b{}");
  });
});

describe("cursorSpan", () => {
  it("emits a text element with a class for blink targeting", () => {
    const out = cursorSpan({ x: 50, y: 100, fill: "#fff" });
    expect(out).toMatch(/<text[^>]*class="cursor"/);
    expect(out).toContain('x="50"');
    expect(out).toContain('y="100"');
    expect(out).toContain(">_</text>");
  });
});

describe("clipPathReveal", () => {
  it("emits clipPath + SMIL animate for left→right text reveal", () => {
    const out = clipPathReveal({ id: "rev1", width: 240, durationMs: 1200 });
    expect(out).toContain('<clipPath id="rev1">');
    expect(out).toMatch(/<animate[^>]*attributeName="width"/);
    expect(out).toContain('dur="1.2s"');
    expect(out).toContain('from="0"');
    expect(out).toContain('to="240"');
  });
});

describe("pulseAnimate", () => {
  it("returns CSS keyframes string for slow & fast pulse classes", () => {
    const out = pulseAnimate();
    expect(out).toContain("@keyframes pulse-shipping");
    expect(out).toContain("@keyframes pulse-iter");
    expect(out).toContain(".pulse-shipping");
    expect(out).toContain(".pulse-iter");
  });
});

describe("hueDriftAnimate", () => {
  it("returns CSS for slow color drift on .hue-drift", () => {
    const out = hueDriftAnimate("#7bd88f", "#bff0bb");
    expect(out).toContain(".hue-drift");
    expect(out).toContain("@keyframes hue-drift");
    expect(out).toContain("#7bd88f");
    expect(out).toContain("#bff0bb");
  });
});

describe("radarPingCircle", () => {
  it("emits a <circle> with SMIL r + opacity animations", () => {
    const out = radarPingCircle({ cx: 100, cy: 50, durationMs: 3000 });
    expect(out).toContain('cx="100"');
    expect(out).toContain('cy="50"');
    expect(out).toMatch(/<animate[^>]*attributeName="r"/);
    expect(out).toMatch(/<animate[^>]*attributeName="opacity"/);
    expect(out).toContain('dur="3s"');
  });
});
