import { useEffect } from "react";
import { PROCESS_STEPS } from "../lib/rooms";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Process = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="bg-rihara-ivory pt-32 pb-24" data-testid="process-page">
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <Reveal className="flex items-center gap-3 mb-5">
          <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">Process</span>
          <span className="h-px w-12 bg-rihara-walnut/30" />
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-display text-rihara-walnut text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] font-light">
            Five chapters,
            <br />
            <em className="italic text-rihara-gold-deep">one composed home.</em>
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="font-body text-rihara-walnut/70 text-lg max-w-2xl mt-8 leading-relaxed">
            Our studio runs on a single, transparent rhythm — long enough to consider every detail, tight enough to respect your timeline.
          </p>
        </Reveal>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 lg:px-12 mt-24">
        <div className="relative">
          <div className="absolute left-5 lg:left-1/2 top-2 bottom-2 w-px bg-rihara-walnut/15" aria-hidden />
          <div className="space-y-20">
            {PROCESS_STEPS.map((p, i) => {
              const side = i % 2 === 0;
              return (
                <Reveal key={p.n} delay={i * 100} className="relative">
                  <div className={`flex flex-col lg:flex-row lg:items-center gap-8 ${side ? "" : "lg:flex-row-reverse"}`}>
                    <div className={`lg:w-1/2 ${side ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                      <div className="flex items-baseline gap-4 mb-4" style={side ? { justifyContent: "flex-end" } : {}}>
                        <span className="font-display text-rihara-gold-deep text-7xl lg:text-8xl leading-none font-light">{p.n}</span>
                      </div>
                      <h2 className="font-display text-rihara-walnut text-4xl lg:text-5xl tracking-tight font-light leading-tight" data-testid={`process-step-title-${p.n}`}>
                        {p.title}
                      </h2>
                      <p className="font-body text-rihara-walnut/75 text-base lg:text-lg leading-relaxed mt-5 max-w-md lg:max-w-none">
                        {p.body}
                      </p>
                    </div>
                    <div className="absolute left-5 lg:left-1/2 -translate-x-1/2 top-6 w-3 h-3 rounded-full bg-rihara-gold-deep ring-4 ring-rihara-ivory" />
                    <div className="lg:w-1/2" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-32 flex items-center gap-6">
        <Link to="/#contact" data-testid="process-cta" className="inline-flex items-center gap-3 bg-rihara-walnut text-rihara-ivory px-8 py-4 uppercase tracking-[0.32em] text-xs font-medium hover:bg-rihara-gold-deep transition-colors">
          Start Chapter One <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
};

export default Process;
