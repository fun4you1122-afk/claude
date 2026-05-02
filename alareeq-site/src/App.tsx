import { useState, useCallback } from "react";
import { Navbar }        from "./components/sections/Navbar";
import { Hero }          from "./components/sections/Hero";
import { About }         from "./components/sections/About";
import { Services }      from "./components/sections/Services";
import { WhyUs }         from "./components/sections/WhyUs";
import { Projects }      from "./components/sections/Projects";
import { VideoSection }  from "./components/sections/VideoSection";
import { Gallery }       from "./components/sections/Gallery";
import { Testimonials }  from "./components/sections/Testimonials";
import { Stats }         from "./components/sections/Stats";
import { Partners }      from "./components/sections/Partners";
import { CTABanner }     from "./components/sections/CTABanner";
import { FAQ }           from "./components/sections/FAQ";
import { Contact }       from "./components/sections/Contact";
import { Footer }        from "./components/sections/Footer";
import { Preloader }     from "./components/Preloader";
import { ScrollProgress } from "./components/ScrollProgress";
import { BackToTop }     from "./components/BackToTop";

function WaFab() {
  return (
    <a
      href="https://wa.me/971563780707"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-7 right-7 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_4px_20px_rgba(52,211,153,0.5)] transition-all hover:scale-110 hover:shadow-[0_6px_28px_rgba(52,211,153,0.65)]"
    >
      <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-30" />
      <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-7 w-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.528 5.855L0 24l6.33-1.658A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1.5 text-xs font-medium text-[hsl(var(--foreground))] opacity-0 shadow transition-opacity group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Preloader onDone={onDone} />
      {loaded && (
        <div className="min-h-screen bg-[hsl(var(--background))]" style={{ overflowX: "hidden" }}>
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <Partners />
            <About />
            <WhyUs />
            <Services />
            <Projects />
            <VideoSection />
            <Gallery />
            <Testimonials />
            <Stats />
            <CTABanner />
            <FAQ />
            <Contact />
          </main>
          <Footer />
          <WaFab />
          <BackToTop />
        </div>
      )}
    </>
  );
}
