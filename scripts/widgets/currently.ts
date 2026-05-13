import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";

export interface CurrentlyInput {
  items: string[];
}

export function renderCurrently(input: CurrentlyInput): string {
  const HEADER_Y = 22;
  const TITLE_Y = 46;
  const ITEMS_START_Y = 68;
  const LINE_H = 20;
  const height = 30 + 22 + input.items.length * LINE_H + 14;

  const children: string[] = [
    tspan("CURRENTLY", {
      x: 14,
      y: HEADER_Y,
      fill: TUI_PALETTE.dim,
      size: 10,
      letterSpacing: 1.8,
    }),
    tspan("CURRENTLY", {
      x: 14,
      y: TITLE_Y,
      fill: TUI_PALETTE.white,
      size: 12,
      weight: 600,
    }),
  ];

  for (let i = 0; i < input.items.length; i++) {
    const isLast = i === input.items.length - 1;
    const glyph = isLast ? "└─" : "├─";
    const line = `  ${glyph} ${input.items[i]}`;
    children.push(
      tspan(line, {
        x: 14,
        y: ITEMS_START_Y + i * LINE_H,
        fill: TUI_PALETTE.white,
        size: 12,
      }),
    );
  }

  return svgDocument({ width: 300, height: Math.max(80, height), children: children.join("") });
}
