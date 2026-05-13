import { describe, it, expect } from "vitest";
import { isoWeekNumber, pickByWeek } from "../../scripts/lib/week-rotation.js";

describe("isoWeekNumber", () => {
  it("returns 1 for first week of January 2024", () => {
    expect(isoWeekNumber(new Date("2024-01-01T00:00:00Z"))).toBe(1);
  });
  it("returns 52 for end of December 2023", () => {
    expect(isoWeekNumber(new Date("2023-12-25T00:00:00Z"))).toBe(52);
  });
  it("two dates in same ISO week return same number", () => {
    const monday = new Date("2026-05-11T00:00:00Z");
    const sunday = new Date("2026-05-17T23:59:00Z");
    expect(isoWeekNumber(monday)).toBe(isoWeekNumber(sunday));
  });
});

describe("pickByWeek", () => {
  it("returns a stable element within a week", () => {
    const arr = ["a", "b", "c", "d"];
    const day1 = new Date("2026-05-11T00:00:00Z");
    const day2 = new Date("2026-05-15T12:00:00Z");
    expect(pickByWeek(arr, day1)).toBe(pickByWeek(arr, day2));
  });
  it("rotates across weeks (different week → may differ)", () => {
    const arr = Array.from({ length: 53 }, (_, i) => String(i));
    const a = pickByWeek(arr, new Date("2026-01-05T00:00:00Z"));
    const b = pickByWeek(arr, new Date("2026-01-12T00:00:00Z"));
    expect(a).not.toBe(b);
  });
  it("wraps cleanly when week > array length", () => {
    const arr = ["x", "y"];
    expect(() => pickByWeek(arr, new Date("2026-12-30T00:00:00Z"))).not.toThrow();
  });
  it("throws on empty array", () => {
    expect(() => pickByWeek([], new Date())).toThrow();
  });
});
