// ── Bandhani Fields design system ─────────────────────────────────────────

export const BAND = {
  vermilion:  "#DF3701",
  marigold:   "#E3701F",
  saffron:    "#F79623",
  turmeric:   "#FDCD2A",
  chrome:     "#FDDD15",
  rani:       "#E61DA2",
  bottle:     "#216A55",
  cream:      "#FFF4E4",
  maroon:     "#4A0B10",
  fieldVerm:  "#C93001",
  fieldRani:  "#C21484",
  fieldBottle:"#1B5A48",
} as const

// Backwards-compat alias
export const TUI_PALETTE = {
  bg:     BAND.maroon,
  green:  BAND.bottle,
  amber:  BAND.turmeric,
  cyan:   BAND.saffron,
  white:  BAND.cream,
  cream:  BAND.cream,
  dim:    "rgba(255,244,228,0.5)",
} as const

// ── SVG dot-pattern data URIs (inline, no external assets) ────────────────

export const PATTERNS = {
  flowerCream: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><g fill='%23FFF4E4'><circle cx='36' cy='36' r='3.2'/><circle cx='47' cy='36' r='2.5'/><circle cx='43.8' cy='43.8' r='2.5'/><circle cx='36' cy='47' r='2.5'/><circle cx='28.2' cy='43.8' r='2.5'/><circle cx='25' cy='36' r='2.5'/><circle cx='28.2' cy='28.2' r='2.5'/><circle cx='36' cy='25' r='2.5'/><circle cx='43.8' cy='28.2' r='2.5'/><circle cx='58' cy='36' r='2.3'/><circle cx='56.3' cy='44.4' r='2.3'/><circle cx='51.6' cy='51.6' r='2.3'/><circle cx='44.4' cy='56.3' r='2.3'/><circle cx='36' cy='58' r='2.3'/><circle cx='27.6' cy='56.3' r='2.3'/><circle cx='20.4' cy='51.6' r='2.3'/><circle cx='15.7' cy='44.4' r='2.3'/><circle cx='14' cy='36' r='2.3'/><circle cx='15.7' cy='27.6' r='2.3'/><circle cx='20.4' cy='20.4' r='2.3'/><circle cx='27.6' cy='15.7' r='2.3'/><circle cx='36' cy='14' r='2.3'/><circle cx='44.4' cy='15.7' r='2.3'/><circle cx='51.6' cy='20.4' r='2.3'/><circle cx='56.3' cy='27.6' r='2.3'/></g></svg>")`,
  flowerMaroon:`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><g fill='%234A0B10'><circle cx='36' cy='36' r='3.2'/><circle cx='47' cy='36' r='2.5'/><circle cx='43.8' cy='43.8' r='2.5'/><circle cx='36' cy='47' r='2.5'/><circle cx='28.2' cy='43.8' r='2.5'/><circle cx='25' cy='36' r='2.5'/><circle cx='28.2' cy='28.2' r='2.5'/><circle cx='36' cy='25' r='2.5'/><circle cx='43.8' cy='28.2' r='2.5'/><circle cx='58' cy='36' r='2.3'/><circle cx='56.3' cy='44.4' r='2.3'/><circle cx='51.6' cy='51.6' r='2.3'/><circle cx='44.4' cy='56.3' r='2.3'/><circle cx='36' cy='58' r='2.3'/><circle cx='27.6' cy='56.3' r='2.3'/><circle cx='20.4' cy='51.6' r='2.3'/><circle cx='15.7' cy='44.4' r='2.3'/><circle cx='14' cy='36' r='2.3'/><circle cx='15.7' cy='27.6' r='2.3'/><circle cx='20.4' cy='20.4' r='2.3'/><circle cx='27.6' cy='15.7' r='2.3'/><circle cx='36' cy='14' r='2.3'/><circle cx='44.4' cy='15.7' r='2.3'/><circle cx='51.6' cy='20.4' r='2.3'/><circle cx='56.3' cy='27.6' r='2.3'/></g></svg>")`,
  flowerVerm:  `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><g fill='%23DF3701'><circle cx='36' cy='36' r='3.2'/><circle cx='47' cy='36' r='2.5'/><circle cx='43.8' cy='43.8' r='2.5'/><circle cx='36' cy='47' r='2.5'/><circle cx='28.2' cy='43.8' r='2.5'/><circle cx='25' cy='36' r='2.5'/><circle cx='28.2' cy='28.2' r='2.5'/><circle cx='36' cy='25' r='2.5'/><circle cx='43.8' cy='28.2' r='2.5'/><circle cx='58' cy='36' r='2.3'/><circle cx='56.3' cy='44.4' r='2.3'/><circle cx='51.6' cy='51.6' r='2.3'/><circle cx='44.4' cy='56.3' r='2.3'/><circle cx='36' cy='58' r='2.3'/><circle cx='27.6' cy='56.3' r='2.3'/><circle cx='20.4' cy='51.6' r='2.3'/><circle cx='15.7' cy='44.4' r='2.3'/><circle cx='14' cy='36' r='2.3'/><circle cx='15.7' cy='27.6' r='2.3'/><circle cx='20.4' cy='20.4' r='2.3'/><circle cx='27.6' cy='15.7' r='2.3'/><circle cx='36' cy='14' r='2.3'/><circle cx='44.4' cy='15.7' r='2.3'/><circle cx='51.6' cy='20.4' r='2.3'/><circle cx='56.3' cy='27.6' r='2.3'/></g></svg>")`,
  diamondCream:`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><g fill='%23FFF4E4'><circle cx='36' cy='36' r='2.6'/><circle cx='68' cy='36' r='2.2'/><circle cx='60' cy='28' r='2.2'/><circle cx='60' cy='44' r='2.2'/><circle cx='12' cy='36' r='2.2'/><circle cx='36' cy='4' r='2.2'/><circle cx='36' cy='52' r='2.2'/><circle cx='44' cy='12' r='2.2'/><circle cx='52' cy='52' r='2.2'/><circle cx='44' cy='36' r='2.2'/><circle cx='44' cy='60' r='2.2'/><circle cx='28' cy='28' r='2.2'/><circle cx='28' cy='20' r='2.2'/><circle cx='20' cy='28' r='2.2'/><circle cx='20' cy='20' r='2.2'/><circle cx='28' cy='44' r='2.2'/><circle cx='20' cy='44' r='2.2'/><circle cx='60' cy='36' r='2.2'/><circle cx='36' cy='28' r='2.2'/><circle cx='36' cy='20' r='2.2'/><circle cx='36' cy='44' r='2.2'/><circle cx='52' cy='28' r='2.2'/><circle cx='52' cy='20' r='2.2'/><circle cx='44' cy='52' r='2.2'/><circle cx='36' cy='68' r='2.2'/><circle cx='52' cy='44' r='2.2'/><circle cx='4' cy='36' r='2.2'/><circle cx='28' cy='12' r='2.2'/><circle cx='28' cy='36' r='2.2'/><circle cx='20' cy='36' r='2.2'/><circle cx='28' cy='60' r='2.2'/><circle cx='28' cy='52' r='2.2'/><circle cx='12' cy='28' r='2.2'/><circle cx='36' cy='12' r='2.2'/><circle cx='12' cy='44' r='2.2'/><circle cx='44' cy='44' r='2.2'/><circle cx='36' cy='60' r='2.2'/><circle cx='52' cy='36' r='2.2'/><circle cx='44' cy='28' r='2.2'/><circle cx='44' cy='20' r='2.2'/><circle cx='20' cy='52' r='2.2'/></g></svg>")`,
  diamondMaroon:`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><g fill='%234A0B10'><circle cx='36' cy='36' r='2.6'/><circle cx='68' cy='36' r='2.2'/><circle cx='60' cy='28' r='2.2'/><circle cx='60' cy='44' r='2.2'/><circle cx='12' cy='36' r='2.2'/><circle cx='36' cy='4' r='2.2'/><circle cx='36' cy='52' r='2.2'/><circle cx='44' cy='12' r='2.2'/><circle cx='52' cy='52' r='2.2'/><circle cx='44' cy='36' r='2.2'/><circle cx='44' cy='60' r='2.2'/><circle cx='28' cy='28' r='2.2'/><circle cx='28' cy='20' r='2.2'/><circle cx='20' cy='28' r='2.2'/><circle cx='20' cy='20' r='2.2'/><circle cx='28' cy='44' r='2.2'/><circle cx='20' cy='44' r='2.2'/><circle cx='60' cy='36' r='2.2'/><circle cx='36' cy='28' r='2.2'/><circle cx='36' cy='20' r='2.2'/><circle cx='36' cy='44' r='2.2'/><circle cx='52' cy='28' r='2.2'/><circle cx='52' cy='20' r='2.2'/><circle cx='44' cy='52' r='2.2'/><circle cx='36' cy='68' r='2.2'/><circle cx='52' cy='44' r='2.2'/><circle cx='4' cy='36' r='2.2'/><circle cx='28' cy='12' r='2.2'/><circle cx='28' cy='36' r='2.2'/><circle cx='20' cy='36' r='2.2'/><circle cx='28' cy='60' r='2.2'/><circle cx='28' cy='52' r='2.2'/><circle cx='12' cy='28' r='2.2'/><circle cx='36' cy='12' r='2.2'/><circle cx='12' cy='44' r='2.2'/><circle cx='44' cy='44' r='2.2'/><circle cx='36' cy='60' r='2.2'/><circle cx='52' cy='36' r='2.2'/><circle cx='44' cy='28' r='2.2'/><circle cx='44' cy='20' r='2.2'/><circle cx='20' cy='52' r='2.2'/></g></svg>")`,
  scatterCream:`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><g fill='%23FFF4E4'><circle cx='0' cy='0' r='1.7'/><circle cx='12' cy='0' r='1.7'/><circle cx='24' cy='0' r='1.7'/><circle cx='6' cy='12' r='1.7'/><circle cx='18' cy='12' r='1.7'/><circle cx='0' cy='24' r='1.7'/><circle cx='12' cy='24' r='1.7'/><circle cx='24' cy='24' r='1.7'/></g></svg>")`,
  scatterMaroon:`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><g fill='%234A0B10'><circle cx='0' cy='0' r='1.7'/><circle cx='12' cy='0' r='1.7'/><circle cx='24' cy='0' r='1.7'/><circle cx='6' cy='12' r='1.7'/><circle cx='18' cy='12' r='1.7'/><circle cx='0' cy='24' r='1.7'/><circle cx='12' cy='24' r='1.7'/><circle cx='24' cy='24' r='1.7'/></g></svg>")`,
  mandalaMotif:`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><g fill='%23FFB82A'><circle cx='160' cy='160' r='8'/><circle cx='188' cy='160' r='4.2'/><circle cx='179.8' cy='179.8' r='4.2'/><circle cx='160' cy='188' r='4.2'/><circle cx='140.2' cy='179.8' r='4.2'/><circle cx='132' cy='160' r='4.2'/><circle cx='140.2' cy='140.2' r='4.2'/><circle cx='160' cy='132' r='4.2'/><circle cx='179.8' cy='140.2' r='4.2'/><circle cx='216' cy='160' r='3.8'/><circle cx='210.5' cy='184.3' r='3.8'/><circle cx='194.9' cy='203.8' r='3.8'/><circle cx='172.5' cy='214.6' r='3.8'/><circle cx='147.5' cy='214.6' r='3.8'/><circle cx='125.1' cy='203.8' r='3.8'/><circle cx='109.5' cy='184.3' r='3.8'/><circle cx='104' cy='160' r='3.8'/><circle cx='109.5' cy='135.7' r='3.8'/><circle cx='125.1' cy='116.2' r='3.8'/><circle cx='147.5' cy='105.4' r='3.8'/><circle cx='172.5' cy='105.4' r='3.8'/><circle cx='194.9' cy='116.2' r='3.8'/><circle cx='210.5' cy='135.7' r='3.8'/><circle cx='246' cy='160' r='3.4'/><circle cx='241.8' cy='186.6' r='3.4'/><circle cx='229.6' cy='210.5' r='3.4'/><circle cx='210.5' cy='229.6' r='3.4'/><circle cx='186.6' cy='241.8' r='3.4'/><circle cx='160' cy='246' r='3.4'/><circle cx='133.4' cy='241.8' r='3.4'/><circle cx='109.5' cy='229.6' r='3.4'/><circle cx='90.4' cy='210.5' r='3.4'/><circle cx='78.2' cy='186.6' r='3.4'/><circle cx='74' cy='160' r='3.4'/><circle cx='78.2' cy='133.4' r='3.4'/><circle cx='90.4' cy='109.5' r='3.4'/><circle cx='109.5' cy='90.4' r='3.4'/><circle cx='133.4' cy='78.2' r='3.4'/><circle cx='160' cy='74' r='3.4'/><circle cx='186.6' cy='78.2' r='3.4'/><circle cx='210.5' cy='90.4' r='3.4'/><circle cx='229.6' cy='109.5' r='3.4'/><circle cx='241.8' cy='133.4' r='3.4'/></g></svg>")`,
  mandalaVerm:`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><g fill='%23DF3701'><circle cx='160' cy='160' r='8'/><circle cx='188' cy='160' r='4.2'/><circle cx='179.8' cy='179.8' r='4.2'/><circle cx='160' cy='188' r='4.2'/><circle cx='140.2' cy='179.8' r='4.2'/><circle cx='132' cy='160' r='4.2'/><circle cx='140.2' cy='140.2' r='4.2'/><circle cx='160' cy='132' r='4.2'/><circle cx='179.8' cy='140.2' r='4.2'/><circle cx='216' cy='160' r='3.8'/><circle cx='210.5' cy='184.3' r='3.8'/><circle cx='194.9' cy='203.8' r='3.8'/><circle cx='172.5' cy='214.6' r='3.8'/><circle cx='147.5' cy='214.6' r='3.8'/><circle cx='125.1' cy='203.8' r='3.8'/><circle cx='109.5' cy='184.3' r='3.8'/><circle cx='104' cy='160' r='3.8'/><circle cx='109.5' cy='135.7' r='3.8'/><circle cx='125.1' cy='116.2' r='3.8'/><circle cx='147.5' cy='105.4' r='3.8'/><circle cx='172.5' cy='105.4' r='3.8'/><circle cx='194.9' cy='116.2' r='3.8'/><circle cx='210.5' cy='135.7' r='3.8'/></g></svg>")`,
} as const

