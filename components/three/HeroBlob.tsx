"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type BlobProps = {
  reduced: boolean;
  /** Rises briefly on click, then decays — the "scatter" reaction. */
  onSettled: () => void;
  onStrike: (e: ThreeEvent<PointerEvent>) => void;
  impulse: number;
};

function Blob({ reduced, impulse, onSettled, onStrike }: BlobProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<{ distort: number; speed: number }>(null);
  // Eased pointer target, so the object never snaps to raw pointer values.
  const target = useRef({ x: 0, y: 0 });
  const energy = useRef(0);

  useFrame((state, delta) => {
    const node = mesh.current;
    if (!node) return;

    if (reduced) {
      node.rotation.set(0.25, 0.4, 0);
      node.position.y = 0;
      if (material.current) {
        material.current.distort = 0.4;
        material.current.speed = 0;
      }
      return;
    }

    const t = state.clock.elapsedTime;

    // Pointer parallax: viewport-normalised pointer, damped toward.
    target.current.x = THREE.MathUtils.damp(target.current.x, state.pointer.y * 0.35, 3, delta);
    target.current.y = THREE.MathUtils.damp(target.current.y, state.pointer.x * 0.5, 3, delta);

    node.rotation.x = target.current.x + Math.sin(t * 0.18) * 0.12;
    node.rotation.y = target.current.y + t * 0.14;
    node.position.y = Math.sin(t * 0.6) * 0.12;

    // Click impulse decays back to the resting distortion.
    const decayed = THREE.MathUtils.damp(energy.current, impulse, 2.2, delta);
    energy.current = decayed;
    if (decayed < 0.02 && impulse > 0) onSettled();

    if (material.current) {
      material.current.distort = 0.42 + decayed * 0.5;
      material.current.speed = 1.1 + decayed * 4;
    }
  });

  return (
    <mesh ref={mesh} scale={1.35} onPointerDown={onStrike}>
      <icosahedronGeometry args={[1, 12]} />
      <MeshDistortMaterial
        // drei's material instance exposes distort/speed as mutable fields.
        ref={material as never}
        // The object *is* the accent: a gold glass form against the teal
        // ground, rather than a teal form that disappears into it.
        color="#E8A62B"
        // Metalness stays low on purpose: there is no environment map in this
        // scene (an HDR download would cost more than the effect is worth), and
        // a near-metal material with nothing to reflect renders black.
        roughness={0.28}
        metalness={0.25}
        emissive="#7A4A05"
        emissiveIntensity={0.35}
        distort={0.42}
        speed={1.1}
      />
    </mesh>
  );
}

function Loader() {
  return (
    <Html center>
      <span className="block h-9 w-9 animate-spin rounded-full border-2 border-line-soft border-t-amber" />
      <span className="sr-only">Loading 3D scene</span>
    </Html>
  );
}

export default function HeroBlob({ reduced }: { reduced: boolean }) {
  const [impulse, setImpulse] = useState(0);

  const strike = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setImpulse(1);
  };

  return (
    <Canvas
      // Capped DPR: uncapped retina rendering is what kills WebGL on phones.
      dpr={[1, 1.5]}
      // No shadow maps anywhere in this scene.
      shadows={false}
      frameloop={reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      // Keep vertical page scrolling working when a touch starts on the canvas.
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.9} />
      {/* Warm key, so the gold surface stays lit and saturated. */}
      <directionalLight position={[3, 2.5, 4]} intensity={3.2} color="#FFD489" />
      {/* Teal rim from behind-left, separating the form from the ground. */}
      <directionalLight position={[-4, -1, -3]} intensity={3} color="#4FD8C6" />
      <pointLight position={[1.4, 1.8, 2.6]} intensity={6} distance={10} color="#FFFFFF" />
      <Suspense fallback={<Loader />}>
        <Blob
          reduced={reduced}
          impulse={impulse}
          onStrike={strike}
          onSettled={() => setImpulse(0)}
        />
      </Suspense>
    </Canvas>
  );
}
