import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../../i18n";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000, step = 16;
    const inc = target / (duration / step);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + inc, target);
      setCount(Math.floor(cur));
      if (cur >= target) clearInterval(t);
    }, step);
    return () => clearInterval(t);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Stats() {
  const { t } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let time = 0, id: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const hexes = [
      { cx: 0.1, cy: 0.25, r: 70 }, { cx: 0.9, cy: 0.75, r: 90 },
      { cx: 0.5, cy: 0.08, r: 50 }, { cx: 0.15, cy: 0.85, r: 60 },
      { cx: 0.87, cy: 0.18, r: 55 },
    ];

    const drawHex = (cx: number, cy: number, r: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const loop = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hexes.forEach((h, i) => {
        const s = 1 + Math.sin(time + i) * 0.12;
        const a = 0.06 + Math.sin(time * 1.2 + i) * 0.03;
        drawHex(h.cx * canvas.width, h.cy * canvas.height, h.r * s, a);
        drawHex(h.cx * canvas.width, h.cy * canvas.height, h.r * s * 0.55, a * 0.6);
      });
      id = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section className="relative py-28 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(222,47%,4%,0.97)] to-[hsl(222,40%,7%,0.95)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-[hsl(var(--foreground)/0.12)] bg-[hsl(var(--foreground)/0.06)] px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--foreground)/0.6)]">
            {t.stats.badge}
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            {t.stats.h1} <span className="gold-gradient">{t.stats.h2}</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.items.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6, scale: 1.04 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-[hsl(var(--foreground)/0.07)] bg-[hsl(var(--foreground)/0.03)] p-8 text-center backdrop-blur transition-colors hover:border-[hsl(var(--primary)/0.4)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.1)] text-2xl">
                {s.icon}
              </div>
              <div className="font-serif text-4xl font-black gold-gradient">
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <p className="text-xs uppercase tracking-[2px] text-[hsl(var(--foreground)/0.45)]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
