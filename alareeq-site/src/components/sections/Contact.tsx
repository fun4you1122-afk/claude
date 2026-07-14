import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Camera, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useLang } from "../../i18n";

const channelIcons = [MessageCircle, Mail, Camera, MapPin];
const channelColors = [
  { color: "text-emerald-400", bg: "bg-emerald-400/10", border: "hover:border-emerald-400/40", href: "https://wa.me/971563780707" },
  { color: "text-[hsl(var(--primary))]", bg: "bg-[hsl(var(--primary)/0.1)]", border: "hover:border-[hsl(var(--primary)/0.4)]", href: "mailto:albina.alareeq@gmail.com" },
  { color: "text-pink-400", bg: "bg-pink-400/10", border: "hover:border-pink-400/40", href: "https://instagram.com/albina.alareeq" },
  { color: "text-[hsl(var(--primary))]", bg: "bg-[hsl(var(--primary)/0.08)]", border: "hover:border-[hsl(var(--primary)/0.3)]", href: null as null | string },
];
const channelValues = ["+971 56 378 07 07", "albina.alareeq@gmail.com", "@albina.alareeq", "Abu Dhabi, UAE"];

// ── Floating label input ──────────────────────────────────────────────────────
function FloatingField({
  label,
  type = "text",
  name,
  required = false,
}: {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const isUp = focused || filled;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setFilled(!!e.target.value);
        }}
        className="peer w-full rounded-lg border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.8)] px-4 pt-6 pb-2 text-sm text-[hsl(var(--foreground))] outline-none transition-colors focus:border-[hsl(var(--primary)/0.6)]"
      />
      <motion.label
        animate={{
          y: isUp ? -8 : 0,
          scale: isUp ? 0.78 : 1,
          color: isUp ? "hsl(43,56%,55%)" : "hsl(215,16%,55%)",
        }}
        transition={{ duration: 0.2 }}
        style={{ originX: 0, transformOrigin: "left center", pointerEvents: "none" }}
        className="absolute left-4 top-4 text-sm"
      >
        {label}
      </motion.label>
      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full bg-[hsl(var(--primary)/0.7)]"
      />
    </div>
  );
}

// ── Floating textarea ─────────────────────────────────────────────────────────
function FloatingTextarea({ label, name, rows = 4 }: { label: string; name: string; rows?: number }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const isUp = focused || filled;

  return (
    <div className="relative">
      <textarea
        name={name}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setFilled(!!e.target.value);
        }}
        className="peer w-full resize-none rounded-lg border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.8)] px-4 pt-6 pb-2 text-sm text-[hsl(var(--foreground))] outline-none transition-colors focus:border-[hsl(var(--primary)/0.6)]"
      />
      <motion.label
        animate={{
          y: isUp ? -8 : 0,
          scale: isUp ? 0.78 : 1,
          color: isUp ? "hsl(43,56%,55%)" : "hsl(215,16%,55%)",
        }}
        transition={{ duration: 0.2 }}
        style={{ originX: 0, transformOrigin: "left center", pointerEvents: "none" }}
        className="absolute left-4 top-4 text-sm"
      >
        {label}
      </motion.label>
      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full bg-[hsl(var(--primary)/0.7)]"
      />
    </div>
  );
}

// ── Floating select ───────────────────────────────────────────────────────────
function FloatingSelect({
  label,
  name,
  options,
  placeholder,
}: {
  label: string;
  name: string;
  options: readonly string[];
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const isUp = focused || filled;

  return (
    <div className="relative">
      <select
        name={name}
        defaultValue=""
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setFilled(!!e.target.value);
        }}
        onChange={(e) => setFilled(!!e.target.value)}
        className="peer w-full appearance-none rounded-lg border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.8)] px-4 pt-6 pb-2 text-sm text-[hsl(var(--foreground))] outline-none transition-colors focus:border-[hsl(var(--primary)/0.6)]"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <motion.label
        animate={{
          y: isUp ? -8 : 0,
          scale: isUp ? 0.78 : 1,
          color: isUp ? "hsl(43,56%,55%)" : "hsl(215,16%,55%)",
        }}
        transition={{ duration: 0.2 }}
        style={{ originX: 0, transformOrigin: "left center", pointerEvents: "none" }}
        className="absolute left-4 top-4 text-sm"
      >
        {label}
      </motion.label>
      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full bg-[hsl(var(--primary)/0.7)]"
      />
    </div>
  );
}

