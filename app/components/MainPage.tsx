"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/anim";
import Preloader from "./Preloader";
import Navbar from "./Navbar";
import Hero from "./Hero";
import StudioIntro from "./StudioIntro";
import FeaturedProject from "./FeaturedProject";
import GameWorld from "./GameWorld";
import Haram from "./Haram";
import Assets3D from "./Assets3D";
import GlobalMarkets from "./GlobalMarkets";
import Capabilities from "./Capabilities";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import Divider from "./Divider";

gsap.registerPlugin(ScrollTrigger);

export default function MainPage() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const handleDone = useCallback(() => {
    setLoading(false);
    // small delay so curtain lift finishes, then hero intro plays
    requestAnimationFrame(() => {
      setStarted(true);
      setTimeout(() => ScrollTrigger.refresh(), 200);
    });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      duration: reduced ? 0 : 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // lock scroll during preload
    if (loading) lenis.stop();
    else lenis.start();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [loading]);

  useEffect(() => {
    if (!loading && lenisRef.current) lenisRef.current.start();
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  // refresh triggers after images load
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const t = setTimeout(onLoad, 2500);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="min-h-screen bg-void text-bone" dir="rtl">
      {loading && <Preloader onDone={handleDone} />}
      <Navbar visible={started} />

      <main>
        <Hero started={started} />
        <StudioIntro />
        <Divider text="BATTLE OF HORMUZ" />
        <FeaturedProject />
        <GameWorld />
        <Divider text="BAYN AL-HARAMAYN" outline />
        <Haram />
        <Assets3D />
        <GlobalMarkets />
        <Capabilities />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
