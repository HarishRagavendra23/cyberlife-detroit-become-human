/**
 * Detroit: Become Human - Crime Scene Reconstruction System
 * Interactive timeline scrubber with Rewind/Play/Fast-Forward,
 * blue holographic ghost reconstructions, trajectory lines, and clue discovery.
 */

import { audio } from './audio.js';
import { state } from './state.js';

export class CrimeSceneReconstruction {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentTime = 0; // seconds 0 to 120
    this.maxTime = 120;
    this.isPlaying = false;
    this.playbackInterval = null;

    this.events = [
      {
        id: 'gun',
        time: 32,
        title: 'Officer Weapon Discarded',
        clueKey: 'gun',
        desc: 'Officer dropped standard issue handgun beneath terrace table.',
        x: 220,
        y: 280,
        unlocked: false
      },
      {
        id: 'blood',
        time: 68,
        title: 'Thirium 310 Blue Blood Splatter',
        clueKey: 'blood',
        desc: 'Deviant sustained damage to left thoracic pump regulator.',
        x: 480,
        y: 210,
        unlocked: false
      },
      {
        id: 'trajectory',
        time: 104,
        title: 'Balcony Confrontation Path',
        clueKey: 'fish',
        desc: 'Hostage Emma held at terrace railing edge; deviant blinded by sun glare.',
        x: 640,
        y: 140,
        unlocked: false
      }
    ];

    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="reconstruction-wrapper">
        <div class="recon-header">
          <div class="recon-title-badge">
            <span class="hud-tri">▲</span> CRIME SCENE RECONSTRUCTION // 3D TEMPORAL MATRIX
          </div>
          <div class="recon-metadata">
            <span class="meta-tag">LOCATION: PENTHOUSE BALCONY</span>
            <span class="meta-tag">VICTIM: EMMA PHILLIPS</span>
            <span class="meta-tag">SUSPECT: DANIEL (PL600)</span>
          </div>
        </div>

        <!-- 3D Holographic Canvas Simulation -->
        <div class="recon-viewport" id="recon-viewport">
          <canvas id="recon-canvas" width="800" height="420"></canvas>

