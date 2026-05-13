export const TUI_PALETTE = {
  bg: "#0d1117",
  green: "#7bd88f",
  amber: "#ffb454",
  cyan: "#7ac6ff",
  white: "#d0d0d0",
  dim: "rgba(255,255,255,0.5)",
} as const;

const BLOCKS = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"] as const;

export function sparkline(values: number[]): string {
  if (values.length === 0) return "";
  const max = Math.max(...values);
  if (max === 0) return "▁".repeat(values.length);
  return values
    .map((v) => {
      const idx = Math.min(
        BLOCKS.length - 1,
        Math.floor((v / max) * (BLOCKS.length - 1)),
      );
      return BLOCKS[idx] ?? "▁";
    })
    .join("");
}

export function box(lines: string[]): string {
  const width = Math.max(...lines.map((l) => [...l].length));
  const padded = lines.map((l) => {
    const chars = [...l];
    return l + " ".repeat(width - chars.length);
  });
  const top = "┌─" + "─".repeat(width) + "─┐";
  const body = padded.map((l) => `│ ${l} │`);
  const bottom = "└─" + "─".repeat(width) + "─┘";
  return [top, ...body, bottom].join("\n");
}

export interface SvgDocumentOptions {
  width: number;
  height: number;
  children: string;
  background?: string;
}

export function svgDocument(opts: SvgDocumentOptions): string {
  const bg = opts.background ?? TUI_PALETTE.bg;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${opts.width}" height="${opts.height}" viewBox="0 0 ${opts.width} ${opts.height}"><rect width="100%" height="100%" fill="${bg}"/>${opts.children}</svg>`;
}

export interface TextOptions {
  x: number;
  y: number;
  fill?: string;
  size?: number;
  weight?: number;
  letterSpacing?: number;
}

export function tspan(text: string, opts: TextOptions): string {
  const fill = opts.fill ?? TUI_PALETTE.white;
  const size = opts.size ?? 12;
  const weight = opts.weight ?? 400;
  const ls = opts.letterSpacing ?? 0;
  const safe = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<text x="${opts.x}" y="${opts.y}" fill="${fill}" font-family="'JetBrains Mono', 'Menlo', monospace" font-size="${size}" font-weight="${weight}" letter-spacing="${ls}" xml:space="preserve">${safe}</text>`;
}

export function animationStyle(keyframes: string[]): string {
  return `<style>${keyframes.join("")}</style>`;
}

export interface CursorSpanOptions {
  x: number;
  y: number;
  fill: string;
  size?: number;
}

export function cursorSpan(opts: CursorSpanOptions): string {
  const size = opts.size ?? 13;
  return `<text x="${opts.x}" y="${opts.y}" fill="${opts.fill}" font-family="'JetBrains Mono', 'Menlo', monospace" font-size="${size}" font-weight="600" class="cursor" xml:space="preserve">_</text>`;
}

export interface ClipPathRevealOptions {
  id: string;
  width: number;
  durationMs: number;
  beginMs?: number;
}

export function clipPathReveal(opts: ClipPathRevealOptions): string {
  const begin = opts.beginMs ? `${opts.beginMs / 1000}s` : "0s";
  return `<clipPath id="${opts.id}"><rect x="0" y="0" height="100%" width="0"><animate attributeName="width" from="0" to="${opts.width}" begin="${begin}" dur="${opts.durationMs / 1000}s" fill="freeze"/></rect></clipPath>`;
}

export function pulseAnimate(): string {
  return [
    "@keyframes pulse-shipping{0%,100%{opacity:0.4}50%{opacity:1}}",
    "@keyframes pulse-iter{0%,100%{opacity:0.5}50%{opacity:0.9}}",
    ".pulse-shipping{animation:pulse-shipping 2s ease-in-out infinite}",
    ".pulse-iter{animation:pulse-iter 3s ease-in-out infinite}",
  ].join("");
}

export function hueDriftAnimate(fromColor: string, toColor: string): string {
  return [
    `@keyframes hue-drift{0%,100%{fill:${fromColor}}50%{fill:${toColor}}}`,
    `.hue-drift{animation:hue-drift 6s ease-in-out infinite}`,
  ].join("");
}

export interface RadarPingOptions {
  cx: number;
  cy: number;
  durationMs: number;
  stroke?: string;
}

export function radarPingCircle(opts: RadarPingOptions): string {
  const stroke = opts.stroke ?? TUI_PALETTE.green;
  const dur = `${opts.durationMs / 1000}s`;
  return `<circle cx="${opts.cx}" cy="${opts.cy}" r="2" fill="none" stroke="${stroke}" stroke-width="1.5"><animate attributeName="r" from="2" to="14" dur="${dur}" repeatCount="indefinite"/><animate attributeName="opacity" from="1" to="0" dur="${dur}" repeatCount="indefinite"/></circle>`;
}
