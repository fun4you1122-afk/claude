import { useRef } from "react";
import { motion } from "framer-motion";

const partners = [
  "Abu Dhabi Municipality",
  "ADNOC",
  "Aldar Properties",
  "Mubadala",
  "TDIC",
  "Emaar",
  "Arabtec",
  "ISO 9001 Certified",
];

export function Partners() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-16 bg-[hsl(222,40%,7%)]" style={{ overflow: "hidden" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.2)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.2)] to-transparent" />

      <div className="mx-auto max-w-6xl px-6 mb-8 text-center">
        <p className="text-xs uppercase tracking-[4px] text-[hsl(var(--foreground)/0.35)]">
          Trusted & Recognized By
        </p>
      </div>

      {/* Scrolling marquee */}
      <div className="relative" style={{ maskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)" }}>
        <motion.div
          ref={trackRef}
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...partners, ...partners].map((name, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-3 rounded-full border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--card)/0.5)] px-6 py-3 text-sm font-medium text-[hsl(var(--foreground)/0.5)] backdrop-blur"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary)/0.6)]" />
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
