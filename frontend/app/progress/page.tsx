import { ProgressTracker } from "../../components/sections/progress-tracker";
import { SectionHeader } from "../../components/layout/section-header";

export default function ProgressPage() {
  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Progress"
        title="Progress Tracker"
        description="A dashboard for the metrics, habits, and experiments that matter most."
      />
      <ProgressTracker />
    </section>
  );
}
