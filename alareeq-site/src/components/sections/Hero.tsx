import { motion, type Variants } from "framer-motion";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { AnimatedCrane } from "../AnimatedCrane";

type Point = { x: number; y: number };
interface WaveConfig {
  offset: number; amplitude: number; frequency: number; color: string; opacity: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.13 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 } },
};

const heroStats = [
  { label: "Active Projects", value: "2" },
  { label: "Projects Delivered", value: "50+" },
  { label: "Years of Excellence", value: "10+" },
];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const wavePalette: WaveConfig[] = [
      { offset: 0,              amplitude: 75,  frequency: 0.0028, color: "rgba(201,168,76,0.9)",  opacity: 0.45 },
      { offset: Math.PI / 2,   amplitude: 95,  frequency: 0.0022, color: "rgba(160,120,32,0.8)",  opacity: 0.35 },
      { offset: Math.PI,       amplitude: 55,  frequency: 0.0036, color: "rgba(43,108,176,0.7)",   opacity: 0.28 },
      { offset: Math.PI * 1.5, amplitude: 85,  frequency: 0.0019, color: "rgba(201,168,76,0.5)",   opacity: 0.22 },
      { offset: Math.PI * 2,   amplitude: 50,  frequency: 0.0042, color: "rgba(232,201,106,0.4)",  opacity: 0.18 },
    ];

    const smoothing = 0.1;
    const mouseInfluence = 70;
    const influenceRadius = 320;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const center = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = { ...center };
      targetMouseRef.current = { ...center };
    };

    const onMouseMove = (e: MouseEvent) => { targetMouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => {
      const c = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = c; targetMouseRef.current = c;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const inf = Math.max(0, 1 - dist / influenceRadius);
        const mouseEffect = inf * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);
        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          mouseEffect;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineWidth   = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur  = 38;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time++;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "hsl(222,47%,4%)");
      grad.addColorStop(1, "hsl(222,40%,7%)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;
      wavePalette.forEach(drawWave);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden"
      aria-label="Albina Alareeq hero section"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* Animated crane — right side decoration */}
      <motion.div
        className="pointer-events-none absolute bottom-0 right-8 hidden lg:block"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      >
        <AnimatedCrane />
      </motion.div>

      {/* Second smaller crane — far left */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-4 hidden xl:block"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
        style={{ opacity: 0.5 }}
      >
        <AnimatedCrane className="scale-75 origin-bottom" />
      </motion.div>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[hsl(43,56%,55%,0.04)] blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-[hsl(213,60%,42%,0.04)] blur-[130px]" />
        <div className="absolute left-1/4 top-1/2 h-[420px] w-[420px] rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center md:px-8 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">

          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[hsl(var(--foreground)/0.7)] backdrop-blur"
          >
            <MapPin className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
            Abu Dhabi, UAE
          </motion.div>

          {/* Logo */}
          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Albina Alareeq Contracting & General Maintenance"
              className="w-[min(480px,85vw)]" style={{mixBlendMode:"screen"}}
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 font-serif text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          >
            Building{" "}
            <span className="gold-gradient">Excellence</span>
            <br />
            Across The Emirates
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-3 max-w-2xl text-lg text-[hsl(var(--foreground)/0.6)] md:text-xl"
          >
            البناء العريق للمقاولات والصيانة العامة
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-base text-[hsl(var(--foreground)/0.5)]"
          >
            Premium contracting & general maintenance — delivering landmark projects across Abu Dhabi with precision, safety, and integrity.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group gap-2 uppercase tracking-[0.15em]"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Our Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 uppercase tracking-[0.15em]"
              onClick={() => window.open("https://wa.me/971563780707", "_blank")}
            >
              <Phone className="h-4 w-4" />
              WhatsApp Us
            </Button>
          </motion.div>

          {/* Pills */}
          <motion.ul
            variants={itemVariants}
            className="mb-12 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-[hsl(var(--foreground)/0.6)]"
          >
            {["General Contracting", "Civil Works", "MEP Services", "Interior Fit-Out"].map((p) => (
              <li key={p} className="rounded-full border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--card)/0.55)] px-4 py-2 backdrop-blur">
                {p}
              </li>
            ))}
          </motion.ul>

          {/* Stats */}
          <motion.div
            variants={statsVariants}
            className="grid gap-4 rounded-2xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--card)/0.55)] p-6 backdrop-blur-sm sm:grid-cols-3"
          >
            {heroStats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="space-y-1">
                <div className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--foreground)/0.45)]">{stat.label}</div>
                <div className="font-serif text-3xl font-bold gold-gradient">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[3px] text-[hsl(var(--foreground)/0.35)]">
        <span>Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-[hsl(var(--primary))] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
