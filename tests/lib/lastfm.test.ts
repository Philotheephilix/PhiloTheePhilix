import { describe, it, expect } from "vitest";
import {
  parseRecentTrack,
  parseTopWeeklyTrack,
  type LastfmState,
} from "../../scripts/lib/lastfm.js";

describe("parseRecentTrack", () => {
  it("returns dormant when username is empty", () => {
    const s: LastfmState = parseRecentTrack(null, "");
    expect(s.dormant).toBe(true);
  });

  it("extracts current or last played track", () => {
    const payload = {
      recenttracks: {
        track: [
          {
            name: "Komorebi",
            artist: { "#text": "asgeir" },
            date: { uts: "1776700000" },
            "@attr": undefined,
          },
        ],
      },
    };
    const s = parseRecentTrack(payload, "philo");
    expect(s.dormant).toBe(false);
    expect(s.track).toBe("Komorebi — asgeir");
  });
});

describe("parseTopWeeklyTrack", () => {
  it("returns the most-played track of the week", () => {
    const payload = {
      toptracks: {
        track: [
          { name: "Lo-fi beats", artist: { name: "VA" }, playcount: "47" },
          { name: "Other", artist: { name: "X" }, playcount: "20" },
        ],
      },
    };
    const s = parseTopWeeklyTrack(payload, "philo");
    expect(s.track).toBe("Lo-fi beats — VA");
    expect(s.plays).toBe(47);
  });
});
