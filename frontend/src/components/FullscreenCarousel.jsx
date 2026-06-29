import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// Each interior image takes 100vh — Ken-Burns motion in + parallax fade
// Pairs with the curated room list to give caption + one-line philosophy.

const SLIDES = [
  {
    src: "/interiors/img11.jpeg",
    index: "01",
    overline: "Chapter One · Foyer",
    room: "The Arched Welcome",
    caption: "An oak threshold framed in a hand-cut arch.",
    body: "The home introduces itself in low, even light. A slim travertine console, a sculpted recess, and a single arched mirror — every line drawn to be quiet on the eye.",
    materials: ["Limed Oak", "Travertine", "Cove-lit Recess", "Honed Beige Render"],
  },
  {
    src: "/interiors/img5.jpeg",
    index: "02",
    overline: "Chapter Two · Living Room",
    room: "Marble & Fluted Oak",
    caption: "Book-matched marble holds the room together.",
    body: "A book-matched marble feature wall sits inside a frame of fluted oak slats. A deep walnut media console floats below; a round black-marble table holds a hand-carved chess set. Built for long evenings and longer conversations.",
    materials: ["Calacatta Marble", "Fluted Oak Slats", "Black-Marble Table", "Deep Velvet Sofa"],
  },
  {
    src: "/interiors/img9.jpeg",
    index: "03",
    overline: "Chapter Three · Drawing Room",
    room: "Daylight Drawing Room",
    caption: "Designed for the slow hour between four and six.",
    body: "Full-height windows pull the daylight in; bouclé sofas catch it. A hand-knotted wool rug grounds the room, a travertine coffee table holds it together. Designed for the unhurried afternoon.",
    materials: ["Hand-knotted Wool Rug", "Bouclé Linen", "Travertine Coffee Table", "Pleated Drapes"],
  },
  {
    src: "/interiors/img2.jpeg",
    index: "04",
    overline: "Chapter Four · Kitchen",
    room: "The Working Heart",
    caption: "A marble island for ideas, an open plan for company.",
    body: "A modular kitchen composed around a long marble island. Smoked-glass cabinetry holds the everyday porcelain on display; a constellation of brass globe pendants lights the breakfast bar. Sapphire-velvet chairs anchor the dining edge.",
    materials: ["Quartz Island", "Smoked-Glass Display", "Brass Globe Pendants", "Sapphire Velvet"],
  },
  {
    src: "/interiors/img12.jpeg",
    index: "05",
    overline: "Chapter Five · Retreat",
    room: "Linen & Light",
    caption: "Sheer linen filters the daylight into a single, soft note.",
    body: "Floor-to-ceiling Belgian linen drapes diffuse the sun. A cream upholstered sofa, a bouclé ottoman, and a low side table in honed walnut — the room is composed for the kind of silence you can sleep into.",
    materials: ["Belgian Linen Drapes", "Cream Bouclé Ottoman", "Honed Walnut", "Soft Cove Light"],
  },
  {
    src: "/interiors/img6.jpeg",
    index: "06",
    overline: "Chapter Six · Bathroom",
    room: "The Bronze Sanctuary",
    caption: "A small room with the discipline of a temple.",
    body: "Textured limewashed walls catch a single shaft of warm light. A bronze counter holds a hand-hammered basin; an arched halo mirror gives back a softened reflection. Engineered for the morning and the evening ritual.",
    materials: ["Textured Limewash", "Bronze Counter & Basin", "Halo-Lit Arched Mirror", "Honed Stone Floor"],
  },
];

