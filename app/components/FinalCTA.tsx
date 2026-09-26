import { useLayoutEffect, useRef } from "react";
import { ArrowLeft, Mail, Play } from "lucide-react";
import { gsap, isReducedMotion, scrollToSection } from "../lib/anim";

export default function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || isReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".fc-bg", { scale: 1.22 }, {
        scale: 1.02, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
      gsap.fromTo(".fc-title span", { yPercent: 115 }, {
        yPercent: 0, duration: 1.3, stagger: 0.12, ease: "power4.out",
        scrollTrigger: { trigger: ".fc-title", start: "top 82%" },
      });
      gsap.fromTo(".fc-fade", { y: 34, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".fc-fades", start: "top 85%" },
      });
      gsap.fromTo(".fc-frame", { clipPath: "inset(6% 4% 6% 4%)" }, {
        clipPath: "inset(0% 0% 0% 0%)", ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 80%", end: "top 20%", scrub: 1 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="contact" className="relative bg-void px-3 pb-3 md:px-5 md:pb-5">
      <div className="fc-frame relative flex min-h-[92vh] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 cinematic-grain">
        <img src="/images/final-world.jpg" alt="دنیای رما" className="fc-bg absolute inset-0 h-full w-full object-cover will-change-transform" loading="lazy" />
        <div className="absolute inset-0 bg-void/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.7)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div className="fc-fades">
            <div className="fc-fade inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/45 px-5 py-2 backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-gold" />
              <span className="font-grotesk text-[10px] tracking-[0.4em] text-white/80" dir="ltr">08 — JOIN THE JOURNEY</span>
            </div>
          </div>

          <h2 className="fc-title mt-7 overflow-hidden font-bebas text-[clamp(3.2rem,10vw,8.5rem)] leading-[0.95] tracking-[0.04em]" dir="ltr">
            <span className="block">THE WORLD OF</span>
            <span className="block gold-text">REMA STUDIO</span>
          </h2>

          <p className="fc-fades mt-5">
            <span className="fc-fade block font-grotesk text-sm tracking-[0.45em] text-white/70" dir="ltr">GAMES • WORLDS • DIGITAL EXPERIENCES</span>
            <span className="fc-fade mx-auto mt-4 block max-w-xl text-sm font-light leading-8 text-white/60">
              دنیای رما — بازی‌ها، جهان‌ها و تجربه‌های دیجیتال. همراه ما، مرزهای بعدی را بسازید.
            </span>
          </p>

          <div className="fc-fades mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <span className="fc-fade">
              <button
                onClick={() => scrollToSection("#hormuz")}
                className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-l from-gold to-ember-soft px-10 py-4 text-sm font-bold text-black shadow-[0_10px_50px_rgba(255,90,31,0.35)] transition-shadow hover:shadow-[0_10px_70px_rgba(255,90,31,0.55)]"
              >
                <Play size={16} className="fill-black" />
                مشاهده آثار ما
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              </button>
            </span>
            <span className="fc-fade">
              <button className="flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-10 py-4 text-sm font-semibold text-bone backdrop-blur-md transition hover:border-gold/60 hover:bg-white/10">
                <Mail size={16} className="text-gold" />
                تماس با استودیو
              </button>
            </span>
          </div>

          <div className="fc-fades mt-12 flex items-center justify-center gap-8 font-grotesk text-[10px] tracking-[0.3em] text-white/40" dir="ltr">
            <span className="fc-fade">TEHRAN — IRAN</span>
            <span className="fc-fade h-1 w-1 rounded-full bg-gold/60" />
            <span className="fc-fade">EST. GAME STUDIO</span>
            <span className="fc-fade h-1 w-1 rounded-full bg-gold/60" />
            <span className="fc-fade">SINCE 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
}
