# CineCraft | Premium Director of Photography & NLE Suite Portfolio

A luxury, interactive portfolio website and full **Adobe Premiere Pro & Final Cut Pro NLE Studio Simulator**, built with React, TypeScript, Vite, Tailwind CSS, and Web Audio API.

Inspired by top-tier creative studio design, featuring claymorphic 3D aesthetics, a floating interactive 3D VIP lanyard pass, multi-track video timeline, real-time ACES Lumetri color grading engine, before/after split slider, and production rate estimator.

---

## 🚀 Key Features

### 1. Stylized Creative Hero (Based on Visual Identity)
- **Bold Custom Typography**: Iconic `Port[===]lio` header with an elongated capsule letterform.
- **Interactive 3D Composition**: Claymorphic composition with camera aperture, year badge (`2026ᵇ`), tactile smiley, and clickable mechanical keycap switches (`REC`, `CUT`, `SNAP`) producing real procedural sound effects.
- **Floating 3D Lanyard Pass**: VIP credential pass that follows mouse movement with 3D tilt and specular sheen; clicks to flip 180° to reveal Stage-A festival security clearance.
- **Behind the Visuals Manifesto**: Storytelling philosophy and creative journey.
- **Creative Education & Career Milestones**: Dual vertical connected timelines with festival laurels and agency milestones.
- **3D Creative Toolkit**: Skeuomorphic app badges for Adobe Premiere Pro (`Pr`), After Effects (`Ae`), Final Cut Pro (`Fc`), DaVinci Resolve Studio (`Dv`), Blender (`Bl`), and Cinema 4D (`C4`).

### 2. Adobe Premiere & Final Cut Pro NLE Suite Simulator
- **Multi-Track Magnetic Timeline**:
  - Video Tracks: `V3 Titles/VFX`, `V2 A-Cam 8K Dialogue`, `V1 B-Roll Anamorphic`.
  - Audio Tracks: `A1 SFX Risers`, `A2 Foley Ambience`, `A3 Master Score` (with live waveform).
  - Draggable playhead with frame-accurate SMPTE Timecode (`00:02:14:18`).
- **Real-Time Split-Screen Color Grade Slider**: Drag handle to compare uncorrected **RAW S-Log3** vs **Graded Rec.709** in real-time.
- **Lumetri 3D LUT Presets**:
  - *Kodak 2383 35mm Film Print*
  - *Teal & Orange Blockbuster*
  - *Nordic Noir Bleach Bypass*
  - *Cyber Neo-Tokyo*
  - *RAW Flat Log*
- **Live Color Science Controls**: Real-time sliders for Exposure, Contrast, Saturation, White Balance Temperature, and 35mm Film Grain.
- **Multi-Aspect Ratio Masking**: Switch between `2.39:1 CinemaScope`, `16:9 4K UHD`, `9:16 Vertical Reel`, and `4:3 Vintage Academy`.
- **Keyboard Shortcuts**:
  - `Space`: Play / Pause
  - `J` / `K` / `L`: Reverse / Stop / Fast-Forward
  - `C`: Razor Blade Cut (with audio blade slice SFX)
  - `V`: Selection Tool
  - `Left` / `Right`: Step 1 Frame
- **Dual VU Audio Meters**: Left & Right stereo peak decibel bars.
- **Shot EXIF & Camera HUD**: Live readout of Camera, Lens, Codec, Sensor, FPS, Shutter Angle (180.0°), ISO.

### 3. Curated Filmography & Project Modal
- Filterable by `All`, `Commercial`, `Music Video`, `Documentary`, `Narrative`, `FPV Drone`.
- Interactive cinema modal with video playback, director's BTS notes, lighting diagrams, color palette swatches, and "Load in NLE Color Suite" action.

### 4. Gear Locker
- Visual catalog of flagship cinema equipment (RED V-Raptor 8K, ARRI Alexa Mini LF, Sony FX3, Cooke Anamorphic /i FF+ Primes, DJI Ronin 4D 4-Axis, Aputure Electro Storm 1500W).

### 5. Interactive Production Rate & Budget Estimator
- Configure project scope, shoot days, camera package, and post-production add-ons (ACES color grade, 5.1 sound design, 9:16 cutdowns, drone pilot).
- Multi-currency conversion: USD ($), EUR (€), GBP (£), JPY (¥).
- Submitting booking inquiry launches celebratory confetti and generates a confirmation reference code.

### 6. Procedural Web Audio API Sound Effects
- Mechanical keyboard clicks, camera shutter snap, blade slice, and 55Hz studio ambient room tone generator without external audio files.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 + Custom Claymorphic / Neumorphic Shadows
- **Icons**: Lucide React
- **Celebration**: Canvas-Confetti
- **Audio**: Web Audio API Procedural Synthesizer

---

## ⚡ Running Locally

```bash
cd C:\Users\Nandhu\.gemini\antigravity\scratch\cinecraft-portfolio
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
