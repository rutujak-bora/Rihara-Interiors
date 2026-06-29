import { useEffect } from "react";
import { GALLERY } from "../lib/rooms";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Editorial tetris-style spans (12-col grid)
const SPANS = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5 md:row-span-1",
  "md:col-span-5 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-2",
  "md:col-span-5 md:row-span-1",
  "md:col-span-3 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-12 md:row-span-1",
];

const OurWork = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="bg-rihara-ivory pt-32 pb-24" data-testid="our-work-page">
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <Reveal className="flex items-center gap-3 mb-5">
          <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">Our Work</span>
          <span className="h-px w-12 bg-rihara-walnut/30" />
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-display text-rihara-walnut text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] font-light max-w-5xl">
            A portfolio of <em className="italic text-rihara-gold-deep">quiet rooms.</em>
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="font-body text-rihara-walnut/70 text-lg leading-relaxed max-w-2xl mt-8">
            Selected residences from across India — each composed for the specific lives lived inside them. Hover to read where, and what.
          </p>
        </Reveal>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-12 auto-rows-[26vh] gap-4 lg:gap-5">
          {GALLERY.map((g, i) => (
            <Reveal
              key={i}
              delay={i * 70}
              className={`relative overflow-hidden bg-rihara-cream group shadow-xl ring-1 ring-rihara-walnut/10 ${SPANS[i % SPANS.length]}`}
            >
              <img src={g.url} alt={g.project} data-testid={`our-work-img-${i}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-rihara-walnut/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <p className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold">{g.city}</p>
                <p className="font-display text-rihara-ivory text-2xl mt-1">{g.project}</p>
              </div>
              <span className="absolute top-3 left-3 font-body text-[10px] uppercase tracking-[0.32em] text-rihara-walnut bg-rihara-ivory/90 px-2 py-1 backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-28 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-7">
          <h3 className="font-display text-rihara-walnut text-5xl sm:text-6xl tracking-tight font-light leading-[1.02]">
            A home in mind?
          </h3>
          <p className="font-body text-rihara-walnut/70 mt-4 max-w-md">
            Each project begins with a long conversation. Tell us about your space — we will reply within two working days.
          </p>
        </div>
        <div className="col-span-12 md:col-span-5 md:text-right">
          <Link to="/#contact" data-testid="our-work-cta" className="inline-flex items-center gap-3 bg-rihara-walnut text-rihara-ivory px-8 py-4 uppercase tracking-[0.32em] text-xs font-medium hover:bg-rihara-gold-deep transition-colors">
            Begin a Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default OurWork;
