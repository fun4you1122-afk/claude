import { motion } from "framer-motion";
import { ShieldCheck, Clock, Star } from "lucide-react";
import { useLang } from "../../i18n";

const pillarIcons = [ShieldCheck, Clock, Star];

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 bg-[hsl(222,40%,7%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative h-64 w-64" style={{ perspective: "800px" }}>
              <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              >
                {[
                  { emoji: "🏗️", idx: 0, transform: "translateZ(128px)" },
                  { emoji: "🔩", idx: 1, transform: "rotateY(180deg) translateZ(128px)" },
                  { emoji: "🏢", idx: 2, transform: "rotateY(-90deg) translateZ(128px)" },
                  { emoji: "🎨", idx: 3, transform: "rotateY(90deg) translateZ(128px)" },
                ].map(({ emoji, idx, transform }) => (
                  <div key={idx} className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--card)/0.8)] backdrop-blur" style={{ transform }}>
                    <span className="text-4xl">{emoji}</span>
                    <p className="font-serif text-sm font-semibold text-[hsl(var(--primary))]">{t.about.cubeLabels[idx]}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {t.about.services.map((s) => (
                <span key={s} className="rounded-full border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] px-3 py-1.5 text-xs text-[hsl(var(--foreground)/0.6)] backdrop-blur">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

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
