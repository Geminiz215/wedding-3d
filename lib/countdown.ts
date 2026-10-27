export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Time left until `targetIso` (must carry an explicit offset, e.g. +07:00). null once it has passed. */
export function getCountdown(targetIso: string, now: number = Date.now()): CountdownParts | null {
  const ms = Date.parse(targetIso) - now;
  if (!(ms > 0)) return null;
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}
