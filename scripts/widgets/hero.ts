import { renderBanner } from "../lib/figlet.js";
import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";

export interface HeroInput {
  handle: string;
  subtitle: string;
  location: string;
  year: number;
  tokens: string[];
}

const LINE_HEIGHT = 18;
const CHAR_WIDTH = 10.8;
const PADDING_X = 16;
const PADDING_Y = 20;

export function renderHero(input: HeroInput): string {
  const banner = renderBanner(input.handle, { maxCols: 80 });
  const bannerLines = banner.split("\n");
  const children: string[] = [`<title>${input.handle}</title>`];

  let y = PADDING_Y + LINE_HEIGHT;
  for (const line of bannerLines) {
    children.push(
      tspan(line, {
        x: PADDING_X,
        y,
        fill: TUI_PALETTE.green,
        size: 14,
        weight: 700,
      }),
    );
    y += LINE_HEIGHT;
  }

  y += 14;

  children.push(
    tspan(`// ${input.subtitle}`, {
      x: PADDING_X,
      y,
      fill: TUI_PALETTE.white,
      size: 13,
    }),
  );
  y += LINE_HEIGHT;
  children.push(
    tspan(
      `// ${input.location} · ai × web3 · ${input.year}`,
      { x: PADDING_X, y, fill: TUI_PALETTE.dim, size: 12 },
    ),
  );
  y += LINE_HEIGHT + 12;

  const tokenText = input.tokens.map((t) => `[ ${t} ]`).join("  ");
  children.push(
    tspan(tokenText, {
      x: PADDING_X,
      y,
      fill: TUI_PALETTE.cyan,
      size: 13,
      weight: 600,
    }),
  );

  const width = Math.max(
    900,
    Math.max(...bannerLines.map((l) => l.length)) * CHAR_WIDTH + PADDING_X * 2,
  );
  const height = y + PADDING_Y;
  return svgDocument({ width: Math.ceil(width), height, children: children.join("") });
}
