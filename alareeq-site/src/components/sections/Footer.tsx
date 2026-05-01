export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border)/0.5)] bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 space-y-4">
            <img src="/logo.svg" alt="Albina Alareeq" className="h-14 w-auto brightness-0 invert" />
            <p className="max-w-xs text-sm leading-relaxed text-[hsl(var(--foreground)/0.5)]">
              Building excellence across the UAE. Premium contracting, civil works, and general maintenance delivered with integrity.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://wa.me/971563780707", label: "WA", color: "hover:bg-emerald-500/15 hover:border-emerald-500/40 hover:text-emerald-400" },
                { href: "https://instagram.com/albina.alareeq", label: "IG", color: "hover:bg-pink-500/15 hover:border-pink-500/40 hover:text-pink-400" },
                { href: "mailto:albina.alareeq@gmail.com", label: "✉", color: "hover:bg-[hsl(var(--primary)/0.15)] hover:border-[hsl(var(--primary)/0.4)] hover:text-[hsl(var(--primary))]" },
              ].map((s) => (
                <a key={s.href} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border border-[hsl(var(--border)/0.5)] text-xs font-bold text-[hsl(var(--foreground)/0.5)] transition-all ${s.color}`}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[2px] text-[hsl(var(--foreground)/0.4)]">Services</h4>
            <ul className="space-y-2.5">
              {["General Contracting","Civil Works","MEP Services","Interior Fit-Out","Project Management"].map((s) => (
                <li key={s}><a href="#services" className="text-sm text-[hsl(var(--foreground)/0.5)] hover:text-[hsl(var(--primary))] transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[2px] text-[hsl(var(--foreground)/0.4)]">Contact</h4>
            <ul className="space-y-2.5 text-sm text-[hsl(var(--foreground)/0.5)]">
              <li><a href="https://wa.me/971563780707" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--primary))] transition-colors">+971 56 378 07 07</a></li>
              <li><a href="mailto:albina.alareeq@gmail.com" className="hover:text-[hsl(var(--primary))] transition-colors">albina.alareeq@gmail.com</a></li>
              <li><a href="https://instagram.com/albina.alareeq" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--primary))] transition-colors">@albina.alareeq</a></li>
              <li className="text-[hsl(var(--foreground)/0.4)]">Abu Dhabi, UAE</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--border)/0.4)] pt-8 text-xs text-[hsl(var(--foreground)/0.35)]">
          <p>© 2025 البناء العريق للمقاولات والصيانة العامة — Albina Alareeq Contracting & General Maintenance</p>
          <p>Abu Dhabi, UAE 🇦🇪</p>
        </div>
      </div>
    </footer>
  );
}
