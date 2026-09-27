"use client";

import LandingShell from "./LandingShell";
import Hero from "./Hero";
import FeaturedProject from "./FeaturedProject";
import GameWorld from "./GameWorld";
import FinalCTA from "./FinalCTA";
import Divider from "./Divider";

export default function HormozPage() {
  return (
    <LandingShell navbar="game">
      <Hero />
      <Divider text="BATTLE OF HORMUZ" secText="MOBILE TACTICAL" />
      <FeaturedProject />
      <GameWorld />
      <FinalCTA variant="game" />
    </LandingShell>
  );
}
