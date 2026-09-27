import { useLayoutEffect, useRef } from "react";
import { Globe2, ArrowUpLeft } from "lucide-react";
import { gsap, isReducedMotion } from "../lib/anim";

const markets = [
  { name: "3Dsky", desc: "مارکت تخصصی مدل‌های معماری و دکوراسیون", tag: "ARCHVIZ" },
  { name: "Fab", desc: "مارکت رسمی اکوسیستم Unreal و محتوای بلادرنگ", tag: "REALTIME" },
  { name: "CGTrader", desc: "یکی از بزرگ‌ترین مارکت‌های جهانی مدل سه‌بعدی", tag: "GLOBAL" },
];

export default function GlobalMarkets() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || isReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gm-head",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".gm-head", start: "top 86%", once: true },
        },
      );
      gsap.fromTo(
        ".gm-card",
        { y: 70, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.16,
          ease: "power4.out",
          scrollTrigger: { trigger: ".gm-grid", start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        ".gm-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".gm-grid", start: "top 80%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="markets"
      className="relative overflow-hidden border-y border-white/8 bg-coal py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,180,74,0.06),transparent_60%)]" />
      {/* marquee */}
      <div
        className="pointer-events-none absolute top-6 left-0 w-full overflow-hidden opacity-30 mask-fade-x"
        dir="ltr"
      >
        <div className="animate-marquee-rtl flex w-max whitespace-nowrap font-bebas text-5xl tracking-[0.2em] text-white/10">
          {Array(8)
            .fill("RAMA STUDIO •")
            .map((t, i) => (
              <span key={i} className="pr-10">
                {t}
              </span>
            ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="gm-head text-center">
          <h2
            className="mt-5  text-[clamp(2.2rem,5.5vw,4rem)] leading-tight tracking-[0.06em] flex flex-col text-5xl! gap-y-5"
            dir="ltr"
          >
            از تهران تا مارکت جهانی{" "}
            <span className="gold-text text-xl">محصولات استودیو در مارکت‌های تخصصی بین‌المللی عرضه می‌شوند</span>
          </h2>
          {/* <p className="mx-auto mt-3 max-w-xl text-sm font-light leading-8 text-ash">
            از تهران تا مارکت جهانی تری‌دی — محصولات استودیو در مارکت‌های تخصصی بین‌المللی عرضه می‌شوند.
          </p> */}
        </div>

        <div className="gm-line mx-auto mt-10 h-px w-full max-w-3xl bg-gradient-to-l from-transparent via-gold/50 to-transparent" />

        <div className="gm-grid mt-10 grid gap-5 md:grid-cols-3" dir="ltr">
          {markets.map((m, i) => (
            <div
              key={m.name}
              className="gm-card group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-8 text-center transition duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_20px_60px_rgba(232,180,74,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.07] to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="font-grotesk text-[10px] tracking-[0.4em] text-gold/70"></div>
              <div className="mt-3 font-bebas text-5xl tracking-[0.1em] text-bone transition group-hover:text-gold">
                {m.name}
              </div>
              <p className="mt-3 text-[12px]  leading-6 text-ash" dir="rtl">
                {m.desc}
              </p>
              <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] tracking-[0.3em] text-bone transition group-hover:text-gold">
                <ArrowUpLeft size={12} /> بازدید از مارکت
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
