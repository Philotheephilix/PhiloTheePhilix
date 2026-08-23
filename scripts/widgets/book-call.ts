import { BAND, PATTERNS, svgDoc, monoText, displayText, animPulse } from "../lib/svg.js"

export interface BookCallInput {
  handle: string
}

const W = 300
const H = 140

export function renderBookCall(input: BookCallInput): string {
  const pulseId = "bookcall"
  const children: string[] = []
  children.push(animPulse(pulseId))
  children.push(`<rect width="${W}" height="${H}" fill="${BAND.fieldRani}"/>`)
  children.push(`<rect width="${W}" height="${H}" fill="${PATTERNS.flowerCream.replace(/^url\("/, "").replace(/"\)$/, "")}" style="opacity:.14"/>`)
  children.push(`<rect x="0" y="0" width="${W}" height="4" fill="${BAND.chrome}"/>`)
  children.push(monoText({ x: 16, y: 26, text: "book a call", size: 10, fill: "rgba(255,244,228,0.65)", letterSpacing: 0.18 }))
  // Pulsing availability dot
  children.push(`<circle cx="270" cy="20" r="5" fill="${BAND.turmeric}" class="pulse-${pulseId}"/>`)
  children.push(displayText({ x: 14, y: 78, text: "let's talk", size: 38, fill: BAND.cream, weight: 900, wdth: 112 }))
  children.push(monoText({ x: 16, y: 102, text: `cal.com/${input.handle}`, size: 12, fill: "rgba(255,244,228,0.85)" }))
  children.push(monoText({ x: 16, y: 122, text: `→ schedule 30 min`, size: 11, fill: BAND.turmeric }))
  return svgDoc({ width: W, height: H, bg: BAND.fieldRani, children: children.join("") })
}
