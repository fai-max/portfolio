"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  size: number;
  alpha: number;
  speed: number;
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    }
    resize();

    // Generate target positions from text "FAHIM"
    const text = "FAHIM";
    const fontSize = Math.min(window.innerWidth * 0.15, 120);
    ctx.font = `bold ${fontSize}px "Arial Black", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    ctx.fillStyle = "#fff";
    ctx.fillText(text, centerX, centerY);

    const imageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const particles: Particle[] = [];
    const gap = 3;

    for (let y = 0; y < canvas.height; y += gap * dpr) {
      for (let x = 0; x < canvas.width; x += gap * dpr) {
        const i = (y * canvas.width + x) * 4;
        if (imageData.data[i + 3] > 128) {
          const px = x / dpr;
          const py = y / dpr;
          particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            targetX: px,
            targetY: py,
            originX: px,
            originY: py,
            size: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.5,
            speed: Math.random() * 0.03 + 0.02,
          });
        }
      }
    }

    // Simulate loading progress
    let prog = 0;
    const progressInterval = setInterval(() => {
      prog += Math.random() * 8 + 2;
      if (prog >= 100) {
        prog = 100;
        clearInterval(progressInterval);
        setTimeout(() => {
          setExiting(true);
          // Scatter particles outward
          particles.forEach((p) => {
            const angle = Math.atan2(
              p.y - centerY,
              p.x - centerX
            );
            const dist = 800 + Math.random() * 400;
            p.targetX = p.x + Math.cos(angle) * dist;
            p.targetY = p.y + Math.sin(angle) * dist;
            p.speed = 0.06 + Math.random() * 0.04;
          });
          setTimeout(onComplete, 800);
        }, 400);
      }
      setProgress(Math.min(prog, 100));
    }, 120);

    let animId: number;
    function animate() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((p) => {
        p.x += (p.targetX - p.x) * p.speed;
        p.y += (p.targetY - p.y) * p.speed;

        ctx.fillStyle = `rgba(68, 136, 255, ${p.alpha})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      animId = requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      clearInterval(progressInterval);
      window.removeEventListener("resize", resize);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0a0a0f] flex flex-col items-center justify-center transition-opacity duration-500 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48">
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4488ff] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-xs text-white/30 mt-2 font-[family-name:var(--font-mono)]">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
