import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

const DoorIntro = ({ onEnter }) => {
  const stageRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const glowRef = useRef(null);
  const wedgeRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const logoRef = useRef(null);
  const [opening, setOpening] = useState(false);
  const [exited, setExited] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, { opacity: 0, y: 14, duration: 1.4, ease: "power3.out" });
      gsap.from(taglineRef.current, { opacity: 0, y: 12, duration: 1.4, delay: 0.7, ease: "power3.out" });
      gsap.from(ctaRef.current, { opacity: 0, y: 12, duration: 1.2, delay: 1.2, ease: "power3.out" });
    }, stageRef);
    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    if (opening) return;
    setOpening(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setExited(true);
        onEnter?.();
      },
    });
    tl.to([taglineRef.current, ctaRef.current], { opacity: 0, y: -10, duration: 0.45, ease: "power2.in" }, 0);
    tl.to(logoRef.current, { opacity: 0, y: -10, duration: 0.6, ease: "power2.in" }, 0.1);
    tl.to(glowRef.current, { opacity: 1, duration: 1.4, ease: "power2.out" }, 0.0);
    tl.to(wedgeRef.current, { opacity: 1, duration: 1.6, ease: "power2.out" }, 0.1);
    tl.to(leftRef.current, { rotateY: -88, duration: 2.4, ease: "power3.inOut" }, 0.2);
    tl.to(rightRef.current, { rotateY: 88, duration: 2.4, ease: "power3.inOut" }, 0.2);
    tl.to(stageRef.current, { opacity: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.4");
  };

  if (exited) return null;

  return (
    <div ref={stageRef} className="door-stage" data-testid="door-intro">
      <div ref={glowRef} className="door-glow" />
      <div ref={wedgeRef} className="light-wedge" />

      {/* Logo + tagline above door */}
      <div className="absolute top-[10vh] left-1/2 -translate-x-1/2 z-10 text-center px-6">
        <div ref={logoRef} data-testid="door-intro-logo" className="font-display text-rihara-ivory text-5xl sm:text-6xl tracking-tight">
          rihara
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-rihara-gold/70" />
            <span className="font-body text-[10px] tracking-[0.42em] uppercase text-rihara-gold">Architects &amp; Interiors</span>
            <span className="h-px w-10 bg-rihara-gold/70" />
          </div>
        </div>
      </div>

      {/* Door frame */}
      <div className="door-frame">
        <div ref={leftRef} className="door-panel left">
          <div className="door-handle" />
        </div>
        <div ref={rightRef} className="door-panel right">
          <div className="door-handle" />
        </div>
      </div>

      {/* Tagline + CTA */}
      <div className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 z-10 text-center px-6">
        <p ref={taglineRef} className="font-display italic text-rihara-ivory/90 text-2xl sm:text-3xl mb-7">
          Where Spaces Tell Stories
        </p>
        <button
          ref={ctaRef}
          data-testid="enter-home-btn"
          onClick={handleEnter}
          className="group inline-flex items-center gap-3 px-8 py-4 border border-rihara-gold/70 text-rihara-gold uppercase tracking-[0.32em] text-xs hover:bg-rihara-gold hover:text-rihara-walnut transition-colors duration-500"
        >
          Enter Home
          <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default DoorIntro;
