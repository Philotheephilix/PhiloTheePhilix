import { describe, it, expect } from "vitest";
import { renderShippedThisWeek } from "../../scripts/widgets/shipped-this-week.js"
describe("renderShippedThisWeek", () => {
  it("renders maroon field with commit lines", () => {
    const svg = renderShippedThisWeek({ commits: [{ sha: "abc1234def", message: "fix: auth bug", repo: "org/starkbase" }] })
    expect(svg).toContain("#4A0B10")
    expect(svg).toContain("fix: auth bug")
  })
  it("renders null commit as dormant placeholder", () => {
    const svg = renderShippedThisWeek({ commits: [null] })
    expect(svg).toContain("nothing shipped")
  })
  it("is 300px wide", () => {
    expect(renderShippedThisWeek({ commits: [] })).toContain('width="300"')
  })
})
