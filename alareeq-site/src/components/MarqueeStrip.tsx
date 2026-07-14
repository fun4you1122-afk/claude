import { useLang } from "../i18n";

// Giant outlined display type drifting across the page — an editorial device
// used by high-end architecture/contracting firms. Pure CSS animation
// (compositor-only transform), paused automatically under reduced motion.
export function MarqueeStrip() {
  const { lang } = useLang();
  const words =
    lang === "ar"
      ? ["مقاولات عامة", "أعمال مدنية", "خدمات MEP", "تشطيبات داخلية", "منازل ذكية"]
      : ["General Contracting", "Civil Works", "MEP Services", "Interior Fit-Out", "Smart Homes"];

  // Two identical rows: the animation slides -50%, so the copy takes over
  // seamlessly for an infinite loop.
  const Row = () => (
    <div className="flex items-center shrink-0">
      {words.map((w) => (
        <span
          key={w}
          className="flex items-center font-serif text-[clamp(2.6rem,7vw,5.5rem)] font-black uppercase leading-none"
        >
          <span className="text-outline-gold px-5 whitespace-nowrap">{w}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="mx-2 shrink-0">
            <path d="M9 0l2.2 6.8H18l-5.6 4.1 2.1 6.8L9 13.6l-5.5 4.1 2.1-6.8L0 6.8h6.8z" fill="rgba(201,168,76,0.45)" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div
      dir="ltr"
      aria-hidden
      className="relative overflow-hidden border-y border-[hsl(var(--border)/0.3)] bg-[hsl(222,47%,3.5%)] py-8"
    >
      <div className="marquee-row flex">
        <Row />
        <Row />
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[hsl(222,47%,3.5%)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[hsl(222,47%,3.5%)] to-transparent" />
    </div>
  );
}
