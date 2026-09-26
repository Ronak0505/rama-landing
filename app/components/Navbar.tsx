import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronLeft } from "lucide-react";
import { gsap } from "../lib/anim";
import { scrollToSection } from "../lib/anim";

const links = [
  { fa: "استودیو", id: "#studio" },
  { fa: "نبرد هرمز", id: "#hormuz" },
  { fa: "دنیای بازی", id: "#world" },
  { fa: "بازسازی حرم", id: "#haram" },
  { fa: "مدل‌های سه‌بعدی", id: "#assets" },
  { fa: "تماس", id: "#contact" },
];

export default function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!bar.current) return;
    gsap.to(bar.current, {
      y: visible ? 0 : -90,
      opacity: visible ? 1 : 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.3,
    });
  }, [visible]);

  return (
    <>
      <header
        ref={bar}
        className={`fixed inset-x-0 top-0 z-[80] -translate-y-24 opacity-0 transition-colors duration-500 ${
          scrolled ? "glass-dark" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between px-5 md:px-10">
          {/* logo */}
          <button onClick={() => scrollToSection("#top")} className="group flex items-center gap-3" dir="ltr">
            <div className="text-base tracking-[0.18em] text-bone w-full">رما استودیو</div>
            <img src="/logo/rama.svg" />
          </button>

          {/* desktop links */}
          <nav className="hidden items-center gap-7 lg:flex" dir="rtl">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className="group relative text-[13px] font-medium text-white/70 transition hover:text-bone"
              >
                {l.fa}
                <span className="absolute -bottom-1.5 right-0 h-px w-0 bg-gradient-to-l from-gold to-ember transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden lg:block" dir="rtl">
            <button
              onClick={() => scrollToSection("#hormuz")}
              className="group relative overflow-hidden rounded-full border border-gold/50 px-6 py-2.5 text-[13px] font-semibold text-gold transition hover:text-black"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-l from-gold to-ember-soft transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">معرفی بازی</span>
            </button>
          </div>

          {/* mobile */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone lg:hidden"
            aria-label="menu"
          >
            <Menu size={20} />
          </button>
        </div>
        <div className="hud-line opacity-40" />
      </header>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-[90] flex flex-col bg-void/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        dir="rtl"
      >
        <div className="flex h-[68px] items-center justify-between px-5">
          <div className="font-bebas text-2xl tracking-[0.2em] text-gold" dir="ltr">
            REMA
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15"
            aria-label="close"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
          {links.map((l, i) => (
            <button
              key={l.id}
              onClick={() => {
                setOpen(false);
                setTimeout(() => scrollToSection(l.id), 350);
              }}
              className={`group flex items-center justify-between border-b border-white/8 py-5 text-right transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="font-display-fa text-4xl text-bone transition group-hover:text-gold">{l.fa}</span>
              <ChevronLeft className="text-gold/60" size={22} />
            </button>
          ))}
        </nav>
        <p className="pb-8 text-center font-grotesk text-[10px] tracking-[0.4em] text-white/30" dir="ltr">
          REMA STUDIO — 2026
        </p>
      </div>
    </>
  );
}
