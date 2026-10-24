import Hero from "../components/Hero";
import Split from "../components/Split";
import { product as p } from "../lib/product";

const inr = (n) => "Rs. " + n.toLocaleString("en-IN");
const wa = `https://wa.me/${p.whatsapp}?text=${encodeURIComponent("Hi, I want to order the " + p.name)}`;
const words = "Chenille · Leather · Steel · Swivel · Made to be sat in · ";

export default function Page() {
  return (
    <main>
      <header className="nav hero-in">
        <a href="#chair" className="brand">{p.brand}</a>
        <nav aria-label="Main">
          <a className="lnk" href="#details">Details</a>
          <a className="lnk" href="#specs">Size</a>
          <a className="pill" href="#order"><span>Order</span></a>
        </nav>
      </header>

      <Hero beats={p.beats} price={p.price} name={p.name} />

      <div className="marquee" aria-hidden="true"><div>{words.repeat(8)}</div></div>

      <section className="details" id="details">
        <Split as="h2" text="Three materials. One chair." className="h-lg" />
        {p.materials.map((m, i) => (
          <article className={`row ${i % 2 ? "flip" : ""}`} key={m.title}>
            <figure className="frame imgreveal">
              <div className="zw" style={{ transform: `scale(${m.zoom[1]})`, transformOrigin: m.zoom[2] }}>
                <img data-speed="0.06" src={`/images/${m.zoom[0]}-cut.webp`} alt={m.title} />
              </div>
            </figure>
            <div className="txt">
              <Split as="h3" text={m.title} className="h-md" />
              <p className="reveal lede">{m.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="specs" id="specs">
        <Split as="h2" text="Size and make" className="h-lg" />
        <dl>
          {p.specs.map(([k, v]) => (
            <div key={k} className="draw"><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </section>

      <section className="order" id="order">
        <Split as="h2" text="Take it home." className="h-xl" />
        <p className="price reveal">{inr(p.price)}</p>
        <p className="lede reveal">{p.delivery}. Message us on WhatsApp with your city. We confirm delivery time and payment.</p>
        <a className="btn big reveal" href={wa}><span>Order on WhatsApp</span></a>
      </section>

      <footer>© 2026 {p.fullBrand}</footer>
    </main>
  );
}
