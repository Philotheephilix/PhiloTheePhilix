import { BAND, PATTERNS, svgDoc, monoText, displayText, chip } from "../lib/svg.js"

export interface FeaturedItem {
  repo: string
  blurb: string
  tags: string[]
  private: boolean
}

export interface FeaturedInput {
  items: FeaturedItem[]
}

const W = 300
const CARD_H = 86
const CARD_GAP = 10

function xmlEscape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export function renderFeatured(input: FeaturedInput): string {
  const H = Math.max(160, 48 + input.items.length * (CARD_H + CARD_GAP) + 8)
  const children: string[] = []
  children.push(`<rect width="${W}" height="${H}" fill="${BAND.turmeric}"/>`)
  children.push(`<rect width="${W}" height="${H}" fill="${PATTERNS.diamondMaroon.replace(/^url\("/, "").replace(/"\)$/, "")}" style="opacity:.1"/>`)
  children.push(`<rect x="0" y="0" width="${W}" height="4" fill="${BAND.maroon}"/>`)
  children.push(monoText({ x: 16, y: 26, text: `featured · ${input.items.length}`, size: 10, fill: "rgba(74,11,16,0.6)", letterSpacing: 0.16 }))

  for (let i = 0; i < input.items.length; i++) {
    const item = input.items[i]!
    const name = item.repo.split("/")[1] ?? item.repo
    const cardY = 40 + i * (CARD_H + CARD_GAP)
    // Card background
    children.push(`<rect x="14" y="${cardY}" width="272" height="${CARD_H}" fill="rgba(74,11,16,0.1)" rx="2"/>`)
    children.push(`<rect x="14" y="${cardY}" width="272" height="${CARD_H}" fill="none" stroke="${BAND.maroon}" stroke-width="2" rx="2"/>`)
    // Visibility tag
    const vis = item.private ? "private" : "public"
    children.push(monoText({ x: 22, y: cardY + 18, text: name.toLowerCase(), size: 13, fill: BAND.maroon, weight: 500 }))
    children.push(monoText({ x: 22 + name.length * 7.8 + 8, y: cardY + 18, text: vis, size: 10, fill: "rgba(74,11,16,0.5)", letterSpacing: 0.1 }))
    // Blurb
    const blurb = item.blurb.length > 36 ? item.blurb.slice(0, 35) + "…" : item.blurb
    children.push(monoText({ x: 22, y: cardY + 36, text: blurb, size: 11, fill: "rgba(74,11,16,0.8)" }))
    // Tags as chips
    let chipX = 22
    for (const tag of item.tags) {
      children.push(chip({ x: chipX, y: cardY + 48, label: tag, fill: BAND.maroon, textFill: BAND.maroon, fontSize: 10, paddingX: 6, paddingY: 3 }))
      chipX += tag.length * 6.5 + 20
    }
  }

  return svgDoc({ width: W, height: H, bg: BAND.turmeric, children: children.join("") })
}