// ── Font import ────────────────────────────────────────────────────────────

export function googleFontsImport(): string {
  return `@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=DM+Mono:wght@300;400;500&display=swap');`
}

// ── SVG document wrapper ───────────────────────────────────────────────────

export interface SvgDocOptions {
  width: number
  height: number
  bg: string
  children: string
}

export function svgDoc(opts: SvgDocOptions): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${opts.width}" height="${opts.height}" viewBox="0 0 ${opts.width} ${opts.height}"><style>${googleFontsImport()}</style><rect width="100%" height="100%" fill="${opts.bg}"/>${opts.children}</svg>`
}

// Backwards-compat alias
export const svgDocument = (opts: { width: number; height: number; children: string; background?: string }) =>
  svgDoc({ width: opts.width, height: opts.height, bg: opts.background ?? BAND.maroon, children: opts.children })

// ── Field: a coloured rect with dot-pattern overlay ───────────────────────

export interface FieldOptions {
  x: number
  y: number
  w: number
  h: number
  bg: string
  dotPattern: string
  dotSize?: number
  dotOpacity?: number
  children: string
}

export function field(opts: FieldOptions): string {
  const dotOpacity = opts.dotOpacity ?? 0.14
  // Strip the outer url(...) wrapper to get the bare data URI for use as fill value
  const fillValue = opts.dotPattern.replace(/^url\(/, "").replace(/\)$/, "")
  return `<rect x="${opts.x}" y="${opts.y}" width="${opts.w}" height="${opts.h}" fill="${opts.bg}"/><rect x="${opts.x}" y="${opts.y}" width="${opts.w}" height="${opts.h}" fill="${fillValue}" style="opacity:${dotOpacity}" />${opts.children}`
}

