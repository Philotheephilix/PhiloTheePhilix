import { BAND, PATTERNS, svgDoc, monoText, displayText } from "../lib/svg.js"

export interface AvailabilityInput {
  accept: string
  maybe: string
  decline: string
}

const W = 300
const H = 140

export function renderAvailability(input: AvailabilityInput): string {
  const children: string[] = []
  children.push(`<rect width="${W}" height="${H}" fill="${BAND.cream}"/>`)
  children.push(`<rect width="${W}" height="${H}" fill="${PATTERNS.flowerMaroon.replace(/^url\("/, "").replace(/"\)$/, "")}" style="opacity:.09"/>`)
  children.push(`<rect x="0" y="0" width="${W}" height="4" fill="${BAND.maroon}"/>`)
  children.push(monoText({ x: 16, y: 26, text: "open to", size: 10, fill: "rgba(74,11,16,0.6)", letterSpacing: 0.18 }))

  const rows = [
    { label: "accept",  value: input.accept,  dot: BAND.bottle },
    { label: "maybe",   value: input.maybe,   dot: BAND.saffron },
    { label: "decline", value: input.decline, dot: "rgba(74,11,16,0.35)" },
  ]
  rows.forEach(({ label, value, dot }, i) => {
    const y = 52 + i * 28
    children.push(`<circle cx="22" cy="${y - 4}" r="5" fill="${dot}"/>`)
    children.push(monoText({ x: 34, y, text: label.toUpperCase(), size: 10, fill: "rgba(74,11,16,0.55)", letterSpacing: 0.14, weight: 500 }))
    children.push(monoText({ x: 100, y, text: value, size: 11, fill: BAND.maroon }))
  })

  return svgDoc({ width: W, height: H, bg: BAND.cream, children: children.join("") })
}
