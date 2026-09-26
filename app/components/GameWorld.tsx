import { useLayoutEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { gsap, isReducedMotion } from "../lib/anim";

const worlds = [
  {
    n: "01",
    src: "/images/game-coast.jpg",
    title: "ساحل هرمز",
    en: "THE COAST",
    desc: "دژ سنگی بر فراز صخره‌های سرخ؛ جایی که نگهبانان تنگه، روز را به شب می‌رسانند.",
  },
  {
    n: "02",
    src: "/images/game-strike.jpg",
    title: "شب عملیات",
    en: "NIGHT OP",
    desc: "حمله شبانه پهپادها به مواضع دشمن — نور انفجار، تاریکی کویر را می‌شکافد.",
  },
  {
    n: "03",
    src: "/images/game-fleet.jpg",
    title: "گذرگاه مه‌آلود",
    en: "THE STRAIT",
    desc: "ناوگان در مه غلیظ تنگه پیشروی می‌کند؛ هر سایه می‌تواند یک کمین باشد.",
  },
  {
    n: "04",
    src: "/images/final-world.jpg",
    title: "افق سوخته",
    en: "BURNT HORIZON",
    desc: "پایان هر نبرد، آغازی تازه است — جزیره هرمز زیر آسمان پرستاره می‌درخشد.",
  },
];

export default function GameWorld() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || isReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".gw-head", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: ".gw-head", start: "top 85%" },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".gw-card");
      cards.forEach((card, i) => {
        const img = card.querySelector(".gw-img");
        const inner = card.querySelector(".gw-inner");
        // reveal: blur -> sharp + clip
        gsap.fromTo(img,
          { filter: "blur(14px) brightness(0.5)", scale: 1.18 },
          {
            filter: "blur(0px) brightness(1)", scale: 1.05, ease: "none",
            scrollTrigger: { trigger: card, start: "top 95%", end: "top 45%", scrub: 1 },
          }
        );
        // parallax inside card
        gsap.fromTo(img, { yPercent: -8 }, {
          yPercent: 8, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
        // scale down previous cards as next arrives
        if (i < cards.length - 1) {
          gsap.to(inner, {
            scale: 0.9, opacity: 0.55, filter: "brightness(0.5)", transformOrigin: "center top", ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1], start: "top bottom", end: "top 25%", scrub: 1,
            },
          });
        }
        // text stagger
        gsap.fromTo(card.querySelectorAll(".gw-text"), { y: 44, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 70%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="world" className="relative bg-void pb-10 pt-28 md:pt-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="gw-head text-center">
          <div className="flex items-center justify-center gap-4 font-grotesk text-[11px] tracking-[0.4em] text-gold" dir="ltr">
            <span className="h-px w-12 bg-gold/50" /> 03 — GAME WORLD <span className="h-px w-12 bg-gold/50" />
          </div>
          <h2 className="mt-5 font-bebas text-[clamp(3rem,9vw,7rem)] leading-none tracking-[0.08em] text-bone" dir="ltr">
            ENTER THE <span className="gold-text">WORLD</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-8 text-ash md:text-base">
            دنیای بازی را قدم‌به‌قدم کشف کنید — هر قاب، یک منطقه عملیاتی تازه است.
          </p>
        </div>
      </div>

      {/* stacked sticky cards */}
      <div className="mx-auto mt-14 max-w-[1300px] space-y-6 px-4 md:space-y-0 md:px-8">
        {worlds.map((w, i) => (
          <div
            key={w.n}
            className="gw-card md:sticky md:top-[9vh] md:mb-[8vh] md:flex md:h-[84vh] md:items-center"
            style={{ zIndex: i + 1 }}
          >
            <div className="gw-inner relative h-[62vh] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.65)] md:h-[76vh]">
              <div className="absolute inset-0 overflow-hidden">
                <img src={w.src} alt={w.title} className="gw-img h-[120%] w-full object-cover will-change-transform" loading="lazy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-transparent" />

              {/* number */}
              <div className="gw-text absolute left-6 top-6 font-bebas text-6xl text-white/25 md:left-10 md:top-10 md:text-8xl" dir="ltr">{w.n}</div>

              {/* content */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
                <div className="gw-text inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 backdrop-blur-md">
                  <MapPin size={13} className="text-gold" />
                  <span className="font-grotesk text-[10px] tracking-[0.35em] text-gold" dir="ltr">{w.en}</span>
                </div>
                <h3 className="gw-text mt-4 font-display-fa text-5xl text-bone md:text-7xl">{w.title}</h3>
                <p className="gw-text mt-3 max-w-lg text-sm font-light leading-8 text-white/70">{w.desc}</p>
                <div className="gw-text mt-6 flex items-center gap-3" dir="ltr">
                  <div className="h-px flex-1 bg-white/15">
                    <div className="h-full bg-gradient-to-r from-gold to-ember" style={{ width: `${((i + 1) / worlds.length) * 100}%` }} />
                  </div>
                  <span className="font-grotesk text-[10px] tracking-widest text-white/50">0{i + 1} / 04</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
