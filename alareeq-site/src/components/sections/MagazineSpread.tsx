import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../../i18n";

gsap.registerPlugin(ScrollTrigger);

/* ─── shared styles ─────────────────────────────────────────────── */
const GOLD   = "#c9a84c";
const NAVY   = "#06090f";
const IVORY  = "rgba(255,248,224,0.88)";
const MUTED  = "rgba(255,248,224,0.6)";
const SERIF  = "'Playfair Display', Georgia, serif";
const SANS   = "'Inter', system-ui, sans-serif";

const label = (txt: string) => (
  <p style={{ fontFamily: SANS, fontSize: "0.6rem", fontWeight: 700,
    letterSpacing: "0.38em", textTransform: "uppercase", color: GOLD,
    marginBottom: "1.1rem" }}>
    {txt}
  </p>
);

const rule = (style?: React.CSSProperties) => (
  <div style={{ height: 1, background: `linear-gradient(90deg,${GOLD},transparent)`,
    margin: "1.6rem 0", ...style }} />
);

/* ─── Spread 1 — Opening / Our Story ────────────────────────────── */
function Spread1({ lang }: { lang: string }) {
  return (
    <div style={{ width: "100vw", height: "100vh", background: NAVY,
      display: "flex", position: "relative", overflow: "hidden" }}>

      {/* left — full-bleed image with dark overlay */}
      <div style={{ width: "48%", position: "relative", flexShrink: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1722435784805-ad8d59dadd9d?w=1200&auto=format&fit=crop&q=80"
          alt="Tower cranes at UAE construction site"
          style={{ width: "100%", height: "100%", objectFit: "cover",
            filter: "sepia(0.25) brightness(0.55)" }}
        />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(6,9,15,0.3), rgba(6,9,15,0.75))" }} />

        {/* year stamp */}
        <div style={{ position: "absolute", bottom: "2.5rem", left: "2.5rem" }}>
          <p style={{ fontFamily: SERIF, fontSize: "5.5rem", fontWeight: 900,
            color: GOLD, lineHeight: 1, opacity: 0.18, userSelect: "none" }}>
            2014
          </p>
        </div>
        {/* bottom caption */}
        <div style={{ position: "absolute", bottom: "2.5rem", right: "2rem",
          textAlign: "right" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.6rem",
            letterSpacing: "0.25em", color: MUTED, textTransform: "uppercase" }}>
            Abu Dhabi · UAE
          </p>
        </div>
      </div>

      {/* right — editorial text */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 5vw 0 4vw" }}>

        {label(lang === "ar" ? "قصتنا" : "Our Story")}

        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(3rem,5.5vw,5.2rem)",
          fontWeight: 900, lineHeight: 1.08, color: IVORY, marginBottom: "1.8rem" }}>
          {lang === "ar" ? (
            <><span style={{ color: GOLD }}>نبني</span>{" "}الإمارات</>
          ) : (
            <>Building<br /><span style={{ color: GOLD }}>The Emirates</span></>
          )}
        </h2>

        {rule()}

        <p style={{ fontFamily: SANS, fontSize: "1.05rem", lineHeight: 1.8,
          color: MUTED, maxWidth: 480, marginBottom: "1.8rem" }}>
          {lang === "ar"
            ? "منذ عام 2014، شكّل البناء العريق أفق أبوظبي من خلال الدقة والالتزام والخبرة الهندسية العميقة. من الأساسات حتى التشطيبات، نبني ليس فقط المنشآت، بل علاقات دائمة."
            : "Since 2014, Albina Alareeq has shaped Abu Dhabi's skyline through precision, commitment, and deep engineering expertise. From foundations to finishing, we build not just structures — but lasting relationships."}
        </p>

        <div style={{ display: "flex", gap: "2.5rem", marginTop: "0.5rem" }}>
          {[
            { n: "50+", l: lang === "ar" ? "مشروع منجز" : "Projects Delivered" },
            { n: "10+", l: lang === "ar" ? "سنوات خبرة"  : "Years of Expertise" },
            { n: "120+",l: lang === "ar" ? "متخصص"       : "Professionals" },
          ].map(({ n, l }) => (
            <div key={l}>
              <p style={{ fontFamily: SERIF, fontSize: "2rem", fontWeight: 900, color: GOLD }}>{n}</p>
              <p style={{ fontFamily: SANS, fontSize: "0.65rem", letterSpacing: "0.2em",
                textTransform: "uppercase", color: MUTED, marginTop: "0.25rem" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* page number */}
      <PageNum n="01" />
    </div>
  );
}

/* ─── Spread 2 — Our Craft (4 disciplines) ──────────────────────── */
function Spread2({ lang }: { lang: string }) {
  const disciplines = lang === "ar"
    ? [
        { n: "01", t: "مقاولات عامة", s: "من الحفر حتى التسليم" },
        { n: "02", t: "أعمال مدنية",  s: "أساسات وبنية تحتية" },
        { n: "03", t: "خدمات MEP",    s: "ميكانيكا وكهرباء وصحية" },
        { n: "04", t: "تشطيبات",       s: "داخلية راقية ومخصصة" },
      ]
    : [
        { n: "01", t: "General Contracting", s: "Ground-up to handover" },
        { n: "02", t: "Civil Works",         s: "Foundations & infrastructure" },
        { n: "03", t: "MEP Services",        s: "Mechanical, electrical, plumbing" },
        { n: "04", t: "Interior Fit-Out",    s: "Luxury finishing & bespoke" },
      ];

  return (
    <div style={{ width: "100vw", height: "100vh",
      background: "hsl(222,40%,7%)", display: "flex", overflow: "hidden" }}>

      {/* left — discipline list */}
      <div style={{ width: "44%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 4vw 0 5vw", borderRight: `1px solid rgba(201,168,76,0.15)` }}>

        {label(lang === "ar" ? "تخصصاتنا" : "Our Disciplines")}

        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,3.8vw,3.5rem)",
          fontWeight: 900, color: IVORY, marginBottom: "2.5rem", lineHeight: 1.15 }}>
          {lang === "ar" ? "أربعة تخصصات.\nتسليم واحد." : "Four disciplines.\nOne delivery."}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
          {disciplines.map(({ n, t, s }) => (
            <div key={n} style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem" }}>
              <span style={{ fontFamily: SERIF, fontSize: "1.6rem", fontWeight: 900,
                color: GOLD, opacity: 0.5, lineHeight: 1, flexShrink: 0, minWidth: "2.5rem" }}>{n}</span>
              <div>
                <p style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 700,
                  color: IVORY, marginBottom: "0.2rem" }}>{t}</p>
                <p style={{ fontFamily: SANS, fontSize: "0.78rem", color: MUTED,
                  letterSpacing: "0.05em" }}>{s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* right — full-bleed crane image */}
      <div style={{ flex: 1, position: "relative" }}>
        <img
          src="https://images.unsplash.com/photo-1748956628042-b73331e0b479?w=1400&auto=format&fit=crop&q=80"
          alt="Steel frame and tower crane at active construction site"
          style={{ width: "100%", height: "100%", objectFit: "cover",
            filter: "sepia(0.15) brightness(0.55)" }}
        />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(to right, hsl(222,40%,7%) 0%, transparent 30%, rgba(6,9,15,0.4) 100%)" }} />

        {/* pull quote */}
        <div style={{ position: "absolute", bottom: "3rem", right: "3rem",
          maxWidth: 300, textAlign: "right" }}>
          <p style={{ fontFamily: SERIF, fontSize: "1.15rem", fontStyle: "italic",
            color: GOLD, lineHeight: 1.6 }}>
            {lang === "ar"
              ? '"نحن لا نبني فحسب — نصنع معالم."'
              : '"We don\'t just build — we create landmarks."'}
          </p>
        </div>
      </div>

      <PageNum n="02" />
    </div>
  );
}

/* ─── Spread 3 — The Process ────────────────────────────────────── */
function Spread3({ lang }: { lang: string }) {
  const steps = lang === "ar"
    ? [
        { n: "01", t: "الاستشارة",  s: "نستمع قبل أن نبني. فهم رؤيتك هو أول خطوة.", icon: "◎" },
        { n: "02", t: "التخطيط",    s: "مخططات دقيقة، جداول واضحة، ميزانيات محكمة.", icon: "⬡" },
        { n: "03", t: "التنفيذ",    s: "أيادٍ محترفة وأدوات متطورة ودقة لا تهادن.", icon: "◈" },
        { n: "04", t: "التسليم",    s: "في الموعد. بالمواصفات. دائماً.", icon: "◉" },
      ]
    : [
        { n: "01", t: "Consult",  s: "We listen before we lift. Understanding your vision is step one.", icon: "◎" },
        { n: "02", t: "Plan",     s: "Precise blueprints, clear timelines, locked budgets.", icon: "⬡" },
        { n: "03", t: "Build",    s: "Skilled hands, advanced tools, zero-compromise craft.", icon: "◈" },
        { n: "04", t: "Deliver",  s: "On time. On spec. Every time.", icon: "◉" },
      ];

  return (
    <div style={{ width: "100vw", height: "100vh", background: NAVY,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "0 5vw", position: "relative", overflow: "hidden" }}>

      {/* decorative background text */}
      <p style={{ position: "absolute", bottom: "-1rem", right: "-1rem",
        fontFamily: SERIF, fontSize: "18vw", fontWeight: 900, color: GOLD,
        opacity: 0.03, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
        BUILD
      </p>

      {label(lang === "ar" ? "كيف نعمل" : "How We Build")}

      <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3.5rem)",
        fontWeight: 900, color: IVORY, marginBottom: "3.5rem", lineHeight: 1.1 }}>
        {lang === "ar" ? "أربع مراحل.\nنتيجة واحدة." : "Four phases.\nOne outcome."}
      </h2>

      {/* steps grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0" }}>
        {steps.map(({ n, t, s, icon }, i) => (
          <div key={n} style={{
            position: "relative",
            padding: "2rem 2rem 2rem 0",
            borderLeft: i === 0 ? "none" : `1px solid rgba(201,168,76,0.12)`,
            paddingLeft: i === 0 ? 0 : "2rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.2rem" }}>
              <span style={{ fontFamily: SANS, fontSize: "1.6rem", color: GOLD, opacity: 0.7 }}>{icon}</span>
              <span style={{ fontFamily: SERIF, fontSize: "0.75rem", fontWeight: 700,
                color: GOLD, letterSpacing: "0.3em" }}>{n}</span>
            </div>
            <p style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 700,
              color: IVORY, marginBottom: "0.8rem" }}>{t}</p>
            <p style={{ fontFamily: SANS, fontSize: "0.85rem", color: MUTED,
              lineHeight: 1.75 }}>{s}</p>

            {/* connecting arrow (not on last) */}
            {i < 3 && (
              <div style={{ position: "absolute", top: "50%", right: "-0.7rem",
                transform: "translateY(-50%)", color: GOLD, fontSize: "1.2rem",
                opacity: 0.3, pointerEvents: "none" }}>
                →
              </div>
            )}
          </div>
        ))}
      </div>

      <PageNum n="03" />
    </div>
  );
}

