import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./speakers";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    level: "intermediate",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups sessions under their speaker, sorted by speaker name", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Naia Etxeberria" }),
      session({ id: "s2", speaker: "Diego Castellanos" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual([
      "Diego Castellanos",
      "Naia Etxeberria",
    ]);
  });

  it("keeps every session a speaker gives under the same entry", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Marta Fernandez", title: "First" }),
      session({ id: "s2", speaker: "Marta Fernandez", title: "Second" }),
    ]);

    expect(speakers).toEqual([
      {
        name: "Marta Fernandez",
        sessions: [
          expect.objectContaining({ id: "s1", title: "First" }),
          expect.objectContaining({ id: "s2", title: "Second" }),
        ],
      },
    ]);
  });

  it("excludes the closing panel's 'Full speaker lineup' placeholder", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
      session({ id: "s1", speaker: "Sofia Almeida" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual(["Sofia Almeida"]);
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
