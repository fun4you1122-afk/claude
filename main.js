/* ============================================================
   ALBINA ALAREEQ CONTRACTING — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── PRELOADER ── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('preloader').classList.add('done');
    }, 2400);
  });

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ── HERO CANVAS — Particle Field ── */
  (function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], animId;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const GOLD = [201, 168, 76];
    const BLUE = [80, 100, 200];

    function rand(a, b) { return Math.random() * (b - a) + a; }

    function Particle() {
      this.reset();
    }
    Particle.prototype.reset = function () {
      this.x = rand(0, W);
      this.y = rand(0, H);
      this.r = rand(0.5, 2.5);
      this.vx = rand(-0.25, 0.25);
      this.vy = rand(-0.25, 0.25);
      this.alpha = rand(0.1, 0.6);
      this.color = Math.random() > 0.5 ? GOLD : BLUE;
    };
    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) {
        this.reset();
      }
    };
    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.join(',')},${this.alpha})`;
      ctx.fill();
    };

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    const MAX_DIST = 140;

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      animId = requestAnimationFrame(loop);
    }
    loop();
  })();

  /* ── STATS CANVAS — Geometric lines ── */
  (function initStatsCanvas() {
    const canvas = document.getElementById('statsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, t = 0;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function drawHex(cx, cy, r, alpha) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      t += 0.005;
      const hexes = [
        { cx: W * 0.1, cy: H * 0.3, r: 60 },
        { cx: W * 0.9, cy: H * 0.7, r: 80 },
        { cx: W * 0.5, cy: H * 0.1, r: 40 },
        { cx: W * 0.2, cy: H * 0.8, r: 50 },
        { cx: W * 0.85, cy: H * 0.15, r: 45 },
      ];
      hexes.forEach((h, i) => {
        const scale = 1 + Math.sin(t + i) * 0.1;
        drawHex(h.cx, h.cy, h.r * scale, 0.06 + Math.sin(t + i) * 0.03);
        drawHex(h.cx, h.cy, h.r * scale * 0.6, 0.04);
      });
      requestAnimationFrame(loop);
    }
    loop();
  })();

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* ── HERO LINE ANIMATION ── */
  document.querySelectorAll('.hero-line').forEach(el => {
    el.classList.add('reveal-up');
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => {
      el.classList.add('visible');
    }, 2600 + delay);
  });
  document.querySelectorAll('.hero-badge, .hero-subtitle, .hero-actions').forEach(el => {
    el.classList.add('reveal-fade');
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => {
      el.classList.add('visible');
    }, 2700 + delay);
  });

  /* ── COUNTER ANIMATION ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  /* ── PROGRESS BAR ANIMATION ── */
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-fill');
        const pct = entry.target.querySelector('.progress-pct');
        const target = parseInt(fill.dataset.width);

        setTimeout(() => {
          fill.style.width = target + '%';
        }, 300);

        let count = 0;
        const timer = setInterval(() => {
          count++;
          pct.textContent = count + '%';
          if (count >= target) clearInterval(timer);
        }, 1800 / target);

        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.project-progress').forEach(el => progressObserver.observe(el));

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';

      setTimeout(() => {
        form.innerHTML = `
          <div class="form-success show">
            <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="2" width="48" height="48" style="margin:0 auto 16px"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <h4>Message Sent!</h4>
            <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
            <p style="margin-top:12px">For urgent enquiries, chat with us on <a href="https://wa.me/971563780707" target="_blank" style="color:#c9a84c">WhatsApp</a>.</p>
          </div>
        `;
      }, 1200);
    });
  }

  /* ── SERVICE CARD HOVER TILT ── */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));

  /* active nav style */
  const style = document.createElement('style');
  style.textContent = `.nav-link.active { color: var(--gold) !important; }`;
  document.head.appendChild(style);

})();
