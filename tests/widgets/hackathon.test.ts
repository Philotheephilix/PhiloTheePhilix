import { describe, it, expect } from "vitest";
import { renderHackathon } from "../../scripts/widgets/hackathon.js"
describe("renderHackathon", () => {
  it("renders rani field with win stats", () => {
    const svg = renderHackathon({ wins: 24, played: 42, win_ratio_display: "57%" })
    expect(svg).toContain("#C21484")
    expect(svg).toContain("24")
    expect(svg).toContain("57%")
  })
  it("is 300px wide", () => {
    expect(renderHackathon({ wins: 1, played: 2, win_ratio_display: "50%" })).toContain('width="300"')
  })
})
