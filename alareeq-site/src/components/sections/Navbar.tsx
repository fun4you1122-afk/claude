import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-[hsl(var(--border)/0.5)] bg-[hsl(var(--background)/0.9)] backdrop-blur-xl" : ""}`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4 md:px-8">
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="shrink-0">
          <img src="/logo.png" alt="Albina Alareeq" className="h-10 w-auto" style={{mixBlendMode:"screen"}} />
        </a>

        {/* Desktop links */}
        <div className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-[hsl(var(--foreground)/0.6)] transition-colors hover:bg-[hsl(var(--card)/0.6)] hover:text-[hsl(var(--foreground))]">
              {l.label}
            </button>
          ))}
          <a href="https://wa.me/971563780707" target="_blank" rel="noopener noreferrer"
            className="ml-2 flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_18px_rgba(52,211,153,0.4)]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.528 5.855L0 24l6.33-1.658A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            WhatsApp
          </a>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="ml-auto rounded-lg p-2 text-[hsl(var(--foreground)/0.6)] hover:bg-[hsl(var(--card)/0.6)] md:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="border-t border-[hsl(var(--border)/0.5)] bg-[hsl(var(--background)/0.95)] px-6 pb-4 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="block w-full py-3 text-left text-sm font-medium text-[hsl(var(--foreground)/0.7)] hover:text-[hsl(var(--foreground))]">
              {l.label}
            </button>
          ))}
          <a href="https://wa.me/971563780707" target="_blank" rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-emerald-500 py-2.5 text-sm font-semibold text-white">
            WhatsApp Us
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