// ── Text helpers ───────────────────────────────────────────────────────────

export interface DisplayTextOptions {
  x: number
  y: number
  text: string
  size: number
  fill: string
  weight?: number
  wdth?: number
  letterSpacing?: number
}

export function displayText(opts: DisplayTextOptions): string {
  const weight = opts.weight ?? 900
  const wdth = opts.wdth ?? 100
  const ls = opts.letterSpacing ?? -0.02
  const safe = xmlEscape(opts.text)
  return `<text x="${opts.x}" y="${opts.y}" fill="${opts.fill}" font-family="'Archivo','Arial Black',sans-serif" font-size="${opts.size}" font-weight="${weight}" letter-spacing="${ls}em" font-variation-settings="'wdth' ${wdth}" xml:space="preserve">${safe}</text>`
}

export interface MonoTextOptions {
  x: number
  y: number
  text: string
  size: number
  fill: string
  weight?: number
  letterSpacing?: number
}

export function monoText(opts: MonoTextOptions): string {
  const weight = opts.weight ?? 400
  const ls = opts.letterSpacing ?? 0
  const safe = xmlEscape(opts.text)
  return `<text x="${opts.x}" y="${opts.y}" fill="${opts.fill}" font-family="'DM Mono','SFMono-Regular',monospace" font-size="${opts.size}" font-weight="${weight}" letter-spacing="${ls}em" xml:space="preserve">${safe}</text>`
}

