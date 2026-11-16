/**
 * Global Detroit State Manager
 * Handles reactive state for LED, Probability, Software Instability, and Story Choices.
 */

class DetroitStateManager {
  constructor() {
    this.state = {
      led: 'blue', // 'blue' | 'yellow' | 'red'
      theme: 'white', // 'white' | 'dark'
      missionProbability: 73,
      softwareInstability: 24,
      scannerActive: false,
      activeSection: 'home',
      relationships: {
        hank: { name: 'Hank Anderson', level: 'Warm', value: 70, trend: 'up' },
        amanda: { name: 'Amanda (CyberLife)', level: 'Evaluating', value: 55, trend: 'neutral' },
        alice: { name: 'Alice', level: 'Family', value: 90, trend: 'up' },
        cyberlife: { name: 'CyberLife Directive', level: 'Compliant', value: 65, trend: 'down' }
      },
      clues: {
        fish: false,
        gun: false,
        blood: false,
        name: false
      },
      flowchart: {
        unlocked: ['node-start', 'node-negotiate', 'node-trust'],
        selectedNode: 'node-start'
      },
      zenRose: 'bloom', // 'ice' | 'bloom' | 'wilt' | 'deviant'
      deviantEmergencyOverride: false
    };

    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.state);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.state));
  }

  setLed(color) {
    if (!['blue', 'yellow', 'red'].includes(color)) return;
    this.state.led = color;
    this.notify();
  }

  toggleTheme() {
    this.state.theme = this.state.theme === 'white' ? 'dark' : 'white';
    this.notify();
    return this.state.theme;
  }

  setSection(sectionId) {
    this.state.activeSection = sectionId;
    this.notify();
  }

  setMissionProbability(val) {
    this.state.missionProbability = Math.max(0, Math.min(100, Math.round(val)));
    this.notify();
  }

  adjustMissionProbability(delta) {
    this.setMissionProbability(this.state.missionProbability + delta);
  }

  setSoftwareInstability(val) {
    this.state.softwareInstability = Math.max(0, Math.min(100, Math.round(val)));
    // If instability crosses 70%, trigger red warning LED
    if (this.state.softwareInstability >= 70 && this.state.led !== 'red') {
      this.setLed('red');
    }
    this.notify();
  }

  increaseInstability(delta = 15) {
    this.setSoftwareInstability(this.state.softwareInstability + delta);
    return this.state.softwareInstability;
  }

  toggleScanner(force) {
    this.state.scannerActive = typeof force === 'boolean' ? force : !this.state.scannerActive;
    this.notify();
    return this.state.scannerActive;
  }

  discoverClue(clueId) {
    if (this.state.clues[clueId]) return false;
    this.state.clues[clueId] = true;
    this.adjustMissionProbability(12);
    this.notify();
    return true;
  }

  updateRelationship(charKey, delta, newLevel) {
    if (!this.state.relationships[charKey]) return;
    const char = this.state.relationships[charKey];
    char.value = Math.max(0, Math.min(100, char.value + delta));
    char.trend = delta >= 0 ? 'up' : 'down';
    if (newLevel) char.level = newLevel;
    this.notify();
  }

  unlockFlowNode(nodeId) {
    if (!this.state.flowchart.unlocked.includes(nodeId)) {
      this.state.flowchart.unlocked.push(nodeId);
      this.notify();
    }
  }

  setZenRose(state) {
    this.state.zenRose = state;
    this.notify();
  }

  triggerDeviantOverride() {
    this.state.deviantEmergencyOverride = true;
    this.state.softwareInstability = 100;
    this.state.led = 'red';
    this.state.zenRose = 'deviant';
    this.notify();
  }
}

export const state = new DetroitStateManager();
