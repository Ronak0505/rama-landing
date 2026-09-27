"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Play, Landmark } from "lucide-react";
import { gsap, isReducedMotion, prefersScrollScrub, scrollToSection } from "../lib/anim";

type FinalCTAProps = {
  variant?: "studio" | "game" | "haram";
};

const copy = {
  studio: {
    kicker: "۰۸ — شروع همکاری",
    title: ["دنیای", "استودیو رما"],
    titleAccent: 1,
    tagline: "بازی • جهان‌های سه‌بعدی • تجربه دیجیتال",
    body: "دنیای رما — بازی‌ها، جهان‌ها و تجربه‌های دیجیتال. برای پروژه بعدی‌تان با ما در تماس باشید.",
    meta: ["تهران — ایران", "استودیو بازی‌سازی", "از ۱۴۰۳"],
  },
  game: {
    kicker: "۰۴ — به‌زودی",
    title: ["آماده", "نبرد هستید؟"],
    titleAccent: 1,
    tagline: "موبایل • تاکتیکی • تنگه هرمز",
    body: "بازی موبایلی نبرد هرمز به‌زودی — برای همکاری، انتشار و اطلاع از به‌روزرسانی‌ها با ما در تماس باشید.",
    meta: ["تهران — ایران", "نبرد هرمز", "از ۱۴۰۳"],
  },
  haram: {
    kicker: "۰۵ — همکاری",
    title: ["همکاری در", "پروژه‌های فرهنگی"],
    titleAccent: 1,
    titleAccentClass: "text-amber-200",
    tagline: "بازسازی معماری • میراث • سه‌بعدی بلادرنگ",
    body: "برای همکاری در بازسازی سه‌بعدی، محتوای فرهنگی و پروژه‌های تعاملی — با استودیو رما در تماس باشید.",
    meta: ["تهران — ایران", "بین‌الحرمین", "از ۱۴۰۳"],
  },
} as const;

export default function FinalCTA({ variant = "studio" }: FinalCTAProps) {
  const root = useRef<HTMLElement>(null);
  const content = copy[variant];

  useLayoutEffect(() => {
    if (!root.current || isReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (prefersScrollScrub()) {
        gsap.fromTo(
          ".fc-bg",
          { scale: 1.22, force3D: true },
          {
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              fastScrollEnd: true,
              invalidateOnRefresh: false,
            },
          },
        );
      }
      gsap.fromTo(
        ".fc-title span",
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.3,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: ".fc-title", start: "top 82%", once: true },
        },
      );
      gsap.fromTo(
        ".fc-fade",
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".fc-fades", start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        ".fc-frame",
        { clipPath: "inset(6% 4% 6% 4%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 78%", toggleActions: "play none none none" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const bgSrc =
    variant === "game"
      ? "/images/game-fleet.jpg"
      : variant === "haram"
        ? "/images/haram-interior.jpg"
        : "/images/final-world.jpg";
  const bgAlt = variant === "game" ? "نبرد هرمز" : variant === "haram" ? "بین‌الحرمین" : "دنیای رما";
  const accentClass =
    "titleAccentClass" in content && content.titleAccentClass ? content.titleAccentClass : "gold-text";

  return (
    <section ref={root} id="contact" className="relative bg-void px-3 pb-3 md:px-5 md:pb-5">
      <div className="fc-frame relative flex min-h-[92vh] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 cinematic-grain">
        <img
          src={bgSrc}
          alt={bgAlt}
          className="fc-bg absolute inset-0 h-full w-full object-cover will-change-transform"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-void/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.7)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center" dir="rtl">
          <h2 className="fc-title mt-7 overflow-hidden font-display-fa text-[clamp(2.6rem,9vw,6.5rem)] leading-[1.08] text-bone">
            {content.title.map((line, i) => (
              <span key={line} className={`block h-[110px] ${i === content.titleAccent ? accentClass : ""}`}>
                {line}
              </span>
            ))}
          </h2>

          <p className="fc-fades mt-5">
            <span className="fc-fade block text-sm tracking-wide text-white/65">{content.tagline}</span>
            <span className="fc-fade mx-auto mt-4 block max-w-xl text-sm font-light leading-8 text-white/60">
              {content.body}
            </span>
          </p>

          <div className="fc-fades mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <span className="fc-fade">
              {variant === "game" ? (
                <button
                  type="button"
                  onClick={() => scrollToSection("#hormuz")}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-l from-gold to-ember-soft px-10 py-4 text-sm font-bold text-black shadow-[0_10px_50px_rgba(255,90,31,0.35)] transition-shadow hover:shadow-[0_10px_70px_rgba(255,90,31,0.55)]"
                >
                  <Play size={16} className="fill-black" />
                  مرور معرفی بازی
                  <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                </button>
              ) : variant === "haram" ? (
                <button
                  type="button"
                  onClick={() => scrollToSection("#haram")}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-l from-amber-200 to-amber-400 px-10 py-4 text-sm font-bold text-black shadow-[0_10px_50px_rgba(251,191,36,0.3)] transition-shadow hover:shadow-[0_10px_70px_rgba(251,191,36,0.45)]"
                >
                  <Landmark size={16} />
                  مرور پروژه
                  <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                </button>
              ) : (
                <Link
                  href="/hormoz"
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-l from-gold to-ember-soft px-10 py-4 text-sm font-bold text-black shadow-[0_10px_50px_rgba(255,90,31,0.35)] transition-shadow hover:shadow-[0_10px_70px_rgba(255,90,31,0.55)]"
                >
                  <Play size={16} className="fill-black" />
                  نبرد هرمز
                  <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                </Link>
              )}
            </span>
            <span className="fc-fade">
              {variant === "studio" ? (
                <></>
              ) : (
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-10 py-4 text-sm font-semibold text-bone backdrop-blur-md transition hover:border-gold/60 hover:bg-white/10"
                >
                  <Mail size={16} className="text-gold" />
                  بازگشت به استودیو
                </Link>
              )}
            </span>
          </div>

          <div className="fc-fades mt-12 flex flex-wrap items-center justify-center gap-3 text-[11px] tracking-wide text-white/45 sm:gap-6">
            {content.meta.map((item, i) => (
              <span key={item} className="fc-fade inline-flex items-center gap-3 sm:gap-6">
                {i > 0 ? <span className="hidden h-1 w-1 rounded-full bg-gold/60 sm:inline" aria-hidden /> : null}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
