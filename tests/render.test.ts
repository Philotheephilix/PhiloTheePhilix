import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { renderFromFixtures } from "../scripts/render.js";

const ROOT = process.cwd();

describe("render (fixture mode)", () => {
  beforeAll(async () => {
    await renderFromFixtures();
  });

  it("writes all 10 widget SVGs", () => {
    const names = [
      "hero",
      "activity",
      "book-call",
      "shipped-this-week",
      "uptime",
      "hackathon",
      "availability",
      "featured",
      "currently",
      "signature",
    ];
    for (const n of names) {
      expect(existsSync(resolve(ROOT, `assets/widgets/${n}.svg`))).toBe(true);
    }
  });

  it("writes README.md referencing the new widget row + click-wrappers", () => {
    const readme = readFileSync(resolve(ROOT, "README.md"), "utf-8");
    expect(readme).toContain("THIS FILE IS REGENERATED WEEKLY");
    expect(readme).toContain("assets/widgets/hero.svg");
    expect(readme).toContain("assets/widgets/featured.svg");
    expect(readme).toContain("assets/widgets/currently.svg");
    expect(readme).toContain("assets/widgets/signature.svg");
    expect(readme).toContain("https://github.com/Philotheephilix?tab=repositories");
    expect(readme).toContain("https://github.com/Philotheephilix");
    expect(readme).toContain("https://philotheephilix.in");
  });

  it("does NOT contain the old markdown text sections", () => {
    const readme = readFileSync(resolve(ROOT, "README.md"), "utf-8");
    expect(readme).not.toContain("## FEATURED");
    expect(readme).not.toContain("## CURRENTLY");
    expect(readme).not.toContain("## SIGNATURE");
  });
});
