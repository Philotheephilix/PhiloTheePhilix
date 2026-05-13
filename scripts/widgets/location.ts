import { svgDocument, tspan, TUI_PALETTE, radarPingCircle } from "../lib/svg.js";

export interface LocationInput {
  label: string;
  coords: { lat: number; lon: number };
}

const MAP = [
  "         .──.                     ",
  "    .──'      `──.    ___         ",
  "   /    NA        \\  /   \\  EU   ",
  "  |   ◯         __|/  AS  \\___    ",
  "  |      ___.──'            `──.  ",
  "   \\    /        AF   ●          `.",
  "    `──'              IN           \\",
  "         \\    ___.──.──./          /",
  "          `──/   OC  /  `──.──.──' ",
  "             `──.──'               ",
].join("\n");

const PIN_X = 127;
const PIN_Y = 97;

export function renderLocation(input: LocationInput): string {
  const lines = MAP.split("\n");
  const children: string[] = [
    tspan("LOCATION", { x: 14, y: 22, fill: TUI_PALETTE.dim, size: 10, letterSpacing: 1.8 }),
  ];
  let y = 42;
  for (const line of lines) {
    children.push(tspan(line, { x: 14, y, fill: TUI_PALETTE.cyan, size: 9 }));
    y += 11;
  }
  children.push(
    radarPingCircle({ cx: PIN_X, cy: PIN_Y, durationMs: 3000, stroke: TUI_PALETTE.green }),
  );
  children.push(
    tspan(
      `LOC: ${input.coords.lat.toFixed(2)}°N ${input.coords.lon.toFixed(2)}°E · ${input.label}`,
      { x: 14, y: y + 14, fill: TUI_PALETTE.white, size: 10 },
    ),
  );
  return svgDocument({ width: 300, height: y + 30, children: children.join("") });
}
