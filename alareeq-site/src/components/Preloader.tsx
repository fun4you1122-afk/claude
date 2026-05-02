import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<string>("fill");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 1800);
    const t2 = setTimeout(onDone, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "out" ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "out" ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "hsl(222,47%,4%)" }}
          onAnimationComplete={() => { if (phase === "out") onDone(); }}
        >
          {/* Gold progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-0.5"
            style={{ background: "linear-gradient(90deg,#a07820,#c9a84c,#e8c96a)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* Logo */}
          <motion.img
            src="/logo.png"
            alt="Albina Alareeq"
            className="w-64"
            style={{ mixBlendMode: "screen" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Tagline */}
          <motion.p
            className="mt-6 text-xs uppercase tracking-[5px] text-[hsl(43,56%,55%)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Building Excellence
          </motion.p>

          {/* Animated dots */}
          <div className="mt-8 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-[hsl(43,56%,55%)]"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
