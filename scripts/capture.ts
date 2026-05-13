import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  buildSummary,
  mergeEntry,
  toISTDate,
  toISTDow,
  type DiaryActivity,
  type DiaryFile,
} from "./lib/diary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const DATA_DIR = resolve(ROOT, "data");
const DIARY_PATH = resolve(DATA_DIR, "diary.json");
const GITHUB_USER = "Philotheephilix";

const token = process.env.GITHUB_TOKEN;

export interface GHEventLike {
  type: string;
  repo: { name: string };
  payload: { action?: string; commits?: { sha: string; message: string }[] };
  created_at: string;
}

export function eventsToActivity(events: GHEventLike[]): DiaryActivity {
  const commitsByRepo: Record<string, number> = {};
  let prsOpened = 0;
  let prsOpenedRepo: string | undefined;
  let reviewsGiven = 0;
  let issuesOpened = 0;

  for (const e of events) {
    const short = e.repo.name.split("/").pop() ?? e.repo.name;
    if (e.type === "PushEvent" && e.payload.commits) {
      commitsByRepo[short] = (commitsByRepo[short] ?? 0) + e.payload.commits.length;
    } else if (e.type === "PullRequestEvent" && e.payload.action === "opened") {
      prsOpened += 1;
      prsOpenedRepo = prsOpenedRepo ?? short;
    } else if (e.type === "PullRequestReviewEvent") {
      reviewsGiven += 1;
    } else if (e.type === "IssuesEvent" && e.payload.action === "opened") {
      issuesOpened += 1;
    }
  }

  return { commitsByRepo, prsOpened, prsOpenedRepo, reviewsGiven, issuesOpened };
}

async function fetchRecentEvents(user: string): Promise<GHEventLike[]> {
  const res = await fetch(
    `https://api.github.com/users/${user}/events/public?per_page=100`,
    { headers: token ? { Authorization: `token ${token}` } : {} },
  );
  if (!res.ok) throw new Error(`GitHub events fetch failed: ${res.status}`);
  return (await res.json()) as GHEventLike[];
}

function filterLast24h(events: GHEventLike[], now: Date): GHEventLike[] {
  const cutoff = now.getTime() - 24 * 60 * 60 * 1000;
  return events.filter((e) => new Date(e.created_at).getTime() >= cutoff);
}

async function main() {
  const now = new Date();
  const events = await fetchRecentEvents(GITHUB_USER);
  const recent = filterLast24h(events, now);
  const activity = eventsToActivity(recent);
  const summary = buildSummary(activity);
  const entry = { date: toISTDate(now), dow: toISTDow(now), summary };

  mkdirSync(DATA_DIR, { recursive: true });
  const file: DiaryFile = existsSync(DIARY_PATH)
    ? JSON.parse(readFileSync(DIARY_PATH, "utf-8"))
    : { lastUpdatedUtc: "", entries: [] };
  const next = mergeEntry(file, entry, now.toISOString());
  writeFileSync(DIARY_PATH, JSON.stringify(next, null, 2) + "\n", "utf-8");
  console.log(`diary capture: ${entry.date} ${entry.dow} · ${summary}`);
}

const isMain =
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith("capture.ts");
if (isMain) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
