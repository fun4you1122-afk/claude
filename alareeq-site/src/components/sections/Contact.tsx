import { motion } from "framer-motion";
import { MessageCircle, Mail, Camera, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const channels = [
  { icon: MessageCircle, label: "WhatsApp Chat Line", value: "+971 56 378 07 07", hint: "Tap to chat now →", href: "https://wa.me/971563780707", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "hover:border-emerald-400/40" },
  { icon: Mail,          label: "Email",              value: "albina.alareeq@gmail.com", hint: "Reply within 24 hours →", href: "mailto:albina.alareeq@gmail.com", color: "text-[hsl(var(--primary))]", bg: "bg-[hsl(var(--primary)/0.1)]", border: "hover:border-[hsl(var(--primary)/0.4)]" },
  { icon: Camera,     label: "Instagram",          value: "@albina.alareeq", hint: "Follow our projects →", href: "https://instagram.com/albina.alareeq", color: "text-pink-400", bg: "bg-pink-400/10", border: "hover:border-pink-400/40" },
  { icon: MapPin,        label: "Location",           value: "Abu Dhabi, UAE", hint: "Serving the entire UAE", href: null, color: "text-[hsl(var(--primary))]", bg: "bg-[hsl(var(--primary)/0.08)]", border: "hover:border-[hsl(var(--primary)/0.3)]" },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSent(true); setSubmitting(false); }, 1200);
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
            Get In Touch
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            Start Your <span className="gold-gradient">Project</span> Today
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(var(--foreground)/0.5)]">
            Reach out — we respond within 24 hours
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Contact channels */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {channels.map((ch) => {
              const El = ch.href ? "a" : "div";
              return (
                <motion.div key={ch.label} whileHover={{ x: 6 }} className="block">
                  <El
                    {...(ch.href ? { href: ch.href, target: ch.href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" } : {})}
                    className={`flex items-center gap-5 rounded-xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] p-5 backdrop-blur transition-all ${ch.border} ${ch.href ? "cursor-pointer" : ""}`}
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${ch.bg} ${ch.color}`}>
                      <ch.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[1.5px] text-[hsl(var(--foreground)/0.45)]">{ch.label}</p>
                      <p className="font-semibold">{ch.value}</p>
                      <p className="text-xs text-[hsl(var(--foreground)/0.45)]">{ch.hint}</p>
                    </div>
                  </El>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.65)] p-8 backdrop-blur"
          >
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.1)] text-2xl">✓</div>
                <h3 className="font-serif text-xl font-bold text-[hsl(var(--primary))]">Message Sent!</h3>
                <p className="text-sm text-[hsl(var(--foreground)/0.55)]">Our team will contact you within 24 hours. For urgent matters, chat on <a href="https://wa.me/971563780707" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary))] underline">WhatsApp</a>.</p>
              </div>
            ) : (
              <>
                <h3 className="mb-6 font-serif text-xl font-bold">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { label: "Full Name", name: "name", type: "text",  placeholder: "Your full name", required: true },
                    { label: "Email",     name: "email", type: "email", placeholder: "your@email.com",  required: true },
                    { label: "Phone",     name: "phone", type: "tel",   placeholder: "+971 XX XXX XXXX", required: false },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[1px] text-[hsl(var(--foreground)/0.5)]">{f.label}</label>
                      <input type={f.type} name={f.name} placeholder={f.placeholder} required={f.required}
                        className="w-full rounded-lg border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.8)] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground)/0.3)] outline-none transition-colors focus:border-[hsl(var(--primary)/0.5)] focus:ring-1 focus:ring-[hsl(var(--primary)/0.2)]"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-[1px] text-[hsl(var(--foreground)/0.5)]">Service Needed</label>
                    <select name="service" className="w-full rounded-lg border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.8)] px-4 py-3 text-sm text-[hsl(var(--foreground))] outline-none transition-colors focus:border-[hsl(var(--primary)/0.5)]">
                      <option value="">Select a service...</option>
                      {["General Contracting","Civil Works","MEP Services","Interior Fit-Out","Project Management","Renovation & Maintenance"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-[1px] text-[hsl(var(--foreground)/0.5)]">Message</label>
                    <textarea name="message" rows={4} placeholder="Tell us about your project..."
                      className="w-full resize-none rounded-lg border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.8)] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground)/0.3)] outline-none transition-colors focus:border-[hsl(var(--primary)/0.5)] focus:ring-1 focus:ring-[hsl(var(--primary)/0.2)]"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2" disabled={submitting}>
                    <Send className="h-4 w-4" />
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                  <p className="text-center text-xs text-[hsl(var(--foreground)/0.4)]">
                    Or message directly on{" "}
                    <a href="https://wa.me/971563780707" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary))] hover:underline">WhatsApp</a>
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
