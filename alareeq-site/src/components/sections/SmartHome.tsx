import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  Wifi, Shield, Thermometer, Tv, Home, Check, ArrowRight, Zap,
} from "lucide-react";
import { useLang } from "../../i18n";

/* ─── Chapter data ─────────────────────────────────────────────────────────── */
type Chapter = {
  id: string;
  num: string;
  Icon: React.ElementType;
  badge: string; badgeAr: string;
  title: string; titleAr: string;
  sub: string;   subAr: string;
  image: string;
  accent: string;
  features: string[]; featuresAr: string[];
};

const CHAPTERS: Chapter[] = [
  {
    id: "overview", num: "01", Icon: Home,
    badge: "Smart Villa", badgeAr: "فيلا ذكية",
    title: "Your Home,\nReimagined", titleAr: "منزلك\nمُعاد تصوّره",
    sub: "Complete smart-home integration for Abu Dhabi's finest residential villas — seamlessly blending cutting-edge technology with luxury living, all from one app.",
    subAr: "تكامل شامل للمنزل الذكي مصمم لأرقى الفلل في أبوظبي — يمزج بسلاسة بين التكنولوجيا المتطورة والحياة الفاخرة من تطبيق واحد.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=85",
    accent: "#c9a84c",
    features: ["Single-app unified control", "Voice & gesture commands", "Remote access from anywhere", "Works with existing wiring"],
    featuresAr: ["تحكم موحد عبر تطبيق واحد", "أوامر صوتية وإيمائية", "وصول عن بُعد من أي مكان", "يعمل مع الأسلاك الحالية"],
  },
  {
    id: "lighting", num: "02", Icon: Zap,
    badge: "Smart Lighting", badgeAr: "إضاءة ذكية",
    title: "Adaptive\nIllumination", titleAr: "إضاءة\nتكيّفية",
    sub: "Precision light control for every mood, moment, and room. From sunrise scenes to cinematic evenings — your villa responds to you before you even ask.",
    subAr: "تحكم دقيق في الإضاءة لكل مزاج ولحظة وغرفة. من مشاهد الفجر إلى الأمسيات السينمائية — فيلتك تستجيب لك قبل أن تطلب.",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&auto=format&fit=crop&q=85",
    accent: "#f5c842",
    features: ["1,000+ colour & warmth scenes", "Motion-triggered lighting", "Circadian rhythm sync", "Energy usage dashboard"],
    featuresAr: ["أكثر من 1000 مشهد ضوئي", "إضاءة تُفعَّل بالحركة", "مزامنة الإيقاع اليومي", "لوحة استهلاك الطاقة"],
  },
  {
    id: "security", num: "03", Icon: Shield,
    badge: "Smart Security", badgeAr: "أمان ذكي",
    title: "Always\nProtected", titleAr: "حماية\nدائمة",
    sub: "Military-grade security wrapped in an elegant interface. Monitor, control, and protect your villa 24/7 — from any device, anywhere in the world.",
    subAr: "أمان بمستوى عسكري مغلف بواجهة أنيقة. راقب وتحكم وأمّن فيلتك على مدار الساعة — من أي جهاز في أي مكان بالعالم.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=85",
    accent: "#4a90d9",
    features: ["4K AI-powered cameras", "Biometric smart locks", "Instant intrusion alerts", "Visitor management & video intercom"],
    featuresAr: ["كاميرات 4K بالذكاء الاصطناعي", "أقفال ذكية بيومترية", "تنبيهات اقتحام فورية", "إدارة الزوار والاتصال المرئي"],
  },
  {
    id: "climate", num: "04", Icon: Thermometer,
    badge: "Climate Control", badgeAr: "تحكم مناخي",
    title: "Perfect\nTemperature", titleAr: "درجة الحرارة\nالمثالية",
    sub: "Intelligent climate zones that learn your preferences — optimised for Abu Dhabi's extreme heat to deliver year-round comfort with zero waste.",
    subAr: "مناطق مناخية ذكية تتعلم تفضيلاتك — محسّنة لحرارة أبوظبي الشديدة لتوفير راحة على مدار السنة بلا هدر.",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&auto=format&fit=crop&q=85",
    accent: "#4adbb5",
    features: ["Multi-zone AC control", "Auto-scheduling by room", "Air quality & humidity sensors", "Up to 35% energy savings"],
    featuresAr: ["تحكم بمناطق تكييف متعددة", "جدولة تلقائية بالغرفة", "مستشعرات جودة الهواء", "توفير حتى 35% في الطاقة"],
  },
  {
    id: "entertainment", num: "05", Icon: Tv,
    badge: "Entertainment", badgeAr: "ترفيه منزلي",
    title: "Cinematic\nLiving", titleAr: "معيشة\nسينمائية",
    sub: "Whole-home audio and video that disappears into the architecture. Every room becomes a stage — at the press of a button or the sound of your voice.",
    subAr: "صوت وفيديو لكامل المنزل يتلاشى في المعمار. كل غرفة تصبح مسرحاً — بضغطة زر أو بصوتك.",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&auto=format&fit=crop&q=85",
    accent: "#b06cff",
    features: ["Whole-home audio distribution", "4K / 8K home cinema", "Smart curtains & blackout blinds", "One-touch 'Movie Mode' scene"],
    featuresAr: ["توزيع صوت لكامل المنزل", "سينما منزلية 4K/8K", "ستائر وشاشات حجب ذكية", "وضع الفيلم بلمسة واحدة"],
  },
];

