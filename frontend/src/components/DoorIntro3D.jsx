import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ArrowRight } from "lucide-react";

/* =========================================================================
   3D Wooden Double Door  (procedural — no external textures, fast load)
   ========================================================================= */

// Wood material with procedural grain via canvas
const useWoodMaterial = () => {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 1024;
    const ctx = c.getContext("2d");
    // Base
    const g = ctx.createLinearGradient(0, 0, 0, 1024);
    g.addColorStop(0, "#5a3a22");
    g.addColorStop(0.5, "#3a2415");
    g.addColorStop(1, "#2d1c0f");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 1024);
    // Vertical grain lines
    for (let i = 0; i < 240; i++) {
      const x = Math.random() * 512;
      const w = 0.5 + Math.random() * 1.8;
      const alpha = 0.06 + Math.random() * 0.18;
      ctx.fillStyle = `rgba(20,12,5,${alpha})`;
      ctx.fillRect(x, 0, w, 1024);
    }
    // Subtle highlights
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 512;
      ctx.fillStyle = `rgba(140,98,60,${0.04 + Math.random() * 0.08})`;
      ctx.fillRect(x, 0, 0.8, 1024);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 8;
    return new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.65,
      metalness: 0.1,
      color: new THREE.Color("#6a4426"),
    });
  }, []);
};

const DoorPanel = ({ side = "left", openProgress, woodMat }) => {
  const groupRef = useRef(null);

  // open progress 0..1
  useFrame(() => {
    if (!groupRef.current) return;
    const sign = side === "left" ? -1 : 1;
    const target = openProgress.current * (Math.PI / 2.05) * sign;
    groupRef.current.rotation.y += (target - groupRef.current.rotation.y) * 0.08;
  });

  // Pivot is at the outer edge (hinge)
  const pivotX = side === "left" ? -1.0 : 1.0;
  const handleX = side === "left" ? 0.85 : -0.85;

  return (
    <group ref={groupRef} position={[pivotX, 0, 0]}>
      <group position={[-pivotX, 0, 0]}>
        {/* Main door slab */}
        <mesh material={woodMat} castShadow receiveShadow>
          <boxGeometry args={[2.0, 4.4, 0.12]} />
        </mesh>
        {/* Inset panels (top & bottom) — slight depth */}
        <mesh position={[0, 1.05, 0.066]} material={woodMat}>
          <boxGeometry args={[1.45, 1.6, 0.025]} />
        </mesh>
        <mesh position={[0, -1.05, 0.066]} material={woodMat}>
          <boxGeometry args={[1.45, 1.6, 0.025]} />
        </mesh>
        {/* Gold inset frame lines */}
        {[1.05, -1.05].map((y) => (
          <lineSegments key={y} position={[0, y, 0.08]}>
            <edgesGeometry args={[new THREE.BoxGeometry(1.45, 1.6, 0.001)]} />
            <lineBasicMaterial color="#c9a96e" />
          </lineSegments>
        ))}
        {/* Handle */}
        <mesh position={[handleX, 0, 0.085]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.55, 16]} />
          <meshStandardMaterial color="#d4b070" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[handleX, 0, 0.14]} castShadow>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial color="#e6c98a" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

