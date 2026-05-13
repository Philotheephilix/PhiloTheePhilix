import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";

export interface FeaturedItem {
  repo: string;
  blurb: string;
  tags: string[];
  private: boolean;
}

export interface FeaturedInput {
  items: FeaturedItem[];
}

/** Build the top border line of a card, e.g. ┌─ [ REPONAME ] ── public ─┐ */
function cardTop(repoName: string, visibility: string, innerWidth: number): string {
  const label = `[ ${repoName} ]`;
  const vis = ` ${visibility} `;
  // innerWidth is the total chars between ┌─ and ─┐
  const remaining = innerWidth - label.length - vis.length - 2; // 2 for "─" on each side of vis
  const leftDashes = "─".repeat(1);
  const rightDashes = "─".repeat(Math.max(0, remaining));
  return `┌─${leftDashes} ${label} ──${vis}─${rightDashes}┐`;
}

/** Build the bottom border of a card */
function cardBottom(innerWidth: number): string {
  return `└${"─".repeat(innerWidth + 2)}┘`;
}

/** Fit a string to exactly n chars: truncate with ellipsis if too long, pad with spaces if too short. */
function padLine(text: string, width: number): string {
  const chars = [...text];
  if (chars.length === width) return text;
  if (chars.length > width) return chars.slice(0, width - 1).join("") + "…";
  return text + " ".repeat(width - chars.length);
}

export function renderFeatured(input: FeaturedInput): string {
  const INNER = 37; // chars inside box borders
  const CARD_HEIGHT = 70; // px per card (4 lines × ~16px + gaps)
  const HEADER_Y = 22;
  const CARDS_START_Y = 44; // y of first card's top border text
  const LINE_H = 16; // px between lines inside a card
  const CARD_GAP = 10; // px gap between cards
  const height = 30 + input.items.length * CARD_HEIGHT + 14;

  const children: string[] = [
    tspan(`FEATURED · ${input.items.length}`, {
      x: 14,
      y: HEADER_Y,
      fill: TUI_PALETTE.dim,
      size: 10,
      letterSpacing: 1.8,
    }),
  ];

  for (let i = 0; i < input.items.length; i++) {
    const item = input.items[i]!;
    const repoName = item.repo.split("/")[1]?.toUpperCase() ?? item.repo.toUpperCase();
    const visibility = item.private ? "private" : "public";
    const tagsText = item.tags.join(", ");

    const cardY = CARDS_START_Y + i * (CARD_HEIGHT + CARD_GAP);

    // Top border
    const top = cardTop(repoName, visibility, INNER);
    children.push(
      tspan(top, { x: 14, y: cardY, fill: TUI_PALETTE.green, size: 11 }),
    );

    // Blurb line: │ blurb │
    const blurbLine = `│ ${padLine(item.blurb, INNER)} │`;
    children.push(
      tspan(blurbLine, { x: 14, y: cardY + LINE_H, fill: TUI_PALETTE.white, size: 11 }),
    );

    // Tags line: │ tag1, tag2 │
    const tagsLine = `│ ${padLine(tagsText, INNER)} │`;
    children.push(
      tspan(tagsLine, { x: 14, y: cardY + LINE_H * 2, fill: TUI_PALETTE.dim, size: 11 }),
    );

    // Bottom border
    const bottom = cardBottom(INNER);
    children.push(
      tspan(bottom, { x: 14, y: cardY + LINE_H * 3, fill: TUI_PALETTE.green, size: 11 }),
    );
  }

  return svgDocument({ width: 300, height: Math.max(100, height), children: children.join("") });
}
