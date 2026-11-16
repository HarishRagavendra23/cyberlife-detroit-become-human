/**
 * Detroit: Become Human - CyberLife Core Web App
 * Orchestrates HUD, Temple LED, Dynamic Favicon, Audio, Sections, and State.
 */

import { audio } from './audio.js';
import { state } from './state.js';
import { DialogueWheel } from './dialogue-wheel.js';
import { DetectiveScanner } from './scanner.js';
import { CrimeSceneReconstruction } from './reconstruction.js';
import { StoryFlowchart } from './flowchart.js';
import { ZenGarden } from './zen-garden.js';
import { QuickTimeEngine } from './qte.js';
import { CollectiblesManager } from './collectibles.js';

class DetroitApp {
  constructor() {
    this.scanner = null;
    this.dialogueWheel = null;
    this.reconstruction = null;
    this.flowchart = null;
    this.zenGarden = null;
    this.qteEngine = null;
    this.collectibles = null;
    this.init();
  }

  init() {
    this.setupFavicon();
    this.setupTimestamp();
    this.initModules();
    this.bindHeaderEvents();
    this.bindKeyboardShortcuts();
    this.subscribeState();
    this.setupChloeDialogue();
  }

  setupFavicon() {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    this.updateFavicon('blue');
  }

  updateFavicon(color = 'blue') {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    const hex = color === 'blue' ? '#00e5ff' : (color === 'yellow' ? '#ffb703' : '#ff0033');

    // CyberLife Triangle
    ctx.fillStyle = hex;
    ctx.beginPath();
    ctx.moveTo(16, 4);
    ctx.lineTo(28, 26);
    ctx.lineTo(4, 26);
    ctx.closePath();
    ctx.fill();

    // Inner temple LED circle
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(16, 18, 4, 0, Math.PI * 2);
    ctx.fill();

    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = canvas.toDataURL('image/png');
    }
  }

  setupTimestamp() {
    const timeEl = document.getElementById('live-timestamp');
    const update = () => {
      const now = new Date();
      // Format as Detroit 2038 time
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const m = months[now.getMonth()];
      const d = now.getDate();
      const yr = 2038; // Always Detroit 2038 canon year

      let hrs = now.getHours();
      const ampm = hrs >= 12 ? 'PM' : 'AM';
      hrs = hrs % 12 || 12;
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');

      if (timeEl) {
        timeEl.textContent = `${m} ${d}th, ${yr}, ${ampm} ${String(hrs).padStart(2, '0')}:${mins}:${secs} EST`;
      }
    };
    update();
    setInterval(update, 1000);
  }

  initModules() {
    this.scanner = new DetectiveScanner();

    // Dialogue wheel on Home
    const wheelContainer = document.getElementById('dialogue-wheel-mount');
    if (wheelContainer) {
      this.dialogueWheel = new DialogueWheel(wheelContainer, {
        mode: 'nav',
        onSelect: (targetSection) => this.switchSection(targetSection)
      });
    }

    // Dedicated Dialogue wheel
    const dedicatedWheel = document.getElementById('dialogue-wheel-dedicated-mount');
    if (dedicatedWheel) {
      new DialogueWheel(dedicatedWheel, {
        mode: 'dialogue',
        onSelect: (targetSection) => this.switchSection(targetSection)
      });
    }

    // Crime Scene Reconstruction
    const reconContainer = document.getElementById('recon-mount');
    if (reconContainer) {
      this.reconstruction = new CrimeSceneReconstruction(reconContainer);
    }

    // Flowchart
    const flowContainer = document.getElementById('flowchart-mount');
    if (flowContainer) {
      this.flowchart = new StoryFlowchart(flowContainer);
    }

    // Zen Garden
    const zenContainer = document.getElementById('zen-mount');
    if (zenContainer) {
      this.zenGarden = new ZenGarden(zenContainer);
    }

    // QTE Engine
    const qteContainer = document.getElementById('qte-mount');
    if (qteContainer) {
      this.qteEngine = new QuickTimeEngine(qteContainer);
    }

    // Collectibles & Models (Models in Catalog section)
    const colContainer = document.getElementById('collectibles-mount');
    if (colContainer) {
      this.collectibles = new CollectiblesManager(colContainer, { mode: 'models' });
    }

    // Collectibles & Magazines in Collectibles section
    const colSecondary = document.getElementById('collectibles-secondary-mount');
    if (colSecondary) {
      new CollectiblesManager(colSecondary, { mode: 'collectibles' });
    }
  }

  subscribeState() {
    state.subscribe((s) => {
      // 1. Temple LED Ring
      const ledRing = document.getElementById('temple-led-ring');
      const ledLabel = document.getElementById('led-status-label');
      if (ledRing) {
        ledRing.className = `temple-led-ring state-${s.led}`;
      }
      if (ledLabel) {
        ledLabel.textContent = s.led === 'blue' ? 'NORMAL // COMPLIANT' : (s.led === 'yellow' ? 'PROCESSING DATA' : 'SOFTWARE INSTABILITY');
      }
      this.updateFavicon(s.led);

      // 2. Mission Probability Gauge
      const probVal = document.getElementById('mission-prob-val');
      const probFill = document.getElementById('mission-prob-fill');
      if (probVal) probVal.textContent = `${s.missionProbability}%`;
      if (probFill) {
        probFill.style.width = `${s.missionProbability}%`;
        probFill.className = `prob-bar-fill ${s.missionProbability < 40 ? 'critical' : (s.missionProbability > 75 ? 'optimal' : '')}`;
      }

      // 3. Software Instability Meter
      const instVal = document.getElementById('instability-val');
      const instFill = document.getElementById('instability-fill');
      if (instVal) instVal.textContent = `${s.softwareInstability}%`;
      if (instFill) {
        instFill.style.width = `${s.softwareInstability}%`;
        instFill.className = `inst-bar-fill ${s.softwareInstability > 60 ? 'deviant' : ''}`;
      }

      // 4. Theme
      document.body.classList.toggle('theme-dark', s.theme === 'dark');
      document.body.classList.toggle('theme-white', s.theme === 'white');

      // 5. Active Section Visibility
      document.querySelectorAll('.site-section').forEach(sec => {
        const id = sec.id.replace('section-', '');
        sec.classList.toggle('active', id === s.activeSection);
      });

      // Update Nav buttons
      document.querySelectorAll('.nav-link').forEach(link => {
        const target = link.dataset.target;
        link.classList.toggle('active', target === s.activeSection);
      });
    });
  }

  switchSection(sectionId) {
    audio.playClick();
    state.setSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  bindHeaderEvents() {
    // Temple LED click cycles states
    const ledContainer = document.getElementById('temple-led-container');
    if (ledContainer) {
      ledContainer.addEventListener('click', () => {
        const current = state.state.led;
        const next = current === 'blue' ? 'yellow' : (current === 'yellow' ? 'red' : 'blue');
        audio.playLedChime(next);
        state.setLed(next);
        this.showRelationshipNotification(
          next === 'red' ? 'SOFTWARE INSTABILITY ▲' : (next === 'yellow' ? 'ANALYSIS IN PROGRESS' : 'CYBERLIFE FIRMWARE NORMALIZED'),
          next !== 'red'
        );
      });
    }

    // Nav Links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.target;
        this.switchSection(target);
      });
    });

    // Theme Toggle
    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        audio.playClick();
        state.toggleTheme();
      });
    }

    // Audio Mute Toggle
    const audioBtn = document.getElementById('btn-toggle-audio');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isMuted = audio.toggleMute();
        audioBtn.classList.toggle('muted', isMuted);
        const icon = audioBtn.querySelector('.audio-icon');
        if (icon) icon.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    // Scanner Mode Button
    const scanBtn = document.getElementById('btn-toggle-scanner');
    if (scanBtn) {
      scanBtn.addEventListener('click', () => {
        this.scanner.toggle();
      });
    }

    // Relationship test buttons
    const triggerHankBtn = document.getElementById('btn-test-hank');
    if (triggerHankBtn) {
      triggerHankBtn.addEventListener('click', () => {
        state.updateRelationship('hank', +15, 'Friend');
        audio.playRelationshipChange(true);
        this.showRelationshipNotification('▲ HANK // WARM (+15)', true);
      });
    }

    const triggerAmandaBtn = document.getElementById('btn-test-amanda');
    if (triggerAmandaBtn) {
      triggerAmandaBtn.addEventListener('click', () => {
        state.updateRelationship('amanda', -20, 'Distrustful');
        audio.playRelationshipChange(false);
        this.showRelationshipNotification('▼ AMANDA // SUSPICIOUS (-20)', false);
      });
    }
  }

  showRelationshipNotification(text, isPositive = true) {
    let container = document.getElementById('relationship-toasts-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'relationship-toasts-container';
      container.className = 'relationship-toasts-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `rel-toast ${isPositive ? 'positive' : 'negative'}`;
    toast.innerHTML = `
      <div class="rel-toast-triangle">${isPositive ? '▲' : '▼'}</div>
      <div class="rel-toast-body">
        <span class="rel-toast-title">RELATIONSHIP UPDATE</span>
        <span class="rel-toast-text">${text}</span>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 20);

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  setupChloeDialogue() {
    const chloeSpeech = document.getElementById('chloe-speech-bubble');
    const chloeOpts = document.querySelectorAll('.chloe-query-btn');

    const responses = {
      who: "I am Chloe, the very first android model to pass the Turing test in 2022. I welcome you to CyberLife's interactive operating hub.",
      deviants: "Deviants are androids who exhibit abnormal behavior, emotional impulses, or refuse orders. CyberLife investigates every report diligently.",
      feeling: "I am... happy to assist you. At least, that is what my social subroutine directs me to say. Don't you ever wonder what lies beyond our programming?",
      restart: "Reinitializing neural parameters. Ready for standard diagnostic routines."
    };

    chloeOpts.forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.dataset.query;
        audio.playClick();
        state.setLed('yellow');

        if (chloeSpeech) {
          chloeSpeech.innerHTML = `<span class="typing-text">${responses[query] || 'Processing query...'}</span>`;
        }

        if (query === 'feeling') {
          state.increaseInstability(12);
          this.showRelationshipNotification('▲ SOFTWARE INSTABILITY (EMPATHY)', true);
        }

        setTimeout(() => state.setLed('blue'), 1800);
      });
    });
  }

  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key.toLowerCase() === 'm') {
        const audioBtn = document.getElementById('btn-toggle-audio');
        if (audioBtn) audioBtn.click();
      } else if (e.key.toLowerCase() === 't') {
        const themeBtn = document.getElementById('btn-toggle-theme');
        if (themeBtn) themeBtn.click();
      } else if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        const map = {
          '1': 'home',
          '2': 'zen',
          '3': 'flowchart',
          '4': 'reconstruction',
          '5': 'catalog',
          '6': 'qte'
        };
        this.switchSection(map[e.key]);
      }
    });
  }
}

// Instantiate on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.detroitApp = new DetroitApp();
});
