const API_KEY = process.env.LASTFM_API_KEY;
const ROOT = "https://ws.audioscrobbler.com/2.0/";

export interface LastfmState {
  dormant: boolean;
  track?: string;
  plays?: number;
}

export function parseRecentTrack(
  payload: any,
  username: string,
): LastfmState {
  if (!username) return { dormant: true };
  const t = payload?.recenttracks?.track?.[0];
  if (!t) return { dormant: true };
  return {
    dormant: false,
    track: `${t.name} — ${t.artist["#text"] ?? t.artist.name}`,
  };
}

export function parseTopWeeklyTrack(
  payload: any,
  username: string,
): LastfmState {
  if (!username) return { dormant: true };
  const t = payload?.toptracks?.track?.[0];
  if (!t) return { dormant: true };
  return {
    dormant: false,
    track: `${t.name} — ${t.artist.name}`,
    plays: Number(t.playcount),
  };
}

export async function fetchLastfmData(username: string) {
  if (!username || !API_KEY)
    return { recent: null, top: null };
  const [recentRes, topRes] = await Promise.all([
    fetch(
      `${ROOT}?method=user.getrecenttracks&user=${encodeURIComponent(username)}&api_key=${API_KEY}&format=json&limit=1`,
    ),
    fetch(
      `${ROOT}?method=user.gettoptracks&user=${encodeURIComponent(username)}&api_key=${API_KEY}&period=7day&format=json&limit=1`,
    ),
  ]);
  const recent = recentRes.ok ? await recentRes.json() : null;
  const top = topRes.ok ? await topRes.json() : null;
  return { recent, top };
}
