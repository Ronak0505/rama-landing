"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Landmark, ChevronDown, ArrowLeft } from "lucide-react";
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

export default function HaramHero() {
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
      const revealLines = root.current.querySelectorAll<HTMLElement>(".hh-reveal");
      const revealSubs = root.current.querySelectorAll<HTMLElement>(".hh-sub");
      const revealCtas = root.current.querySelectorAll<HTMLElement>(".hh-cta");

      gsap.set(bgImg.current, { opacity: 0, scale: 1.2, force3D: true, willChange: "transform,opacity" });
      gsap.set(bgDim.current, { opacity: 0.7 });
      gsap.set(revealLines, { yPercent: 120, force3D: true });
      gsap.set(revealSubs, { y: 22, opacity: 0 });
      gsap.set(revealCtas, { y: 24, opacity: 0 });
      gsap.set(root.current.querySelector(".hh-kicker"), { y: 20, opacity: 0 });
      gsap.set(scrollHint.current, { opacity: 0, y: 10 });
      gsap.set(content.current, { visibility: "visible" });
      gsap.set(scrollHint.current, { visibility: "visible" });

      introCtx = gsap.context(() => {
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

        tl.to(bgImg.current, { scale: 1.04, opacity: 1, duration: 2.5, ease: "power2.out" })
          .to(bgDim.current, { opacity: 0, duration: 2.2, ease: "power2.out" }, 0)
          .to(".hh-kicker", { y: 0, opacity: 1, duration: 0.9 }, "-=1.7")
          .to(revealLines, { yPercent: 0, duration: 1.35, stagger: 0.1, force3D: true }, "-=1.6")
          .to(revealSubs, { y: 0, opacity: 1, duration: 1 }, "-=0.9")
          .to(revealCtas, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, force3D: true }, "-=0.65")
          .to(scrollHint.current, { opacity: 1, y: 0, duration: 0.75 }, "-=0.5");

        if (sweep.current) {
          gsap.fromTo(
            sweep.current,
            { xPercent: -130, opacity: 0, force3D: true },
            { xPercent: 130, opacity: 0.75, duration: 3, ease: "power2.inOut", delay: 0.8 },
          );
          gsap.to(sweep.current, { opacity: 0, duration: 1, delay: 3.2 });
        }
      }, root);
    };

    const setupScrollParallax = () => {
      if (cancelled || !root.current || isReducedMotion()) return;

      scrollCtxRef.current?.revert();
      scrollCtxRef.current = gsap.context(() => {
        if (bgParallax.current) gsap.set(bgParallax.current, { willChange: "transform" });
        if (content.current) gsap.set(content.current, { willChange: "transform,opacity" });

        gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.85 },
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
      runIntro();
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
            src="/images/haram-night.jpg"
            alt="بین‌الحرمین"
            className="h-full w-full object-cover opacity-0 transform-gpu"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div ref={bgDim} className="pointer-events-none absolute inset-0 bg-black opacity-[0.7]" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/45 to-void/65" />
        <div className="absolute inset-0 bg-gradient-to-l from-void/80 via-transparent to-void/40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(251,191,36,0.14),transparent_55%)]" />
        <div
          ref={sweep}
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber-100/[0.05] to-transparent transform-gpu opacity-0"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-void to-transparent" />
      </div>

      <div ref={content} className="invisible relative z-10 mx-auto max-w-6xl px-5 text-center transform-gpu">
        <div className="hh-kicker mx-auto inline-flex items-center gap-3 rounded-full border border-amber-200/25 bg-black/45 px-5 py-2 backdrop-blur-md">
          <Landmark size={14} className="text-amber-200" />
          <span className="font-grotesk text-[10px] tracking-[0.32em] text-amber-100/90" dir="ltr">
            3D RECONSTRUCTION
          </span>
        </div>

        <h1 className="mt-6 overflow-hidden font-display-fa text-[clamp(2.8rem,10vw,7.5rem)] leading-[1.05] text-bone drop-shadow-[0_10px_60px_rgba(0,0,0,0.8)]">
          <span className="hh-reveal block">بازسازی سه‌بعدی</span>
          <span className="hh-reveal block">
            حرم مطهر امام حسین <span className="text-amber-200">(ع)</span>
          </span>
        </h1>
        <p className="mt-3 overflow-hidden font-grotesk text-[clamp(0.75rem,2vw,1rem)] tracking-[0.42em] text-white/45" dir="ltr">
          <span className="hh-reveal block">HOLY SHRINE — BAYN AL-HARAMAYN</span>
        </p>

        <p className="hh-sub mx-auto mt-6 max-w-2xl text-base font-light leading-9 text-white/72 md:text-lg md:leading-10">
          بازنمایی معماری مقدس با دقت سه‌بعدی، متریال واقع‌گرایانه و نورپردازی سینمایی
          <span className="mt-2 block text-sm text-ash">برای محیط‌های دیجیتال، تعاملی و بلادرنگ</span>
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => scrollToSection("#haram")}
            className="hh-cta group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-l from-amber-200 to-amber-400 px-9 py-4 text-sm font-bold text-black shadow-[0_10px_50px_rgba(251,191,36,0.28)] transition-shadow hover:shadow-[0_10px_60px_rgba(251,191,36,0.42)]"
          >
            <Landmark size={17} />
            مشاهده پروژه
          </button>
          <Link
            href="/"
            className="hh-cta group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-9 py-4 text-sm font-semibold text-bone backdrop-blur-md transition hover:border-amber-200/50 hover:bg-white/10"
          >
            استودیو رما
            <ArrowLeft size={17} className="text-amber-200 transition-transform group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div
        ref={scrollHint}
        className="invisible absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 transform-gpu"
      >
        <span className="font-grotesk text-sm text-white/50">اسکرول کنید</span>
        <div className="relative h-14 w-px overflow-hidden bg-white/12">
          <div className="absolute inset-0 origin-top bg-gradient-to-b from-amber-200 to-ember animate-scroll-line" />
        </div>
        <ChevronDown size={14} className="animate-bounce text-amber-200/80" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" />
    </section>
  );
}
