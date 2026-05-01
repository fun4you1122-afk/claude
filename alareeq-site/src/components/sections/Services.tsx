import { motion } from "framer-motion";
import { Building2, Layers, Zap, Paintbrush, BarChart3, Wrench } from "lucide-react";

const services = [
  { num: "01", icon: Building2, title: "General Contracting", desc: "Complete construction from groundwork to handover — residential, commercial, and mixed-use projects built to the highest UAE standards.", tags: ["Residential", "Commercial"] },
  { num: "02", icon: Layers,    title: "Civil Works",         desc: "Structural concrete, deep foundations, earthworks and large-scale infrastructure for urban and industrial projects across Abu Dhabi.", tags: ["Structural", "Foundation"] },
  { num: "03", icon: Zap,       title: "MEP Services",        desc: "Mechanical, Electrical & Plumbing installations by certified engineers. From HVAC systems to full electrical infrastructure.", tags: ["Electrical", "HVAC", "Plumbing"] },
  { num: "04", icon: Paintbrush,title: "Interior Fit-Out",    desc: "Premium interior contracting and bespoke finishing works for luxury residences, offices, retail spaces, and hospitality venues.", tags: ["Luxury", "Bespoke"] },
  { num: "05", icon: BarChart3,  title: "Project Management", desc: "End-to-end oversight of timelines, budgets, subcontractors, and quality assurance. We manage complexity so you don't have to.", tags: ["Planning", "QA/QC"] },
  { num: "06", icon: Wrench,    title: "Renovation & Maintenance", desc: "Structural renovations, facade upgrades, and scheduled facility maintenance. We breathe new life into existing properties.", tags: ["Renovation", "Upkeep"] },
];

export function Services() {
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
            What We Do
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            Our <span className="gold-gradient">Services</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(var(--foreground)/0.5)]">
            Hover each card to explore the full scope of what we offer
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40, rotateY: -12 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] p-7 backdrop-blur transition-colors hover:border-[hsl(var(--primary)/0.4)]"
            >
              {/* Glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-[hsl(43,56%,55%,0.07)] to-transparent" />

              <div className="relative">
                <span className="absolute -right-2 -top-2 font-serif text-5xl font-black text-[hsl(var(--primary)/0.07)] transition-colors group-hover:text-[hsl(var(--primary)/0.13)]">
                  {svc.num}
                </span>

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] transition-colors group-hover:bg-[hsl(var(--primary)/0.18)]">
                  <svc.icon className="h-5 w-5" />
                </div>

                <h3 className="mb-3 font-semibold text-[hsl(var(--foreground))]">{svc.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-[hsl(var(--foreground)/0.55)]">{svc.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {svc.tags.map((t) => (
                    <span key={t} className="rounded-full border border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--primary)/0.08)] px-3 py-1 text-xs text-[hsl(var(--primary))]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-[hsl(var(--primary))] transition-transform group-hover:translate-x-1.5 text-lg">→</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
