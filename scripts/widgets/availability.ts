import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";

export interface AvailabilityInput {
  accept: string;
  maybe: string;
  decline: string;
}

export function renderAvailability(input: AvailabilityInput): string {
  const children =
    tspan("OPEN TO", { x: 14, y: 22, fill: TUI_PALETTE.dim, size: 10, letterSpacing: 1.8 }) +
    tspan("ACCEPT", { x: 14, y: 52, fill: TUI_PALETTE.green, size: 11, weight: 700 }) +
    tspan(`- ${input.accept}`, { x: 80, y: 52, fill: TUI_PALETTE.white, size: 11 }) +
    tspan("MAYBE", { x: 14, y: 76, fill: TUI_PALETTE.amber, size: 11, weight: 700 }) +
    tspan(`- ${input.maybe}`, { x: 80, y: 76, fill: TUI_PALETTE.white, size: 11 }) +
    tspan("DECLINE", { x: 14, y: 100, fill: TUI_PALETTE.dim, size: 11, weight: 700 }) +
    tspan(`- ${input.decline}`, { x: 80, y: 100, fill: TUI_PALETTE.dim, size: 11 });
  return svgDocument({ width: 300, height: 120, children });
}
