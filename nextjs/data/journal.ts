import type { JournalEntry } from "@/types";

export const journalEntries: JournalEntry[] = [
  {
    slug: "notes-on-reflexivity",
    title: "Notes on Reflexivity",
    description:
      "How Soros's reflexivity concept shows up outside markets, and why beliefs that change their own object are everywhere.",
    date: "2026-05-14",
    tags: ["finance", "philosophy", "systems"],
    readingTime: 6,
    content: `Reflexivity is usually introduced as a finance idea: prices don't just reflect fundamentals, they can *change* fundamentals, which then change prices again.

But the interesting version of this idea is more general. Any system where an observer's beliefs feed back into the thing being observed is reflexive — reputations, careers, even a person's sense of their own personality.

## Where it gets strange

The strange part isn't that feedback loops exist. It's that reflexive systems don't converge on a "true" value the way efficient-market theory wants them to. There may be no fixed point to settle on at all — just a moving target shaped by the act of watching it.

## A working heuristic

When I notice a system where measurement changes the measured thing, I stop asking "what is the correct value" and start asking "what is the trajectory, and who is steering it."`,
  }
];
