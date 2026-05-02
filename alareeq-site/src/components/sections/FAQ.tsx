import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What types of projects does Albina Alareeq handle?",
    a: "We handle residential, commercial, and mixed-use construction across Abu Dhabi — from civil works and structural builds to MEP installations, interior fit-outs, and ongoing general maintenance.",
  },
  {
    q: "Are you currently accepting new projects?",
    a: "Yes. We are actively taking on new projects in Abu Dhabi and surrounding Emirates. Contact us via WhatsApp or email to discuss your requirements and timeline.",
  },
  {
    q: "How do you ensure quality on-site?",
    a: "Every project is supervised by a dedicated site engineer with daily quality checkpoints. We use certified materials that meet UAE municipality standards and conduct third-party inspections at key milestones.",
  },
  {
    q: "Do you provide maintenance services after project completion?",
    a: "Yes. General maintenance is a core service we offer — including preventive maintenance contracts, emergency repairs, and facility management support.",
  },
  {
    q: "What is your typical project timeline?",
    a: "Timelines vary based on scope and complexity. After an initial consultation we provide a detailed milestone schedule. We are known for meeting — and often beating — agreed deadlines.",
  },
  {
    q: "How can I get a quote?",
    a: "Reach us on WhatsApp at +971 56 378 07 07 or email albina.alareeq@gmail.com with your project details. We respond within 24 hours with an initial assessment.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-28 bg-[hsl(222,40%,6.5%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 bottom-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))]">
            FAQ
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            Common <span className="gold-gradient">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.5)] backdrop-blur transition-colors hover:border-[hsl(var(--primary)/0.3)]"
            >
              <button
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-[hsl(var(--foreground))]">{q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 text-[hsl(var(--primary))]"
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[hsl(var(--foreground)/0.55)]">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
