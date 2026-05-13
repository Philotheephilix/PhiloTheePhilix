import OpenAI from "openai";
import { pickByWeek } from "./week-rotation.js";

export interface ManifestoContext {
  identity: string;
  currently: string[];
  recentCommitThemes: string[];
  seedLines: string[];
  fallbackPool: string[];
  now: Date;
}

export type ManifestoGenerator = (prompt: string) => Promise<string>;

export function sanitizeManifesto(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const unquoted = trimmed.replace(/^["']|["']$/g, "");
  return unquoted.toLowerCase().slice(0, 80);
}

export function buildPrompt(ctx: ManifestoContext): string {
  const seedSample = ctx.seedLines.slice(0, 3).join("; ");
  const commitThemes = ctx.recentCommitThemes.slice(0, 5).join("; ");
  return [
    "You write one-line manifestos for a developer's GitHub profile.",
    "Style: lowercase, terse, no fluff, no emojis, no buzzwords. 6-12 words.",
    "Reads like a thought, not a slogan. Never starts with \"i\" or \"we\".",
    "",
    `identity: ${ctx.identity}`,
    `currently: ${ctx.currently.join("; ")}`,
    `recent commit themes: ${commitThemes || "n/a"}`,
    `seed words: ${seedSample}`,
    "",
    "return: a single line. no quotes. no explanation.",
  ].join("\n");
}

export async function generateManifesto(
  ctx: ManifestoContext,
  gen: ManifestoGenerator,
): Promise<string> {
  const fallback = () => pickByWeek(ctx.fallbackPool, ctx.now);
  try {
    const prompt = buildPrompt(ctx);
    const raw = await gen(prompt);
    const clean = sanitizeManifesto(raw);
    return clean || fallback();
  } catch {
    return fallback();
  }
}

export function createOpenAIGenerator(model = "gpt-4o-mini"): ManifestoGenerator {
  const client = new OpenAI();
  return async (prompt: string) => {
    const res = await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.85,
      max_tokens: 60,
    });
    return res.choices[0]?.message?.content ?? "";
  };
}
