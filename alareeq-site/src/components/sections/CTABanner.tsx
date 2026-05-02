import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(222,47%,8%) 0%, hsl(222,47%,5%) 50%, hsl(222,47%,8%) 100%)",
        }}
      />
      {/* Gold glow blobs */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.06)] blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.04)] blur-[80px]" />
      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.4)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.4)] to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[4px] text-[hsl(var(--primary))]">
            Start Your Project
          </p>
          <h2 className="font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6">
            Let's Build Something{" "}
            <span className="gold-gradient">Remarkable</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[hsl(var(--foreground)/0.55)] text-lg">
            Bring us your vision. We'll bring the expertise, the team, and the commitment to make it stand — built to last, built with pride.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href="https://wa.me/971563780707"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-[hsl(var(--background))] shadow-[0_0_30px_hsl(43,56%,55%,0.3)] transition-all hover:shadow-[0_0_40px_hsl(43,56%,55%,0.5)]"
              style={{ background: "linear-gradient(135deg,#a07820,#c9a84c)" }}
            >
              <Phone className="h-4 w-4" />
              WhatsApp Us Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="mailto:albina.alareeq@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.08)] px-8 py-4 text-sm font-semibold text-[hsl(var(--primary))] backdrop-blur transition-all hover:bg-[hsl(var(--primary)/0.15)]"
            >
              Send an Email
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
