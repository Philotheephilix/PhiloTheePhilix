import { BAND, PATTERNS, svgDoc, displayText, monoText, chip } from "../lib/svg.js"

export interface HeroInput {
  handle: string
  subtitle: string
  location: string
  year: number
  tokens: string[]
  manifesto?: string
}

const W = 900
const H = 340

export function renderHero(input: HeroInput): string {
  const children: string[] = []

  // SVG title for accessibility and handle lookup
  children.push(`<title>${input.handle}</title>`)

  // Background field — vermilion
  children.push(`<rect width="${W}" height="${H}" fill="${BAND.fieldVerm}"/>`)

  // Dot pattern overlay
  children.push(`<rect width="${W}" height="${H}" fill="${PATTERNS.flowerCream.replace(/^url\("/, "").replace(/"\)$/, "")}" style="opacity:.13"/>`)

  // Spinning mandala — right side decorative (SMIL animateTransform for GitHub compatibility)
  children.push(`<g>`)
  children.push(`<rect x="530" y="10" width="320" height="320" fill="${PATTERNS.mandalaMotif.replace(/^url\("/, "").replace(/"\)$/, "")}" opacity=".45"/>`)
  children.push(`<animateTransform attributeName="transform" type="rotate" from="0 690 170" to="360 690 170" dur="140s" repeatCount="indefinite"/>`)
  children.push(`</g>`)

  // Chrome accent line at top
  children.push(`<rect x="0" y="0" width="${W}" height="6" fill="${BAND.chrome}"/>`)

  // Eyebrow label
  children.push(monoText({
    x: 32,
    y: 48,
    text: `full stack · web3 · ai — ${input.location} · ${input.year}`,
    size: 11,
    fill: BAND.turmeric,
    letterSpacing: 0.18,
  }))

  // Wordmark — three lines of Archivo at large size
  // Display the handle across three visual lines
  const displayLines = ["philo", "thee", "philix"]
  const handleLower = input.handle.toLowerCase()
  // If the handle contains "philotheephilix" use those segments, otherwise split generically
  const usedLines = handleLower.includes("philotheephilix")
    ? ["philo", "thee", "philix"]
    : displayLines
  const fontSizes = [88, 72, 60]
  const wdths = [125, 78, 104]
  let nameY = 76

  for (let i = 0; i < usedLines.length; i++) {
    children.push(displayText({
      x: 30,
      y: nameY,
      text: usedLines[i]!,
      size: fontSizes[i]!,
      fill: i === 1 ? BAND.turmeric : BAND.cream,
      weight: 900,
      wdth: wdths[i]!,
      letterSpacing: -0.035,
    }))
    nameY += (fontSizes[i]! * 0.88)
  }

  // Subtitle
  children.push(monoText({
    x: 32,
    y: 272,
    text: input.subtitle,
    size: 13,
    fill: BAND.cream,
  }))

  // Manifesto chip
  if (input.manifesto?.trim()) {
    children.push(monoText({
      x: 32,
      y: 296,
      text: `▸ ${input.manifesto}`,
      size: 11,
      fill: "rgba(255,244,228,0.7)",
    }))
  }

  // Token chips
  let chipX = 32
  const chipY = 314
  for (const token of input.tokens) {
    children.push(chip({
      x: chipX,
      y: chipY,
      label: token,
      fill: BAND.turmeric,
      textFill: BAND.maroon,
      fontSize: 11,
      paddingX: 9,
      paddingY: 4,
      borderRadius: 2,
    }))
    chipX += token.length * 7 + 28
  }

  return svgDoc({ width: W, height: H, bg: BAND.fieldVerm, children: children.join("") })
}
