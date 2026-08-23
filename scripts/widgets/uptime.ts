import { BAND, PATTERNS, svgDoc, monoText, displayText } from "../lib/svg.js"

export interface UptimeInput {
  uptime: string
  publicRepos: number
}

const W = 300
const H = 160

export function renderUptime(input: UptimeInput): string {
  const children: string[] = []
  children.push(`<rect width="${W}" height="${H}" fill="${BAND.fieldBottle}"/>`)
  children.push(`<rect width="${W}" height="${H}" fill="${PATTERNS.diamondCream.replace(/^url\("/, "").replace(/"\)$/, "")}" style="opacity:.12"/>`)
  children.push(`<rect x="0" y="0" width="${W}" height="4" fill="${BAND.chrome}"/>`)

  // Left stat — uptime
  children.push(monoText({ x: 16, y: 26, text: "uptime", size: 10, fill: "rgba(255,244,228,0.6)", letterSpacing: 0.18 }))
  children.push(displayText({ x: 14, y: 80, text: input.uptime, size: 44, fill: BAND.cream, weight: 900, wdth: 125 }))

  // Divider
  children.push(`<line x1="155" y1="36" x2="155" y2="136" stroke="rgba(255,244,228,0.2)" stroke-width="2"/>`)

  // Right stat — public repos
  children.push(monoText({ x: 165, y: 26, text: "public repos", size: 10, fill: "rgba(255,244,228,0.6)", letterSpacing: 0.18 }))
  children.push(displayText({ x: 163, y: 80, text: String(input.publicRepos), size: 44, fill: BAND.turmeric, weight: 900, wdth: 125 }))

  // Bottom label
  children.push(monoText({ x: 16, y: 148, text: "github.com/philotheephilix", size: 10, fill: "rgba(255,244,228,0.4)" }))

  return svgDoc({ width: W, height: H, bg: BAND.fieldBottle, children: children.join("") })
}
