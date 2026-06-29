import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { Toaster } from "./components/ui/sonner";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import OurWork from "./pages/OurWork";
import ServicesPage from "./pages/ServicesPage";
import Process from "./pages/Process";
import AboutUs from "./pages/AboutUs";

gsap.registerPlugin(ScrollTrigger);

// Smooth scroll wrapper using Lenis
const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  return children;
};

const RouteHandler = () => {
  const location = useLocation();
  const [introRevealed, setIntroRevealed] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        setIntroRevealed(sessionStorage.getItem("rihara-intro-seen") === "1");
      } catch {
        setIntroRevealed(true);
      }
    };
    check();
    const i = setInterval(check, 400);
    return () => clearInterval(i);
  }, []);

  const isFirstRouteRender = useRef(true);
  useEffect(() => {
    // Skip on the very first render — components are still establishing their
    // ScrollTriggers and killing them here would leave fromTo() styles stuck.
    // Only kill on actual route TRANSITIONS so React can safely unmount
    // nodes that GSAP may have wrapped (pin-spacer, etc.).
    if (!isFirstRouteRender.current) {
      try { ScrollTrigger.getAll().forEach((t) => t.kill()); } catch { /* no-op */ }
    }
    isFirstRouteRender.current = false;

    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    } else if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    setTimeout(() => ScrollTrigger.refresh(), 600);
  }, [location.pathname, location.hash]);

  return (
    <>
      <Nav revealed={location.pathname !== "/" || introRevealed} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/process" element={<Process />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<OurWork />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <div className="bg-rihara-ivory text-rihara-walnut min-h-screen">
          <RouteHandler />
          <Toaster
            theme="light"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#FBF6EE",
                color: "#1A1410",
                border: "1px solid rgba(166,134,73,0.4)",
                fontFamily: "'DM Sans', sans-serif",
              },
            }}
          />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
};

export default App;
