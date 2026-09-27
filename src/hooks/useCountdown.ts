import { useEffect, useState } from "react";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function diffToParts(ms: number): CountdownValue {
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, isExpired: false };
}

/**
 * Counts down to an absolute instant (an ISO string carrying its own
 * UTC offset, e.g. "...+05:30"), so it is correct for every visitor
 * regardless of their local timezone or DST rules — the browser resolves
 * the offset once via Date.parse and everything after that is plain math.
 */
export function useCountdown(isoDateTime: string): CountdownValue {
  const target = new Date(isoDateTime).getTime();
  const [value, setValue] = useState<CountdownValue>(() =>
    diffToParts(target - Date.now())
  );

  useEffect(() => {
    // Guard against an unparseable date so the page never crashes.
    if (Number.isNaN(target)) return;

    const tick = () => setValue(diffToParts(target - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return value;
}
