"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/anim";
import Preloader from "./Preloader";
import Navbar, { type NavbarVariant } from "./Navbar";
import Footer from "./Footer";
import { LandingStartedContext } from "../lib/landing-context";

gsap.registerPlugin(ScrollTrigger);

type LandingShellProps = {
  children: ReactNode;
  navbar?: NavbarVariant;
};

export default function LandingShell({ children, navbar = "studio" }: LandingShellProps) {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const handleDone = useCallback(() => {
    setLoading(false);
    requestAnimationFrame(() => {
      setStarted(true);
      setTimeout(() => ScrollTrigger.refresh(), 200);
    });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      duration: reduced ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(500, 33);

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
    <LandingStartedContext.Provider value={started}>
      <div className="min-h-screen bg-void text-bone" dir="rtl">
        {loading && <Preloader onDone={handleDone} />}
        <Navbar visible={started} variant={navbar} />

        <main>{children}</main>

        <Footer variant={navbar} />
      </div>
    </LandingStartedContext.Provider>
  );
}
