"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  driftPhase: number;
  opacity: number;
}

export function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const density = width < 768 ? 45 : 90;
    const particles: Particle[] = Array.from({ length: density }, () =>
      createParticle(width, height)
    );

    function createParticle(w: number, h: number): Particle {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.6 + 0.4,
        speed: Math.random() * 0.4 + 0.15,
        drift: Math.random() * 0.6 - 0.3,
        driftPhase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.2,
      };
    }

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }

    let frameId: number;
    let t = 0;

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y += p.speed;
        p.driftPhase += 0.003;
        p.x += Math.sin(p.driftPhase) * p.drift * 0.6;

        if (p.y > height + 5) {
          p.y = -5;
          p.x = Math.random() * width;
        }
        if (p.x > width + 5) p.x = -5;
        if (p.x < -5) p.x = width + 5;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(220, 235, 245, ${p.opacity})`;
        ctx!.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70) {
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(125, 211, 252, ${0.06 * (1 - dist / 70)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      t++;
      frameId = requestAnimationFrame(draw);
    }

    if (!prefersReducedMotion) {
      frameId = requestAnimationFrame(draw);
    } else {
      draw();
    }

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
}
