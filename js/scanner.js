/**
 * Detroit: Become Human - Connor's Detective Scan & Analysis Mode
 * Blue holographic wireframe highlight on elements, dynamic target lock-on,
 * technical callouts, and evidence analysis.
 */

import { audio } from './audio.js';
import { state } from './state.js';

export class DetectiveScanner {
  constructor() {
    this.isActive = false;
    this.overlay = null;
    this.targetBox = null;
    this.mousePos = { x: 0, y: 0 };
    this.init();
  }

  init() {
    this.createDom();
    this.bindEvents();
    state.subscribe(s => {
      if (s.scannerActive !== this.isActive) {
        this.setActive(s.scannerActive);
      }
    });
  }

  createDom() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'detroit-scanner-overlay';
    this.overlay.innerHTML = `
      <div class="scanner-grid"></div>
      <div class="scanner-vignette"></div>
      <div class="scanner-hud-bar top-left">
        <span class="hud-mono">[ R2 // CONNOR CYBERNETIC SCAN ]</span>
        <span class="hud-status">ANALYSIS: ACTIVE</span>
      </div>
      <div class="scanner-crosshair" id="scanner-reticle">
        <div class="reticle-box"></div>
        <div class="reticle-corner top-left"></div>
        <div class="reticle-corner top-right"></div>
        <div class="reticle-corner bottom-left"></div>
        <div class="reticle-corner bottom-right"></div>
        <div class="reticle-readout">
          <span class="readout-label">TARGET:</span>
          <span class="readout-val" id="reticle-target-name">SCANNING...</span>
        </div>
      </div>
    `;
    document.body.appendChild(this.overlay);
    this.targetBox = this.overlay.querySelector('#scanner-reticle');
  }

  setActive(active) {
    this.isActive = active;
    if (active) {
      document.body.classList.add('scanner-active');
      this.overlay.classList.add('visible');
      audio.playScanPing();
      state.setLed('yellow');
    } else {
      document.body.classList.remove('scanner-active');
      this.overlay.classList.remove('visible');
      state.setLed('blue');
    }
  }

  toggle() {
    const next = !this.isActive;
    state.toggleScanner(next);
  }

  bindEvents() {
    // Reticle tracks mouse
    window.addEventListener('mousemove', (e) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
      if (this.isActive && this.targetBox) {
        this.targetBox.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    });

    // Toggle shortcut (Press 'F' or 'R')
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key.toLowerCase() === 'f' || e.key.toLowerCase() === 'r') {
        e.preventDefault();
        this.toggle();
      }
    });

    // Hover cards scan effect (even when full overlay isn't open)
    document.addEventListener('mouseover', (e) => {
      const card = e.target.closest('[data-scan-target]');
      if (card) {
        card.classList.add('scanning-hover');
        if (this.isActive) {
          const targetName = card.getAttribute('data-scan-target') || 'ANOMALY DETECTED';
          const nameEl = this.overlay.querySelector('#reticle-target-name');
          if (nameEl) nameEl.textContent = targetName;
          audio.playClick();
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const card = e.target.closest('[data-scan-target]');
      if (card) {
        card.classList.remove('scanning-hover');
      }
    });
  }
}
