import { describe, it, expect } from "vitest";
import { renderShippedThisWeek } from "../../scripts/widgets/shipped-this-week.js";

describe("renderShippedThisWeek", () => {
  it("shows up to 3 recent commits", () => {
    const svg = renderShippedThisWeek({
      commits: [
        { sha: "abc1234", message: "feat: x", repo: "u/a" },
        { sha: "def5678", message: "fix: y", repo: "u/b" },
        null,
      ],
    });
    expect(svg).toContain("SHIPPED THIS WEEK");
    expect(svg).toContain("abc1234");
    expect(svg).toContain("feat: x");
    expect(svg).toContain("nothing shipped");
  });
});
