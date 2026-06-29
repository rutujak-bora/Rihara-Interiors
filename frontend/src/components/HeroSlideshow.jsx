import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";

// Cinematic Ken-Burns slideshow as the hero background.
// Two stacked layers cross-fade; each image slowly zooms + pans on its own track.

const SLIDES = [
  { src: "/interiors/img5.jpeg", anchor: "center", from: { scale: 1.0, x: 0, y: 0 }, to: { scale: 1.18, x: -2, y: -2 } },
  { src: "/interiors/img2.jpeg", anchor: "center", from: { scale: 1.0, x: 2, y: 0 }, to: { scale: 1.16, x: -3, y: -1 } },
  { src: "/interiors/img11.jpeg", anchor: "center", from: { scale: 1.08, x: 0, y: 1 }, to: { scale: 1.22, x: 2, y: -2 } },
  { src: "/interiors/img6.jpeg", anchor: "center", from: { scale: 1.05, x: 0, y: 0 }, to: { scale: 1.2, x: 3, y: 2 } },
  { src: "/interiors/img9.jpeg", anchor: "center", from: { scale: 1.0, x: 0, y: 2 }, to: { scale: 1.18, x: -2, y: -3 } },
  { src: "/interiors/img12.jpeg", anchor: "center", from: { scale: 1.04, x: 1, y: 0 }, to: { scale: 1.2, x: -3, y: 2 } },
  { src: "/interiors/img3.jpeg", anchor: "center", from: { scale: 1.0, x: -1, y: 0 }, to: { scale: 1.18, x: 3, y: -2 } },
];

const SLIDE_DURATION = 6500; // ms per slide
const CROSSFADE = 1400; // ms

const HeroSlideshow = () => {
  const aRef = useRef(null);
  const bRef = useRef(null);
  const overlayRef = useRef(null);
  const [active, setActive] = useState(0); // index of currently visible
  const [layer, setLayer] = useState("a"); // which layer is on top
  const slideTimer = useRef(null);

  // Apply Ken-Burns animation on a layer img element
  const applyKenBurns = (layerEl, idx) => {
    if (!layerEl) return;
    const img = layerEl.querySelector("img");
    if (!img) return;
    const slide = SLIDES[idx];
    // Reset
    gsap.killTweensOf(img);
    gsap.set(img, {
      scale: slide.from.scale,
      x: `${slide.from.x}%`,
      y: `${slide.from.y}%`,
      transformOrigin: "center center",
    });
    // Animate to "to"
    gsap.to(img, {
      scale: slide.to.scale,
      x: `${slide.to.x}%`,
      y: `${slide.to.y}%`,
      duration: (SLIDE_DURATION + CROSSFADE) / 1000,
      ease: "sine.inOut",
    });
  };

  // Fade swap between layers
  useEffect(() => {
    // Initial: layer A shows slide 0
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;
    gsap.set(a, { opacity: 1 });
    gsap.set(b, { opacity: 0 });
    a.querySelector("img").src = SLIDES[0].src;
    b.querySelector("img").src = SLIDES[1 % SLIDES.length].src;
    applyKenBurns(a, 0);
    setActive(0);
    setLayer("a");

    let current = 0;
    const advance = () => {
      const next = (current + 1) % SLIDES.length;
      // Whichever layer is on top vs bottom
      const topLayer = layerRef.current === "a" ? aRef.current : bRef.current;
      const bottomLayer = layerRef.current === "a" ? bRef.current : aRef.current;
      // Prepare bottom layer with next image
      bottomLayer.querySelector("img").src = SLIDES[next].src;
      applyKenBurns(bottomLayer, next);
      // Bring it up — fade in
      gsap.to(bottomLayer, {
        opacity: 1,
        duration: CROSSFADE / 1000,
        ease: "sine.inOut",
      });
      gsap.to(topLayer, {
        opacity: 0,
        duration: CROSSFADE / 1000,
        ease: "sine.inOut",
      });

      current = next;
      setActive(next);
      layerRef.current = layerRef.current === "a" ? "b" : "a";
      setLayer(layerRef.current);
    };
    const layerRef = { current: "a" };
    slideTimer.current = setInterval(advance, SLIDE_DURATION);

    // Fade in the overlay text
    if (overlayRef.current) {
      gsap.from(overlayRef.current.querySelectorAll(".hero-fade"), {
        opacity: 0,
        y: 20,
        duration: 1.8,
        stagger: 0.25,
        ease: "power2.out",
        delay: 0.3,
      });
    }

    return () => clearInterval(slideTimer.current);
  }, []);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-rihara-walnut" data-testid="hero-slideshow">
      {/* Layer A */}
      <div ref={aRef} className="absolute inset-0 will-change-opacity">
        <img alt="" className="absolute inset-0 w-full h-full object-cover will-change-transform" />
      </div>
      {/* Layer B */}
      <div ref={bRef} className="absolute inset-0 will-change-opacity">
        <img alt="" className="absolute inset-0 w-full h-full object-cover will-change-transform" />
      </div>

      {/* Warm cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-rihara-walnut/35 via-rihara-walnut/20 to-rihara-walnut/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(26,20,16,0.55)_85%)]" />
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Brand overlay */}
      <div ref={overlayRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="hero-fade flex items-center gap-4 mb-6">
          <span className="h-px w-12 sm:w-16 bg-rihara-gold/70" />
          <span className="font-body text-[10px] sm:text-[11px] tracking-[0.42em] uppercase text-rihara-gold">
            Architects &amp; Interiors · Est. India
          </span>
          <span className="h-px w-12 sm:w-16 bg-rihara-gold/70" />
        </div>

        <h1 className="hero-fade font-display text-rihara-ivory text-[16vw] sm:text-[11vw] lg:text-[9vw] leading-[0.92] tracking-[-0.02em] font-light">
          Rihara <em className="italic text-rihara-gold/95">Interior</em>
        </h1>

        <p className="hero-fade font-display italic text-rihara-ivory/90 text-2xl sm:text-3xl lg:text-4xl mt-5">
          Where spaces tell stories.
        </p>

        <p className="hero-fade font-body text-rihara-ivory/75 max-w-lg text-sm sm:text-base leading-relaxed mt-7">
          An architecture &amp; interiors studio composing residences in walnut, brass, linen and light.
        </p>

        <div className="hero-fade mt-10 flex items-center gap-3 text-rihara-ivory/70">
          <span className="font-body text-[10px] uppercase tracking-[0.42em]">Scroll · Step inside</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10" data-testid="hero-slide-indicator">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`block h-px transition-all duration-700 ${
              active === i ? "w-10 bg-rihara-gold" : "w-4 bg-rihara-ivory/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlideshow;
