import { useEffect } from "react";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";

const VALUES = [
  {
    n: "01",
    title: "Quiet over loud",
    body: "We design rooms that hold up to a decade of mornings — never the room that wins an Instagram week and tires by month three.",
  },
  {
    n: "02",
    title: "One idea, deeply considered",
    body: "We present a single editorial concept per home — not a buffet of options. The discipline lives in the editing.",
  },
  {
    n: "03",
    title: "Material before motif",
    body: "We choose the wood, the stone, the brass first. The room composes itself around honest materials.",
  },
  {
    n: "04",
    title: "Hands on, end to end",
    body: "Weekly site visits, trusted karigars, one point of accountability. From the first sketch to the last cushion.",
  },
];

const TEAM = [
  {
    name: "Rihara Mehrotra",
    role: "Principal Architect & Founder",
    img: "/interiors/img5.jpeg",
    bio: "Trained at SPA Delhi and Politecnico di Milano. 12 years composing residences across India.",
  },
  {
    name: "Ananya Iyer",
    role: "Head of Interiors",
    img: "/interiors/img9.jpeg",
    bio: "Material curator and stylist. Believes a sofa should belong to the room, not the showroom.",
  },
  {
    name: "Vikram Shenoy",
    role: "Site & Joinery Lead",
    img: "/interiors/img11.jpeg",
    bio: "Runs every build to the millimetre. Karigar whisperer. Has never missed a hand-over date.",
  },
];

const AboutUs = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="bg-rihara-ivory pt-32 pb-24" data-testid="about-us-page">
      {/* HERO */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="col-span-12 lg:col-span-7">
          <Reveal className="flex items-center gap-3 mb-5">
            <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">About the Studio</span>
            <span className="h-px w-12 bg-rihara-walnut/30" />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display text-rihara-walnut text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] font-light">
              We listen to rooms
              <br />
              <em className="italic text-rihara-gold-deep">before we draw them.</em>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="font-body text-rihara-walnut/75 text-lg lg:text-xl leading-relaxed max-w-2xl mt-8">
              Rihara is a small architecture &amp; interiors studio based in India, composing residences in walnut, brass, linen and light. We design quietly, decade by decade, one home at a time.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <Reveal delay={300}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden bg-rihara-cream">
                <img src="/interiors/img12.jpeg" alt="Studio" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-5 -left-5 right-5 bottom-5 border border-rihara-gold-deep/40 -z-10" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOUNDER QUOTE */}
      <section className="bg-rihara-walnut text-rihara-ivory py-28 mt-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/interiors/img6.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-rihara-walnut via-rihara-walnut/85 to-rihara-walnut/60" />
        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-10 items-center">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <Quote className="w-10 h-10 text-rihara-gold/80 mb-6" strokeWidth={1} />
            </Reveal>
            <Reveal delay={120}>
              <p className="font-display italic text-rihara-ivory text-3xl sm:text-4xl lg:text-5xl leading-tight">
                A home is not a brochure. It is a long sentence, written slowly, in materials that age well. Our job is to listen — and then to write that sentence beautifully.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-rihara-gold/70" />
                <div>
                  <p className="font-body text-sm text-rihara-ivory/90">Rihara Mehrotra</p>
                  <p className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold">Principal &amp; Founder</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-32" data-testid="about-values">
        <Reveal className="flex items-center gap-3 mb-5">
          <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">Our Values</span>
          <span className="h-px w-12 bg-rihara-walnut/30" />
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-display text-rihara-walnut text-5xl sm:text-6xl tracking-tight leading-[1.02] font-light max-w-3xl">
            Four convictions
            <br />
            <em className="italic text-rihara-gold-deep">we will not negotiate.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-16">
          {VALUES.map((v, i) => (
            <Reveal
              key={v.n}
              delay={i * 100}
              className="relative border-t border-rihara-walnut/20 pt-8 group"
              data-testid={`about-value-${v.n}`}
            >
              <div className="flex items-baseline gap-6">
                <span className="font-display text-rihara-gold-deep/80 text-5xl leading-none font-light">{v.n}</span>
                <div>
                  <h3 className="font-display text-rihara-walnut text-3xl tracking-tight font-light leading-tight">{v.title}</h3>
                  <p className="font-body text-rihara-walnut/75 text-base leading-relaxed mt-4 max-w-md">{v.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-32" data-testid="about-team">
        <div className="grid grid-cols-12 gap-8 items-end mb-14">
          <div className="col-span-12 lg:col-span-7">
            <Reveal className="flex items-center gap-3 mb-5">
              <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">The People</span>
              <span className="h-px w-12 bg-rihara-walnut/30" />
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-display text-rihara-walnut text-5xl sm:text-6xl tracking-tight leading-[1.02] font-light">
                A small studio,
                <br />
                <em className="italic text-rihara-gold-deep">deeply involved.</em>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Reveal delay={200}>
              <p className="font-body text-rihara-walnut/70 leading-relaxed">
                We are intentionally small. Three principals, six designers, and a tight bench of karigars and engineers. We take on a maximum of eight residences per year — so every project has all of us in it.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TEAM.map((t, i) => (
            <Reveal key={t.name} delay={i * 120} className="group" data-testid={`team-card-${i}`}>
              <div className="relative aspect-[3/4] overflow-hidden bg-rihara-cream">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-rihara-walnut/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold">{t.role}</p>
                  <p className="font-display text-rihara-ivory text-3xl mt-1 leading-tight">{t.name}</p>
                </div>
              </div>
              <p className="font-body text-rihara-walnut/70 text-sm leading-relaxed mt-4">{t.bio}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS / NUMBERS STRIP */}
      <section className="bg-rihara-cream py-20 mt-32 border-y border-rihara-walnut/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { k: "12+", v: "Years of practice" },
            { k: "80", v: "Residences composed" },
            { k: "14", v: "Cities served" },
            { k: "8/yr", v: "Projects we accept" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 80} className="text-center">
              <div className="font-display text-5xl lg:text-6xl text-rihara-walnut leading-none">{s.k}</div>
              <div className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-walnut/60 mt-3">{s.v}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-32 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-7">
          <Reveal>
            <h3 className="font-display text-rihara-walnut text-5xl sm:text-6xl tracking-tight font-light leading-[1.02]">
              Like the way we think?
            </h3>
            <p className="font-body text-rihara-walnut/70 mt-4 max-w-md">
              We work with a small number of clients each year. Send us a note about your home — we reply personally within two working days.
            </p>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-5 md:text-right">
          <Reveal delay={120}>
            <Link to="/#contact" data-testid="about-cta" className="inline-flex items-center gap-3 bg-rihara-walnut text-rihara-ivory px-8 py-4 uppercase tracking-[0.32em] text-xs font-medium hover:bg-rihara-gold-deep transition-colors">
              Begin a Conversation <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
