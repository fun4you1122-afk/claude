import { motion } from "framer-motion";
import { Brain, Target, Users } from "lucide-react";

const pillars = [
  { icon: Brain,  title: "Think First",   desc: "Every solution starts with deep thinking — no generic templates, no shortcuts." },
  { icon: Target, title: "Precise Execution", desc: "From strategy to delivery, we execute with clarity and zero ambiguity." },
  { icon: Users,  title: "Your Success = Ours", desc: "We measure our work by the growth it creates for the people we serve." },
];

export function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Animated visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative w-72 h-72">
              {/* Rotating rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `1px solid rgba(99,102,241,${0.35 - i * 0.1})`,
                    margin: `${i * 24}px`,
                  }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 18 + i * 6, repeat: Infinity, ease: "linear" }}
                />
              ))}

              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="flex h-32 w-32 items-center justify-center rounded-3xl glow"
                  style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81)", border: "1px solid rgba(99,102,241,0.4)" }}
                >
                  <img src="/logo.png" alt="WeThink" className="h-20 w-auto" />
                </div>
              </div>

              {/* Orbiting dots */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ inset: "24px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "linear", delay: i * -2.5 }}
                >
                  <div
                    className="absolute h-3 w-3 rounded-full"
                    style={{
                      background: "#6366f1",
                      top: "0%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      boxShadow: "0 0 10px rgba(99,102,241,0.8)",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="space-y-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[4px]" style={{ color: "var(--primary)" }}>
              Who We Are
            </p>
            <h2 className="heading text-4xl font-bold leading-tight md:text-5xl" style={{ color: "var(--fg)" }}>
              We Don't Just Consult. <br />
              <span className="indigo-gradient">We Think With You.</span>
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
              WeThink is a UAE-based consulting and IT firm that partners with startups, SMEs, and enterprises to unlock their full potential. We sit at the intersection of technology, brand, and strategy.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
              Whether you're launching your first venture or scaling an established business, our multidisciplinary team brings the thinking power to turn vision into measurable results.
            </p>

            <div className="space-y-3 pt-2">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 rounded-xl p-4"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "rgba(99,102,241,0.15)" }}
                  >
                    <Icon size={18} style={{ color: "var(--p2)" }} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--fg)" }}>{title}</p>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
