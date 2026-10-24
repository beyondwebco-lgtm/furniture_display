"use client";
import { useEffect, useRef } from "react";
import { subscribe } from "../lib/raf";
import Split from "./Split";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const C = [0.08, 0.5, 0.92];

export default function Hero({ beats, price, name }) {
  const sec = useRef(), side = useRef(), back = useRef(), shadow = useRef(), word = useRef(), fill = useRef(), blob = useRef();
  const bt = useRef([]), dots = useRef([]);

  useEffect(() => {
    let cur = 0;
    return subscribe(() => {
      const r = sec.current.getBoundingClientRect();
      const target = clamp(-r.top / (r.height - innerHeight));
      cur += (target - cur) * 0.12;
      const p = cur;
      const turn = ease(clamp((p - 0.3) / 0.3));
      const mid = Math.sin(turn * Math.PI);

      side.current.style.transform = `rotateY(${-turn * 82}deg)`;
      side.current.style.opacity = clamp(1 - turn * 1.5);
      back.current.style.transform = `rotateY(${(1 - turn) * 82}deg)`;
      back.current.style.opacity = clamp(turn * 1.5 - 0.5);
      const lift = -p * 36 + mid * -10;
      side.current.parentElement.style.transform = `translate3d(0,${lift}px,0) scale(${1 + p * 0.07})`;
      shadow.current.style.transform = `translateX(-50%) scaleX(${1 - mid * 0.45 + p * 0.1})`;
      shadow.current.style.opacity = 0.55 - p * 0.15;
      word.current.style.transform = `translate3d(${-p * 22}vw,0,0)`;
      blob.current.style.transform = `translate(-50%,-50%) scale(${0.9 + p * 0.35})`;
      fill.current.style.transform = `scaleY(${p})`;

      bt.current.forEach((el, i) => {
        if (!el) return;
        const v = clamp(1 - Math.abs(p - C[i]) / 0.2);
        el.style.opacity = i === 0 ? clamp(1 - Math.max(0, p - 0.1) / 0.14) : i === 2 ? clamp((p - 0.7) / 0.14) : v * 1.6;
        el.style.transform = `translate3d(0,${(C[i] - p) * 220}px,0)`;
        el.style.pointerEvents = el.style.opacity > 0.6 ? "auto" : "none";
      });
      dots.current.forEach((d, i) => d && d.classList.toggle("on", Math.abs(p - C[i]) < 0.2));
    });
  }, []);

  return (
    <section className="pin" id="chair" ref={sec}>
      <div className="sticky">
        <div className="word" aria-hidden="true"><span ref={word}>Cloud</span></div>
        <div className="blob" ref={blob} aria-hidden="true" />
        <div className="stage-wrap hero-in">
          <div className="stage">
            <div className="chair">
              <img ref={side} className="face" src="/images/side-cut.webp" alt={`${name}, side view`} />
              <img ref={back} className="face" src="/images/back-cut.webp" alt={`${name}, back view`} style={{ opacity: 0 }} />
            </div>
            <div className="shadow" ref={shadow} aria-hidden="true" />
          </div>
        </div>

        <div className="beats">
          {beats.map((b, i) => (
            <div className="beat" key={b.title} ref={(el) => (bt.current[i] = el)} style={i ? { opacity: 0 } : undefined}>
              <h1 className={i ? "h-md" : "h-xl"} aria-label={b.title}>
                {i === 0 ? <Split text={b.title} now as="span" /> : b.title}
              </h1>
              <p className="lede">{b.text}</p>
              {i === 2 && <a className="btn" href="#order"><span>Order for Rs. {price.toLocaleString("en-IN")}</span></a>}
            </div>
          ))}
        </div>

        <div className="rail hero-in" aria-hidden="true">
          <div className="line"><i ref={fill} /></div>
          {["Cushions", "Shell", "Base"].map((l, i) => (<span key={l} ref={(el) => (dots.current[i] = el)}>{l}</span>))}
        </div>
        <div className="hint hero-in" aria-hidden="true"><i /> Scroll</div>
      </div>
    </section>
  );
}
