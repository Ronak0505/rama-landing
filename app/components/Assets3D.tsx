"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Expand, Images, X } from "lucide-react";
import { gsap, isReducedMotion } from "../lib/anim";

type GalleryItem = {
  src: string;
  alt: string;
  layout?: "hero" | "wide";
};

type GalleryGroup = {
  key: string;
  fa: string;
  en: string;
  href?: string;
  items: GalleryItem[];
};

const galleryGroups: GalleryGroup[] = [
  {
    key: "hormoz",
    fa: "نبرد هرمز",
    en: "BATTLE OF HORMUZ",
    href: "/hormoz",
    items: [
      { src: "/gallery/battle-of-hormoz-1.jpg", alt: "نبرد هرمز — نمای عملیاتی", layout: "hero" },
      { src: "/gallery/battle-of-hormoz-2.jpg", alt: "نبرد هرمز — محیط ساحلی" },
      { src: "/gallery/battle-of-hormoz-3.jpg", alt: "نبرد هرمز — ناوگان" },
      { src: "/gallery/battle-of-hormoz-4.jpg", alt: "نبرد هرمز — شب عملیات", layout: "wide" },
    ],
  },
  {
    key: "shahed",
    fa: "پهپاد شاهد",
    en: "SHAhed UAV — 3D",
    items: [
      { src: "/gallery/shahed-1.jpg", alt: "مدل سه‌بعدی پهپاد — نمای یک", layout: "hero" },
      { src: "/gallery/shahed-2.jpg", alt: "مدل سه‌بعدی پهپاد — نمای دو" },
      { src: "/gallery/shahed-3.jpg", alt: "مدل سه‌بعدی پهپاد — جزئیات" },
      { src: "/gallery/shahed-4.jpg", alt: "مدل سه‌بعدی پهپاد — رندر استودیویی" },
    ],
  },
  {
    key: "haram",
    fa: "بین‌الحرمین",
    en: "BAYN AL-HARAMAYN",
    href: "/haram",
    items: [
      { src: "/gallery/haram-1.jpg", alt: "بازسازی حرم — نمای بیرونی", layout: "hero" },
      { src: "/gallery/haram-2.jpg", alt: "بازسازی حرم — فضای داخلی" },
      { src: "/gallery/haram-3.jpg", alt: "بازسازی حرم — جزئیات معماری", layout: "wide" },
    ],
  },
];

const marqueeItems = galleryGroups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.en })));

type LightboxState = { src: string; alt: string; group: string };

export default function Assets3D() {
  const root = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, closeLightbox]);

  useLayoutEffect(() => {
    if (!root.current || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".rg-head",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".rg-head", start: "top 88%" },
        },
      );

      gsap.utils.toArray<HTMLElement>(".rg-block").forEach((block) => {
        gsap.fromTo(
          block.querySelectorAll(".rg-card"),
          { y: 56, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: { trigger: block, start: "top 86%" },
          },
        );
      });

      gsap.to(".rg-marquee-track", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".rg-marquee",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="assets" className="relative overflow-hidden bg-void py-24 md:py-36 cinematic-grain">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,180,74,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-[480px] w-[480px] rounded-full bg-ember/[0.05] blur-[140px]" />

      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <header className="rg-head text-center">
          <h2 className="mt-5 font-display-fa text-[clamp(2.4rem,6vw,4.25rem)] leading-tight text-bone">
            گالری <span className="gold-text">رما</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-8 text-ash md:text-[15px] md:leading-9">
            مجموعه‌ای از رندرها، شات‌های درون‌بازی و بازسازی‌های سه‌بعدی — لحظه‌هایی از کارهای استودیو در یک گالری
            سینمایی.
          </p>
        </header>

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-24">
          {galleryGroups.map((group) => (
            <article key={group.key} className="rg-block">
              <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-bebas text-xs tracking-[0.4em] text-gold/80" dir="ltr">
                    {group.en}
                  </p>
                  <h3 className="mt-1 font-display-fa text-3xl text-bone md:text-4xl">{group.fa}</h3>
                </div>
                {group.href ? (
                  <Link
                    href={group.href}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-gold transition hover:gap-3"
                  >
                    مشاهده پروژه
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-ash">
                    <Images size={16} className="text-gold/70" />
                    مدل‌سازی و رندر سه‌بعدی
                  </span>
                )}
              </div>

              <div
                className={`rg-grid grid gap-3 md:gap-4 ${
                  group.key === "haram" ? "md:grid-cols-3" : "md:grid-cols-4 md:grid-rows-2"
                }`}
              >
                {group.items.map((item, idx) => (
                  <GalleryCard
                    key={item.src}
                    item={item}
                    group={group}
                    className={gridClass(group.key, item, idx)}
                    onOpen={() => setLightbox({ src: item.src, alt: item.alt, group: group.fa })}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-8"
          role="dialog"
          aria-modal
          aria-label={lightbox.alt}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-bone transition hover:border-gold/50 hover:text-gold md:left-8 md:top-8"
            aria-label="بستن"
          >
            <X size={20} />
          </button>
          <div
            className="max-h-[85vh] max-w-6xl overflow-hidden rounded-2xl border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightbox.src} alt={lightbox.alt} className="max-h-[78vh] w-full object-contain bg-black" />
            <div className="border-t border-white/10 bg-void/95 px-5 py-4 text-right">
              <p className="text-sm font-semibold text-bone">{lightbox.alt}</p>
              <p className="mt-1 font-grotesk text-[10px] tracking-[0.35em] text-gold/80">{lightbox.group}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function gridClass(groupKey: string, item: GalleryItem, index: number) {
  if (groupKey === "haram") {
    if (item.layout === "hero") return "md:col-span-2 md:row-span-2 min-h-[240px] md:min-h-[420px]";
    if (item.layout === "wide") return "md:col-span-3 min-h-[200px]";
    return "min-h-[200px] md:min-h-[200px]";
  }

  if (item.layout === "hero") return "md:col-span-2 md:row-span-2 min-h-[260px] md:min-h-[440px]";
  if (item.layout === "wide") return "md:col-span-2 min-h-[200px]";
  if (groupKey === "shahed" && index === 3) return "min-h-[200px]";
  return "min-h-[200px] md:min-h-[210px]";
}

function GalleryCard({
  item,
  group,
  className,
  onOpen,
}: {
  item: GalleryItem;
  group: GalleryGroup;
  className: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`rg-card group relative overflow-hidden rounded-2xl border border-white/10 bg-carbon text-right transition duration-500 hover:border-gold/45 hover:shadow-[0_24px_80px_rgba(0,0,0,0.55)] ${className}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10 transition duration-500 group-hover:from-black/95" />
      <div className="absolute inset-0 bg-gold/[0.07] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/70 opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
        <Expand size={16} />
      </div>

      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-90 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-5">
        <p className="font-grotesk text-[9px] tracking-[0.32em] text-gold/85" dir="ltr">
          {group.en}
        </p>
        <p className="mt-1 text-sm font-semibold leading-6 text-bone md:text-[15px]">{item.alt}</p>
      </div>
    </button>
  );
}
