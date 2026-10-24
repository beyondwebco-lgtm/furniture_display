// Splits text into masked words. Animates when parent gets .in (or html[data-ready] if now).
export default function Split({ text, as: Tag = "span", now = false, className = "", base = 0 }) {
  return (
    <Tag className={`split ${className}`} data-now={now ? "" : undefined} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span className="w" key={i} aria-hidden="true"><span style={{ "--i": i + base }}>{w}&nbsp;</span></span>
      ))}
    </Tag>
  );
}
