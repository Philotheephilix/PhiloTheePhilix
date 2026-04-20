import { describe, it, expect } from "vitest";
import { renderUptime } from "../../scripts/widgets/uptime.js";

describe("renderUptime", () => {
  it("renders uptime and repo count", () => {
    const svg = renderUptime({ uptime: "3y 9mo", publicRepos: 54 });
    expect(svg).toContain("UPTIME");
    expect(svg).toContain("3y 9mo");
    expect(svg).toContain("REPOS");
    expect(svg).toContain("54");
  });
});
