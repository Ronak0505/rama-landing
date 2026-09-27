"use client";

import Link from "next/link";
import { Camera, Briefcase, ArrowUp } from "lucide-react";
import { scrollToSection } from "../lib/anim";
import type { NavbarVariant } from "./Navbar";

type FooterLink = { t: string; href: string };

const studioProjectLinks: FooterLink[] = [
  { t: "نبرد هرمز", href: "/hormoz" },
  { t: "بین‌الحرمین", href: "/haram" },
  { t: "گالری رما", href: "/#assets" },
];

const haramProjectLinks: FooterLink[] = [
  { t: "معرفی پروژه", href: "/haram#haram" },
  { t: "نبرد هرمز", href: "/hormoz" },
  { t: "صفحه استودیو", href: "/" },
];

const gameProjectLinks: FooterLink[] = [
  { t: "معرفی بازی", href: "/hormoz#hormuz" },
  { t: "دنیای بازی", href: "/hormoz#world" },
  { t: "صفحه استودیو", href: "/" },
];

const studioLinks: FooterLink[] = [
  { t: "درباره ما", href: "/#studio" },
  { t: "پروژه‌ها", href: "/#projects" },
  { t: "تماس", href: "/#contact" },
];

const tags = ["توسعه بازی", "هنر سه‌بعدی", "محتوای دیجیتال"];

export default function Footer({ variant = "studio" }: { variant?: NavbarVariant }) {
  const projectCol =
    variant === "game" ? gameProjectLinks : variant === "haram" ? haramProjectLinks : studioProjectLinks;

  return (
    <footer className="relative bg-black pb-8 pt-16" dir="rtl">
      <div className="hud-line" />
      <div className="mx-auto max-w-[1500px] px-5 pt-12 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo/rama.svg" alt="رما" className="h-12 w-12 shrink-0" />
              <div className="leading-none">
                <div className="font-display-fa text-2xl text-bone md:text-3xl">استودیو رما</div>
              </div>
            </Link>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-white/55">
              {tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-sm text-[13px] font-light leading-7 text-ash">
              خلق بازی‌ها، جهان‌های سه‌بعدی و تجربه‌های دیجیتال با کیفیت بصری بالا و فناوری روز.
            </p>
          </div>

          <div>
            <div className="text-sm font-bold text-bone">پروژه‌ها</div>
            <ul className="mt-5 space-y-3.5">
              {projectCol.map((it) => (
                <li key={it.t}>
                  <Link href={it.href} className="text-[13px] font-light text-ash transition hover:text-gold">
                    {it.t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-bold text-bone">استودیو</div>
            <ul className="mt-5 space-y-3.5">
              {studioLinks.map((it) => (
                <li key={it.t}>
                  <Link href={it.href} className="text-[13px] font-light text-ash transition hover:text-gold">
                    {it.t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div className="text-sm font-bold text-bone">شبکه‌های اجتماعی</div>
            <div className="flex gap-3">
              {[
                { icon: Camera, l: "اینستاگرام" },
                { icon: Briefcase, l: "لینکدین" },
              ].map((s) => (
                <a
                  key={s.l}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={s.l}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-white/60 transition hover:border-gold/60 hover:text-gold"
                >
                  <s.icon size={18} />
                </a>
              ))}
              <button
                type="button"
                onClick={() => scrollToSection("#top")}
                aria-label="بازگشت به بالا"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black transition hover:bg-ember-soft"
              >
                <ArrowUp size={18} />
              </button>
            </div>
            <a
              href="mailto:hello@ramastudio.com"
              className="font-mono text-[11px] tracking-wide text-white/35 transition hover:text-gold"
              dir="ltr"
            >
              hello@ramastudio.com
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-7 text-[12px] font-light text-white/35 md:flex-row">
          <span>© 2026 استودیو رما — تمامی حقوق محفوظ است.</span>
          <a target="_blank" href="https://panafor.com" className="tracking-wide text-white/40">
            قدرت گرفته از پانافر
          </a>
        </div>
      </div>
    </footer>
  );
}
