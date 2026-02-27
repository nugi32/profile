'use client'

import LandingPage from "@/components/page/LandingPage";
import { Projects } from "@/components/page/Projects";
import {AboutUs} from "@/components/page/AboutUs";
import Snowfall from "@/components/snow";
import ScrollHandler from "@/components/ScrollHandler";

export default function Home() {
  return (
    <>
      {/* handle scrollTo query parameter */}
      <ScrollHandler />
      <LandingPage />
      <Projects />
      <AboutUs />
    </>
  );
}