/* ─── Spread 4 — Active Projects ────────────────────────────────── */
function Spread4({ lang }: { lang: string }) {
  const projects = [
    {
      img: "https://images.unsplash.com/photo-1751054720514-067105f538d4?w=1200&auto=format&fit=crop&q=80",
      code: "PRJ-001",
      title: lang === "ar" ? "مشروع مدينة محمد بن زايد" : "Mohammed Bin Zayed City",
      loc:   lang === "ar" ? "مدينة MBZ، أبوظبي" : "MBZ City, Abu Dhabi",
      prog:  68,
      tags:  lang === "ar" ? ["سكني", "تجاري"] : ["Residential", "Commercial"],
    },
    {
      img: "https://images.unsplash.com/photo-1684497404598-6e844dff9cde?w=1200&auto=format&fit=crop&q=80",
      code: "PRJ-002",
      title: lang === "ar" ? "مشروع مدينة الرياض الحضري" : "Riyadh City Urban Development",
      loc:   lang === "ar" ? "مدينة الرياض، أبوظبي" : "Riyadh City, Abu Dhabi",
      prog:  42,
      tags:  lang === "ar" ? ["حضري", "مدني"] : ["Urban", "Civil Works"],
    },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh",
      background: "hsl(222,40%,6%)", display: "flex", overflow: "hidden" }}>

      {projects.map((p, i) => (
        <div key={p.code} style={{ flex: 1, position: "relative",
          borderRight: i === 0 ? `1px solid rgba(201,168,76,0.15)` : "none" }}>
          {/* image */}
          <img src={p.img} alt={p.title}
            style={{ width: "100%", height: "60%", objectFit: "cover",
              filter: "sepia(0.15) brightness(0.6)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60%",
            background: "linear-gradient(to bottom, transparent 40%, hsl(222,40%,6%) 100%)" }} />

          {/* content */}
          <div style={{ padding: "1.5rem 2.5rem 2rem" }}>
            <div style={{ display: "flex", alignItems: "center",
              justifyContent: "space-between", marginBottom: "1rem" }}>
              {label(p.code)}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: SANS, fontSize: "0.6rem",
                    fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
                    padding: "0.25rem 0.7rem", border: `1px solid rgba(201,168,76,0.35)`,
                    color: GOLD, borderRadius: 99 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h3 style={{ fontFamily: SERIF, fontSize: "1.45rem", fontWeight: 800,
              color: IVORY, lineHeight: 1.2, marginBottom: "0.5rem" }}>{p.title}</h3>
            <p style={{ fontFamily: SANS, fontSize: "0.75rem", color: MUTED,
              letterSpacing: "0.12em", marginBottom: "1.5rem" }}>📍 {p.loc}</p>

            {/* progress */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between",
                marginBottom: "0.4rem" }}>
                <span style={{ fontFamily: SANS, fontSize: "0.65rem",
                  color: MUTED, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {lang === "ar" ? "تقدم المشروع" : "Project Progress"}
                </span>
                <span style={{ fontFamily: SERIF, fontSize: "0.9rem",
                  fontWeight: 700, color: GOLD }}>{p.prog}%</span>
              </div>
              <div style={{ height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 99 }}>
                <div style={{ height: "100%", width: `${p.prog}%`,
                  background: `linear-gradient(90deg,#a07820,${GOLD})`,
                  borderRadius: 99, transition: "width 1.5s ease" }} />
              </div>
            </div>

            {/* status badge */}
            <div style={{ marginTop: "1.2rem", display: "inline-flex",
              alignItems: "center", gap: "0.5rem",
              background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)",
              padding: "0.35rem 0.9rem", borderRadius: 99 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%",
                background: "#fbbf24", display: "inline-block",
                boxShadow: "0 0 8px #fbbf24", animation: "pulse 1.6s infinite" }} />
              <span style={{ fontFamily: SANS, fontSize: "0.65rem", fontWeight: 600,
                letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>
                {lang === "ar" ? "قيد التنفيذ" : "In Progress"}
              </span>
            </div>
          </div>
        </div>
      ))}

      <PageNum n="04" />
    </div>
  );
}

