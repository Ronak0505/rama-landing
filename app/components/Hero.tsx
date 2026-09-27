"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Play, LayoutGrid, ChevronDown } from "lucide-react";
import { gsap, isReducedMotion, scrollToSection } from "../lib/anim";
import { useLandingStarted } from "../lib/landing-context";

export default function Hero() {
  const started = useLandingStarted();
  const root = useRef<HTMLElement>(null);
  const tlIntro = useRef<gsap.core.Timeline | null>(null);

  // Intro cinematic timeline (plays when preloader done)
  useLayoutEffect(() => {
    if (!started || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tlIntro.current = tl;
      tl.fromTo(".hero-bg",
        { scale: 1.18, opacity: 0, filter: "brightness(0.4)" },
        { scale: 1.02, opacity: 1, filter: "brightness(1)", duration: 2.4, ease: "power2.out" }
      )
      .fromTo(".hero-kicker", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=1.7")
      .fromTo(".hero-title span", { yPercent: 115 }, { yPercent: 0, duration: 1.4, stagger: 0.12 }, "-=1.5")
      .fromTo(".hero-sub", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.9")
      .fromTo(".hero-cta", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.14 }, "-=0.7")
      .fromTo(".hero-hud", { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.1 }, "-=0.8")
      .fromTo(".hero-scroll", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

      // light sweep across image
      gsap.fromTo(".hero-sweep",
        { xPercent: -140, opacity: 0 },
        { xPercent: 140, opacity: 1, duration: 3.2, ease: "power2.inOut", delay: 0.9 }
      );
      gsap.to(".hero-sweep", { opacity: 0, duration: 1, delay: 3.4 });
    }, root);
    return () => ctx.revert();
  }, [started]);

  // Scroll parallax — content fades, bg zooms out slowly
  useLayoutEffect(() => {
    if (!root.current || isReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-bg", {
        scale: 1.14,
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });
      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: 1 },
      });
      gsap.to(".hero-hud-side", {
        yPercent: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: 1 },
      });
      gsap.to(".hero-scroll", {
        opacity: 0,
        y: 30,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "30% top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden cinematic-grain">
      {/* BG */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-hormuz.jpg"
          alt="نبرد هرمز"
          className="hero-bg h-full w-full object-cover opacity-0"
          fetchPriority="high"
        />
        {/* cinematic grades */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-void/60" />
        <div className="absolute inset-0 bg-gradient-to-l from-void/70 via-transparent to-void/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
        {/* sweep light */}
        <div className="hero-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent blur-xl" />
        {/* bottom transition */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      </div>

      {/* side HUDs */}
      <div className="hero-hud hero-hud-side absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex" dir="ltr">
        <span className="font-grotesk text-[10px] tracking-[0.4em] text-white/40 [writing-mode:vertical-rl]">26.57° N — 56.27° E</span>
        <span className="h-24 w-px bg-gradient-to-b from-gold/70 to-transparent" />
        <span className="h-2 w-2 animate-pulse-glow rounded-full bg-ember" />
      </div>
      <div className="hero-hud hero-hud-side absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex" dir="ltr">
        <span className="h-2 w-2 animate-pulse-glow rounded-full bg-gold" />
        <span className="h-24 w-px bg-gradient-to-t from-gold/70 to-transparent" />
        <span className="font-grotesk text-[10px] tracking-[0.4em] text-white/40 [writing-mode:vertical-rl]">STRAIT OF HORMUZ</span>
      </div>

      {/* top meta */}
      <div className="hero-hud absolute inset-x-0 top-[84px] hidden justify-between px-10 font-grotesk text-[10px] tracking-[0.35em] text-white/45 md:flex" dir="ltr">
        <span>REMA STUDIO PRESENTS</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse-glow" /> FEATURED PROJECT — 2026</span>
      </div>

      {/* content */}
      <div className="hero-content relative z-10 mx-auto max-w-6xl px-5 text-center">
        <div className="hero-kicker inline-flex items-center gap-3 rounded-full border border-white/12 bg-black/40 px-5 py-2 backdrop-blur-md">
          <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-ember opacity-60" /><span className="h-2 w-2 rounded-full bg-ember" /></span>
          <span className="text-xs font-medium tracking-wide text-white/85">بازی موبایلی — به‌زودی</span>
          <span className="h-3 w-px bg-white/20" />
          <span className="font-grotesk text-[10px] tracking-[0.3em] text-gold" dir="ltr">MOBILE GAME</span>
        </div>

        <h1 className="hero-title mt-7 overflow-hidden font-display-fa text-[clamp(4.2rem,15vw,12rem)] leading-[0.95] text-bone drop-shadow-[0_10px_60px_rgba(0,0,0,0.7)]">
          <span className="block">نبرد <span className="gold-text">هرمز</span></span>
        </h1>
        <p className="hero-title mt-1 overflow-hidden font-bebas text-[clamp(1rem,2.4vw,1.6rem)] tracking-[0.55em] text-white/50" dir="ltr">
          <span className="block">BATTLE&nbsp;OF&nbsp;HORMUZ</span>
        </p>

        <p className="hero-sub mx-auto mt-6 max-w-xl text-base font-light leading-9 text-white/75 md:text-lg md:leading-10">
          یک نبرد برای سرزمین، در قلب خلیج فارس
          <span className="mt-2 block text-sm text-ash">تجربه‌ای سینمایی از نبردهای مدرن — طراحی‌شده برای موبایل</span>
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => scrollToSection("#hormuz")}
            className="hero-cta group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-l from-gold to-ember-soft px-9 py-4 text-sm font-bold text-black shadow-[0_10px_50px_rgba(255,90,31,0.35)] transition-shadow hover:shadow-[0_10px_60px_rgba(255,90,31,0.55)]"
          >
            <Play size={17} className="fill-black" />
            معرفی بازی
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
          <Link
            href="/"
            className="hero-cta group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-9 py-4 text-sm font-semibold text-bone backdrop-blur-md transition hover:border-gold/60 hover:bg-white/10"
          >
            <LayoutGrid size={17} className="text-gold" />
            استودیو رما
          </Link>
        </div>

        {/* mini stats */}
        <div className="hero-hud mt-12 hidden items-center justify-center gap-10 font-grotesk text-white/50 md:flex" dir="ltr">
          {[["01", "MOBILE"], ["02", "3D WORLD"], ["03", "TACTICAL"]].map(([n, t]) => (
            <div key={t} className="flex items-center gap-3">
              <span className="font-bebas text-xl text-gold/80">{n}</span>
              <span className="text-[10px] tracking-[0.3em]">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-grotesk text-[10px] tracking-[0.5em] text-white/50" dir="ltr">SCROLL</span>
        <div className="relative h-14 w-px overflow-hidden bg-white/12">
          <div className="absolute inset-0 origin-top bg-gradient-to-b from-gold to-ember animate-scroll-line" />
        </div>
        <ChevronDown size={14} className="animate-bounce text-gold/70" />
      </div>

      {/* vignette side fades for letterbox feel */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" />
    </section>
  );
}