/* ─── Animated SVG floor plan (section header decoration) ─────────────────── */
function FloorPlan() {
  const rooms = [
    { x: 4,  y: 4,  w: 56, h: 44, delay: 0   },
    { x: 64, y: 4,  w: 56, h: 44, delay: 0.4 },
    { x: 4,  y: 52, w: 36, h: 44, delay: 0.8 },
    { x: 44, y: 52, w: 36, h: 44, delay: 1.2 },
    { x: 84, y: 52, w: 36, h: 44, delay: 1.6 },
  ];
  return (
    <svg viewBox="0 0 124 100" className="w-44 h-36 opacity-40" aria-hidden>
      {rooms.map((r, i) => (
        <motion.rect
          key={i}
          x={r.x} y={r.y} width={r.w} height={r.h}
          rx="3"
          fill="rgba(201,168,76,0.06)"
          stroke="rgba(201,168,76,0.5)"
          strokeWidth="0.8"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.35, 0.7] }}
          transition={{ duration: 2.5, delay: r.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Connecting corridors */}
      <line x1="60" y1="26" x2="64" y2="26" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />
      <line x1="62" y1="4"  x2="62" y2="96" stroke="rgba(201,168,76,0.15)" strokeWidth="0.4" strokeDasharray="3 3" />
    </svg>
  );
}

/* ─── Phone app mockup ────────────────────────────────────────────────────── */
function AppMockup({ chapter }: { chapter: Chapter }) {
  const { Icon } = chapter;
  return (
    <div
      className="relative w-36 rounded-[1.6rem] border-2 border-[hsl(var(--border))] bg-[hsl(222,47%,8%)] shadow-2xl overflow-hidden"
      style={{ boxShadow: `0 24px 60px ${chapter.accent}22` }}
    >
      {/* Status bar */}
      <div className="flex justify-between px-4 pt-3 pb-1 text-[9px] text-[hsl(var(--foreground)/0.35)]">
        <span>9:41</span>
        <span>▮▮▮</span>
      </div>
      {/* App header */}
      <div className="px-4 pb-2">
        <p className="text-[9px] text-[hsl(var(--foreground)/0.4)]">SmartVilla</p>
        <p className="text-xs font-semibold text-[hsl(var(--foreground)/0.9)]">Your Home</p>
      </div>
      {/* Main control */}
      <div className="mx-3 mb-2.5 flex flex-col items-center justify-center rounded-2xl py-4"
        style={{ background: `${chapter.accent}18` }}>
        <motion.div
          animate={{ scale: [1, 1.08, 1], boxShadow: [`0 0 0 0 ${chapter.accent}40`, `0 0 0 8px ${chapter.accent}00`] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-2 flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: chapter.accent }}
        >
          <Icon className="h-5 w-5 text-black" />
        </motion.div>
        <p className="text-[9px] font-semibold" style={{ color: chapter.accent }}>Active</p>
      </div>
      {/* Grid tiles */}
      <div className="grid grid-cols-3 gap-1.5 px-3 pb-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-[hsl(var(--card)/0.9)] flex items-center justify-center">
            <motion.div
              animate={i === 0 ? { opacity: [0.6, 1, 0.6] } : {}}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="h-3 w-3 rounded-full"
              style={{ background: i === 0 ? chapter.accent : "hsl(var(--border))" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Single chapter panel ────────────────────────────────────────────────── */
function ChapterPanel({ chapter, index }: { chapter: Chapter; index: number }) {
  const { lang } = useLang();
  const isAr   = lang === "ar";
  const reduce  = useReducedMotion();
  const isEven  = index % 2 === 0;

  const panelRef = useRef<HTMLDivElement>(null);
  const inView   = useInView(panelRef, { once: true, amount: 0.25 });

  const title    = isAr ? chapter.titleAr : chapter.title;
  const sub      = isAr ? chapter.subAr   : chapter.sub;
  const features = isAr ? chapter.featuresAr : chapter.features;
  const badge    = isAr ? chapter.badgeAr : chapter.badge;
  const { Icon } = chapter;

  return (
    <div
      ref={panelRef}
      id={`smart-${chapter.id}`}
      className="relative overflow-hidden"
      style={{ background: "hsl(222,47%,4%)" }}
    >
      {/* ── MOBILE layout: image on top, content below ── */}
      <div className="md:hidden">
        {/* Image strip */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={chapter.image}
            alt={title.replace("\n", " ")}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.45) saturate(0.75)" }}
            initial={reduce ? {} : { scale: 1.08 }}
            animate={inView ? { scale: 1 } : { scale: 1.08 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(222,47%,4%)]" />
          {/* Badge overlay on image */}
          <div className="absolute bottom-4 left-4">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[2px]"
              style={{ borderColor: `${chapter.accent}55`, color: chapter.accent, background: `hsl(222,47%,4%)cc` }}
            >
              <Icon className="h-3 w-3" />
              {badge}
            </div>
          </div>
        </div>

        {/* Mobile content */}
        <motion.div
          className="px-5 pb-12 pt-6"
          initial={reduce ? {} : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-4 font-serif text-3xl font-bold leading-tight">
            {title.split("\n").map((line, li) => (
              <div key={li} className={li === 1 ? "gold-gradient" : ""}>{line}</div>
            ))}
          </div>
          <p className="mb-6 text-sm leading-relaxed text-[hsl(var(--foreground)/0.6)]">{sub}</p>
          <div className="grid gap-2.5 grid-cols-1">
            {features.map((feat, fi) => (
              <motion.div
                key={feat}
                initial={reduce ? {} : { opacity: 0, x: -14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + fi * 0.08 }}
                className="flex min-h-[48px] items-center gap-3 rounded-xl border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--card)/0.55)] px-4 py-3"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${chapter.accent}25`, color: chapter.accent }}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-[hsl(var(--foreground)/0.8)]">{feat}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP layout: image half + content half, side by side ── */}
      <div className="hidden md:grid md:grid-cols-2 min-h-[90vh]">
        {/* Image column */}
        <div className={`relative overflow-hidden ${isEven ? "order-first" : "order-last"}`}>
          <motion.img
            src={chapter.image}
            alt={title.replace("\n", " ")}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "brightness(0.45) saturate(0.75)" }}
            initial={reduce ? {} : { scale: 1.08 }}
            animate={inView ? { scale: 1 } : { scale: 1.08 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          {/* Blend gradient toward content side */}
          <div
            className="absolute inset-0"
            style={{
              background: isEven
                ? "linear-gradient(to right, transparent 55%, hsl(222,47%,4%) 100%)"
                : "linear-gradient(to left,  transparent 55%, hsl(222,47%,4%) 100%)",
            }}
          />
        </div>

        {/* Content column */}
        <div className={`relative flex flex-col justify-center px-10 py-20 xl:px-16 ${isEven ? "order-last" : "order-first"}`}>
          {/* Large number watermark */}
          <div
            className="pointer-events-none absolute top-8 font-serif text-[8rem] font-black leading-none select-none"
            style={{ color: `${chapter.accent}07`, right: isEven ? "1rem" : "auto", left: isEven ? "auto" : "1rem" }}
            aria-hidden
          >
            {chapter.num}
          </div>

          <motion.div
            initial={reduce ? {} : { opacity: 0, x: isEven ? 50 : -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[3px]"
              style={{ borderColor: `${chapter.accent}45`, color: chapter.accent, background: `${chapter.accent}12` }}
            >
              <Icon className="h-3.5 w-3.5" />
              {badge}
            </div>

            {/* Title */}
            <div className="mb-5 font-serif text-5xl font-bold leading-tight xl:text-[3.2rem]">
              {title.split("\n").map((line, li) => (
                <motion.div
                  key={li}
                  initial={reduce ? {} : { opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.15 + li * 0.12 }}
                  className={li === 1 ? "gold-gradient" : ""}
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* Sub */}
            <motion.p
              initial={reduce ? {} : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-8 max-w-sm text-base leading-relaxed text-[hsl(var(--foreground)/0.6)]"
            >
              {sub}
            </motion.p>

            {/* Features + phone mockup row */}
            <div className="flex items-start gap-6">
              <div className="flex-1 grid gap-3 sm:grid-cols-2">
                {features.map((feat, fi) => (
                  <motion.div
                    key={feat}
                    initial={reduce ? {} : { opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + fi * 0.09 }}
                    className="flex min-h-[48px] items-center gap-3 rounded-xl border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--card)/0.55)] px-4 py-3 backdrop-blur"
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={{ background: `${chapter.accent}25`, color: chapter.accent }}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-[hsl(var(--foreground)/0.8)]">{feat}</span>
                  </motion.div>
                ))}
              </div>

              {/* Phone mockup — floats beside features on desktop */}
              <motion.div
                initial={reduce ? {} : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hidden lg:block shrink-0"
              >
                <AppMockup chapter={chapter} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chapter divider at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${chapter.accent}30, transparent)` }} />
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────────────────────── */
export function SmartHome() {
  const { lang } = useLang();
  const isAr = lang === "ar";

  return (
    <section id="smart-home">
      {/* ── SECTION HEADER ── */}
      <div className="relative overflow-hidden bg-[hsl(222,47%,4%)] py-24 text-center">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.04)] blur-[160px]" />
        </div>

        {/* "SMART VILLA" watermark text */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden>
          <span className="font-serif text-[clamp(4rem,14vw,12rem)] font-black text-white/[0.022] whitespace-nowrap">
            {isAr ? "منزل ذكي" : "SMART VILLA"}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl px-6"
        >
          {/* Floor plan decoration */}
          <div className="mb-6 flex justify-center">
            <FloorPlan />
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary)/0.35)] bg-[hsl(var(--primary)/0.08)] px-5 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))]">
            <Wifi className="h-3.5 w-3.5" />
            {isAr ? "حلول المنزل الذكي" : "Smart Home Solutions"}
          </div>

          <h2 className="mt-4 font-serif text-4xl font-bold md:text-6xl">
            {isAr ? "فلل " : "Intelligent "}
            <span className="gold-gradient">{isAr ? "ذكية" : "Villas"}</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg text-[hsl(var(--foreground)/0.55)]">
            {isAr
              ? "نصمم وننفذ أنظمة المنازل الذكية المتكاملة للفلل السكنية في أبوظبي — خمسة أنظمة، منزل واحد، تجربة لا تُنسى."
              : "We design and install complete smart-home systems for Abu Dhabi's finest residential villas — five systems, one seamless experience."}
          </p>

          {/* Chapter pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {CHAPTERS.map((ch) => {
              const ChIcon = ch.Icon;
              return (
                <a
                  key={ch.id}
                  href={`#smart-${ch.id}`}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.5)] px-4 py-2 text-xs transition-all hover:scale-105"
                  style={{ borderColor: `${ch.accent}35` }}
                >
                  <ChIcon className="h-3.5 w-3.5" style={{ color: ch.accent }} />
                  <span style={{ color: ch.accent }}>{isAr ? ch.badgeAr : ch.badge}</span>
                </a>
              );
            })}
          </div>

          {/* Vertical divider lines (decorative) */}
          <div className="mt-14 flex justify-center gap-4">
            {CHAPTERS.map((ch, i) => (
              <motion.div
                key={ch.id}
                className="h-12 w-px rounded-full"
                style={{ background: ch.accent, opacity: 0.4 }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── CHAPTER PANELS ── */}
      {CHAPTERS.map((ch, i) => (
        <ChapterPanel key={ch.id} chapter={ch} index={i} />
      ))}

      {/* ── FOOTER CTA ── */}
      <div className="relative overflow-hidden bg-[hsl(222,47%,3%)] py-20 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.05)] blur-[120px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-2xl px-6"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[hsl(var(--primary))]">
            {isAr ? "ابدأ مشروعك" : "Start Your Project"}
          </p>
          <h3 className="mb-5 font-serif text-3xl font-bold md:text-4xl">
            {isAr ? "حوّل فيلتك إلى " : "Transform Your Villa into a "}
            <span className="gold-gradient">{isAr ? "منزل ذكي" : "Smart Home"}</span>
          </h3>
          <p className="mx-auto mb-8 max-w-md text-[hsl(var(--foreground)/0.5)]">
            {isAr
              ? "تواصل مع فريقنا اليوم للحصول على استشارة مجانية وتصميم مخصص لفيلتك."
              : "Reach out today for a free consultation and a system designed specifically for your villa."}
          </p>
          <motion.a
            href="https://wa.me/971563780707"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex min-h-[52px] items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-[hsl(var(--background))] shadow-[0_0_30px_hsl(43,56%,55%,0.3)] transition-shadow hover:shadow-[0_0_50px_hsl(43,56%,55%,0.5)]"
            style={{ background: "linear-gradient(135deg,#a07820,#c9a84c)" }}
          >
            {isAr ? "تحدث مع خبير" : "Speak with an Expert"}
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
