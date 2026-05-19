import { motion } from "framer-motion";
import { Building2, Layers, Zap, Paintbrush, BarChart3, Wrench } from "lucide-react";
import { useState } from "react";
import { useLang } from "../../i18n";

const icons = [Building2, Layers, Zap, Paintbrush, BarChart3, Wrench];

type ServiceItem = { num: string; title: string; desc: string; tags: readonly string[] };

function ServiceCard({ svc, Icon, i }: { svc: ServiceItem; Icon: React.ElementType; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const { lang } = useLang();
  const isRtl = lang === "ar";

  const flipAngle = isRtl ? -180 : 180;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: isRtl ? 12 : -12 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ perspective: "1200px" }}
      className="relative h-72 cursor-pointer select-none"
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      aria-label={svc.title}
    >
      <motion.div
        animate={{ rotateY: flipped ? flipAngle : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%", position: "relative" }}
      >
        {/* ── FRONT ── */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.65)] p-7 backdrop-blur transition-colors hover:border-[hsl(var(--primary)/0.3)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(43,56%,55%,0.05)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl" />
          <div>
            <span className="absolute right-4 top-3 font-serif text-6xl font-black text-[hsl(var(--primary)/0.07)]">
              {svc.num}
            </span>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-semibold text-[hsl(var(--foreground))]">{svc.title}</h3>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {svc.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--primary)/0.08)] px-3 py-1 text-xs text-[hsl(var(--primary))]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-widest text-[hsl(var(--foreground)/0.3)]">
              Tap to explore →
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: `rotateY(${flipAngle}deg)`,
          }}
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-[hsl(var(--primary)/0.35)] p-7"
        >
          {/* gold gradient background */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(43,30%,10%)] via-[hsl(var(--card))] to-[hsl(222,47%,6%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_right,hsl(43,56%,55%,0.12),transparent_60%)]" />

          <div className="relative">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))]">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-[hsl(var(--primary))]">{svc.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-[hsl(var(--foreground)/0.75)]">{svc.desc}</p>
          </div>

          <div className="relative mt-2 flex flex-wrap gap-1.5">
            {svc.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[hsl(var(--primary)/0.2)] px-2.5 py-0.5 text-[10px] text-[hsl(var(--primary)/0.7)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="relative py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-[400px] w-[400px] rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[120px]" />
        <div className="absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[hsl(213,60%,42%,0.03)] blur-[120px]" />
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
            {t.services.badge}
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            {t.services.h1} <span className="gold-gradient">{t.services.h2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(var(--foreground)/0.5)]">{t.services.sub}</p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc as ServiceItem} Icon={icons[i]} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
