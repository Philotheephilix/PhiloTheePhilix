import { BAND, PATTERNS, svgDoc, monoText, displayText } from "../lib/svg.js"

export interface CurrentlyInput {
  items: string[]
}

const W = 300

export function renderCurrently(input: CurrentlyInput): string {
  const H = Math.max(160, 60 + input.items.length * 26 + 24)
  const children: string[] = []
  children.push(`<rect width="${W}" height="${H}" fill="${BAND.fieldVerm}"/>`)
  children.push(`<rect width="${W}" height="${H}" fill="${PATTERNS.flowerCream.replace(/^url\("/, "").replace(/"\)$/, "")}" style="opacity:.14"/>`)
  children.push(`<rect x="0" y="0" width="${W}" height="4" fill="${BAND.chrome}"/>`)
  children.push(monoText({ x: 16, y: 26, text: "currently", size: 10, fill: "rgba(255,244,228,0.65)", letterSpacing: 0.18 }))
  children.push(displayText({ x: 14, y: 52, text: "now()", size: 28, fill: BAND.turmeric, weight: 900, wdth: 112, letterSpacing: -0.02 }))
  for (let i = 0; i < input.items.length; i++) {
    children.push(monoText({ x: 16, y: 74 + i * 26, text: `▸ ${input.items[i]}`, size: 12, fill: BAND.cream }))
  }
  return svgDoc({ width: W, height: H, bg: BAND.fieldVerm, children: children.join("") })
}
