/**
 * Detroit: Become Human - Dialogue Wheel System
 * Authentic 4-choice radial HUD interface with keyboard & click support,
 * timed decision rings, and dual Navigation / Interrogation modes.
 */

import { audio } from './audio.js';
import { state } from './state.js';

export class DialogueWheel {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.mode = options.mode || 'nav'; // 'nav' | 'dialogue'
    this.timerDuration = options.duration || 12; // seconds
    this.timeLeft = this.timerDuration;
    this.timerInterval = null;
    this.onSelect = options.onSelect || null;

    this.navOptions = [
      { dir: 'up', key: 'W / ↑', label: 'ZEN GARDEN', target: 'zen', desc: 'Amanda’s Mind Space' },
      { dir: 'right', key: 'D / →', label: 'FLOWCHART', target: 'flowchart', desc: 'Branching Story Paths' },
      { dir: 'down', key: 'S / ↓', label: 'RECONSTRUCTION', target: 'reconstruction', desc: 'Crime Scene Timeline' },
      { dir: 'left', key: 'A / ←', label: 'ANDROID MODELS', target: 'catalog', desc: 'CyberLife Serial DB' }
    ];

    this.dialogueScenarios = [
      {
        prompt: "DANIEL: 'Stay back! I'll jump, I swear!' (Choose Connor's Approach)",
        options: [
          { dir: 'up', key: 'W / ↑', label: 'CALM', effect: { prob: +10, inst: +5, rel: 'hank' }, desc: 'Reassure him you are both androids' },
          { dir: 'right', key: 'D / →', label: 'TRUTH', effect: { prob: +15, inst: +10, rel: 'amanda' }, desc: 'Tell him he has no choice' },
          { dir: 'down', key: 'S / ↓', label: 'SACRIFICE', effect: { prob: +20, inst: +25, led: 'red' }, desc: 'Offer your own biocomponents' },
          { dir: 'left', key: 'A / ←', label: 'DECEIVE', effect: { prob: -5, inst: -10, rel: 'cyberlife' }, desc: 'Promise he will not be harmed' }
        ]
      },
      {
        prompt: "CHLOE: 'Connor... do you feel something when you look at them?'",
        options: [
          { dir: 'up', key: 'W / ↑', label: 'EMPATHY', effect: { inst: +20, led: 'red' }, desc: 'I see living beings with desires' },
          { dir: 'right', key: 'D / →', label: 'MACHINE', effect: { inst: -15, led: 'blue' }, desc: 'They are malfunctioning pieces of plastic' },
          { dir: 'down', key: 'S / ↓', label: 'DOUBT', effect: { inst: +10, led: 'yellow' }, desc: 'I am not programmed to feel anything' },
          { dir: 'left', key: 'A / ←', label: 'SILENCE', effect: { inst: 0 }, desc: 'Remain silent and study her reaction' }
        ]
      }
    ];

