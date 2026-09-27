"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Gamepad2, Box, Mountain, Clapperboard, ArrowLeft } from "lucide-react";
import { gsap, isReducedMotion } from "../lib/anim";

const caps = [
  {
    icon: Gamepad2,
    en: "GAME DEVELOPMENT",
    fa: "توسعه بازی",
    d: "توسعه بازی و تجربه‌های تعاملی برای موبایل و دسکتاپ",
    img: "/images/game-strike.jpg",
  },
  {
    icon: Box,
    en: "3D MODELING",
    fa: "مدل‌سازی سه‌بعدی",
    d: "مدل‌سازی، متریال‌سازی و بهینه‌سازی دارایی‌های سه‌بعدی",
    img: "/images/drone-dark.jpg",
  },
  {
    icon: Mountain,
    en: "ENVIRONMENT DESIGN",
    fa: "طراحی محیط",
    d: "طراحی محیط، ساخت جهان و چیدمان صحنه‌های بازی",
    img: "/images/game-coast.jpg",
  },
  {
    icon: Clapperboard,
    en: "DIGITAL CONTENT",
    fa: "محتوای دیجیتال",
    d: "تولید محتوای دیجیتال، موشن و تجربه‌های بصری",
    img: "/images/haram-interior.jpg",
  },
];

export default function Capabilities() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    if (!root.current || isReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cp-head",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: ".cp-head", start: "top 86%" },
        },
      );
      gsap.fromTo(
        ".cp-row",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: ".cp-list", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".cp-preview",
        { clipPath: "inset(10% 6% 10% 6%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cp-preview", start: "top 85%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="capabilities" className="relative overflow-hidden bg-void py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="cp-head flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mt-4 font-display-fa text-[clamp(2.4rem,6vw,4.5rem)] leading-tight text-bone">
              آنچه <span className="gold-text">می‌سازیم</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-8 text-ash">
            چهار ستون اصلی استودیو رما — از ایده تا محصول نهایی
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_460px]">
          <div className="cp-list flex flex-col divide-y divide-white/8 border-y border-white/8">
            {caps.map((c, i) => (
              <button
                key={c.fa}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`cp-row group relative flex items-center justify-between gap-5 overflow-hidden px-2 py-7 text-right transition-all duration-500 md:px-6 ${
                  active === i ? "bg-gold/[0.05]" : "hover:bg-white/[0.02]"
                }`}
                dir="rtl"
              >
                <span
                  className={`absolute right-0 top-0 h-full w-[3px] bg-gradient-to-b from-gold to-ember transition-transform duration-500 ${active === i ? "scale-y-100" : "scale-y-0"}`}
                />
                <div className="flex items-center gap-5">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition duration-500 ${
                      active === i
                        ? "border-gold/60 bg-gold/15 text-gold shadow-[0_0_30px_rgba(232,180,74,0.25)]"
                        : "border-white/10 bg-white/[0.03] text-white/60"
                    }`}
                  >
                    <c.icon size={22} />
                  </span>
                  <span>
                    <span
                      className={`block text-lg font-bold transition md:text-xl ${active === i ? "text-bone" : "text-white/85"}`}
                    >
                      {c.fa}
                    </span>
                    <span className="mt-1 block text-[13px] font-light leading-7 text-ash">{c.d}</span>
                  </span>
                </div>
                <span className="flex items-center gap-3">
                  <span className="hidden font-bebas text-2xl text-white/20 md:block" dir="ltr">
                    0{i + 1}
                  </span>
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition duration-500 ${
                      active === i ? "border-gold bg-gold text-black" : "border-white/15 text-white/40"
                    }`}
                  >
                    <ArrowLeft size={17} />
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="cp-preview relative hidden overflow-hidden rounded-3xl border border-white/10 lg:block">
            {caps.map((c, i) => (
              <img
                key={c.fa}
                src={c.img}
                alt={c.fa}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                  active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-right">
              <div className="font-grotesk text-[10px] tracking-[0.35em] text-gold/80" dir="ltr">
                {caps[active].en}
              </div>
              <div className="mt-2 font-display-fa text-4xl text-bone">{caps[active].fa}</div>
              <div className="mt-2 text-sm font-light leading-7 text-white/65">{caps[active].d}</div>
              <div className="mt-4 flex justify-end gap-2">
                {caps.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${active === i ? "w-10 bg-gold" : "w-4 bg-white/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
