import { describe, it, expect } from "vitest";
import { computeChainFreshness } from "../../scripts/lib/chain-map.js";

describe("computeChainFreshness", () => {
  it("maps primary language to chain code", () => {
    const now = new Date("2026-04-21T00:00:00Z");
    const repos = [
      {
        name: "solidity-thing",
        pushedAt: "2026-04-20T00:00:00Z",
        primaryLanguage: "Solidity",
      },
      {
        name: "cairo-thing",
        pushedAt: "2026-04-10T00:00:00Z",
        primaryLanguage: "Cairo",
      },
    ];
    const f = computeChainFreshness(repos, {}, now);
    expect(f.EVM).toBe(1);
    expect(f.STK).toBe(11);
    expect(f.FLW).toBeUndefined();
  });

  it("honors overrides from profile.yml", () => {
    const now = new Date("2026-04-21T00:00:00Z");
    const repos = [
      {
        name: "ccre",
        pushedAt: "2026-04-15T00:00:00Z",
        primaryLanguage: "TypeScript",
      },
    ];
    const f = computeChainFreshness(repos, { CEL: ["ccre"] }, now);
    expect(f.CEL).toBe(6);
  });
});
