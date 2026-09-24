import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Speaker } from "@/utils/speakers";

import { SpeakerCard } from "./speaker-card";

const speaker: Speaker = {
  name: "Marta Fernandez",
  sessions: [
    {
      id: "opening-keynote",
      title: "Opening Keynote: The Shape of Frontend in 2026",
      speaker: "Marta Fernandez",
      track: "Architecture",
      room: "Main Hall",
      startTime: "09:00",
      durationMinutes: 30,
      description: "",
    },
  ],
};

describe("SpeakerCard", () => {
  it("shows the speaker's name as a level-2 heading", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Marta Fernandez" }),
    ).toBeInTheDocument();
  });

  it("shows each session's start time and title", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(
      screen.getByText("Opening Keynote: The Shape of Frontend in 2026"),
    ).toBeInTheDocument();
  });

  it("links each session to its session page, with the title in the accessible name", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(
      screen.getByRole("link", {
        name: "Opening Keynote: The Shape of Frontend in 2026, 09:00",
      }),
    ).toHaveAttribute("href", "/en/sessions/opening-keynote");
  });

  it("renders a link per session when a speaker gives more than one", () => {
    const multiSessionSpeaker: Speaker = {
      name: "Diego Castellanos",
      sessions: [
        { ...speaker.sessions[0], id: "session-a", title: "Session A" },
        { ...speaker.sessions[0], id: "session-b", title: "Session B" },
      ],
    };

    render(<SpeakerCard speaker={multiSessionSpeaker} />);

    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
