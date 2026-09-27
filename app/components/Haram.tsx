"use client";

import { useLayoutEffect, useRef } from "react";
import { Landmark, Scan, Box, Sparkles, MonitorPlay } from "lucide-react";
import { gsap, isReducedMotion } from "../lib/anim";

const steps = [
  { icon: Scan, t: "نقشه‌برداری معماری", d: "مستندسازی دقیق ابعاد و تناسبات بنا" },
  { icon: Box, t: "مدل‌سازی سه‌بعدی", d: "بازسازی جزءبه‌جزء با دقت بالا" },
  { icon: Sparkles, t: "متریال و نورپردازی", d: "آینه‌کاری، کاشی و لوسترها" },
  { icon: MonitorPlay, t: "نسخه تعاملی", d: "قابل استفاده در محیط‌های دیجیتال" },
];

export default function Haram() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || isReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".hr-wrap",
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 1.1,
        },
      });
      tl.fromTo(".hr-img-1", { scale: 1.3, filter: "blur(18px) brightness(0.5)" },
        { scale: 1.05, filter: "blur(0px) brightness(1)", duration: 3 }, 0)
        .fromTo(".hr-shade", { opacity: 0.88 }, { opacity: 0.35, duration: 3 }, 0)
        .fromTo(".hr-kicker", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.4)
        .fromTo(".hr-title span", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.6)
        .fromTo(".hr-desc", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1.2)
        // floating info enters
        .fromTo(".hr-card", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.25 }, 1.6)
        // timeline draws
        .fromTo(".hr-progress", { scaleY: 0 }, { scaleY: 1, duration: 4.5, ease: "none" }, 1)
        .fromTo(".hr-step", { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.7 }, 1.4)
        // camera pushes into interior
        .to(".hr-img-1", { scale: 1.18, opacity: 0, duration: 1.6, ease: "power2.in" }, 4.2)
        .fromTo(".hr-img-2", { scale: 1.25, opacity: 0, filter: "blur(12px)" },
          { scale: 1.05, opacity: 1, filter: "blur(0px)", duration: 1.8 }, 4.4)
        .to(".hr-phase-tag", { opacity: 0, duration: 0.4 }, 4.2)
        .fromTo(".hr-phase-tag-2", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 4.8);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="haram" className="relative bg-coal">
      {/* desktop pinned */}
      <div className="hr-wrap relative hidden h-screen overflow-hidden md:block cinematic-grain">
        <div className="absolute inset-0">
          <img src="/images/haram-night.jpg" alt="بین‌الحرمین" className="hr-img-1 absolute inset-0 h-full w-full object-cover will-change-transform" loading="lazy" />
          <img src="/images/haram-interior.jpg" alt="حرم مطهر" className="hr-img-2 absolute inset-0 h-full w-full object-cover opacity-0 will-change-transform" loading="lazy" />
        </div>
        <div className="hr-shade absolute inset-0 bg-void/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/60" />

        <div className="absolute inset-0 z-10 mx-auto grid max-w-[1500px] grid-cols-[1fr_380px] items-center gap-10 px-10">
          {/* main text */}
          <div>
            <div className="hr-kicker inline-flex items-center gap-3 rounded-full border border-amber-200/30 bg-black/50 px-5 py-2 backdrop-blur-md">
              <Landmark size={14} className="text-amber-200" />
              <span className="font-grotesk text-[10px] tracking-[0.35em] text-amber-100/90" dir="ltr">04 — 3D RECONSTRUCTION</span>
            </div>
            <h2 className="hr-title mt-6 overflow-hidden font-display-fa text-[clamp(3rem,6.5vw,6rem)] leading-[1.05] text-bone">
              <span className="block">بازسازی سه‌بعدی</span>
              <span className="block">حرم مطهر امام حسین <span className="text-amber-200">(ع)</span></span>
            </h2>
            <p className="hr-title mt-2 overflow-hidden font-grotesk text-sm tracking-[0.4em] text-white/40" dir="ltr">
              <span className="block">HOLY SHRINE — BAYN AL-HARAMAYN</span>
            </p>
            <p className="hr-desc mt-6 max-w-xl text-[15px] font-light leading-9 text-white/70">
              در این پروژه تلاش شده است معماری، جزئیات محیطی و عناصر مختلف این مجموعه با دقت بالا به صورت سه‌بعدی بازسازی شوند — بازنمایی‌ای دقیق و قابل استفاده در محیط‌های دیجیتال و تعاملی.
            </p>

            <div className="mt-8 flex gap-4">
              <div className="hr-card rounded-2xl border border-white/10 bg-black/55 px-6 py-4 backdrop-blur-xl">
                <div className="font-bebas text-3xl text-amber-200" dir="ltr">1:1</div>
                <div className="mt-1 text-[11px] text-ash">مقیاس واقعی معماری</div>
              </div>
              <div className="hr-card rounded-2xl border border-white/10 bg-black/55 px-6 py-4 backdrop-blur-xl">
                <div className="font-bebas text-3xl text-amber-200" dir="ltr">4K</div>
                <div className="mt-1 text-[11px] text-ash">تکسچرهای با وضوح بالا</div>
              </div>
              <div className="hr-card rounded-2xl border border-white/10 bg-black/55 px-6 py-4 backdrop-blur-xl">
                <div className="font-bebas text-3xl text-amber-200" dir="ltr">RT</div>
                <div className="mt-1 text-[11px] text-ash">رندر بلادرنگ</div>
              </div>
            </div>

            <div className="hr-phase-tag mt-8 font-grotesk text-[11px] tracking-[0.35em] text-white/50" dir="ltr">◉ EXTERIOR — SAHN & BAYN AL-HARAMAYN</div>
            <div className="hr-phase-tag-2 -mt-5 font-grotesk text-[11px] tracking-[0.35em] text-amber-200/90 opacity-0" dir="ltr">◉ INTERIOR — HARAM & ZARIH</div>
          </div>

          {/* vertical timeline */}
          <div id="timeline" className="relative rounded-3xl border border-white/10 bg-black/50 p-8 backdrop-blur-2xl">
            <div className="font-grotesk text-[10px] tracking-[0.4em] text-ash" dir="ltr">PRODUCTION TIMELINE</div>
            <div className="absolute bottom-8 right-[52px] top-24 w-px bg-white/10">
              <div className="hr-progress h-full w-full origin-top bg-gradient-to-b from-amber-200 to-ember" />
            </div>
            <div className="mt-6 space-y-7">
              {steps.map((s, i) => (
                <div key={s.t} className="hr-step flex items-start gap-4">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-200/40 bg-black text-amber-200">
                    <s.icon size={18} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 font-bebas text-[11px] text-black">0{i + 1}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-bone">{s.t}</div>
                    <div className="mt-1 text-[12px] font-light text-ash">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* mobile static */}
      <div className="md:hidden">
        <div className="relative h-[52vh] min-h-[360px]">
          <img src="/images/haram-night.jpg" alt="بین‌الحرمین" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/20 to-coal/30" />
          <div className="absolute bottom-0 p-6">
            <div className="font-grotesk text-[10px] tracking-[0.35em] text-amber-200" dir="ltr">04 — 3D RECONSTRUCTION</div>
            <h2 className="mt-2 font-display-fa text-4xl leading-tight text-bone">بازسازی سه‌بعدی حرم مطهر امام حسین (ع)</h2>
          </div>
        </div>
        <div className="px-6 py-8">
          <p className="text-sm font-light leading-8 text-white/70">
            در این پروژه تلاش شده است معماری، جزئیات محیطی و عناصر مختلف مجموعه بین‌الحرمین با دقت بالا به صورت سه‌بعدی بازسازی شوند.
          </p>
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10">
            <img src="/images/haram-interior.jpg" alt="داخل حرم" className="h-56 w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-3 right-4 text-sm font-semibold">داخل حرم و ضریح</div>
          </div>
          <div className="mt-6 space-y-4">
            {steps.map((s, i) => (
              <div key={s.t} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <span className="font-bebas text-2xl text-amber-200" dir="ltr">0{i + 1}</span>
                <div>
                  <div className="text-[13px] font-semibold">{s.t}</div>
                  <div className="text-[11px] text-ash">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
