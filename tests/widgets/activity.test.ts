import { renderActivity } from "../../scripts/widgets/activity.js"

describe("renderActivity", () => {
  it("renders with data — bottle field", () => {
    const svg = renderActivity({ daily: [1, 2, 3, 0, 4, 2, 1] })
    expect(svg).toContain("#1B5A48")
    expect(svg).toContain("shipping cadence")
  })
  it("renders fallback when no data", () => {
    const svg = renderActivity({ daily: [] })
    expect(svg).toContain("shipping cadence")
  })
  it("is 300px wide", () => {
    const svg = renderActivity({ daily: [1] })
    expect(svg).toContain('width="300"')
  })
})
