import { sparkline, svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";

export interface ActivityInput {
  daily: number[];
}

export function renderActivity(input: ActivityInput): string {
  if (input.daily.length === 0) {
    return svgDocument({
      width: 300,
      height: 90,
      children:
        tspan("SHIPPING CADENCE", {
          x: 14,
          y: 22,
          fill: TUI_PALETTE.dim,
          size: 10,
          letterSpacing: 1.8,
        }) +
        tspan("NO DATA · widget dormant", {
          x: 14,
          y: 56,
          fill: TUI_PALETTE.dim,
          size: 12,
        }),
    });
  }

  const spark = sparkline(input.daily);
  const total = input.daily.reduce((a, b) => a + b, 0);
  const sparkWidth = 280;
  const sparkLine = tspan(spark, {
    x: 14,
    y: 56,
    fill: TUI_PALETTE.green,
    size: 18,
    letterSpacing: 1,
  });
  return svgDocument({
    width: 300,
    height: 90,
    children:
      tspan("SHIPPING CADENCE", {
        x: 14,
        y: 22,
        fill: TUI_PALETTE.dim,
        size: 10,
        letterSpacing: 1.8,
      }) +
      tspan("30D", {
        x: 264,
        y: 22,
        fill: TUI_PALETTE.dim,
        size: 10,
        letterSpacing: 1.8,
      }) +
      `<clipPath id="activity-reveal"><rect x="14" y="36" height="28" width="0"><animate attributeName="width" from="0" to="${sparkWidth}" dur="0.9s" fill="freeze"/></rect></clipPath>` +
      `<g clip-path="url(#activity-reveal)">${sparkLine}</g>` +
      tspan(`commits / day · ${total} total`, {
        x: 14,
        y: 76,
        fill: TUI_PALETTE.dim,
        size: 10,
      }),
  });
}
