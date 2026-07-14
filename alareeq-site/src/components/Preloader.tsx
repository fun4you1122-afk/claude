import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Overlay splash. The app mounts (and starts downloading assets) underneath;
// this only covers it visually. Lifts when the page has loaded, after a short
// minimum so the brand registers — never later than MAX.
const MIN_MS = 900;
const MAX_MS = 2000;

export function Preloader({ onDone }: { onDone?: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setVisible(false);
    };

    const minTimer = setTimeout(() => {
      if (document.readyState === "complete") finish();
      else window.addEventListener("load", finish, { once: true });
    }, MIN_MS);
    const maxTimer = setTimeout(finish, MAX_MS);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => onDone?.()}>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "hsl(222,47%,4%)" }}
        >
          {/* Gold progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-0.5"
            style={{ background: "linear-gradient(90deg,#a07820,#c9a84c,#e8c96a)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />

          {/* Logo */}
          <motion.img
            src={`${import.meta.env.BASE_URL}logo.png`}
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
            transition={{ delay: 0.4, duration: 0.6 }}
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
      )}
    </AnimatePresence>
  );
}
