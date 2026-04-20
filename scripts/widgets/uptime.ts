import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";

export interface UptimeInput {
  uptime: string;
  publicRepos: number;
}

export function renderUptime(input: UptimeInput): string {
  const children =
    tspan("UPTIME", {
      x: 14, y: 22, fill: TUI_PALETTE.dim, size: 10, letterSpacing: 1.8,
    }) +
    tspan(input.uptime, {
      x: 14, y: 52, fill: TUI_PALETTE.green, size: 22, weight: 700,
    }) +
    tspan("REPOS (public)", {
      x: 14, y: 82, fill: TUI_PALETTE.dim, size: 10, letterSpacing: 1.8,
    }) +
    tspan(String(input.publicRepos), {
      x: 14, y: 112, fill: TUI_PALETTE.cyan, size: 22, weight: 700,
    });
  return svgDocument({ width: 300, height: 140, children });
}
