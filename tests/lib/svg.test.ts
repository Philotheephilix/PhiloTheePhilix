import { describe, it, expect } from "vitest";
import {
  sparkline,
  box,
  svgDocument,
  TUI_PALETTE,
  animationStyle,
  cursorSpan,
  radarPingCircle,
} from "../../scripts/lib/svg.js";

import {
  BAND,
  PATTERNS,
  googleFontsImport,
  svgDoc,
  field,
  displayText,
  monoText,
  sparkBar,
  chip,
  animPulse,
  animSpin,
} from "../../scripts/lib/svg.js";

describe("BAND palette", () => {
  it("has all required colours", () => {
    expect(BAND.vermilion).toBe("#DF3701")
    expect(BAND.turmeric).toBe("#FDCD2A")
    expect(BAND.rani).toBe("#E61DA2")
    expect(BAND.bottle).toBe("#216A55")
    expect(BAND.cream).toBe("#FFF4E4")
    expect(BAND.maroon).toBe("#4A0B10")
    expect(BAND.fieldVerm).toBe("#C93001")
    expect(BAND.fieldRani).toBe("#C21484")
    expect(BAND.fieldBottle).toBe("#1B5A48")
  })
})

describe("PATTERNS", () => {
  it("has flowerCream as data URI", () => {
    expect(PATTERNS.flowerCream).toMatch(/^url\("data:image\/svg\+xml,/)
  })
  it("has mandalaMotif as data URI", () => {
    expect(PATTERNS.mandalaMotif).toMatch(/^url\("data:image\/svg\+xml,/)
  })
})

describe("googleFontsImport", () => {
  it("returns css @import with Archivo and DM Mono", () => {
    const imp = googleFontsImport()
    expect(imp).toContain("@import")
    expect(imp).toContain("Archivo")
    expect(imp).toContain("DM+Mono")
  })
})

describe("svgDoc", () => {
  it("wraps children in <svg> with embedded style", () => {
    const svg = svgDoc({ width: 300, height: 100, bg: "#C93001", children: "<text>hi</text>" })
    expect(svg).toContain('<svg xmlns="http://www.w3.org/2000/svg"')
    expect(svg).toContain('width="300"')
    expect(svg).toContain('<style>')
    expect(svg).toContain('@import')
    expect(svg).toContain('<text>hi</text>')
  })
})

describe("field", () => {
  it("renders a rect with dot pattern overlay", () => {
    const f = field({ x: 0, y: 0, w: 300, h: 100, bg: "#C93001", dotPattern: PATTERNS.flowerCream, children: "" })
    expect(f).toContain('<rect')
    expect(f).toContain('fill="#C93001"')
  })
})

describe("displayText", () => {
  it("uses Archivo font family", () => {
    const t = displayText({ x: 10, y: 20, text: "hello", size: 48, fill: "#FFF4E4" })
    expect(t).toContain("Archivo")
    expect(t).toContain("hello")
    expect(t).toContain('fill="#FFF4E4"')
  })
})

describe("monoText", () => {
  it("uses DM Mono font family", () => {
    const t = monoText({ x: 10, y: 20, text: "label", size: 11, fill: "#FFF4E4" })
    expect(t).toContain("DM Mono")
    expect(t).toContain("label")
  })
})

describe("sparkBar", () => {
  it("renders one rect per value", () => {
    const bar = sparkBar({ x: 0, y: 0, w: 280, h: 40, values: [1, 2, 3], fill: "#FDCD2A" })
    const rects = (bar.match(/<rect/g) ?? []).length
    expect(rects).toBe(3)
  })
  it("renders empty string for empty values", () => {
    expect(sparkBar({ x: 0, y: 0, w: 280, h: 40, values: [], fill: "#FDCD2A" })).toBe("")
  })
})

describe("chip", () => {
  it("renders a rect + text with the label", () => {
    const c = chip({ x: 10, y: 10, label: "rust", fill: "#4A0B10", textFill: "#FFF4E4" })
    expect(c).toContain("rust")
    expect(c).toContain("<rect")
    expect(c).toContain("<text")
  })
})

// ── Backwards-compat exports ───────────────────────────────────────────────

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

describe("svgDocument (backwards compat)", () => {
  it("produces a valid SVG root", () => {
    const out = svgDocument({ width: 300, height: 100, children: "<text/>" });
    expect(out).toMatch(/^<svg /);
    expect(out).toContain('width="300"');
    expect(out).toContain('height="100"');
    expect(out).toContain("<text/>");
  });
});

describe("TUI_PALETTE (backwards compat)", () => {
  it("exposes expected colour keys", () => {
    expect(TUI_PALETTE).toHaveProperty("bg");
    expect(TUI_PALETTE).toHaveProperty("green");
    expect(TUI_PALETTE).toHaveProperty("amber");
    expect(TUI_PALETTE).toHaveProperty("cream");
  });
});

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
  it("emits a text element with underscore content", () => {
    const out = cursorSpan({ x: 50, y: 100, fill: "#fff" });
    expect(out).toContain('x="50"');
    expect(out).toContain('y="100"');
    expect(out).toContain(">_</text>");
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

describe("animPulse", () => {
  it("returns a style block with CSS keyframes and pulse class", () => {
    const s = animPulse("test")
    expect(s).toContain("<style>")
    expect(s).toContain("@keyframes pulse-test")
    expect(s).toContain(".pulse-test")
  })
})

describe("animSpin", () => {
  it("returns a style block with CSS keyframes and spin class", () => {
    const s = animSpin("hero", 140)
    expect(s).toContain("<style>")
    expect(s).toContain("@keyframes spin-hero")
    expect(s).toContain(".spin-hero")
    expect(s).toContain("140s")
  })
})
