import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";

export interface SignatureInput {
  web: string;
  github: string;
  email: string;
  linkedin: string;
  refreshNow: string;
  refreshNext: string;
}

const LABEL_X = 14;
const VALUE_X = 88;
const HEADER_Y = 22;
const ROWS_START_Y = 50;
const ROW_H = 20;

export function renderSignature(input: SignatureInput): string {
  const rows: Array<{ label: string; value: string; valueFill: string }> = [
    { label: "web", value: input.web, valueFill: TUI_PALETTE.cyan },
    { label: "gh", value: input.github, valueFill: TUI_PALETTE.cyan },
    { label: "mail", value: input.email, valueFill: TUI_PALETTE.white },
    { label: "linkedin", value: input.linkedin, valueFill: TUI_PALETTE.cyan },
  ];

  const refreshY = ROWS_START_Y + rows.length * ROW_H + 14;
  const height = refreshY + 18 + 14;

  const children: string[] = [
    tspan("SIGNATURE", {
      x: LABEL_X,
      y: HEADER_Y,
      fill: TUI_PALETTE.dim,
      size: 10,
      letterSpacing: 1.8,
    }),
  ];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!;
    const y = ROWS_START_Y + i * ROW_H;
    children.push(
      tspan(row.label, { x: LABEL_X, y, fill: TUI_PALETTE.dim, size: 12 }),
    );
    children.push(
      tspan(row.value, { x: VALUE_X, y, fill: row.valueFill, size: 12 }),
    );
  }

  children.push(
    tspan(`last refresh: ${input.refreshNow} · next: ${input.refreshNext}`, {
      x: LABEL_X,
      y: refreshY,
      fill: TUI_PALETTE.dim,
      size: 10,
    }),
  );

  return svgDocument({ width: 300, height, children: children.join("") });
}
