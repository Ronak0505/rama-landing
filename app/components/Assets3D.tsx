import { useLayoutEffect, useRef, useState } from "react";
import { Boxes, Cpu, Layers, BadgeCheck, ExternalLink } from "lucide-react";
import { gsap, isReducedMotion } from "../lib/anim";

const lods = [
  { n: "LOD 0", tris: "454,944", w: "100%", note: "سینمایی / رندر" },
  { n: "LOD 1", tris: "11,142", w: "38%", note: "بازی / نمای نزدیک" },
  { n: "LOD 2", tris: "4,311", w: "16%", note: "موبایل / فاصله دور" },
];

const engines = ["BLENDER", "3DS MAX", "CYCLES", "VRAY", "CORONA", "UNREAL"];

export default function Assets3D() {
  const root = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ rx: 0, ry: 0 });

  useLayoutEffect(() => {
    if (!root.current || isReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".ax-head", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: ".ax-head", start: "top 86%" },
      });
      gsap.fromTo(".ax-drone", { z: -260, opacity: 0, rotateX: 18, scale: 0.88 }, {
        z: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.6, ease: "power3.out",
        scrollTrigger: { trigger: ".ax-drone", start: "top 88%" },
      });
      gsap.fromTo(".ax-spec", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".ax-specs", start: "top 85%" },
      });
      gsap.fromTo(".ax-bar", { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".ax-lods", start: "top 85%" },
      });
      gsap.fromTo(".ax-chip", { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".ax-chips", start: "top 90%" },
      });
      // depth parallax: foreground faster than background
      gsap.to(".ax-fore", {
        y: -60, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.4 },
      });
      gsap.to(".ax-back", {
        y: 50, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.4 },
      });
      // continuous float for drone
      gsap.to(".ax-float", { y: -18, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }, root);
    return () => ctx.revert();
  }, []);

  const onTilt = (e: React.MouseEvent) => {
    if (!tilt.current || window.innerWidth < 768) return;
    const r = tilt.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTiltStyle({ rx: -py * 14, ry: px * 18 });
  };

  return (
    <section ref={root} id="assets" className="relative overflow-hidden bg-void py-28 md:py-40" style={{ perspective: "1200px" }}>
      <div className="ax-back pointer-events-none absolute right-0 top-20 select-none font-bebas text-[20vw] leading-none text-white/[0.025]" dir="ltr">3D</div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.05] blur-[160px]" />

      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="ax-head text-center">
          <div className="flex items-center justify-center gap-4 font-grotesk text-[11px] tracking-[0.4em] text-gold" dir="ltr">
            <span className="h-px w-12 bg-gold/50" /> 05 — 3D ASSETS <span className="h-px w-12 bg-gold/50" />
          </div>
          <h2 className="mt-5 font-bebas text-[clamp(3rem,9vw,6.5rem)] leading-none tracking-[0.06em]" dir="ltr">
            BUILT <span className="gold-text">IN 3D</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-8 text-ash md:text-base md:leading-9">
            استودیو رما در زمینه تولید و عرضه Assetهای سه‌بعدی در بازارهای بین‌المللی نیز فعالیت می‌کند — مدل‌های Game-Ready و Render-Ready با استاندارد جهانی.
          </p>
        </div>

        {/* drone showcase */}
        <div className="mt-14 grid items-center gap-8 lg:grid-cols-2">
          <div
            ref={tilt}
            onMouseMove={onTilt}
            onMouseLeave={() => setTiltStyle({ rx: 0, ry: 0 })}
            className="ax-drone group relative overflow-hidden rounded-3xl border border-white/10 bg-carbon shadow-[0_40px_120px_rgba(0,0,0,0.6)] transition-transform duration-200 will-change-transform"
            style={{ transform: `rotateX(${tiltStyle.rx}deg) rotateY(${tiltStyle.ry}deg)`, transformStyle: "preserve-3d" }}
          >
            <div className="ax-float">
              <img src="/images/drone-dark.jpg" alt="مدل سه‌بعدی پهپاد" className="h-[380px] w-full object-cover md:h-[480px]" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute left-5 top-5 flex gap-2" dir="ltr">
              <span className="flex items-center gap-1.5 rounded-full bg-ember px-3 py-1.5 font-grotesk text-[10px] font-bold tracking-widest text-black"><BadgeCheck size={12} /> GAME READY</span>
              <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1.5 font-grotesk text-[10px] tracking-widest text-bone backdrop-blur">3 LODS</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div>
                <div className="font-grotesk text-[10px] tracking-[0.35em] text-gold" dir="ltr">A-240 // DELTA-WING UAV</div>
                <div className="mt-1 text-xl font-bold">پهپاد شناسایی رزمی</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black transition group-hover:rotate-12"><ExternalLink size={18} /></div>
            </div>
          </div>

          {/* specs */}
          <div className="ax-specs rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-sm md:p-9">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold"><Layers size={20} /></div>
              <div>
                <div className="font-semibold">بهینه‌سازی چندسطحی</div>
                <div className="font-grotesk text-[10px] tracking-[0.3em] text-ash" dir="ltr">LEVEL OF DETAIL</div>
              </div>
            </div>
            <div className="ax-lods mt-7 space-y-5" dir="ltr">
              {lods.map((l) => (
                <div key={l.n}>
                  <div className="flex items-center justify-between font-grotesk text-xs">
                    <span className="tracking-[0.25em] text-ash">{l.n}</span>
                    <span className="tabular-nums"><span className="font-bebas text-2xl text-gold">{l.tris}</span> <span className="text-[10px] text-ash">TRIS</span></span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                    <div className="ax-bar h-full origin-left rounded-full bg-gradient-to-r from-gold-deep via-gold to-ember" style={{ width: l.w }} />
                  </div>
                  <div className="mt-1.5 text-right text-[11px] text-ash" dir="rtl">{l.note}</div>
                </div>
              ))}
            </div>
            <div className="ax-chips mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6" dir="ltr">
              {engines.map((e) => (
                <span key={e} className="ax-chip rounded-full border border-white/12 bg-white/[0.03] px-4 py-1.5 font-grotesk text-[10px] tracking-[0.25em] text-white/70">{e}</span>
              ))}
            </div>
          </div>
        </div>

        {/* mini feature cards with depth */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: Boxes, t: "مدل‌های Render-Ready", d: "آماده رندر در Cycles ،V-Ray و Corona با متریال PBR" },
            { icon: Cpu, t: "بهینه برای موتور بازی", d: "توپولوژی تمیز، UV استاندارد و LOD برای موبایل و PC" },
            { icon: BadgeCheck, t: "استاندارد مارکت جهانی", d: "منتشرشده در مارکت‌های تخصصی بین‌المللی تری‌دی" },
          ].map((c, i) => (
            <div key={c.t} className={`ax-spec rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-gold/40 hover:bg-gold/[0.04] ${i === 1 ? "ax-fore" : ""}`}>
              <c.icon size={22} className="text-gold" />
              <div className="mt-4 font-semibold">{c.t}</div>
              <div className="mt-2 text-[13px] font-light leading-7 text-ash">{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
