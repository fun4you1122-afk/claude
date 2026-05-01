import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 50,  suffix: "+", label: "Clients Served"      },
  { value: 4,   suffix: "",  label: "Core Services"       },
  { value: 100, suffix: "%", label: "Satisfaction Rate"   },
  { value: 5,   suffix: "+", label: "Years of Experience" },
];

export function Stats() {
  return (
    <section className="relative py-24" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <div
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4"
          style={{ border: "1px solid var(--border)", background: "var(--border)" }}
        >
          {stats.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center gap-2 py-12 px-6 text-center"
              style={{ background: "var(--bg)" }}
            >
              <p className="heading text-5xl font-black indigo-gradient">
                <Counter to={value} suffix={suffix} />
              </p>
              <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
