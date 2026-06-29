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
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const [active, setActive] = useState(0);

  // Robust autoplay (handles browsers that need a play() call after muted is set)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.load();
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => { /* autoplay blocked */ });
    };
    tryPlay();
    // Also try after a small delay (some browsers need a tick)
    const t1 = setTimeout(tryPlay, 400);
    const t2 = setTimeout(tryPlay, 1200);
    // First user interaction will guarantee play
    const onFirstInteract = () => { tryPlay(); window.removeEventListener("pointerdown", onFirstInteract); };
    window.addEventListener("pointerdown", onFirstInteract);
    // Re-try on visibility change (some browsers suspend hidden tabs)
    const onVis = () => { if (document.visibilityState === "visible") tryPlay(); };
    document.addEventListener("visibilitychange", onVis);

    // Cycle "active" indicator dots in sync with video time (every ~6.5s)
    const dotTimer = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 6500);

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

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointerdown", onFirstInteract);
      clearTimeout(t1); clearTimeout(t2);
      clearInterval(dotTimer);
    };
  }, []);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-rihara-walnut" data-testid="hero-slideshow">
      {/* Background video — autoplay, muted, loop */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero-video.mp4"
        poster="/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        data-testid="hero-video"
      />

      {/* Warm cinematic overlay — lighter so the video reads clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-rihara-walnut/25 via-rihara-walnut/10 to-rihara-walnut/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,20,16,0.35)_0%,_transparent_55%,_rgba(26,20,16,0.5)_100%)]" />
      <div className="absolute inset-0 grain pointer-events-none opacity-50" />

      {/* Brand overlay */}
      <div ref={overlayRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="hero-fade flex items-center gap-4 mb-6">
          <span className="h-px w-12 sm:w-16 bg-rihara-gold/70" />
          <span className="font-body text-[10px] sm:text-[11px] tracking-[0.42em] uppercase text-rihara-gold">
            Architects &amp; Interiors · Est. India
          </span>
          <span className="h-px w-12 sm:w-16 bg-rihara-gold/70" />
        </div>

        <h1 className="hero-fade font-display text-rihara-ivory text-[16vw] sm:text-[11vw] lg:text-[9vw] leading-[0.92] tracking-[-0.02em] font-light" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.55), 0 0 60px rgba(0,0,0,0.35)" }}>
          Rihara <em className="italic text-rihara-gold/95">Interior</em>
        </h1>

        <p className="hero-fade font-display italic text-rihara-ivory/95 text-2xl sm:text-3xl lg:text-4xl mt-5" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.55)" }}>
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
