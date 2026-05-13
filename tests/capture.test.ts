import { describe, it, expect } from "vitest";
import { eventsToActivity, type GHEventLike } from "../scripts/capture.js";

describe("eventsToActivity", () => {
  it("counts commits across PushEvents", () => {
    const events: GHEventLike[] = [
      {
        type: "PushEvent",
        repo: { name: "user/starkbase" },
        payload: { commits: [{ sha: "1", message: "a" }, { sha: "2", message: "b" }] },
        created_at: "2026-05-13T09:00:00Z",
      },
      {
        type: "PushEvent",
        repo: { name: "user/ai-browse" },
        payload: { commits: [{ sha: "3", message: "c" }] },
        created_at: "2026-05-13T10:00:00Z",
      },
    ];
    const out = eventsToActivity(events);
    expect(out.commitsByRepo).toEqual({ starkbase: 2, "ai-browse": 1 });
  });
  it("counts opened PRs and tracks repo", () => {
    const events: GHEventLike[] = [
      {
        type: "PullRequestEvent",
        repo: { name: "user/starkbase" },
        payload: { action: "opened" },
        created_at: "2026-05-13T09:00:00Z",
      },
    ];
    const out = eventsToActivity(events);
    expect(out.prsOpened).toBe(1);
    expect(out.prsOpenedRepo).toBe("starkbase");
  });
  it("counts review events", () => {
    const events: GHEventLike[] = [
      { type: "PullRequestReviewEvent", repo: { name: "x/y" }, payload: {}, created_at: "2026-05-13T09:00:00Z" },
      { type: "PullRequestReviewEvent", repo: { name: "x/y" }, payload: {}, created_at: "2026-05-13T09:00:00Z" },
    ];
    expect(eventsToActivity(events).reviewsGiven).toBe(2);
  });
  it("counts opened issues", () => {
    const events: GHEventLike[] = [
      { type: "IssuesEvent", repo: { name: "x/y" }, payload: { action: "opened" }, created_at: "2026-05-13T09:00:00Z" },
    ];
    expect(eventsToActivity(events).issuesOpened).toBe(1);
  });
  it("returns all-zero activity for empty events", () => {
    const out = eventsToActivity([]);
    expect(out.commitsByRepo).toEqual({});
    expect(out.prsOpened).toBe(0);
    expect(out.reviewsGiven).toBe(0);
    expect(out.issuesOpened).toBe(0);
  });
});
