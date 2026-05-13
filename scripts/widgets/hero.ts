import { renderBanner } from "../lib/figlet.js";
import {
  svgDocument,
  tspan,
  TUI_PALETTE,
  animationStyle,
  cursorSpan,
} from "../lib/svg.js";

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

  children.push(
    animationStyle([
      "@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}",
      ".cursor{animation:blink 1s steps(1) infinite}",
    ]),
  );

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

  const subtitleText = `// ${input.subtitle}`;
  const subtitleWidth = subtitleText.length * 7.5;
  children.push(`<clipPath id="hero-sub-reveal"><rect x="${PADDING_X}" y="${y - LINE_HEIGHT}" height="${LINE_HEIGHT * 1.5}" width="0"><animate attributeName="width" from="0" to="${subtitleWidth}" dur="1.2s" begin="0.1s" fill="freeze"/></rect></clipPath>`);
  children.push(`<g clip-path="url(#hero-sub-reveal)">${tspan(subtitleText, { x: PADDING_X, y, fill: TUI_PALETTE.white, size: 13 })}</g>`);
  const subtitleEndX = PADDING_X + subtitleWidth;
  children.push(cursorSpan({ x: subtitleEndX + 2, y, fill: TUI_PALETTE.white, size: 13 }));

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
