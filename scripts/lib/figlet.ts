import figlet from "figlet";

type FigletFont = NonNullable<
  NonNullable<Parameters<typeof figlet.textSync>[1]>["font"]
>;

const FONT_CASCADE = [
  "ANSI Shadow",
  "Slant",
  "Small",
  "Mini",
] as const satisfies readonly FigletFont[];

export interface BannerOptions {
  maxCols?: number;
}

export function renderBanner(
  text: string,
  opts: BannerOptions = {},
): string {
  const maxCols = opts.maxCols ?? 120;
  for (const font of FONT_CASCADE) {
    const rendered = figlet.textSync(text, { font });
    const widest = Math.max(...rendered.split("\n").map((l) => l.length));
    if (widest <= maxCols) return rendered;
  }
  return figlet.textSync(text, { font: "Mini" });
}
