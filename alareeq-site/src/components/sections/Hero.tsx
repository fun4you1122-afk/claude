import { motion, useScroll, useTransform, useReducedMotion, useInView, type Variants } from "framer-motion";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
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

// ── Word-by-word reveal ───────────────────────────────────────────────────────
function WordReveal({ children, delay = 0 }: { children: string; delay?: number }) {
  const words = children.split(" ");
  return (
    <>
      {/* The inter-word space must live OUTSIDE the overflow-hidden
          inline-block: trailing whitespace inside an inline-block is trimmed
          by CSS, which rendered multi-word segments with no spaces. */}
      {words.map((word, i) => (
        <Fragment key={i}>
          <span style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.15 }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.75,
                delay: delay + i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}

// ── Survey markers — refined technical accents in place of emoji cards ───────
const surveyMarkers = [
  { top: "24%", right: "7%", left: undefined as string | undefined, label: "N 24°27′", delay: 0 },
  { top: "58%", right: "4%", left: undefined, label: "E 54°22′", delay: 1.4 },
  { top: "30%", right: undefined as string | undefined, left: "4%", label: "EL +12.0", delay: 0.7 },
  { top: "64%", right: undefined, left: "7%", label: "GRID 04", delay: 2.1 },
];

function SurveyMarker({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 2v22M2 13h22" stroke="rgba(201,168,76,0.55)" strokeWidth="1" />
        <circle cx="13" cy="13" r="5" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
      </svg>
      <span className="font-mono text-[9px] tracking-[2px] text-[hsl(var(--primary)/0.45)]">{label}</span>
    </div>
  );
}

// ── Count-up statistic ────────────────────────────────────────────────────────
function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !match || shouldReduce) return;
    const target = parseInt(match[1], 10);
    const duration = 1400;
    let start: number | undefined;
    let raf = 0;
    const step = (ts: number) => {
      if (start === undefined) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, shouldReduce]);

  if (!match) return <>{value}</>;
  if (shouldReduce) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {inView ? n : 0}
      {match[2]}
    </span>
  );
}

const HERO_POSTER =
  "https://images.pexels.com/videos/5434220/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=1280";
const HERO_VIDEO_1080 =
  "https://videos.pexels.com/video-files/5434220/5434220-hd_1920_1080_24fps.mp4"; // 13.0 MB
const HERO_VIDEO_720 =
  "https://videos.pexels.com/video-files/5434220/5434220-hd_1280_720_24fps.mp4"; // 6.8 MB

export function Hero() {
  const { t } = useLang();
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // Pick once at mount: phones/tablets get the 720p rendition (half the bytes);
  // the video sits dimmed behind content, so the quality difference is invisible.
  const [videoSrc] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 1024 ? HERO_VIDEO_720 : HERO_VIDEO_1080
  );
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
        {shouldReduce ? (
          <img
            src={HERO_POSTER}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.4) saturate(0.75)" }}
          />
        ) : (
          <video
            autoPlay muted loop playsInline
            poster={HERO_POSTER}
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.4) saturate(0.75)" }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* ── BLUEPRINT GRID OVERLAY ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="blueprint" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgb(201,168,76)" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="rgba(201,168,76,0.6)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint)" />
        </svg>
      </div>

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

      {/* ── SURVEY MARKERS (desktop only, skip if reduced motion) ── */}
      {!shouldReduce && (
        <div className="pointer-events-none hidden lg:block" aria-hidden>
          {surveyMarkers.map((item, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: item.top, right: item.right, left: item.left }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0.4, 1], y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 6, delay: 1.5 + item.delay, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 7 + item.delay, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <SurveyMarker label={item.label} />
            </motion.div>
          ))}
        </div>
      )}

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
            {shouldReduce ? (
              <>
                {t.hero.h1}{" "}
                <span className="gold-gradient">{t.hero.h2}</span>
                <br />
                {t.hero.h3}
              </>
            ) : (
              <>
                <WordReveal delay={0.2}>{t.hero.h1}</WordReveal>{" "}
                <span className="gold-gradient">
                  <WordReveal delay={0.5}>{t.hero.h2}</WordReveal>
                </span>
                <br />
                <WordReveal delay={0.7}>{t.hero.h3}</WordReveal>
              </>
            )}
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
                <div className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--foreground)/0.55)]">{stat.label}</div>
                <div className="font-serif text-3xl font-bold gold-gradient">
                  <CountUp value={stat.value} />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[3px] text-[hsl(var(--foreground)/0.5)]">
        <span>{t.hero.scroll}</span>
        <div className="h-10 w-px bg-gradient-to-b from-[hsl(var(--primary))] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
