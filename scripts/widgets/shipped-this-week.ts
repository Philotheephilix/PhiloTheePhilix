import { BAND, PATTERNS, svgDoc, monoText } from "../lib/svg.js"
import type { CommitRow } from "../lib/github.js"

export interface ShippedInput {
  commits: (CommitRow | null)[]
}

const W = 300

function trunc(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, max - 1) + "…"
}

export function renderShippedThisWeek(input: ShippedInput): string {
  const H = Math.max(120, 52 + input.commits.length * 22 + 16)
  const children: string[] = []
  children.push(`<rect width="${W}" height="${H}" fill="${BAND.maroon}"/>`)
  children.push(`<rect width="${W}" height="${H}" fill="${PATTERNS.diamondCream.replace(/^url\("/, "").replace(/"\)$/, "")}" style="opacity:.08"/>`)
  children.push(`<rect x="0" y="0" width="${W}" height="4" fill="${BAND.chrome}"/>`)
  children.push(monoText({ x: 16, y: 26, text: "shipped this week", size: 10, fill: "rgba(255,244,228,0.55)", letterSpacing: 0.16 }))

  if (input.commits.length === 0) {
    children.push(monoText({ x: 16, y: 60, text: "▸ no commits yet", size: 12, fill: "rgba(255,244,228,0.4)" }))
    return svgDoc({ width: W, height: H, bg: BAND.maroon, children: children.join("") })
  }

  for (let i = 0; i < input.commits.length; i++) {
    const c = input.commits[i]
    const y = 48 + i * 22
    if (c === null) {
      children.push(monoText({ x: 16, y, text: "▸ nothing shipped", size: 11, fill: "rgba(255,244,228,0.35)" }))
    } else {
      const sha = c.sha.slice(0, 7)
      const repo = c.repo.split("/")[1] ?? c.repo
      const msg = trunc(c.message, 24)
      children.push(monoText({ x: 16, y, text: `▸ ${sha}`, size: 11, fill: BAND.turmeric }))
      children.push(monoText({ x: 82, y, text: `${msg}`, size: 11, fill: BAND.cream }))
      children.push(monoText({ x: 16, y: y + 13, text: `  ${repo}`, size: 10, fill: "rgba(255,244,228,0.45)" }))
    }
  }

  return svgDoc({ width: W, height: H, bg: BAND.maroon, children: children.join("") })
}
