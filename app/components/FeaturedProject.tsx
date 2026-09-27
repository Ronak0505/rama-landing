"use client";

import { useLayoutEffect, useRef } from "react";
import { Crosshair, Mountain, Boxes, Palette, Gamepad2, Smartphone, ChevronLeft } from "lucide-react";
import { gsap, isReducedMotion, scrollToSection } from "../lib/anim";

const features = [
  { icon: Mountain, title: "طراحی محیط", en: "ENVIRONMENT" },
  { icon: Boxes, title: "مدل‌سازی سه‌بعدی", en: "3D MODELING" },
  { icon: Palette, title: "فضای بصری", en: "ART DIRECTION" },
  { icon: Gamepad2, title: "گیم‌پلی موبایل", en: "GAMEPLAY" },
];

export default function FeaturedProject() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || isReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.set([".fp-bg", ".fp-bg-wrap", ".fp-p1", ".fp-p2", ".fp-card"], { force3D: true });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: ".fp-wrap",
          start: "top top",
          end: "+=380%",
          pin: true,
          scrub: 1,
          fastScrollEnd: true,
          anticipatePin: 1,
          invalidateOnRefresh: false,
        },
      });

      tl.fromTo(".fp-bg", { scale: 1.28 }, { scale: 1.02, duration: 10, ease: "none" }, 0);
      tl.fromTo(".fp-p1-kicker", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.2)
        .fromTo(".fp-p1-title", { yPercent: 110 }, { yPercent: 0, duration: 1.4, stagger: 0.1 }, 0.3)
        .fromTo(".fp-p1-sub", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.9)
        .to(".fp-p1", { yPercent: -26, opacity: 0, duration: 1.2, ease: "power2.in" }, 2.6);

      tl.to(".fp-bg-wrap", { xPercent: 24, scale: 0.92, duration: 1.6, ease: "power3.inOut" }, 3.2)
        .fromTo(".fp-shade", { opacity: 0.55 }, { opacity: 0.82, duration: 1.6 }, 3.2)
        .fromTo(".fp-p2", { xPercent: -12, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.4 }, 3.4)
        .fromTo(".fp-feat", { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }, 3.8)
        .to(".fp-p2", { xPercent: 10, opacity: 0, duration: 1 }, 6.2)
        .to(".fp-bg-wrap", { xPercent: 0, scale: 1, duration: 1.4, ease: "power3.inOut" }, 6.2);

      tl.fromTo(".fp-p3-head", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 6.6)
        .fromTo(
          ".fp-card",
          { y: 140, opacity: 0, rotate: 2 },
          { y: 0, opacity: 1, rotate: 0, duration: 1.1, stagger: 0.18 },
          6.9,
        )
        .to(".fp-progress-fill", { scaleX: 1, duration: 10, ease: "none" }, 0);

      // HUD step indicator
      const steps = gsap.utils.toArray<HTMLElement>(".fp-step");
      steps.forEach((s, i) => {
        tl.to(s, { opacity: 1, color: "#e8b44a", duration: 0.3 }, 0.5 + i * 2.4);
        if (i > 0) tl.to(steps[i - 1], { opacity: 0.35, color: "#ffffff", duration: 0.3 }, 0.5 + i * 2.4);
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="hormuz" className="relative bg-coal">
      {/* ============ DESKTOP PINNED CINEMATIC ============ */}
      <div className="fp-wrap relative hidden h-screen overflow-hidden md:block cinematic-grain" dir="ltr">
        {/* bg */}
        <div className="fp-bg-wrap absolute inset-0 transform-gpu">
          <img
            src="/images/game-night.jpg"
            alt="نبرد هرمز"
            className="fp-bg h-full w-full object-cover transform-gpu"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="fp-shade absolute inset-0 bg-void/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/70" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />

        {/* top meta */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-10 pt-24 font-grotesk text-[10px] tracking-[0.35em] text-white/50">
          <span>02 — FEATURED PROJECT</span>
          <span className="flex items-center gap-2 text-gold"><Smartphone size={13} /> MOBILE • TACTICAL • 3D</span>
        </div>

        {/* side steps */}
        <div className="absolute right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-5 font-bebas text-lg">
          {["01", "02", "03"].map((s, i) => (
            <div key={s} className="fp-step flex items-center gap-3 text-white/70" style={{ opacity: i === 0 ? 1 : 0.35 }}>
              <span>{s}</span>
              <span className={`h-8 w-px ${i === 0 ? "bg-gold" : "bg-white/20"}`} />
            </div>
          ))}
        </div>

        {/* PHASE 1 */}
        <div className="fp-p1 absolute inset-0 z-10 flex flex-col items-center justify-center px-10 text-center" dir="rtl">
          <div className="fp-p1-kicker flex items-center gap-3 rounded-full border border-gold/40 bg-black/50 px-5 py-2 backdrop-blur-md">
            <Crosshair size={14} className="text-gold" />
            <span className="text-xs text-gold">مهم‌ترین پروژه استودیو</span>
          </div>
          <h2 className="mt-6 overflow-hidden font-display-fa text-[clamp(4rem,11vw,10rem)] leading-none text-bone h-[202px]">
            <span className="fp-p1-title block">نبرد هرمز</span>
          </h2>
          <div className="overflow-hidden">
            <p className="fp-p1-title font-bebas text-xl tracking-[0.5em] text-white/60" dir="ltr">BATTLE OF HORMUZ</p>
          </div>
          <p className="fp-p1-sub mt-6 max-w-2xl text-sm font-light leading-8 text-white/70 md:text-base md:leading-9">
            بازی موبایلی «نبرد هرمز» یکی از پروژه‌های اصلی استودیو رما است که با هدف ارائه یک تجربه بازی‌محور برای پلتفرم موبایل توسعه داده شده است.
          </p>
        </div>

        {/* PHASE 2 — info panel */}
        <div className="absolute inset-0 z-10 flex items-center px-10" dir="rtl">
          <div className="mr-16 fp-p2 w-[440px] max-w-[42vw] rounded-3xl border border-white/10 bg-black/60 p-9 opacity-0 backdrop-blur-2xl">
            <div className="font-grotesk text-[10px] tracking-[0.4em] text-gold" dir="ltr">PRODUCTION FOCUS</div>
            <h3 className="mt-3 font-display-fa text-4xl text-bone">فرآیند تولید</h3>
            <p className="mt-4 text-sm font-light leading-8 text-white/65">
              بخش قابل توجهی از فرآیند تولید این پروژه شامل طراحی محیط، مدل‌سازی سه‌بعدی، ساخت Asset و توسعه عناصر متناسب با گیم‌پلی بوده است.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {features.map((f) => (
                <div key={f.en} className="fp-feat flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
                  <f.icon size={17} className="shrink-0 text-gold" />
                  <div>
                    <div className="text-[12px] font-semibold text-bone">{f.title}</div>
                    <div className="font-grotesk text-[9px] tracking-[0.2em] text-ash" dir="ltr">{f.en}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PHASE 3 — layered gallery */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-16" dir="rtl">
          <div className="fp-p3-head mx-auto mb-6 text-center opacity-0">
            <div className="font-grotesk text-[10px] tracking-[0.4em] text-gold" dir="ltr">IN-GAME CAPTURES</div>
            <div className="mt-2 text-xl font-semibold text-bone">نگاهی به دنیای نبرد</div>
          </div>
          <div className="flex items-end justify-center gap-5 px-10" dir="ltr">
            {[
              { src: "/gallery/battle-of-hormoz-1.jpg", t: "ساحل هرمز", h: "h-56" },
              { src: "/gallery/battle-of-hormoz-2.jpg", t: "شب عملیات", h: "h-72" },
              { src: "/gallery/battle-of-hormoz-3.jpg", t: "ناوگان", h: "h-56" },
            ].map((c) => (
              <div key={c.t} className={`fp-card group relative w-[300px] overflow-hidden rounded-2xl border border-white/12 opacity-0 shadow-2xl ${c.h}`}>
                <img
                  src={c.src}
                  alt={c.t}
                  className="h-full w-full object-cover transform-gpu transition duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 right-4 text-sm font-semibold" dir="rtl">{c.t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* progress */}
        <div className="absolute inset-x-10 bottom-6 z-20 h-px bg-white/10" dir="ltr">
          <div className="fp-progress-fill h-full w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-ember" />
        </div>
      </div>

      {/* ============ MOBILE STATIC ============ */}
      <div className="relative overflow-hidden md:hidden">
        <div className="relative h-[62vh] min-h-[420px]">
          <img src="/images/game-night.jpg" alt="نبرد هرمز" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/30 to-coal/40" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/50 px-4 py-1.5 text-[11px] text-gold backdrop-blur">
              <Crosshair size={12} /> مهم‌ترین پروژه استودیو
            </div>
            <h2 className="mt-3 font-display-fa text-6xl text-bone">نبرد هرمز</h2>
            <p className="font-bebas text-sm tracking-[0.4em] text-white/50" dir="ltr">BATTLE OF HORMUZ</p>
          </div>
        </div>
        <div className="px-6 py-10">
          <p className="text-sm font-light leading-8 text-white/70">
            بازی موبایلی «نبرد هرمز» یکی از پروژه‌های اصلی استودیو رما است که با هدف ارائه یک تجربه بازی‌محور برای پلتفرم موبایل توسعه داده شده است.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f.en} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <f.icon size={15} className="shrink-0 text-gold" />
                <span className="text-[12px] font-semibold">{f.title}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            {[
              { src: "/images/game-coast.jpg", t: "ساحل هرمز" },
              { src: "/images/game-strike.jpg", t: "شب عملیات" },
              { src: "/images/game-fleet.jpg", t: "ناوگان" },
            ].map((c) => (
              <div key={c.t} className="relative h-52 overflow-hidden rounded-2xl border border-white/10">
                <img src={c.src} alt={c.t} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 right-4 text-sm font-semibold">{c.t}</div>
              </div>
            ))}
          </div>
          <button onClick={() => scrollToSection("#world")} className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-gold to-ember-soft py-4 text-sm font-bold text-black">
            ورود به دنیای بازی <ChevronLeft size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
