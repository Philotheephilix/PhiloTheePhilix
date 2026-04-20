import { describe, it, expect } from "vitest";
import { renderChains, CHAIN_CODES } from "../../scripts/widgets/chains.js";

describe("renderChains", () => {
  it("includes all 9 chain codes in a grid", () => {
    const svg = renderChains({
      freshness: Object.fromEntries(CHAIN_CODES.map((c) => [c, 30])) as Record<string, number>,
    });
    for (const code of CHAIN_CODES) {
      expect(svg).toContain(`[ ${code} ]`);
    }
    expect(svg).toContain("CHAINS ONLINE · 9");
  });

  it("colors recent chains in green and stale chains in dim", () => {
    const svg = renderChains({
      freshness: { EVM: 1, STK: 200, XLM: 0, STX: 0, APT: 0, FLW: 0, CEL: 0, MNT: 0, EGN: 0 },
    });
    expect(svg).toContain("#7bd88f");
    expect(svg).toContain("rgba(255,255,255,0.5)");
  });
});
