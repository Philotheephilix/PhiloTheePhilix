import { svgDocument, tspan, TUI_PALETTE, animationStyle, radarPingCircle } from "../lib/svg.js";

export interface BookCallInput {
  handle: string;
}

export function renderBookCall(input: BookCallInput): string {
  const children =
    animationStyle(["@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}.cursor{animation:blink 1.1s step-end infinite}"]) +
    tspan("BOOK A CALL", { x: 14, y: 22, fill: TUI_PALETTE.dim, size: 10, letterSpacing: 1.8 }) +
    radarPingCircle({ cx: 270, cy: 18, durationMs: 2200, stroke: TUI_PALETTE.green }) +
    `<circle cx="270" cy="18" r="2.5" fill="${TUI_PALETTE.green}"/>` +
    tspan("SPEAK WITH ME", { x: 14, y: 64, fill: TUI_PALETTE.cyan, size: 18, weight: 700 }) +
    tspan(`cal.com/${input.handle}`, { x: 14, y: 96, fill: TUI_PALETTE.white, size: 12 }) +
    `<text x="${14 + input.handle.length * 7.2 + 60}" y="96" fill="${TUI_PALETTE.green}" font-family="'JetBrains Mono', 'Menlo', monospace" font-size="12" font-weight="600" class="cursor" xml:space="preserve">→</text>`;
  return svgDocument({ width: 300, height: 120, children });
}
