import { motion } from "framer-motion";

export function AnimatedCrane({ className = "" }: { className?: string }) {
  return (
    <div className={`relative select-none ${className}`} style={{ width: 180, height: 260 }}>
      <svg viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">

        {/* ── MAST (vertical tower) ── */}
        <rect x="78" y="80" width="24" height="170" fill="hsl(43,56%,35%)" rx="2" />
        {/* Mast cross-bracing */}
        {[0,1,2,3,4,5].map(i => (
          <line key={i}
            x1="78" y1={90 + i * 27} x2="102" y2={90 + i * 27 + 13}
            stroke="hsl(43,56%,50%)" strokeWidth="1.5" />
        ))}
        {[0,1,2,3,4,5].map(i => (
          <line key={i}
            x1="102" y1={90 + i * 27} x2="78" y2={90 + i * 27 + 13}
            stroke="hsl(43,56%,50%)" strokeWidth="1.5" />
        ))}

        {/* ── BASE ── */}
        <rect x="60" y="244" width="60" height="12" fill="hsl(43,56%,30%)" rx="2" />
        <rect x="50" y="252" width="80" height="6" fill="hsl(43,56%,25%)" rx="2" />

        {/* ── OPERATOR CABIN ── */}
        <rect x="80" y="66" width="24" height="20" fill="hsl(200,60%,30%)" rx="2" />
        <rect x="83" y="69" width="8" height="8" fill="hsl(200,80%,65%)" rx="1" opacity="0.9" />
        <rect x="93" y="69" width="8" height="8" fill="hsl(200,80%,65%)" rx="1" opacity="0.9" />

        {/* ── JACKING COLLAR ── */}
        <rect x="74" y="78" width="32" height="6" fill="hsl(43,56%,28%)" rx="1" />

      </svg>

      {/* ── BOOM ARM (rotates slightly) ── */}
      <motion.div
        className="absolute"
        style={{ top: 12, left: 0, transformOrigin: "90px 20px" }}
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 180 40" fill="none" width="180" height="40">
          {/* Long boom to left */}
          <rect x="0" y="16" width="90" height="8" fill="hsl(43,56%,35%)" rx="2" />
          {/* Short counter-jib to right */}
          <rect x="90" y="16" width="50" height="8" fill="hsl(43,56%,35%)" rx="2" />

          {/* Boom lattice bracing */}
          {[0,1,2,3,4,5].map(i => (
            <line key={i}
              x1={8 + i * 14} y1="16" x2={14 + i * 14} y2="24"
              stroke="hsl(43,56%,55%)" strokeWidth="1.2" />
          ))}
          {[0,1,2,3,4,5].map(i => (
            <line key={i}
              x1={14 + i * 14} y1="16" x2={8 + i * 14} y2="24"
              stroke="hsl(43,56%,55%)" strokeWidth="1.2" />
          ))}

          {/* Mast head peak */}
          <polygon points="87,0 93,0 95,16 85,16" fill="hsl(43,56%,40%)" />

          {/* Pendant cables from peak to boom tip */}
          <line x1="90" y1="2" x2="4" y2="16" stroke="hsl(43,56%,60%)" strokeWidth="1" />
          <line x1="90" y1="2" x2="45" y2="16" stroke="hsl(43,56%,60%)" strokeWidth="1" />

          {/* Counter-weight cable */}
          <line x1="90" y1="2" x2="132" y2="16" stroke="hsl(43,56%,60%)" strokeWidth="1" />

          {/* Counter-weight block */}
          <rect x="132" y="24" width="14" height="12" fill="hsl(43,56%,25%)" rx="1" />

          {/* Warning light on peak */}
          <circle cx="90" cy="2" r="3" fill="#ef4444" />
        </svg>
      </motion.div>

      {/* ── TROLLEY on boom ── */}
      <motion.div
        className="absolute"
        style={{ top: 25 }}
        animate={{ left: [20, 60, 20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 16 8" width="16" height="8" fill="none">
          <rect x="1" y="1" width="14" height="6" fill="hsl(43,56%,50%)" rx="1" />
        </svg>
      </motion.div>

      {/* ── HOIST ROPE + HOOK (moves up/down with trolley x) ── */}
      <motion.div
        className="absolute"
        style={{ top: 33 }}
        animate={{ left: [27, 67, 27] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          animate={{ top: [0, 60, 20, 80, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Rope */}
          <motion.svg
            viewBox="0 0 4 90" width="4"
            animate={{ height: [40, 100, 60, 110, 40] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            fill="none"
          >
            <line x1="2" y1="0" x2="2" y2="90" stroke="hsl(43,56%,55%)" strokeWidth="1.5" />
          </motion.svg>
          {/* Hook */}
          <svg viewBox="0 0 14 16" width="14" height="16" fill="none" style={{ marginLeft: -5 }}>
            <path d="M7 0 L7 8 Q7 14 2 14 Q0 14 0 11 Q0 8 3 8" stroke="hsl(43,56%,60%)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── WARNING LIGHT blink ── */}
      <motion.div
        className="absolute rounded-full"
        style={{ top: 10, left: 87, width: 6, height: 6, background: "#ef4444" }}
        animate={{ opacity: [1, 0.1, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
