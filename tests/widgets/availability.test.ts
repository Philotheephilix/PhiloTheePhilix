import { renderAvailability } from "../../scripts/widgets/availability.js"

describe("renderAvailability", () => {
  it("renders accept/maybe/decline — cream field", () => {
    const svg = renderAvailability({ accept: "ai × web3", maybe: "freelance", decline: "—" })
    expect(svg).toContain("#FFF4E4")
    expect(svg).toContain("ai × web3")
    expect(svg).toContain("open to")
  })
  it("is 300px wide", () => {
    expect(renderAvailability({ accept: "a", maybe: "b", decline: "c" })).toContain('width="300"')
  })
})
