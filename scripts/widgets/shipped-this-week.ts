import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";
import type { CommitRow } from "../lib/github.js";

export interface ShippedInput {
  commits: (CommitRow | null)[];
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + "…";
}

export function renderShippedThisWeek(input: ShippedInput): string {
  const children: string[] = [
    tspan("SHIPPED THIS WEEK", {
      x: 14,
      y: 22,
      fill: TUI_PALETTE.dim,
      size: 10,
      letterSpacing: 1.8,
    }),
  ];
  let y = 48;
  for (const c of input.commits) {
    if (c === null) {
      children.push(
        tspan("* ─── nothing shipped ───", {
          x: 14,
          y,
          fill: TUI_PALETTE.dim,
          size: 11,
        }),
      );
    } else {
      const sha = c.sha.slice(0, 7);
      const repoName = c.repo.split("/")[1] ?? c.repo;
      const line = `* ${sha} ${truncate(c.message, 26)} (${repoName})`;
      children.push(
        tspan(line, { x: 14, y, fill: TUI_PALETTE.white, size: 11 }),
      );
    }
    y += 18;
  }
  return svgDocument({ width: 300, height: y + 10, children: children.join("") });
}
