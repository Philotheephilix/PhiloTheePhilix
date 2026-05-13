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

describe("chains animation", () => {
  it("contains hue-drift keyframes in <style>", () => {
    const svg = renderChains({ freshness: { EVM: 1, STK: 30 } });
    expect(svg).toMatch(/<style>[\s\S]*@keyframes hue-drift[\s\S]*<\/style>/);
  });
  it("applies class=\"hue-drift\" to the freshest chain only", () => {
    const svg = renderChains({ freshness: { EVM: 1, STK: 30, XLM: 90 } });
    const hueMatches = svg.match(/class="hue-drift"/g) ?? [];
    expect(hueMatches).toHaveLength(1);
    expect(svg).toMatch(/class="hue-drift"[^>]*>\[ EVM \]/);
  });
  it("does not apply hue-drift if all chains are dormant (Infinity)", () => {
    const svg = renderChains({ freshness: {} });
    expect(svg).not.toMatch(/class="hue-drift"/);
  });
});
