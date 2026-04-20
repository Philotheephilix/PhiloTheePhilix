import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";

export const CHAIN_CODES = [
  "EVM",
  "STK",
  "XLM",
  "STX",
  "APT",
  "FLW",
  "CEL",
  "MNT",
  "EGN",
] as const;

export type ChainCode = (typeof CHAIN_CODES)[number];

export interface ChainsInput {
  freshness: Record<string, number>;
}

function colorFor(days: number): string {
  if (days <= 14) return TUI_PALETTE.green;
  if (days <= 60) return TUI_PALETTE.amber;
  return TUI_PALETTE.dim;
}

export function renderChains(input: ChainsInput): string {
  const cols = 3;
  const cellW = 88;
  const cellH = 28;
  const originX = 14;
  const originY = 42;
  const children: string[] = [
    tspan("CHAINS ONLINE · 9", {
      x: 14,
      y: 22,
      fill: TUI_PALETTE.dim,
      size: 10,
      letterSpacing: 1.8,
    }),
  ];
  CHAIN_CODES.forEach((code, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const x = originX + c * cellW;
    const y = originY + r * cellH;
    const days = input.freshness[code] ?? Infinity;
    const fill = colorFor(days);
    children.push(tspan(`[ ${code} ]`, { x, y, fill, size: 12, weight: 600 }));
  });
  const height = originY + 3 * cellH + 10;
  return svgDocument({ width: 300, height, children: children.join("") });
}
