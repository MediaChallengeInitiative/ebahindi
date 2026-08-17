"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Wire({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y += delta * 0.25;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.25;
  });

  return (
    <mesh ref={mesh} rotation={[0.3, 0.4, 0]} scale={1.15}>
      {/* Low detail on purpose — this is a small decorative cell, not the hero. */}
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#FFAE00" wireframe transparent opacity={0.55} />
    </mesh>
  );
}

/** Small second canvas for the skills bento. No lights, no shadows, low poly. */
export default function WireframeWidget({ reduced }: { reduced: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      shadows={false}
      // Static geometry when motion is reduced: render once, then stop.
      frameloop={reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <Wire reduced={reduced} />
    </Canvas>
  );
}
