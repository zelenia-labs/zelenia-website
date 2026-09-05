/**
 * Interactive Celestial Canvas Engine (Astra-Inspired Spatial Dynamics)
 * Lightweight, GPU-friendly ambient particles with subtle mouse inertia
 */

export function initInteractiveCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const colors = [
    'rgba(0, 85, 255, 0.45)', // Royal Blue #0055FF
    'rgba(0, 229, 255, 0.35)', // Cyan
    'rgba(16, 185, 129, 0.35)', // Emerald
    'rgba(248, 250, 252, 0.35)' // Soft White
  ];

  const particleCount = Math.min(Math.floor((width * height) / 38000), 40);
  const particles = [];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      // Spawn predominantly in the left (0 to 22%) and right (78% to 100%) cosmic flanks
      const spawnLeft = Math.random() < 0.5;
      const flankWidth = width > 900 ? width * 0.22 : width * 0.16;
      this.x = spawnLeft ? Math.random() * flankWidth : width - Math.random() * flankWidth;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2.2 + 1.2;
      this.baseRadius = this.radius;
      // Slower, meditative drift
      this.vx = (Math.random() - 0.5) * 0.12;
      this.vy = (Math.random() - 0.5) * 0.12;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.45 + 0.25;
      this.pulseSpeed = Math.random() * 0.008 + 0.004;
      this.pulseStep = Math.random() * Math.PI;
      this.visibility = 1;
    }

    update(mouseX, mouseY) {
      this.x += this.vx;
      this.y += this.vy;

      // Soft wrap edges
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;

      // Central Readability Sanctuary: keep particles clear of the main text reading column
      const centerX = width / 2;
      const distFromCenter = Math.abs(this.x - centerX);
      const sanctuaryRadius =
        width > 900 ? Math.min(width * 0.34, 520) : Math.min(width * 0.3, 320);
      const fadeBuffer = 140;

      // Gentle repulsion away from the central reading area
      if (distFromCenter < sanctuaryRadius + 60) {
        const pushDir = this.x < centerX ? -1 : 1;
        this.vx += pushDir * 0.01;
      }

      // Compute smooth alpha falloff (invisible in the central reading area)
      if (distFromCenter <= sanctuaryRadius) {
        this.visibility = 0;
      } else if (distFromCenter < sanctuaryRadius + fadeBuffer) {
        this.visibility = (distFromCenter - sanctuaryRadius) / fadeBuffer;
      } else {
        this.visibility = 1;
      }

      // Gentle mouse interaction (soft celestial gravity)
      if (mouseX !== null && mouseY !== null) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.015;
          this.x += dx * force;
          this.y += dy * force;
        }
      }

      this.pulseStep += this.pulseSpeed;
      this.radius = this.baseRadius + Math.sin(this.pulseStep) * 0.4;
    }

    draw(context) {
      if (this.visibility <= 0.02) return;
      context.save();
      context.globalAlpha = this.alpha * this.visibility;
      context.beginPath();
      context.arc(this.x, this.y, Math.max(0.5, this.radius), 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.shadowBlur = 6;
      context.shadowColor = this.color;
      context.fill();
      context.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let mouseX = null;
  let mouseY = null;
  let mouseTimer = null;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
      mouseX = null;
      mouseY = null;
    }, 2500);
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let isRunning = true;
  document.addEventListener('visibilitychange', () => {
    isRunning = !document.hidden;
    if (isRunning) requestAnimationFrame(loop);
  });

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].visibility <= 0.05) continue;
      for (let j = i + 1; j < particles.length; j++) {
        if (particles[j].visibility <= 0.05) continue;
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha =
            (1 - dist / 120) * 0.12 * Math.min(particles[i].visibility, particles[j].visibility);
          if (alpha <= 0.01) continue;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 85, 255, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    drawConnections();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update(mouseX, mouseY);
      particles[i].draw(ctx);
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
