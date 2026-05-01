import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PIN_VH = 3.5;
const LINES = [
  { txt: "$ wethink --init-strategy",   color: "#a5b4fc", delay: 0.00 },
  { txt: "> Analyzing business needs…",  color: "#94a3b8", delay: 0.06 },
  { txt: "> Building IT roadmap ✓",      color: "#6ee7b7", delay: 0.12 },
  { txt: "> Crafting brand identity ✓",  color: "#6ee7b7", delay: 0.18 },
  { txt: "> Designing pitch deck ✓",     color: "#6ee7b7", delay: 0.24 },
  { txt: "> Entrepreneur support ✓",     color: "#6ee7b7", delay: 0.30 },
  { txt: "",                             color: "#94a3b8", delay: 0.36 },
  { txt: "const client = WeThink.solve({", color: "#f8fafc", delay: 0.40 },
  { txt: "  vision:   'Infinite',",      color: "#fbbf24", delay: 0.46 },
  { txt: "  strategy: 'Precise',",       color: "#fbbf24", delay: 0.52 },
  { txt: "  growth:   'Exponential',",   color: "#fbbf24", delay: 0.58 },
  { txt: "});",                          color: "#f8fafc", delay: 0.64 },
  { txt: "",                             color: "#94a3b8", delay: 0.68 },
  { txt: "// Ready. Let's build.",       color: "#6366f1", delay: 0.72 },
];

