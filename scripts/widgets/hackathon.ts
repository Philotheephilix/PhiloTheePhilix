import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";

export interface HackathonInput {
  wins: number;
  played: number;
  win_ratio_display: string;
}

export function renderHackathon(input: HackathonInput): string {
  const losses = input.played - input.wins;
  const label = `[ ${input.wins}W · ${losses}L · ${input.played} PLAYED · ${input.win_ratio_display} WIN ]`;
  const barCells = 20;
  const filled = Math.round((input.wins / Math.max(input.played, 1)) * barCells);
  const bar = "█".repeat(filled) + "░".repeat(barCells - filled);
  return svgDocument({
    width: 300,
    height: 110,
    children:
      tspan("HACKATHON LEDGER", {
        x: 14, y: 22, fill: TUI_PALETTE.dim, size: 10, letterSpacing: 1.8,
      }) +
      tspan(label, {
        x: 14, y: 52, fill: TUI_PALETTE.green, size: 11, weight: 600,
      }) +
      tspan(bar, {
        x: 14, y: 84, fill: TUI_PALETTE.green, size: 14,
      }),
  });
}
