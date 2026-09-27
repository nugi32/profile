"use client";

import { Hero } from "./hero";
import { About } from "./about";
import { CurrentFocus } from "./current-focus";
import { Skills } from "./skills";
import { FeaturedProjects } from "./featured-projects";
import { JournalPreview } from "./journal-preview";
import { Timeline } from "./timeline";
import { KnowledgeMapPreview } from "./knowledge-map-preview";
import { WeirdThoughts } from "./weird-thoughts";
import { ProgressTracker } from "./progress-tracker";
import { LearningDashboard } from "./learning-dashboard";
import { ResumeView } from "./resume-view";
import { useViewMode } from "../providers/view-mode-provider";

/**
 * Every section pulls its own slice out of the shared CMS context, so there
 * are no props to thread through and no per-section loading states — by the
 * time this renders, all collections are already in memory.
 *
 * Sections hide themselves when their collection is empty, so the page
 * never shows a heading with nothing under it.
 */
export function HomeContent() {
  const { mode } = useViewMode();

  if (mode === "resume") {
    return <ResumeView />;
  }

  return (
    <>
      <Hero />
      <About />
      <CurrentFocus />
      <FeaturedProjects />
      <JournalPreview />
      <Skills />
      <Timeline />
      <KnowledgeMapPreview />
      <WeirdThoughts />
      <ProgressTracker />
      <LearningDashboard />
    </>
  );
}
