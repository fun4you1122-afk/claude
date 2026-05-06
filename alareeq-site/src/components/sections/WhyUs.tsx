import { motion } from "framer-motion";
import { ShieldCheck, Clock4, Award, Wrench, Users, TrendingUp } from "lucide-react";
import { useLang } from "../../i18n";

const icons = [ShieldCheck, Clock4, Award, Wrench, Users, TrendingUp];

export function WhyUs() {
  const { t } = useLang();

  return (
    <section className="relative py-28 bg-[hsl(222,40%,7%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-[500px] w-[400px] -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[100px]" />
        <div className="absolute right-0 top-1/2 h-[500px] w-[400px] -translate-y-1/2 rounded-full bg-[hsl(213,60%,42%,0.03)] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))]">
            {t.whyUs.badge}
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            {t.whyUs.h1} <span className="gold-gradient">{t.whyUs.h2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(var(--foreground)/0.5)]">{t.whyUs.sub}</p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.whyUs.reasons.map(({ title, desc }, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] p-6 backdrop-blur transition-all duration-300 hover:border-[hsl(var(--primary)/0.35)]"
              >
                <span className="absolute right-5 top-5 font-serif text-5xl font-bold text-[hsl(var(--primary)/0.06)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] transition-colors group-hover:bg-[hsl(var(--primary)/0.18)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-[hsl(var(--foreground)/0.55)]">{desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
