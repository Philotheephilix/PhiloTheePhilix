import { describe, it, expect } from "vitest";
import { renderSkills } from "../../scripts/widgets/skills.js";

describe("renderSkills", () => {
  const INPUT = { repo: "Philotheephilix/.claude" };

  it("renders the SKILLS caption", () => {
    expect(renderSkills(INPUT)).toContain("SKILLS");
  });

  it("renders the 'get my skills' CTA", () => {
    expect(renderSkills(INPUT)).toContain("get my skills");
  });

  it("shows the repo path", () => {
    const svg = renderSkills(INPUT);
    expect(svg).toContain("Philotheephilix/.claude");
    expect(svg).toContain(".claude");
  });

  it("includes the Claude logo (orange asterisk shape)", () => {
    const svg = renderSkills(INPUT);
    expect(svg).toContain("#cc7847");
    expect(svg).toContain("<ellipse");
    const ellipses = svg.match(/<ellipse/g) ?? [];
    expect(ellipses).toHaveLength(6);
  });

  it("is 300px wide", () => {
    expect(renderSkills(INPUT)).toContain('width="300"');
  });
});
