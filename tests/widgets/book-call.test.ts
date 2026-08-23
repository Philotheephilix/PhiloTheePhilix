import { describe, it, expect } from "vitest";
import { renderBookCall } from "../../scripts/widgets/book-call.js"
describe("renderBookCall", () => {
  it("renders rani field with cal.com handle", () => {
    const svg = renderBookCall({ handle: "philotheephilix" })
    expect(svg).toContain("#C21484")
    expect(svg).toContain("philotheephilix")
  })
  it("is 300px wide", () => {
    expect(renderBookCall({ handle: "test" })).toContain('width="300"')
  })
})
