import { svgDocument, tspan, TUI_PALETTE } from "../lib/svg.js";
import type { LastfmState } from "../lib/lastfm.js";

export interface NowPlayingInput {
  recent: LastfmState;
  top: LastfmState;
}

export function renderNowPlaying(input: NowPlayingInput): string {
  if (input.recent.dormant && input.top.dormant) {
    return svgDocument({
      width: 300,
      height: 120,
      children:
        tspan("NOW PLAYING", { x: 14, y: 22, fill: TUI_PALETTE.dim, size: 10, letterSpacing: 1.8 }) +
        tspan("NO SCROBBLER · widget dormant", { x: 14, y: 60, fill: TUI_PALETTE.dim, size: 11 }),
    });
  }
  const children =
    tspan("NOW PLAYING", { x: 14, y: 22, fill: TUI_PALETTE.dim, size: 10, letterSpacing: 1.8 }) +
    tspan(`♪ NOW:  ${input.recent.track ?? "—"}`, { x: 14, y: 52, fill: TUI_PALETTE.white, size: 11 }) +
    tspan("REPEAT THIS WEEK", { x: 14, y: 82, fill: TUI_PALETTE.dim, size: 10, letterSpacing: 1.8 }) +
    tspan(`♫ ${input.top.track ?? "—"}${input.top.plays ? ` (${input.top.plays} plays)` : ""}`, { x: 14, y: 108, fill: TUI_PALETTE.cyan, size: 11 });
  return svgDocument({ width: 300, height: 130, children });
}