          <!-- Interactive clue overlays over the scene -->
          <div class="recon-evidence-markers" id="recon-markers">
            ${this.events.map(ev => `
              <div class="evidence-node ${ev.unlocked ? 'discovered' : ''}" 
                   id="marker-${ev.id}" 
                   style="left: ${(ev.x / 800) * 100}%; top: ${(ev.y / 420) * 100}%;"
                   data-event-id="${ev.id}">
                <div class="pulse-ring"></div>
                <div class="node-point"></div>
                <div class="node-tooltip">
                  <span class="tt-time">[00:${String(ev.time).padStart(2, '0')}]</span>
                  <span class="tt-title">${ev.title}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="recon-hud-overlay">
            <div class="hud-status-box">
              <span class="hud-label">ANALYSIS STATUS:</span>
              <span class="hud-status-val" id="recon-status-text">SCRUB TIMELINE TO RECONSTRUCT</span>
            </div>
            <div class="hud-time-readout" id="recon-time-display">00:00.00 / 02:00.00</div>
          </div>
        </div>

        <!-- Timeline Scrubber & Playback Controls -->
        <div class="recon-controls-panel">
          <div class="playback-btn-group">
            <button class="recon-btn" id="btn-recon-rewind" title="Rewind Scene">
              <span class="btn-icon">⏪</span> REWIND
            </button>
            <button class="recon-btn primary" id="btn-recon-play" title="Play / Pause Reconstruction">
              <span class="btn-icon" id="play-icon">▶</span> PLAY
            </button>
            <button class="recon-btn" id="btn-recon-ff" title="Fast Forward">
              FAST <span class="btn-icon">⏩</span>
            </button>
          </div>

          <div class="timeline-slider-container">
            <div class="timeline-ticks">
              <span>00:00</span>
              <span>00:30</span>
              <span>01:00</span>
              <span>01:30</span>
              <span>02:00</span>
            </div>
            <div class="timeline-track-bar" id="timeline-track">
              <div class="timeline-fill" id="timeline-fill"></div>
              ${this.events.map(ev => `
                <div class="timeline-keyframe ${(ev.time <= this.currentTime) ? 'passed' : ''}" 
                     style="left: ${(ev.time / this.maxTime) * 100}%;" 
                     data-time="${ev.time}"
                     title="${ev.title}">
                </div>
              `).join('')}
              <div class="timeline-handle" id="timeline-handle" style="left: 0%;"></div>
            </div>
          </div>
        </div>

        <!-- Clues Archive List -->
        <div class="recon-clues-summary">
          <h4 class="clues-heading">RECONSTRUCTED EVIDENCE (CLICK TIMELINE MARKERS TO RECONSTRUCT):</h4>
          <div class="clues-grid" id="recon-clues-list">
            ${this.events.map(ev => `
              <div class="clue-card ${ev.unlocked ? 'unlocked' : 'locked'}" id="clue-card-${ev.id}">
                <div class="clue-icon">${ev.unlocked ? '✔' : '🔒'}</div>
                <div class="clue-info">
                  <div class="clue-name">${ev.title}</div>
                  <div class="clue-desc">${ev.unlocked ? ev.desc : 'Timeline reconstruction required.'}</div>
                </div>
                <div class="clue-boost">+12% PROBABILITY</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.canvas = this.container.querySelector('#recon-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.drawScene();
  }

  setTime(seconds, userInitiated = false) {
    this.currentTime = Math.max(0, Math.min(this.maxTime, seconds));
    const percent = (this.currentTime / this.maxTime) * 100;

    const fill = this.container.querySelector('#timeline-fill');
    const handle = this.container.querySelector('#timeline-handle');
    const timeDisp = this.container.querySelector('#recon-time-display');

    if (fill) fill.style.width = `${percent}%`;
    if (handle) handle.style.left = `${percent}%`;

    const mins = Math.floor(this.currentTime / 60);
    const secs = Math.floor(this.currentTime % 60);
    const ms = Math.floor((this.currentTime % 1) * 100);
    if (timeDisp) {
      timeDisp.textContent = `0${mins}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')} / 02:00.00`;
    }

    if (userInitiated) {
      audio.playScrubSound();
    }

    this.checkClueProximity();
    this.drawScene();
  }

  checkClueProximity() {
    this.events.forEach(ev => {
      // If within 4 seconds of the event time
      if (Math.abs(this.currentTime - ev.time) < 4 && !ev.unlocked) {
        this.unlockClue(ev);
      }
    });
  }

  unlockClue(ev) {
    ev.unlocked = true;
    state.discoverClue(ev.clueKey);
    state.setLed('yellow');
    audio.playQteSuccess();

    const statusText = this.container.querySelector('#recon-status-text');
    if (statusText) {
      statusText.innerHTML = `<span class="glow-alert">EVIDENCE IDENTIFIED: ${ev.title.toUpperCase()}</span>`;
    }

    const card = this.container.querySelector(`#clue-card-${ev.id}`);
    if (card) {
      card.classList.remove('locked');
      card.classList.add('unlocked');
      card.querySelector('.clue-icon').textContent = '✔';
      card.querySelector('.clue-desc').textContent = ev.desc;
    }

    const marker = this.container.querySelector(`#marker-${ev.id}`);
    if (marker) {
      marker.classList.add('discovered');
    }
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    const playBtn = this.container.querySelector('#btn-recon-play');
    const playIcon = this.container.querySelector('#play-icon');

    if (this.isPlaying) {
      if (playIcon) playIcon.textContent = '⏸';
      if (playBtn) playBtn.classList.add('active');
      audio.playClick();
      state.setLed('yellow');

      this.playbackInterval = setInterval(() => {
        if (this.currentTime >= this.maxTime) {
          this.setTime(0);
        } else {
          this.setTime(this.currentTime + 0.5);
        }
      }, 50);
    } else {
      if (playIcon) playIcon.textContent = '▶';
      if (playBtn) playBtn.classList.remove('active');
      if (this.playbackInterval) {
        clearInterval(this.playbackInterval);
        this.playbackInterval = null;
      }
      state.setLed('blue');
    }
  }

  drawScene() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const t = this.currentTime / this.maxTime; // 0 to 1

    ctx.clearRect(0, 0, w, h);

    // Dark cybernetic floor grid
    ctx.strokeStyle = 'rgba(0, 180, 216, 0.15)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Balcony glass railing line
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(100, 120);
    ctx.lineTo(750, 120);
    ctx.stroke();

    // Trajectory path lines (blue glowing wireframe)
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(150, 320);
    ctx.bezierCurveTo(280, 290, 440, 240, 640, 140);
    ctx.stroke();
    ctx.setLineDash([]);

    // Ghost Connor Wireframe figure position interpolates with time
    const connorX = 150 + t * 400;
    const connorY = 320 - t * 140;

    // Draw Connor Ghost
    ctx.save();
    ctx.translate(connorX, connorY);
    ctx.strokeStyle = '#00e5ff';
    ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
    ctx.lineWidth = 2;

    // Wireframe head & temple LED
    ctx.beginPath();
    ctx.arc(0, -50, 16, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    // LED ring on ghost head
    ctx.fillStyle = '#00e5ff';
    ctx.beginPath();
    ctx.arc(12, -50, 4, 0, Math.PI * 2);
    ctx.fill();

    // Wireframe body
    ctx.beginPath();
    ctx.moveTo(0, -34);
    ctx.lineTo(0, 0);
    ctx.lineTo(-14, 40);
    ctx.moveTo(0, 0);
    ctx.lineTo(14, 40);
    // Arms
    ctx.moveTo(0, -20);
    ctx.lineTo(-20, 0);
    ctx.moveTo(0, -20);
    ctx.lineTo(20, -5);
    ctx.stroke();

    // Holographic label
    ctx.fillStyle = '#00e5ff';
    ctx.font = '11px monospace';
    ctx.fillText('CONNOR // RK800', -45, -75);
    ctx.fillText(`SIM T: ${(t * 100).toFixed(0)}%`, -35, -90);
    ctx.restore();

    // Deviant Daniel Ghost Figure near edge
    ctx.save();
    ctx.translate(650, 140);
    ctx.strokeStyle = 'rgba(255, 75, 75, 0.7)';
    ctx.fillStyle = 'rgba(255, 75, 75, 0.12)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(0, -45, 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    // Deviant RED Temple LED
    ctx.fillStyle = '#ff0033';
    ctx.beginPath();
    ctx.arc(11, -45, 4, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(0, 5);
    ctx.lineTo(-12, 40);
    ctx.moveTo(0, 5);
    ctx.lineTo(12, 40);
    ctx.stroke();

    // Hostage Emma (Smaller figure held by Daniel)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(18, -25, 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ff4b4b';
    ctx.font = '10px monospace';
    ctx.fillText('DEVIANT: DANIEL', -40, -65);
    ctx.fillText('HOSTAGE: EMMA', 15, -40);
    ctx.restore();
  }

  bindEvents() {
    const playBtn = this.container.querySelector('#btn-recon-play');
    if (playBtn) {
      playBtn.addEventListener('click', () => this.togglePlay());
    }

    const rwBtn = this.container.querySelector('#btn-recon-rewind');
    if (rwBtn) {
      rwBtn.addEventListener('click', () => {
        this.setTime(this.currentTime - 15, true);
      });
    }

    const ffBtn = this.container.querySelector('#btn-recon-ff');
    if (ffBtn) {
      ffBtn.addEventListener('click', () => {
        this.setTime(this.currentTime + 15, true);
      });
    }

    // Timeline track dragging / clicking
    const track = this.container.querySelector('#timeline-track');
    if (track) {
      let isDragging = false;

      const handleScrub = (e) => {
        const rect = track.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        this.setTime(ratio * this.maxTime, true);
      };

      track.addEventListener('mousedown', (e) => {
        isDragging = true;
        handleScrub(e);
      });

      window.addEventListener('mousemove', (e) => {
        if (isDragging) handleScrub(e);
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
      });

      // Touch support
      track.addEventListener('touchstart', (e) => {
        isDragging = true;
        handleScrub(e);
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (isDragging) handleScrub(e);
      }, { passive: true });

      window.addEventListener('touchend', () => {
        isDragging = false;
      });
    }

    // Keyframe and marker click triggers
    this.container.addEventListener('click', (e) => {
      const keyframe = e.target.closest('.timeline-keyframe');
      if (keyframe) {
        const targetSec = parseFloat(keyframe.dataset.time);
        this.setTime(targetSec, true);
      }

      const marker = e.target.closest('.evidence-node');
      if (marker) {
        const evId = marker.dataset.eventId;
        const ev = this.events.find(x => x.id === evId);
        if (ev) {
          this.setTime(ev.time, true);
        }
      }
    });
  }
}
