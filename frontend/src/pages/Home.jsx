import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import DoorIntro from "../components/DoorIntro3D";
import HeroPendant3D from "../components/HeroPendant3D";
import RoomJourney from "../components/RoomJourney";
import ServicesGrid from "../components/ServicesGrid";
import GallerySection from "../components/GallerySection";
import ContactSection from "../components/ContactSection";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", { y: 40, opacity: 0, duration: 1.4, stagger: 0.14, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100vh] overflow-hidden bg-rihara-ivory" data-testid="hero-section">
      {/* Side-by-side editorial hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[100vh] pt-24 lg:pt-0">
        {/* Text column */}
        <div className="lg:col-span-6 px-6 lg:px-16 flex items-center py-16 lg:py-0 relative">
          <div className="max-w-xl">
            <div className="hero-anim flex items-center gap-3 mb-6">
              <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">Est. Studio · India</span>
              <span className="h-px w-12 bg-rihara-walnut/30" />
            </div>
            <h1 className="hero-anim font-display text-rihara-walnut text-[14vw] sm:text-[10vw] lg:text-[7.5vw] leading-[0.92] tracking-[-0.02em] font-light">
              Where spaces
              <br />
              <em className="italic text-rihara-gold-deep font-display">tell stories.</em>
            </h1>
            <p className="hero-anim font-body text-rihara-walnut/70 text-base lg:text-lg max-w-md mt-7 leading-relaxed">
              Rihara is an architecture &amp; interiors studio composing residences in walnut, brass, linen and light — engineered for the way you actually live.
            </p>
            <div className="hero-anim flex flex-wrap items-center gap-5 mt-9">
              <a href="#journey" data-testid="hero-cta-journey" className="group inline-flex items-center gap-3 bg-rihara-walnut text-rihara-ivory px-7 py-4 uppercase tracking-[0.32em] text-xs font-medium hover:bg-rihara-gold-deep transition-colors">
                Begin the Journey
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <Link to="/our-work" data-testid="hero-cta-work" className="group inline-flex items-center gap-3 text-rihara-walnut border-b border-rihara-walnut/30 pb-2 uppercase tracking-[0.32em] text-xs hover:border-rihara-gold-deep hover:text-rihara-gold-deep transition-colors">
                View Our Work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="hero-anim hidden lg:flex items-center gap-6 mt-16">
              <div className="border-l border-rihara-walnut/20 pl-4">
                <div className="font-display text-3xl text-rihara-walnut leading-none">12+</div>
                <div className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-walnut/60 mt-1">Years</div>
              </div>
              <div className="border-l border-rihara-walnut/20 pl-4">
                <div className="font-display text-3xl text-rihara-walnut leading-none">80</div>
                <div className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-walnut/60 mt-1">Homes</div>
              </div>
              <div className="border-l border-rihara-walnut/20 pl-4">
                <div className="font-display text-3xl text-rihara-walnut leading-none">14</div>
                <div className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-walnut/60 mt-1">Cities</div>
              </div>
            </div>
          </div>

          {/* Bottom scroll indicator */}
          <div className="absolute bottom-6 left-6 lg:left-16 flex items-center gap-4 text-rihara-walnut/55">
            <span className="font-body text-[10px] uppercase tracking-[0.42em]">Scroll · Six Rooms</span>
            <span className="block w-12 h-px bg-rihara-walnut/30" />
          </div>
        </div>

        {/* Image column */}
        <div className="hero-anim lg:col-span-6 relative min-h-[60vh] lg:min-h-screen">
          <img src="/interiors/img5.jpeg" alt="Rihara Living Room" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-rihara-ivory/40 via-transparent to-transparent lg:from-rihara-ivory/30" />
          <div className="absolute inset-0 grain pointer-events-none" />

          {/* 3D Brass Pendant Lamp — signature object */}
          <div className="absolute top-0 right-0 w-[44%] h-[60%] pointer-events-none z-10" data-testid="hero-3d-pendant">
            <HeroPendant3D />
          </div>

          {/* Floating mood thumbnail */}
          <div className="hidden lg:block absolute bottom-12 left-[-60px] w-52 h-72 overflow-hidden bg-rihara-cream shadow-2xl ring-1 ring-rihara-walnut/15 z-20">
            <img src="/interiors/img2.jpeg" alt="" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-rihara-ivory/95 backdrop-blur">
              <p className="font-body text-[9px] uppercase tracking-[0.32em] text-rihara-gold-deep">Kitchen · 04</p>
              <p className="font-display text-rihara-walnut text-base mt-0.5">Open Sky Kitchen</p>
            </div>
          </div>

          {/* Caption tag */}
          <div className="absolute top-6 right-6 bg-rihara-ivory/90 backdrop-blur px-3 py-1.5 z-20">
            <p className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-walnut">The Mehta Residence · Pune</p>
          </div>

          {/* 3D label badge */}
          <div className="absolute bottom-6 right-6 bg-rihara-walnut/85 backdrop-blur px-3 py-1.5 z-20 flex items-center gap-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-rihara-gold animate-pulse" />
            <p className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold">3D · Live</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => (
  <div className="bg-rihara-walnut py-6 overflow-hidden">
    <div className="marquee-track inline-flex whitespace-nowrap font-display italic text-3xl sm:text-4xl text-rihara-ivory/90">
      {[...Array(2)].map((_, k) => (
        <div key={k} className="flex items-center gap-12 pr-12">
          <span>Walnut</span><span className="text-rihara-gold">·</span>
          <span>Brass</span><span className="text-rihara-gold">·</span>
          <span>Linen</span><span className="text-rihara-gold">·</span>
          <span>Stone</span><span className="text-rihara-gold">·</span>
          <span>Oak</span><span className="text-rihara-gold">·</span>
          <span>Bronze</span><span className="text-rihara-gold">·</span>
          <span>Ivory</span><span className="text-rihara-gold">·</span>
        </div>
      ))}
    </div>
  </div>
);

