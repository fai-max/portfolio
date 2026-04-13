"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Merge multiple BufferGeometries into one                          */
/* ------------------------------------------------------------------ */

function mergeGeometries(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  let offset = 0;

  for (const geo of geos) {
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    const norm = geo.getAttribute("normal") as THREE.BufferAttribute;
    const idx = geo.getIndex();

    for (let i = 0; i < pos.count; i++) {
      positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
      if (norm) normals.push(norm.getX(i), norm.getY(i), norm.getZ(i));
    }
    if (idx) {
      for (let i = 0; i < idx.count; i++) indices.push(idx.array[i] + offset);
    }
    offset += pos.count;
  }

  const merged = new THREE.BufferGeometry();
  merged.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  if (normals.length) merged.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  if (indices.length) merged.setIndex(indices);
  return merged;
}

/* ------------------------------------------------------------------ */
/*  Photorealistic interactive capsule pill                           */
/* ------------------------------------------------------------------ */

interface PillProps {
  position: [number, number, number];
  colorTop: string;
  colorBottom: string;
  glowColor: string;
  isHovered: boolean;
  isDimmed: boolean;
  isChosen: boolean;
  isRejected: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}

function InteractivePill({
  position,
  colorTop,
  colorBottom,
  glowColor,
  isHovered,
  isDimmed,
  isChosen,
  isRejected,
  onClick,
  onPointerOver,
  onPointerOut,
}: PillProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const topMatRef = useRef<THREE.MeshPhysicalMaterial>(null!);
  const bottomMatRef = useRef<THREE.MeshPhysicalMaterial>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const scaleVal = useRef(1);
  const opacityVal = useRef(1);
  const baseY = position[1];

  const { topGeo, bottomGeo } = useMemo(() => {
    const r = 0.13;
    const h = 0.2;
    const s = 48;
    const rn = 24;

    const tS = new THREE.SphereGeometry(r, s, rn, 0, Math.PI * 2, 0, Math.PI / 2);
    tS.translate(0, h, 0);
    const tC = new THREE.CylinderGeometry(r, r, h, s, 1, true);
    tC.translate(0, h / 2, 0);

    const bS = new THREE.SphereGeometry(r, s, rn, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    bS.translate(0, -h, 0);
    const bC = new THREE.CylinderGeometry(r, r, h, s, 1, true);
    bC.translate(0, -h / 2, 0);

    return {
      topGeo: mergeGeometries([tS, tC]),
      bottomGeo: mergeGeometries([bS, bC]),
    };
  }, []);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;

    // ── Choosing animation ──
    if (isChosen) {
      scaleVal.current = THREE.MathUtils.lerp(scaleVal.current, 1.8, delta * 3);
      g.rotation.y += delta * 2;
    } else if (isRejected) {
      scaleVal.current = THREE.MathUtils.lerp(scaleVal.current, 0.2, delta * 5);
      opacityVal.current = THREE.MathUtils.lerp(opacityVal.current, 0, delta * 6);
    } else {
      // ── Idle state ──
      g.rotation.y += delta * 0.3;
      const t = performance.now() * 0.001;
      g.position.y = baseY + Math.sin(t * 1.0) * 0.02;
    }

    g.scale.setScalar(scaleVal.current);

    // ── Material updates ──
    const targetEmissive = isChosen ? 0.5 : isHovered ? 0.35 : isDimmed ? 0.02 : 0.1;
    const opc = isRejected ? opacityVal.current : 1;

    for (const mat of [topMatRef.current, bottomMatRef.current]) {
      if (!mat) continue;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, delta * 5);
      mat.opacity = opc;
      mat.transparent = opc < 1;
    }

    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        isChosen ? 3.0 : isHovered ? 1.8 : isDimmed ? 0.15 : 0.8,
        delta * 4,
      );
    }
  });

  const physicalMat = {
    metalness: 0.02,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    envMapIntensity: 1.5,
    reflectivity: 0.95,
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <group ref={groupRef} position={position}>
      <mesh geometry={topGeo} onClick={handleClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
        <meshPhysicalMaterial ref={topMatRef} color={colorTop} emissive={colorTop} emissiveIntensity={0.1} {...physicalMat} />
      </mesh>

      <mesh geometry={bottomGeo} onClick={handleClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
        <meshPhysicalMaterial ref={bottomMatRef} color={colorBottom} emissive={colorBottom} emissiveIntensity={0.1} {...physicalMat} />
      </mesh>

      {/* Seam ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.126, 0.133, 48]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Glow underneath */}
      <pointLight ref={lightRef} position={[0, -0.4, 0.3]} color={glowColor} intensity={0.8} distance={2} decay={2} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene – both pills in a single transparent overlay                */
/* ------------------------------------------------------------------ */

interface PillChoiceOverlayProps {
  hovered: "tech" | "creative" | null;
  choosing: "tech" | "creative" | null;
  onHover: (side: "tech" | "creative" | null) => void;
  onSelect: (side: "tech" | "creative") => void;
}

function Scene({ hovered, choosing, onHover, onSelect }: PillChoiceOverlayProps) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 4, 3]} intensity={1.2} />
      <directionalLight position={[-1.5, 2, 2]} intensity={0.3} color="#aabbff" />
      <pointLight position={[0, 1, 2]} intensity={0.15} color="#ffffff" />

      {/* Blue pill – left hand */}
      <InteractivePill
        position={[-0.82, -0.68, 0]}
        colorTop="#2a50d0"
        colorBottom="#10205a"
        glowColor="#3050ff"
        isHovered={hovered === "tech"}
        isDimmed={hovered === "creative"}
        isChosen={choosing === "tech"}
        isRejected={choosing === "creative"}
        onClick={() => { if (!choosing) onSelect("tech"); }}
        onPointerOver={() => { if (!choosing) { onHover("tech"); document.body.style.cursor = "pointer"; } }}
        onPointerOut={() => { if (!choosing) { onHover(null); document.body.style.cursor = ""; } }}
      />

      {/* Red pill – right hand */}
      <InteractivePill
        position={[1.02, -0.76, 0]}
        colorTop="#d42828"
        colorBottom="#7a0a0a"
        glowColor="#ff3030"
        isHovered={hovered === "creative"}
        isDimmed={hovered === "tech"}
        isChosen={choosing === "creative"}
        isRejected={choosing === "tech"}
        onClick={() => { if (!choosing) onSelect("creative"); }}
        onPointerOver={() => { if (!choosing) { onHover("creative"); document.body.style.cursor = "pointer"; } }}
        onPointerOut={() => { if (!choosing) { onHover(null); document.body.style.cursor = ""; } }}
      />

      <Environment preset="city" />
    </>
  );
}

export function PillChoiceOverlay(props: PillChoiceOverlayProps) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 3.5], fov: 42 }}
      dpr={[1, 2]}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <Scene {...props} />
    </Canvas>
  );
}

export default PillChoiceOverlay;
