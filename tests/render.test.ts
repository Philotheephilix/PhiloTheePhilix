import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { renderFromFixtures } from "../scripts/render.js";

const ROOT = process.cwd();

describe("render (fixture mode)", () => {
  beforeAll(async () => {
    await renderFromFixtures();
  });

  it("writes all 9 widget SVGs", () => {
    const names = [
      "hero",
      "activity",
      "active-loops",
      "chains",
      "shipped-this-week",
      "uptime",
      "hackathon",
      "availability",
      "now-playing",
      "location",
    ];
    for (const n of names) {
      expect(existsSync(resolve(ROOT, `assets/widgets/${n}.svg`))).toBe(true);
    }
  });

  it("writes README.md with expected anchors", () => {
    const readme = readFileSync(resolve(ROOT, "README.md"), "utf-8");
    expect(readme).toContain("## FEATURED");
    expect(readme).toContain("## CURRENTLY");
    expect(readme).toContain("## SIGNATURE");
    expect(readme).toContain("STARKBASE");
    expect(readme).toContain("LITTLEBIGMOUSELINUX");
    expect(readme).toContain("shipping ai agents at tenori labs");
    expect(readme).toContain("THIS FILE IS REGENERATED WEEKLY");
  });
});