const Manifesto = () => (
  <section className="bg-rihara-cream py-32 relative" data-testid="manifesto-section">
    <div className="max-w-[1240px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-10 lg:gap-14 items-center">
      <div className="col-span-12 lg:col-span-6">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden">
            <img src="/interiors/img9.jpeg" alt="Studio interior" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-5 -left-5 right-5 bottom-5 border border-rihara-gold-deep/40 -z-10" />
          {/* Small detail */}
          <div className="hidden md:block absolute -bottom-12 -right-10 w-44 h-56 overflow-hidden bg-rihara-cream shadow-2xl ring-1 ring-rihara-walnut/10">
            <img src="/interiors/img10.jpeg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 lg:pl-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">A Quiet Manifesto</span>
          <span className="h-px w-12 bg-rihara-walnut/30" />
        </div>
        <h2 className="font-display text-rihara-walnut text-5xl sm:text-6xl tracking-tight leading-[1.02] font-light">
          We design rooms
          <br />
          <span className="italic text-rihara-gold-deep">that age well.</span>
        </h2>
        <p className="font-body text-rihara-walnut/75 text-base lg:text-lg leading-relaxed mt-7">
          Trends are loud. Homes should be quiet. We compose interiors that hold up to a decade of mornings — palettes that deepen with use, joinery that closes with a hush, lighting that flatters at every hour.
        </p>
        <Link to="/process" className="mt-8 inline-flex items-center gap-3 font-body uppercase text-xs tracking-[0.32em] text-rihara-walnut border-b border-rihara-walnut/30 pb-2 hover:border-rihara-gold-deep hover:text-rihara-gold-deep transition-colors">
          See Our Process <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

const Home = () => {
  const initialSeen = (() => {
    try { return sessionStorage.getItem("rihara-intro-seen") === "1"; } catch { return false; }
  })();
  const [intro, setIntro] = useState(!initialSeen);

  useEffect(() => {
    if (intro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [intro]);

  const handleEnter = () => {
    try { sessionStorage.setItem("rihara-intro-seen", "1"); } catch { /* ignore */ }
    setIntro(false);
  };

  return (
    <>
      {intro && <DoorIntro onEnter={handleEnter} />}
      <Hero />
      <Marquee />
      <RoomJourney />
      <Manifesto />
      <ServicesGrid />
      <GallerySection />
      <ContactSection />
    </>
  );
};

export default Home;
