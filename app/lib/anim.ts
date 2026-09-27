import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== "undefined") {
  ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

export const isReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

/** Desktop pointer devices — skip scroll-scrub parallax on touch/low-end viewports */
export const prefersScrollScrub = () =>
  typeof window !== "undefined" &&
  !isReducedMotion() &&
  window.innerWidth >= 768 &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

type LenisLike = {
  scrollTo: (target: Element, options?: object) => void;
  stop: () => void;
  start: () => void;
};

export function getLenis(): LenisLike | undefined {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

/** Block document scroll (Lenis + overflow) — e.g. modals / lightbox */
export function lockPageScroll() {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  getLenis()?.stop();
}

export function unlockPageScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  getLenis()?.start();
}

/** Smooth scroll to a section id using Lenis if available */
export function scrollToSection(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el as Element, { duration: 2.2 });
  } else {
    (el as Element).scrollIntoView({ behavior: "smooth" });
  }
}
