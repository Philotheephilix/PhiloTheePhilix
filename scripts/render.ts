import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import Handlebars from "handlebars";
import { loadProfile, type Profile } from "./lib/yaml.js";
import {
  fetchGitHubData,
  parseContributionCalendar,
  parseActiveLoops,
  parseRecentCommits,
  parseUserStats,
  type FetchedGitHubData,
} from "./lib/github.js";
import { fetchLastfmData, parseRecentTrack, parseTopWeeklyTrack } from "./lib/lastfm.js";
import { computeChainFreshness } from "./lib/chain-map.js";
import { renderHero } from "./widgets/hero.js";
import { renderActivity } from "./widgets/activity.js";
import { renderActiveLoops } from "./widgets/active-loops.js";
import { renderChains } from "./widgets/chains.js";
import { renderShippedThisWeek } from "./widgets/shipped-this-week.js";
import { renderUptime } from "./widgets/uptime.js";
import { renderHackathon } from "./widgets/hackathon.js";
import { renderAvailability } from "./widgets/availability.js";
import { renderNowPlaying } from "./widgets/now-playing.js";
import { renderLocation } from "./widgets/location.js";
import { renderFeatured } from "./widgets/featured.js";
import { renderCurrently } from "./widgets/currently.js";
import { renderSignature } from "./widgets/signature.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const WIDGETS_DIR = resolve(ROOT, "assets/widgets");
const TEMPLATE_PATH = resolve(ROOT, "templates/README.hbs");
const README_PATH = resolve(ROOT, "README.md");
const GITHUB_USER = "Philotheephilix";

Handlebars.registerHelper("upper", (s: string) =>
  String(s).split("/").pop()!.toUpperCase(),
);
Handlebars.registerHelper("glyph", (i: number, n: number) =>
  i === n - 1 ? "└─" : "├─",
);
Handlebars.registerHelper("join", (arr: unknown[], sep: string) =>
  Array.isArray(arr) ? arr.join(sep) : "",
);
Handlebars.registerHelper("cardTop", (repo: string, isPrivate: boolean) => {
  const title = String(repo).split("/").pop() ?? "";
  const tag = isPrivate ? "private" : "public";
  const WIDTH = 45; // inside-the-box width; matches bottom rule dashes
  const titlePart = `┌─ [ ${title.toUpperCase()} ]`;
  const tagPart = ` ${tag} ─┐`;
  const dashesCount = Math.max(1, WIDTH - titlePart.length - tagPart.length + 1); // +1: corners cancel, account for joining space
  return `${titlePart} ${"─".repeat(dashesCount)}${tagPart}`;
});
Handlebars.registerHelper("cardBottom", () => "└" + "─".repeat(45) + "┘");

function writeWidget(name: string, svg: string) {
  mkdirSync(WIDGETS_DIR, { recursive: true });
  writeFileSync(resolve(WIDGETS_DIR, `${name}.svg`), svg, "utf-8");
}

function addDaysIso(base: Date, days: number): string {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

async function renderAll(
  profile: Profile,
  ghData: FetchedGitHubData,
  lastfm: { recent: unknown; top: unknown },
) {
  const now = new Date();

  const daily = parseContributionCalendar(ghData.calendar, 30, now);
  writeWidget("activity", renderActivity({ daily }));

  const repoPushes = ghData.repos.map((r) => ({
    name: r.name,
    pushedAt: r.pushedAt,
  }));
  const loops = parseActiveLoops(repoPushes, now);
  writeWidget("active-loops", renderActiveLoops({ loops }));

  const repoMeta = ghData.repos.map((r) => ({
    name: r.name,
    pushedAt: r.pushedAt,
    primaryLanguage: r.primaryLanguage?.name ?? null,
  }));
  const freshness = computeChainFreshness(repoMeta, profile.chains.overrides, now);
  writeWidget("chains", renderChains({ freshness: freshness as Record<string, number> }));

  const commits = parseRecentCommits(ghData.events, 3);
  writeWidget("shipped-this-week", renderShippedThisWeek({ commits }));

  const stats = parseUserStats(
    { createdAt: ghData.createdAt, publicRepos: ghData.publicRepos },
    now,
  );
  writeWidget("uptime", renderUptime(stats));

  writeWidget("hackathon", renderHackathon(profile.hackathon));
  writeWidget("availability", renderAvailability(profile.availability));
  writeWidget("location", renderLocation(profile.location));

  const recent = parseRecentTrack(lastfm.recent, profile.lastfm.username);
  const top = parseTopWeeklyTrack(lastfm.top, profile.lastfm.username);
  writeWidget("now-playing", renderNowPlaying({ recent, top }));

  writeWidget("hero", renderHero(profile.hero));

  writeWidget("featured", renderFeatured({ items: profile.featured }));
  writeWidget("currently", renderCurrently({ items: profile.currently }));
  writeWidget("signature", renderSignature({
    ...profile.signature,
    refreshNow: now.toISOString().slice(0, 10),
    refreshNext: addDaysIso(now, 7),
  }));

  const tpl = Handlebars.compile(readFileSync(TEMPLATE_PATH, "utf-8"));
  const readme = tpl({
    ...profile,
    refresh: {
      now: now.toISOString().slice(0, 10),
      next: addDaysIso(now, 7),
    },
  });
  writeFileSync(README_PATH, readme, "utf-8");
}

export async function renderFromFixtures() {
  const profile = loadProfile();
  const now = new Date();
  const repos = [
    {
      name: "starkbase",
      pushedAt: new Date(now.getTime() - 86400000).toISOString(),
      primaryLanguage: { name: "TypeScript" },
    },
    {
      name: "ai-browse-control",
      pushedAt: new Date(now.getTime() - 2 * 86400000).toISOString(),
      primaryLanguage: { name: "TypeScript" },
    },
  ];
  const ghData: FetchedGitHubData = {
    createdAt: "2022-07-30T00:00:00Z",
    publicRepos: 54,
    repos,
    calendar: { weeks: [] },
    events: [],
  };
  await renderAll(profile, ghData, { recent: null, top: null });
}

export async function renderLive() {
  const profile = loadProfile();
  const ghData = await fetchGitHubData(GITHUB_USER);
  const lastfm = await fetchLastfmData(profile.lastfm.username);
  await renderAll(profile, ghData, lastfm);
}

const isMain =
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith("render.ts");
if (isMain) {
  renderLive().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
