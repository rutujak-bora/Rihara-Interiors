import { useRef } from "react";
import { Sofa, LayoutPanelLeft, Palette, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICES } from "../lib/rooms";

const ICONS = { Sofa, LayoutPanelLeft, Palette };

const ServiceCard = ({ s, i }) => {
  const ref = useRef(null);
  const Icon = ICONS[s.icon];

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-testid={`service-card-${s.id}`}
      className="tilt-card relative bg-rihara-cream border border-rihara-walnut/10 p-10 group cursor-pointer shadow-[0_10px_30px_-15px_rgba(26,20,16,0.18)] hover:shadow-[0_20px_60px_-15px_rgba(26,20,16,0.28)] transition-shadow"
    >
      <div className="absolute top-6 right-6 font-display text-rihara-walnut/15 text-3xl">0{i + 1}</div>
      <div className="w-14 h-14 inline-flex items-center justify-center border border-rihara-gold-deep/50 text-rihara-gold-deep mb-8">
        <Icon className="w-6 h-6" strokeWidth={1.25} />
      </div>
      <h3 className="font-display text-rihara-walnut text-3xl tracking-tight leading-tight mb-4">{s.title}</h3>
      <p className="font-body text-rihara-walnut/65 text-sm leading-relaxed mb-8">{s.short}</p>
      <Link
        to={`/services#${s.id}`}
        data-testid={`service-learn-more-${s.id}`}
        className="inline-flex items-center gap-2 font-body uppercase text-[11px] tracking-[0.32em] text-rihara-gold-deep border-b border-rihara-gold-deep/30 pb-1 group-hover:border-rihara-gold-deep"
      >
        Learn More <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};

const ServicesGrid = () => {
  return (
    <section id="services" className="bg-rihara-linen py-32 relative" data-testid="services-grid-section">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-8 mb-16 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">Services</span>
              <span className="h-px w-12 bg-rihara-walnut/30" />
            </div>
            <h2 className="font-display text-rihara-walnut text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02] font-light">
              Three disciplines.
              <br />
              <span className="italic text-rihara-gold-deep">One signature.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="font-body text-rihara-walnut/70 text-base lg:text-lg leading-relaxed">
              Whether a single room or an entire residence, our studio composes interiors with a steady hand and an editor’s eye. The work is quiet, layered, and made to age beautifully.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
