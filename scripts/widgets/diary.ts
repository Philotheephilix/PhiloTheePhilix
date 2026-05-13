import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";
import type { DiaryEntry } from "../lib/diary.js";

export interface DiaryInput {
  entries: DiaryEntry[];
  today: string;
}

const WIDTH = 900;
const ROW_H = 22;
const HEADER_Y = 28;
const FIRST_ROW_Y = 60;
const PADDING_X = 24;

export function renderDiary(input: DiaryInput): string {
  const rows: { entry: DiaryEntry | null }[] = [];
  for (let i = 0; i < 7; i++) rows.push({ entry: input.entries[i] ?? null });

  const children: string[] = [
    tspan("DIARY · 7-DAY @ 15:00 IST", {
      x: PADDING_X,
      y: HEADER_Y,
      fill: TUI_PALETTE.dim,
      size: 11,
      letterSpacing: 2,
    }),
  ];

  rows.forEach((row, i) => {
    const y = FIRST_ROW_Y + i * ROW_H;
    const isToday = row.entry?.date === input.today;
    const marker = isToday ? "→" : " ";
    children.push(
      tspan(marker, { x: PADDING_X, y, fill: TUI_PALETTE.green, size: 13, weight: 700 }),
    );
    if (row.entry) {
      children.push(
        tspan(row.entry.dow, {
          x: PADDING_X + 24,
          y,
          fill: TUI_PALETTE.cyan,
          size: 12,
          weight: 600,
        }),
      );
      children.push(
        tspan(row.entry.date, { x: PADDING_X + 70, y, fill: TUI_PALETTE.dim, size: 12 }),
      );
      children.push(
        tspan(row.entry.summary, {
          x: PADDING_X + 180,
          y,
          fill: isToday ? TUI_PALETTE.white : TUI_PALETTE.white,
          size: 12,
          weight: isToday ? 700 : 400,
        }),
      );
    } else {
      children.push(
        tspan("· warming up", {
          x: PADDING_X + 24,
          y,
          fill: TUI_PALETTE.dim,
          size: 12,
        }),
      );
    }
  });

  const height = FIRST_ROW_Y + 7 * ROW_H + 12;
  return svgDocument({ width: WIDTH, height, children: children.join("") });
}
