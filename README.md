# CYBERLIFE // Detroit: Become Human Web Experience

An authentic, zero-error interactive web application inspired by Quantic Dream's **Detroit: Become Human**, featuring the complete CyberLife interface design system.

---

## 🚀 Features Implemented

| # | Element | What It Is In The Game | Website Implementation |
|---|---|---|---|
| **1** | **Logo & Favicon** | Android's triangle badge & temple LED | Glowing SVG CyberLife triangle logo and a **dynamic canvas favicon** that updates its color in real time with the temple LED state. |
| **2** | **Status Dot in Header** | Android's temple LED ring (Blue, Yellow, Red) | Glowing temple LED in the header with rotating halo and pulse animation. Click to cycle between **Blue (Normal)**, **Yellow (Computing/Analyzing)**, and **Red (Software Instability)**. |
| **3** | **Home Page & Main Menu** | Chloe's clean white space | Chloe's pristine interface with animated avatar, speech bubble, and interactive dialogue queries ("Who are you?", "What are deviants?", "Do you have emotions?"). |
| **4** | **Section Headings** | Chapter title, character, location & timestamp | HUD bar with `CHAPTER 01 // THE HOSTAGE`, `CONNOR RK800 #313 248 317`, and a live ticking Detroit timestamp (`NOV 16th, 2038`). |
| **5** | **Navigation Menu** | Dialogue wheel | 4-direction radial HUD menu with keyboard keys (`W/A/S/D` and arrows), timed countdown circle, and dual Navigation / Dialogue testing modes. |
| **6** | **Buttons & Shortcuts** | Quick-Time Prompts (QTE) | Interactive reflex diagnostic mini-game with **Hold [SPACE]**, **Tap [Q] rapidly**, and **Key Combos ([W]+[D])** with instant reflex scoring. |
| **7** | **Form Errors & Warnings** | Software Instability alert | Iconic red triangle icon with `SOFTWARE INSTABILITY ▲`, screen chromatic glitch, warning audio dissonance, and Deviant Incident Audit form. |
| **8** | **Hover Effect on Cards** | Connor's blue wireframe scan | Wireframe scanline grid and target callouts on card hover, plus global Detective Scan mode (`[R2]` button or `F`/`R` key). |
| **9** | **Timeline Slider** | Crime scene reconstruction | Interactive timeline scrubber (00:00 to 02:00) with Rewind, Play, Fast-Forward, ghost wireframe figures on canvas, and 3 discoverable forensic clues. |
| **10** | **Progress Bars & Percentages** | Mission success probability | Dynamic thirium blue radial & linear gauges (`MISSION PROBABILITY: 73%`) that respond to clues found, QTE reflexes, and dialogue choices. |
| **11** | **Notifications** | Relationship indicators | Sliding HUD toasts with upward/downward triangles (`▲ HANK TRUST`, `▼ AMANDA SUSPICIOUS`, `▲ ALICE FAMILY`). |
| **12** | **Site Map / Story Page** | Branching flowchart | Interactive branching decision tree showing completed paths, locked paths, and community statistics (`68% of players chose this`). |
| **13** | **Hero / About Section** | The Zen Garden | Amanda's sanctuary with canvas mist/sakura particles, state-reactive blooming/frozen/wilting rose, and the Emergency Override Pedestal to break CyberLife control. |
| **14** | **Profile & Product Cards** | Android serial & model labels | High-tech registry cards for `RK800 Connor`, `AX400 Kara`, `RK200 Markus`, `PL600 Daniel`, and `ST200 Chloe` with specs and diagnostics. |
| **15** | **Collectibles & Lore** | In-game magazines | Interactive Detroit magazines (*Tech Addict*, *Detroit Today*, *Century: Elijah Kamski*) with editorial layouts and lore clues. |

---

## ⌨️ Keyboard Shortcuts

- **`W` / `↑`**: Move Up on Dialogue Wheel (Zen Garden)
- **`D` / `→`**: Move Right on Dialogue Wheel (Flowchart)
- **`S` / `↓`**: Move Down on Dialogue Wheel (Reconstruction)
- **`A` / `←`**: Move Left on Dialogue Wheel (Android Models)
- **`F` or `R`**: Toggle Connor's Detective Scanner Mode
- **`T`**: Toggle Theme (Chloe's Pure White ↔ Connor's Cyber Dark)
- **`M`**: Mute / Unmute CyberLife Synthesized Audio
- **`1` through `8`**: Direct Section Navigation

---

## 🛠️ How to Run

### Development Server:
```bash
npm run dev
```

### Production Build:
```bash
npm run build
npm run preview
```

Or simply open `index.html` in any modern web browser!