const DoorFrame = () => {
  // Frame around the doors (warm dark wood)
  const frameMat = (
    <meshStandardMaterial color="#2a1a0c" roughness={0.75} metalness={0.05} />
  );
  return (
    <group>
      {/* Top */}
      <mesh position={[0, 2.35, 0]}>
        <boxGeometry args={[4.6, 0.3, 0.5]} />
        {frameMat}
      </mesh>
      {/* Bottom (threshold) */}
      <mesh position={[0, -2.25, 0]}>
        <boxGeometry args={[4.6, 0.1, 0.5]} />
        {frameMat}
      </mesh>
      {/* Left */}
      <mesh position={[-2.15, 0, 0]}>
        <boxGeometry args={[0.3, 4.7, 0.5]} />
        {frameMat}
      </mesh>
      {/* Right */}
      <mesh position={[2.15, 0, 0]}>
        <boxGeometry args={[0.3, 4.7, 0.5]} />
        {frameMat}
      </mesh>
      {/* Subtle gold inlay strip */}
      <mesh position={[0, 2.16, 0.26]}>
        <boxGeometry args={[4.3, 0.025, 0.01]} />
        <meshStandardMaterial color="#c9a96e" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

// Warm light behind doors that intensifies as they open
const Hallway = ({ openProgress }) => {
  const lightRef = useRef(null);
  const planeRef = useRef(null);

  useFrame(() => {
    const t = openProgress.current;
    if (lightRef.current) lightRef.current.intensity = 0.4 + t * 6.2;
    if (planeRef.current) planeRef.current.material.opacity = t * 0.95;
  });

  return (
    <>
      {/* Floor/wall hint inside */}
      <mesh ref={planeRef} position={[0, 0, -2.5]}>
        <planeGeometry args={[6, 4.6]} />
        <meshBasicMaterial color="#f0d8a4" transparent opacity={0} />
      </mesh>
      <pointLight ref={lightRef} position={[0, 0.3, -1.8]} color="#ffd9a0" intensity={0.4} distance={9} decay={1.4} />
    </>
  );
};

const Scene = ({ openProgress }) => {
  const woodMat = useWoodMaterial();
  const camRef = useRef(null);
  const { camera } = useThree();

  useFrame((state) => {
    const t = openProgress.current;
    // gentle camera dolly + slight breathing
    const z = 6.2 - t * 2.4;
    const y = 0.04 * Math.sin(state.clock.elapsedTime * 0.6);
    camera.position.lerp(new THREE.Vector3(0, y, z), 0.06);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={camRef}>
      {/* Ambient warm wash */}
      <ambientLight intensity={0.35} color="#3a2515" />
      {/* Key rim light from upper-right */}
      <directionalLight position={[3, 4, 5]} intensity={0.7} color="#f3d6a4" castShadow />
      <directionalLight position={[-4, -2, 3]} intensity={0.25} color="#a86c3a" />

      <DoorFrame />
      <Hallway openProgress={openProgress} />
      <DoorPanel side="left" openProgress={openProgress} woodMat={woodMat} />
      <DoorPanel side="right" openProgress={openProgress} woodMat={woodMat} />
    </group>
  );
};

/* =========================================================================
   Component
   ========================================================================= */
const DoorIntro3D = ({ onEnter }) => {
  const stageRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const logoRef = useRef(null);
  const openProgress = useRef(0);
  const [opening, setOpening] = useState(false);
  const [exited, setExited] = useState(false);

  useEffect(() => {
    // Fade in elements
    const els = [logoRef.current, taglineRef.current, ctaRef.current].filter(Boolean);
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition = "opacity 1.4s ease, transform 1.4s ease";
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 150 + i * 450);
    });
  }, []);

  const handleEnter = () => {
    if (opening) return;
    setOpening(true);

    // Animate open progress from 0 → 1 over ~2.2s
    const start = performance.now();
    const dur = 2200;
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      // ease in-out cubic
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      openProgress.current = e;
      if (t < 1) requestAnimationFrame(step);
      else {
        setTimeout(() => {
          if (stageRef.current) {
            stageRef.current.style.transition = "opacity 0.9s ease";
            stageRef.current.style.opacity = "0";
          }
          setTimeout(() => {
            setExited(true);
            onEnter?.();
          }, 900);
        }, 300);
      }
    };
    requestAnimationFrame(step);

    // Fade UI out
    [taglineRef.current, ctaRef.current, logoRef.current].forEach((el) => {
      if (!el) return;
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(-12px)";
    });
  };

  if (exited) return null;

  return (
    <div ref={stageRef} className="door-stage" data-testid="door-intro">
      {/* Three.js Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.2], fov: 36, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <fog attach="fog" args={["#1A1410", 7, 14]} />
        <Suspense fallback={null}>
          <Scene openProgress={openProgress} />
        </Suspense>
      </Canvas>

      {/* Overlay vignette + glow */}
      <div className="door-glow" style={{ opacity: 0.35 }} />

      {/* Logo + tagline above door */}
      <div className="absolute top-[8vh] left-1/2 -translate-x-1/2 z-10 text-center px-6 pointer-events-none">
        <div ref={logoRef} data-testid="door-intro-logo" className="font-display text-rihara-ivory text-5xl sm:text-6xl tracking-tight">
          rihara
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-rihara-gold/70" />
            <span className="font-body text-[10px] tracking-[0.42em] uppercase text-rihara-gold">Architects &amp; Interiors</span>
            <span className="h-px w-10 bg-rihara-gold/70" />
          </div>
        </div>
      </div>

      {/* Tagline + CTA */}
      <div className="absolute bottom-[7vh] left-1/2 -translate-x-1/2 z-10 text-center px-6">
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

export default DoorIntro3D;
