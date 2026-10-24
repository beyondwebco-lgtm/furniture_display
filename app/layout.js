import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Loader from "../components/Loader";
import Motion from "../components/Motion";
import { product } from "../lib/product";

const serif = Fraunces({ subsets: ["latin"], variable: "--serif", style: ["normal", "italic"], axes: ["opsz"] });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--sans" });

export const metadata = {
  title: `${product.name} | ${product.fullBrand}`,
  description: product.beats[0].text,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        <noscript><style>{"#loader{display:none}.split .w>span,.hero-in{transform:none!important;opacity:1!important}"}</style></noscript>
        <Loader brand={product.brand} />
        <div id="curtain" aria-hidden="true" />
        <div className="progress" aria-hidden="true" />
        {children}
        <Motion />
      </body>
    </html>
  );
}
