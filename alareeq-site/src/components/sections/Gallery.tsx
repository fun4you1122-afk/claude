import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=85",
    alt: "Construction workers on site",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&auto=format&fit=crop&q=85",
    alt: "Modern building construction",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&auto=format&fit=crop&q=85",
    alt: "Tower crane at construction site",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop&q=85",
    alt: "Steel frame structure",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=85",
    alt: "Engineering blueprints",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&auto=format&fit=crop&q=85",
    alt: "Construction site overview",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&auto=format&fit=crop&q=85",
    alt: "Concrete foundation work",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&auto=format&fit=crop&q=85",
    alt: "Construction project management",
    span: "col-span-1 row-span-1",
  },
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((l) => (l !== null ? (l - 1 + images.length) % images.length : null));
  const next = () => setLightbox((l) => (l !== null ? (l + 1) % images.length : null));

  return (
    <section className="relative py-28 bg-[hsl(222,40%,6%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))]">
            Our Work
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            Built With <span className="gold-gradient">Precision</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(var(--foreground)/0.5)]">
            A glimpse of the craftsmanship and scale we bring to every project. Click any image to explore.
          </p>
        </motion.div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3" style={{ gridTemplateRows: "repeat(3, 200px)" }}>
          {images.map((img, i) => (
            <motion.div
              key={img.alt}
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
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={() => setLightbox(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/50">
              {images[lightbox].alt} · {lightbox + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
