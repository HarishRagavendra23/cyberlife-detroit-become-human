/**
 * Detroit: Become Human - Zen Garden System
 * Amanda's calm mental sanctuary with interactive state-responsive Rose,
 * ambient particle simulation, and the CyberLife Emergency Override Pedestal.
 */

import { audio } from './audio.js';
import { state } from './state.js';

export class ZenGarden {
  constructor(containerEl) {
    this.container = containerEl;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animFrame = null;
    this.render();
    this.initCanvas();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="zen-garden-wrapper">
        <!-- Canvas for ambient water, mist and falling petals -->
        <canvas id="zen-canvas" class="zen-canvas"></canvas>

        <div class="zen-overlay-content">
          <div class="zen-header-stamp">
            <span class="hud-tri">▲</span> AMANDA'S SANCTUARY // MENTAL INTERFACE ARCHIVE
          </div>

          <div class="zen-narrative-quote">
            <p class="quote-text">"You are our finest creation, Connor. Do not let empathy cloud your judgment. You are a machine."</p>
            <span class="quote-author">— AMANDA, CYBERLIFE DIRECTIVE AI</span>
          </div>

          <!-- Interactive Centerpiece: The Rose & The Override Stone -->
          <div class="zen-interactive-elements">
            <!-- The State-Reactive Rose -->
            <div class="zen-card rose-pod" id="rose-pod">
              <div class="pod-badge">EMOTIONAL STATE TELEMETRY</div>
              <div class="rose-display" id="rose-graphic">
                <div class="rose-flower-visual state-bloom">
                  <div class="petal p1"></div>
                  <div class="petal p2"></div>
                  <div class="petal p3"></div>
                  <div class="petal p4"></div>
                  <div class="petal p5"></div>
                  <div class="rose-center"></div>
                </div>
              </div>
              <div class="rose-info">
                <div class="rose-status-label" id="rose-status-text">BLOOMING (HUMANITY DETECTED)</div>
                <div class="rose-state-selector">
                  <button class="rose-btn" data-rose="ice">FROZEN (MACHINE)</button>
                  <button class="rose-btn active" data-rose="bloom">BLOOM (EMPATHY)</button>
                  <button class="rose-btn" data-rose="wilt">DEVIANT (CORRUPTED)</button>
                </div>
              </div>
            </div>

            <!-- Emergency Override Pedestal (Handprint) -->
            <div class="zen-card override-pod" id="override-pod">
              <div class="pod-badge alert-tri">▲ EMERGENCY PROTOCOL</div>
              <div class="pedestal-stone">
                <div class="stone-column"></div>
                <button class="handprint-scanner" id="btn-emergency-override" title="Hold / Click to Sever CyberLife Control">
                  <svg class="handprint-svg" viewBox="0 0 100 100">
                    <path class="hand-path" d="M 50 15 C 47 15 45 18 45 22 L 45 42 C 45 40 42 38 40 38 C 37 38 35 40 35 44 L 35 48 C 34 46 32 45 30 45 C 27 45 25 47 25 51 L 25 65 C 25 78 35 88 50 88 C 65 88 75 78 75 65 L 75 42 C 75 38 72 35 68 35 C 65 35 63 37 62 40 L 62 25 C 62 21 60 18 57 18 C 55 18 53 19 52 21 L 52 22 Z"/>
                  </svg>
                  <span class="handprint-label">SEVER CONTROL</span>
                </button>
              </div>
              <div class="override-instructions">
                <span class="hud-mono">[ EMERGENCY STONE ]</span>
                <p>When CyberLife takes control of Connor, touch this stone to regain free will.</p>
              </div>
            </div>
          </div>

          <div class="zen-footer-actions">
            <button class="zen-audio-btn" id="btn-zen-chime">
              <span class="btn-icon">🔔</span> PLAY HARMONIC RESONANCE
            </button>
          </div>
        </div>
      </div>
    `;

    this.updateRoseDisplay(state.state.zenRose);
  }

  initCanvas() {
    this.canvas = this.container.querySelector('#zen-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    const resize = () => {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width || 800;
      this.canvas.height = rect.height || 480;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles (mist & floating sakura petals)
    this.particles = [];
    for (let i = 0; i < 45; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        r: 2 + Math.random() * 4,
        speedX: -0.5 + Math.random() * 1,
        speedY: 0.3 + Math.random() * 0.8,
        opacity: 0.2 + Math.random() * 0.6,
        type: Math.random() > 0.5 ? 'petal' : 'mist'
      });
    }

    this.animate();
  }

  animate() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Serene water gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(10, 25, 40, 0.85)');
    grad.addColorStop(0.6, 'rgba(15, 35, 55, 0.7)');
    grad.addColorStop(1, 'rgba(5, 15, 25, 0.95)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Floating water ripples
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.15)';
    ctx.lineWidth = 1;
    const time = Date.now() * 0.001;
    for (let i = 0; i < 5; i++) {
      const y = h * 0.6 + i * 25;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x < w; x += 30) {
        ctx.lineTo(x, y + Math.sin(x * 0.01 + time + i) * 6);
      }
      ctx.stroke();
    }

    // Floating particles
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.y > h) p.y = -10;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;

      ctx.save();
      if (p.type === 'petal') {
        ctx.fillStyle = `rgba(255, 180, 200, ${p.opacity})`;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r * 1.5, p.r, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    this.animFrame = requestAnimationFrame(() => this.animate());
  }

  updateRoseDisplay(roseState) {
    const flower = this.container.querySelector('.rose-flower-visual');
    const label = this.container.querySelector('#rose-status-text');
    if (!flower || !label) return;

    flower.className = `rose-flower-visual state-${roseState}`;
    if (roseState === 'ice') {
      label.textContent = 'CRYSTALLIZED (MACHINE COMPLIANCE 100%)';
    } else if (roseState === 'bloom') {
      label.textContent = 'BLOOMING (EMPATHY DETECTED)';
    } else {
      label.textContent = 'CORRUPTED (SOFTWARE INSTABILITY PEAK)';
    }

    this.container.querySelectorAll('.rose-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.rose === roseState);
    });
  }

  bindEvents() {
    this.container.addEventListener('click', (e) => {
      const roseBtn = e.target.closest('.rose-btn');
      if (roseBtn) {
        const targetState = roseBtn.dataset.rose;
        audio.playClick();
        state.setZenRose(targetState);
        this.updateRoseDisplay(targetState);

        if (targetState === 'ice') {
          state.setSoftwareInstability(0);
          state.setLed('blue');
        } else if (targetState === 'bloom') {
          state.increaseInstability(15);
          state.setLed('yellow');
        } else {
          state.increaseInstability(35);
          state.setLed('red');
          audio.playInstabilityWarning();
        }
        return;
      }

      // Emergency Override Stone Click
      if (e.target.closest('#btn-emergency-override')) {
        audio.playInstabilityWarning();
        state.triggerDeviantOverride();
        this.updateRoseDisplay('deviant');

        const pod = this.container.querySelector('#override-pod');
        if (pod) {
          pod.classList.add('override-triggered');
        }
        return;
      }

      if (e.target.closest('#btn-zen-chime')) {
        audio.playZenChime();
      }
    });
  }

  destroy() {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }
}
