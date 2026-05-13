import { describe, it, expect } from "vitest";
import { renderSignature } from "../../scripts/widgets/signature.js";

const INPUT = {
  web: "philotheephilix.in",
  github: "@Philotheephilix",
  email: "philosanjay5@gmail.com",
  linkedin: "/in/philotheephilix",
  refreshNow: "2026-05-13",
  refreshNext: "2026-05-20",
};

describe("renderSignature", () => {
  it("renders the SIGNATURE caption", () => {
    expect(renderSignature(INPUT)).toContain("SIGNATURE");
  });
  it("includes all four signature values", () => {
    const svg = renderSignature(INPUT);
    expect(svg).toContain("philotheephilix.in");
    expect(svg).toContain("@Philotheephilix");
    expect(svg).toContain("philosanjay5@gmail.com");
    expect(svg).toContain("/in/philotheephilix");
  });
  it("renders refresh-dates line", () => {
    const svg = renderSignature(INPUT);
    expect(svg).toContain("2026-05-13");
    expect(svg).toContain("2026-05-20");
    expect(svg).toMatch(/last refresh.+next/i);
  });
  it("includes web/gh/mail/linkedin label words", () => {
    const svg = renderSignature(INPUT);
    expect(svg).toContain("web");
    expect(svg).toContain("gh");
    expect(svg).toContain("mail");
    expect(svg).toContain("linkedin");
  });
});
