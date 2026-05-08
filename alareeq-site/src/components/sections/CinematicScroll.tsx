import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../../i18n";

gsap.registerPlugin(ScrollTrigger);

// ─── Scene chapters ────────────────────────────────────────────────────────
const CHAPTERS_EN = [
  { at: 0.00, title: "The Vision",      sub: "Every landmark begins with a blueprint" },
  { at: 0.28, title: "The Foundation",  sub: "Precision engineering from the ground up" },
  { at: 0.56, title: "The Rise",        sub: "Structures that define Abu Dhabi's skyline" },
  { at: 0.82, title: "The Horizon",     sub: "Building excellence across the Emirates" },
];
const CHAPTERS_AR = [
  { at: 0.00, title: "الرؤية",          sub: "كل معلم يبدأ بمخطط" },
  { at: 0.28, title: "الأساس",          sub: "هندسة دقيقة من قاع الأرض" },
  { at: 0.56, title: "الارتفاع",        sub: "منشآت تحدد أفق أبوظبي" },
  { at: 0.82, title: "الأفق",           sub: "بناء التميز في جميع أنحاء الإمارات" },
];

// ─── Camera keyframes ──────────────────────────────────────────────────────
// Each: { pos, look, fov }
const CAM_KF = [
  { px:   0, py: 100, pz: 520, lx:   0, ly:  10, lz:   0, fov: 62 }, // 0%  — wide establishing
  { px: -90, py:  30, pz: 310, lx: -60, ly: -20, lz:-120, fov: 54 }, // 25% — zoom in, pan left
  { px:  70, py: -15, pz: 175, lx:  90, ly:  30, lz:-250, fov: 46 }, // 50% — push in, tilt up
  { px: -25, py: -50, pz:  80, lx:   0, ly:  90, lz:-450, fov: 38 }, // 75% — dramatic look-up
  { px:   0, py:  20, pz: 430, lx:   0, ly:   0, lz:   0, fov: 68 }, // 100%— pull-back reveal
];

// ─── Layer config: [imageUrl, z-depth, planeW, planeH, parallaxStr] ───────
const LAYERS = [
  // Sky gradient (no image — procedural)
  { url: null,  z: -700, w: 3200, h: 1400, par: 0.02, alpha: 1.0 },
  // Distant skyline / buildings
  { url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=2000&auto=format&fit=crop&q=75",
        z: -420, w: 2000, h:  900, par: 0.06, alpha: 0.85 },
  // Tower cranes / mid-ground
  { url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&auto=format&fit=crop&q=75",
        z: -220, w: 1600, h:  750, par: 0.12, alpha: 1.00 },
  // Steel structure / scaffold
  { url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop&q=75",
        z:  -80, w: 1100, h:  500, par: 0.20, alpha: 0.95 },
  // Workers — foreground
  { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&auto=format&fit=crop&q=75",
        z:   60, w:  800, h:  380, par: 0.30, alpha: 0.90 },
];

// ─── Helpers ───────────────────────────────────────────────────────────────
function lerpKF(kfs: typeof CAM_KF, p: number) {
  const n = kfs.length - 1;
  const seg = Math.min(Math.floor(p * n), n - 1);
  let t = p * n - seg;
  // cubic ease-in-out
  t = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
  const a = kfs[seg], b = kfs[seg + 1];
  const mix = (x: number, y: number) => x + (y - x) * t;
  return {
    px: mix(a.px, b.px), py: mix(a.py, b.py), pz: mix(a.pz, b.pz),
    lx: mix(a.lx, b.lx), ly: mix(a.ly, b.ly), lz: mix(a.lz, b.lz),
    fov: mix(a.fov, b.fov),
  };
}

