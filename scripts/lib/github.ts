import { graphql } from "@octokit/graphql";

const token = process.env.GITHUB_TOKEN;

export const gh = token
  ? graphql.defaults({ headers: { authorization: `token ${token}` } })
  : graphql;

export interface ContributionDay {
  date: string;
  contributionCount: number;
}
export interface ContributionCalendar {
  weeks: { contributionDays: ContributionDay[] }[];
}

export function parseContributionCalendar(
  cal: ContributionCalendar,
  days: number,
  today: Date,
): number[] {
  const byDate = new Map<string, number>();
  for (const week of cal.weeks) {
    for (const day of week.contributionDays) {
      byDate.set(day.date, day.contributionCount);
    }
  }
  const out: number[] = [];
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    const iso = d.toISOString().slice(0, 10);
    out.push(byDate.get(iso) ?? 0);
  }
  return out;
}

export interface RepoPush {
  name: string;
  pushedAt: string;
}
export type LoopStatus = "shipping" | "iterating" | "idle";
export interface ActiveLoop {
  name: string;
  status: LoopStatus;
  pushedAt: Date;
}

export function parseActiveLoops(
  repos: RepoPush[],
  now: Date,
): ActiveLoop[] {
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
  const recent = repos
    .map((r) => ({ ...r, pushedDate: new Date(r.pushedAt) }))
    .filter((r) => r.pushedDate >= sevenDaysAgo)
    .sort((a, b) => b.pushedDate.getTime() - a.pushedDate.getTime())
    .slice(0, 5);
  return recent.map((r) => {
    const ageDays = (now.getTime() - r.pushedDate.getTime()) / 86400000;
    const status: LoopStatus =
      ageDays < 2 ? "shipping" : ageDays < 5 ? "iterating" : "idle";
    return { name: r.name, status, pushedAt: r.pushedDate };
  });
}

export interface GHEvent {
  type: string;
  repo: { name: string };
  payload: { commits?: { sha: string; message: string }[] };
  created_at: string;
}
export interface CommitRow {
  sha: string;
  message: string;
  repo: string;
}

export function parseRecentCommits(
  events: GHEvent[],
  n: number,
): (CommitRow | null)[] {
  const commits: CommitRow[] = [];
  for (const e of events) {
    if (e.type !== "PushEvent" || !e.payload.commits) continue;
    for (const c of [...e.payload.commits].reverse()) {
      commits.push({ sha: c.sha, message: c.message, repo: e.repo.name });
      if (commits.length >= n) break;
    }
    if (commits.length >= n) break;
  }
  const out: (CommitRow | null)[] = [...commits];
  while (out.length < n) out.push(null);
  return out;
}

export interface UserStatsRaw {
  createdAt: string;
  publicRepos: number;
}
export interface UserStats {
  uptime: string;
  publicRepos: number;
}

export function parseUserStats(raw: UserStatsRaw, now: Date): UserStats {
  const created = new Date(raw.createdAt);
  let years = now.getUTCFullYear() - created.getUTCFullYear();
  let months = now.getUTCMonth() - created.getUTCMonth();
  if (now.getUTCDate() < created.getUTCDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return {
    uptime: `${years}y ${months}mo`,
    publicRepos: raw.publicRepos,
  };
}

export interface FetchedRepo {
  name: string;
  pushedAt: string;
  primaryLanguage: { name: string } | null;
}
export interface FetchedGitHubData {
  createdAt: string;
  publicRepos: number;
  repos: FetchedRepo[];
  calendar: ContributionCalendar;
  events: GHEvent[];
}

export async function fetchGitHubData(username: string): Promise<FetchedGitHubData> {
  const query = `
    query ($user: String!) {
      user(login: $user) {
        createdAt
        repositories(first: 100, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC) {
          totalCount
          nodes { name pushedAt primaryLanguage { name } }
        }
        contributionsCollection {
          contributionCalendar {
            weeks { contributionDays { date contributionCount } }
          }
        }
      }
    }
  `;
  const data: any = await gh(query, { user: username });
  const user = data.user;
  const eventsRes = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=30`,
    { headers: token ? { Authorization: `token ${token}` } : {} },
  );
  const events: GHEvent[] = await eventsRes.json();
  return {
    createdAt: user.createdAt,
    publicRepos: user.repositories.totalCount,
    repos: user.repositories.nodes,
    calendar: user.contributionsCollection.contributionCalendar,
    events,
  };
}
