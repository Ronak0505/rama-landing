import { useLayoutEffect, useRef } from "react";
import { Gamepad2, Boxes, Clapperboard } from "lucide-react";
import { gsap, isReducedMotion, prefersScrollScrub } from "../lib/anim";

const tags = [
  { icon: Gamepad2, fa: "بازی‌سازی" },
  { icon: Boxes, fa: "هنر سه‌بعدی" },
  { icon: Clapperboard, fa: "محتوای دیجیتال" },
];

export default function StudioIntro() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || isReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".st-title",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: ".st-title", start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        ".st-word",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".st-words", start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        ".st-tag",
        { y: 50, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: { trigger: ".st-tags", start: "top 88%", once: true },
        },
      );
      gsap.fromTo(
        ".st-img-wrap",
        { clipPath: "inset(12% 8% 12% 8%)", opacity: 0.4 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".st-img-wrap", start: "top 85%", toggleActions: "play none none none" },
        },
      );

      if (prefersScrollScrub()) {
        gsap.set([".st-img", ".st-float", ".st-bgword"], { force3D: true });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              fastScrollEnd: true,
              invalidateOnRefresh: false,
            },
          })
          .fromTo(
            ".st-img",
            { yPercent: -10, scale: 1.15 },
            { yPercent: 10, scale: 1.05, ease: "none", duration: 1 },
            0,
          )
          .fromTo(".st-float", { y: 0 }, { y: -30, ease: "none", duration: 1 }, 0)
          .fromTo(".st-bgword", { xPercent: 0 }, { xPercent: 12, ease: "none", duration: 1 }, 0);
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="studio" className="relative overflow-hidden bg-void py-28 md:py-40">
      {/* giant background word */}
      <div
        className="st-bgword pointer-events-none absolute top-10 left-0 select-none whitespace-nowrap font-bebas text-[22vw] leading-none text-white/[0.025] transform-gpu"
        dir="ltr"
      >
        RAMA • RAMA • RAMA
      </div>
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-ember/[0.06] blur-[140px]" />

      <div className="relative mx-auto grid max-w-[1500px] gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* text */}
        <div className="flex flex-col justify-center">
          <h2 className="st-title mt-6 font-display-fa text-[clamp(2.6rem,6vw,5rem)] leading-[1.05]">
            استودیو <span className="gold-text">رما</span>
          </h2>

          <p className="st-words mt-7 max-w-xl text-[15px] font-light leading-9 text-white/70 md:text-base md:leading-10">
            {[
              "استودیو رما یک مجموعه فعال در حوزه تولید محتوای دیجیتال،",
              "بازی‌سازی و طراحی و توسعه دارایی‌های سه‌بعدی است.",
              "تمرکز اصلی استودیو بر خلق پروژه‌هایی با کیفیت بصری بالا",
              "و استفاده از فناوری‌های روز در مدل‌سازی سه‌بعدی، طراحی محیط،",
              "بازی‌سازی و تولید محتوای تعاملی است.",
            ].map((line, i) => (
              <span key={i} className="st-word block">
                {line}
              </span>
            ))}
          </p>

          <div className="st-tags mt-10 flex flex-wrap gap-3">
            {tags.map((t, index) => (
              <div
                key={index}
                className="st-tag group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 backdrop-blur-sm transition hover:border-gold/50 hover:bg-gold/[0.06]"
              >
                <t.icon size={18} className="text-gold transition group-hover:scale-110" />
                <div className="leading-tight">
                  <div className="mt-0.5 text-[11px] text-ash" dir="rtl">
                    {t.fa}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* stats */}
          <div className="st-tags mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              ["15+", "Asset های سه‌بعدی"],
              ["03", "جهان بازی"],
              ["01", "بازی پرچمدار"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-bebas text-4xl text-bone md:text-5xl">{n}</div>
                <div className="mt-1 text-[11px] font-medium text-gold/80">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* image */}
        <div className="relative flex items-center">
          <div className="st-img-wrap relative w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            <img
              src="/images/studio-hologram.jpg"
              alt="استودیو رما"
              className="st-img h-[520px] w-full object-cover md:h-[640px] transform-gpu"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-void/20" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7">
              <div>
                <div className="font-grotesk text-[10px] tracking-[0.35em] text-gold" dir="ltr">
                  PIPELINE — REALTIME 3D
                </div>
                <div className="mt-2 text-lg font-semibold text-bone">پایپ‌لاین تولید بلادرنگ</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-black/50 font-bebas text-gold">
                3D
              </div>
            </div>
          </div>

          {/* floating card */}
          <div className="st-float absolute -bottom-6 -right-2 hidden rounded-2xl border border-gold/25 bg-black/70 p-5 backdrop-blur-xl md:block lg:-right-8">
            <div className="font-grotesk text-[10px] tracking-[0.3em] text-ash" dir="ltr">
              RENDER ENGINE
            </div>
            <div className="mt-1 font-bebas text-2xl tracking-widest text-gold" dir="ltr">
              UNREAL • UNITY • BLENDER
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