/* ─── Spread 5 — CTA / Close ────────────────────────────────────── */
function Spread5({ lang }: { lang: string }) {
  return (
    <div style={{ width: "100vw", height: "100vh", background: NAVY,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden" }}>

      {/* decorative large circle */}
      <div style={{ position: "absolute", width: "60vw", height: "60vw",
        border: `1px solid rgba(201,168,76,0.07)`, borderRadius: "50%",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div style={{ position: "absolute", width: "42vw", height: "42vw",
        border: `1px solid rgba(201,168,76,0.05)`, borderRadius: "50%",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      {/* glow */}
      <div style={{ position: "absolute", width: "30vw", height: "30vw",
        background: "radial-gradient(circle, rgba(201,168,76,0.06), transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 3rem" }}>
        {label(lang === "ar" ? "ابدأ مشروعك" : "Start Your Project")}

        <h2 style={{ fontFamily: SERIF,
          fontSize: "clamp(2.8rem,6vw,6rem)", fontWeight: 900,
          lineHeight: 1.05, color: IVORY, marginBottom: "0.5rem" }}>
          {lang === "ar" ? "لنبني معاً" : "Let's Build"}
        </h2>
        <h2 style={{ fontFamily: SERIF,
          fontSize: "clamp(2.8rem,6vw,6rem)", fontWeight: 900,
          lineHeight: 1.05, color: GOLD, marginBottom: "1.5rem",
          fontStyle: "italic" }}>
          {lang === "ar" ? "شيئاً استثنائياً" : "Something Remarkable"}
        </h2>

        {rule({ maxWidth: 180, margin: "1.5rem auto" })}

        <p style={{ fontFamily: SANS, fontSize: "1rem", color: MUTED,
          maxWidth: 440, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
          {lang === "ar"
            ? "مشروعك يستحق الأفضل. تواصل معنا اليوم للحصول على استشارة مجانية وتقييم للموقع."
            : "Your project deserves the best. Contact us for a free consultation and site assessment."}
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/971563780707" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem",
              padding: "0.9rem 2.2rem", borderRadius: 999,
              background: "linear-gradient(135deg,#a07820,#c9a84c)",
              color: "#06090f", fontFamily: SANS, fontSize: "0.85rem",
              fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.528 5.855L0 24l6.33-1.658A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
            {lang === "ar" ? "واتساب" : "WhatsApp Us"}
          </a>
          <a href="mailto:albina.alareeq@gmail.com"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem",
              padding: "0.9rem 2.2rem", borderRadius: 999,
              border: `1px solid rgba(201,168,76,0.4)`,
              background: "rgba(201,168,76,0.06)",
              color: GOLD, fontFamily: SANS, fontSize: "0.85rem",
              fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}>
            {lang === "ar" ? "راسلنا بالبريد" : "Send an Email"}
          </a>
        </div>

        <p style={{ marginTop: "2.5rem", fontFamily: SANS, fontSize: "0.65rem",
          letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED }}>
          fun4you1122-afk.github.io/claude · +971 56 378 07 07
        </p>
      </div>

      <PageNum n="05" />
    </div>
  );
}

/* ─── Page number badge ──────────────────────────────────────────── */
function PageNum({ n }: { n: string }) {
  return (
    <div style={{ position: "absolute", top: "2rem", right: "2rem",
      fontFamily: SERIF, fontSize: "0.7rem", fontWeight: 700,
      letterSpacing: "0.2em", color: MUTED }}>
      {n} / 05
    </div>
  );
}

/* ─── Mobile vertical fallback ──────────────────────────────────── */
function MobileVersion({ lang }: { lang: string }) {
  const cards = lang === "ar"
    ? [
        { icon: "📖", t: "قصتنا",     s: "بناء التميز منذ عام 2014 في قلب أبوظبي." },
        { icon: "🔩", t: "تخصصاتنا",  s: "مقاولات عامة، أعمال مدنية، MEP، تشطيبات." },
        { icon: "⚙️", t: "كيف نعمل",  s: "استشارة، تخطيط، تنفيذ، تسليم — بدقة." },
        { icon: "🏗️", t: "مشاريعنا",  s: "مشروعان نشطان الآن في أبوظبي." },
      ]
    : [
        { icon: "📖", t: "Our Story",    s: "Building excellence since 2014 in Abu Dhabi." },
        { icon: "🔩", t: "Our Craft",    s: "Contracting, Civil, MEP, Interiors — full scope." },
        { icon: "⚙️", t: "How We Build", s: "Consult, plan, build, deliver — with precision." },
        { icon: "🏗️", t: "Our Projects", s: "Two landmark developments active across Abu Dhabi." },
      ];

  return (
    <div style={{ background: NAVY, padding: "4rem 1.5rem" }}>
      <p style={{ fontFamily: SANS, fontSize: "0.6rem", fontWeight: 700,
        letterSpacing: "0.38em", textTransform: "uppercase", color: GOLD,
        marginBottom: "1rem", textAlign: "center" }}>
        {lang === "ar" ? "معرض البناء العريق" : "Albina Alareeq — Magazine"}
      </p>
      <h2 style={{ fontFamily: SERIF, fontSize: "2.2rem", fontWeight: 900,
        color: IVORY, textAlign: "center", marginBottom: "3rem", lineHeight: 1.2 }}>
        {lang === "ar" ? "بُني بدقة" : "Built With\nPrecision"}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {cards.map(({ icon, t, s }) => (
          <div key={t} style={{ padding: "1.5rem", borderRadius: "1rem",
            border: "1px solid rgba(201,168,76,0.18)",
            background: "rgba(201,168,76,0.04)" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: "0.7rem" }}>{icon}</div>
            <p style={{ fontFamily: SERIF, fontSize: "1rem", fontWeight: 700,
              color: IVORY, marginBottom: "0.4rem" }}>{t}</p>
            <p style={{ fontFamily: SANS, fontSize: "0.78rem", color: MUTED,
              lineHeight: 1.6 }}>{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export function MagazineSpread() {
  const { lang } = useLang();
  const wrapRef  = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  // Tracked via matchMedia so rotating a phone / resizing swaps layouts
  // cleanly instead of leaving a stale (or orphaned-pin) variant.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const wrap  = wrapRef.current;
    const strip = stripRef.current;
    if (!wrap || !strip) return;

    const getEnd = () => strip.scrollWidth - window.innerWidth;

    const st = ScrollTrigger.create({
      trigger: wrap,
      pin:        true,
      pinSpacing: true,
      start: "top top",
      end:   () => `+=${getEnd()}`,
      scrub: 1.2,
      onUpdate(self) {
        gsap.set(strip, { x: -self.progress * getEnd() });
        // page indicator: which 20% segment
        setPage(Math.min(5, Math.floor(self.progress * 5) + 1));
      },
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(t);
      st.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, isMobile]);

  if (isMobile) return <MobileVersion lang={lang} />;

  return (
    // dir="ltr": the horizontal strip's GSAP x-translation and inline layout
    // assume LTR flex order; under the page's RTL dir pages 2-5 would slide
    // the wrong way and never appear. Arabic text inside still renders RTL.
    <div ref={wrapRef} dir="ltr" style={{ height: "100vh", overflow: "hidden",
      position: "relative" }}>

      {/* horizontal strip — 500vw */}
      <div ref={stripRef} style={{ display: "flex", height: "100%",
        width: "500vw", willChange: "transform" }}>
        <Spread1 lang={lang} />
        <Spread2 lang={lang} />
        <Spread3 lang={lang} />
        <Spread4 lang={lang} />
        <Spread5 lang={lang} />
      </div>

      {/* top editorial header bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0,
        height: 1, background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />

      {/* bottom nav: page dots + issue label */}
      <div style={{ position: "absolute", bottom: "1.8rem", left: "50%",
        transform: "translateX(-50%)", display: "flex", flexDirection: "column",
        alignItems: "center", gap: "0.8rem", zIndex: 10 }}>

        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
          {[1,2,3,4,5].map(n => (
            <div key={n} style={{
              height: 1,
              width: n === page ? 44 : 14,
              background: n === page
                ? `linear-gradient(90deg,#a07820,${GOLD})`
                : "rgba(255,255,255,0.18)",
              borderRadius: 99,
              transition: "all 0.5s ease",
            }} />
          ))}
        </div>

        <p style={{ fontFamily: SANS, fontSize: "0.55rem", letterSpacing: "0.3em",
          textTransform: "uppercase", color: MUTED }}>
          {lang === "ar"
            ? `الصفحة ${page} من 05 — اسحب للتصفح`
            : `Page ${page} of 05 — scroll to turn`}
        </p>
      </div>

      {/* issue label top-left */}
      <div style={{ position: "absolute", top: "1.4rem", left: "2rem",
        display: "flex", alignItems: "center", gap: "0.7rem" }}>
        <div style={{ width: 24, height: 1, background: GOLD }} />
        <p style={{ fontFamily: SANS, fontSize: "0.58rem", fontWeight: 600,
          letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED }}>
          {lang === "ar" ? "البناء العريق · العدد الأول" : "Albina Alareeq · Issue No. 1"}
        </p>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
