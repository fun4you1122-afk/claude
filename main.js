/* ═══════════════════════════════════════════════════════════
   ALBINA ALAREEQ — main.js v2
   Three.js 3D city · GSAP ScrollTrigger · Canvas showcase
═══════════════════════════════════════════════════════════ */
(function () {
'use strict';

/* ─── PRELOADER ─────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('out'), 2500);
});

/* ─── NAVBAR ─────────────────────────────────────────────── */
const navbar   = document.getElementById('navbar');
const burger   = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 40), {passive:true});
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

/* ─── SMOOTH SCROLL ──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 70, behavior: 'smooth' }); }
  });
});

/* ═══════════════════════════════════════════════════════════
   THREE.JS — HERO 3D CITY
═══════════════════════════════════════════════════════════ */
function initHeroCity() {
  const canvas = document.getElementById('heroCanvas');
  if (!window.THREE || !canvas) return;

  const scene    = new THREE.Scene();
  scene.fog      = new THREE.FogExp2(0x080810, 0.007);

  const W = () => canvas.clientWidth;
  const H = () => canvas.clientHeight;

  const camera = new THREE.PerspectiveCamera(58, W() / H(), 0.1, 800);
  camera.position.set(0, 28, 72);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.shadowMap.enabled  = true;
  renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
  renderer.toneMapping        = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;

  /* Buildings */
  const buildings = [];
  for (let i = -10; i <= 10; i += 2) {
    for (let j = -10; j <= 10; j += 2) {
      const h  = Math.random() * 28 + 4;
      const w  = Math.random() * 1.5 + 2.5;
      const geo = new THREE.BoxGeometry(w, h, w);

      const isGold = Math.random() > 0.78;
      const col    = isGold ? 0xb8860b : (Math.random() > 0.5 ? 0x152040 : 0x0c1528);
      const emit   = isGold ? 0x3a2200 : 0x04080e;

      const mat  = new THREE.MeshPhongMaterial({ color: col, emissive: emit, shininess: 90 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(i * 3.8, h / 2 - 2, j * 3.8);
      mesh.castShadow = mesh.receiveShadow = true;
      scene.add(mesh);
      buildings.push({ mesh, h });
    }
  }

  /* Ground */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshPhongMaterial({ color: 0x06080f, shininess: 12 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2;
  ground.receiveShadow = true;
  scene.add(ground);

  /* Grid on ground */
  const grid = new THREE.GridHelper(200, 50, 0x161830, 0x0d1020);
  grid.position.y = -1.95;
  scene.add(grid);

  /* Lights */
  scene.add(new THREE.AmbientLight(0x111225, 1));

  const sun = new THREE.DirectionalLight(0xffd08a, 1.8);
  sun.position.set(40, 80, 30);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  scene.add(sun);

  scene.add(Object.assign(new THREE.DirectionalLight(0x2244aa, 0.6), { position: { x: -30, y: 20, z: -20, set(){} } }));
  const fill = new THREE.DirectionalLight(0x2244aa, 0.6);
  fill.position.set(-30, 20, -20);
  scene.add(fill);

  /* City point lights */
  const ptLights = [];
  [[0xc9a84c, 25, 18, 0], [0x2060cc, -25, 14, 20], [0xc9a84c, 10, 20, -30], [0x4488ff, -10, 16, 15]].forEach(([c, x, y, z]) => {
    const pl = new THREE.PointLight(c, 2.5, 55);
    pl.position.set(x, y, z);
    scene.add(pl);
    ptLights.push(pl);
  });

  /* Particles */
  const pN = 3500;
  const pPos = new Float32Array(pN * 3);
  for (let i = 0; i < pN; i++) {
    pPos[i*3]   = (Math.random() - 0.5) * 220;
    pPos[i*3+1] = Math.random() * 90;
    pPos[i*3+2] = (Math.random() - 0.5) * 220;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xc9a84c, size: 0.35, transparent: true, opacity: 0.45, sizeAttenuation: true });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* Mouse parallax on hero */
  let mx = 0, my = 0;
  document.getElementById('hero').addEventListener('mousemove', e => {
    mx = (e.clientX / innerWidth  - 0.5) * 2;
    my = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  /* Resize */
  window.addEventListener('resize', () => {
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  }, { passive: true });

  /* Animate */
  let angle = 0, t = 0;
  (function loop() {
    requestAnimationFrame(loop);
    t += 0.006; angle += 0.0008;

    camera.position.x = Math.sin(angle) * 68 + mx * 3;
    camera.position.z = Math.cos(angle) * 68 + my * 2;
    camera.position.y = 28 + Math.sin(t * 0.4) * 3;
    camera.lookAt(0, 8, 0);

    particles.rotation.y += 0.0002;

    ptLights.forEach((pl, i) => {
      pl.intensity = 2.5 + Math.sin(t * 1.5 + i * 1.2) * 0.8;
    });

    renderer.render(scene, camera);
  })();
}
initHeroCity();

/* ═══════════════════════════════════════════════════════════
   GSAP SCROLL TRIGGER ANIMATIONS
═══════════════════════════════════════════════════════════ */
function initGSAP() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  /* Hero entrance (after preloader) */
  const heroTL = gsap.timeline({ delay: 2.6 });
  heroTL
    .from('#heroLogo',    { y: 30, opacity: 0, duration: .9, ease: 'power3.out' })
    .from('.ht-line',     { y: 60, opacity: 0, duration: .9, stagger: .12, ease: 'power3.out' }, '-=.4')
    .from('#heroSub',     { y: 20, opacity: 0, duration: .7, ease: 'power2.out' }, '-=.4')
    .from('#heroBtns',    { y: 20, opacity: 0, duration: .6, ease: 'power2.out' }, '-=.3')
    .from('.hero-scroll-cue', { opacity: 0, duration: .6 }, '-=.2');

  /* Generic fade-up */
  gsap.utils.toArray('[data-gsap="fade-up"]').forEach(el => {
    gsap.fromTo(el,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: .9, ease: 'power3.out',
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  /* Fade left */
  gsap.utils.toArray('[data-gsap="fade-left"]').forEach(el => {
    gsap.fromTo(el,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: .9, ease: 'power3.out',
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 85%' }
      }
    );
  });

  /* Fade right */
  gsap.utils.toArray('[data-gsap="fade-right"]').forEach(el => {
    gsap.fromTo(el,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      }
    );
  });

  /* Flip cards stagger */
  gsap.utils.toArray('[data-gsap="flip-in"]').forEach(el => {
    gsap.fromTo(el,
      { rotateY: -90, opacity: 0, transformOrigin: 'left center' },
      { rotateY: 0, opacity: 1, duration: .7, ease: 'power2.out',
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  /* Showcase section */
  gsap.utils.toArray('[data-gsap="showcase-anim"]').forEach(el => {
    gsap.fromTo(el.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: .8, stagger: .15, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%' }
      }
    );
  });

  /* Project cards */
  gsap.utils.toArray('[data-gsap="proj-left"]').forEach(el => {
    gsap.fromTo(el,
      { x: -80, opacity: 0, rotateY: 8 },
      { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      }
    );
  });
  gsap.utils.toArray('[data-gsap="proj-right"]').forEach(el => {
    gsap.fromTo(el,
      { x: 80, opacity: 0, rotateY: -8 },
      { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      }
    );
  });

  /* Stat cards pop */
  gsap.utils.toArray('[data-gsap="stat-pop"]').forEach(el => {
    gsap.fromTo(el,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: .7, ease: 'back.out(1.4)',
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  /* Parallax on hero depth dots */
  gsap.to('.d1', { y: -80,  scrollTrigger: { trigger: '#hero', scrub: 1.5 } });
  gsap.to('.d2', { y: -120, scrollTrigger: { trigger: '#hero', scrub: 2 } });
  gsap.to('.d3', { y: -60,  scrollTrigger: { trigger: '#hero', scrub: 1 } });

  /* Active nav */
  document.querySelectorAll('section[id]').forEach(sec => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 50%', end: 'bottom 50%',
      onEnter: () => setActive(sec.id),
      onEnterBack: () => setActive(sec.id),
    });
  });
  function setActive(id) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const a = document.querySelector(`.nav-link[href="#${id}"]`);
    if (a) a.classList.add('active');
  }
}
initGSAP();

/* ═══════════════════════════════════════════════════════════
   PROJECT CARD — 3D Mouse-Tilt
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r   = card.getBoundingClientRect();
    const x   = (e.clientX - r.left) / r.width  - 0.5;
    const y   = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(1200px) rotateX(${-y*7}deg) rotateY(${x*9}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ═══════════════════════════════════════════════════════════
   SHOWCASE CANVAS — Animated City Construction "Video"
═══════════════════════════════════════════════════════════ */
function initShowcase() {
  const canvas = document.getElementById('showcaseCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  /* Building definitions */
  const buildingDefs = [
    {x:.08, w:.045, maxH:.7, color:'#0d1530', win:'#c9a84c'},
    {x:.14, w:.03,  maxH:.5, color:'#0a1020', win:'#2B6CB0'},
    {x:.18, w:.055, maxH:.85,color:'#12203a', win:'#c9a84c'},
    {x:.26, w:.04,  maxH:.4, color:'#0d1525', win:'#4488ff'},
    {x:.30, w:.065, maxH:.75,color:'#101830', win:'#c9a84c'},
    {x:.38, w:.035, maxH:.55,color:'#0a1525', win:'#2B6CB0'},
    {x:.42, w:.05,  maxH:.9, color:'#0f1d36', win:'#c9a84c'},
    {x:.50, w:.04,  maxH:.45,color:'#0d1530', win:'#c9a84c'},
    {x:.54, w:.055, maxH:.65,color:'#0a1020', win:'#4488ff'},
    {x:.62, w:.035, maxH:.5, color:'#12203a', win:'#c9a84c'},
    {x:.66, w:.06,  maxH:.8, color:'#0d1525', win:'#2B6CB0'},
    {x:.74, w:.04,  maxH:.4, color:'#101830', win:'#c9a84c'},
    {x:.78, w:.05,  maxH:.6, color:'#0a1525', win:'#c9a84c'},
    {x:.86, w:.04,  maxH:.55,color:'#0f1d36', win:'#4488ff'},
    {x:.90, w:.06,  maxH:.72,color:'#0d1530', win:'#c9a84c'},
  ];

  /* Each building has a growing progress 0→1 on loop */
  const buildings = buildingDefs.map((d, i) => ({
    ...d,
    progress: 0,
    speed: 0.003 + Math.random() * 0.004,
    phase: i * 0.4,
    windowFlicker: Math.random(),
  }));

  /* Crane */
  let craneX = 0.42, craneAnim = 0;

  /* Stars */
  const stars = Array.from({length: 80}, () => ({
    x: Math.random(), y: Math.random() * 0.5,
    r: Math.random() * 1.2 + 0.2,
    a: Math.random(),
  }));

  let t = 0;

  function drawSky() {
    const grad = ctx.createLinearGradient(0, 0, 0, H * 0.7);
    grad.addColorStop(0,   '#04060f');
    grad.addColorStop(0.4, '#080d20');
    grad.addColorStop(1,   '#0a1028');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  function drawStars() {
    stars.forEach(s => {
      const flicker = 0.4 + Math.sin(t * 2 + s.a * 10) * 0.3;
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,220,${flicker * s.a})`;
      ctx.fill();
    });
  }

  function drawGround() {
    const grad = ctx.createLinearGradient(0, H * 0.88, 0, H);
    grad.addColorStop(0, '#0a0f1e');
    grad.addColorStop(1, '#060810');
    ctx.fillStyle = grad;
    ctx.fillRect(0, H * 0.88, W, H * 0.12);

    /* Road markings */
    ctx.strokeStyle = 'rgba(201,168,76,.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < W; i += 60) {
      ctx.beginPath();
      ctx.moveTo(i, H * 0.92);
      ctx.lineTo(i + 30, H * 0.92);
      ctx.stroke();
    }
  }

  function drawBuilding(b) {
    const bx = b.x * W;
    const bw = b.w * W;
    const maxBH = b.maxH * H * 0.85;
    const currentH = maxBH * b.progress;
    const by = H * 0.88 - currentH;

    if (currentH < 2) return;

    /* Building body */
    ctx.fillStyle = b.color;
    ctx.fillRect(bx, by, bw, currentH);

    /* Building edge highlight */
    ctx.strokeStyle = 'rgba(43,108,176,0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, bw, currentH);

    /* Windows */
    const wRows = Math.floor(currentH / 14);
    const wCols = Math.max(1, Math.floor(bw / 10));
    const wW = bw / (wCols * 2 + 1);
    const wH = 6;

    for (let r = 0; r < wRows; r++) {
      for (let c = 0; c < wCols; c++) {
        const wx = bx + (c * 2 + 1) * wW;
        const wy = by + 8 + r * 14;
        const lit = Math.sin(t * 0.8 + r * 1.3 + c * 0.7 + b.windowFlicker * 5) > 0.1;
        if (lit) {
          ctx.fillStyle = b.win;
          ctx.globalAlpha = 0.3 + Math.sin(t + r + c) * 0.1;
          ctx.fillRect(wx, wy, wW * 0.8, wH);
          ctx.globalAlpha = 1;
        }
      }
    }

    /* Under-construction scaffolding at the top */
    if (b.progress < 0.98) {
      const scaffH = Math.min(30, currentH);
      ctx.strokeStyle = 'rgba(201,168,76,0.5)';
      ctx.lineWidth = 1;
      for (let s = 0; s < scaffH; s += 8) {
        ctx.beginPath(); ctx.moveTo(bx, by + s); ctx.lineTo(bx + bw, by + s); ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(bx + bw / 3, by); ctx.lineTo(bx + bw / 3, by + scaffH); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + bw * 2/3, by); ctx.lineTo(bx + bw * 2/3, by + scaffH); ctx.stroke();
    }
  }

  function drawCrane() {
    const cx = craneX * W;
    const cy = H * 0.88;
    const craneH = H * 0.55;
    craneAnim += 0.008;

    ctx.strokeStyle = 'rgba(201,168,76,0.7)';
    ctx.lineWidth = 2;

    /* Mast */
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - craneH); ctx.stroke();
    /* Horizontal arm */
    ctx.beginPath(); ctx.moveTo(cx - W*0.06, cy - craneH); ctx.lineTo(cx + W*0.1, cy - craneH); ctx.stroke();
    /* Counter arm */
    ctx.beginPath(); ctx.moveTo(cx - W*0.06, cy - craneH); ctx.lineTo(cx - W*0.06, cy - craneH + 20); ctx.stroke();

    /* Hook cable - swings */
    const swing = Math.sin(craneAnim) * W * 0.04;
    const hookX = cx + W*0.05 + swing;
    const hookY = cy - craneH * 0.3;
    ctx.beginPath(); ctx.moveTo(cx + W*0.05, cy - craneH); ctx.lineTo(hookX, hookY); ctx.stroke();

    /* Hook */
    ctx.fillStyle = 'rgba(201,168,76,.8)';
    ctx.fillRect(hookX - 4, hookY, 8, 5);

    /* Cabin */
    ctx.fillStyle = 'rgba(201,168,76,.15)';
    ctx.strokeStyle = 'rgba(201,168,76,.5)';
    ctx.fillRect(cx - 6, cy - craneH - 10, 12, 10);
    ctx.strokeRect(cx - 6, cy - craneH - 10, 12, 10);
  }

  function drawMoon() {
    const mx = W * 0.85, my = H * 0.12;
    const mg = ctx.createRadialGradient(mx, my, 0, mx, my, 30);
    mg.addColorStop(0, 'rgba(255,240,180,0.9)');
    mg.addColorStop(0.5, 'rgba(255,220,100,0.3)');
    mg.addColorStop(1, 'transparent');
    ctx.fillStyle = mg;
    ctx.beginPath(); ctx.arc(mx, my, 30, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(255,235,160,0.8)';
    ctx.beginPath(); ctx.arc(mx, my, 12, 0, Math.PI*2); ctx.fill();
  }

  function drawReflections() {
    ctx.save();
    ctx.globalAlpha = 0.06;
    buildingDefs.forEach(b => {
      const bx = b.x * W;
      const bw = b.w * W;
      const maxBH = b.maxH * H * 0.85;
      const grad = ctx.createLinearGradient(0, H*0.88, 0, H);
      grad.addColorStop(0, b.win);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(bx, H*0.88, bw, Math.min(maxBH * 0.15, H*0.08));
    });
    ctx.restore();
  }

  function loop() {
    requestAnimationFrame(loop);
    t += 0.016;

    /* Advance building growth, loop */
    buildings.forEach((b, i) => {
      const delay = i * 0.3;
      const cycleTime = t * b.speed * 0.8;
      b.progress = Math.min(1, Math.max(0, (cycleTime % 6) < 4.5 ? (cycleTime % 6) / 3 : 1 - ((cycleTime % 6) - 4.5) / 1.5));
    });

    ctx.clearRect(0, 0, W, H);
    drawSky();
    drawMoon();
    drawStars();
    buildings.forEach(drawBuilding);
    drawGround();
    drawReflections();
    drawCrane();

    /* Scan-line video effect */
    const scanY = (t * 60) % H;
    ctx.fillStyle = 'rgba(255,255,255,0.015)';
    ctx.fillRect(0, scanY, W, 2);
  }
  loop();
}
initShowcase();

/* ═══════════════════════════════════════════════════════════
   PROJECT CANVASES — Animated Blueprint
═══════════════════════════════════════════════════════════ */
function initProjectCanvas(canvasId, variant) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  const floorHeights = variant === 1
    ? [8, 10, 10, 10, 10, 10, 10]
    : [8, 8, 8, 8, 8, 8, 8, 8, 8, 8];

  let t = 0;
  (function loop() {
    requestAnimationFrame(loop);
    t += 0.012;

    ctx.fillStyle = '#0d1225';
    ctx.fillRect(0, 0, W, H);

    /* Grid */
    ctx.strokeStyle = 'rgba(43,108,176,0.08)';
    ctx.lineWidth = 0.8;
    for (let x = 0; x < W; x += 20) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += 20) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    /* Building blueprint */
    let totalH = 0;
    floorHeights.forEach(h => totalH += h + 2);
    const startX = W / 2 - 60;
    const startY = H * 0.82;

    floorHeights.forEach((fh, i) => {
      const bw = variant === 1 ? 120 - i*12 : 140 - i*8;
      const bx = W/2 - bw/2;
      let by = startY;
      for (let k = 0; k <= i; k++) by -= floorHeights[k] + 2;

      const pulse = Math.sin(t * 1.5 + i * 0.5) * 0.3 + 0.7;
      ctx.strokeStyle = `rgba(201,168,76,${pulse * 0.8})`;
      ctx.fillStyle   = `rgba(201,168,76,${pulse * 0.06})`;
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      ctx.rect(bx, by, bw, fh);
      ctx.fill();
      ctx.stroke();
    });

    /* Glow */
    const glow = ctx.createRadialGradient(W/2, H*0.5, 0, W/2, H*0.5, W*0.4);
    glow.addColorStop(0, 'rgba(201,168,76,0.06)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    /* Scanline */
    const scanY = (t * 50) % H;
    ctx.fillStyle = 'rgba(43,108,176,0.04)';
    ctx.fillRect(0, scanY, W, 1.5);
  })();
}
initProjectCanvas('projCanvas1', 1);
initProjectCanvas('projCanvas2', 2);

/* ═══════════════════════════════════════════════════════════
   STATS CANVAS — Hexagonal WebGL-like Background
═══════════════════════════════════════════════════════════ */
function initStatsCanvas() {
  const canvas = document.getElementById('statsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  function hex(cx, cy, r, alpha) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI/3 * i - Math.PI/6;
      i === 0 ? ctx.moveTo(cx + r*Math.cos(a), cy + r*Math.sin(a))
               : ctx.lineTo(cx + r*Math.cos(a), cy + r*Math.sin(a));
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }

  const hexes = [
    {cx:0.08,cy:0.2,r:70},{cx:0.92,cy:0.8,r:90},
    {cx:0.5, cy:0.1,r:45},{cx:0.15,cy:0.85,r:55},
    {cx:0.88,cy:0.15,r:50},{cx:0.5,cy:0.9,r:65},
  ];

  (function loop() {
    requestAnimationFrame(loop);
    t += 0.005;
    ctx.clearRect(0, 0, W, H);

    hexes.forEach((h, i) => {
      const scale = 1 + Math.sin(t + i) * 0.12;
      const alpha = 0.06 + Math.sin(t * 1.2 + i) * 0.03;
      hex(h.cx * W, h.cy * H, h.r * scale, alpha);
      hex(h.cx * W, h.cy * H, h.r * scale * 0.55, alpha * 0.7);
    });

    /* Floating particles */
    for (let i = 0; i < 30; i++) {
      const px = (Math.sin(t * 0.5 + i * 2.1) * 0.5 + 0.5) * W;
      const py = (Math.cos(t * 0.4 + i * 1.7) * 0.5 + 0.5) * H;
      const alpha = (Math.sin(t + i) * 0.5 + 0.5) * 0.2;
      ctx.beginPath();
      ctx.arc(px, py, 1.2, 0, Math.PI*2);
      ctx.fillStyle = `rgba(201,168,76,${alpha})`;
      ctx.fill();
    }
  })();
}
initStatsCanvas();

/* ═══════════════════════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════════════════════ */
function animCount(el) {
  const target = parseInt(el.dataset.t || el.dataset.counter || 0);
  const duration = 2000, step = 16;
  const inc = target / (duration / step);
  let cur = 0;
  const timer = setInterval(() => {
    cur = Math.min(cur + inc, target);
    el.textContent = Math.floor(cur);
    if (cur >= target) clearInterval(timer);
  }, step);
}

const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animCount(e.target); cntObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.cnt, [data-counter]').forEach(el => cntObs.observe(el));

/* ═══════════════════════════════════════════════════════════
   PROGRESS BARS
═══════════════════════════════════════════════════════════ */
const progObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const wrap = e.target;
    const fill = wrap.querySelector('.pp-fill');
    const pct  = wrap.querySelector('.pp-pct');
    const target = parseInt(fill.dataset.w);

    setTimeout(() => { fill.style.width = target + '%'; }, 250);

    let c = 0;
    const timer = setInterval(() => {
      c++; pct.textContent = c + '%';
      if (c >= target) clearInterval(timer);
    }, 2000 / target);

    progObs.unobserve(wrap);
  });
}, { threshold: 0.4 });
document.querySelectorAll('.proj-progress').forEach(el => progObs.observe(el));

/* ═══════════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════════ */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="animation:spin .8s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg> Sending...';

    setTimeout(() => {
      form.innerHTML = `
        <div style="text-align:center;padding:40px 20px">
          <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="2" width="56" height="56" style="margin:0 auto 16px;display:block"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <h4 style="color:#c9a84c;font-family:'Playfair Display',serif;font-size:1.3rem;margin-bottom:10px">Message Sent!</h4>
          <p style="color:#7070a0;font-size:.9rem">Thank you — our team will reach you within 24 hours.</p>
          <p style="color:#7070a0;font-size:.85rem;margin-top:12px">For urgent enquiries, chat on <a href="https://wa.me/971563780707" target="_blank" style="color:#c9a84c">WhatsApp</a>.</p>
        </div>`;
    }, 1200);
  });
}

/* ═══════════════════════════════════════════════════════════
   SPIN KEYFRAME for button
═══════════════════════════════════════════════════════════ */
const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
document.head.appendChild(spinStyle);

})();
