import LandingPage from "@/components/page/LandingPage";
import { Projects } from "@/components/page/Projects";
import {AboutUs} from "@/components/page/AboutUs";

export default function Home() {
  return (<>
    <LandingPage />
    <Projects />
    <AboutUs />
  </>
  )
}