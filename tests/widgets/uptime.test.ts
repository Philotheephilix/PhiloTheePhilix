import { describe, it, expect } from "vitest";
import { renderUptime } from "../../scripts/widgets/uptime.js"
describe("renderUptime", () => {
  it("renders bottle field with uptime and repo count", () => {
    const svg = renderUptime({ uptime: "4 yrs", publicRepos: 54 })
    expect(svg).toContain("#1B5A48")
    expect(svg).toContain("4 yrs")
    expect(svg).toContain("54")
  })
  it("is 300px wide", () => {
    expect(renderUptime({ uptime: "1 yr", publicRepos: 10 })).toContain('width="300"')
  })
})
