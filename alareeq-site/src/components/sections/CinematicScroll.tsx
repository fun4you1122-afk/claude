import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../../i18n";

gsap.registerPlugin(ScrollTrigger);

// ── Chapters ──────────────────────────────────────────────────────────────────
const CHAPTERS_EN = [
  { at: 0.00, title: "The Vision",     sub: "Every landmark begins with a blueprint" },
  { at: 0.28, title: "The Foundation", sub: "Precision engineering from the ground up" },
  { at: 0.56, title: "The Rise",       sub: "Structures that define Abu Dhabi's skyline" },
  { at: 0.82, title: "The Horizon",    sub: "Building excellence across the Emirates" },
];
const CHAPTERS_AR = [
  { at: 0.00, title: "الرؤية",         sub: "كل معلم يبدأ بمخطط" },
  { at: 0.28, title: "الأساس",         sub: "هندسة دقيقة من قاع الأرض" },
  { at: 0.56, title: "الارتفاع",       sub: "منشآت تحدد أفق أبوظبي" },
  { at: 0.82, title: "الأفق",          sub: "بناء التميز في جميع أنحاء الإمارات" },
];

// ── Camera keyframes [px, py, pz, lx, ly, lz, fov] ───────────────────────────
const CAM_KF = [
  { px:   0, py: 100, pz: 520, lx:   0, ly:  10, lz:    0, fov: 62 },
  { px: -90, py:  30, pz: 310, lx: -60, ly: -20, lz: -120, fov: 54 },
  { px:  70, py: -15, pz: 175, lx:  90, ly:  30, lz: -250, fov: 46 },
  { px: -25, py: -50, pz:  80, lx:   0, ly:  90, lz: -450, fov: 38 },
  { px:   0, py:  20, pz: 430, lx:   0, ly:   0, lz:    0, fov: 68 },
];

// ── Image layers [url, z, w, h, parallax, opacity] ────────────────────────────
const LAYERS = [
  { url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=2000&auto=format&fit=crop&q=70",
    z: -420, w: 2000, h:  900, par: 0.06, alpha: 0.85 },
  { url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&auto=format&fit=crop&q=70",
    z: -220, w: 1600, h:  750, par: 0.12, alpha: 1.00 },
  { url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop&q=70",
    z:  -80, w: 1100, h:  500, par: 0.20, alpha: 0.95 },
  { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&auto=format&fit=crop&q=70",
    z:   60, w:  800, h:  380, par: 0.30, alpha: 0.90 },
];

function lerpKF(kfs: typeof CAM_KF, p: number) {
  const n = kfs.length - 1;
  const seg = Math.min(Math.floor(p * n), n - 1);
  let t = p * n - seg;
  t = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
  const a = kfs[seg], b = kfs[seg + 1];
  const mix = (x: number, y: number) => x + (y - x) * t;
  return {
    px: mix(a.px, b.px), py: mix(a.py, b.py), pz: mix(a.pz, b.pz),
    lx: mix(a.lx, b.lx), ly: mix(a.ly, b.ly), lz: mix(a.lz, b.lz),
    fov: mix(a.fov, b.fov),
  };
}

