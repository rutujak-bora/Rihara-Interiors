import { useEffect } from "react";
import { SERVICES } from "../lib/rooms";
import Reveal from "../components/Reveal";
import { Sofa, LayoutPanelLeft, Palette, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const ICONS = { Sofa, LayoutPanelLeft, Palette };
const IMAGES = ["/interiors/img5.jpeg", "/interiors/img2.jpeg", "/interiors/img6.jpeg"];
const INCLUDES = [
  ["Spatial planning & 3D walkthroughs", "Joinery & furniture design", "Lighting design & specification", "Soft furnishings, art & styling", "Site supervision & handover"],
  ["Movement & light studies", "Floor plan options", "Storage choreography", "Sun & ventilation analysis", "Construction-ready drawings"],
  ["Curated material boards", "Finish sample sourcing", "Vendor coordination", "Sustainability vetting", "Tactile sample delivery"],
];

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 200);
    }
  }, []);

  return (
    <main className="bg-rihara-ivory pt-32 pb-24" data-testid="services-page">
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <Reveal className="flex items-center gap-3 mb-5">
          <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">Services</span>
          <span className="h-px w-12 bg-rihara-walnut/30" />
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-display text-rihara-walnut text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] font-light">
            Three disciplines.
            <br />
            <em className="italic text-rihara-gold-deep">One signature.</em>
          </h1>
        </Reveal>
      </section>

      <div className="mt-24 space-y-32">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon];
          const reverse = i % 2 === 1;
          return (
            <section key={s.id} id={s.id} className="max-w-[1440px] mx-auto px-6 lg:px-12" data-testid={`services-detail-${s.id}`}>
              <div className="grid grid-cols-12 gap-10 lg:gap-14 items-center">
                <Reveal className={`col-span-12 lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden bg-rihara-cream">
                      <img src={IMAGES[i]} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -top-5 -left-5 right-5 bottom-5 border border-rihara-gold-deep/40 -z-10" />
                  </div>
                </Reveal>

                <Reveal delay={150} className={`col-span-12 lg:col-span-6 ${reverse ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}>
                  <div className="font-display text-rihara-gold-deep/80 text-3xl mb-4">0{i + 1}</div>
                  <div className="w-14 h-14 inline-flex items-center justify-center border border-rihara-gold-deep/50 text-rihara-gold-deep mb-6">
                    <Icon className="w-6 h-6" strokeWidth={1.25} />
                  </div>
                  <h2 className="font-display text-rihara-walnut text-5xl tracking-tight leading-[1.02] font-light">{s.title}</h2>
                  <p className="font-body text-rihara-walnut/75 text-base lg:text-lg leading-relaxed mt-6">{s.long}</p>

                  <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {INCLUDES[i].map((it, k) => (
                      <li key={k} className="flex items-start gap-2 font-body text-sm text-rihara-walnut/80">
                        <Check className="w-4 h-4 text-rihara-gold-deep shrink-0 mt-1" /> {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-32 flex items-center gap-6">
        <Link to="/#contact" data-testid="services-cta" className="inline-flex items-center gap-3 bg-rihara-walnut text-rihara-ivory px-8 py-4 uppercase tracking-[0.32em] text-xs font-medium hover:bg-rihara-gold-deep transition-colors">
          Enquire About Your Project <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
};

export default ServicesPage;
