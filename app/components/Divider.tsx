"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, isReducedMotion } from "../lib/anim";

export default function Divider({ text, secText, outline = false }: { text: string; secText: string; outline?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || isReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".dv-inner", { xPercent: -6 }, {
        xPercent: 6, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
      gsap.fromTo(".dv-line", { scaleX: 0, opacity: 0 }, {
        scaleX: 1, opacity: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden bg-void py-6" dir="ltr">
      <div className="dv-inner whitespace-nowrap text-center font-bebas text-[clamp(2.5rem,7vw,5.5rem)] tracking-[0.12em]">
        <span className={outline ? "text-stroke-faint" : "text-white/[0.07]"}>{text}</span>
        <span className="mx-6 text-gold/40">•</span>
        <span className={outline ? "text-stroke-gold" : "text-white/[0.07]"}>{secText}</span>
      </div>
      <div className="dv-line mx-auto mt-2 h-px w-2/3 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  );
}