// ── Component ──────────────────────────────────────────────────────────────────
export function CinematicScroll() {
  const { lang } = useLang();
  const chapters = lang === "ar" ? CHAPTERS_AR : CHAPTERS_EN;

  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const curCh     = useRef(0);
  const [chapterIdx, setChapterIdx] = useState(0);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    // ── Renderer ─────────────────────────────────────────────────────────────
    const W = window.innerWidth, H = window.innerHeight;
    const isSmall = W < 768;
    const renderer = new THREE.WebGLRenderer({ antialias: !isSmall, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setClearColor(0x060c1a);
    canvas.appendChild(renderer.domElement);

    // ── Scene + fog ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060c1a, 0.003);

    // ── Camera ───────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(62, W / H, 1, 3000);
    camera.position.set(0, 100, 520);
    camera.lookAt(0, 10, 0);

    // ── Lights ───────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0x0a1a3a, 0.8);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffd580, 2.0);
    sun.position.set(-150, 300, 200);
    scene.add(sun);

    const rim = new THREE.PointLight(0xc9a84c, 1.5, 1200);
    rim.position.set(300, 150, -300);
    scene.add(rim);

    // ── Sky gradient plane ────────────────────────────────────────────────────
    const skyGeo = new THREE.PlaneGeometry(3200, 1400, 1, 8);
    const skyColorArr = new Float32Array(skyGeo.attributes.position.count * 3);
    for (let i = 0; i < skyGeo.attributes.position.count; i++) {
      const y = skyGeo.attributes.position.getY(i);
      const t = (y + 700) / 1400;
      skyColorArr[i * 3 + 0] = THREE.MathUtils.lerp(0.02, 0.80, t);
      skyColorArr[i * 3 + 1] = THREE.MathUtils.lerp(0.04, 0.66, t);
      skyColorArr[i * 3 + 2] = THREE.MathUtils.lerp(0.10, 0.28, t);
    }
    skyGeo.setAttribute("color", new THREE.BufferAttribute(skyColorArr, 3));
    const skyMesh = new THREE.Mesh(
      skyGeo,
      new THREE.MeshBasicMaterial({ vertexColors: true })
    );
    skyMesh.position.z = -700;
    scene.add(skyMesh);

    // ── Image layers ──────────────────────────────────────────────────────────
    const loader      = new THREE.TextureLoader();
    const meshLayers: THREE.Mesh[] = [];

    LAYERS.forEach((cfg) => {
      const tex = loader.load(cfg.url);
      tex.colorSpace = THREE.SRGBColorSpace;
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(cfg.w, cfg.h),
        new THREE.MeshStandardMaterial({
          map: tex, transparent: true, opacity: cfg.alpha, depthWrite: false,
        })
      );
      mesh.position.z = cfg.z;
      scene.add(mesh);
      meshLayers.push(mesh);
    });

    // ── Dust particles ────────────────────────────────────────────────────────
    const PC   = 350;
    const pPos = new Float32Array(PC * 3);
    const pVel = new Float32Array(PC * 3);
    for (let i = 0; i < PC; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 1600;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 800;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 1000 - 300;
      pVel[i * 3]     = (Math.random() - 0.5) * 0.06;
      pVel[i * 3 + 1] = Math.random() * 0.05 + 0.01;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const dust = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0xc9a84c, size: 2.2, sizeAttenuation: true,
        transparent: true, opacity: 0.4,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
    );
    scene.add(dust);

    // ── Gold orbs ─────────────────────────────────────────────────────────────
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0xffe080, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const orbs = Array.from({ length: 5 }, () => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(3, 6, 6), orbMat);
      m.position.set(
        (Math.random() - 0.5) * 700,
        (Math.random() - 0.5) * 350,
        (Math.random() - 0.5) * 500 - 150,
      );
      m.scale.setScalar(Math.random() * 2 + 0.5);
      scene.add(m);
      return m;
    });

    // ── GSAP ScrollTrigger — pin: true bypasses overflow-x:hidden on ancestors ──
    const st = ScrollTrigger.create({
      trigger: wrap,
      pin:        true,   // GSAP uses position:fixed — immune to parent overflow
      pinSpacing: true,   // adds 400% scroll space automatically
      start: "top top",
      end:   "+=400%",
      scrub: 1.8,
      onUpdate(self) {
        const p = self.progress;

        // Camera path
        const kf = lerpKF(CAM_KF, p);
        camera.position.set(kf.px, kf.py, kf.pz);
        camera.lookAt(kf.lx, kf.ly, kf.lz);
        camera.fov = kf.fov;
        camera.updateProjectionMatrix();

        // Layer parallax
        meshLayers.forEach((mesh, i) => {
          mesh.position.x = camera.position.x * LAYERS[i].par * -1.2;
          mesh.position.y = camera.position.y * LAYERS[i].par * -0.5;
        });
        skyMesh.position.x = camera.position.x * -0.012;
        skyMesh.position.y = camera.position.y * -0.008;

        // Particles follow scroll
        dust.position.y  = p * 90;
        dust.rotation.y  = p * 0.4;
        dust.rotation.x  = Math.sin(p * Math.PI) * 0.07;

        // Fog pulses
        (scene.fog as THREE.FogExp2).density = 0.002 + Math.sin(p * Math.PI) * 0.005;

        // Lights: cool dawn → warm golden hour
        ambient.color.setHSL(0.14 + p * 0.04, 0.45 + p * 0.3, 0.04 + p * 0.20);
        ambient.intensity = 0.8 + p * 1.2;
        sun.intensity     = 1.0 + p * 2.0;
        sun.color.setHSL(0.12 - p * 0.02, 0.55 + p * 0.2, 0.55 + p * 0.35);
        rim.position.x    = 300 - p * 600;
        rim.intensity     = 0.6 + Math.sin(p * Math.PI) * 1.6;

        // Orb pulse
        orbs.forEach((orb, i) => {
          (orb.material as THREE.MeshBasicMaterial).opacity =
            0.25 + Math.sin(p * Math.PI * 2 + i * 1.2) * 0.35;
        });

        // Chapter switch
        const chs = lang === "ar" ? CHAPTERS_AR : CHAPTERS_EN;
        let idx = 0;
        chs.forEach((ch, i) => { if (p >= ch.at) idx = i; });
        if (idx !== curCh.current) { curCh.current = idx; setChapterIdx(idx); }
      },
    });

    // Refresh after a tick so GSAP has correct measurements
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);

    // ── Render loop — only runs while the section is on screen ───────────────
    let rafId = 0;
    let running = false;
    let t = 0;
    const animate = () => {
      if (!running) return;
      rafId = requestAnimationFrame(animate);
      t += 0.007;

      // Drift particles
      const posAttr = pGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PC; i++) {
        posAttr.array[i * 3]     += pVel[i * 3];
        posAttr.array[i * 3 + 1] += pVel[i * 3 + 1];
        if (posAttr.array[i * 3 + 1] >  500) posAttr.array[i * 3 + 1] = -400;
        if (posAttr.array[i * 3]     >  800) posAttr.array[i * 3]     = -800;
        if (posAttr.array[i * 3]     < -800) posAttr.array[i * 3]     =  800;
      }
      posAttr.needsUpdate = true;

      // Layer micro-sway
      meshLayers.forEach((m, i) => {
        m.rotation.z = Math.sin(t * 0.12 + i * 0.8) * 0.003;
      });

      // Orb float
      orbs.forEach((orb, i) => {
        orb.position.y += Math.sin(t * 0.35 + i) * 0.18;
        orb.position.x += Math.sin(t * 0.22 + i * 1.4) * 0.12;
      });

      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(animate);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    // GSAP pins `wrap` (position: fixed) while active, so observing it tracks
    // exactly when the scene is visible. Off-screen → zero GPU work.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startLoop() : stopLoop()),
      { rootMargin: "100px 0px" }
    );
    io.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else if (st.isActive || wrap.getBoundingClientRect().top < window.innerHeight) startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(refreshTimer);
      stopLoop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      st.kill();
      ScrollTrigger.refresh();
      renderer.dispose();
      if (canvas.contains(renderer.domElement)) canvas.removeChild(renderer.domElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const ch = chapters[chapterIdx];

  return (
    // GSAP pins this element and adds 400% scroll space below it
    <div ref={wrapRef} className="relative w-full" style={{ height: "100vh", background: "hsl(222,47%,3%)" }}>

      {/* Three.js canvas */}
      <div ref={canvasRef} className="absolute inset-0 overflow-hidden" />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)" }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)" }} />

      {/* Chapter text — re-mounts on key change to re-trigger animation */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <div
          key={chapterIdx}
          style={{ animation: "cinFade 0.7s cubic-bezier(0.16,1,0.3,1) both", textAlign: "center", padding: "0 1.5rem" }}
        >
          <p style={{ marginBottom: "0.75rem", fontSize: "0.65rem", fontWeight: 600,
            letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,168,76,0.75)" }}>
            Albina Alareeq &mdash; {chapterIdx + 1} / {chapters.length}
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            fontWeight: 900, lineHeight: 1.1,
            background: "linear-gradient(135deg,#a07820,#c9a84c,#e8c96a,#fff8df)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(201,168,76,0.35))",
          }}>
            {ch?.title}
          </h2>
          <p style={{ marginTop: "1rem", fontSize: "clamp(0.85rem,2vw,1.1rem)",
            color: "rgba(255,255,255,0.65)", letterSpacing: "0.06em" }}>
            {ch?.sub}
          </p>
        </div>
      </div>

      {/* Chapter progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {chapters.map((_, i) => (
          <div key={i} style={{
            height: "1px",
            width: i === chapterIdx ? "44px" : "14px",
            background: i === chapterIdx
              ? "linear-gradient(90deg,#a07820,#e8c96a)"
              : "rgba(255,255,255,0.18)",
            transition: "all 0.6s ease",
          }} />
        ))}
      </div>

      {/* Scroll cue */}
      {chapterIdx === 0 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div style={{
            width: "1px", height: "48px",
            background: "linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)",
            animation: "pulse 1.6s ease-in-out infinite",
          }} />
        </div>
      )}

      {/* Keyframe CSS */}
      <style>{`
        @keyframes cinFade {
          from { opacity: 0; transform: translateY(20px) scale(0.97); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0);   }
        }
      `}</style>
    </div>
  );
}
