import { svgDocument, tspan, TUI_PALETTE, animationStyle, hueDriftAnimate } from "../lib/svg.js";

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

function freshestChain(freshness: Record<string, number>): string | null {
  let best: string | null = null;
  let bestDays = Infinity;
  for (const code of CHAIN_CODES) {
    const d = freshness[code];
    if (typeof d === "number" && d < bestDays) {
      best = code;
      bestDays = d;
    }
  }
  return best;
}

export function renderChains(input: ChainsInput): string {
  const cols = 3;
  const cellW = 88;
  const cellH = 28;
  const originX = 14;
  const originY = 42;
  const freshest = freshestChain(input.freshness);
  const children: string[] = [
    animationStyle([hueDriftAnimate(TUI_PALETTE.green, "#bff0bb")]),
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
    const label = `[ ${code} ]`;
    if (code === freshest) {
      children.push(
        `<text x="${x}" y="${y}" fill="${fill}" font-family="'JetBrains Mono', 'Menlo', monospace" font-size="12" font-weight="600" class="hue-drift" xml:space="preserve">${label}</text>`,
      );
    } else {
      children.push(tspan(label, { x, y, fill, size: 12, weight: 600 }));
    }
  });
  const height = originY + 3 * cellH + 10;
  return svgDocument({ width: 300, height, children: children.join("") });
}