// ── Animated checkmark SVG ────────────────────────────────────────────────────
function AnimatedCheck() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
      <circle cx="32" cy="32" r="30" stroke="hsl(43,56%,55%)" strokeWidth="2" opacity="0.3" />
      <motion.path
        d="M20 32 L29 41 L44 24"
        stroke="hsl(43,56%,55%)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const FORM_ENDPOINT = "https://formsubmit.co/ajax/albina.alareeq@gmail.com";
const WA_NUMBER = "971563780707";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [waFallback, setWaFallback] = useState(`https://wa.me/${WA_NUMBER}`);
  const { t } = useLang();
  const sent = status === "sent";
  const submitting = status === "sending";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const entries = Object.fromEntries(data.entries());

    // Pre-compose a WhatsApp message from the typed values so a failed
    // send can be recovered with one tap instead of retyping everything.
    const waText = Object.entries(entries)
      .filter(([, v]) => typeof v === "string" && v.trim())
      .map(([k, v]) => `${k}: ${String(v).trim()}`)
      .join("\n");
    setWaFallback(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`);

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...entries,
          _subject: "New inquiry — Albina Alareeq website",
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-[hsl(222,40%,6.5%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[100px]" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[hsl(213,60%,42%,0.03)] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))]">
            {t.contact.badge}
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            {t.contact.h1} <span className="gold-gradient">{t.contact.h2}</span> {t.contact.h3}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(var(--foreground)/0.5)]">{t.contact.sub}</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left: contact channels */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {t.contact.channels.map((ch, i) => {
              const meta = channelColors[i];
              const Icon = channelIcons[i];
              const El = meta.href ? "a" : "div";
              return (
                <motion.div key={ch.label} whileHover={{ x: 6 }} className="block">
                  <El
                    {...(meta.href
                      ? {
                          href: meta.href,
                          target: meta.href.startsWith("http") ? "_blank" : undefined,
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className={`flex items-center gap-5 rounded-xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] p-5 backdrop-blur transition-all ${meta.border} ${meta.href ? "cursor-pointer" : ""}`}
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${meta.bg} ${meta.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[1.5px] text-[hsl(var(--foreground)/0.45)]">{ch.label}</p>
                      <p className="font-semibold">{channelValues[i]}</p>
                      <p className="text-xs text-[hsl(var(--foreground)/0.45)]">{ch.hint}</p>
                    </div>
                  </El>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.65)] p-8 backdrop-blur"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <AnimatedCheck />
                  <h3 className="font-serif text-xl font-bold text-[hsl(var(--primary))]">{t.contact.successTitle}</h3>
                  <p className="text-sm text-[hsl(var(--foreground)/0.55)]">
                    {t.contact.successMsg}{" "}
                    <a
                      href="https://wa.me/971563780707"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[hsl(var(--primary))] underline"
                    >
                      {t.contact.successLink}
                    </a>.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="mb-6 font-serif text-xl font-bold">{t.contact.formTitle}</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {t.contact.fields.map((f) => (
                      <FloatingField
                        key={f.label}
                        label={f.label}
                        type={f.type}
                        name={f.label}
                        required={f.required}
                      />
                    ))}

                    <FloatingSelect
                      label={t.contact.serviceLabel}
                      name="service"
                      options={t.contact.serviceOptions}
                      placeholder={t.contact.servicePlaceholder}
                    />

                    <FloatingTextarea
                      label={t.contact.msgLabel}
                      name="message"
                      rows={4}
                    />

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm"
                      >
                        <p className="mb-1 font-semibold text-red-300">{t.contact.errorTitle}</p>
                        <p className="mb-3 text-[hsl(var(--foreground)/0.65)]">{t.contact.errorMsg}</p>
                        <a
                          href={waFallback}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {t.contact.errorBtn}
                        </a>
                      </motion.div>
                    )}

                    <Button type="submit" size="lg" className="w-full gap-2" disabled={submitting}>
                      <Send className="h-4 w-4" />
                      {submitting ? t.contact.sending : t.contact.send}
                    </Button>
                    <p className="text-center text-xs text-[hsl(var(--foreground)/0.4)]">
                      {t.contact.orMsg}{" "}
                      <a
                        href="https://wa.me/971563780707"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[hsl(var(--primary))] hover:underline"
                      >
                        WhatsApp
                      </a>
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
