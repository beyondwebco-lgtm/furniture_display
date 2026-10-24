"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { subscribe, start } from "../lib/raf";

export default function Motion() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    let lenis = null;
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
      subscribe((t) => lenis.raf(t));
    }
    start();

    // scroll progress bar + parallax
    const par = [...document.querySelectorAll("[data-speed]")];
    const off = subscribe(() => {
      const max = root.scrollHeight - innerHeight;
      root.style.setProperty("--scroll", max > 0 ? (scrollY / max).toFixed(4) : 0);
      if (reduced) return;
      for (const n of par) {
        const r = n.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) continue;
        const d = r.top + r.height / 2 - innerHeight / 2;
        n.style.transform = `translate3d(0,${(-d * n.dataset.speed).toFixed(1)}px,0)`;
      }
    });

    // reveal on enter
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.18 });
    document.querySelectorAll(".split:not([data-now]), .reveal, .imgreveal, .draw").forEach((n) => io.observe(n));

    // page transition: curtain wipe on anchor links
    const curtain = document.getElementById("curtain");
    let busy = false;
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      if (busy) return;
      busy = true;
      curtain.dataset.state = "in";
      setTimeout(() => {
        if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
        else target.scrollIntoView();
        curtain.dataset.state = "out";
        setTimeout(() => { curtain.dataset.state = ""; busy = false; }, 800);
      }, 800);
    };
    document.addEventListener("click", onClick);

    return () => { off(); io.disconnect(); document.removeEventListener("click", onClick); lenis && lenis.destroy(); };
  }, []);
  return null;
}
