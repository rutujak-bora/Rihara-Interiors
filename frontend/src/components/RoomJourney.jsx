import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROOMS } from "../lib/rooms";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const RoomJourney = () => {
  const containerRef = useRef(null);
  const railRef = useRef(null);
  const [active, setActive] = useState(0);
  const [railVisible, setRailVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setRailVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".room-section");
      sections.forEach((section, i) => {
        const img = section.querySelector(".room-img");
        const text = section.querySelector(".room-text");
        const accent = section.querySelector(".room-accent");

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15, y: 40 },
            {
              scale: 1.0,
              y: -40,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
                onEnter: () => setActive(i),
                onEnterBack: () => setActive(i),
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: { trigger: section, start: "top 75%", end: "top 35%", scrub: 1.0 },
            }
          );
        }

        if (accent) {
          gsap.fromTo(
            accent,
            { y: 80, opacity: 0 },
            {
              y: -40,
              opacity: 1,
              scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
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
      id="journey"
      ref={containerRef}
      className="relative bg-rihara-ivory"
      data-testid="room-journey"
    >
      {/* Progress rail (only visible during the journey) */}
      <div
        ref={railRef}
        className={`hidden lg:flex flex-col gap-3 fixed left-8 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-700 ${
          railVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {ROOMS.map((r, i) => (
          <a key={r.id} href={`#room-${r.id}`} data-testid={`journey-dot-${r.id}`} className="group flex items-center gap-3">
            <span className={`block h-px transition-all duration-500 ${active === i ? "w-12 bg-rihara-walnut" : "w-6 bg-rihara-walnut/25 group-hover:bg-rihara-walnut/60"}`} />
            <span className={`font-body text-[10px] uppercase tracking-[0.32em] transition-colors duration-500 ${active === i ? "text-rihara-walnut" : "text-rihara-walnut/40 group-hover:text-rihara-walnut/80"}`}>
              {r.index} · {r.title}
            </span>
          </a>
        ))}
      </div>

      {/* Section header */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 pb-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">The Journey</span>
          <span className="h-px w-12 bg-rihara-walnut/30" />
        </div>
        <h2 className="font-display text-rihara-walnut text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.98] font-light max-w-3xl">
          Six rooms, one <em className="italic text-rihara-gold-deep">unbroken</em> conversation.
        </h2>
      </div>

      {ROOMS.map((room, i) => {
        const reverse = i % 2 === 1;
        return (
          <section
            key={room.id}
            id={`room-${room.id}`}
            data-testid={`room-${room.id}`}
            className="room-section relative py-24 lg:py-28 overflow-hidden"
          >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-16 grid grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Image side */}
              <div className={`col-span-12 lg:col-span-7 ${reverse ? "lg:order-2 lg:col-start-6" : ""}`}>
                <div className="relative">
                  <div className="absolute -top-5 -left-5 right-12 bottom-12 border border-rihara-gold/50 -z-10" />
                  <div className="relative overflow-hidden bg-rihara-espresso aspect-[5/4] lg:aspect-[16/11]">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="room-img absolute inset-0 w-full h-full object-cover will-change-transform"
                    />
                    <span className="absolute bottom-4 left-4 font-body text-[10px] uppercase tracking-[0.32em] text-rihara-ivory bg-rihara-walnut/70 backdrop-blur-sm px-3 py-1.5">
                      Room · {room.index}
                    </span>
                  </div>
                  {/* Accent thumbnail */}
                  <div className={`room-accent hidden lg:block absolute ${reverse ? "-left-10 bottom-[-40px]" : "-right-10 bottom-[-40px]"} w-48 h-64 overflow-hidden bg-rihara-cream shadow-2xl ring-1 ring-rihara-walnut/10`}>
                    <img src={room.accentImage} alt={`${room.name} detail`} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className={`room-text col-span-12 lg:col-span-5 ${reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">{room.index}</span>
                  <span className="h-px w-10 bg-rihara-walnut/30" />
                  <span className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-walnut/60">{room.overline}</span>
                </div>
                <h3 className="font-display text-rihara-walnut text-6xl sm:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.95] font-light">
                  {room.name}
                </h3>
                <p className="font-display italic text-rihara-gold-deep text-2xl sm:text-3xl mt-5 leading-snug">
                  “{room.philosophy}”
                </p>
                <p className="font-body text-rihara-walnut/75 text-base sm:text-lg leading-relaxed mt-6 max-w-md">
                  {room.description}
                </p>
                <Link
                  to={`/our-work#${room.id}`}
                  data-testid={`room-cta-${room.id}`}
                  className="mt-8 group inline-flex items-center gap-3 font-body uppercase text-xs tracking-[0.32em] text-rihara-walnut border-b border-rihara-walnut/30 pb-2 hover:border-rihara-gold-deep hover:text-rihara-gold-deep transition-colors"
                >
                  Explore This Style
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <span className="hidden md:block pointer-events-none select-none absolute -bottom-6 right-4 lg:right-12 font-display text-rihara-walnut/[0.06] text-[18vw] leading-none">
              {room.index}
            </span>
          </section>
        );
      })}
    </section>
  );
};

export default RoomJourney;
