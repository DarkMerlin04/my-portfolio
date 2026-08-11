"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Shapes() {
  const group = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    const geometries = [
      new THREE.IcosahedronGeometry(0.6, 0),
      new THREE.TorusGeometry(0.5, 0.2, 16, 32),
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.TorusKnotGeometry(0.4, 0.15, 64, 8),
    ];

    return geometries.map((geo, i) => ({
      geometry: geo,
      position: [
        (i - 1.5) * 2.2 + (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 2 - 1,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      speed: 0.3 + Math.random() * 0.4,
      color: [
        "#6366f1",
        "#8b5cf6",
        "#06b6d4",
        "#a78bfa",
      ][i],
    }));
  }, []);

  useFrame(({ pointer }) => {
    if (group.current) {
      group.current.rotation.x += (pointer.y * 0.02 - group.current.rotation.x) * 0.02;
      group.current.rotation.y += (pointer.x * 0.02 - group.current.rotation.y) * 0.02;
    }
  });

  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={shape.speed} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh geometry={shape.geometry} position={shape.position} rotation={shape.rotation}>
            <MeshDistortMaterial
              color={shape.color}
              transparent
              opacity={0.6}
              wireframe
              distort={0.1}
              speed={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function FloatingShapes() {
  useEffect(() => {
    const orig = console.warn;
    console.warn = (...args: any[]) => {
      if (args[0]?.includes?.("THREE.Clock")) return;
      orig(...args);
    };
    return () => { console.warn = orig; };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="pointer-events-none"
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Shapes />
    </Canvas>
  );
}
