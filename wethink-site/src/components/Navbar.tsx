import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services",  href: "#services"  },
  { label: "About",     href: "#about"     },
  { label: "Process",   href: "#process"   },
  { label: "Contact",   href: "#contact"   },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(6,6,26,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(99,102,241,0.15)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <a href="#" className="flex items-center gap-3">
          <img src="/logo.png" alt="WeThink" className="h-10 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
          <a
            href="https://wa.me/971503128823"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}
          >
            Get Started
          </a>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(6,6,26,0.97)", borderBottom: "1px solid var(--border)" }}
        >
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="text-sm font-medium text-[var(--muted)] hover:text-white" onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            href="https://wa.me/971503128823"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5 py-2 text-sm font-semibold text-white text-center"
            style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}
          >
            Get Started
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
