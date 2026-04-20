import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";
import type { ActiveLoop } from "../lib/github.js";

export interface ActiveLoopsInput {
  loops: ActiveLoop[];
}

const GLYPH = { shipping: "●", iterating: "◐", idle: "○" } as const;
const COLOR = {
  shipping: TUI_PALETTE.green,
  iterating: TUI_PALETTE.amber,
  idle: TUI_PALETTE.dim,
} as const;

export function renderActiveLoops(input: ActiveLoopsInput): string {
  const children: string[] = [
    tspan("ACTIVE LOOPS", {
      x: 14,
      y: 22,
      fill: TUI_PALETTE.dim,
      size: 10,
      letterSpacing: 1.8,
    }),
  ];
  if (input.loops.length === 0) {
    children.push(
      tspan("○ idle — no active loops this week", {
        x: 14,
        y: 48,
        fill: TUI_PALETTE.dim,
        size: 12,
      }),
    );
    return svgDocument({ width: 300, height: 140, children: children.join("") });
  }

  let y = 48;
  for (const loop of input.loops.slice(0, 5)) {
    children.push(
      tspan(GLYPH[loop.status], {
        x: 14,
        y,
        fill: COLOR[loop.status],
        size: 13,
      }),
    );
    children.push(
      tspan(loop.name, { x: 34, y, fill: TUI_PALETTE.white, size: 12 }),
    );
    children.push(
      tspan(loop.status, {
        x: 220,
        y,
        fill: COLOR[loop.status],
        size: 11,
      }),
    );
    y += 20;
  }
  return svgDocument({
    width: 300,
    height: Math.max(140, y + 10),
    children: children.join(""),
  });
}
