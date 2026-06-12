/**
 * Keshav's Portfolio Interactive Features (Static & High-Performance)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Custom Cursor Glow Tracking ---
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth ease-out animation for the global cursor glow
  function animateCursor() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Spotlights for specific hover elements (CP, Projects, & Connect Cards)
  const interactiveCards = document.querySelectorAll('.cp-card, .project-card, .connect-link');
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --- 2. Interactive Canvas Particles Network ---
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let particleCount = window.innerWidth < 768 ? 40 : 80;
    const connectionDistance = 125;
    const mouseRadius = 150;

    let canvasMouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
      canvasMouse.x = e.clientX;
      canvasMouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      canvasMouse.x = null;
      canvasMouse.y = null;
    });

    class Particle {
      constructor() {
        this.reset();
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.5 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce boundaries
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Push away from mouse
        if (canvasMouse.x !== null && canvasMouse.y !== null) {
          const dx = this.x - canvasMouse.x;
          const dy = this.y - canvasMouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 1.5;
            this.y += Math.sin(angle) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
        ctx.fill();
      }
    }

    function initCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      particles = [];
      particleCount = window.innerWidth < 768 ? 40 : 80;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw();

        // Connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (canvasMouse.x !== null && canvasMouse.y !== null) {
          const distToMouse = Math.hypot(p.x - canvasMouse.x, p.y - canvasMouse.y);
          if (distToMouse < mouseRadius) {
            const alpha = (1 - distToMouse / mouseRadius) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(canvasMouse.x, canvasMouse.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => {
      initCanvas();
    });

    initCanvas();
    animateParticles();
  }

  // --- 3. Scroll Spying Navigation Links ---
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNavLink() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200; // Offset for detection

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Special check if we are at bottom of page
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
      currentSectionId = sections[sections.length - 1].getAttribute('id');
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // Trigger on load
});
