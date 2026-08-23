import { describe, it, expect } from "vitest"
import { renderHero } from "../../scripts/widgets/hero.js"

const baseInput = {
  handle: "PHILOTHEEPHILIX",
  subtitle: "i build the rails between ai agents and on-chain money",
  location: "chennai",
  year: 2026,
  tokens: ["ETH", "STRK", "USDC"],
  manifesto: "the model is the api",
}

describe("renderHero", () => {
  it("produces a 900px wide SVG", () => {
    const svg = renderHero(baseInput)
    expect(svg).toContain('width="900"')
  })
  it("contains the handle text", () => {
    const svg = renderHero(baseInput)
    expect(svg.toLowerCase()).toContain("philotheephilix")
  })
  it("contains the subtitle", () => {
    const svg = renderHero(baseInput)
    expect(svg).toContain("rails between ai agents")
  })
  it("contains the manifesto line when provided", () => {
    const svg = renderHero(baseInput)
    expect(svg).toContain("the model is the api")
  })
  it("renders without manifesto", () => {
    const svg = renderHero({ ...baseInput, manifesto: undefined })
    expect(svg).toContain('width="900"')
  })
  it("contains token chips", () => {
    const svg = renderHero(baseInput)
    expect(svg).toContain("ETH")
    expect(svg).toContain("STRK")
  })
  it("includes the Archivo font import", () => {
    const svg = renderHero(baseInput)
    expect(svg).toContain("Archivo")
  })
  it("uses the vermilion field colour", () => {
    const svg = renderHero(baseInput)
    expect(svg).toContain("#C93001")
  })
})
