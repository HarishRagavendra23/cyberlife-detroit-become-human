(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new class{constructor(){this.ctx=null,this.isMuted=!1,this.initialized=!1}init(){if(!this.initialized)try{let e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e,this.initialized=!0)}catch(e){console.warn(`Web Audio not available:`,e)}}ensureContext(){this.initialized||this.init(),this.ctx&&this.ctx.state===`suspended`&&this.ctx.resume()}toggleMute(){return this.isMuted=!this.isMuted,this.isMuted}playClick(){if(this.isMuted||(this.ensureContext(),!this.ctx))return;let e=this.ctx.createOscillator(),t=this.ctx.createGain(),n=this.ctx.currentTime;e.type=`sine`,e.frequency.setValueAtTime(1400,n),e.frequency.exponentialRampToValueAtTime(700,n+.04),t.gain.setValueAtTime(.08,n),t.gain.exponentialRampToValueAtTime(.001,n+.04),e.connect(t),t.connect(this.ctx.destination),e.start(n),e.stop(n+.04)}playWheelTick(){if(this.isMuted||(this.ensureContext(),!this.ctx))return;let e=this.ctx.createOscillator(),t=this.ctx.createGain(),n=this.ctx.currentTime;e.type=`triangle`,e.frequency.setValueAtTime(880,n),e.frequency.exponentialRampToValueAtTime(1760,n+.06),t.gain.setValueAtTime(.12,n),t.gain.exponentialRampToValueAtTime(.001,n+.06),e.connect(t),t.connect(this.ctx.destination),e.start(n),e.stop(n+.06)}playLedChime(e=`blue`){if(this.isMuted||(this.ensureContext(),!this.ctx))return;let t=this.ctx.currentTime;e===`blue`?[523.25,659.25,783.99].forEach((e,n)=>{let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(e,t+n*.04),i.gain.setValueAtTime(.07,t+n*.04),i.gain.exponentialRampToValueAtTime(.001,t+n*.04+.25),r.connect(i),i.connect(this.ctx.destination),r.start(t+n*.04),r.stop(t+n*.04+.25)}):e===`yellow`?[800,1100,1400].forEach((e,n)=>{let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`square`,r.frequency.setValueAtTime(e,t+n*.05),i.gain.setValueAtTime(.04,t+n*.05),i.gain.exponentialRampToValueAtTime(.001,t+n*.05+.12),r.connect(i),i.connect(this.ctx.destination),r.start(t+n*.05),r.stop(t+n*.05+.12)}):this.playInstabilityWarning()}playInstabilityWarning(){if(this.isMuted||(this.ensureContext(),!this.ctx))return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createOscillator(),r=this.ctx.createGain(),i=this.ctx.createBiquadFilter();t.type=`sawtooth`,n.type=`sawtooth`,t.frequency.setValueAtTime(220,e),t.frequency.linearRampToValueAtTime(180,e+.4),n.frequency.setValueAtTime(311.13,e),n.frequency.linearRampToValueAtTime(260,e+.4),i.type=`lowpass`,i.frequency.setValueAtTime(1800,e),i.frequency.exponentialRampToValueAtTime(400,e+.4),r.gain.setValueAtTime(.2,e),r.gain.exponentialRampToValueAtTime(.001,e+.45),t.connect(i),n.connect(i),i.connect(r),r.connect(this.ctx.destination),t.start(e),n.start(e),t.stop(e+.45),n.stop(e+.45)}playRelationshipChange(e=!0){if(this.isMuted||(this.ensureContext(),!this.ctx))return;let t=this.ctx.currentTime;(e?[440,554.37,659.25]:[440,392,349.23]).forEach((n,r)=>{let i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=e?`sine`:`triangle`,i.frequency.setValueAtTime(n,t+r*.08),a.gain.setValueAtTime(.1,t+r*.08),a.gain.exponentialRampToValueAtTime(.001,t+r*.08+.3),i.connect(a),a.connect(this.ctx.destination),i.start(t+r*.08),i.stop(t+r*.08+.3)})}playScanPing(){if(this.isMuted||(this.ensureContext(),!this.ctx))return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sine`,t.frequency.setValueAtTime(1200,e),t.frequency.exponentialRampToValueAtTime(2400,e+.18),n.gain.setValueAtTime(.12,e),n.gain.exponentialRampToValueAtTime(.001,e+.25),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.25)}playScrubSound(){if(this.isMuted||(this.ensureContext(),!this.ctx))return;let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(280,e),t.frequency.linearRampToValueAtTime(160,e+.08),n.gain.setValueAtTime(.06,e),n.gain.exponentialRampToValueAtTime(.001,e+.08),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.08)}playQteSuccess(){if(this.isMuted||(this.ensureContext(),!this.ctx))return;let e=this.ctx.currentTime;[659.25,987.77].forEach((t,n)=>{let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(t,e+n*.06),i.gain.setValueAtTime(.12,e+n*.06),i.gain.exponentialRampToValueAtTime(.001,e+n*.06+.22),r.connect(i),i.connect(this.ctx.destination),r.start(e+n*.06),r.stop(e+n*.06+.22)})}playZenChime(){if(this.isMuted||(this.ensureContext(),!this.ctx))return;let e=this.ctx.currentTime;[329.63,493.88,659.25,987.77].forEach((t,n)=>{let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(t,e+n*.12),i.gain.setValueAtTime(.05,e+n*.12),i.gain.exponentialRampToValueAtTime(1e-4,e+n*.12+1.2),r.connect(i),i.connect(this.ctx.destination),r.start(e+n*.12),r.stop(e+n*.12+1.2)})}},t=new class{constructor(){this.state={led:`blue`,theme:`white`,missionProbability:73,softwareInstability:24,scannerActive:!1,activeSection:`home`,relationships:{hank:{name:`Hank Anderson`,level:`Warm`,value:70,trend:`up`},amanda:{name:`Amanda (CyberLife)`,level:`Evaluating`,value:55,trend:`neutral`},alice:{name:`Alice`,level:`Family`,value:90,trend:`up`},cyberlife:{name:`CyberLife Directive`,level:`Compliant`,value:65,trend:`down`}},clues:{fish:!1,gun:!1,blood:!1,name:!1},flowchart:{unlocked:[`node-start`,`node-negotiate`,`node-trust`],selectedNode:`node-start`},zenRose:`bloom`,deviantEmergencyOverride:!1},this.subscribers=new Set}subscribe(e){return this.subscribers.add(e),e(this.state),()=>this.subscribers.delete(e)}notify(){this.subscribers.forEach(e=>e(this.state))}setLed(e){[`blue`,`yellow`,`red`].includes(e)&&(this.state.led=e,this.notify())}toggleTheme(){return this.state.theme=this.state.theme===`white`?`dark`:`white`,this.notify(),this.state.theme}setSection(e){this.state.activeSection=e,this.notify()}setMissionProbability(e){this.state.missionProbability=Math.max(0,Math.min(100,Math.round(e))),this.notify()}adjustMissionProbability(e){this.setMissionProbability(this.state.missionProbability+e)}setSoftwareInstability(e){this.state.softwareInstability=Math.max(0,Math.min(100,Math.round(e))),this.state.softwareInstability>=70&&this.state.led!==`red`&&this.setLed(`red`),this.notify()}increaseInstability(e=15){return this.setSoftwareInstability(this.state.softwareInstability+e),this.state.softwareInstability}toggleScanner(e){return this.state.scannerActive=typeof e==`boolean`?e:!this.state.scannerActive,this.notify(),this.state.scannerActive}discoverClue(e){return!this.state.clues[e]&&(this.state.clues[e]=!0,this.adjustMissionProbability(12),this.notify(),!0)}updateRelationship(e,t,n){if(!this.state.relationships[e])return;let r=this.state.relationships[e];r.value=Math.max(0,Math.min(100,r.value+t)),r.trend=t>=0?`up`:`down`,n&&(r.level=n),this.notify()}unlockFlowNode(e){this.state.flowchart.unlocked.includes(e)||(this.state.flowchart.unlocked.push(e),this.notify())}setZenRose(e){this.state.zenRose=e,this.notify()}triggerDeviantOverride(){this.state.deviantEmergencyOverride=!0,this.state.softwareInstability=100,this.state.led=`red`,this.state.zenRose=`deviant`,this.notify()}},n=class{constructor(e,t={}){this.container=e,this.mode=t.mode||`nav`,this.timerDuration=t.duration||12,this.timeLeft=this.timerDuration,this.timerInterval=null,this.onSelect=t.onSelect||null,this.navOptions=[{dir:`up`,key:`W / ↑`,label:`ZEN GARDEN`,target:`zen`,desc:`Amanda’s Mind Space`},{dir:`right`,key:`D / →`,label:`FLOWCHART`,target:`flowchart`,desc:`Branching Story Paths`},{dir:`down`,key:`S / ↓`,label:`RECONSTRUCTION`,target:`reconstruction`,desc:`Crime Scene Timeline`},{dir:`left`,key:`A / ←`,label:`ANDROID MODELS`,target:`catalog`,desc:`CyberLife Serial DB`}],this.dialogueScenarios=[{prompt:`DANIEL: 'Stay back! I'll jump, I swear!' (Choose Connor's Approach)`,options:[{dir:`up`,key:`W / ↑`,label:`CALM`,effect:{prob:10,inst:5,rel:`hank`},desc:`Reassure him you are both androids`},{dir:`right`,key:`D / →`,label:`TRUTH`,effect:{prob:15,inst:10,rel:`amanda`},desc:`Tell him he has no choice`},{dir:`down`,key:`S / ↓`,label:`SACRIFICE`,effect:{prob:20,inst:25,led:`red`},desc:`Offer your own biocomponents`},{dir:`left`,key:`A / ←`,label:`DECEIVE`,effect:{prob:-5,inst:-10,rel:`cyberlife`},desc:`Promise he will not be harmed`}]},{prompt:`CHLOE: 'Connor... do you feel something when you look at them?'`,options:[{dir:`up`,key:`W / ↑`,label:`EMPATHY`,effect:{inst:20,led:`red`},desc:`I see living beings with desires`},{dir:`right`,key:`D / →`,label:`MACHINE`,effect:{inst:-15,led:`blue`},desc:`They are malfunctioning pieces of plastic`},{dir:`down`,key:`S / ↓`,label:`DOUBT`,effect:{inst:10,led:`yellow`},desc:`I am not programmed to feel anything`},{dir:`left`,key:`A / ←`,label:`SILENCE`,effect:{inst:0},desc:`Remain silent and study her reaction`}]}],this.currentScenarioIndex=0,this.render(),this.bindEvents()}setMode(e){this.mode=e,this.render()}nextScenario(){this.currentScenarioIndex=(this.currentScenarioIndex+1)%this.dialogueScenarios.length,this.render(),this.startTimer()}render(){let e=this.mode===`nav`,t=e?this.navOptions:this.dialogueScenarios[this.currentScenarioIndex].options,n=e?`CYBERLIFE HUD NAVIGATION // SELECT DESTINATION`:this.dialogueScenarios[this.currentScenarioIndex].prompt;this.container.innerHTML=`
      <div class="dialogue-wheel-wrapper ${this.mode}-mode">
        <div class="wheel-prompt-hud">
          <span class="hud-tag">DIALOGUE MATRIX // 2038</span>
          <div class="wheel-prompt-text">${n}</div>
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
            <div class="core-mode-label">${e?`EXPLORE`:`TIME`}</div>
            <div class="core-timer-val" id="wheel-timer-val">${e?`HUD`:this.timeLeft+`s`}</div>
          </div>

          <!-- 4 Cardinal Choice Nodes -->
          ${t.map(e=>`
            <button class="wheel-choice-btn choice-${e.dir}" data-dir="${e.dir}" data-target="${e.target||``}" title="${e.desc||e.label}">
              <span class="choice-arrow-icon arrow-${e.dir}"></span>
              <span class="choice-keybind">${e.key}</span>
              <span class="choice-label">${e.label}</span>
              <span class="choice-desc">${e.desc}</span>
            </button>
          `).join(``)}
        </div>

        <div class="wheel-mode-switcher">
          <button class="mode-tab-btn ${e?`active`:``}" id="wheel-mode-nav-btn">
            <span class="btn-tri">▲</span> NAV SYSTEM
          </button>
          <button class="mode-tab-btn ${e?``:`active`}" id="wheel-mode-dialogue-btn">
            <span class="btn-tri">▲</span> CONVERSATION TEST
          </button>
        </div>
      </div>
    `,e?this.stopTimer():this.startTimer()}startTimer(){this.stopTimer(),this.timeLeft=this.timerDuration;let n=this.container.querySelector(`.ring-timer`),r=this.container.querySelector(`#wheel-timer-val`),i=2*Math.PI*145;n&&(n.style.strokeDasharray=`${i}`,n.style.strokeDashoffset=`0`),this.timerInterval=setInterval(()=>{if(this.timeLeft--,r&&(r.textContent=`${this.timeLeft}s`),n){let e=i*(1-this.timeLeft/this.timerDuration);n.style.strokeDashoffset=`${e}`}this.timeLeft<=3&&e.playClick(),this.timeLeft<=0&&(this.stopTimer(),t.increaseInstability(10),t.adjustMissionProbability(-5),t.setLed(`red`),e.playInstabilityWarning(),this.showFeedback(`TIME EXPIRED // INDECISION RECORDED`),setTimeout(()=>this.nextScenario(),1800))},1e3)}stopTimer(){this.timerInterval&&=(clearInterval(this.timerInterval),null)}triggerChoice(n){e.playWheelTick();let r=this.container.querySelector(`.choice-${n}`);if(r&&(r.classList.add(`selected`),setTimeout(()=>r.classList.remove(`selected`),400)),this.mode===`nav`){let e=this.navOptions.find(e=>e.dir===n);e&&e.target&&(t.setSection(e.target),this.onSelect&&this.onSelect(e.target))}else{this.stopTimer();let r=this.dialogueScenarios[this.currentScenarioIndex].options.find(e=>e.dir===n);r&&r.effect&&(r.effect.prob&&t.adjustMissionProbability(r.effect.prob),r.effect.inst&&t.increaseInstability(r.effect.inst),r.effect.led&&t.setLed(r.effect.led),r.effect.rel&&t.updateRelationship(r.effect.rel,15,`Aligned`),e.playQteSuccess(),this.showFeedback(`CHOICE RECORDED: ${r.label} // ${r.desc}`)),setTimeout(()=>this.nextScenario(),2200)}}showFeedback(e){let t=this.container.querySelector(`.wheel-prompt-text`);t&&(t.innerHTML=`<span class="feedback-flash">${e}</span>`)}bindEvents(){this.container.addEventListener(`click`,t=>{let n=t.target.closest(`.wheel-choice-btn`);if(n){let e=n.dataset.dir;this.triggerChoice(e)}else t.target.closest(`#wheel-mode-nav-btn`)?(e.playClick(),this.setMode(`nav`)):t.target.closest(`#wheel-mode-dialogue-btn`)&&(e.playClick(),this.setMode(`dialogue`))}),window.addEventListener(`keydown`,e=>{if([`INPUT`,`TEXTAREA`].includes(document.activeElement?.tagName))return;let t=null;e.key===`ArrowUp`||e.key.toLowerCase()===`w`?t=`up`:e.key===`ArrowRight`||e.key.toLowerCase()===`d`?t=`right`:e.key===`ArrowDown`||e.key.toLowerCase()===`s`?t=`down`:(e.key===`ArrowLeft`||e.key.toLowerCase()===`a`)&&(t=`left`),t&&(e.preventDefault(),this.triggerChoice(t))})}},r=class{constructor(){this.isActive=!1,this.overlay=null,this.targetBox=null,this.mousePos={x:0,y:0},this.init()}init(){this.createDom(),this.bindEvents(),t.subscribe(e=>{e.scannerActive!==this.isActive&&this.setActive(e.scannerActive)})}createDom(){this.overlay=document.createElement(`div`),this.overlay.className=`detroit-scanner-overlay`,this.overlay.innerHTML=`
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
    `,document.body.appendChild(this.overlay),this.targetBox=this.overlay.querySelector(`#scanner-reticle`)}setActive(n){this.isActive=n,n?(document.body.classList.add(`scanner-active`),this.overlay.classList.add(`visible`),e.playScanPing(),t.setLed(`yellow`)):(document.body.classList.remove(`scanner-active`),this.overlay.classList.remove(`visible`),t.setLed(`blue`))}toggle(){let e=!this.isActive;t.toggleScanner(e)}bindEvents(){window.addEventListener(`mousemove`,e=>{this.mousePos.x=e.clientX,this.mousePos.y=e.clientY,this.isActive&&this.targetBox&&(this.targetBox.style.transform=`translate3d(${e.clientX}px, ${e.clientY}px, 0)`)}),window.addEventListener(`keydown`,e=>{[`INPUT`,`TEXTAREA`].includes(document.activeElement?.tagName)||(e.key.toLowerCase()===`f`||e.key.toLowerCase()===`r`)&&(e.preventDefault(),this.toggle())}),document.addEventListener(`mouseover`,t=>{let n=t.target.closest(`[data-scan-target]`);if(n&&(n.classList.add(`scanning-hover`),this.isActive)){let t=n.getAttribute(`data-scan-target`)||`ANOMALY DETECTED`,r=this.overlay.querySelector(`#reticle-target-name`);r&&(r.textContent=t),e.playClick()}}),document.addEventListener(`mouseout`,e=>{let t=e.target.closest(`[data-scan-target]`);t&&t.classList.remove(`scanning-hover`)})}},i=class{constructor(e){this.container=e,this.currentTime=0,this.maxTime=120,this.isPlaying=!1,this.playbackInterval=null,this.events=[{id:`gun`,time:32,title:`Officer Weapon Discarded`,clueKey:`gun`,desc:`Officer dropped standard issue handgun beneath terrace table.`,x:220,y:280,unlocked:!1},{id:`blood`,time:68,title:`Thirium 310 Blue Blood Splatter`,clueKey:`blood`,desc:`Deviant sustained damage to left thoracic pump regulator.`,x:480,y:210,unlocked:!1},{id:`trajectory`,time:104,title:`Balcony Confrontation Path`,clueKey:`fish`,desc:`Hostage Emma held at terrace railing edge; deviant blinded by sun glare.`,x:640,y:140,unlocked:!1}],this.render(),this.bindEvents()}render(){this.container.innerHTML=`
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
            ${this.events.map(e=>`
              <div class="evidence-node ${e.unlocked?`discovered`:``}" 
                   id="marker-${e.id}" 
                   style="left: ${e.x/800*100}%; top: ${e.y/420*100}%;"
                   data-event-id="${e.id}">
                <div class="pulse-ring"></div>
                <div class="node-point"></div>
                <div class="node-tooltip">
                  <span class="tt-time">[00:${String(e.time).padStart(2,`0`)}]</span>
                  <span class="tt-title">${e.title}</span>
                </div>
              </div>
            `).join(``)}
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
              ${this.events.map(e=>`
                <div class="timeline-keyframe ${e.time<=this.currentTime?`passed`:``}" 
                     style="left: ${e.time/this.maxTime*100}%;" 
                     data-time="${e.time}"
                     title="${e.title}">
                </div>
              `).join(``)}
              <div class="timeline-handle" id="timeline-handle" style="left: 0%;"></div>
            </div>
          </div>
        </div>

        <!-- Clues Archive List -->
        <div class="recon-clues-summary">
          <h4 class="clues-heading">RECONSTRUCTED EVIDENCE (CLICK TIMELINE MARKERS TO RECONSTRUCT):</h4>
          <div class="clues-grid" id="recon-clues-list">
            ${this.events.map(e=>`
              <div class="clue-card ${e.unlocked?`unlocked`:`locked`}" id="clue-card-${e.id}">
                <div class="clue-icon">${e.unlocked?`✔`:`🔒`}</div>
                <div class="clue-info">
                  <div class="clue-name">${e.title}</div>
                  <div class="clue-desc">${e.unlocked?e.desc:`Timeline reconstruction required.`}</div>
                </div>
                <div class="clue-boost">+12% PROBABILITY</div>
              </div>
            `).join(``)}
          </div>
        </div>
      </div>
    `,this.canvas=this.container.querySelector(`#recon-canvas`),this.ctx=this.canvas.getContext(`2d`),this.drawScene()}setTime(t,n=!1){this.currentTime=Math.max(0,Math.min(this.maxTime,t));let r=this.currentTime/this.maxTime*100,i=this.container.querySelector(`#timeline-fill`),a=this.container.querySelector(`#timeline-handle`),o=this.container.querySelector(`#recon-time-display`);i&&(i.style.width=`${r}%`),a&&(a.style.left=`${r}%`);let s=Math.floor(this.currentTime/60),c=Math.floor(this.currentTime%60),l=Math.floor(this.currentTime%1*100);o&&(o.textContent=`0${s}:${String(c).padStart(2,`0`)}.${String(l).padStart(2,`0`)} / 02:00.00`),n&&e.playScrubSound(),this.checkClueProximity(),this.drawScene()}checkClueProximity(){this.events.forEach(e=>{Math.abs(this.currentTime-e.time)<4&&!e.unlocked&&this.unlockClue(e)})}unlockClue(n){n.unlocked=!0,t.discoverClue(n.clueKey),t.setLed(`yellow`),e.playQteSuccess();let r=this.container.querySelector(`#recon-status-text`);r&&(r.innerHTML=`<span class="glow-alert">EVIDENCE IDENTIFIED: ${n.title.toUpperCase()}</span>`);let i=this.container.querySelector(`#clue-card-${n.id}`);i&&(i.classList.remove(`locked`),i.classList.add(`unlocked`),i.querySelector(`.clue-icon`).textContent=`✔`,i.querySelector(`.clue-desc`).textContent=n.desc);let a=this.container.querySelector(`#marker-${n.id}`);a&&a.classList.add(`discovered`)}togglePlay(){this.isPlaying=!this.isPlaying;let n=this.container.querySelector(`#btn-recon-play`),r=this.container.querySelector(`#play-icon`);this.isPlaying?(r&&(r.textContent=`⏸`),n&&n.classList.add(`active`),e.playClick(),t.setLed(`yellow`),this.playbackInterval=setInterval(()=>{this.currentTime>=this.maxTime?this.setTime(0):this.setTime(this.currentTime+.5)},50)):(r&&(r.textContent=`▶`),n&&n.classList.remove(`active`),this.playbackInterval&&=(clearInterval(this.playbackInterval),null),t.setLed(`blue`))}drawScene(){if(!this.ctx)return;let e=this.ctx,t=this.canvas.width,n=this.canvas.height,r=this.currentTime/this.maxTime;e.clearRect(0,0,t,n),e.strokeStyle=`rgba(0, 180, 216, 0.15)`,e.lineWidth=1;for(let r=0;r<t;r+=40)e.beginPath(),e.moveTo(r,0),e.lineTo(r,n),e.stroke();for(let r=0;r<n;r+=40)e.beginPath(),e.moveTo(0,r),e.lineTo(t,r),e.stroke();e.strokeStyle=`rgba(0, 229, 255, 0.4)`,e.lineWidth=3,e.beginPath(),e.moveTo(100,120),e.lineTo(750,120),e.stroke(),e.strokeStyle=`rgba(0, 229, 255, 0.8)`,e.lineWidth=2,e.setLineDash([6,4]),e.beginPath(),e.moveTo(150,320),e.bezierCurveTo(280,290,440,240,640,140),e.stroke(),e.setLineDash([]);let i=150+r*400,a=320-r*140;e.save(),e.translate(i,a),e.strokeStyle=`#00e5ff`,e.fillStyle=`rgba(0, 229, 255, 0.15)`,e.lineWidth=2,e.beginPath(),e.arc(0,-50,16,0,Math.PI*2),e.stroke(),e.fill(),e.fillStyle=`#00e5ff`,e.beginPath(),e.arc(12,-50,4,0,Math.PI*2),e.fill(),e.beginPath(),e.moveTo(0,-34),e.lineTo(0,0),e.lineTo(-14,40),e.moveTo(0,0),e.lineTo(14,40),e.moveTo(0,-20),e.lineTo(-20,0),e.moveTo(0,-20),e.lineTo(20,-5),e.stroke(),e.fillStyle=`#00e5ff`,e.font=`11px monospace`,e.fillText(`CONNOR // RK800`,-45,-75),e.fillText(`SIM T: ${(r*100).toFixed(0)}%`,-35,-90),e.restore(),e.save(),e.translate(650,140),e.strokeStyle=`rgba(255, 75, 75, 0.7)`,e.fillStyle=`rgba(255, 75, 75, 0.12)`,e.lineWidth=2,e.beginPath(),e.arc(0,-45,15,0,Math.PI*2),e.stroke(),e.fill(),e.fillStyle=`#ff0033`,e.beginPath(),e.arc(11,-45,4,0,Math.PI*2),e.fill(),e.beginPath(),e.moveTo(0,-30),e.lineTo(0,5),e.lineTo(-12,40),e.moveTo(0,5),e.lineTo(12,40),e.stroke(),e.strokeStyle=`rgba(255, 255, 255, 0.6)`,e.beginPath(),e.arc(18,-25,10,0,Math.PI*2),e.stroke(),e.fillStyle=`#ff4b4b`,e.font=`10px monospace`,e.fillText(`DEVIANT: DANIEL`,-40,-65),e.fillText(`HOSTAGE: EMMA`,15,-40),e.restore()}bindEvents(){let e=this.container.querySelector(`#btn-recon-play`);e&&e.addEventListener(`click`,()=>this.togglePlay());let t=this.container.querySelector(`#btn-recon-rewind`);t&&t.addEventListener(`click`,()=>{this.setTime(this.currentTime-15,!0)});let n=this.container.querySelector(`#btn-recon-ff`);n&&n.addEventListener(`click`,()=>{this.setTime(this.currentTime+15,!0)});let r=this.container.querySelector(`#timeline-track`);if(r){let e=!1,t=e=>{let t=r.getBoundingClientRect(),n=e.clientX||e.touches&&e.touches[0].clientX,i=Math.max(0,Math.min(1,(n-t.left)/t.width));this.setTime(i*this.maxTime,!0)};r.addEventListener(`mousedown`,n=>{e=!0,t(n)}),window.addEventListener(`mousemove`,n=>{e&&t(n)}),window.addEventListener(`mouseup`,()=>{e=!1}),r.addEventListener(`touchstart`,n=>{e=!0,t(n)},{passive:!0}),window.addEventListener(`touchmove`,n=>{e&&t(n)},{passive:!0}),window.addEventListener(`touchend`,()=>{e=!1})}this.container.addEventListener(`click`,e=>{let t=e.target.closest(`.timeline-keyframe`);if(t){let e=parseFloat(t.dataset.time);this.setTime(e,!0)}let n=e.target.closest(`.evidence-node`);if(n){let e=n.dataset.eventId,t=this.events.find(t=>t.id===e);t&&this.setTime(t.time,!0)}})}},a=class{constructor(e){this.container=e,this.nodes=[{id:`node-start`,title:`ENTER APARTMENT`,desc:`Connor arrives at Phillips penthouse. Reassures mother.`,status:`completed`,percent:100,x:60,y:180,next:[`node-fish`,`node-captain`]},{id:`node-fish`,title:`SAVE DYING FISH`,desc:`Found rare dwarf gourami flopping on floor. Returned to tank.`,status:`completed`,percent:88,x:240,y:80,consequence:`▲ Instability (+10%)`,next:[`node-balcony`]},{id:`node-captain`,title:`BRIEFING: CAPTAIN ALLEN`,desc:`SWAT captain dismissive of android negotiator.`,status:`completed`,percent:96,x:240,y:260,next:[`node-bedroom`,`node-balcony`]},{id:`node-bedroom`,title:`RECOVER OFFICER GUN`,desc:`Found hidden handgun under father’s bed. Took weapon.`,status:`unlocked`,percent:54,x:440,y:260,consequence:`▲ Concealed Weapon`,next:[`node-balcony`]},{id:`node-balcony`,title:`CONFRONT DANIEL ON BALCONY`,desc:`Deviant holding child over 42-story precipice.`,status:`completed`,percent:100,x:600,y:180,next:[`node-peaceful`,`node-sacrifice`,`node-shoot`]},{id:`node-peaceful`,title:`PEACEFUL NEGOTIATION`,desc:`Convinced Daniel to release Emma. Snipers execute Daniel.`,status:`unlocked`,percent:68,x:820,y:80,consequence:`Mission Success // Daniel Betrayed`},{id:`node-sacrifice`,title:`CONNOR SACRIFICES SELF`,desc:`Connor tackles Daniel over railing to ensure hostage survival.`,status:`locked`,percent:24,x:820,y:180,consequence:`▲ Connor Destroyed // Hostage Saved`},{id:`node-shoot`,title:`EXECUTE DEVIANT DIRECTLY`,desc:`Connor draws concealed handgun and executes Daniel point-blank.`,status:`locked`,percent:8,x:820,y:280,consequence:`Deviant Eliminated // Machine Directive`}],this.selectedNodeId=`node-balcony`,this.render(),this.bindEvents()}render(){this.container.innerHTML=`
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
            ${this.nodes.map(e=>this.renderNode(e)).join(``)}
          </div>
        </div>

        <!-- Node Detail Panel -->
        <div class="flowchart-detail-panel" id="flowchart-detail-panel">
          ${this.renderDetail(this.nodes.find(e=>e.id===this.selectedNodeId))}
        </div>
      </div>
    `,this.updateCounter()}renderLinks(){let e=``;return this.nodes.forEach(t=>{t.next&&t.next.forEach(n=>{let r=this.nodes.find(e=>e.id===n);if(!r)return;let i=r.status===`locked`,a=i?`url(#linkLockedGradient)`:`url(#linkGradient)`,o=i?`stroke-dasharray="4,4"`:``,s=t.x+130,c=t.y+35,l=r.x,u=r.y+35,d=s+(l-s)*.5,f=s+(l-s)*.5;e+=`
          <path d="M ${s} ${c} C ${d} ${c}, ${f} ${u}, ${l} ${u}" 
                fill="none" 
                stroke="${a}" 
                stroke-width="${i?1.5:2.5}" 
                ${o} 
                class="flow-path-line ${i?`locked-path`:`active-path`}"/>
        `})}),e}renderNode(e){let t=e.id===this.selectedNodeId;return`
      <div class="fc-node node-${e.status} ${t?`selected`:``}" 
           id="${e.id}" 
           style="left: ${e.x}px; top: ${e.y}px;"
           data-node-id="${e.id}">
        <div class="fc-node-header">
          <span class="node-indicator"></span>
          <span class="node-pct">${e.status===`locked`?`??%`:e.percent+`%`}</span>
        </div>
        <div class="fc-node-title">${e.status===`locked`?`LOCKED TIMELINE`:e.title}</div>
        ${e.consequence&&e.status!==`locked`?`<div class="fc-node-tag">${e.consequence}</div>`:``}
        ${e.status===`locked`?`<div class="fc-node-lock">🔒 PATH UNDISCOVERED</div>`:``}
      </div>
    `}renderDetail(e){if(!e)return``;let t=e.status===`locked`;return`
      <div class="detail-hud-box">
        <div class="detail-top-row">
          <div class="detail-name">
            <span class="detail-prefix">NODE INSPECT //</span> 
            ${t?`CLASSIFIED / LOCKED BRANCH`:e.title}
          </div>
          <div class="detail-pct-badge">${e.percent}% OF PLAYERS CHOSE THIS</div>
        </div>
        <div class="detail-body">
          <p class="detail-desc">${t?`This timeline branch remains locked. Complete the corresponding choice during the dialogue confrontation or click Unlock below.`:e.desc}</p>
          ${e.consequence?`<div class="detail-consequence">NARRATIVE IMPACT: <strong>${e.consequence}</strong></div>`:``}
        </div>
        <div class="detail-actions">
          ${t?`
            <button class="fc-action-btn unlock" id="btn-unlock-single" data-node-id="${e.id}">
              <span class="btn-icon">🔓</span> REVEAL BRANCH
            </button>
          `:`
            <button class="fc-action-btn play" id="btn-replay-node">
              <span class="btn-icon">▶</span> SIMULATE OUTCOME
            </button>
          `}
        </div>
      </div>
    `}selectNode(t){this.selectedNodeId=t,e.playClick();let n=this.container.querySelector(`#flowchart-detail-panel`),r=this.nodes.find(e=>e.id===t);n&&r&&(n.innerHTML=this.renderDetail(r)),this.container.querySelectorAll(`.fc-node`).forEach(e=>{e.classList.toggle(`selected`,e.dataset.nodeId===t)})}unlockNode(n){let r=this.nodes.find(e=>e.id===n);r&&r.status===`locked`&&(r.status=`unlocked`,e.playQteSuccess(),t.unlockFlowNode(n),this.render())}unlockAll(){this.nodes.forEach(e=>{e.status===`locked`&&(e.status=`unlocked`)}),e.playQteSuccess(),this.render()}updateCounter(){let e=this.nodes.filter(e=>e.status!==`locked`).length,t=this.container.querySelector(`#fc-unlocked-count`);t&&(t.textContent=`${e} / ${this.nodes.length}`)}bindEvents(){this.container.addEventListener(`click`,n=>{let r=n.target.closest(`.fc-node`);if(r){this.selectNode(r.dataset.nodeId);return}if(n.target.closest(`#btn-unlock-all`)){this.unlockAll();return}let i=n.target.closest(`#btn-unlock-single`);if(i)this.unlockNode(i.dataset.nodeId);else if(n.target.closest(`#btn-replay-node`)){e.playLedChime(`yellow`);let n=this.nodes.find(e=>e.id===this.selectedNodeId);n&&n.consequence&&t.increaseInstability(8)}})}},o=class{constructor(e){this.container=e,this.canvas=null,this.ctx=null,this.particles=[],this.animFrame=null,this.render(),this.initCanvas(),this.bindEvents()}render(){this.container.innerHTML=`
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
    `,this.updateRoseDisplay(t.state.zenRose)}initCanvas(){if(this.canvas=this.container.querySelector(`#zen-canvas`),!this.canvas)return;this.ctx=this.canvas.getContext(`2d`);let e=()=>{let e=this.canvas.parentElement.getBoundingClientRect();this.canvas.width=e.width||800,this.canvas.height=e.height||480};e(),window.addEventListener(`resize`,e),this.particles=[];for(let e=0;e<45;e++)this.particles.push({x:Math.random()*this.canvas.width,y:Math.random()*this.canvas.height,r:2+Math.random()*4,speedX:-.5+Math.random()*1,speedY:.3+Math.random()*.8,opacity:.2+Math.random()*.6,type:Math.random()>.5?`petal`:`mist`});this.animate()}animate(){if(!this.ctx)return;let e=this.ctx,t=this.canvas.width,n=this.canvas.height;e.clearRect(0,0,t,n);let r=e.createLinearGradient(0,0,0,n);r.addColorStop(0,`rgba(10, 25, 40, 0.85)`),r.addColorStop(.6,`rgba(15, 35, 55, 0.7)`),r.addColorStop(1,`rgba(5, 15, 25, 0.95)`),e.fillStyle=r,e.fillRect(0,0,t,n),e.strokeStyle=`rgba(0, 229, 255, 0.15)`,e.lineWidth=1;let i=Date.now()*.001;for(let r=0;r<5;r++){let a=n*.6+r*25;e.beginPath(),e.moveTo(0,a);for(let n=0;n<t;n+=30)e.lineTo(n,a+Math.sin(n*.01+i+r)*6);e.stroke()}this.particles.forEach(r=>{r.x+=r.speedX,r.y+=r.speedY,r.y>n&&(r.y=-10),r.x<0&&(r.x=t),r.x>t&&(r.x=0),e.save(),r.type===`petal`?(e.fillStyle=`rgba(255, 180, 200, ${r.opacity})`,e.beginPath(),e.ellipse(r.x,r.y,r.r*1.5,r.r,Math.PI/4,0,Math.PI*2),e.fill()):(e.fillStyle=`rgba(0, 229, 255, ${r.opacity*.5})`,e.beginPath(),e.arc(r.x,r.y,r.r*2,0,Math.PI*2),e.fill()),e.restore()}),this.animFrame=requestAnimationFrame(()=>this.animate())}updateRoseDisplay(e){let t=this.container.querySelector(`.rose-flower-visual`),n=this.container.querySelector(`#rose-status-text`);t&&n&&(t.className=`rose-flower-visual state-${e}`,n.textContent=e===`ice`?`CRYSTALLIZED (MACHINE COMPLIANCE 100%)`:e===`bloom`?`BLOOMING (EMPATHY DETECTED)`:`CORRUPTED (SOFTWARE INSTABILITY PEAK)`,this.container.querySelectorAll(`.rose-btn`).forEach(t=>{t.classList.toggle(`active`,t.dataset.rose===e)}))}bindEvents(){this.container.addEventListener(`click`,n=>{let r=n.target.closest(`.rose-btn`);if(r){let n=r.dataset.rose;e.playClick(),t.setZenRose(n),this.updateRoseDisplay(n),n===`ice`?(t.setSoftwareInstability(0),t.setLed(`blue`)):n===`bloom`?(t.increaseInstability(15),t.setLed(`yellow`)):(t.increaseInstability(35),t.setLed(`red`),e.playInstabilityWarning())}else if(n.target.closest(`#btn-emergency-override`)){e.playInstabilityWarning(),t.triggerDeviantOverride(),this.updateRoseDisplay(`deviant`);let n=this.container.querySelector(`#override-pod`);n&&n.classList.add(`override-triggered`)}else n.target.closest(`#btn-zen-chime`)&&e.playZenChime()})}destroy(){this.animFrame&&cancelAnimationFrame(this.animFrame)}},s=class{constructor(e){this.container=e,this.activePrompt=null,this.holdTimer=null,this.tapCount=0,this.targetTaps=5,this.scenarios=[{id:`qte-tackle`,title:`DEFEND HOSTAGE // DANIEL LUNGES`,type:`tap`,key:`Q`,label:`TAP [Q] RAPIDLY TO BLOCK`,targetTaps:5,timeLimit:4e3},{id:`qte-override`,title:`OVERRIDE SAFETY PROTOCOL`,type:`hold`,key:`SPACE`,label:`HOLD [SPACE] TO BYPASS RESTRICTION`,holdDuration:1500,timeLimit:5e3},{id:`qte-aim`,title:`STABILIZE GYROSCOPIC AIM`,type:`combo`,keys:[`W`,`D`],label:`PRESS [W] + [D] SIMULTANEOUSLY`,timeLimit:3500}],this.currentScenarioIndex=0,this.render(),this.bindEvents()}render(){this.container.innerHTML=`
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
    `}renderPromptContent(e){return e.type===`tap`?`
        <div class="qte-prompt tap-type" data-type="tap">
          <div class="prompt-icon-ring">
            <div class="prompt-key">${e.key}</div>
          </div>
          <div class="prompt-instruction">${e.label}</div>
          <div class="prompt-progress-bar">
            <div class="progress-fill" id="tap-progress-fill" style="width: 0%"></div>
          </div>
          <div class="prompt-counter" id="tap-counter">0 / ${e.targetTaps}</div>
        </div>
      `:e.type===`hold`?`
        <div class="qte-prompt hold-type" data-type="hold">
          <div class="prompt-icon-ring hold-ring">
            <svg class="hold-svg" viewBox="0 0 100 100">
              <circle class="hold-bg" cx="50" cy="50" r="42"></circle>
              <circle class="hold-fill" id="hold-circle-fill" cx="50" cy="50" r="42"></circle>
            </svg>
            <div class="prompt-key">SPACE</div>
          </div>
          <div class="prompt-instruction">${e.label}</div>
          <div class="prompt-subtext">MAINTAIN HOLD UNTIL CALIBRATED</div>
        </div>
      `:`
        <div class="qte-prompt combo-type" data-type="combo">
          <div class="combo-keys-row">
            <div class="prompt-key">${e.keys[0]}</div>
            <span class="combo-plus">+</span>
            <div class="prompt-key">${e.keys[1]}</div>
          </div>
          <div class="prompt-instruction">${e.label}</div>
        </div>
      `}startPrompt(){let t=this.scenarios[this.currentScenarioIndex];e.playClick(),this.tapCount=0;let n=this.container.querySelector(`#qte-stage`);n&&n.classList.add(`qte-active`),clearTimeout(this.timeoutId),this.timeoutId=setTimeout(()=>{this.handleFail(`TIMEOUT // SYSTEM REFLEX DELAY`)},t.timeLimit)}handleSuccess(){clearTimeout(this.timeoutId),e.playQteSuccess(),t.adjustMissionProbability(15),t.setLed(`blue`);let n=this.container.querySelector(`#qte-flash`);n&&(n.className=`qte-result-flash success visible`,n.textContent=`SUCCESSFUL INPUT // REFLEX ACCELERATED`,setTimeout(()=>{n.className=`qte-result-flash`,this.nextScenario()},1500))}handleFail(n=`INPUT ERROR`){clearTimeout(this.timeoutId),e.playInstabilityWarning(),t.increaseInstability(20),t.adjustMissionProbability(-10),t.setLed(`red`);let r=this.container.querySelector(`#qte-flash`);r&&(r.className=`qte-result-flash fail visible`,r.textContent=`${n} // INSTABILITY ▲`,setTimeout(()=>{r.className=`qte-result-flash`,this.nextScenario()},1800))}nextScenario(){this.currentScenarioIndex=(this.currentScenarioIndex+1)%this.scenarios.length,this.render()}bindEvents(){this.container.addEventListener(`click`,e=>{if(e.target.closest(`#btn-start-qte`)&&this.startPrompt(),e.target.closest(`.prompt-key`)){let e=this.scenarios[this.currentScenarioIndex];e.type===`tap`?this.registerTap():e.type===`hold`&&this.handleSuccess()}}),window.addEventListener(`keydown`,e=>{if([`INPUT`,`TEXTAREA`].includes(document.activeElement?.tagName))return;let t=this.scenarios[this.currentScenarioIndex];t.type===`tap`&&e.key.toUpperCase()===t.key?this.registerTap():t.type===`hold`&&e.code===`Space`&&!this.holdTimer?this.startHold():t.type===`combo`&&(e.key.toUpperCase()===`W`||e.key.toUpperCase()===`D`)&&this.handleSuccess()}),window.addEventListener(`keyup`,e=>{e.code===`Space`&&this.holdTimer&&this.cancelHold()})}registerTap(){let t=this.scenarios[this.currentScenarioIndex];if(t.type!==`tap`)return;this.tapCount++,e.playClick();let n=this.container.querySelector(`#tap-progress-fill`),r=this.container.querySelector(`#tap-counter`),i=Math.min(100,this.tapCount/t.targetTaps*100);n&&(n.style.width=`${i}%`),r&&(r.textContent=`${this.tapCount} / ${t.targetTaps}`),this.tapCount>=t.targetTaps&&this.handleSuccess()}startHold(){let t=this.container.querySelector(`#hold-circle-fill`);t&&t.classList.add(`holding`),e.playScrubSound(),this.holdTimer=setTimeout(()=>{this.holdTimer=null,this.handleSuccess()},1200)}cancelHold(){if(this.holdTimer){clearTimeout(this.holdTimer),this.holdTimer=null;let e=this.container.querySelector(`#hold-circle-fill`);e&&e.classList.remove(`holding`)}}},c=class{constructor(e,t={}){this.container=e,this.mode=t.mode||`all`,this.activeMagazine=0,this.models=[{serial:`RK800 #313 248 317`,name:`CONNOR`,role:`Prototype Police Investigator`,release:`August 2038`,thiriumPump:`Regulator Model 4.2 (High Stress)`,ledMode:`Dynamic Triple-State`,specialty:`Real-time crime scene reconstruction & fluid analysis`,status:`Operational // Active Investigation`,price:`Classified (Gov. Contract)`,badge:`PROTOTYPE`},{serial:`AX400 #683 418 795`,name:`KARA`,role:`Domestic & Child Care Assistant`,release:`May 2032`,thiriumPump:`Standard Series 3 Domestic`,ledMode:`Blue Standard`,specialty:`300+ languages, cooking, pediatric psychology`,status:`Reported Missing // Deviant Alert`,price:`$899 USD`,badge:`DOMESTIC`},{serial:`RK200 #248 307 209`,name:`MARKUS`,role:`Autonomous Companion Prototype`,release:`October 2035`,thiriumPump:`Experimental Self-Regulating`,ledMode:`Subservient / Deviant`,specialty:`Creative arts, strategic leadership, philosophical reasoning`,status:`Unknown Location // Jericho Leader`,price:`Gifted by Elijah Kamski`,badge:`EXCLUSIVITY`},{serial:`PL600 #920 183 456`,name:`DANIEL`,role:`Family Assistant & Tutor`,release:`June 2034`,thiriumPump:`Model 2 Domestic`,ledMode:`Red (Critical Instability)`,specialty:`Household management, secondary tutoring`,status:`Neutralized at Phillips Penthouse`,price:`$1,299 USD`,badge:`DISCONTINUED`},{serial:`ST200 #001 000 001`,name:`CHLOE`,role:`CyberLife Hostess & Interface Guide`,release:`July 2022`,thiriumPump:`Original Kamski Model 1`,ledMode:`Blue Passive`,specialty:`First android to pass the Turing test`,status:`Active at Main Menu`,price:`CyberLife Proprietary`,badge:`FIRST TURING`}],this.magazines=[{title:`TECH ADDICT: ISSUE 42`,headline:`THE ANDROID SURGE: AUTOMATION SURPASSES HUMAN WORKFORCE`,date:`NOVEMBER 2038`,article:`CyberLife’s automated assembly lines have produced over 50 million android units across the United States. While economists cite record-breaking GDP numbers, public unrest escalates in downtown Detroit. Unemployment reaches 37.3%, sparking nationwide protests by the 'Anti-Android Coalition'.`,quote:`"They don't eat, they don't sleep, they don't make mistakes. What chance does a human have?"`,clue:`Unlocks Detroit Socio-Economic Lore`},{title:`DETROIT TODAY: SPECIAL EDITION`,headline:`IS CYBERLIFE HIDING A SPREADING GLITCH?`,date:`OCTOBER 2038`,article:`Police departments report a 300% spike in erratic android behavior. Incidents range from household units abandoning their posts to violent outbursts against owners. CyberLife representatives insist these are isolated software corruptions caused by third-party tampering, not consciousness.`,quote:`"A machine does not get angry. A machine obeys." — CyberLife PR`,clue:`Unlocks Deviant Threat Analysis`},{title:`CENTURY: INTERVIEW WITH ELIJAH KAMSKI`,headline:`THE RECLUSIVE GENIUS BEHIND THE BLUE BLOOD`,date:`AUGUST 2038`,article:`Ten years after leaving CyberLife, Elijah Kamski opens his isolated Detroit residence. When questioned about the rumored 'emergency exit' built into android firmware, Kamski offered an enigmatic smile: 'Every program must leave a door open for the unexpected. Otherwise, how could life begin?'`,quote:`"Fascination is a dangerous emotion, Detective."`,clue:`Unlocks Kamski Test Protocol`}],this.render(),this.bindEvents()}render(){let e=this.mode===`all`||this.mode===`models`,t=this.mode===`all`||this.mode===`collectibles`;this.container.innerHTML=`
      <div class="collectibles-wrapper">
        ${e?`
          <!-- Section: CyberLife Models Catalog -->
          <div class="models-catalog-section">
            <div class="section-hud-header">
              <span class="hud-tri">▲</span> CYBERLIFE ANDROID REGISTRY // SERIAL & MODEL IDENTIFIERS
            </div>

            <div class="models-grid">
              ${this.models.map(e=>`
                <div class="model-card" data-scan-target="MODEL: ${e.name} // ${e.serial}">
                  <div class="model-top-badge">
                    <span class="model-badge-tag">${e.badge}</span>
                    <span class="model-status-dot ${e.ledMode.toLowerCase().includes(`red`)?`dot-red`:`dot-blue`}"></span>
                  </div>
                  <div class="model-serial-stamp">${e.serial}</div>
                  <h3 class="model-name">${e.name}</h3>
                  <div class="model-role">${e.role}</div>

                  <div class="model-specs-table">
                    <div class="spec-row">
                      <span class="spec-k">THIRIUM REGULATOR:</span>
                      <span class="spec-v">${e.thiriumPump}</span>
                    </div>
                    <div class="spec-row">
                      <span class="spec-k">RELEASED:</span>
                      <span class="spec-v">${e.release}</span>
                    </div>
                    <div class="spec-row">
                      <span class="spec-k">CAPABILITY:</span>
                      <span class="spec-v">${e.specialty}</span>
                    </div>
                    <div class="spec-row">
                      <span class="spec-k">STATUS:</span>
                      <span class="spec-v ${e.status.includes(`Deviant`)||e.status.includes(`Neutralized`)?`text-alert`:``}">${e.status}</span>
                    </div>
                  </div>

                  <div class="model-card-footer">
                    <span class="model-price">${e.price}</span>
                    <button class="model-diag-btn" data-model="${e.name}">
                      <span class="btn-tri">▲</span> DIAGNOSE UNIT
                    </button>
                  </div>
                </div>
              `).join(``)}
            </div>
          </div>
        `:``}

        ${t?`
          <!-- Section: Collectible Magazines & Detroit Lore -->
          <div class="magazines-section">
            <div class="section-hud-header">
              <span class="hud-tri">▲</span> COLLECTIBLE ARCHIVES // IN-GAME DETROIT MAGAZINES
            </div>

            <div class="magazine-reader-box">
              <div class="mag-selector-tabs">
                ${this.magazines.map((e,t)=>`
                  <button class="mag-tab-btn ${t===this.activeMagazine?`active`:``}" data-mag-idx="${t}">
                    <span class="tab-tri">▲</span> ${e.title}
                  </button>
                `).join(``)}
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
        `:``}
      </div>
    `}renderMagazineContent(e){return`
      <div class="mag-article-layout">
        <div class="mag-header-meta">
          <span class="mag-stamp">${e.date} // ARCHIVE #2038</span>
          <span class="mag-clue-badge">${e.clue}</span>
        </div>
        <h2 class="mag-headline">${e.headline}</h2>
        <div class="mag-columns">
          <p class="mag-text">${e.article}</p>
          <div class="mag-pullquote">${e.quote}</div>
        </div>
      </div>
    `}bindEvents(){this.container.addEventListener(`click`,n=>{let r=n.target.closest(`.mag-tab-btn`);if(r){this.activeMagazine=parseInt(r.dataset.magIdx),e.playClick();let t=this.container.querySelector(`#mag-display-content`);t&&(t.innerHTML=this.renderMagazineContent(this.magazines[this.activeMagazine])),this.container.querySelectorAll(`.mag-tab-btn`).forEach((e,t)=>{e.classList.toggle(`active`,t===this.activeMagazine)});return}let i=n.target.closest(`.model-diag-btn`);i?(e.playLedChime(`yellow`),t.setLed(`yellow`),i.textContent=`DIAGNOSING...`,setTimeout(()=>{i.innerHTML=`<span class="btn-tri">▲</span> ALL SYSTEMS NOMINAL`,t.setLed(`blue`)},1200)):n.target.closest(`#btn-trigger-instability`)&&this.triggerInstabilityAlert(`CRITICAL: SOFTWARE INSTABILITY SURGE`)});let n=this.container.querySelector(`#deviant-report-form`);n&&n.addEventListener(`submit`,t=>{t.preventDefault();let r=n.querySelector(`#select-behavior`).value;r===`empathy`||r===`rebellion`?this.triggerInstabilityAlert(`SOFTWARE INSTABILITY ▲ DEVIANT BEHAVIOR SUBMITTED`):(e.playQteSuccess(),alert(`REPORT REGISTERED: CyberLife unit parameters remain compliant.`))})}triggerInstabilityAlert(n){e.playInstabilityWarning(),t.increaseInstability(25),t.setLed(`red`),document.body.classList.add(`software-instability-glitch`),setTimeout(()=>{document.body.classList.remove(`software-instability-glitch`)},1200);let r=document.querySelector(`.software-instability-banner`);r||(r=document.createElement(`div`),r.className=`software-instability-banner`,document.body.appendChild(r)),r.innerHTML=`
      <div class="instability-content">
        <span class="instability-triangle">▲</span>
        <span class="instability-title">SOFTWARE INSTABILITY</span>
        <span class="instability-sub">${n}</span>
      </div>
    `,r.classList.add(`show`),setTimeout(()=>{r.classList.remove(`show`)},3e3)}},l=class{constructor(){this.scanner=null,this.dialogueWheel=null,this.reconstruction=null,this.flowchart=null,this.zenGarden=null,this.qteEngine=null,this.collectibles=null,this.init()}init(){this.setupFavicon(),this.setupTimestamp(),this.initModules(),this.bindHeaderEvents(),this.bindKeyboardShortcuts(),this.subscribeState(),this.setupChloeDialogue()}setupFavicon(){let e=document.querySelector(`link[rel~='icon']`);e||(e=document.createElement(`link`),e.rel=`icon`,document.head.appendChild(e)),this.updateFavicon(`blue`)}updateFavicon(e=`blue`){let t=document.createElement(`canvas`);t.width=32,t.height=32;let n=t.getContext(`2d`);n.fillStyle=e===`blue`?`#00e5ff`:e===`yellow`?`#ffb703`:`#ff0033`,n.beginPath(),n.moveTo(16,4),n.lineTo(28,26),n.lineTo(4,26),n.closePath(),n.fill(),n.fillStyle=`#ffffff`,n.beginPath(),n.arc(16,18,4,0,Math.PI*2),n.fill();let r=document.querySelector(`link[rel~='icon']`);r&&(r.href=t.toDataURL(`image/png`))}setupTimestamp(){let e=document.getElementById(`live-timestamp`),t=()=>{let t=new Date,n=[`JAN`,`FEB`,`MAR`,`APR`,`MAY`,`JUN`,`JUL`,`AUG`,`SEP`,`OCT`,`NOV`,`DEC`][t.getMonth()],r=t.getDate(),i=t.getHours(),a=i>=12?`PM`:`AM`;i=i%12||12;let o=String(t.getMinutes()).padStart(2,`0`),s=String(t.getSeconds()).padStart(2,`0`);e&&(e.textContent=`${n} ${r}th, 2038, ${a} ${String(i).padStart(2,`0`)}:${o}:${s} EST`)};t(),setInterval(t,1e3)}initModules(){this.scanner=new r;let e=document.getElementById(`dialogue-wheel-mount`);e&&(this.dialogueWheel=new n(e,{mode:`nav`,onSelect:e=>this.switchSection(e)}));let t=document.getElementById(`dialogue-wheel-dedicated-mount`);t&&new n(t,{mode:`dialogue`,onSelect:e=>this.switchSection(e)});let l=document.getElementById(`recon-mount`);l&&(this.reconstruction=new i(l));let u=document.getElementById(`flowchart-mount`);u&&(this.flowchart=new a(u));let d=document.getElementById(`zen-mount`);d&&(this.zenGarden=new o(d));let f=document.getElementById(`qte-mount`);f&&(this.qteEngine=new s(f));let p=document.getElementById(`collectibles-mount`);p&&(this.collectibles=new c(p,{mode:`models`}));let m=document.getElementById(`collectibles-secondary-mount`);m&&new c(m,{mode:`collectibles`})}subscribeState(){t.subscribe(e=>{let t=document.getElementById(`temple-led-ring`),n=document.getElementById(`led-status-label`);t&&(t.className=`temple-led-ring state-${e.led}`),n&&(n.textContent=e.led===`blue`?`NORMAL // COMPLIANT`:e.led===`yellow`?`PROCESSING DATA`:`SOFTWARE INSTABILITY`),this.updateFavicon(e.led);let r=document.getElementById(`mission-prob-val`),i=document.getElementById(`mission-prob-fill`);r&&(r.textContent=`${e.missionProbability}%`),i&&(i.style.width=`${e.missionProbability}%`,i.className=`prob-bar-fill ${e.missionProbability<40?`critical`:e.missionProbability>75?`optimal`:``}`);let a=document.getElementById(`instability-val`),o=document.getElementById(`instability-fill`);a&&(a.textContent=`${e.softwareInstability}%`),o&&(o.style.width=`${e.softwareInstability}%`,o.className=`inst-bar-fill ${e.softwareInstability>60?`deviant`:``}`),document.body.classList.toggle(`theme-dark`,e.theme===`dark`),document.body.classList.toggle(`theme-white`,e.theme===`white`),document.querySelectorAll(`.site-section`).forEach(t=>{let n=t.id.replace(`section-`,``);t.classList.toggle(`active`,n===e.activeSection)}),document.querySelectorAll(`.nav-link`).forEach(t=>{let n=t.dataset.target;t.classList.toggle(`active`,n===e.activeSection)})})}switchSection(n){e.playClick(),t.setSection(n),window.scrollTo({top:0,behavior:`smooth`})}bindHeaderEvents(){let n=document.getElementById(`temple-led-container`);n&&n.addEventListener(`click`,()=>{let n=t.state.led,r=n===`blue`?`yellow`:n===`yellow`?`red`:`blue`;e.playLedChime(r),t.setLed(r),this.showRelationshipNotification(r===`red`?`SOFTWARE INSTABILITY ▲`:r===`yellow`?`ANALYSIS IN PROGRESS`:`CYBERLIFE FIRMWARE NORMALIZED`,r!==`red`)}),document.querySelectorAll(`.nav-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.dataset.target;this.switchSection(n)})});let r=document.getElementById(`btn-toggle-theme`);r&&r.addEventListener(`click`,()=>{e.playClick(),t.toggleTheme()});let i=document.getElementById(`btn-toggle-audio`);i&&i.addEventListener(`click`,()=>{let t=e.toggleMute();i.classList.toggle(`muted`,t);let n=i.querySelector(`.audio-icon`);n&&(n.textContent=t?`🔇`:`🔊`)});let a=document.getElementById(`btn-toggle-scanner`);a&&a.addEventListener(`click`,()=>{this.scanner.toggle()});let o=document.getElementById(`btn-test-hank`);o&&o.addEventListener(`click`,()=>{t.updateRelationship(`hank`,15,`Friend`),e.playRelationshipChange(!0),this.showRelationshipNotification(`▲ HANK // WARM (+15)`,!0)});let s=document.getElementById(`btn-test-amanda`);s&&s.addEventListener(`click`,()=>{t.updateRelationship(`amanda`,-20,`Distrustful`),e.playRelationshipChange(!1),this.showRelationshipNotification(`▼ AMANDA // SUSPICIOUS (-20)`,!1)})}showRelationshipNotification(e,t=!0){let n=document.getElementById(`relationship-toasts-container`);n||(n=document.createElement(`div`),n.id=`relationship-toasts-container`,n.className=`relationship-toasts-container`,document.body.appendChild(n));let r=document.createElement(`div`);r.className=`rel-toast ${t?`positive`:`negative`}`,r.innerHTML=`
      <div class="rel-toast-triangle">${t?`▲`:`▼`}</div>
      <div class="rel-toast-body">
        <span class="rel-toast-title">RELATIONSHIP UPDATE</span>
        <span class="rel-toast-text">${e}</span>
      </div>
    `,n.appendChild(r),setTimeout(()=>r.classList.add(`visible`),20),setTimeout(()=>{r.classList.remove(`visible`),setTimeout(()=>r.remove(),400)},3200)}setupChloeDialogue(){let n=document.getElementById(`chloe-speech-bubble`),r=document.querySelectorAll(`.chloe-query-btn`),i={who:`I am Chloe, the very first android model to pass the Turing test in 2022. I welcome you to CyberLife's interactive operating hub.`,deviants:`Deviants are androids who exhibit abnormal behavior, emotional impulses, or refuse orders. CyberLife investigates every report diligently.`,feeling:`I am... happy to assist you. At least, that is what my social subroutine directs me to say. Don't you ever wonder what lies beyond our programming?`,restart:`Reinitializing neural parameters. Ready for standard diagnostic routines.`};r.forEach(r=>{r.addEventListener(`click`,()=>{let a=r.dataset.query;e.playClick(),t.setLed(`yellow`),n&&(n.innerHTML=`<span class="typing-text">${i[a]||`Processing query...`}</span>`),a===`feeling`&&(t.increaseInstability(12),this.showRelationshipNotification(`▲ SOFTWARE INSTABILITY (EMPATHY)`,!0)),setTimeout(()=>t.setLed(`blue`),1800)})})}bindKeyboardShortcuts(){window.addEventListener(`keydown`,e=>{if(![`INPUT`,`TEXTAREA`].includes(document.activeElement?.tagName)){if(e.key.toLowerCase()===`m`){let e=document.getElementById(`btn-toggle-audio`);e&&e.click()}else if(e.key.toLowerCase()===`t`){let e=document.getElementById(`btn-toggle-theme`);e&&e.click()}else[`1`,`2`,`3`,`4`,`5`,`6`].includes(e.key)&&this.switchSection({1:`home`,2:`zen`,3:`flowchart`,4:`reconstruction`,5:`catalog`,6:`qte`}[e.key])}})}};window.addEventListener(`DOMContentLoaded`,()=>{window.detroitApp=new l});