function drawFrame(
  ctx: CanvasRenderingContext2D,
  progress: number,
  w: number,
  h: number
) {
  // Background
  ctx.fillStyle = "#06061a";
  ctx.fillRect(0, 0, w, h);

  const px = Math.round(w * 0.026);
  const fontSize = Math.max(12, Math.round(h * 0.038));
  const lineH = fontSize * 1.65;
  ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace`;

  // Window chrome
  const chrome = Math.round(h * 0.07);
  const radius = Math.round(w * 0.016);
  // rounded rect
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, radius);
  ctx.fillStyle = "#0d0d2b";
  ctx.fill();

  // title bar
  ctx.fillStyle = "#12123a";
  ctx.fillRect(0, 0, w, chrome);
  // dots
  const dot = Math.round(chrome * 0.28);
  const dy = chrome / 2;
  const colors = ["#ef4444", "#f59e0b", "#22c55e"];
  colors.forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(px + i * (dot * 2.5), dy, dot, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });
  // title
  ctx.fillStyle = "#64748b";
  ctx.font = `${Math.round(fontSize * 0.75)}px "Inter", sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("wethink — terminal", w / 2, dy + fontSize * 0.28);
  ctx.textAlign = "left";

  // Node/network particles — background layer
  const t = progress;
  const nodeCount = 18;
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2 + t * Math.PI;
    const r = Math.min(w, h) * 0.38;
    const nx = w / 2 + Math.cos(angle) * r * (0.5 + 0.5 * Math.sin(i * 1.3));
    const ny = h / 2 + Math.sin(angle) * r * (0.3 + 0.4 * Math.cos(i * 0.9)) + chrome / 2;
    // Connect to neighbors
    for (let j = i + 1; j < nodeCount; j++) {
      const angle2 = (j / nodeCount) * Math.PI * 2 + t * Math.PI;
      const nx2 = w / 2 + Math.cos(angle2) * r * (0.5 + 0.5 * Math.sin(j * 1.3));
      const ny2 = h / 2 + Math.sin(angle2) * r * (0.3 + 0.4 * Math.cos(j * 0.9)) + chrome / 2;
      const dist = Math.hypot(nx2 - nx, ny2 - ny);
      if (dist < r * 0.7) {
        const alpha = (1 - dist / (r * 0.7)) * 0.12 * Math.min(1, t * 3);
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(nx2, ny2);
        ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    // Node dot
    const nodeAlpha = Math.min(1, t * 4) * 0.25;
    ctx.beginPath();
    ctx.arc(nx, ny, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(165,180,252,${nodeAlpha})`;
    ctx.fill();
  }

  // Code lines
  ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace`;
  const startY = chrome + lineH * 0.9;

  LINES.forEach(({ txt, color, delay }) => {
    const localP = gsap.utils.clamp(0, 1, (progress - delay) / 0.08);
    if (localP <= 0) return;
    const lineIdx = LINES.findIndex((l) => l.delay === delay);
    const y = startY + lineIdx * lineH;
    if (y > h - lineH) return;

    const chars = Math.round(txt.length * localP);
    const visible = txt.slice(0, chars);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.92;
    ctx.fillText(visible, px * 1.5, y);
    ctx.globalAlpha = 1;

    // cursor blink
    if (chars < txt.length && chars > 0) {
      const measured = ctx.measureText(visible).width;
      const blinkOn = Math.floor(progress * 30) % 2 === 0;
      if (blinkOn) {
        ctx.fillStyle = "#6366f1";
        ctx.fillRect(px * 1.5 + measured + 2, y - fontSize, 2, fontSize + 4);
      }
    }
  });

  // Glow overlay
  const grd = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.55);
  grd.addColorStop(0, "rgba(99,102,241,0.05)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Top scanline subtle
  ctx.fillStyle = "rgba(0,0,0,0.06)";
  for (let y = chrome; y < h; y += 3) {
    ctx.fillRect(0, y, w, 1);
  }
}

export function HeroScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const topRef     = useRef<HTMLHeadingElement>(null);
  const botRef     = useRef<HTMLHeadingElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const upd = () => setReduced(mq.matches);
    upd(); mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);

  // Entry animation
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(bgRef.current,  { opacity: 0, duration: 1.4, ease: "power2.out" });
      tl.from(cardRef.current,{ opacity: 0, duration: 1.1, ease: "power3.out" }, 0.35);
      tl.from(topRef.current, { opacity: 0, y: 32, duration: 1, ease: "expo.out" }, 0.5);
      tl.from(botRef.current, { opacity: 0, y: -32, duration: 1, ease: "expo.out" }, 0.62);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  // Scroll choreography
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const aspect = 16 / 9;
    const isMobile = () => window.innerWidth < 768;
    const startScale = () => (isMobile() ? 0.82 : 0.6);
    const endScale = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const baseW = Math.min(vw * 0.96, vh * 0.72 * aspect);
      const baseH = Math.min(vh * 0.72, (vw * 0.96) / aspect);
      return Math.max(vw / baseW, vh / baseH) * 1.04;
    };

    // Initial canvas draw
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 1280; canvas.height = 720;
      const c = canvas.getContext("2d");
      if (c) drawFrame(c, 0, 1280, 720);
    }

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { scale: startScale(), transformOrigin: "50% 50%" });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const c = canvasRef.current;
            if (!c) return;
            const ctx2 = c.getContext("2d");
            if (ctx2) drawFrame(ctx2, self.progress, c.width, c.height);
          },
        },
      });

      master.to(cardRef.current, { scale: 1, ease: "power2.out", duration: 0.15 }, 0);
      master.to(topRef.current, { x: () => (isMobile() ? "-70vw" : "-60vw"), ease: "power2.inOut", duration: 0.15 }, 0);
      master.to(botRef.current, { x: () => (isMobile() ? "70vw"  : "60vw"),  ease: "power2.inOut", duration: 0.15 }, 0);

      master.to(cardRef.current, { scale: endScale, ease: "power2.in", duration: 0.63 }, 0.15);
      master.to(topRef.current,  { opacity: 0, ease: "power1.in", duration: 0.22 }, 0.15);
      master.to(botRef.current,  { opacity: 0, ease: "power1.in", duration: 0.22 }, 0.15);

      master.to(cardRef.current, { scale: startScale, ease: "power3.inOut", duration: 0.22 }, 0.78);
      master.to(topRef.current,  { x: 0, opacity: 1, letterSpacing: "-0.04em", ease: "power2.inOut", duration: 0.22 }, 0.78);
      master.to(botRef.current,  { x: 0, opacity: 1, letterSpacing: "-0.04em", ease: "power2.inOut", duration: 0.22 }, 0.78);

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const aspect = 16 / 9;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-clip text-white"
      style={{ height: `${(PIN_VH + 1) * 100}vh`, background: "var(--bg)" }}
      aria-label="WeThink hero"
    >
      <div className="sticky top-0 flex h-svh w-full flex-col items-center justify-center overflow-hidden">
        <div ref={bgRef} aria-hidden className="absolute inset-0 z-0"
          style={{ background: "linear-gradient(135deg,#06061a 0%,#0d0d2b 60%,#1e1b4b 100%)" }} />

        {/* Ambient glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.12) 0%, transparent 65%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)" }} />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4">
          {/* Top title */}
          <h2
            ref={topRef}
            className="heading font-black uppercase select-none"
            style={{ fontSize: "clamp(3.5rem,11vw,10rem)", lineHeight: 0.85, letterSpacing: "-0.04em", color: "#f1f5f9" }}
          >
            We
          </h2>

          {/* The "card" — terminal window */}
          <div
            ref={cardRef}
            className="relative overflow-hidden will-change-transform"
            style={{
              width: `min(96vw, calc(72svh * ${aspect}))`,
              height: `min(72svh, 96vw / ${aspect})`,
              borderRadius: "clamp(8px,1.4vw,20px)",
              boxShadow: "0 20px 80px rgba(0,0,0,0.7), 0 0 60px rgba(99,102,241,0.2)",
              border: "1px solid rgba(99,102,241,0.25)",
            }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 z-20"
              style={{ boxShadow: "inset 0 0 100px rgba(0,0,0,0.4)" }} />
            <canvas
              ref={canvasRef}
              aria-hidden
              className="absolute inset-0 h-full w-full"
              style={{ imageRendering: "auto" }}
            />
          </div>

          {/* Bottom title */}
          <h2
            ref={botRef}
            className="heading font-black uppercase select-none indigo-gradient"
            style={{ fontSize: "clamp(3.5rem,11vw,10rem)", lineHeight: 0.85, letterSpacing: "-0.04em" }}
          >
            Think
          </h2>
        </div>
      </div>
    </section>
  );
}
