import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

/* A slowly-rotating 3D brass pendant lamp — signature object for the hero. */

const Pendant = () => {
  const groupRef = useRef(null);
  const swingRef = useRef(null);

  // Brass material
  const brass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c9a96e",
        metalness: 0.95,
        roughness: 0.25,
        envMapIntensity: 1.2,
      }),
    []
  );
  const brassDark = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8a6a3e",
        metalness: 0.9,
        roughness: 0.35,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35;
    }
    if (swingRef.current) {
      swingRef.current.rotation.z = Math.sin(t * 0.6) * 0.07;
      swingRef.current.rotation.x = Math.sin(t * 0.45) * 0.04;
    }
  });

  return (
    <group ref={swingRef}>
      {/* Hanging cable */}
      <mesh position={[0, 1.85, 0]} material={brassDark}>
        <cylinderGeometry args={[0.018, 0.018, 2.0, 8]} />
      </mesh>
      {/* Ceiling cap */}
      <mesh position={[0, 2.85, 0]} material={brass}>
        <cylinderGeometry args={[0.18, 0.13, 0.08, 24]} />
      </mesh>

      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Pendant dome */}
        <mesh material={brass} castShadow>
          <coneGeometry args={[0.95, 1.0, 36, 1, true]} />
        </mesh>
        {/* Inner shade glow */}
        <mesh position={[0, -0.32, 0]}>
          <coneGeometry args={[0.85, 0.85, 36, 1, true]} />
          <meshBasicMaterial color="#fff0c8" side={THREE.BackSide} />
        </mesh>
        {/* Light bulb */}
        <mesh position={[0, -0.45, 0]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshBasicMaterial color="#ffe5b0" />
        </mesh>
        <pointLight position={[0, -0.4, 0]} intensity={1.4} color="#ffd49a" distance={5} decay={1.5} />

        {/* Brass rim ring */}
        <mesh position={[0, -0.5, 0]} material={brass}>
          <torusGeometry args={[0.95, 0.03, 12, 48]} />
        </mesh>
        {/* Top decorative ring */}
        <mesh position={[0, 0.5, 0]} material={brass}>
          <torusGeometry args={[0.18, 0.04, 10, 32]} />
        </mesh>
      </group>
    </group>
  );
};

const HeroPendant3D = () => {
  return (
    <div className="w-full h-full" data-testid="hero-pendant-3d">
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ position: [0, 0.2, 4.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft warm key */}
        <ambientLight intensity={0.42} color="#fff0d8" />
        <directionalLight position={[2.5, 4, 3]} intensity={0.85} color="#fff2d4" />
        <directionalLight position={[-3, 1, 2]} intensity={0.3} color="#c9a96e" />
        <Suspense fallback={null}>
          <Pendant />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroPendant3D;
