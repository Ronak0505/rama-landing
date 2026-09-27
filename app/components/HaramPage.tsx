"use client";

import LandingShell from "./LandingShell";
import HaramHero from "./HaramHero";
import Divider from "./Divider";
import Haram from "./Haram";
import FinalCTA from "./FinalCTA";

export default function HaramPage() {
  return (
    <LandingShell navbar="haram">
      <HaramHero />
      <Divider text="BAYN AL-HARAMAYN" secText="3D RECONSTRUCTION" outline />
      <Haram />
      <FinalCTA variant="haram" />
    </LandingShell>
  );
}
