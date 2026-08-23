import { BAND, PATTERNS, svgDoc, monoText, displayText, sparkBar } from "../lib/svg.js"

export interface ActivityInput {
  daily: number[]
}

const W = 300
const H = 150

export function renderActivity(input: ActivityInput): string {
  const children: string[] = []
  children.push(`<rect width="${W}" height="${H}" fill="${BAND.fieldBottle}"/>`)
  children.push(`<rect width="${W}" height="${H}" fill="${PATTERNS.diamondCream.replace(/^url\("/, "").replace(/"\)$/, "")}" style="opacity:.13"/>`)
  children.push(`<rect x="0" y="0" width="${W}" height="4" fill="${BAND.chrome}"/>`)
  children.push(monoText({ x: 16, y: 26, text: "shipping cadence", size: 10, fill: "rgba(255,244,228,0.65)", letterSpacing: 0.16 }))

  if (input.daily.length === 0) {
    children.push(monoText({ x: 16, y: 80, text: "no data · widget dormant", size: 12, fill: "rgba(255,244,228,0.5)" }))
  } else {
    const total = input.daily.reduce((a, b) => a + b, 0)
    children.push(sparkBar({ x: 16, y: 44, w: 268, h: 70, values: input.daily, fill: BAND.turmeric }))
    children.push(monoText({ x: 16, y: 132, text: `${total} commits · last 30 days`, size: 10, fill: "rgba(255,244,228,0.55)" }))
  }

  return svgDoc({ width: W, height: H, bg: BAND.fieldBottle, children: children.join("") })
}
