"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import Lenis from "lenis";

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "contact",
];

export function useScrollPosition() {
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (lenisRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.8,
      touchMultiplier: 1,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    function onScroll(e: any) {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;

        const scrollY = Math.round(e.animatedScroll ?? e.scroll ?? 0);
        const state = useStore.getState();

        let newSection = state.activeSection;
        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
          const el = document.getElementById(SECTION_IDS[i]);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 3) {
              newSection = SECTION_IDS[i];
              break;
            }
          }
        }
        if (newSection !== state.activeSection) {
          state.setActiveSection(newSection);
        }

        if (scrollY > 100) {
          const goingDown = scrollY > lastScrollYRef.current;
          if (goingDown && state.isNavVisible) {
            state.setIsNavVisible(false);
          } else if (!goingDown && !state.isNavVisible) {
            state.setIsNavVisible(true);
          }
        } else if (!state.isNavVisible) {
          state.setIsNavVisible(true);
        }

        lastScrollYRef.current = scrollY;
      });
    }

    lenis.on("scroll", onScroll);

    return () => {
      tickingRef.current = false;
      lenisRef.current = null;
      lenis.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
