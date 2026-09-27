import { HomeContent } from "../components/sections/home-content";

/**
 * All content is loaded once, client-side, by <CmsProvider> in app/layout.tsx.
 * This page therefore renders no data of its own — it only chooses between
 * the explore view and the resume view.
 */
export default function HomePage() {
  return <HomeContent />;
}
