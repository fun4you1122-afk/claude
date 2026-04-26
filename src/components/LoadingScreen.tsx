import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const companyName = 'Albina Alareeq';

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setProgress(Math.min((current / steps) * 100, 100));
      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 500);
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-charcoal"
        >
          {/* Animated Crane SVG */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8"
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Tower crane base */}
              <rect x="54" y="70" width="12" height="45" rx="2" fill="#C9A84C" />
              {/* Horizontal boom */}
              <rect x="20" y="28" width="80" height="8" rx="2" fill="#1e6aa3" />
              {/* Counter jib */}
              <rect x="20" y="28" width="30" height="8" rx="2" fill="#1a5c8f" />
              {/* Mast above base */}
              <rect x="57" y="36" width="6" height="34" rx="1" fill="#C9A84C" />
              {/* Jib top triangle */}
              <polygon points="60,10 100,28 60,28" fill="#C9A84C" opacity="0.6" />
              {/* Counter weight */}
              <rect x="20" y="34" width="14" height="10" rx="2" fill="#2a7acc" />
              {/* Hook cable */}
              <line x1="88" y1="36" x2="88" y2="65" stroke="#C9A84C" strokeWidth="2" />
              {/* Hook */}
              <path d="M84 65 Q84 72 90 72 Q96 72 96 66" stroke="#C9A84C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Load box */}
              <rect x="82" y="72" width="14" height="10" rx="2" fill="#C9A84C" opacity="0.8" />
              {/* Base legs */}
              <line x1="54" y1="112" x2="40" y2="120" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" />
              <line x1="66" y1="112" x2="80" y2="120" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Company name letter reveal */}
          <div className="mb-2 flex overflow-hidden">
            {companyName.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: 'easeOut' }}
                className={`text-2xl md:text-3xl font-playfair font-bold text-white ${char === ' ' ? 'mx-1' : ''}`}
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-gold text-sm font-inter tracking-widest uppercase mb-10"
          >
            Contracting & Maintenance
          </motion.p>

          {/* Progress bar container */}
          <div className="w-64 md:w-80 h-1 bg-charcoal-medium rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gold rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Progress percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3 text-gold/60 text-xs font-inter"
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
