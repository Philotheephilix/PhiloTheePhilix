import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";

export interface SkillsInput {
  repo: string;
}

const CLAUDE_ORANGE = "#cc7847";

function claudeLogo(cx: number, cy: number, scale: number): string {
  const petals: string[] = [];
  for (let i = 0; i < 6; i++) {
    const rotate = i * 60;
    petals.push(
      `<ellipse cx="0" cy="-14" rx="3.2" ry="14" transform="rotate(${rotate})"/>`,
    );
  }
  return `<g transform="translate(${cx},${cy}) scale(${scale})" fill="${CLAUDE_ORANGE}">${petals.join("")}</g>`;
}

export function renderSkills(input: SkillsInput): string {
  const repoTail = input.repo.split("/").pop() ?? input.repo;
  const children =
    tspan("SKILLS", {
      x: 14,
      y: 22,
      fill: TUI_PALETTE.dim,
      size: 10,
      letterSpacing: 1.8,
    }) +
    claudeLogo(54, 78, 1.1) +
    tspan("get my skills", {
      x: 110,
      y: 72,
      fill: TUI_PALETTE.white,
      size: 14,
      weight: 700,
    }) +
    tspan(`↗ ${repoTail}`, {
      x: 110,
      y: 94,
      fill: TUI_PALETTE.amber,
      size: 11,
      weight: 600,
    }) +
    tspan(input.repo, {
      x: 14,
      y: 132,
      fill: TUI_PALETTE.dim,
      size: 9,
    });
  return svgDocument({ width: 300, height: 140, children });
}
