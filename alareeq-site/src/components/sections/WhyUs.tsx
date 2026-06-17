import { motion, useInView } from "framer-motion";
import { ShieldCheck, Clock4, Award, Wrench, Users, TrendingUp } from "lucide-react";
import { useRef } from "react";
import { useLang } from "../../i18n";

const icons = [ShieldCheck, Clock4, Award, Wrench, Users, TrendingUp];

export function WhyUs() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="relative py-28 bg-[hsl(222,40%,7%)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-[500px] w-[400px] -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[100px]" />
        <div className="absolute right-0 top-1/2 h-[500px] w-[400px] -translate-y-1/2 rounded-full bg-[hsl(213,60%,42%,0.03)] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))]">
            {t.whyUs.badge}
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            {t.whyUs.h1} <span className="gold-gradient">{t.whyUs.h2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(var(--foreground)/0.5)]">{t.whyUs.sub}</p>
        </motion.div>

        {/* ── MOBILE: single column with left accent ── */}
        <div className="flex flex-col gap-6 lg:hidden">
          {t.whyUs.reasons.map(({ title, desc }, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative flex gap-4 rounded-2xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] p-5 backdrop-blur"
              >
                {/* Left gold accent bar */}
                <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-[hsl(var(--primary)/0.8)] to-[hsl(var(--primary)/0.2)]" />

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif text-xs font-bold text-[hsl(var(--primary)/0.5)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-base font-bold">{title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[hsl(var(--foreground)/0.55)]">{desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── DESKTOP: alternating timeline ── */}
        <div className="relative hidden lg:block">
          {/* Animated vertical center line */}
          <motion.div
            ref={lineRef}
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
            style={{ originY: 0 }}
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[hsl(var(--primary)/0.6)] via-[hsl(var(--primary)/0.3)] to-transparent"
          />

          <div className="flex flex-col gap-12">
            {t.whyUs.reasons.map(({ title, desc }, i) => {
              const Icon = icons[i];
              const isEven = i % 2 === 0;

              return (
                <div key={title} className="relative grid grid-cols-2 gap-8 items-center">
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    viewport={{ once: true }}
                    className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[hsl(var(--primary))] bg-[hsl(222,40%,7%)]"
                  >
                    <span className="block h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
                  </motion.div>

                  {/* Left slot */}
                  <div className={isEven ? "flex justify-end pr-8" : "pr-8"}>
                    {isEven ? (
                      <TimelineCard title={title} desc={desc} num={i} Icon={Icon} fromLeft />
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Right slot */}
                  <div className={!isEven ? "flex justify-start pl-8" : "pl-8"}>
                    {!isEven ? (
                      <TimelineCard title={title} desc={desc} num={i} Icon={Icon} fromLeft={false} />
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  title,
  desc,
  num,
  Icon,
  fromLeft,
}: {
  title: string;
  desc: string;
  num: number;
  Icon: React.ElementType;
  fromLeft: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
      transition={{ duration: 0.55, delay: num * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, amount: 0.4 }}
      className="group relative w-full max-w-[360px] rounded-2xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] p-6 backdrop-blur transition-all duration-300 hover:border-[hsl(var(--primary)/0.35)]"
    >
      {/* Large number in background */}
      <span className="absolute right-5 top-4 font-serif text-5xl font-bold text-[hsl(var(--primary)/0.06)]">
        {String(num + 1).padStart(2, "0")}
      </span>

      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] transition-colors group-hover:bg-[hsl(var(--primary)/0.18)]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-2 font-serif text-lg font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-[hsl(var(--foreground)/0.55)]">{desc}</p>
    </motion.div>
  );
}
