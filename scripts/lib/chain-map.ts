import type { ChainCode } from "../widgets/chains.js";

export interface RepoMeta {
  name: string;
  pushedAt: string;
  primaryLanguage?: string | null;
}

const LANG_TO_CHAIN: Record<string, ChainCode> = {
  Solidity: "EVM",
  Cairo: "STK",
  Clarity: "STX",
  Move: "APT",
  Cadence: "FLW",
};

export function computeChainFreshness(
  repos: RepoMeta[],
  overrides: Record<string, string[]>,
  now: Date,
): Partial<Record<ChainCode, number>> {
  const freshness: Partial<Record<ChainCode, number>> = {};
  const update = (code: ChainCode, pushedAt: string) => {
    const days = Math.floor(
      (now.getTime() - new Date(pushedAt).getTime()) / 86400000,
    );
    const prev = freshness[code];
    if (prev === undefined || days < prev) freshness[code] = days;
  };

  for (const r of repos) {
    const code = r.primaryLanguage
      ? (LANG_TO_CHAIN[r.primaryLanguage] as ChainCode | undefined)
      : undefined;
    if (code) update(code, r.pushedAt);
  }

  for (const [codeRaw, repoNames] of Object.entries(overrides)) {
    const code = codeRaw as ChainCode;
    for (const repoName of repoNames) {
      const r = repos.find((x) => x.name === repoName);
      if (r) update(code, r.pushedAt);
    }
  }

  return freshness;
}
