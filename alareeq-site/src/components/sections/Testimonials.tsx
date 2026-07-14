import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "../../i18n";

export function Testimonials() {
  const { t } = useLang();
  const shouldReduce = useReducedMotion();
  const items = t.testimonials.items;
  const total = items.length;

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number>(0);

  const goTo = useCallback(
    (idx: number, dir: number) => {
      setDirection(dir);
      setActive((idx + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(active + 1, 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1, -1), [active, goTo]);

  useEffect(() => {
    if (shouldReduce) return;
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, shouldReduce]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!shouldReduce) timerRef.current = setInterval(next, 5000);
  };

  const handlePrev = () => { resetTimer(); prev(); };
  const handleNext = () => { resetTimer(); next(); };
  const handleDot  = (i: number) => { resetTimer(); goTo(i, i > active ? 1 : -1); };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) handleNext();
      else handlePrev();
    }
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const { name, role, text } = items[active];

  return (
    <section className="relative py-28 bg-[hsl(222,40%,6%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))]">
            {t.testimonials.badge}
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            {t.testimonials.h1} <span className="gold-gradient">{t.testimonials.h2}</span>
          </h2>
        </motion.div>

        {/* ── MOBILE CAROUSEL (single card) ── */}
        <div className="block md:hidden">
          <div
            className="relative overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col gap-5 rounded-2xl border border-[hsl(var(--primary)/0.35)] bg-[hsl(var(--card)/0.7)] p-7 backdrop-blur"
              >
                <Quote className="h-8 w-8 text-[hsl(var(--primary)/0.3)]" />
                <p className="flex-1 text-sm leading-relaxed text-[hsl(var(--foreground)/0.7)]">"{text}"</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[hsl(43,56%,55%)] text-[hsl(43,56%,55%)]" />
                  ))}
                </div>
                <div className="flex items-center gap-3 border-t border-[hsl(var(--border)/0.4)] pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.15)] font-serif text-sm font-bold text-[hsl(var(--primary))]">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{name}</p>
                    <p className="text-xs text-[hsl(var(--foreground)/0.55)]">{role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile controls */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] text-[hsl(var(--foreground)/0.7)] transition-colors hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`min-h-[48px] min-w-[20px] flex items-center justify-center`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === active
                        ? "h-2 w-6 bg-[hsl(var(--primary))]"
                        : "h-2 w-2 bg-[hsl(var(--foreground)/0.2)]"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] text-[hsl(var(--foreground)/0.7)] transition-colors hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ── DESKTOP 3-CARD ARC ── */}
        <div className="hidden md:block" style={{ perspective: "1200px" }}>
          <div
            className="relative flex items-center justify-center gap-0"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Arrow buttons */}
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="absolute left-0 z-20 flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.7)] text-[hsl(var(--foreground)/0.7)] backdrop-blur transition-colors hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="absolute right-0 z-20 flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.7)] text-[hsl(var(--foreground)/0.7)] backdrop-blur transition-colors hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Cards */}
            <div className="mx-12 flex w-full items-center justify-center" style={{ height: "340px" }}>
              {items.map((item, i) => {
                const offset = ((i - active) % total + total) % total;
                const normalizedOffset = offset > total / 2 ? offset - total : offset;

                if (Math.abs(normalizedOffset) > 1) return null;

                const isCenter = normalizedOffset === 0;
                const isLeft = normalizedOffset === -1;
                const isRight = normalizedOffset === 1;

                const translateX = isCenter ? "0px" : isLeft ? "-75%" : "75%";
                const scale = isCenter ? 1 : 0.85;
                const opacity = isCenter ? 1 : 0.35;
                const rotateY = isCenter ? 0 : isLeft ? 15 : -15;
                const zIndex = isCenter ? 10 : 1;

                return (
                  <motion.div
                    key={item.name}
                    animate={{
                      x: translateX,
                      scale,
                      opacity,
                      rotateY,
                      zIndex,
                    }}
                    transition={{
                      duration: shouldReduce ? 0 : 0.45,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    onClick={() => {
                      if (!isCenter) {
                        resetTimer();
                        goTo(i, isRight ? 1 : -1);
                      }
                    }}
                    className={`absolute w-[min(380px,80vw)] flex flex-col gap-5 rounded-2xl border bg-[hsl(var(--card)/0.7)] p-7 backdrop-blur transition-shadow ${
                      isCenter
                        ? "border-[hsl(var(--primary)/0.45)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-default"
                        : "border-[hsl(var(--border)/0.4)] cursor-pointer hover:border-[hsl(var(--primary)/0.3)]"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Quote className="h-8 w-8 text-[hsl(var(--primary)/0.3)]" />
                    <p className="flex-1 text-sm leading-relaxed text-[hsl(var(--foreground)/0.7)]">"{item.text}"</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-[hsl(43,56%,55%)] text-[hsl(43,56%,55%)]" />
                      ))}
                    </div>
                    <div className="flex items-center gap-3 border-t border-[hsl(var(--border)/0.4)] pt-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.15)] font-serif text-sm font-bold text-[hsl(var(--primary))]">
                        {item.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{item.name}</p>
                        <p className="text-xs text-[hsl(var(--foreground)/0.55)]">{item.role}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Desktop dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="flex min-h-[48px] min-w-[20px] items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === active
                      ? "h-2 w-6 bg-[hsl(var(--primary))]"
                      : "h-2 w-2 bg-[hsl(var(--foreground)/0.2)]"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
