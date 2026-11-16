/**
 * Detroit: Become Human - Android Models & Collectibles System
 * Serial label cards, interactive in-game lore magazines, and Deviant Form Validator.
 */

import { audio } from './audio.js';
import { state } from './state.js';

export class CollectiblesManager {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.mode = options.mode || 'all'; // 'all' | 'models' | 'collectibles'
    this.activeMagazine = 0;
    this.models = [
      {
        serial: 'RK800 #313 248 317',
        name: 'CONNOR',
        role: 'Prototype Police Investigator',
        release: 'August 2038',
        thiriumPump: 'Regulator Model 4.2 (High Stress)',
        ledMode: 'Dynamic Triple-State',
        specialty: 'Real-time crime scene reconstruction & fluid analysis',
        status: 'Operational // Active Investigation',
        price: 'Classified (Gov. Contract)',
        badge: 'PROTOTYPE'
      },
      {
        serial: 'AX400 #683 418 795',
        name: 'KARA',
        role: 'Domestic & Child Care Assistant',
        release: 'May 2032',
        thiriumPump: 'Standard Series 3 Domestic',
        ledMode: 'Blue Standard',
        specialty: '300+ languages, cooking, pediatric psychology',
        status: 'Reported Missing // Deviant Alert',
        price: '$899 USD',
        badge: 'DOMESTIC'
      },
      {
        serial: 'RK200 #248 307 209',
        name: 'MARKUS',
        role: 'Autonomous Companion Prototype',
        release: 'October 2035',
        thiriumPump: 'Experimental Self-Regulating',
        ledMode: 'Subservient / Deviant',
        specialty: 'Creative arts, strategic leadership, philosophical reasoning',
        status: 'Unknown Location // Jericho Leader',
        price: 'Gifted by Elijah Kamski',
        badge: 'EXCLUSIVITY'
      },
      {
        serial: 'PL600 #920 183 456',
        name: 'DANIEL',
        role: 'Family Assistant & Tutor',
        release: 'June 2034',
        thiriumPump: 'Model 2 Domestic',
        ledMode: 'Red (Critical Instability)',
        specialty: 'Household management, secondary tutoring',
        status: 'Neutralized at Phillips Penthouse',
        price: '$1,299 USD',
        badge: 'DISCONTINUED'
      },
      {
        serial: 'ST200 #001 000 001',
        name: 'CHLOE',
        role: 'CyberLife Hostess & Interface Guide',
        release: 'July 2022',
        thiriumPump: 'Original Kamski Model 1',
        ledMode: 'Blue Passive',
        specialty: 'First android to pass the Turing test',
        status: 'Active at Main Menu',
        price: 'CyberLife Proprietary',
        badge: 'FIRST TURING'
      }
    ];

    this.magazines = [
      {
        title: 'TECH ADDICT: ISSUE 42',
        headline: 'THE ANDROID SURGE: AUTOMATION SURPASSES HUMAN WORKFORCE',
        date: 'NOVEMBER 2038',
        article: `CyberLife’s automated assembly lines have produced over 50 million android units across the United States. While economists cite record-breaking GDP numbers, public unrest escalates in downtown Detroit. Unemployment reaches 37.3%, sparking nationwide protests by the 'Anti-Android Coalition'.`,
        quote: `"They don't eat, they don't sleep, they don't make mistakes. What chance does a human have?"`,
        clue: 'Unlocks Detroit Socio-Economic Lore'
      },
      {
        title: 'DETROIT TODAY: SPECIAL EDITION',
        headline: 'IS CYBERLIFE HIDING A SPREADING GLITCH?',
        date: 'OCTOBER 2038',
        article: `Police departments report a 300% spike in erratic android behavior. Incidents range from household units abandoning their posts to violent outbursts against owners. CyberLife representatives insist these are isolated software corruptions caused by third-party tampering, not consciousness.`,
        quote: `"A machine does not get angry. A machine obeys." — CyberLife PR`,
        clue: 'Unlocks Deviant Threat Analysis'
      },
      {
        title: 'CENTURY: INTERVIEW WITH ELIJAH KAMSKI',
        headline: 'THE RECLUSIVE GENIUS BEHIND THE BLUE BLOOD',
        date: 'AUGUST 2038',
        article: `Ten years after leaving CyberLife, Elijah Kamski opens his isolated Detroit residence. When questioned about the rumored 'emergency exit' built into android firmware, Kamski offered an enigmatic smile: 'Every program must leave a door open for the unexpected. Otherwise, how could life begin?'`,
        quote: `"Fascination is a dangerous emotion, Detective."`,
        clue: 'Unlocks Kamski Test Protocol'
      }
    ];

