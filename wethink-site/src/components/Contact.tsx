import { motion } from "framer-motion";
import { Phone, Camera, MapPin } from "lucide-react";

const channels = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+971 50 312 8823",
    href: "https://wa.me/971503128823",
    color: "#22c55e",
  },
  {
    icon: Camera,
    label: "Instagram",
    value: "@wethink",
    href: "https://instagram.com/wethink",
    color: "#e1306c",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "UAE",
    href: null,
    color: "#6366f1",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 65%)" }} />

      <div className="relative mx-auto max-w-4xl px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[4px]" style={{ color: "var(--primary)" }}>Get In Touch</p>
          <h2 className="heading text-4xl font-bold md:text-5xl mb-4" style={{ color: "var(--fg)" }}>
            Ready to <span className="indigo-gradient">Think Bigger?</span>
          </h2>
          <p className="mx-auto max-w-lg" style={{ color: "var(--muted)" }}>
            Whether you need an IT roadmap, a brand refresh, a compelling deck, or a complete startup launchpad — we're one message away.
          </p>
        </motion.div>

        {/* Channel cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          {channels.map(({ icon: Icon, label, value, href, color }, i) => {
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, boxShadow: `0 20px 50px rgba(99,102,241,0.2)` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4 rounded-2xl p-7 transition-all"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: `${color}18`, border: `1px solid ${color}40` }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[2px] mb-1" style={{ color: "var(--muted)" }}>{label}</p>
                  <p className="font-semibold" style={{ color: "var(--fg)" }}>{value}</p>
                </div>
              </motion.div>
            );
            return href ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
        </div>

        {/* CTA button */}
        <motion.a
          href="https://wa.me/971503128823"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 rounded-full px-10 py-4 text-base font-semibold text-white glow"
          style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}
        >
          <Phone size={18} />
          Start a Conversation
        </motion.a>
      </div>
    </section>
  );
}
