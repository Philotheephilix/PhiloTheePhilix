import { describe, it, expect } from "vitest";
import { renderFeatured } from "../../scripts/widgets/featured.js"
const items = [
  { repo: "Philotheephilix/starkbase", blurb: "backend for web3", tags: ["baas"], private: false },
  { repo: "Philotheephilix/ai-browse-control", blurb: "agentic browser", tags: ["agents"], private: false },
]
describe("renderFeatured", () => {
  it("renders turmeric field with repo names", () => {
    const svg = renderFeatured({ items })
    expect(svg).toContain("#FDCD2A")
    expect(svg).toContain("starkbase")
  })
  it("renders all items", () => {
    const svg = renderFeatured({ items })
    expect(svg).toContain("ai-browse-control")
  })
  it("is 300px wide", () => {
    expect(renderFeatured({ items: [items[0]!] })).toContain('width="300"')
  })
})
