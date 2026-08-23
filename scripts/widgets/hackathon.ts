import { BAND, PATTERNS, svgDoc, monoText, displayText } from "../lib/svg.js"

export interface HackathonInput {
  wins: number
  played: number
  win_ratio_display: string
}

const W = 300
const H = 160

export function renderHackathon(input: HackathonInput): string {
  const ratio = input.wins / Math.max(input.played, 1)
  const barFill = Math.round(ratio * 236)
  const losses = input.played - input.wins
  const children: string[] = []
  children.push(`<rect width="${W}" height="${H}" fill="${BAND.fieldRani}"/>`)
  children.push(`<rect width="${W}" height="${H}" fill="${PATTERNS.flowerCream.replace(/^url\("/, "").replace(/"\)$/, "")}" style="opacity:.14"/>`)
  children.push(`<rect x="0" y="0" width="${W}" height="4" fill="${BAND.chrome}"/>`)
  children.push(monoText({ x: 16, y: 26, text: "hackathon ledger", size: 10, fill: "rgba(255,244,228,0.65)", letterSpacing: 0.16 }))
  children.push(displayText({ x: 14, y: 72, text: `${input.wins}w`, size: 52, fill: BAND.cream, weight: 900, wdth: 125, letterSpacing: -0.03 }))
  children.push(displayText({ x: 120, y: 72, text: input.win_ratio_display, size: 40, fill: BAND.turmeric, weight: 900, wdth: 90 }))
  children.push(monoText({ x: 16, y: 96, text: `${losses} losses · ${input.played} played`, size: 11, fill: "rgba(255,244,228,0.7)" }))
  // Progress bar
  children.push(`<rect x="16" y="114" width="268" height="10" fill="rgba(255,244,228,0.2)" rx="2"/>`)
  children.push(`<rect x="16" y="114" width="${barFill}" height="10" fill="${BAND.turmeric}" rx="2"/>`)
  children.push(monoText({ x: 16, y: 144, text: "win ratio", size: 10, fill: "rgba(255,244,228,0.5)", letterSpacing: 0.14 }))
  return svgDoc({ width: W, height: H, bg: BAND.fieldRani, children: children.join("") })
}