const FullscreenCarousel = () => {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [railVisible, setRailVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setRailVisible(entry.isIntersecting),
      { threshold: 0.02 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".fc-section");

      sections.forEach((section, i) => {
        const img = section.querySelector(".fc-img");
        const text = section.querySelector(".fc-text");
        const idx = section.querySelector(".fc-index");

        // Ken Burns — image slowly zooms + drifts while the section is in view
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.05, xPercent: -1, yPercent: 1 },
            {
              scale: 1.22,
              xPercent: 1,
              yPercent: -2,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
                onEnter: () => setActive(i),
                onEnterBack: () => setActive(i),
              },
            }
          );
        }

        // Subtle parallax drift only — never touch opacity, so text is always visible
        if (text) {
          gsap.fromTo(
            text,
            { y: 30 },
            {
              y: -60,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }

        if (idx) {
          gsap.fromTo(
            idx,
            { letterSpacing: "0.6em", opacity: 0 },
            {
              letterSpacing: "0.1em",
              opacity: 0.18,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top bottom", end: "top center", scrub: 1 },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative bg-rihara-walnut"
      data-testid="fullscreen-carousel"
    >
      {/* Progress rail (only visible during the carousel) */}
      <div
        className={`hidden lg:flex flex-col gap-3 fixed left-8 top-1/2 -translate-y-1/2 z-30 mix-blend-difference transition-opacity duration-700 ${
          railVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {SLIDES.map((s, i) => (
          <a key={s.index} href={`#fc-${s.index}`} className="group flex items-center gap-3" data-testid={`fc-dot-${s.index}`}>
            <span className={`block h-px transition-all duration-500 ${active === i ? "w-12 bg-rihara-ivory" : "w-5 bg-rihara-ivory/40 group-hover:bg-rihara-ivory/80"}`} />
            <span className={`font-body text-[10px] uppercase tracking-[0.32em] transition-colors duration-500 ${active === i ? "text-rihara-ivory" : "text-rihara-ivory/50 group-hover:text-rihara-ivory/90"}`}>
              {s.index} · {s.room}
            </span>
          </a>
        ))}
      </div>

      {SLIDES.map((s, i) => (
        <section
          key={s.index}
          id={`fc-${s.index}`}
          data-testid={`fc-slide-${s.index}`}
          className="fc-section relative w-full h-[100svh] overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src={s.src}
              alt={s.room}
              className="fc-img absolute inset-0 w-full h-full object-cover will-change-transform"
            />
          </div>

          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-rihara-walnut/35 via-rihara-walnut/15 to-rihara-walnut/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_25%,_rgba(26,20,16,0.55)_88%)]" />

          {/* Huge index numeral background */}
          <span className="fc-index absolute right-2 sm:right-6 lg:right-10 bottom-[-3vh] font-display text-rihara-ivory/[0.08] text-[42vw] sm:text-[26vw] lg:text-[22vw] leading-none pointer-events-none select-none">
            {s.index}
          </span>

          {/* Caption */}
          <div className="relative z-10 h-full flex items-end pb-16 sm:pb-24 px-6 lg:px-16">
            <div className="fc-text max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold">{s.index}</span>
                <span className="h-px w-10 bg-rihara-gold/70" />
                <span className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-ivory/70">{s.overline}</span>
              </div>
              <h2 className="font-display text-rihara-ivory text-5xl sm:text-7xl lg:text-[7rem] tracking-tight leading-[0.95] font-light" data-testid={`fc-heading-${s.index}`}>
                {s.room}
              </h2>
              <p className="font-display italic text-rihara-gold text-2xl sm:text-3xl lg:text-4xl mt-5 leading-snug max-w-2xl">
                “{s.caption}”
              </p>
              <p className="font-body text-rihara-ivory/80 text-base sm:text-lg leading-relaxed mt-6 max-w-2xl" data-testid={`fc-body-${s.index}`}>
                {s.body}
              </p>
              {/* Material tags */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-6 max-w-2xl" data-testid={`fc-materials-${s.index}`}>
                {s.materials.map((m, mi) => (
                  <span key={mi} className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.32em] text-rihara-ivory/85 border border-rihara-gold/40 px-3 py-1.5 bg-rihara-walnut/30 backdrop-blur-sm">
                    <span className="w-1 h-1 bg-rihara-gold rounded-full" />
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mini meta line (top-left) */}
          <div className="absolute top-6 sm:top-8 left-6 lg:left-16 z-10 flex items-center gap-3">
            <span className="block w-1.5 h-1.5 bg-rihara-gold animate-pulse rounded-full" />
            <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-ivory/80">
              Rihara · {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>
        </section>
      ))}

      {/* Closing CTA panel */}
      <section className="relative h-[60vh] bg-rihara-walnut flex items-center justify-center">
        <div className="text-center px-6 max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-rihara-gold/70" />
            <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold">End of Tour</span>
            <span className="h-px w-10 bg-rihara-gold/70" />
          </div>
          <h3 className="font-display text-rihara-ivory text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.98] font-light">
            Now imagine your <em className="italic text-rihara-gold/95">own.</em>
          </h3>
          <Link
            to="/#contact"
            data-testid="fc-end-cta"
            className="mt-9 inline-flex items-center gap-3 bg-rihara-gold text-rihara-walnut px-8 py-4 uppercase tracking-[0.32em] text-xs font-medium hover:bg-rihara-ivory transition-colors"
          >
            Begin a Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </section>
  );
};

export default FullscreenCarousel;
