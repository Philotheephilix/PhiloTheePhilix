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
import { renderHero } from "./widgets/hero.js";
import { renderActivity } from "./widgets/activity.js";
import { renderActiveLoops } from "./widgets/active-loops.js";
import { renderBookCall } from "./widgets/book-call.js";
import { renderShippedThisWeek } from "./widgets/shipped-this-week.js";
import { renderUptime } from "./widgets/uptime.js";
import { renderHackathon } from "./widgets/hackathon.js";
import { renderAvailability } from "./widgets/availability.js";
import { renderSkills } from "./widgets/skills.js";
import { renderLocation } from "./widgets/location.js";
import { renderFeatured } from "./widgets/featured.js";
import { renderCurrently } from "./widgets/currently.js";
import { renderSignature } from "./widgets/signature.js";
import {
  generateManifesto,
  createOpenAIGenerator,
  type ManifestoContext,
} from "./lib/openai.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const WIDGETS_DIR = resolve(ROOT, "assets/widgets");
const TEMPLATE_PATH = resolve(ROOT, "templates/README.hbs");
const README_PATH = resolve(ROOT, "README.md");
const GITHUB_USER = "Philotheephilix";
const DATA_DIR = resolve(ROOT, "data");
const MANIFESTO_PATH = resolve(DATA_DIR, "manifesto.txt");

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

  writeWidget("book-call", renderBookCall(profile.book_call));

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

  writeWidget("skills", renderSkills({ repo: "Philotheephilix/.claude" }));

  const manifesto = await resolveManifesto(profile, ghData, now);
  writeWidget("hero", renderHero({ ...profile.hero, manifesto }));

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

async function resolveManifesto(
  profile: Profile,
  ghData: FetchedGitHubData,
  now: Date,
): Promise<string> {
  const commitThemes: string[] = [];
  for (const e of ghData.events) {
    if (e.type === "PushEvent" && e.payload.commits) {
      for (const c of e.payload.commits) {
        const msg = c.message.split("\n")[0]?.trim();
        if (msg) commitThemes.push(msg);
      }
    }
    if (commitThemes.length >= 10) break;
  }
  const deduped = Array.from(new Set(commitThemes)).slice(0, 5);
  const ctx: ManifestoContext = {
    identity: profile.hero.subtitle,
    currently: profile.currently,
    recentCommitThemes: deduped,
    seedLines: profile.manifesto.seed_lines,
    fallbackPool: profile.manifesto.fallback_pool,
    now,
  };
  const gen = process.env.OPENAI_API_KEY
    ? createOpenAIGenerator()
    : async () => "";
  const line = await generateManifesto(ctx, gen);
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(MANIFESTO_PATH, line + "\n", "utf-8");
  return line;
}

export async function renderFromFixtures() {
  process.env.OPENAI_API_KEY = "";
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
  await renderAll(profile, ghData);
}

export async function renderLive() {
  const profile = loadProfile();
  const ghData = await fetchGitHubData(GITHUB_USER);
  await renderAll(profile, ghData);
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
