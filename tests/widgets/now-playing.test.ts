import { describe, it, expect } from "vitest";
import { renderNowPlaying } from "../../scripts/widgets/now-playing.js";

describe("renderNowPlaying", () => {
  it("shows dormant state when no data", () => {
    const svg = renderNowPlaying({
      recent: { dormant: true },
      top: { dormant: true },
    });
    expect(svg).toContain("NO SCROBBLER · widget dormant");
  });

  it("shows current and top-of-week when data present", () => {
    const svg = renderNowPlaying({
      recent: { dormant: false, track: "Komorebi — asgeir" },
      top: { dormant: false, track: "Lo-fi beats — VA", plays: 47 },
    });
    expect(svg).toContain("NOW");
    expect(svg).toContain("Komorebi — asgeir");
    expect(svg).toContain("REPEAT THIS WEEK");
    expect(svg).toContain("Lo-fi beats — VA");
    expect(svg).toContain("47 plays");
  });
});