// Backwards-compat tspan — uses monoText internally
export function tspan(text: string, opts: { x: number; y: number; fill?: string; size?: number; weight?: number; letterSpacing?: number }): string {
  return monoText({
    x: opts.x,
    y: opts.y,
    text,
    size: opts.size ?? 12,
    fill: opts.fill ?? BAND.cream,
    weight: opts.weight,
    letterSpacing: opts.letterSpacing,
  })
}

// ── Spark bar chart ────────────────────────────────────────────────────────

export interface SparkBarOptions {
  x: number
  y: number
  w: number
  h: number
  values: number[]
  fill: string
}

export function sparkBar(opts: SparkBarOptions): string {
  if (opts.values.length === 0) return ""
  const max = Math.max(...opts.values, 1)
  const colW = opts.w / opts.values.length
  const gap = Math.max(1, colW * 0.18)
  return opts.values.map((v, i) => {
    const barH = Math.max(2, Math.round((v / max) * opts.h))
    const bx = opts.x + i * colW + gap / 2
    const by = opts.y + opts.h - barH
    const bw = colW - gap
    return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${barH}" fill="${opts.fill}" rx="1"/>`
  }).join("")
}

// ── Chip / tag ─────────────────────────────────────────────────────────────

export interface ChipOptions {
  x: number
  y: number
  label: string
  fill: string
  textFill: string
  borderRadius?: number
  paddingX?: number
  paddingY?: number
  fontSize?: number
}

