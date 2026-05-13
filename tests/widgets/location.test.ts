import { describe, it, expect } from "vitest";
import { renderLocation } from "../../scripts/widgets/location.js";

describe("renderLocation", () => {
  it("renders LOC label with coords", () => {
    const svg = renderLocation({
      label: "CHENNAI · IST",
      coords: { lat: 13.08, lon: 80.27 },
    });
    expect(svg).toContain("LOC");
    expect(svg).toContain("CHENNAI");
    expect(svg).toContain("13.08");
    expect(svg).toContain("80.27");
  });
});

describe("location animation", () => {
  it("includes a <circle> with SMIL r animation (radar ping)", () => {
    const svg = renderLocation({
      label: "CHENNAI · IST",
      coords: { lat: 13.08, lon: 80.27 },
    });
    expect(svg).toContain("<circle");
    expect(svg).toMatch(/<animate[^>]*attributeName="r"/);
    expect(svg).toMatch(/<animate[^>]*attributeName="opacity"/);
  });
});