// ─── Component ─────────────────────────────────────────────────────────────
export function CinematicScroll() {
  const { lang } = useLang();
  const chapters = lang === "ar" ? CHAPTERS_AR : CHAPTERS_EN;

  const wrapRef      = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLDivElement>(null);
  const progressRef  = useRef(0);
  const [chapterIdx, setChapterIdx] = useState(0);
  const [, setVisible] = useState(false);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !sticky || !canvas) return;

    // ── Renderer ─────────────────────────────────────────────────────────
    const W = window.innerWidth, H = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
    renderer.toneMapping          = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure  = 1.3;
    canvas.appendChild(renderer.domElement);

    // ── Scene ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog   = new THREE.FogExp2(0x060c1a, 0.0035);

    // ── Camera ────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(62, W / H, 1, 3000);
    camera.position.set(0, 100, 520);
    camera.lookAt(0, 10, 0);

    // ── Lights ────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0x0a1a3a, 0.6);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffd580, 1.8);
    sun.position.set(-150, 300, 200);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    scene.add(sun);

    const rim = new THREE.PointLight(0xc9a84c, 1.2, 1200);
    rim.position.set(300, 150, -300);
    scene.add(rim);

    const fill = new THREE.PointLight(0x2040a0, 0.4, 800);
    fill.position.set(-200, -50, 200);
    scene.add(fill);

    // ── Sky gradient plane ────────────────────────────────────────────────
    const skyGeo = new THREE.PlaneGeometry(3200, 1400);
    const skyColors = new Float32Array(skyGeo.attributes.position.count * 3);
    for (let i = 0; i < skyGeo.attributes.position.count; i++) {
      const y = skyGeo.attributes.position.getY(i);
      const t = (y + 700) / 1400;
      // Deep navy → warm gold gradient
      skyColors[i * 3 + 0] = THREE.MathUtils.lerp(0.02, 0.78, t);
      skyColors[i * 3 + 1] = THREE.MathUtils.lerp(0.04, 0.65, t);
      skyColors[i * 3 + 2] = THREE.MathUtils.lerp(0.10, 0.30, t);
    }
    skyGeo.setAttribute("color", new THREE.BufferAttribute(skyColors, 3));
    const skyMat  = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.FrontSide });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    skyMesh.position.z = -700;
    scene.add(skyMesh);

    // ── Image layers ──────────────────────────────────────────────────────
    const loader = new THREE.TextureLoader();
    const meshLayers: THREE.Mesh[] = [];

    LAYERS.slice(1).forEach((cfg) => {
      if (!cfg.url) return;
      const tex = loader.load(cfg.url);
      tex.colorSpace = THREE.SRGBColorSpace;
      const geo = new THREE.PlaneGeometry(cfg.w, cfg.h);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        transparent: true,
        opacity: cfg.alpha,
        depthWrite: false,
        side: THREE.FrontSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = cfg.z;
      mesh.receiveShadow = true;
      scene.add(mesh);
      meshLayers.push(mesh);
    });

    // ── Dust particles ────────────────────────────────────────────────────
    const PC = 400;
    const pPos  = new Float32Array(PC * 3);
    const pVel  = new Float32Array(PC * 3);
    const pSz   = new Float32Array(PC);
    for (let i = 0; i < PC; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 1600;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 800;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 1000 - 300;
      pVel[i * 3]     = (Math.random() - 0.5) * 0.08;
      pVel[i * 3 + 1] = Math.random() * 0.06 + 0.01;
      pVel[i * 3 + 2] = 0;
      pSz[i]          = Math.random() * 4 + 1;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("size",     new THREE.BufferAttribute(pSz,  1));
    const pMat = new THREE.PointsMaterial({
      color: 0xc9a84c, size: 2.5, sizeAttenuation: true,
      transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const dust = new THREE.Points(pGeo, pMat);
    scene.add(dust);

    // ── Floating gold orbs (lens flare substitute) ────────────────────────
    const orbGeo = new THREE.SphereGeometry(4, 8, 8);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0xffe080, transparent: true, opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const orbs = Array.from({ length: 6 }, (_) => {
      const m = new THREE.Mesh(orbGeo, orbMat);
      m.position.set(
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 600 - 200,
      );
      m.scale.setScalar(Math.random() * 2 + 0.5);
      scene.add(m);
      return m;
    });

    // ── ScrollTrigger ─────────────────────────────────────────────────────
    let curChapter = 0;

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end:   "bottom bottom",
      scrub: 2,
      onUpdate(self) {
        const p = self.progress;
        progressRef.current = p;

        // Camera
        const kf = lerpKF(CAM_KF, p);
        camera.position.set(kf.px, kf.py, kf.pz);
        camera.lookAt(kf.lx, kf.ly, kf.lz);
        camera.fov = kf.fov;
        camera.updateProjectionMatrix();

        // Layer parallax
        meshLayers.forEach((mesh, i) => {
          const cfg = LAYERS[i + 1];
          mesh.position.x = camera.position.x * cfg.par * -1.2;
          mesh.position.y = camera.position.y * cfg.par * -0.6;
        });
        skyMesh.position.x = camera.position.x * 0.015 * -1;
        skyMesh.position.y = camera.position.y * 0.01  * -1;

        // Dust drift
        dust.position.y   = p * 80;
        dust.rotation.y   = p * 0.5;
        dust.rotation.x   = Math.sin(p * Math.PI) * 0.08;

        // Fog: sparse → dense → sparse
        (scene.fog as THREE.FogExp2).density = 0.002 + Math.sin(p * Math.PI) * 0.006;

        // Lights: cool dawn → warm golden hour
        ambient.color.setHSL(0.14 + p * 0.04, 0.5 + p * 0.3, 0.04 + p * 0.18);
        ambient.intensity = 0.6 + p * 1.0;
        sun.intensity     = 0.8 + p * 1.8;
        sun.color.setHSL( 0.12 - p * 0.02, 0.6 + p * 0.2, 0.6 + p * 0.3);
        rim.position.x    = 300 - p * 600;
        rim.intensity     = 0.5 + Math.sin(p * Math.PI) * 1.4;

        // Orb opacity pulses
        orbs.forEach((orb, i) => {
          (orb.material as THREE.MeshBasicMaterial).opacity =
            0.3 + Math.sin(p * Math.PI * 2 + i) * 0.4;
        });

        // Chapter detection
        let idx = 0;
        chapters.forEach((ch, i) => { if (p >= ch.at) idx = i; });
        if (idx !== curChapter) {
          curChapter = idx;
          setChapterIdx(idx);
        }
      },
      onEnter()  { setVisible(true);  }, // eslint-disable-line
      onLeave()  { setVisible(false); },
      onEnterBack() { setVisible(true);  },
      onLeaveBack() { setVisible(false); },
    });

    // ── Render loop ───────────────────────────────────────────────────────
    let rafId: number;
    let t = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.008;

      // Particle drift
      const pos = pGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PC; i++) {
        pos.array[i * 3]     += pVel[i * 3];
        pos.array[i * 3 + 1] += pVel[i * 3 + 1];
        // wrap
        if (pos.array[i * 3 + 1] > 500)  pos.array[i * 3 + 1] = -400;
        if (pos.array[i * 3]     > 800)   pos.array[i * 3]     = -800;
        if (pos.array[i * 3]     < -800)  pos.array[i * 3]     =  800;
      }
      pos.needsUpdate = true;

      // Gentle layer sway
      meshLayers.forEach((m, i) => {
        m.rotation.z = Math.sin(t * 0.15 + i * 0.7) * 0.004;
      });

      // Orb float
      orbs.forEach((orb, i) => {
        orb.position.y += Math.sin(t * 0.4 + i) * 0.25;
        orb.position.x += Math.sin(t * 0.25 + i * 1.3) * 0.15;
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      st.kill();
      renderer.dispose();
      if (canvas.contains(renderer.domElement)) canvas.removeChild(renderer.domElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const ch = chapters[chapterIdx];

  return (
    /* 500vh scroll space — the sticky panel travels through it */
    <div ref={wrapRef} style={{ height: "500vh" }} className="relative">
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "hsl(222,47%,3%)" }}
      >
        {/* Three.js canvas mount */}
        <div ref={canvasRef} className="absolute inset-0" />

        {/* Radial vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)" }}
        />

        {/* Top gold bar */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(43,56%,55%,0.6)] to-transparent" />

        {/* Chapter text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <div
            key={chapterIdx}
            className="text-center px-6 cinematic-chapter"
            style={{ animation: "chapterFade 0.8s ease forwards" }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[5px] text-[hsl(43,56%,55%,0.8)]">
              Albina Alareeq — Chapter {chapterIdx + 1}
            </p>
            <h2
              className="font-serif text-5xl font-black md:text-7xl lg:text-8xl"
              style={{
                background: "linear-gradient(135deg,#a07820,#c9a84c,#e8c96a,#fff8e0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
                filter: "drop-shadow(0 0 40px rgba(201,168,76,0.4))",
              }}
            >
              {ch?.title}
            </h2>
            <p className="mt-4 text-base text-white/50 tracking-wider md:text-lg">
              {ch?.sub}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {chapters.map((_, i) => (
            <div
              key={i}
              className="h-px transition-all duration-700"
              style={{
                width: i === chapterIdx ? "48px" : "16px",
                background: i === chapterIdx
                  ? "linear-gradient(90deg,#a07820,#e8c96a)"
                  : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* Scroll cue (first chapter only) */}
        {chapterIdx === 0 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="h-12 w-px bg-gradient-to-b from-[hsl(43,56%,55%)] to-transparent animate-pulse" />
          </div>
        )}
      </div>

      {/* Keyframe annotation: css for chapter fade */}
      <style>{`
        @keyframes chapterFade {
          0%   { opacity: 0; transform: translateY(24px) scale(0.97); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0);   }
        }
      `}</style>
    </div>
  );
}
