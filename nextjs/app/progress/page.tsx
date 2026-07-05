import { ProgressTracker } from "../../components/sections/progress-tracker";
import { fetchFromCms } from "@/lib/fetcher";
import type { Metric, MonthlyDeepWork, QuarterlyReading } from "@/types";

async function getProgressData() {
  try {
    const [metricsRes, deepWorkRes, readingRes] = await Promise.all([
      fetchFromCms<{ docs: Metric[] }>("api/metrics?depth=0").catch(() => ({ docs: [] })),
      fetchFromCms<{ docs: MonthlyDeepWork[] }>("api/monthly-deep-work?depth=0").catch(() => ({ docs: [] })),
      fetchFromCms<{ docs: QuarterlyReading[] }>("api/quarterly-reading?depth=0").catch(() => ({ docs: [] })),
    ]);

    return {
      metrics: metricsRes?.docs ?? [],
      deepWork: deepWorkRes?.docs ?? [],
      reading: readingRes?.docs ?? [],
    };
  } catch {
    return {
      metrics: [],
      deepWork: [],
      reading: [],
    };
  }
}

export default async function ProgressPage() {
  const progressData = await getProgressData();

  return (
    <section className="container py-24">
      <ProgressTracker 
        metrics={progressData.metrics}
        deepWork={progressData.deepWork}
        reading={progressData.reading}
      />
    </section>
  );
}