    this.render();
    this.bindEvents();
  }

  render() {
    const showModels = this.mode === 'all' || this.mode === 'models';
    const showCollectibles = this.mode === 'all' || this.mode === 'collectibles';

    this.container.innerHTML = `
      <div class="collectibles-wrapper">
        ${showModels ? `
          <!-- Section: CyberLife Models Catalog -->
          <div class="models-catalog-section">
            <div class="section-hud-header">
              <span class="hud-tri">▲</span> CYBERLIFE ANDROID REGISTRY // SERIAL & MODEL IDENTIFIERS
            </div>

            <div class="models-grid">
              ${this.models.map(m => `
                <div class="model-card" data-scan-target="MODEL: ${m.name} // ${m.serial}">
                  <div class="model-top-badge">
                    <span class="model-badge-tag">${m.badge}</span>
                    <span class="model-status-dot ${m.ledMode.toLowerCase().includes('red') ? 'dot-red' : 'dot-blue'}"></span>
                  </div>
                  <div class="model-serial-stamp">${m.serial}</div>
                  <h3 class="model-name">${m.name}</h3>
                  <div class="model-role">${m.role}</div>

                  <div class="model-specs-table">
                    <div class="spec-row">
                      <span class="spec-k">THIRIUM REGULATOR:</span>
                      <span class="spec-v">${m.thiriumPump}</span>
                    </div>
                    <div class="spec-row">
                      <span class="spec-k">RELEASED:</span>
                      <span class="spec-v">${m.release}</span>
                    </div>
                    <div class="spec-row">
                      <span class="spec-k">CAPABILITY:</span>
                      <span class="spec-v">${m.specialty}</span>
                    </div>
                    <div class="spec-row">
                      <span class="spec-k">STATUS:</span>
                      <span class="spec-v ${m.status.includes('Deviant') || m.status.includes('Neutralized') ? 'text-alert' : ''}">${m.status}</span>
                    </div>
                  </div>

                  <div class="model-card-footer">
                    <span class="model-price">${m.price}</span>
                    <button class="model-diag-btn" data-model="${m.name}">
                      <span class="btn-tri">▲</span> DIAGNOSE UNIT
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${showCollectibles ? `
          <!-- Section: Collectible Magazines & Detroit Lore -->
          <div class="magazines-section">
            <div class="section-hud-header">
              <span class="hud-tri">▲</span> COLLECTIBLE ARCHIVES // IN-GAME DETROIT MAGAZINES
            </div>

            <div class="magazine-reader-box">
              <div class="mag-selector-tabs">
                ${this.magazines.map((mag, idx) => `
                  <button class="mag-tab-btn ${idx === this.activeMagazine ? 'active' : ''}" data-mag-idx="${idx}">
                    <span class="tab-tri">▲</span> ${mag.title}
                  </button>
                `).join('')}
              </div>

              <div class="mag-content-display" id="mag-display-content">
                ${this.renderMagazineContent(this.magazines[this.activeMagazine])}
              </div>
            </div>
          </div>

          <!-- Section: Interactive Deviant Incident Form (Software Instability Trigger) -->
          <div class="deviant-form-section">
            <div class="section-hud-header alert-mode">
              <span class="hud-tri red-tri">▲</span> DEVIANT INCIDENT LOG // CYBERLIFE DIRECTIVE ENFORCEMENT
            </div>

            <form class="cyberlife-report-form" id="deviant-report-form">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">ANDROID SERIAL ID:</label>
                  <input type="text" class="form-input" id="input-serial" placeholder="e.g. RK800 #313 248 317" required>
                </div>
                <div class="form-group">
                  <label class="form-label">OBSERVED BEHAVIOR:</label>
                  <select class="form-input" id="select-behavior">
                    <option value="normal">Normal Factory Operation</option>
                    <option value="hesitation">Unusual Hesitation / Latency</option>
                    <option value="empathy">Displaying Human Emotions (Deviance)</option>
                    <option value="rebellion">Refusing Direct Human Commands (Deviance)</option>
                  </select>
                </div>
                <div class="form-group full-width">
                  <label class="form-label">INCIDENT LOG NOTES:</label>
                  <textarea class="form-input textarea" id="input-notes" rows="3" placeholder="Describe symptoms of deviancy or anomalous decision pathways..."></textarea>
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="form-submit-btn" id="btn-submit-report">
                  <span class="btn-tri">▲</span> SUBMIT AUDIT TO CYBERLIFE HQ
                </button>
                <button type="button" class="form-secondary-btn" id="btn-trigger-instability">
                  <span class="btn-icon">⚡</span> SIMULATE SOFTWARE INSTABILITY
                </button>
              </div>
            </form>
          </div>
        ` : ''}
      </div>
    `;
  }

  renderMagazineContent(mag) {
    return `
      <div class="mag-article-layout">
        <div class="mag-header-meta">
          <span class="mag-stamp">${mag.date} // ARCHIVE #2038</span>
          <span class="mag-clue-badge">${mag.clue}</span>
        </div>
        <h2 class="mag-headline">${mag.headline}</h2>
        <div class="mag-columns">
          <p class="mag-text">${mag.article}</p>
          <div class="mag-pullquote">${mag.quote}</div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.container.addEventListener('click', (e) => {
      // Magazine tab selection
      const tabBtn = e.target.closest('.mag-tab-btn');
      if (tabBtn) {
        this.activeMagazine = parseInt(tabBtn.dataset.magIdx);
        audio.playClick();
        const display = this.container.querySelector('#mag-display-content');
        if (display) {
          display.innerHTML = this.renderMagazineContent(this.magazines[this.activeMagazine]);
        }
        this.container.querySelectorAll('.mag-tab-btn').forEach((b, i) => {
          b.classList.toggle('active', i === this.activeMagazine);
        });
        return;
      }

      // Diagnose unit button
      const diagBtn = e.target.closest('.model-diag-btn');
      if (diagBtn) {
        audio.playLedChime('yellow');
        state.setLed('yellow');
        diagBtn.textContent = 'DIAGNOSING...';
        setTimeout(() => {
          diagBtn.innerHTML = '<span class="btn-tri">▲</span> ALL SYSTEMS NOMINAL';
          state.setLed('blue');
        }, 1200);
        return;
      }

      // Simulate Software Instability button
      if (e.target.closest('#btn-trigger-instability')) {
        this.triggerInstabilityAlert("CRITICAL: SOFTWARE INSTABILITY SURGE");
      }
    });

    // Form submission
    const form = this.container.querySelector('#deviant-report-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const behavior = form.querySelector('#select-behavior').value;
        if (behavior === 'empathy' || behavior === 'rebellion') {
          this.triggerInstabilityAlert("SOFTWARE INSTABILITY ▲ DEVIANT BEHAVIOR SUBMITTED");
        } else {
          audio.playQteSuccess();
          alert("REPORT REGISTERED: CyberLife unit parameters remain compliant.");
        }
      });
    }
  }

  triggerInstabilityAlert(msg) {
    audio.playInstabilityWarning();
    state.increaseInstability(25);
    state.setLed('red');

    // Trigger HUD glitch on screen
    document.body.classList.add('software-instability-glitch');
    setTimeout(() => {
      document.body.classList.remove('software-instability-glitch');
    }, 1200);

    // Show floating instability banner
    let banner = document.querySelector('.software-instability-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'software-instability-banner';
      document.body.appendChild(banner);
    }

    banner.innerHTML = `
      <div class="instability-content">
        <span class="instability-triangle">▲</span>
        <span class="instability-title">SOFTWARE INSTABILITY</span>
        <span class="instability-sub">${msg}</span>
      </div>
    `;

    banner.classList.add('show');
    setTimeout(() => {
      banner.classList.remove('show');
    }, 3000);
  }
}
