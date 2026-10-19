"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingParticles({ count = 75 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.05;
      points.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CoreSculpture() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    // Subtle rotation and mouse parallax
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;

    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetY + 0.1,
      0.05
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetX * 0.5,
      0.05
    );

    wireframeRef.current.rotation.y -= delta * 0.15;
    wireframeRef.current.rotation.x += delta * 0.1;
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Core Organic Shaded Geometry */}
        <mesh ref={meshRef} scale={1.8}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshDistortMaterial
            color="#171B3A"
            emissive="#3B82F6"
            emissiveIntensity={0.25}
            roughness={0.2}
            metalness={0.8}
            distort={0.35}
            speed={2}
          />
        </mesh>

        {/* Outer Orbiting Wireframe Cage */}
        <mesh ref={wireframeRef} scale={2.4}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#8B5CF6"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-85">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        {/* Royal Blue light */}
        <pointLight position={[6, 4, 3]} color="#3B82F6" intensity={4} distance={15} />
        {/* Hyacinth Purple accent light */}
        <pointLight position={[-6, -4, 2]} color="#8B5CF6" intensity={5} distance={15} />
        {/* Subtle top rim light */}
        <directionalLight position={[0, 8, 4]} color="#FFFFFF" intensity={0.5} />

        <CoreSculpture />
        <FloatingParticles count={60} />
      </Canvas>
    </div>
  );
}
