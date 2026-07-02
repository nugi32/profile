import type { Metric, MonthlyDeepWork, QuarterlyReading } from "@/types";

export const metrics: Metric[] = [
  { label: "Books Read", value: 32, icon: "book" },
  { label: "Research Papers", value: 58, icon: "paper" },
  { label: "Public Notes", value: 174, icon: "note" },
  { label: "Projects Completed", value: 16, icon: "project" },
  { label: "Hours of Deep Work", value: 2140, icon: "clock" },
  { label: "Algorithms Tested", value: 37, icon: "code" },
  { label: "Articles Written", value: 54, icon: "pen" },
  { label: "Day Learning Streak", value: 128, icon: "flame" },
];

export const monthlyDeepWork: MonthlyDeepWork[] = [
  { month: "Jan", hours: 142 },
  { month: "Feb", hours: 158 },
  { month: "Mar", hours: 171 },
  { month: "Apr", hours: 165 },
  { month: "May", hours: 188 },
  { month: "Jun", hours: 176 },
];

export const quarterlyReading: QuarterlyReading[] = [
  { quarter: "Q1 2025", books: 6 },
  { quarter: "Q2 2025", books: 8 },
  { quarter: "Q3 2025", books: 7 },
  { quarter: "Q4 2025", books: 5 },
  { quarter: "Q1 2026", books: 6 },
];
