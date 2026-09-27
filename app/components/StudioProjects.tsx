"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Crosshair, Landmark } from "lucide-react";
import { gsap, isReducedMotion, scrollToSection } from "../lib/anim";

const projects = [
  {
    key: "hormoz",
    index: "01",
    fa: "نبرد هرمز",
    en: "BATTLE OF HORMUZ",
    desc: "پرچمدار استودیو — بازی تاکتیکی موبایلی در قلب تنگه هرمز",
    img: "/images/game-night.jpg",
    href: "/hormoz",
    icon: Crosshair,
    tag: "بازی پرچمدار",
    external: true,
    featured: true,
  },
  {
    key: "haram",
    index: "02",
    fa: "بین‌الحرمین",
    en: "BAYN AL-HARAMAYN",
    desc: "بازسازی دیجیتال معماری مقدس با دقت سه‌بعدی و نورپردازی سینمایی",
    img: "/images/haram-interior.jpg",
    href: "/haram",
    icon: Landmark,
    tag: "بازسازی فرهنگی",
    external: true,
    featured: false,
  },
] as const;

export default function StudioProjects() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sp-head",
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".sp-head", start: "top 88%", once: true },
        },
      );
      gsap.fromTo(
        ".sp-card",
        { y: 64, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.95,
          stagger: 0.14,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: { trigger: ".sp-grid", start: "top 86%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="projects" className="relative overflow-hidden bg-coal py-24 md:py-32 cinematic-grain">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(232,180,74,0.09),transparent_50%)]" />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-ember/[0.04] blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1180px] px-5 md:px-10">
        <header className="sp-head mb-12 md:mb-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="mt-4 font-display-fa text-[clamp(2.2rem,5vw,3.75rem)] leading-tight text-bone">
                پروژه‌های <span className="gold-text">برجسته</span>
              </h2>
              <p className="mt-3 text-sm font-light leading-8 text-ash md:text-[15px]">
                دو مسیر متفاوت از یک استودیو — از بازی موبایلی تا بازسازی دیجیتال میراث معماری
              </p>
            </div>
          </div>
        </header>

        <div className="sp-grid grid gap-8 md:grid-cols-2 md:gap-7 lg:gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.key} project={p} className="sp-card" />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, className }: { project: (typeof projects)[number]; className?: string }) {
  const featured = p.featured;

  const inner = (
    <>
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/10] md:aspect-[16/11]" : "aspect-[16/10]"}`}>
        <img
          src={p.img}
          alt={p.fa}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-transparent" />

        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 backdrop-blur-md">
          <p.icon size={13} className="text-gold" />
          <span className="text-[10px] font-medium text-white/85">{p.tag}</span>
        </div>

        <span
          className="absolute bottom-4 left-5 font-bebas text-5xl leading-none text-white/[0.12] md:text-6xl"
          dir="ltr"
          aria-hidden
        >
          {p.index}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 md:hidden">
          <p className="font-bebas text-[10px] tracking-[0.35em] text-gold/80" dir="ltr">
            {p.en}
          </p>
          <h3 className="mt-1 font-display-fa text-2xl text-bone">{p.fa}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="hidden font-bebas text-[11px] tracking-[0.38em] text-gold/75 md:block" dir="ltr">
          {p.en}
        </p>
        <h3
          className={`hidden font-display-fa leading-tight text-bone md:block ${featured ? "mt-2 text-3xl" : "mt-2 text-2xl"}`}
        >
          {p.fa}
        </h3>
        <p className="mt-3 flex-1 text-[13px] font-light leading-7 text-ash md:mt-4 md:text-sm md:leading-8">
          {p.desc}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold transition group-hover:gap-3">
          مشاهده پروژه
          <ArrowLeft size={16} />
        </span>
      </div>
    </>
  );

  const shell = [
    "group relative flex h-full flex-col overflow-hidden rounded-[26px] border bg-black/45 text-right backdrop-blur-sm transition duration-500",
    "hover:border-gold/40 hover:shadow-[0_28px_90px_rgba(0,0,0,0.55)]",
    featured ? "border-gold/30 md:-translate-y-1 md:shadow-[0_20px_70px_rgba(232,180,74,0.08)]" : "border-white/10",
    className ?? "",
  ].join(" ");

  if (p.external) {
    return (
      <Link href={p.href} className={shell}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => scrollToSection(p.href)} className={`${shell} w-full cursor-pointer`}>
      {inner}
    </button>
  );
}
