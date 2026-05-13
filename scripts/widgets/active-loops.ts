import { svgDocument, tspan, TUI_PALETTE, animationStyle, pulseAnimate } from "../lib/svg.js";
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
const PULSE_CLASS = {
  shipping: "pulse-shipping",
  iterating: "pulse-iter",
  idle: null,
} as const;

function glyphElement(status: ActiveLoop["status"], x: number, y: number): string {
  const cls = PULSE_CLASS[status];
  const classAttr = cls ? ` class="${cls}"` : "";
  return `<text x="${x}" y="${y}" fill="${COLOR[status]}" font-family="'JetBrains Mono', 'Menlo', monospace" font-size="13" font-weight="400"${classAttr} xml:space="preserve">${GLYPH[status]}</text>`;
}

export function renderActiveLoops(input: ActiveLoopsInput): string {
  const children: string[] = [
    animationStyle([pulseAnimate()]),
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
    children.push(glyphElement(loop.status, 14, y));
    children.push(tspan(loop.name, { x: 34, y, fill: TUI_PALETTE.white, size: 12 }));
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
