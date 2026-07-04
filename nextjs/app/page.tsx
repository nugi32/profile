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

export default async function HomePage() {
  const journalEntries = await getNotionJournalEntries();

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
      <ProgressTracker />
      <Separator />
      <LearningDashboard />
    </>
  );
}
