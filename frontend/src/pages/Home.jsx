import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import DoorIntro from "../components/DoorIntro3D";
import HeroSlideshow from "../components/HeroSlideshow";
import FocusCarousel from "../components/FocusCarousel";
import FullscreenCarousel from "../components/FullscreenCarousel";
import ServicesGrid from "../components/ServicesGrid";
import GallerySection from "../components/GallerySection";
import ContactSection from "../components/ContactSection";

const Marquee = () => (
  <div className="bg-rihara-walnut py-6 overflow-hidden border-y border-rihara-gold/15">
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
        <div className="mt-9 flex items-center gap-4">
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
      <HeroSlideshow />
      <FocusCarousel />
      <FullscreenCarousel />
      <Manifesto />
      <Marquee />
      <ServicesGrid />
      <GallerySection />
      <ContactSection />
    </>
  );
};

export default Home;
