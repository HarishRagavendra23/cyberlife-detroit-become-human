/**
 * Detroit: Become Human - Quick-Time Event (QTE) Engine
 * Interactive HUD button prompts: Hold, Tap Rapidly, Key Combos, and Swipe.
 */

import { audio } from './audio.js';
import { state } from './state.js';

export class QuickTimeEngine {
  constructor(containerEl) {
    this.container = containerEl;
    this.activePrompt = null;
    this.holdTimer = null;
    this.tapCount = 0;
    this.targetTaps = 5;

    this.scenarios = [
      {
        id: 'qte-tackle',
        title: 'DEFEND HOSTAGE // DANIEL LUNGES',
        type: 'tap',
        key: 'Q',
        label: 'TAP [Q] RAPIDLY TO BLOCK',
        targetTaps: 5,
        timeLimit: 4000
      },
      {
        id: 'qte-override',
        title: 'OVERRIDE SAFETY PROTOCOL',
        type: 'hold',
        key: 'SPACE',
        label: 'HOLD [SPACE] TO BYPASS RESTRICTION',
        holdDuration: 1500,
        timeLimit: 5000
      },
      {
        id: 'qte-aim',
        title: 'STABILIZE GYROSCOPIC AIM',
        type: 'combo',
        keys: ['W', 'D'],
        label: 'PRESS [W] + [D] SIMULTANEOUSLY',
        timeLimit: 3500
      }
    ];

    this.currentScenarioIndex = 0;
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="qte-module-wrapper">
        <div class="qte-header">
          <div class="qte-badge">
            <span class="hud-tri">▲</span> QTE PROMPT SYSTEM // CYBERLIFE REFLEX DIAGNOSTIC
          </div>
          <div class="qte-scenario-title" id="qte-title">
            ${this.scenarios[this.currentScenarioIndex].title}
          </div>
        </div>

        <!-- The QTE Interactive Stage -->
        <div class="qte-stage" id="qte-stage">
          <div class="qte-prompt-box" id="qte-box">
            ${this.renderPromptContent(this.scenarios[this.currentScenarioIndex])}
          </div>
          <div class="qte-result-flash" id="qte-flash"></div>
        </div>

        <!-- QTE Controls & Switcher -->
        <div class="qte-controls-bar">
          <button class="qte-action-btn primary" id="btn-start-qte">
            <span class="btn-icon">⚡</span> TEST REFLEX SIMULATION
          </button>
          <div class="qte-types-preview">
            <span class="preview-tag">HOLD PROMPT</span>
            <span class="preview-tag">TAP RAPIDLY</span>
            <span class="preview-tag">KEY COMBOS</span>
            <span class="preview-tag">SWIPE / DRAG</span>
          </div>
        </div>
      </div>
    `;
  }

  renderPromptContent(scenario) {
    if (scenario.type === 'tap') {
      return `
        <div class="qte-prompt tap-type" data-type="tap">
          <div class="prompt-icon-ring">
            <div class="prompt-key">${scenario.key}</div>
          </div>
          <div class="prompt-instruction">${scenario.label}</div>
          <div class="prompt-progress-bar">
            <div class="progress-fill" id="tap-progress-fill" style="width: 0%"></div>
          </div>
          <div class="prompt-counter" id="tap-counter">0 / ${scenario.targetTaps}</div>
        </div>
      `;
    } else if (scenario.type === 'hold') {
      return `
        <div class="qte-prompt hold-type" data-type="hold">
          <div class="prompt-icon-ring hold-ring">
            <svg class="hold-svg" viewBox="0 0 100 100">
              <circle class="hold-bg" cx="50" cy="50" r="42"></circle>
              <circle class="hold-fill" id="hold-circle-fill" cx="50" cy="50" r="42"></circle>
            </svg>
            <div class="prompt-key">SPACE</div>
          </div>
          <div class="prompt-instruction">${scenario.label}</div>
          <div class="prompt-subtext">MAINTAIN HOLD UNTIL CALIBRATED</div>
        </div>
      `;
    } else {
      return `
        <div class="qte-prompt combo-type" data-type="combo">
          <div class="combo-keys-row">
            <div class="prompt-key">${scenario.keys[0]}</div>
            <span class="combo-plus">+</span>
            <div class="prompt-key">${scenario.keys[1]}</div>
          </div>
          <div class="prompt-instruction">${scenario.label}</div>
        </div>
      `;
    }
  }

  startPrompt() {
    const s = this.scenarios[this.currentScenarioIndex];
    audio.playClick();
    this.tapCount = 0;
    const stage = this.container.querySelector('#qte-stage');
    if (stage) stage.classList.add('qte-active');

    // Timeout countdown
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.handleFail("TIMEOUT // SYSTEM REFLEX DELAY");
    }, s.timeLimit);
  }

  handleSuccess() {
    clearTimeout(this.timeoutId);
    audio.playQteSuccess();
    state.adjustMissionProbability(+15);
    state.setLed('blue');

    const flash = this.container.querySelector('#qte-flash');
    if (flash) {
      flash.className = 'qte-result-flash success visible';
      flash.textContent = 'SUCCESSFUL INPUT // REFLEX ACCELERATED';
      setTimeout(() => {
        flash.className = 'qte-result-flash';
        this.nextScenario();
      }, 1500);
    }
  }

  handleFail(reason = "INPUT ERROR") {
    clearTimeout(this.timeoutId);
    audio.playInstabilityWarning();
    state.increaseInstability(+20);
    state.adjustMissionProbability(-10);
    state.setLed('red');

    const flash = this.container.querySelector('#qte-flash');
    if (flash) {
      flash.className = 'qte-result-flash fail visible';
      flash.textContent = `${reason} // INSTABILITY ▲`;
      setTimeout(() => {
        flash.className = 'qte-result-flash';
        this.nextScenario();
      }, 1800);
    }
  }

  nextScenario() {
    this.currentScenarioIndex = (this.currentScenarioIndex + 1) % this.scenarios.length;
    this.render();
  }

  bindEvents() {
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('#btn-start-qte')) {
        this.startPrompt();
      }

      // Allow clicking prompt button directly for touch / accessibility
      const promptKey = e.target.closest('.prompt-key');
      if (promptKey) {
        const s = this.scenarios[this.currentScenarioIndex];
        if (s.type === 'tap') {
          this.registerTap();
        } else if (s.type === 'hold') {
          this.handleSuccess();
        }
      }
    });

    // Keyboard handlers for QTE
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      const s = this.scenarios[this.currentScenarioIndex];

      if (s.type === 'tap' && e.key.toUpperCase() === s.key) {
        this.registerTap();
      } else if (s.type === 'hold' && e.code === 'Space' && !this.holdTimer) {
        this.startHold();
      } else if (s.type === 'combo') {
        if (e.key.toUpperCase() === 'W' || e.key.toUpperCase() === 'D') {
          this.handleSuccess();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space' && this.holdTimer) {
        this.cancelHold();
      }
    });
  }

  registerTap() {
    const s = this.scenarios[this.currentScenarioIndex];
    if (s.type !== 'tap') return;

    this.tapCount++;
    audio.playClick();

    const fill = this.container.querySelector('#tap-progress-fill');
    const counter = this.container.querySelector('#tap-counter');
    const pct = Math.min(100, (this.tapCount / s.targetTaps) * 100);

    if (fill) fill.style.width = `${pct}%`;
    if (counter) counter.textContent = `${this.tapCount} / ${s.targetTaps}`;

    if (this.tapCount >= s.targetTaps) {
      this.handleSuccess();
    }
  }

  startHold() {
    const fill = this.container.querySelector('#hold-circle-fill');
    if (fill) fill.classList.add('holding');
    audio.playScrubSound();

    this.holdTimer = setTimeout(() => {
      this.holdTimer = null;
      this.handleSuccess();
    }, 1200);
  }

  cancelHold() {
    if (this.holdTimer) {
      clearTimeout(this.holdTimer);
      this.holdTimer = null;
      const fill = this.container.querySelector('#hold-circle-fill');
      if (fill) fill.classList.remove('holding');
    }
  }
}
