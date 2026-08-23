import { renderCurrently } from "../../scripts/widgets/currently.js"

describe("renderCurrently", () => {
  it("renders items — vermilion field", () => {
    const svg = renderCurrently({ items: ["shipping ai agents", "building starkbase"] })
    expect(svg).toContain("#C93001")
    expect(svg).toContain("shipping ai agents")
  })
  it("is 300px wide", () => {
    expect(renderCurrently({ items: ["x"] })).toContain('width="300"')
  })
})
