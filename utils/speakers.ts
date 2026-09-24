import type { Session } from "@/types/session";

export interface Speaker {
  name: string;
  sessions: Session[];
}

/**
 * The closing panel's `speaker` column holds "Full speaker lineup" — a
 * placeholder for "everyone on stage", not a real person. It must never show
 * up as its own card on the Speakers page.
 */
const NON_SPEAKER_VALUES = new Set(["Full speaker lineup"]);

/**
 * Groups sessions by speaker, sorted by speaker name. Each speaker's
 * sessions keep the order they arrive in (already chronological, since
 * `fetchSessions` orders by `start_time`).
 */
export function groupSessionsBySpeaker(sessions: Session[]): Speaker[] {
  const byName = new Map<string, Session[]>();

  for (const session of sessions) {
    if (NON_SPEAKER_VALUES.has(session.speaker)) continue;

    const existing = byName.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      byName.set(session.speaker, [session]);
    }
  }

  return Array.from(byName, ([name, speakerSessions]) => ({
    name,
    sessions: speakerSessions,
  })).sort((a, b) => a.name.localeCompare(b.name));
}