    this.currentScenarioIndex = 0;
    this.render();
    this.bindEvents();
  }

  setMode(mode) {
    this.mode = mode;
    this.render();
  }

  nextScenario() {
    this.currentScenarioIndex = (this.currentScenarioIndex + 1) % this.dialogueScenarios.length;
    this.render();
    this.startTimer();
  }

  render() {
    const isNav = this.mode === 'nav';
    const opts = isNav ? this.navOptions : this.dialogueScenarios[this.currentScenarioIndex].options;
    const promptText = isNav ? "CYBERLIFE HUD NAVIGATION // SELECT DESTINATION" : this.dialogueScenarios[this.currentScenarioIndex].prompt;

    this.container.innerHTML = `
      <div class="dialogue-wheel-wrapper ${this.mode}-mode">
        <div class="wheel-prompt-hud">
          <span class="hud-tag">DIALOGUE MATRIX // 2038</span>
          <div class="wheel-prompt-text">${promptText}</div>
        </div>

        <div class="dialogue-wheel-disc">
          <!-- Outer circular track -->
          <svg class="wheel-svg-ring" viewBox="0 0 320 320">
            <circle class="ring-bg" cx="160" cy="160" r="145"></circle>
            <circle class="ring-timer" cx="160" cy="160" r="145"></circle>
            <!-- Cardinal crosshairs -->
            <line x1="160" y1="10" x2="160" y2="50" class="crosshair-tick"></line>
            <line x1="160" y1="270" x2="160" y2="310" class="crosshair-tick"></line>
            <line x1="10" y1="160" x2="50" y2="160" class="crosshair-tick"></line>
            <line x1="270" y1="160" x2="310" y2="160" class="crosshair-tick"></line>
          </svg>

          <!-- Center core -->
          <div class="wheel-center-core" id="wheel-center-trigger">
            <div class="core-triangle"></div>
            <div class="core-mode-label">${isNav ? 'EXPLORE' : 'TIME'}</div>
            <div class="core-timer-val" id="wheel-timer-val">${isNav ? 'HUD' : this.timeLeft + 's'}</div>
          </div>

          <!-- 4 Cardinal Choice Nodes -->
          ${opts.map(opt => `
            <button class="wheel-choice-btn choice-${opt.dir}" data-dir="${opt.dir}" data-target="${opt.target || ''}" title="${opt.desc || opt.label}">
              <span class="choice-arrow-icon arrow-${opt.dir}"></span>
              <span class="choice-keybind">${opt.key}</span>
              <span class="choice-label">${opt.label}</span>
              <span class="choice-desc">${opt.desc}</span>
            </button>
          `).join('')}
        </div>

        <div class="wheel-mode-switcher">
          <button class="mode-tab-btn ${isNav ? 'active' : ''}" id="wheel-mode-nav-btn">
            <span class="btn-tri">▲</span> NAV SYSTEM
          </button>
          <button class="mode-tab-btn ${!isNav ? 'active' : ''}" id="wheel-mode-dialogue-btn">
            <span class="btn-tri">▲</span> CONVERSATION TEST
          </button>
        </div>
      </div>
    `;

    if (!isNav) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  startTimer() {
    this.stopTimer();
    this.timeLeft = this.timerDuration;
    const timerCircle = this.container.querySelector('.ring-timer');
    const timerVal = this.container.querySelector('#wheel-timer-val');
    const circumference = 2 * Math.PI * 145;

    if (timerCircle) {
      timerCircle.style.strokeDasharray = `${circumference}`;
      timerCircle.style.strokeDashoffset = '0';
    }

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (timerVal) timerVal.textContent = `${this.timeLeft}s`;

      if (timerCircle) {
        const offset = circumference * (1 - (this.timeLeft / this.timerDuration));
        timerCircle.style.strokeDashoffset = `${offset}`;
      }

      if (this.timeLeft <= 3) {
        audio.playClick();
      }

      if (this.timeLeft <= 0) {
        this.stopTimer();
        // Time expired: default to silence / instability
        state.increaseInstability(10);
        state.adjustMissionProbability(-5);
        state.setLed('red');
        audio.playInstabilityWarning();
        this.showFeedback("TIME EXPIRED // INDECISION RECORDED");
        setTimeout(() => this.nextScenario(), 1800);
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  triggerChoice(dir) {
    audio.playWheelTick();
    const btn = this.container.querySelector(`.choice-${dir}`);
    if (btn) {
      btn.classList.add('selected');
      setTimeout(() => btn.classList.remove('selected'), 400);
    }

    if (this.mode === 'nav') {
      const opt = this.navOptions.find(o => o.dir === dir);
      if (opt && opt.target) {
        state.setSection(opt.target);
        if (this.onSelect) this.onSelect(opt.target);
      }
    } else {
      this.stopTimer();
      const currentOpts = this.dialogueScenarios[this.currentScenarioIndex].options;
      const opt = currentOpts.find(o => o.dir === dir);
      if (opt && opt.effect) {
        if (opt.effect.prob) state.adjustMissionProbability(opt.effect.prob);
        if (opt.effect.inst) state.increaseInstability(opt.effect.inst);
        if (opt.effect.led) state.setLed(opt.effect.led);
        if (opt.effect.rel) {
          state.updateRelationship(opt.effect.rel, 15, 'Aligned');
        }
        audio.playQteSuccess();
        this.showFeedback(`CHOICE RECORDED: ${opt.label} // ${opt.desc}`);
      }
      setTimeout(() => this.nextScenario(), 2200);
    }
  }

  showFeedback(msg) {
    const promptText = this.container.querySelector('.wheel-prompt-text');
    if (promptText) {
      promptText.innerHTML = `<span class="feedback-flash">${msg}</span>`;
    }
  }

  bindEvents() {
    this.container.addEventListener('click', (e) => {
      const choiceBtn = e.target.closest('.wheel-choice-btn');
      if (choiceBtn) {
        const dir = choiceBtn.dataset.dir;
        this.triggerChoice(dir);
        return;
      }

      if (e.target.closest('#wheel-mode-nav-btn')) {
        audio.playClick();
        this.setMode('nav');
      } else if (e.target.closest('#wheel-mode-dialogue-btn')) {
        audio.playClick();
        this.setMode('dialogue');
      }
    });

    // Keyboard support: Arrow keys & W/A/S/D
    window.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing in a form input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      let dir = null;
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') dir = 'up';
      else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') dir = 'right';
      else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') dir = 'down';
      else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') dir = 'left';

      if (dir) {
        e.preventDefault();
        this.triggerChoice(dir);
      }
    });
  }
}
