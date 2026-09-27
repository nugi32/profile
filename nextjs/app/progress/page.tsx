import { ProgressTracker } from "../../components/sections/progress-tracker";

export const metadata = {
  title: "Progress",
  description:
    "Self-development, measured: deep work hours, reading volume, and compounding metrics.",
};

export default function ProgressPage() {
  // Data comes from the shared CMS context (metrics, monthly-deep-work,
  // quarterly-reading). The tracker brings its own section wrapper.
  return <ProgressTracker />;
}
