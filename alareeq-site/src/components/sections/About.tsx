import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ShieldCheck, Clock, Star } from "lucide-react";
import { useRef } from "react";
import { useLang } from "../../i18n";

const pillarIcons = [ShieldCheck, Clock, Star];

const BACK_IMG  = "https://images.unsplash.com/photo-1590419690008-905895e8fe0d?w=600&auto=format&fit=crop&q=80";
const FRONT_IMG = "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=600&auto=format&fit=crop&q=80";

export function About() {
  const { t } = useLang();
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backY  = useTransform(scrollYProgress, [0, 1], ["0%",   "20%"]);
  const frontY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 bg-[hsl(222,40%,7%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">

          {/* ── LEFT COLUMN: stacked parallax images + cube overlay ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            {/* Stacked image parallax container */}
            <div className="relative h-[420px] w-full lg:h-[520px]">
              {/* Back image */}
              {shouldReduce ? (
                <div className="absolute top-0 left-0 w-[85%] h-[90%] rounded-2xl overflow-hidden">
                  <img
                    src={BACK_IMG}
                    alt="Construction site overview"
                    className="h-full w-full object-cover"
                    style={{ filter: "brightness(0.6) blur(0.5px)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[hsl(222,47%,5%,0.4)] to-transparent" />
                </div>
              ) : (
                <motion.div
                  style={{ y: backY }}
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="absolute top-0 left-0 w-[85%] h-[90%] rounded-2xl overflow-hidden"
                >
                  <motion.img
                    src={BACK_IMG}
                    alt="Construction site overview"
                    className="h-full w-full object-cover"
                    style={{ filter: "brightness(0.6) blur(0.5px)" }}
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[hsl(222,47%,5%,0.4)] to-transparent" />
                </motion.div>
              )}

              {/* Front image */}
              {shouldReduce ? (
                <div className="absolute bottom-0 right-0 w-[75%] h-[80%] rounded-2xl overflow-hidden border-2 border-[hsl(var(--primary)/0.3)] shadow-2xl">
                  <img
                    src={FRONT_IMG}
                    alt="Modern building construction"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,47%,5%,0.6)] to-transparent" />
                </div>
              ) : (
                <motion.div
                  style={{ y: frontY }}
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                  transition={{ duration: 1.1, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="absolute bottom-0 right-0 w-[75%] h-[80%] rounded-2xl overflow-hidden border-2 border-[hsl(var(--primary)/0.3)] shadow-2xl"
                >
                  <motion.img
                    src={FRONT_IMG}
                    alt="Modern building construction"
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.4, delay: 0.25, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,47%,5%,0.6)] to-transparent" />
                </motion.div>
              )}

              {/* Offset gold frame that draws in behind the front image */}
              {!shouldReduce && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute bottom-[-14px] right-[-14px] w-[75%] h-[80%] rounded-2xl border border-[hsl(var(--primary)/0.35)]"
                  initial={{ opacity: 0, x: -10, y: -10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              )}

              {/* 3D spinning cube — overlaid as a corner element */}
              <div
                className="absolute bottom-4 left-4 z-10"
                style={{ perspective: "500px", width: 88, height: 88 }}
              >
                <motion.div
                  className="relative h-full w-full"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                >
                  {[
                    { emoji: "🏗️", idx: 0, transform: "translateZ(44px)" },
                    { emoji: "🔩", idx: 1, transform: "rotateY(180deg) translateZ(44px)" },
                    { emoji: "🏢", idx: 2, transform: "rotateY(-90deg) translateZ(44px)" },
                    { emoji: "🎨", idx: 3, transform: "rotateY(90deg) translateZ(44px)" },
                  ].map(({ emoji, idx, transform }) => (
                    <div
                      key={idx}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-lg border border-[hsl(var(--primary)/0.35)] bg-[hsl(var(--card)/0.9)] backdrop-blur"
                      style={{ transform }}
                    >
                      <span className="text-xl">{emoji}</span>
                      <p className="font-serif text-[8px] font-semibold text-[hsl(var(--primary))] text-center leading-tight px-1">
                        {t.about.cubeLabels[idx]}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Gold years badge */}
              <div className="absolute top-4 right-4 z-10 flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--card)/0.9)] backdrop-blur">
                <span className="font-serif text-2xl font-black gold-gradient leading-none">10+</span>
                <span className="text-[9px] uppercase tracking-wider text-[hsl(var(--foreground)/0.5)]">Years</span>
              </div>
            </div>

            {/* Service tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {t.about.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] px-3 py-1.5 text-xs text-[hsl(var(--foreground)/0.6)] backdrop-blur"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: unchanged ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-block rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))]">
              {t.about.badge}
            </div>

            <h2 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
              {t.about.h1} <span className="gold-gradient">{t.about.h2}</span> {t.about.h3}
            </h2>

            <p className="text-[hsl(var(--foreground)/0.6)] leading-relaxed">{t.about.p1}</p>
            <p className="text-[hsl(var(--foreground)/0.6)] leading-relaxed">{t.about.p2}</p>

            <div className="space-y-3 pt-2">
              {t.about.pillars.map(({ title, desc }, i) => {
                const Icon = pillarIcons[i];
                return (
                  <motion.div
                    key={title}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-4 rounded-xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.5)] p-4 backdrop-blur transition-colors hover:border-[hsl(var(--primary)/0.35)]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[hsl(var(--foreground))]">{title}</p>
                      <p className="text-sm text-[hsl(var(--foreground)/0.55)]">{desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
