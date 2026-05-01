import { motion } from "framer-motion";
import { Search, Lightbulb, Cpu, BarChart3 } from "lucide-react";

const steps = [
  { num: "01", icon: Search,     title: "Discover",  desc: "We deep-dive into your business, goals, competitors, and pain points to form a complete picture before touching a single deliverable." },
  { num: "02", icon: Lightbulb,  title: "Strategize", desc: "We map the right path — technology choices, brand positioning, presentation strategy, or a full entrepreneurship plan, built to your context." },
  { num: "03", icon: Cpu,        title: "Execute",    desc: "Our team moves fast without cutting corners. Every solution is built, designed, or developed with quality and precision as non-negotiables." },
  { num: "04", icon: BarChart3,  title: "Grow",       desc: "We don't just hand over a deliverable and leave. We measure, iterate, and ensure the work creates lasting, compounding value for your business." },
];

export function Process() {
  return (
    <section id="process" className="relative py-32" style={{ background: "var(--bg2)" }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 60%)" }} />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[4px]" style={{ color: "var(--primary)" }}>How It Works</p>
          <h2 className="heading text-4xl font-bold md:text-5xl" style={{ color: "var(--fg)" }}>
            Our <span className="indigo-gradient">4-Step Process</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base" style={{ color: "var(--muted)" }}>
            A structured, transparent approach that keeps you informed and in control at every stage.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.3) 20%, rgba(99,102,241,0.3) 80%, transparent)" }} />

          <div className="space-y-12">
            {steps.map(({ num, icon: Icon, title, desc }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center gap-8 lg:gap-16 ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Content card */}
                <div
                  className="flex-1 rounded-2xl p-7"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
                    >
                      <Icon size={22} style={{ color: "var(--p2)" }} />
                    </div>
                    <div>
                      <p className="mono mb-1 text-xs" style={{ color: "var(--primary)" }}>{num}</p>
                      <h3 className="heading mb-2 text-xl font-bold" style={{ color: "var(--fg)" }}>{title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
                    </div>
                  </div>
                </div>

                {/* Center dot on timeline */}
                <div
                  className="hidden h-5 w-5 shrink-0 rounded-full lg:block glow"
                  style={{ background: "#6366f1", border: "3px solid var(--bg2)" }}
                />

                {/* Empty spacer for alternating layout */}
                <div className="hidden flex-1 lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
