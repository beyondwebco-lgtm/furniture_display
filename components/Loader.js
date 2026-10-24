"use client";
import { useEffect, useState } from "react";

export default function Loader({ brand }) {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.loading = "1";
    const start = performance.now();
    const dur = 2200;
    let id;
    const tick = (t) => {
      const k = Math.min(1, (t - start) / dur);
      setN(Math.round((1 - Math.pow(1 - k, 3)) * 100));
      if (k < 1) id = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setDone(true);
          delete document.documentElement.dataset.loading;
          setTimeout(() => (document.documentElement.dataset.ready = "1"), 350);
          setTimeout(() => setGone(true), 1400);
        }, 250);
      }
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  if (gone) return null;
  return (
    <div id="loader" className={done ? "done" : ""} role="status" aria-label="Loading">
      <div className="ld-brand"><span>{brand}</span></div>
      <p className="ld-sub">Handcrafted furniture</p>
      <div className="ld-count">{String(n).padStart(3, "0")}</div>
      <div className="ld-bar"><i style={{ transform: `scaleX(${n / 100})` }} /></div>
    </div>
  );
}
