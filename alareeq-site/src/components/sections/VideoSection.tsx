import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useLang } from "../../i18n";

const POSTER =
  "https://images.pexels.com/videos/12098511/pexels-photo-12098511.jpeg?auto=compress&cs=tinysrgb&w=1280";
const VIDEO_SRC =
  "https://videos.pexels.com/video-files/12098511/12098511-hd_1920_1080_50fps.mp4"; // 5.7 MB

export function VideoSection() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduce = useReducedMotion();
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  // preload="none" + no autoPlay means the 5.7 MB file is never fetched unless
  // the visitor scrolls here. Play when the section nears the viewport, pause
  // when it leaves. Reduced-motion users keep the poster until they tap play.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || shouldReduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().then(() => setPlaying(true)).catch(() => {});
        } else if (!vid.paused) {
          vid.pause();
          setPlaying(false);
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(vid);
    return () => io.disconnect();
  }, [shouldReduce]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale    = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.95]);
  const videoY   = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const opacity  = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const titleY   = useTransform(scrollYProgress, [0, 0.5], ["20px", "0px"]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
  };
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((m) => !m);
  };

  return (
    <section ref={ref} className="relative overflow-hidden bg-[hsl(222,47%,3%)]" style={{ minHeight: "75vh" }}>
      {/* ── FULL-BLEED VIDEO ── */}
      <motion.div
        style={{ scale, opacity }}
        className="relative overflow-hidden"
      >
        <motion.div className="relative" style={{ y: videoY }}>
          <video
            ref={videoRef}
            muted loop playsInline
            preload="none"
            poster={POSTER}
            className="w-full object-cover"
            style={{ maxHeight: "72vh", minHeight: "420px" }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,47%,3%)] via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* Gold corner accents */}
        <div className="pointer-events-none absolute left-5 top-5 h-10 w-10 border-l-2 border-t-2 border-[hsl(var(--primary)/0.7)] rounded-tl-lg z-10" />
        <div className="pointer-events-none absolute right-5 top-5 h-10 w-10 border-r-2 border-t-2 border-[hsl(var(--primary)/0.7)] rounded-tr-lg z-10" />
        <div className="pointer-events-none absolute bottom-5 left-5 h-10 w-10 border-b-2 border-l-2 border-[hsl(var(--primary)/0.7)] rounded-bl-lg z-10" />
        <div className="pointer-events-none absolute bottom-5 right-5 h-10 w-10 border-b-2 border-r-2 border-[hsl(var(--primary)/0.7)] rounded-br-lg z-10" />

        {/* Centered title overlay */}
        <motion.div
          style={{ y: titleY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary)/0.35)] bg-black/50 px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))] backdrop-blur">
              <Play className="h-3 w-3 fill-current" />
              {t.videoSection.badge}
            </div>
            <h2 className="font-serif text-3xl font-bold text-white drop-shadow-2xl md:text-5xl lg:text-6xl">
              {t.videoSection.h1}{" "}
              <span className="gold-gradient">{t.videoSection.h2}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/60">
              {t.videoSection.sub}
            </p>
          </motion.div>
        </motion.div>

        {/* Video controls */}
        <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex gap-3">
          <button
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            aria-pressed={playing}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition-colors"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            aria-pressed={!muted}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 transition-colors"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>

        {/* Location tag */}
        <div className="absolute bottom-6 right-6 z-30 text-right">
          <p className="text-xs font-medium uppercase tracking-[3px] text-[hsl(var(--primary))]">
            Albina Alareeq · Abu Dhabi, UAE
          </p>
          <p className="mt-0.5 text-xs text-white/60">
            {t.videoSection.locationSub}
          </p>
        </div>
      </motion.div>

      {/* ── STATS ROW ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl px-6 py-10 md:px-8"
      >
        <div className="grid grid-cols-3 gap-4">
          {t.videoSection.stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--card)/0.5)] p-5 text-center backdrop-blur"
            >
              <p className="font-serif text-2xl font-bold text-[hsl(var(--primary))]">{value}</p>
              <p className="mt-1 text-xs text-[hsl(var(--foreground)/0.5)] uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
