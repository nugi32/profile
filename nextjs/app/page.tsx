import { Hero } from "../components/sections/hero";
import { About } from "../components/sections/about";
import { CurrentFocus } from "../components/sections/current-focus";
import { Skills } from "../components/sections/skills";
import { FeaturedProjects } from "../components/sections/featured-projects";
import { JournalPreview } from "../components/sections/journal-preview";
import { Timeline } from "../components/sections/timeline";
import { KnowledgeMapPreview } from "../components/sections/knowledge-map-preview";
import { WeirdThoughts } from "../components/sections/weird-thoughts";
import { ProgressTracker } from "../components/sections/progress-tracker";
import { LearningDashboard } from "../components/sections/learning-dashboard";
import { Separator } from "../components/ui/separator";
import { getNotionJournalEntries } from "@/lib/notion";
import { fetchFromCms } from "@/lib/fetcher";
import type { Book, LearningItem, Paper, Metric, MonthlyDeepWork, QuarterlyReading } from "@/types";

export const dynamic = "force-dynamic";

async function fetchDashboardData() {
  try {
    const [learningRes, booksRes, papersRes, metricsRes, deepWorkRes, readingRes] = await Promise.all([
      fetchFromCms<{ docs: LearningItem[] }>("api/learning-items?depth=0").catch(() => ({ docs: [] })),
      fetchFromCms<{ docs: Book[] }>("api/books?depth=0").catch(() => ({ docs: [] })),
      fetchFromCms<{ docs: Paper[] }>("api/papers?depth=0").catch(() => ({ docs: [] })),
      fetchFromCms<{ docs: Metric[] }>("api/metrics?depth=0").catch(() => ({ docs: [] })),
      fetchFromCms<{ docs: MonthlyDeepWork[] }>("api/monthly-deep-work?depth=0").catch(() => ({ docs: [] })),
      fetchFromCms<{ docs: QuarterlyReading[] }>("api/quarterly-reading?depth=0").catch(() => ({ docs: [] })),
    ]);

    return {
      learning: learningRes?.docs ?? [],
      books: booksRes?.docs ?? [],
      papers: papersRes?.docs ?? [],
      metrics: metricsRes?.docs ?? [],
      deepWork: deepWorkRes?.docs ?? [],
      reading: readingRes?.docs ?? [],
    };
  } catch {
    return {
      learning: [],
      books: [],
      papers: [],
      metrics: [],
      deepWork: [],
      reading: [],
    };
  }
}

export default async function HomePage() {
  const [journalEntries, dashboardData] = await Promise.all([
    getNotionJournalEntries(),
    fetchDashboardData(),
  ]);

  return (
    <>
      <Hero />
      <Separator />
      <About />
      <Separator />
      <CurrentFocus />
      <Separator />
      <Skills />
      <Separator />
      <FeaturedProjects />
      <Separator />
      <JournalPreview entries={journalEntries} />
      <Separator />
      <Timeline />
      <Separator />
      <KnowledgeMapPreview />
      <Separator />
      <WeirdThoughts />
      <Separator />
      <ProgressTracker 
        metrics={dashboardData.metrics} 
        deepWork={dashboardData.deepWork}
        reading={dashboardData.reading}
      />
      <Separator />
      <LearningDashboard 
        learning={dashboardData.learning}
        books={dashboardData.books}
        papers={dashboardData.papers}
      />
    </>
  );
}
