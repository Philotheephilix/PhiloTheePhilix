import { describe, it, expect } from "vitest";
import { loadProfile } from "../../scripts/lib/yaml.js";

describe("loadProfile", () => {
  it("loads profile.yml and returns typed data", () => {
    const p = loadProfile();
    expect(p.hero.handle).toBe("PHILOTHEEPHILIX");
    expect(p.hero.tokens).toEqual(["ETH", "STRK", "USDC"]);
    expect(p.currently).toHaveLength(3);
    expect(p.featured).toHaveLength(3);
    expect(p.hackathon.wins).toBe(23);
    expect(p.hackathon.played).toBe(40);
    expect(p.availability.accept).toBe("ai × web3 collabs");
    expect(p.lastfm.username).toBe("");
  });

  it("marks LittleBigMouseLinux as private", () => {
    const p = loadProfile();
    const littleBigMouse = p.featured.find((f) =>
      f.repo.endsWith("LittleBigMouseLinux"),
    );
    expect(littleBigMouse?.private).toBe(true);
  });
});
