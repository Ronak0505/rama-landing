"use client";

import LandingShell from "./LandingShell";
import StudioHero from "./StudioHero";
import StudioIntro from "./StudioIntro";
import StudioProjects from "./StudioProjects";
import Assets3D from "./Assets3D";
import GlobalMarkets from "./GlobalMarkets";
import Capabilities from "./Capabilities";
import FinalCTA from "./FinalCTA";

export default function MainPage() {
  return (
    <LandingShell navbar="studio">
      <StudioHero />
      <StudioIntro />
      <StudioProjects />
      <Assets3D />
      <GlobalMarkets />
      <Capabilities />
      <FinalCTA variant="studio" />
    </LandingShell>
  );
}
