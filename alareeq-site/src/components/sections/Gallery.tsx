import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "../../i18n";

type Cat = "all" | "site" | "structure" | "engineering";

interface GalleryImage {
  src: string;
  alt: string;
  span: string;
  cat: Exclude<Cat, "all">;
}

const images: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=85", alt: "Construction workers on site",    span: "col-span-1 row-span-2", cat: "site" },
  { src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&auto=format&fit=crop&q=85", alt: "Modern building construction",    span: "col-span-1 row-span-1", cat: "structure" },
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&auto=format&fit=crop&q=85", alt: "Tower crane at construction site",span: "col-span-1 row-span-1", cat: "site" },
  { src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop&q=85", alt: "Steel frame structure",           span: "col-span-1 row-span-1", cat: "structure" },
  { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=85", alt: "Engineering blueprints",           span: "col-span-1 row-span-1", cat: "engineering" },
  { src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&auto=format&fit=crop&q=85", alt: "Construction site overview",     span: "col-span-2 md:col-span-1 row-span-1", cat: "site" },
  { src: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&auto=format&fit=crop&q=85", alt: "Concrete foundation work",       span: "md:col-span-2 col-span-2 row-span-1", cat: "structure" },
];

export function Gallery() {
  const [lightbox, setLightbox]   = useState<number | null>(null);
  const [activeCat, setActiveCat] = useState<Cat>("all");
  const { t } = useLang();

  const cats: { key: Cat; label: string }[] = [
    { key: "all",         label: (t.gallery as Record<string, string>).catAll         ?? "All" },
    { key: "site",        label: (t.gallery as Record<string, string>).catSite        ?? "Site" },
    { key: "structure",   label: (t.gallery as Record<string, string>).catStructure   ?? "Structure" },
    { key: "engineering", label: (t.gallery as Record<string, string>).catEng         ?? "Engineering" },
  ];

  const filtered = activeCat === "all" ? images : images.filter((img) => img.cat === activeCat);

  // For lightbox navigation, always navigate within the full filtered set
  const lightboxImages = filtered;
  const prev = () => setLightbox((l) => (l !== null ? (l - 1 + lightboxImages.length) % lightboxImages.length : null));
  const next = () => setLightbox((l) => (l !== null ? (l + 1) % lightboxImages.length : null));

  const handleCatChange = (cat: Cat) => {
    setActiveCat(cat);
    setLightbox(null);
  };

  return (
    <section id="gallery" className="relative py-28 bg-[hsl(222,40%,6%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))]">
            {t.gallery.badge}
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            {t.gallery.h1} <span className="gold-gradient">{t.gallery.h2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(var(--foreground)/0.5)]">{t.gallery.sub}</p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <div className="mb-8 flex overflow-x-auto gap-2 pb-2 scrollbar-none justify-start md:justify-center">
          {cats.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleCatChange(key)}
              className={`shrink-0 min-h-[48px] rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeCat === key
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--background))] shadow-[0_0_20px_hsl(43,56%,55%,0.3)]"
                  : "border border-[hsl(var(--border)/0.5)] text-[hsl(var(--foreground)/0.55)] hover:border-[hsl(var(--primary)/0.4)] hover:text-[hsl(var(--foreground)/0.8)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          {activeCat === "all" ? (
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 md:grid-cols-3"
              style={{ gridTemplateRows: "repeat(3, 200px)" }}
            >
              {images.map((img, i) => (
                <motion.div
                  key={img.alt}
                  layout
                  initial={{ opacity: 0, scale: 0.93 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className={`relative cursor-pointer overflow-hidden rounded-2xl border border-[hsl(var(--border)/0.4)] ${img.span}`}
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/80">{img.alt}</p>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[hsl(var(--primary)/0)] transition-colors duration-300 hover:border-[hsl(var(--primary)/0.5)]" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={activeCat}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              <AnimatePresence>
                {filtered.map((img, i) => (
                  <motion.div
                    key={img.alt}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="relative h-48 cursor-pointer overflow-hidden rounded-2xl border border-[hsl(var(--border)/0.4)]"
                    onClick={() => setLightbox(i)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                      <p className="text-xs font-medium uppercase tracking-wider text-white/80">{img.alt}</p>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[hsl(var(--primary)/0)] transition-colors duration-300 hover:border-[hsl(var(--primary)/0.5)]" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && lightboxImages[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute right-5 top-5 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              src={lightboxImages[lightbox].src}
              alt={lightboxImages[lightbox].alt}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/50">
              {lightboxImages[lightbox].alt} · {lightbox + 1} / {lightboxImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
