/**
 * Detroit: Become Human - Story Flowchart System
 * Interactive branching decision tree showing paths taken, locked paths,
 * and global community percentage choices.
 */

import { audio } from './audio.js';
import { state } from './state.js';

export class StoryFlowchart {
  constructor(containerEl) {
    this.container = containerEl;
    this.nodes = [
      {
        id: 'node-start',
        title: 'ENTER APARTMENT',
        desc: 'Connor arrives at Phillips penthouse. Reassures mother.',
        status: 'completed',
        percent: 100,
        x: 60,
        y: 180,
        next: ['node-fish', 'node-captain']
      },
      {
        id: 'node-fish',
        title: 'SAVE DYING FISH',
        desc: 'Found rare dwarf gourami flopping on floor. Returned to tank.',
        status: 'completed',
        percent: 88,
        x: 240,
        y: 80,
        consequence: '▲ Instability (+10%)',
        next: ['node-balcony']
      },
      {
        id: 'node-captain',
        title: 'BRIEFING: CAPTAIN ALLEN',
        desc: 'SWAT captain dismissive of android negotiator.',
        status: 'completed',
        percent: 96,
        x: 240,
        y: 260,
        next: ['node-bedroom', 'node-balcony']
      },
      {
        id: 'node-bedroom',
        title: 'RECOVER OFFICER GUN',
        desc: 'Found hidden handgun under father’s bed. Took weapon.',
        status: 'unlocked',
        percent: 54,
        x: 440,
        y: 260,
        consequence: '▲ Concealed Weapon',
        next: ['node-balcony']
      },
      {
        id: 'node-balcony',
        title: 'CONFRONT DANIEL ON BALCONY',
        desc: 'Deviant holding child over 42-story precipice.',
        status: 'completed',
        percent: 100,
        x: 600,
        y: 180,
        next: ['node-peaceful', 'node-sacrifice', 'node-shoot']
      },
      {
        id: 'node-peaceful',
        title: 'PEACEFUL NEGOTIATION',
        desc: 'Convinced Daniel to release Emma. Snipers execute Daniel.',
        status: 'unlocked',
        percent: 68,
        x: 820,
        y: 80,
        consequence: 'Mission Success // Daniel Betrayed'
      },
      {
        id: 'node-sacrifice',
        title: 'CONNOR SACRIFICES SELF',
        desc: 'Connor tackles Daniel over railing to ensure hostage survival.',
        status: 'locked',
        percent: 24,
        x: 820,
        y: 180,
        consequence: '▲ Connor Destroyed // Hostage Saved'
      },
      {
        id: 'node-shoot',
        title: 'EXECUTE DEVIANT DIRECTLY',
        desc: 'Connor draws concealed handgun and executes Daniel point-blank.',
        status: 'locked',
        percent: 8,
        x: 820,
        y: 280,
        consequence: 'Deviant Eliminated // Machine Directive'
      }
    ];

    this.selectedNodeId = 'node-balcony';
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="flowchart-container">
        <div class="flowchart-header">
          <div class="fc-title-group">
            <span class="hud-tri">▲</span>
            <span class="fc-main-title">STORY FLOWCHART // CHAPTER 01: THE HOSTAGE</span>
          </div>
          <div class="fc-stats-bar">
            <span class="stat-pill">BRANCHES UNLOCKED: <strong id="fc-unlocked-count">5 / 8</strong></span>
            <span class="stat-pill">WORLD PLAYER SYNC: <strong>LIVE</strong></span>
            <button class="fc-btn" id="btn-unlock-all">
              <span class="btn-icon">⚡</span> UNLOCK ALL PATHS
            </button>
          </div>
        </div>

        <div class="flowchart-viewport">
          <svg class="flowchart-svg-links" viewBox="0 0 1020 380">
            <defs>
              <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#00b4d8" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#00e5ff" stop-opacity="0.8"/>
              </linearGradient>
              <linearGradient id="linkLockedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#4a5568" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="#2d3748" stop-opacity="0.4"/>
              </linearGradient>
            </defs>
            ${this.renderLinks()}
          </svg>

          <!-- Nodes rendered as HTML elements on top of SVG links -->
          <div class="flowchart-nodes-layer">
            ${this.nodes.map(n => this.renderNode(n)).join('')}
          </div>
        </div>

        <!-- Node Detail Panel -->
        <div class="flowchart-detail-panel" id="flowchart-detail-panel">
          ${this.renderDetail(this.nodes.find(n => n.id === this.selectedNodeId))}
        </div>
      </div>
    `;

    this.updateCounter();
  }

  renderLinks() {
    let lines = '';
    this.nodes.forEach(source => {
      if (!source.next) return;
      source.next.forEach(targetId => {
        const target = this.nodes.find(n => n.id === targetId);
        if (!target) return;
        const isLocked = target.status === 'locked';
        const strokeColor = isLocked ? 'url(#linkLockedGradient)' : 'url(#linkGradient)';
        const strokeDash = isLocked ? 'stroke-dasharray="4,4"' : '';
        const x1 = source.x + 130;
        const y1 = source.y + 35;
        const x2 = target.x;
        const y2 = target.y + 35;
        const cX1 = x1 + (x2 - x1) * 0.5;
        const cX2 = x1 + (x2 - x1) * 0.5;

        lines += `
          <path d="M ${x1} ${y1} C ${cX1} ${y1}, ${cX2} ${y2}, ${x2} ${y2}" 
                fill="none" 
                stroke="${strokeColor}" 
                stroke-width="${isLocked ? 1.5 : 2.5}" 
                ${strokeDash} 
                class="flow-path-line ${isLocked ? 'locked-path' : 'active-path'}"/>
        `;
      });
    });
    return lines;
  }

  renderNode(n) {
    const isSelected = n.id === this.selectedNodeId;
    return `
      <div class="fc-node node-${n.status} ${isSelected ? 'selected' : ''}" 
           id="${n.id}" 
           style="left: ${n.x}px; top: ${n.y}px;"
           data-node-id="${n.id}">
        <div class="fc-node-header">
          <span class="node-indicator"></span>
          <span class="node-pct">${n.status === 'locked' ? '??%' : n.percent + '%'}</span>
        </div>
        <div class="fc-node-title">${n.status === 'locked' ? 'LOCKED TIMELINE' : n.title}</div>
        ${n.consequence && n.status !== 'locked' ? `<div class="fc-node-tag">${n.consequence}</div>` : ''}
        ${n.status === 'locked' ? '<div class="fc-node-lock">🔒 PATH UNDISCOVERED</div>' : ''}
      </div>
    `;
  }

  renderDetail(n) {
    if (!n) return '';
    const isLocked = n.status === 'locked';
    return `
      <div class="detail-hud-box">
        <div class="detail-top-row">
          <div class="detail-name">
            <span class="detail-prefix">NODE INSPECT //</span> 
            ${isLocked ? 'CLASSIFIED / LOCKED BRANCH' : n.title}
          </div>
          <div class="detail-pct-badge">${n.percent}% OF PLAYERS CHOSE THIS</div>
        </div>
        <div class="detail-body">
          <p class="detail-desc">${isLocked ? 'This timeline branch remains locked. Complete the corresponding choice during the dialogue confrontation or click Unlock below.' : n.desc}</p>
          ${n.consequence ? `<div class="detail-consequence">NARRATIVE IMPACT: <strong>${n.consequence}</strong></div>` : ''}
        </div>
        <div class="detail-actions">
          ${isLocked ? `
            <button class="fc-action-btn unlock" id="btn-unlock-single" data-node-id="${n.id}">
              <span class="btn-icon">🔓</span> REVEAL BRANCH
            </button>
          ` : `
            <button class="fc-action-btn play" id="btn-replay-node">
              <span class="btn-icon">▶</span> SIMULATE OUTCOME
            </button>
          `}
        </div>
      </div>
    `;
  }

  selectNode(nodeId) {
    this.selectedNodeId = nodeId;
    audio.playClick();
    const detailPanel = this.container.querySelector('#flowchart-detail-panel');
    const targetNode = this.nodes.find(n => n.id === nodeId);
    if (detailPanel && targetNode) {
      detailPanel.innerHTML = this.renderDetail(targetNode);
    }

    this.container.querySelectorAll('.fc-node').forEach(el => {
      el.classList.toggle('selected', el.dataset.nodeId === nodeId);
    });
  }

  unlockNode(nodeId) {
    const target = this.nodes.find(n => n.id === nodeId);
    if (target && target.status === 'locked') {
      target.status = 'unlocked';
      audio.playQteSuccess();
      state.unlockFlowNode(nodeId);
      this.render();
    }
  }

  unlockAll() {
    this.nodes.forEach(n => {
      if (n.status === 'locked') n.status = 'unlocked';
    });
    audio.playQteSuccess();
    this.render();
  }

  updateCounter() {
    const unlocked = this.nodes.filter(n => n.status !== 'locked').length;
    const counter = this.container.querySelector('#fc-unlocked-count');
    if (counter) counter.textContent = `${unlocked} / ${this.nodes.length}`;
  }

  bindEvents() {
    this.container.addEventListener('click', (e) => {
      const nodeEl = e.target.closest('.fc-node');
      if (nodeEl) {
        this.selectNode(nodeEl.dataset.nodeId);
        return;
      }

      if (e.target.closest('#btn-unlock-all')) {
        this.unlockAll();
        return;
      }

      const unlockBtn = e.target.closest('#btn-unlock-single');
      if (unlockBtn) {
        this.unlockNode(unlockBtn.dataset.nodeId);
        return;
      }

      const replayBtn = e.target.closest('#btn-replay-node');
      if (replayBtn) {
        audio.playLedChime('yellow');
        const node = this.nodes.find(n => n.id === this.selectedNodeId);
        if (node && node.consequence) {
          state.increaseInstability(8);
        }
      }
    });
  }
}
