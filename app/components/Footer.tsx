import { Camera, Briefcase, ArrowUp } from "lucide-react";
import { scrollToSection } from "../lib/anim";

const cols = [
  { h: "پروژه‌ها", items: [{ t: "نبرد هرمز", id: "#hormuz" }, { t: "دنیای بازی", id: "#world" }, { t: "بازسازی حرم", id: "#haram" }, { t: "مدل‌های سه‌بعدی", id: "#assets" }] },
  { h: "استودیو", items: [{ t: "درباره ما", id: "#studio" }, { t: "توانمندی‌ها", id: "#studio" }, { t: "تماس", id: "#contact" }] },
];

export default function Footer() {
  return (
    <footer className="relative bg-black pb-8 pt-16">
      <div className="hud-line" />
      <div className="mx-auto max-w-[1500px] px-5 pt-12 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div>
            <div className="flex items-center gap-3" dir="ltr">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/40 bg-white/[0.03] font-bebas text-3xl text-gold">R</div>
              <div className="leading-none">
                <div className="font-bebas text-3xl tracking-[0.15em] text-bone">REMA STUDIO</div>
                <div className="mt-1 text-sm text-ash" dir="rtl">استودیو رما</div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 font-grotesk text-[10px] tracking-[0.25em] text-white/50" dir="ltr">
              {["GAME DEVELOPMENT", "3D ART", "DIGITAL CONTENT"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 px-3 py-1.5">{t}</span>
              ))}
            </div>
            <p className="mt-5 max-w-sm text-[13px] font-light leading-7 text-ash">
              خلق بازی‌ها، جهان‌های سه‌بعدی و تجربه‌های دیجیتال با کیفیت بصری بالا و فناوری روز.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-sm font-bold text-bone">{c.h}</div>
              <ul className="mt-5 space-y-3.5">
                {c.items.map((it) => (
                  <li key={it.t}>
                    <button onClick={() => scrollToSection(it.id)} className="text-[13px] font-light text-ash transition hover:text-gold">
                      {it.t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div className="text-sm font-bold text-bone">شبکه‌های اجتماعی</div>
            <div className="flex gap-3" dir="ltr">
              {[
                { icon: Camera, l: "Instagram" },
                { icon: Briefcase, l: "LinkedIn" },
              ].map((s) => (
                <a key={s.l} href="#" onClick={(e) => e.preventDefault()} aria-label={s.l}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-white/60 transition hover:border-gold/60 hover:text-gold">
                  <s.icon size={18} />
                </a>
              ))}
              <button onClick={() => scrollToSection("#top")} aria-label="back to top"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black transition hover:bg-ember-soft">
                <ArrowUp size={18} />
              </button>
            </div>
            <div className="font-grotesk text-[10px] tracking-[0.3em] text-white/30" dir="ltr">HELLO@REMASTUDIO.COM</div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-7 text-[12px] font-light text-white/35 md:flex-row">
          <span>© 2026 استودیو رما — تمامی حقوق محفوظ است.</span>
          <span className="font-grotesk tracking-[0.3em]" dir="ltr">CRAFTED WITH PASSION IN TEHRAN</span>
        </div>
      </div>
    </footer>
  );
}
