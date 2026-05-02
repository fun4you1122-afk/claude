import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mohammed Al Hameli",
    role: "Real Estate Developer · Abu Dhabi",
    text: "Albina Alareeq delivered our MBZ City residential complex on time and above quality expectations. Their site management and attention to detail is unmatched in the market.",
    rating: 5,
  },
  {
    name: "Sara Al Mansouri",
    role: "Business Owner · Abu Dhabi",
    text: "The fit-out team transformed our commercial space beautifully. Professional, clean, and zero disruption to our schedule. We'll be using them for all future projects.",
    rating: 5,
  },
  {
    name: "Khalid Al Rashidi",
    role: "Facilities Manager · UAE",
    text: "Their general maintenance contract has been a game-changer for our facilities. Fast response times, skilled technicians, and honest pricing. Highly recommended.",
    rating: 5,
  },
];

export function Testimonials() {
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
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))]">
            Client Voices
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            What Our <span className="gold-gradient">Clients Say</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map(({ name, role, text, rating }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="relative flex flex-col gap-5 rounded-2xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] p-7 backdrop-blur transition-all duration-300 hover:border-[hsl(var(--primary)/0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              <Quote className="h-8 w-8 text-[hsl(var(--primary)/0.3)]" />

              <p className="flex-1 text-sm leading-relaxed text-[hsl(var(--foreground)/0.7)]">"{text}"</p>

              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-[hsl(43,56%,55%)] text-[hsl(43,56%,55%)]" />
                ))}
              </div>

              <div className="flex items-center gap-3 border-t border-[hsl(var(--border)/0.4)] pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.15)] font-serif text-sm font-bold text-[hsl(var(--primary))]">
                  {name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{name}</p>
                  <p className="text-xs text-[hsl(var(--foreground)/0.45)]">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
