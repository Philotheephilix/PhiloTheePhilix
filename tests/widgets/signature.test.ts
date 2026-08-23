import { describe, it, expect } from "vitest";
import { renderSignature } from "../../scripts/widgets/signature.js"
const base = { web: "philotheephilix.in", github: "@Philotheephilix", email: "philosanjay5@gmail.com", linkedin: "/in/philotheephilix", refreshNow: "2026-08-23", refreshNext: "2026-08-30" }
describe("renderSignature", () => {
  it("renders cream field with contact data", () => {
    const svg = renderSignature(base)
    expect(svg).toContain("#FFF4E4")
    expect(svg).toContain("philotheephilix.in")
  })
  it("is 300px wide", () => {
    expect(renderSignature(base)).toContain('width="300"')
  })
})
