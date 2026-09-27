import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/anim";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(".pre-letter", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.to(obj, {
        v: 100,
        duration: 2.1,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(obj.v);
          setCount(v);
          if (bar.current) bar.current.style.transform = `scaleX(${obj.v / 100})`;
        },
        onComplete: () => {
          const tl = gsap.timeline({ onComplete: onDone });
          tl.to(".pre-fade", { opacity: 0, y: -18, duration: 0.6, stagger: 0.05, ease: "power3.in" }).to(
            root.current,
            {
              clipPath: "inset(0 0 100% 0)",
              duration: 1.1,
              ease: "power4.inOut",
            },
            "-=0.15",
          );
        },
      });
    }, root);
    return () => ctx.revert();
  }, [onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void cinematic-grain"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      {/* faint backdrop glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[120px]" />

      <div className="pre-fade flex items-center gap-3 text-[11px] tracking-[0.5em] text-ash font-grotesk" dir="ltr">
        <span className="h-px w-10 bg-gold/60" />
        RAMA STUDIO
        <span className="h-px w-10 bg-gold/60" />
      </div>

      <h1
        className="pre-fade mt-6 flex gap-5 overflow-hidden font-display-fa text-[clamp(3rem,10vw,7rem)] leading-none text-bone"
        dir="rtl"
      >
        {["استودیو", "رما"].map((word, i) => (
          <span key={i} className="pre-letter inline-block translate-y-full opacity-0">
            {word}
          </span>
        ))}
      </h1>

      <p className="pre-fade mt-4 text-sm font-light text-ash" dir="rtl">
        صبور باشید...
      </p>

      {/* progress */}
      <div className="pre-fade mt-10 w-[min(420px,70vw)]" dir="ltr">
        <div className="flex items-end justify-between font-grotesk text-xs text-ash">
          <span className="tracking-[0.3em]">LOADING</span>
          <span ref={num} className="font-bebas text-3xl text-gold tabular-nums">
            {String(count).padStart(3, "0")}
          </span>
        </div>
        <div className="mt-3 h-px w-full overflow-hidden bg-white/10">
          <div
            ref={bar}
            className="h-full w-full origin-left bg-gradient-to-r from-gold-deep via-gold to-ember"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <div className="mt-3 flex justify-between text-[10px] tracking-widest text-white/30 font-grotesk">
          <span>GAME</span>
          <span>3D ART</span>
          <span>WORLDS</span>
        </div>
      </div>
    </div>
  );
}
