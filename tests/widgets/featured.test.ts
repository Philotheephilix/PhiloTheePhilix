import { describe, it, expect } from "vitest";
import { renderFeatured } from "../../scripts/widgets/featured.js";

const ITEMS = [
  { repo: "user/starkbase", blurb: "baas for web3.", tags: ["baas", "apis"], private: false },
  { repo: "user/ai-browse", blurb: "ai steering a browser.", tags: ["agents"], private: false },
  { repo: "user/lbm-linux", blurb: "linux port of littlebigmouse.", tags: ["rust", "linux"], private: true },
];

describe("renderFeatured", () => {
  it("renders a FEATURED caption with item count", () => {
    const svg = renderFeatured({ items: ITEMS });
    expect(svg).toMatch(/FEATURED.{0,4}3/);
  });
  it("includes uppercase repo names extracted from owner/repo", () => {
    const svg = renderFeatured({ items: ITEMS });
    expect(svg).toContain("STARKBASE");
    expect(svg).toContain("AI-BROWSE");
    expect(svg).toContain("LBM-LINUX");
  });
  it("renders blurbs verbatim", () => {
    const svg = renderFeatured({ items: ITEMS });
    expect(svg).toContain("baas for web3.");
  });
  it("renders comma-joined tags", () => {
    const svg = renderFeatured({ items: ITEMS });
    expect(svg).toContain("baas, apis");
  });
  it("marks private items with 'private' and public with 'public'", () => {
    const svg = renderFeatured({ items: ITEMS });
    const privateMatches = svg.match(/private/g) ?? [];
    const publicMatches = svg.match(/public/g) ?? [];
    expect(privateMatches.length).toBeGreaterThanOrEqual(1);
    expect(publicMatches.length).toBeGreaterThanOrEqual(2);
  });
  it("handles empty items list gracefully (no crash, valid SVG)", () => {
    const svg = renderFeatured({ items: [] });
    expect(svg).toMatch(/^<svg[\s\S]+<\/svg>$/);
  });
});
