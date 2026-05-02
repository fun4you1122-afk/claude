import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg,#a07820,#c9a84c,#e8c96a)",
      }}
    />
  );
}
