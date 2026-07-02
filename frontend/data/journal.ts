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
  },
  {
    slug: "building-my-own-trading-infrastructure",
    title: "Building My Own Trading Infrastructure",
    description:
      "Why I stopped renting research tools and started building Quant Terminal from scratch.",
    date: "2026-04-02",
    tags: ["quant", "engineering"],
    readingTime: 8,
    content: `Every off-the-shelf research platform I tried optimized for a customer who wasn't me. Either too much hand-holding, or too little control over execution assumptions.

## The actual requirements

1. I need to see exactly how a backtest handles slippage, not trust a black box.
2. I need my data pipeline to fail loudly, not silently drop bars.
3. I need the terminal to feel instant — anything above 200ms of latency breaks my flow.

Building it myself is slower up front and faster forever after.`,
  },
  {
    slug: "why-curiosity-compounds",
    title: "Why Curiosity Compounds",
    description:
      "Treating attention like capital: small, consistent deposits of curiosity produce outsized returns over long horizons.",
    date: "2026-03-11",
    tags: ["philosophy", "learning"],
    readingTime: 5,
    content: `Compounding usually gets explained with money. But the mechanism — small consistent gains multiplying against a growing base — applies just as well to understanding.

## Two kinds of learning

There's learning that sits in isolation, and learning that connects to five other things you already know. The second kind compounds; the first kind decays.

The practical implication: when I learn something new, the highest-value move isn't memorizing it, it's finding where it plugs into the existing graph.`,
  },
  {
    slug: "thoughts-about-intelligence",
    title: "Thoughts About Intelligence",
    description:
      "A working definition of intelligence as compression, and what that implies about building smarter systems.",
    date: "2026-02-18",
    tags: ["philosophy", "computer-science"],
    readingTime: 7,
    content: `If intelligence is largely about compression — finding the shortest useful description of a pattern — then a lot of what feels like "insight" is really just discovering a better encoding.

## Compression as a design goal

This reframes a lot of engineering problems. A good abstraction isn't the one that captures every detail; it's the one that captures the *right* detail at the lowest cost to future readers.`,
  },
  {
    slug: "the-problem-with-prediction",
    title: "The Problem With Prediction",
    description:
      "Markets punish confident predictions in a very specific way — and it's not the way most people think.",
    date: "2026-01-22",
    tags: ["finance", "epistemics"],
    readingTime: 6,
    content: `The common critique of forecasting is "you can't predict the future." That's true but not that useful. The sharper problem is that being right about direction and being right about magnitude are two different skills, and markets price in whichever one you're worse at.

## A better question

Instead of "will this go up," I've started asking "what distribution of outcomes am I actually betting against," which turns out to be a much harder and more honest question.`,
  },
];
