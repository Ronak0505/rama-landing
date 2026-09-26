import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const isReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

/** Smooth scroll to a section id using Lenis if available */
export function scrollToSection(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
  if (lenis) {
    lenis.scrollTo(el as Element, { duration: 2.2 });
  } else {
    (el as Element).scrollIntoView({ behavior: "smooth" });
  }
}
