import { describe, it, expect } from "vitest";
import { loadProfile } from "../../scripts/lib/yaml.js";

describe("loadProfile", () => {
  it("loads profile.yml and returns typed data", () => {
    const p = loadProfile();
    expect(p.hero.handle).toBe("PHILOTHEEPHILIX");
    expect(p.hero.tokens).toEqual(["ETH", "STRK", "USDC"]);
    expect(p.currently).toHaveLength(3);
    expect(p.featured).toHaveLength(3);
    expect(p.hackathon.wins).toBe(24);
    expect(p.hackathon.played).toBe(42);
    expect(p.availability.accept).toBe("ai × web3 collabs · hiring offers");
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

describe("profile.manifesto", () => {
  it("loads manifesto.seed_lines and manifesto.fallback_pool", () => {
    const p = loadProfile();
    expect(Array.isArray(p.manifesto.seed_lines)).toBe(true);
    expect(p.manifesto.seed_lines.length).toBeGreaterThan(0);
    expect(Array.isArray(p.manifesto.fallback_pool)).toBe(true);
    expect(p.manifesto.fallback_pool.length).toBeGreaterThan(0);
  });
});
