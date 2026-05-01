import { motion } from "framer-motion";
import { Monitor, Palette, Presentation, Rocket } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "IT Consultation",
    desc: "End-to-end technology strategy — from infrastructure audits and cloud migration to software architecture and cybersecurity roadmaps tailored for your business.",
    tags: ["Cloud", "Security", "Architecture"],
    gradient: "from-indigo-500/20 to-violet-500/10",
    glow: "rgba(99,102,241,0.35)",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    desc: "We craft distinctive brand identities that communicate your values visually — logo design, color systems, typography, and full brand guidelines that stand out.",
    tags: ["Logo", "Design System", "Guidelines"],
    gradient: "from-violet-500/20 to-purple-500/10",
    glow: "rgba(139,92,246,0.35)",
  },
  {
    icon: Presentation,
    title: "Pitch Decks & PPT",
    desc: "Investor-grade and executive presentations for businesses and individuals — structured storytelling, data visualization, and polished slide design that wins rooms.",
    tags: ["Business", "Investors", "Personal"],
    gradient: "from-blue-500/20 to-indigo-500/10",
    glow: "rgba(59,130,246,0.35)",
  },
  {
    icon: Rocket,
    title: "Entrepreneurship A→Z",
    desc: "From idea validation and business registration to market strategy and investor readiness — we walk alongside founders at every step of building a company.",
    tags: ["Strategy", "Launch", "Scale"],
    gradient: "from-emerald-500/20 to-teal-500/10",
    glow: "rgba(16,185,129,0.35)",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-32" style={{ background: "var(--bg2)" }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 60%)" }} />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[4px]" style={{ color: "var(--primary)" }}>
            What We Do
          </p>
          <h2 className="heading text-4xl font-bold md:text-5xl" style={{ color: "var(--fg)" }}>
            Services That <span className="indigo-gradient">Drive Growth</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: "var(--muted)" }}>
            We combine technology, creativity, and strategy to help businesses think bigger and move faster.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {services.map(({ icon: Icon, title, desc, tags, gradient, glow }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, boxShadow: `0 24px 60px ${glow}` }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl p-8 transition-all duration-300"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Gradient tint */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60`} />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
                >
                  <Icon size={26} style={{ color: "var(--p2)" }} />
                </div>

                <h3 className="heading mb-3 text-xl font-bold" style={{ color: "var(--fg)" }}>{title}</h3>
                <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>

                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "var(--accent)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
