import { useEffect, useRef, useState } from "react";

// Center-focused horizontal carousel: 5 visible, the one nearest screen-center is largest.
// Auto-scrolls left→right; supports drag/swipe; smooth transitions via CSS transforms.

const ITEMS = [
  { src: "/interiors/img5.jpeg", project: "The Mehta Residence", city: "Pune" },
  { src: "/interiors/img2.jpeg", project: "Open Sky Kitchen", city: "Chennai" },
  { src: "/interiors/img11.jpeg", project: "Threshold", city: "Mumbai" },
  { src: "/interiors/img6.jpeg", project: "Bronze Bath", city: "Kolkata" },
  { src: "/interiors/img9.jpeg", project: "Linden House", city: "Bengaluru" },
  { src: "/interiors/img10.jpeg", project: "Anandam Sanctuary", city: "Ahmedabad" },
  { src: "/interiors/img12.jpeg", project: "House of Light", city: "Goa" },
  { src: "/interiors/img3.jpeg", project: "Walnut & Brass", city: "Delhi" },
  { src: "/interiors/img13.jpeg", project: "Quiet Atelier", city: "Mumbai" },
  { src: "/interiors/img14.jpeg", project: "Saffron Villa", city: "Hyderabad" },
  { src: "/interiors/img8.jpeg", project: "Stone Chamber", city: "Jaipur" },
];

const FocusCarousel = () => {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const [paused, setPaused] = useState(false);

  // pointer/drag
  const dragState = useRef({ dragging: false, startX: 0, startScroll: 0 });

  // Update visual state on every frame: scale/opacity based on distance from center
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId;
    const updateCards = () => {
      const center = window.innerWidth / 2;
      const cards = track.querySelectorAll(".focus-card");
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const distance = Math.abs(cardCenter - center);
        const maxDist = window.innerWidth * 0.45;
        const t = Math.min(1, distance / maxDist); // 0 at center, 1 far
        // Scale: 1.18 at center → 0.62 at edges  (clear hierarchy)
        const scale = 1.18 - t * 0.56;
        // Opacity: 1 at center → 0.35 at edges
        const opacity = 1 - t * 0.65;
        // Centre piece floats up a bit
        const y = (1 - t) * -20;
        // Inner image zoom for the centre piece
        const innerScale = 1 + (1 - t) * 0.12;

        card.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = `${Math.round(100 - t * 100)}`;
        const inner = card.querySelector(".focus-card-img");
        if (inner) inner.style.transform = `scale(${innerScale})`;
        const meta = card.querySelector(".focus-card-meta");
        if (meta) meta.style.opacity = (1 - t).toFixed(3);
      });
      rafId = requestAnimationFrame(updateCards);
    };
    rafId = requestAnimationFrame(updateCards);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Auto-scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const speed = 0.55; // px per frame
    const tick = () => {
      if (!paused && !dragState.current.dragging) {
        track.scrollLeft += speed;
        // Seamless loop: when half scrolled, jump back
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft -= track.scrollWidth / 2;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  // Drag handlers
  const onPointerDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current.dragging = true;
    dragState.current.startX = e.clientX;
    dragState.current.startScroll = track.scrollLeft;
    track.setPointerCapture?.(e.pointerId);
    track.style.cursor = "grabbing";
  };
  const onPointerMove = (e) => {
    if (!dragState.current.dragging) return;
    const track = trackRef.current;
    const dx = e.clientX - dragState.current.startX;
    track.scrollLeft = dragState.current.startScroll - dx;
  };
  const endDrag = (e) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current.dragging = false;
    track.releasePointerCapture?.(e.pointerId);
    track.style.cursor = "grab";
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-rihara-ivory py-24 lg:py-32 overflow-hidden"
      data-testid="focus-carousel-section"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-end justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">In Focus</span>
            <span className="h-px w-12 bg-rihara-walnut/30" />
          </div>
          <h2 className="font-display text-rihara-walnut text-5xl sm:text-6xl tracking-tight leading-[1.02] font-light">
            Rooms, <em className="italic text-rihara-gold-deep">in motion.</em>
          </h2>
        </div>
        <p className="hidden md:block font-body text-rihara-walnut/55 text-xs uppercase tracking-[0.32em]">
          Drag · Swipe · Auto-scroll
        </p>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="focus-track flex items-center gap-6 lg:gap-8 overflow-x-auto overflow-y-visible py-16 cursor-grab select-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: "30vw",
          paddingRight: "30vw",
        }}
        data-testid="focus-carousel-track"
      >
        {/* Render the list twice for seamless looping */}
        {[...ITEMS, ...ITEMS].map((it, i) => (
          <figure
            key={i}
            className="focus-card relative shrink-0 transition-[transform,opacity] duration-300 will-change-transform"
            style={{
              width: "min(340px, 22vw)",
              height: "min(460px, 50vh)",
              transformOrigin: "center center",
            }}
            data-testid={`focus-card-${i}`}
          >
            <div className="relative w-full h-full overflow-hidden bg-rihara-cream shadow-2xl ring-1 ring-rihara-walnut/10">
              <img
                src={it.src}
                alt={it.project}
                draggable={false}
                className="focus-card-img absolute inset-0 w-full h-full object-cover transition-transform duration-500 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rihara-walnut/85 via-rihara-walnut/0 to-transparent" />
              <figcaption className="focus-card-meta absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-500">
                <p className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold">{it.city}</p>
                <p className="font-display text-rihara-ivory text-2xl sm:text-3xl mt-1">{it.project}</p>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>

      <style>{`
        .focus-track::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default FocusCarousel;