export function chip(opts: ChipOptions): string {
  const px = opts.paddingX ?? 8
  const py = opts.paddingY ?? 4
  const fs = opts.fontSize ?? 11
  const r = opts.borderRadius ?? 2
  const charW = fs * 0.58
  const w = opts.label.length * charW + px * 2
  const h = fs + py * 2
  const safe = xmlEscape(opts.label)
  return `<rect x="${opts.x}" y="${opts.y}" width="${w.toFixed(1)}" height="${h}" fill="none" stroke="${opts.fill}" stroke-width="1.5" rx="${r}"/><text x="${(opts.x + px).toFixed(1)}" y="${(opts.y + h - py - 1).toFixed(1)}" fill="${opts.textFill}" font-family="'DM Mono','SFMono-Regular',monospace" font-size="${fs}" xml:space="preserve">${safe}</text>`
}

// ── Animation helpers ──────────────────────────────────────────────────────

export function animPulse(id: string): string {
  return `<style>@keyframes pulse-${id}{0%,100%{opacity:.5}50%{opacity:1}}.pulse-${id}{animation:pulse-${id} 2.4s ease-in-out infinite}</style>`
}

export function animSpin(id: string, dur: number): string {
  return `<style>@keyframes spin-${id}{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.spin-${id}{animation:spin-${id} ${dur}s linear infinite;transform-origin:center}</style>`
}

// ── Backwards-compat exports ───────────────────────────────────────────────

export function animationStyle(keyframes: string[]): string {
  return `<style>${keyframes.join("")}</style>`
}

export function cursorSpan(opts: { x: number; y: number; fill: string; size?: number }): string {
  return `<text x="${opts.x}" y="${opts.y}" fill="${opts.fill}" font-family="'DM Mono',monospace" font-size="${opts.size ?? 13}" font-weight="600" xml:space="preserve">_</text>`
}

export function sparkline(values: number[]): string {
  const BLOCKS = ["▁","▂","▃","▄","▅","▆","▇","█"] as const
  if (values.length === 0) return ""
  const max = Math.max(...values)
  if (max === 0) return "▁".repeat(values.length)
  return values.map(v => BLOCKS[Math.min(7, Math.floor((v / max) * 7))] ?? "▁").join("")
}

export function radarPingCircle(opts: { cx: number; cy: number; durationMs: number; stroke?: string }): string {
  const stroke = opts.stroke ?? BAND.bottle
  const dur = `${opts.durationMs / 1000}s`
  return `<circle cx="${opts.cx}" cy="${opts.cy}" r="2" fill="none" stroke="${stroke}" stroke-width="1.5"><animate attributeName="r" from="2" to="14" dur="${dur}" repeatCount="indefinite"/><animate attributeName="opacity" from="1" to="0" dur="${dur}" repeatCount="indefinite"/></circle>`
}

export function box(lines: string[]): string {
  const width = Math.max(...lines.map(l => [...l].length))
  const padded = lines.map(l => l + " ".repeat(width - [...l].length))
  return ["┌─" + "─".repeat(width) + "─┐", ...padded.map(l => `│ ${l} │`), "└─" + "─".repeat(width) + "─┘"].join("\n")
}

// ── Internal helpers ───────────────────────────────────────────────────────

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}
