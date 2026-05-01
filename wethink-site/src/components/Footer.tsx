export function Footer() {
  return (
    <footer className="py-10 px-6 text-center" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <img src="/logo.png" alt="WeThink" className="mx-auto mb-4 h-10 w-auto opacity-80" />
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        © {new Date().getFullYear()} WeThink. All rights reserved. · UAE
      </p>
      <p className="mt-1 text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>
        IT Consultation · Brand Identity · Pitch Decks · Entrepreneurship Support
      </p>
    </footer>
  );
}
