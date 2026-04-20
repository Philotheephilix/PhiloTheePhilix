import { describe, it, expect } from "vitest";
import {
  parseContributionCalendar,
  parseActiveLoops,
  parseRecentCommits,
  parseUserStats,
  type ContributionCalendar,
} from "../../scripts/lib/github.js";

describe("parseContributionCalendar", () => {
  it("returns daily totals for the last 30 days, newest last", () => {
    const cal: ContributionCalendar = {
      weeks: [
        {
          contributionDays: [
            { date: "2026-03-22", contributionCount: 1 },
            { date: "2026-03-23", contributionCount: 2 },
          ],
        },
        {
          contributionDays: [
            { date: "2026-03-29", contributionCount: 5 },
          ],
        },
      ],
    };
    const out = parseContributionCalendar(cal, 30, new Date("2026-04-21"));
    expect(out.length).toBe(30);
    expect(out[out.length - 1]).toBe(0); // 2026-04-21 not in fixture
  });
});

describe("parseActiveLoops", () => {
  it("picks up to 5 most-recently-pushed repos from last 7 days", () => {
    const now = new Date("2026-04-21T00:00:00Z");
    const repos = [
      { name: "a", pushedAt: "2026-04-20T10:00:00Z" },
      { name: "b", pushedAt: "2026-04-15T10:00:00Z" },
      { name: "c", pushedAt: "2026-04-01T10:00:00Z" },
      { name: "d", pushedAt: "2026-04-19T10:00:00Z" },
      { name: "e", pushedAt: "2026-04-17T10:00:00Z" },
      { name: "f", pushedAt: "2026-04-16T10:00:00Z" },
      { name: "g", pushedAt: "2026-04-14T10:00:00Z" },
    ];
    const out = parseActiveLoops(repos, now);
    expect(out.length).toBe(5);
    expect(out[0]!.name).toBe("a");
    expect(out.map((r) => r.name)).not.toContain("g");
  });

  it("marks status by age: <2d shipping, <5d iterating, else idle", () => {
    const now = new Date("2026-04-21T00:00:00Z");
    const repos = [
      { name: "hot", pushedAt: "2026-04-20T10:00:00Z" },
      { name: "warm", pushedAt: "2026-04-18T10:00:00Z" },
      { name: "cool", pushedAt: "2026-04-15T23:00:00Z" },
    ];
    const out = parseActiveLoops(repos, now);
    expect(out[0]!.status).toBe("shipping");
    expect(out[1]!.status).toBe("iterating");
    expect(out[2]!.status).toBe("idle");
  });
});

describe("parseRecentCommits", () => {
  it("returns the 3 most recent commits across repos", () => {
    const events = [
      {
        type: "PushEvent",
        repo: { name: "u/a" },
        payload: {
          commits: [
            { sha: "a-older", message: "feat: x" },
            { sha: "a-newer", message: "fix: y" },
          ],
        },
        created_at: "2026-04-20T10:00:00Z",
      },
      {
        type: "PushEvent",
        repo: { name: "u/b" },
        payload: { commits: [{ sha: "b-only", message: "chore: z" }] },
        created_at: "2026-04-19T10:00:00Z",
      },
    ];
    const out = parseRecentCommits(events, 3);
    expect(out.length).toBe(3);
    expect(out[0]!.sha).toBe("a-newer");
    expect(out[0]!.repo).toBe("u/a");
  });

  it("returns newest commit of a push before older commits in same push", () => {
    const events = [
      {
        type: "PushEvent",
        repo: { name: "u/a" },
        payload: {
          commits: [
            { sha: "old", message: "older commit" },
            { sha: "mid", message: "middle commit" },
            { sha: "new", message: "newest commit" },
          ],
        },
        created_at: "2026-04-20T10:00:00Z",
      },
    ];
    const out = parseRecentCommits(events, 1);
    expect(out[0]!.sha).toBe("new");
  });

  it("pads to exactly N rows with null placeholders when fewer commits exist", () => {
    const out = parseRecentCommits([], 3);
    expect(out).toEqual([null, null, null]);
  });
});

describe("parseUserStats", () => {
  it("computes uptime string from createdAt", () => {
    const stats = parseUserStats(
      { createdAt: "2022-07-30T00:00:00Z", publicRepos: 54 },
      new Date("2026-04-21"),
    );
    expect(stats.uptime).toMatch(/3y 8mo|3y 9mo/);
    expect(stats.publicRepos).toBe(54);
  });
});
