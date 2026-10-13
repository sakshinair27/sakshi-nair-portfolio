import { useEffect, useRef } from "react";

const PARTICLE_DENSITY = 16000; // px² per particle — lower = more particles
const MAX_PARTICLES = 70;
const LINK_DISTANCE = 130;
const SPEED = 0.18;

/**
 * A quiet, data-flavored animated background: a field of slowly drifting
 * points that link into faint lines when close, like a sparse network
 * graph. Sits behind hero content (absolute, pointer-events-none). Reads
 * accent color from CSS, adapts to light/dark, and pauses for
 * prefers-reduced-motion and when off-screen/tab-hidden.
 */
export default function LiveBackground({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let raf = null;
    let running = true;

    const accentColor = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();
      return v || "45 212 191";
    };

    function resize() {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(MAX_PARTICLES, Math.max(18, Math.floor((width * height) / PARTICLE_DENSITY)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 1.4 + 0.6,
      }));
    }

    function step() {
      if (!running) return;
      const accent = accentColor();
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const opacity = (1 - dist / LINK_DISTANCE) * 0.35;
            ctx.strokeStyle = `rgb(${accent} / ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${accent} / 0.55)`;
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    }

    resize();
    if (!reduceMotion) {
      raf = requestAnimationFrame(step);
    } else {
      step();
      running = false;
    }

    const onResize = () => resize();
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className={`live-bg-mask pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-90" />
      <span className="live-bg-square live-bg-square--1" />
      <span className="live-bg-square live-bg-square--2" />
      <span className="live-bg-square live-bg-square--3" />
    </div>
  );
}
