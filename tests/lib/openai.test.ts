import { describe, it, expect, vi } from "vitest";
import {
  sanitizeManifesto,
  generateManifesto,
  type ManifestoGenerator,
} from "../../scripts/lib/openai.js";

describe("sanitizeManifesto", () => {
  it("strips wrapping quotes", () => {
    expect(sanitizeManifesto('"rails before runtime"')).toBe("rails before runtime");
    expect(sanitizeManifesto("'rails before runtime'")).toBe("rails before runtime");
  });
  it("lowercases and trims", () => {
    expect(sanitizeManifesto("  Rails Before Runtime  ")).toBe("rails before runtime");
  });
  it("caps length to 80 chars", () => {
    const long = "x".repeat(120);
    expect(sanitizeManifesto(long).length).toBe(80);
  });
  it("returns empty string for empty input", () => {
    expect(sanitizeManifesto("")).toBe("");
    expect(sanitizeManifesto("   ")).toBe("");
  });
});

describe("generateManifesto", () => {
  const baseCtx = {
    identity: "rails between ai and on-chain money",
    currently: ["shipping ai agents", "building starkbase", "fucking linux"],
    recentCommitThemes: ["fix featured cards", "ship widget"],
    seedLines: ["rails before runtime"],
    fallbackPool: ["agents are the new apis"],
    now: new Date("2026-05-13T00:00:00Z"),
  };
  it("returns the LLM output when API call succeeds", async () => {
    const mockGen: ManifestoGenerator = vi.fn().mockResolvedValue("the model is the api");
    const out = await generateManifesto(baseCtx, mockGen);
    expect(out).toBe("the model is the api");
    expect(mockGen).toHaveBeenCalledOnce();
  });
  it("falls back to pickByWeek(fallback_pool) when API throws", async () => {
    const mockGen: ManifestoGenerator = vi.fn().mockRejectedValue(new Error("rate limited"));
    const out = await generateManifesto(baseCtx, mockGen);
    expect(out).toBe("agents are the new apis");
  });
  it("falls back when API returns empty", async () => {
    const mockGen: ManifestoGenerator = vi.fn().mockResolvedValue("   ");
    const out = await generateManifesto(baseCtx, mockGen);
    expect(out).toBe("agents are the new apis");
  });
  it("sanitizes the LLM output", async () => {
    const mockGen: ManifestoGenerator = vi.fn().mockResolvedValue('"The Model Is The API"');
    const out = await generateManifesto(baseCtx, mockGen);
    expect(out).toBe("the model is the api");
  });
});
