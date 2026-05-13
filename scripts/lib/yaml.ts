import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import YAML from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROFILE_PATH = resolve(__dirname, "../../profile.yml");

export interface Profile {
  hero: {
    handle: string;
    subtitle: string;
    location: string;
    year: number;
    tokens: string[];
  };
  currently: string[];
  featured: Array<{
    repo: string;
    blurb: string;
    tags: string[];
    private: boolean;
  }>;
  availability: { accept: string; maybe: string; decline: string };
  hackathon: { wins: number; played: number; win_ratio_display: string };
  lastfm: { username: string };
  location: { label: string; coords: { lat: number; lon: number } };
  signature: {
    web: string;
    github: string;
    email: string;
    linkedin: string;
  };
  manifesto: {
    seed_lines: string[];
    fallback_pool: string[];
  };
  chains: { overrides: Record<string, string[]> };
}

export function loadProfile(path: string = PROFILE_PATH): Profile {
  const raw = readFileSync(path, "utf-8");
  return YAML.parse(raw) as Profile;
}
