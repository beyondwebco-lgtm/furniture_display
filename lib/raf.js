// one shared animation loop for every scroll effect
const subs = new Set();
let started = false;
export function subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }
export function start() {
  if (started) return;
  started = true;
  const loop = (t) => { subs.forEach((f) => f(t)); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
}
