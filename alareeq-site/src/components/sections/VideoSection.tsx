import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";

export function VideoSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-24 bg-[hsl(222,40%,5%)] overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.04)] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))]">
            <Play className="h-3 w-3 fill-current" />
            In Action
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            Where Vision Meets <span className="gold-gradient">Concrete</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(var(--foreground)/0.5)]">
            Watch the scale, precision, and dedication that defines every Albina Alareeq project
          </p>
        </motion.div>

        {/* Video wrapper with parallax scale */}
        <motion.div
          style={{ scale, opacity }}
          className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border)/0.4)] shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
        >
          {/* Gold corner accents */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-12 w-12 border-l-2 border-t-2 border-[hsl(var(--primary)/0.6)] rounded-tl-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-12 w-12 border-r-2 border-t-2 border-[hsl(var(--primary)/0.6)] rounded-tr-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-12 w-12 border-b-2 border-l-2 border-[hsl(var(--primary)/0.6)] rounded-bl-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 z-10 h-12 w-12 border-b-2 border-r-2 border-[hsl(var(--primary)/0.6)] rounded-br-3xl" />

          {/* YouTube embed — clip extra 60px top/bottom to hide title bar & watermark */}
          <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/cHw82ti-Xx4?autoplay=1&mute=1&loop=1&playlist=cHw82ti-Xx4&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0"
              title="Abu Dhabi Construction Timelapse"
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              className="absolute w-full"
              style={{
                border: "none",
                /* Oversized + shifted up to crop YouTube chrome (title bar top, logo bottom) */
                height: "calc(100% + 120px)",
                top: "-60px",
                left: 0,
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Transparent click-blocker so no YouTube interaction is possible */}
          <div className="absolute inset-0 z-10" style={{ pointerEvents: "none" }} />

          {/* Bottom text overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
            <p className="text-xs font-medium uppercase tracking-[3px] text-[hsl(var(--primary))]">
              Albina Alareeq · Abu Dhabi, UAE
            </p>
            <p className="mt-1 text-sm text-white/60">
              Excellence in construction and general maintenance
            </p>
          </div>
        </motion.div>

        {/* Stats row below video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-3 gap-4"
        >
          {[
            { value: "2+", label: "Active Projects" },
            { value: "Abu Dhabi", label: "Primary Market" },
            { value: "100%", label: "Client Satisfaction" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--card)/0.5)] p-5 text-center backdrop-blur"
            >
              <p className="font-serif text-2xl font-bold text-[hsl(var(--primary))]">{value}</p>
              <p className="mt-1 text-xs text-[hsl(var(--foreground)/0.5)] uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
