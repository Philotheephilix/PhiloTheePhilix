import { describe, it, expect } from "vitest";
import { renderAvailability } from "../../scripts/widgets/availability.js";

describe("renderAvailability", () => {
  it("renders accept/maybe/decline lines", () => {
    const svg = renderAvailability({
      accept: "ai × web3 collabs",
      maybe: "paid freelance",
      decline: "hiring offers",
    });
    expect(svg).toContain("ACCEPT");
    expect(svg).toContain("ai × web3 collabs");
    expect(svg).toContain("MAYBE");
    expect(svg).toContain("DECLINE");
  });
});
