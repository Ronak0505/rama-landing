"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Layers, ChevronDown, ArrowLeft } from "lucide-react";
import { gsap, isReducedMotion, scrollToSection } from "../lib/anim";
import { useLandingStarted } from "../lib/landing-context";

function whenHeroImageReady(img: HTMLImageElement | null): Promise<void> {
  if (!img) return Promise.resolve();
  if (img.complete && img.naturalWidth > 0) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => resolve();
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
    window.setTimeout(done, 4000);
  });
}

export default function StudioHero() {
  const started = useLandingStarted();
  const root = useRef<HTMLElement>(null);
  const bgParallax = useRef<HTMLDivElement>(null);
  const bgImg = useRef<HTMLImageElement>(null);
  const bgDim = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const scrollHint = useRef<HTMLDivElement>(null);
  const sweep = useRef<HTMLDivElement>(null);
  const introDone = useRef(false);
  const scrollCtxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    if (!started || !root.current || introDone.current) return;

    let cancelled = false;
    let introCtx: gsap.Context | undefined;

    const runIntro = () => {
      if (cancelled || introDone.current || !root.current) return;

      const reduced = isReducedMotion();
      const revealLines = root.current.querySelectorAll<HTMLElement>(".sh-reveal");
      const revealSubs = root.current.querySelectorAll<HTMLElement>(".sh-sub");
      const revealCtas = root.current.querySelectorAll<HTMLElement>(".sh-cta");

      gsap.set(bgImg.current, { opacity: 0, scale: 1.2, force3D: true, willChange: "transform,opacity" });
      gsap.set(bgDim.current, { opacity: 0.65 });
      gsap.set(revealLines, { yPercent: 120, force3D: true });
      gsap.set(revealSubs, { y: 22, opacity: 0 });
      gsap.set(revealCtas, { y: 24, opacity: 0 });
      gsap.set(scrollHint.current, { opacity: 0, y: 10 });
      gsap.set(content.current, { visibility: "visible" });
      gsap.set(scrollHint.current, { visibility: "visible" });

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
          onComplete: () => {
            introDone.current = true;
            gsap.set(bgImg.current, { clearProps: "willChange" });
            setupScrollParallax();
          },
        });

        if (reduced) {
          tl.set(bgImg.current, { opacity: 1, scale: 1, force3D: true })
            .set(bgDim.current, { opacity: 0 })
            .to(revealLines, { yPercent: 0, duration: 0.6, stagger: 0.08 })
            .to(revealSubs, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
            .to(revealCtas, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, "-=0.25")
            .to(scrollHint.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
          return;
        }

        tl.to(bgImg.current, {
          scale: 1.04,
          opacity: 1,
          duration: 2.5,
          ease: "power2.out",
        })
          .to(bgDim.current, { opacity: 0, duration: 2.2, ease: "power2.out" }, 0)
          .to(revealLines, { yPercent: 0, duration: 1.35, stagger: 0.1, force3D: true }, "-=1.6")
          .to(revealSubs, { y: 0, opacity: 1, duration: 1 }, "-=0.9")
          .to(revealCtas, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, force3D: true }, "-=0.65")
          .to(scrollHint.current, { opacity: 1, y: 0, duration: 0.75 }, "-=0.5");

        if (sweep.current) {
          gsap.fromTo(
            sweep.current,
            { xPercent: -130, opacity: 0, force3D: true },
            { xPercent: 130, opacity: 0.85, duration: 3, ease: "power2.inOut", delay: 0.8 },
          );
          gsap.to(sweep.current, { opacity: 0, duration: 1, delay: 3.2 });
        }
      }, root);

      return ctx;
    };

    const setupScrollParallax = () => {
      if (cancelled || !root.current || isReducedMotion()) return;

      scrollCtxRef.current?.revert();
      scrollCtxRef.current = gsap.context(() => {
        if (bgParallax.current) gsap.set(bgParallax.current, { willChange: "transform" });
        if (content.current) gsap.set(content.current, { willChange: "transform,opacity" });

        gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.85,
          },
        })
          .fromTo(
            bgParallax.current,
            { scale: 1.04, yPercent: 0, force3D: true },
            { scale: 1.12, yPercent: 10, ease: "none", duration: 1 },
            0,
          )
          .fromTo(
            content.current,
            { yPercent: 0, opacity: 1, scale: 1, force3D: true },
            { yPercent: -16, opacity: 0, scale: 0.985, ease: "none", duration: 0.65 },
            0,
          )
          .fromTo(scrollHint.current, { opacity: 1, y: 0 }, { opacity: 0, y: 24, ease: "none", duration: 0.28 }, 0);
      }, root);
    };

    void whenHeroImageReady(bgImg.current).then(() => {
      if (cancelled) return;
      introCtx = runIntro();
    });

    return () => {
      cancelled = true;
      introCtx?.revert();
      scrollCtxRef.current?.revert();
      scrollCtxRef.current = null;
      introDone.current = false;
    };
  }, [started]);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden cinematic-grain"
    >
      <div className="absolute inset-0">
        <div ref={bgParallax} className="absolute inset-0 transform-gpu">
          <img
            ref={bgImg}
            src="/images/studio-hologram.jpg"
            alt="استودیو رما"
            className="sh-bg h-full w-full object-cover opacity-0 transform-gpu"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div ref={bgDim} className="pointer-events-none absolute inset-0 bg-black opacity-[0.65]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/65" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-void/75 via-transparent to-void/35" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(232,180,74,0.12),transparent_55%)]" />
        <div
          ref={sweep}
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transform-gpu opacity-0"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-void to-transparent" />
      </div>

      <div ref={content} className="sh-content invisible relative z-10 mx-auto max-w-6xl px-5 text-center transform-gpu">
        <h1 className="sh-title mt-7 overflow-hidden font-display-fa text-[clamp(3.6rem,13vw,10rem)] leading-[0.98] text-bone drop-shadow-[0_10px_60px_rgba(0,0,0,0.75)] h-[170px]">
          <span className="sh-reveal block">
            استودیو <span className="gold-text">رما</span>
          </span>
        </h1>
        <p
          className="sh-title mt-2 overflow-hidden font-bebas text-[clamp(0.95rem,2.2vw,1.5rem)] tracking-[0.55em] text-white/45"
          dir="ltr"
        >
          <span className="sh-reveal block">RAMA STUDIO</span>
        </p>

        <p className="sh-sub mx-auto mt-6 max-w-2xl text-base font-light leading-9 text-white/72 md:text-lg md:leading-10">
          خلق بازی، جهان‌های سه‌بعدی و تجربه‌های تعاملی با نگاه سینمایی
          <span className="mt-2 block text-sm text-ash">
            از ایده تا محصول — بازی‌سازی، هنر سه‌بعدی و تولید محتوای دیجیتال
          </span>
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => scrollToSection("#studio")}
            className="sh-cta cursor-pointer group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-l from-gold to-ember-soft px-9 py-4 text-sm font-bold text-black shadow-[0_10px_50px_rgba(255,90,31,0.32)] transition-shadow hover:shadow-[0_10px_60px_rgba(255,90,31,0.5)]"
          >
            <Layers size={17} />
            درباره استودیو
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
          <Link
            href="/hormoz"
            className="sh-cta group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-9 py-4 text-sm font-semibold text-bone backdrop-blur-md transition hover:border-gold/60 hover:bg-white/10"
          >
            نبرد هرمز
            <ArrowLeft size={17} className="text-gold transition-transform group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div
        ref={scrollHint}
        className="sh-scroll invisible absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 transform-gpu"
      >
        <span className="font-grotesk text-sm text-white/50" dir="ltr">
          اسکرول کنید
        </span>
        <div className="relative h-14 w-px overflow-hidden bg-white/12">
          <div className="absolute inset-0 origin-top bg-gradient-to-b from-gold to-ember animate-scroll-line" />
        </div>
        <ChevronDown size={14} className="animate-bounce text-gold/70" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" />
    </section>
  );
}
