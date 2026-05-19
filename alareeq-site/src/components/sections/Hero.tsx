import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";
import { AnimatedCrane } from "../AnimatedCrane";
import { useLang } from "../../i18n";

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

export function Hero() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const videoY    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY  = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentOp = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden"
      aria-label="Albina Alareeq hero section"
    >
      {/* ── VIDEO BACKGROUND ── */}
      <motion.div
        className="absolute inset-0 scale-[1.12]"
        style={{ y: videoY }}
        aria-hidden
      >
        <video
          autoPlay muted loop playsInline
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.4) saturate(0.75)" }}
        >
          <source src="https://videos.pexels.com/video-files/5434220/5434220-hd_1920_1080_24fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/12098511/12098511-hd_1920_1080_50fps.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── GRADIENT OVERLAYS ── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(222,47%,3%)] via-[hsl(222,47%,4%,0.55)] to-[hsl(222,47%,5%,0.45)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,3%,0.6)] via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[hsl(222,47%,3%)] to-transparent" />

      {/* ── GOLD AMBIENT GLOWS ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[hsl(43,56%,55%,0.05)] blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-[hsl(213,60%,42%,0.04)] blur-[130px]" />
        <div className="absolute left-1/4 top-1/2 h-[420px] w-[420px] rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[160px]" />
      </div>

      {/* ── ANIMATED CRANES ── */}
      <motion.div
        className="pointer-events-none absolute bottom-0 right-8 hidden lg:block z-10"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      >
        <AnimatedCrane />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-0 left-4 hidden xl:block z-10"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
        style={{ opacity: 0.45 }}
      >
        <AnimatedCrane className="scale-75 origin-bottom" />
      </motion.div>

      {/* ── CONTENT (parallax fade on scroll) ── */}
      <motion.div
        style={{ opacity: contentOp, y: contentY }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center md:px-8 lg:px-12"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">

          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[hsl(var(--foreground)/0.7)] backdrop-blur"
          >
            <MapPin className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
            {t.hero.badge}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Albina Alareeq Contracting & General Maintenance"
              className="w-[min(480px,85vw)]"
              style={{ mixBlendMode: "screen" }}
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-6 font-serif text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          >
            {t.hero.h1}{" "}
            <span className="gold-gradient">{t.hero.h2}</span>
            <br />
            {t.hero.h3}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-3 max-w-2xl text-lg text-[hsl(var(--primary)/0.8)] md:text-xl"
          >
            {t.hero.arabicName}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-base text-[hsl(var(--foreground)/0.5)]"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group gap-2 uppercase tracking-[0.15em]"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.cta1}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 uppercase tracking-[0.15em]"
              onClick={() => window.open("https://wa.me/971563780707", "_blank")}
            >
              <Phone className="h-4 w-4" />
              {t.hero.cta2}
            </Button>
          </motion.div>

          <motion.ul
            variants={itemVariants}
            className="mb-12 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-[hsl(var(--foreground)/0.6)]"
          >
            {t.hero.pills.map((p) => (
              <li
                key={p}
                className="rounded-full border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--card)/0.55)] px-4 py-2 backdrop-blur"
              >
                {p}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={statsVariants}
            className="grid gap-4 rounded-2xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--card)/0.5)] p-6 backdrop-blur-sm sm:grid-cols-3"
          >
            {t.hero.stats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="space-y-1">
                <div className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--foreground)/0.45)]">{stat.label}</div>
                <div className="font-serif text-3xl font-bold gold-gradient">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[3px] text-[hsl(var(--foreground)/0.35)]">
        <span>{t.hero.scroll}</span>
        <div className="h-10 w-px bg-gradient-to-b from-[hsl(var(--primary))] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
