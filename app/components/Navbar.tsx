"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronLeft } from "lucide-react";
import { gsap } from "../lib/anim";
import { scrollToSection } from "../lib/anim";

export type NavbarVariant = "studio" | "game" | "haram";

const studioLinks = [
  { fa: "استودیو", id: "#studio" },
  { fa: "پروژه‌ها", id: "#projects" },
  { fa: "توانمندی‌ها", id: "#capabilities" },
  { fa: "تماس", id: "#contact" },
];

const gameLinks = [
  { fa: "معرفی بازی", id: "#hormuz" },
  { fa: "دنیای بازی", id: "#world" },
  { fa: "تماس", id: "#contact" },
];

const haramLinks = [
  { fa: "معرفی پروژه", id: "#haram" },
  { fa: "فرآیند تولید", id: "#timeline" },
  { fa: "تماس", id: "#contact" },
];

type RouteKind = "studio" | "hormoz" | "haram";

function resolveRouteKind(pathname: string, variant: NavbarVariant): RouteKind {
  if (variant === "haram" || pathname.startsWith("/haram")) return "haram";
  if (variant === "game" || pathname.startsWith("/hormoz")) return "hormoz";
  return "studio";
}

export default function Navbar({ visible, variant = "studio" }: { visible: boolean; variant?: NavbarVariant }) {
  const pathname = usePathname();
  const routeKind = resolveRouteKind(pathname, variant);
  const links = routeKind === "hormoz" ? gameLinks : routeKind === "haram" ? haramLinks : studioLinks;
  const onProjectRoute = routeKind !== "studio";

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

  const goSection = (id: string) => {
    if (!id.startsWith("#")) return;

    const projectBase = routeKind === "hormoz" ? "/hormoz" : routeKind === "haram" ? "/haram" : null;
    if (projectBase) {
      if (pathname === projectBase) scrollToSection(id);
      else window.location.assign(id === "#top" ? projectBase : `${projectBase}${id}`);
      return;
    }

    if (pathname === "/") scrollToSection(id);
    else window.location.assign(`/${id}`);
  };

  return (
    <>
      <header
        ref={bar}
        className={`fixed inset-x-0 top-0 z-[80] -translate-y-24 opacity-0 transition-colors duration-500 ${
          scrolled ? "glass-dark" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between px-5 md:px-10">
          <Link href="/" className="group flex items-center gap-3 w-48" dir="ltr">
            <div className="text-base tracking-[0.18em] text-bone w-full text-right">رما استودیو</div>
            <img src="/logo/rama.svg" alt="رما" className="w-20" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" dir="rtl">
            {links.map((l) => (
              <button
                key={`${l.id}-${l.fa}`}
                onClick={() => goSection(l.id)}
                className="group relative text-[13px] font-medium text-white/70 transition hover:text-bone"
              >
                {l.fa}
                <span className="absolute -bottom-1.5 right-0 h-px w-0 bg-gradient-to-l from-gold to-ember transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            {onProjectRoute ? (
              <Link
                href="/"
                className="group relative inline-flex items-center overflow-hidden rounded-full border border-white/25 px-6 py-2.5 text-[13px] font-semibold text-bone transition-colors duration-300 hover:border-gold/50"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 z-0 rounded-full bg-white/10 transition-transform duration-500 ease-out scale-x-0 origin-[100%_50%] group-hover:scale-x-100"
                />
                <span className="relative z-10" dir="rtl">
                  بازگشت به استودیو
                </span>
              </Link>
            ) : (
              <Link
                href="/hormoz"
                className="group relative inline-flex items-center overflow-hidden rounded-full border border-gold/50 px-6 py-2.5 text-[13px] font-semibold text-gold transition-colors duration-300 hover:border-gold hover:text-black"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 z-0 rounded-full bg-gradient-to-l from-gold to-ember-soft transition-transform duration-500 ease-out scale-x-0 origin-[100%_50%] group-hover:scale-x-100"
                />
                <span className="relative z-10" dir="rtl">
                  نبرد هرمز
                </span>
              </Link>
            )}
          </div>

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

      <div
        className={`fixed inset-0 z-[90] flex flex-col bg-void/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        dir="rtl"
      >
        <div className="flex h-[68px] items-center justify-between px-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-bebas text-2xl tracking-[0.2em] text-gold"
            dir="ltr"
          >
            REMA
          </Link>
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
              key={`${l.id}-${l.fa}-m`}
              onClick={() => {
                setOpen(false);
                setTimeout(() => goSection(l.id), 350);
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
