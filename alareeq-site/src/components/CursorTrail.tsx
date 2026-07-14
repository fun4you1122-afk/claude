import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  r: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Touch devices have no cursor to trail — drawing sparkles under the
    // scrolling thumb just burns GPU. Also skip for reduced-motion users.
    if (
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    let animId = 0;
    let running = false;
    let lastX = -9999, lastY = -9999;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.98;
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) { particles.splice(i, 1); continue; }

        const alpha = p.life * p.life;
        const radius = p.r * p.life;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2.5);
        grad.addColorStop(0, `rgba(232,201,106,${alpha * 0.9})`);
        grad.addColorStop(0.5, `rgba(201,168,76,${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(160,120,32,0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Idle-stop: no particles left → halt the loop (canvas was just
      // cleared). The next emit restarts it.
      if (particles.length === 0) { running = false; return; }
      animId = requestAnimationFrame(tick);
    };

    const ensureRunning = () => {
      if (!running) {
        running = true;
        animId = requestAnimationFrame(tick);
      }
    };

    const emit = (x: number, y: number) => {
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist < 4) return;
      lastX = x; lastY = y;
      const count = Math.min(4, Math.floor(dist / 8) + 1);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 1.2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          life: 1,
          maxLife: 40 + Math.random() * 40,
          r: 1.5 + Math.random() * 2.5,
        });
      }
      ensureRunning();
    };

    const onMouseMove = (e: MouseEvent) => emit(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animId);
        particles.length = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[500]"
      aria-hidden
    />
  );
}
