import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY } from "../lib/rooms";

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const recompute = () => {
        const totalWidth = track.scrollWidth - window.innerWidth + 96;
        return Math.max(0, totalWidth);
      };
      const totalWidth = recompute();
      if (totalWidth <= 0) return;
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${recompute()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-rihara-ivory overflow-hidden"
      data-testid="gallery-section"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 pb-10 flex items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">Selected Works</span>
            <span className="h-px w-12 bg-rihara-walnut/30" />
          </div>
          <h2 className="font-display text-rihara-walnut text-5xl sm:text-6xl tracking-tight leading-[1.02] font-light">
            A library of <span className="italic text-rihara-gold-deep">finished rooms.</span>
          </h2>
        </div>
        <p className="hidden md:block font-body text-rihara-walnut/50 text-xs uppercase tracking-[0.32em]">
          Scroll →
        </p>
      </div>

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex items-center gap-8 pl-6 lg:pl-12 pr-24 will-change-transform pb-24" style={{ minHeight: "72vh" }}>
          {GALLERY.map((g, i) => {
            const variants = [
              { w: "32vw", h: "60vh" },
              { w: "26vw", h: "44vh" },
              { w: "36vw", h: "62vh" },
              { w: "24vw", h: "40vh" },
            ];
            const v = variants[i % variants.length];
            return (
              <figure
                key={i}
                data-testid={`gallery-item-${i}`}
                className="relative shrink-0 overflow-hidden group bg-rihara-cream shadow-xl ring-1 ring-rihara-walnut/8"
                style={{ width: v.w, height: v.h }}
              >
                <img src={g.url} alt={g.project} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-rihara-walnut/85 via-rihara-walnut/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold">{g.city}</p>
                  <p className="font-display text-rihara-ivory text-2xl mt-1">{g.project}</p>
                </figcaption>
                <span className="absolute top-4 left-4 font-body text-[10px] uppercase tracking-[0.32em] text-rihara-walnut bg-rihara-ivory/90 px-2.5 py-1 backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figure>
            );
          })}
          <div className="shrink-0 w-24" />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
