import { BAND, PATTERNS, svgDoc, monoText } from "../lib/svg.js"

export interface SignatureInput {
  web: string
  github: string
  email: string
  linkedin: string
  refreshNow: string
  refreshNext: string
}

const W = 300
const H = 180

export function renderSignature(input: SignatureInput): string {
  const children: string[] = []
  children.push(`<rect width="${W}" height="${H}" fill="${BAND.cream}"/>`)
  children.push(`<rect width="${W}" height="${H}" fill="${PATTERNS.flowerMaroon.replace(/^url\("/, "").replace(/"\)$/, "")}" style="opacity:.08"/>`)
  children.push(`<rect x="0" y="0" width="${W}" height="4" fill="${BAND.maroon}"/>`)
  children.push(monoText({ x: 16, y: 26, text: "signature", size: 10, fill: "rgba(74,11,16,0.55)", letterSpacing: 0.18 }))

  const rows = [
    { label: "web",      value: input.web,      fill: BAND.bottle },
    { label: "github",   value: input.github,   fill: BAND.bottle },
    { label: "email",    value: input.email,    fill: BAND.maroon },
    { label: "linkedin", value: input.linkedin, fill: BAND.bottle },
  ]
  rows.forEach(({ label, value, fill }, i) => {
    const y = 50 + i * 26
    children.push(monoText({ x: 16, y, text: label, size: 11, fill: "rgba(74,11,16,0.5)" }))
    children.push(monoText({ x: 82, y, text: value, size: 11, fill }))
  })

  children.push(monoText({ x: 16, y: 162, text: `refreshed ${input.refreshNow} · next ${input.refreshNext}`, size: 9, fill: "rgba(74,11,16,0.4)" }))

  return svgDoc({ width: W, height: H, bg: BAND.cream, children: children.join("") })
}
