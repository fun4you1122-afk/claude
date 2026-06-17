import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../../i18n";

// ── Scramble text ─────────────────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function ScrambleText({ text, inView }: { text: string; inView: boolean }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 20;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (frame > i * (total / text.length)) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (++frame > total) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [inView, text]);

  return <>{display}</>;
}

// ── Magnetic button (primary CTA only) ───────────────────────────────────────
function MagneticButton({
  href,
  children,
  disabled,
}: {
  href: string;
  children: React.ReactNode;
  disabled: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: disabled ? 0 : springX, y: disabled ? 0 : springY, background: "linear-gradient(135deg,#a07820,#c9a84c)" }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group inline-flex min-h-[52px] items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-[hsl(var(--background))] shadow-[0_0_30px_hsl(43,56%,55%,0.3)] transition-shadow hover:shadow-[0_0_40px_hsl(43,56%,55%,0.5)]"
    >
      {children}
    </motion.a>
  );
}

// ── Particle canvas ───────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  drift: number;
}
interface GlowOrb {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  phase: number;
  speed: number;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const makeParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 80,
      r: 1 + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.6,
      opacity: 0.2 + Math.random() * 0.4,
      drift: (Math.random() - 0.5) * 0.4,
    });

    const particles: Particle[] = Array.from({ length: 25 }, makeParticle);

    const orbs: GlowOrb[] = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 30 + Math.random() * 30,
      baseOpacity: 0.03 + Math.random() * 0.03,
      phase: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.007,
    }));

    let time = 0;

    const loop = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw glowing orbs
      for (const orb of orbs) {
        const alpha = orb.baseOpacity * (0.7 + 0.3 * Math.sin(time * orb.speed + orb.phase));
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `rgba(201,168,76,${alpha})`);
        grad.addColorStop(1, "rgba(201,168,76,0)");
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw particles
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) {
          Object.assign(p, makeParticle());
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function CTABanner() {
  const { t } = useLang();
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(222,47%,8%) 0%, hsl(222,47%,5%) 50%, hsl(222,47%,8%) 100%)",
        }}
      />

      {!shouldReduce && <ParticleCanvas />}

      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.06)] blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.04)] blur-[80px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.4)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.4)] to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[4px] text-[hsl(var(--primary))]">
            {t.cta.badge}
          </p>
          <h2 className="font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6">
            {t.cta.h1}{" "}
            <span className="gold-gradient">
              <ScrambleText text={t.cta.h2} inView={inView} />
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[hsl(var(--foreground)/0.55)] text-lg">
            {t.cta.sub}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton
              href="https://wa.me/971563780707"
              disabled={!!shouldReduce}
            >
              <Phone className="h-4 w-4" />
              {t.cta.btn1}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <motion.a
              href="mailto:albina.alareeq@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.08)] px-8 py-4 text-sm font-semibold text-[hsl(var(--primary))] backdrop-blur transition-all hover:bg-[hsl(var(--primary)/0.15)]"
            >
              {t.cta.btn2}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
