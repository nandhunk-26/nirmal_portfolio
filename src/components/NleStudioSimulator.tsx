import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundFx } from '../utils/audioEffects';
import { TIMELINE_CLIPS, LUT_PRESETS, PROJECTS } from '../data/portfolioData';
import { LutPreset, Project } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Scissors,
  Sliders,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Grid,
  Layers,
  Sparkles,
  Eye,
  Lock,
  ChevronRight,
  Disc,
  Radio,
  FastForward,
  Rewind
} from 'lucide-react';

export const NleStudioSimulator: React.FC = () => {
  // Active Project Source
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  
  // Workspace mode
  const [activeWorkspace, setActiveWorkspace] = useState<'Assembly' | 'Editing' | 'Color' | 'Audio'>('Editing');
  
  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(14.5); // seconds
  const [duration, setDuration] = useState<number>(60); // total timeline duration in sec
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [aspectRatio, setAspectRatio] = useState<'2.39:1' | '16:9' | '9:16' | '4:3'>('2.39:1');
  const [showSafeGuides, setShowSafeGuides] = useState<boolean>(false);
  const [activeTool, setActiveTool] = useState<'arrow' | 'blade' | 'hand'>('arrow');
  
  // Color Grading State
  const [activeLut, setActiveLut] = useState<LutPreset>(LUT_PRESETS[0]);
  const [splitSliderPos, setSplitSliderPos] = useState<number>(50); // 0 to 100%
  const [isSplitMode, setIsSplitMode] = useState<boolean>(true);
  
  // Lumetri Custom Controls
  const [exposure, setExposure] = useState<number>(0); // -100 to 100
  const [contrast, setContrast] = useState<number>(15);
  const [saturation, setSaturation] = useState<number>(10);
  const [temperature, setTemperature] = useState<number>(5); // -50 to 50
  const [filmGrain, setFilmGrain] = useState<number>(12);
  
  // Timeline zoom
  const [timelineZoom, setTimelineZoom] = useState<number>(1.0);
  
  // Audio state
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [vuLeft, setVuLeft] = useState<number>(65);
  const [vuRight, setVuRight] = useState<number>(60);
  
  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // Element references
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Timecode Formatter: HH:MM:SS:FF
  const formatTimecode = (seconds: number, fps: number = 24) => {
    const totalFrames = Math.floor(seconds * fps);
    const hrs = Math.floor(totalFrames / (3600 * fps));
    const mins = Math.floor((totalFrames % (3600 * fps)) / (60 * fps));
    const secs = Math.floor((totalFrames % (60 * fps)) / fps);
    const frames = totalFrames % fps;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}:${pad(frames)}`;
  };

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    soundFx.playKeycapClick('high');
    setIsPlaying(prev => !prev);
  }, []);

  // Frame Step
  const stepFrame = (frames: number) => {
    soundFx.playPlayheadBeep();
    const frameDuration = 1 / 24;
    setCurrentTime(prev => Math.max(0, Math.min(duration, prev + frames * frameDuration)));
  };

  // Switch Project
  const handleSelectProject = (proj: Project) => {
    soundFx.playKeycapClick('low');
    setSelectedProject(proj);
    setCurrentTime(0);
  };

  // Playhead animation loop & VU Meter simulation
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        setCurrentTime(prev => {
          const next = prev + delta * playbackSpeed;
          if (next >= duration) {
            return 0; // loop
          }
          return next;
        });

        // Simulate reactive audio VU meters during playback
        const baseLeft = 60 + Math.sin(time * 0.015) * 20 + (Math.random() * 15 - 7.5);
        const baseRight = 58 + Math.cos(time * 0.014) * 20 + (Math.random() * 15 - 7.5);
        setVuLeft(Math.max(10, Math.min(95, baseLeft)));
        setVuRight(Math.max(10, Math.min(95, baseRight)));
      } else {
        setVuLeft(prev => Math.max(5, prev * 0.9));
        setVuRight(prev => Math.max(5, prev * 0.9));
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, duration]);

  // Sync HTML5 video if available
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.playbackRate = Math.abs(playbackSpeed);
        videoRef.current.play().catch(() => {
          // auto-play restrictions handled gracefully
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, playbackSpeed]);

  // Fallback Canvas Renderer (Draws rich cinematic procedural animation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let canvasAnimId: number;
    let tick = 0;

    const render = () => {
      tick++;
      const w = canvas.width;
      const h = canvas.height;

      // Dark cinematic base
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#0a0d14');
      grad.addColorStop(0.5, '#121826');
      grad.addColorStop(1, '#080a0f');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Procedural Anamorphic Horizontal Flare
      const flareY = h * 0.45 + Math.sin(tick * 0.02) * 20;
      const flareGrad = ctx.createLinearGradient(0, flareY - 40, 0, flareY + 40);
      flareGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
      flareGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.45)');
      flareGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = flareGrad;
      ctx.fillRect(0, flareY - 15, w, 30);

      // Core flare beam
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(w * 0.2, flareY - 1.5, w * 0.6, 3);

      // Atmospheric glowing particles
      for (let i = 0; i < 24; i++) {
        const px = (Math.sin(i * 99 + tick * 0.01) * 0.5 + 0.5) * w;
        const py = (Math.cos(i * 33 + tick * 0.015) * 0.5 + 0.5) * h;
        const radius = (i % 3) + 1.5;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(244, 63, 94, 0.3)';
        ctx.fill();
      }

      // Title & SMPTE HUD overlay on canvas
      ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText(selectedProject.title, 30, h - 35);

      ctx.font = '500 12px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
      ctx.fillText(`CAM: ${selectedProject.camera} | ${selectedProject.lens}`, 30, h - 18);

      canvasAnimId = requestAnimationFrame(render);
    };

    canvasAnimId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(canvasAnimId);
  }, [selectedProject]);

  // Timeline Click / Scrub
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(ratio * duration);
    soundFx.playPlayheadBeep();
  };

  // Keyboard Shortcuts (Space, J, K, L, C, V)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'k' || e.key === 'K') {
        setIsPlaying(false);
        setPlaybackSpeed(1.0);
        soundFx.playKeycapClick('low');
      } else if (e.key === 'l' || e.key === 'L') {
        setIsPlaying(true);
        setPlaybackSpeed(prev => (prev < 4 ? prev + 1 : 1));
        soundFx.playKeycapClick('high');
      } else if (e.key === 'j' || e.key === 'J') {
        setIsPlaying(true);
        setPlaybackSpeed(prev => (prev > -4 ? prev - 1 : -1));
        soundFx.playKeycapClick('high');
      } else if (e.key === 'c' || e.key === 'C') {
        setActiveTool('blade');
        soundFx.playBladeCut();
      } else if (e.key === 'v' || e.key === 'V') {
        setActiveTool('arrow');
        soundFx.playKeycapClick('low');
      } else if (e.key === 'ArrowRight') {
        stepFrame(1);
      } else if (e.key === 'ArrowLeft') {
        stepFrame(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay]);

  // Aspect ratio class helper
  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case '2.39:1':
        return 'aspect-[2.39/1] max-w-5xl';
      case '9:16':
        return 'aspect-[9/16] max-h-[500px] w-auto';
      case '4:3':
        return 'aspect-[4/3] max-w-3xl';
      case '16:9':
      default:
        return 'aspect-video max-w-4xl';
    }
  };

  // CSS Filter string for color grade
  const computedFilter = `
    ${activeLut.filter}
    brightness(${1 + exposure / 100})
    contrast(${1 + contrast / 100})
    saturate(${1 + saturation / 100})
    hue-rotate(${temperature * 0.5}deg)
  `;

  return (
    <div className="w-full bg-[#121316] text-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 transition-all duration-300">
      {/* ========================================================
          TOP NLE WORKSPACE HEADER (Adobe Premiere & Final Cut Style)
         ======================================================== */}
      <div className="bg-[#181a1f] px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand & Workspace Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 pr-3 border-r border-slate-700">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center font-bold text-xs shadow-md border border-indigo-400/30">
              Pr
            </div>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-700 flex items-center justify-center font-bold text-xs shadow-md border border-teal-400/30">
              Fc
            </div>
            <span className="font-display font-bold text-xs tracking-wider text-slate-200 hidden sm:inline">
              NLE CINEMA SUITE
            </span>
          </div>

          {/* Workspace Tabs */}
          <div className="flex items-center bg-[#0d0e11] p-0.5 rounded-lg border border-slate-800 text-xs">
            {(['Assembly', 'Editing', 'Color', 'Audio'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  soundFx.playKeycapClick('low');
                  setActiveWorkspace(tab);
                }}
                className={`px-3 py-1 rounded-md font-medium transition-all duration-150 ${
                  activeWorkspace === tab
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab === 'Color' ? 'Color (Lumetri)' : tab === 'Audio' ? 'Audio (Fairlight)' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Glowing SMPTE Timecode Counter */}
        <div className="flex items-center gap-2 bg-[#0a0b0e] px-3.5 py-1.5 rounded-lg border border-slate-800 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-sm tracking-widest text-emerald-400 font-bold">
            {formatTimecode(currentTime)}
          </span>
          <span className="text-[10px] font-mono text-slate-500 border-l border-slate-800 pl-2">
            24.00 FPS
          </span>
        </div>

        {/* Right: Aspect Ratio & Audio Toggle */}
        <div className="flex items-center gap-2">
          {/* Aspect Ratio Switcher */}
          <div className="flex items-center bg-[#0d0e11] rounded-lg border border-slate-800 p-0.5 text-[11px] font-mono">
            {(['2.39:1', '16:9', '9:16', '4:3'] as const).map(ratio => (
              <button
                key={ratio}
                onClick={() => {
                  soundFx.playKeycapClick('high');
                  setAspectRatio(ratio);
                }}
                className={`px-2 py-0.5 rounded ${
                  aspectRatio === ratio
                    ? 'bg-slate-700 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>

          {/* Guide Overlay Button */}
          <button
            onClick={() => {
              soundFx.playKeycapClick('high');
              setShowSafeGuides(!showSafeGuides);
            }}
            title="Toggle Rule of Thirds & Safe Margin Guides"
            className={`p-1.5 rounded-lg border transition-all ${
              showSafeGuides
                ? 'bg-cyan-950 border-cyan-500/50 text-cyan-400'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Ambient Studio Sound Toggle */}
          <button
            onClick={() => {
              const playing = soundFx.toggleAmbientStudioTone();
              setIsAudioMuted(!playing);
            }}
            title="Toggle Ambient Studio Hum"
            className={`p-1.5 rounded-lg border transition-all ${
              soundFx.isAmbientPlaying
                ? 'bg-purple-950 border-purple-500/50 text-purple-400'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {soundFx.isAmbientPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ========================================================
          MAIN MONITOR VIEWPORT & PROGRAM CANVAS
         ======================================================== */}
      <div className="p-4 bg-[#0a0b0d] flex flex-col items-center justify-center relative overflow-hidden min-h-[380px] sm:min-h-[440px]">
        {/* Aspect Ratio Box Wrapper */}
        <div
          className={`relative mx-auto rounded-xl overflow-hidden shadow-2xl border border-slate-800/80 bg-black flex items-center justify-center transition-all duration-300 w-full ${getAspectRatioClasses()}`}
        >
          {/* Before / After Color Grade Split Slider System */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* GRADED / AFTER VIEW (Left side or Full) */}
            <div
              style={{
                filter: computedFilter,
                clipPath: isSplitMode ? `inset(0 ${100 - splitSliderPos}% 0 0)` : undefined,
              }}
              className="absolute inset-0 w-full h-full overflow-hidden transition-[filter] duration-150"
            >
              <video
                ref={videoRef}
                src={selectedProject.videoUrl}
                poster={selectedProject.thumbnail}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Fallback procedural canvas */}
              <canvas
                ref={canvasRef}
                width={960}
                height={540}
                className="w-full h-full object-cover -z-10"
              />

              {/* Film Grain layer */}
              <div
                className="absolute inset-0 pointer-events-none film-grain"
                style={{ opacity: filmGrain / 100 }}
              />

              {/* Graded Label Tag */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                GRADED: {activeLut.name.toUpperCase()}
              </div>
            </div>

            {/* RAW LOG / BEFORE VIEW (Right side under split slider) */}
            {isSplitMode && (
              <div
                style={{
                  filter: 'contrast(0.72) saturate(0.65) brightness(1.15)',
                  clipPath: `inset(0 0 0 ${splitSliderPos}%)`,
                }}
                className="absolute inset-0 w-full h-full overflow-hidden"
              >
                <img
                  src={selectedProject.thumbnail}
                  alt="Raw Log Sensor Preview"
                  className="w-full h-full object-cover"
                />

                {/* Raw S-Log3 Label Tag */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  RAW S-LOG3 / UNGRADED
                </div>
              </div>
            )}

            {/* Interactive Split Slider Line & Handle */}
            {isSplitMode && (
              <div
                style={{ left: `${splitSliderPos}%` }}
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 cursor-ew-resize flex items-center justify-center pointer-events-none"
              >
                <div className="w-7 h-7 rounded-full bg-white text-slate-900 shadow-xl border-2 border-slate-900 flex items-center justify-center font-bold text-[10px] pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                  ⇄
                </div>
              </div>
            )}

            {/* Hidden Input Range for smooth slider dragging */}
            {isSplitMode && (
              <input
                type="range"
                min="0"
                max="100"
                value={splitSliderPos}
                onChange={e => setSplitSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />
            )}

            {/* Safe Area Crosshairs & Rule of Thirds Overlays */}
            {showSafeGuides && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Rule of Thirds Lines */}
                <div className="absolute top-1/3 left-0 right-0 border-t border-cyan-400/30"></div>
                <div className="absolute top-2/3 left-0 right-0 border-t border-cyan-400/30"></div>
                <div className="absolute top-0 bottom-0 left-1/3 border-l border-cyan-400/30"></div>
                <div className="absolute top-0 bottom-0 right-1/3 border-l border-cyan-400/30"></div>

                {/* Title Safe Margins (80% box) */}
                <div className="absolute inset-[10%] border border-amber-400/30 rounded-sm"></div>

                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6">
                  <div className="absolute top-1/2 left-0 right-0 border-t border-red-500/60"></div>
                  <div className="absolute top-0 bottom-0 left-1/2 border-l border-red-500/60"></div>
                </div>
              </div>
            )}

            {/* Cinema Anamorphic Matte Bars if 2.39:1 on a 16:9 box */}
            {aspectRatio === '2.39:1' && (
              <>
                <div className="absolute top-0 left-0 right-0 h-[6%] bg-black pointer-events-none z-10 border-b border-slate-900"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[6%] bg-black pointer-events-none z-10 border-t border-slate-900"></div>
              </>
            )}
          </div>
        </div>

        {/* Floating Monitor Bottom Controls */}
        <div className="mt-3 w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 px-2">
          {/* Source Reel Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-[10px] uppercase font-mono text-slate-500 mr-1 hidden sm:inline">
              REEL:
            </span>
            {PROJECTS.map(proj => (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(proj)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-150 whitespace-nowrap ${
                  selectedProject.id === proj.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 border border-transparent'
                }`}
              >
                {proj.title}
              </button>
            ))}
          </div>

          {/* Color Split Slider Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playKeycapClick('high');
                setIsSplitMode(!isSplitMode);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                isSplitMode
                  ? 'bg-purple-900/40 border-purple-500 text-purple-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isSplitMode ? 'Split Grade: ON (Drag ⇄)' : 'Split Grade: OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          COLOR & LUMETRI CONTROL PANEL (When in 'Color' tab or toggled)
         ======================================================== */}
      {activeWorkspace === 'Color' && (
        <div className="bg-[#14161b] p-4 border-t border-b border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                LUMETRI 3D LUT ENGINE & COLOR SCIENCE
              </h4>
            </div>

            {/* Reset Grade Button */}
            <button
              onClick={() => {
                soundFx.playKeycapClick('high');
                setExposure(0);
                setContrast(15);
                setSaturation(10);
                setTemperature(5);
                setFilmGrain(12);
                setActiveLut(LUT_PRESETS[0]);
              }}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800"
            >
              <RotateCcw className="w-3 h-3" /> Reset Look
            </button>
          </div>

          {/* LUT Quick Selector Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {LUT_PRESETS.map(lut => (
              <button
                key={lut.id}
                onClick={() => {
                  soundFx.playKeycapClick('high');
                  setActiveLut(lut);
                }}
                className={`p-2 rounded-xl text-left border transition-all duration-150 ${
                  activeLut.id === lut.id
                    ? 'bg-gradient-to-br from-purple-900/60 to-slate-800 border-purple-500 shadow-lg'
                    : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ backgroundColor: lut.gradePreviewColor }}
                  />
                  <span className="text-xs font-bold text-slate-100 truncate block">
                    {lut.name}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-1">
                  {lut.description}
                </p>
              </button>
            ))}
          </div>

          {/* Lumetri Sliders (Exposure, Contrast, Saturation, Temp, Grain) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Exposure:</span>
                <span className="text-purple-300">{exposure > 0 ? `+${exposure}` : exposure} EV</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={exposure}
                onChange={e => setExposure(Number(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Contrast:</span>
                <span className="text-purple-300">{contrast}%</span>
              </div>
              <input
                type="range"
                min="-30"
                max="60"
                value={contrast}
                onChange={e => setContrast(Number(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Saturation:</span>
                <span className="text-purple-300">{saturation}%</span>
              </div>
              <input
                type="range"
                min="-50"
                max="80"
                value={saturation}
                onChange={e => setSaturation(Number(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>White Bal Temp:</span>
                <span className="text-amber-300">{temperature > 0 ? `+${temperature}K` : `${temperature}K`}</span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                value={temperature}
                onChange={e => setTemperature(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>35mm Film Grain:</span>
                <span className="text-cyan-300">{filmGrain}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={filmGrain}
                onChange={e => setFilmGrain(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TRANSPORT CONTROLS & DUAL VU METERS
         ======================================================== */}
      <div className="bg-[#181a1f] px-4 py-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Tool Palette (Selection Arrow, Razor Blade, Hand) */}
        <div className="flex items-center gap-1 bg-[#0d0e11] p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => {
              setActiveTool('arrow');
              soundFx.playKeycapClick('low');
            }}
            title="Selection Tool (V)"
            className={`p-1.5 rounded ${
              activeTool === 'arrow'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ChevronRight className="w-4 h-4 rotate-[-45deg]" />
          </button>

          <button
            onClick={() => {
              setActiveTool('blade');
              soundFx.playBladeCut();
            }}
            title="Razor Blade Slice Tool (C)"
            className={`p-1.5 rounded ${
              activeTool === 'blade'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scissors className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setActiveTool('hand');
              soundFx.playKeycapClick('low');
            }}
            title="Hand Scrubber Tool (H)"
            className={`p-1.5 rounded ${
              activeTool === 'hand'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Playback Transport Buttons */}
        <div className="flex items-center gap-2">
          {/* Frame Step Back */}
          <button
            onClick={() => stepFrame(-1)}
            title="Step 1 Frame Back (Left Arrow)"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <Rewind className="w-4 h-4" />
          </button>

          {/* Play / Pause Primary Button */}
          <button
            onClick={togglePlay}
            title="Play / Pause (Spacebar)"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span className="text-xs font-mono">PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span className="text-xs font-mono">PLAY</span>
              </>
            )}
          </button>

          {/* Frame Step Forward */}
          <button
            onClick={() => stepFrame(1)}
            title="Step 1 Frame Forward (Right Arrow)"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Dual Stereo Audio VU Meters */}
        <div className="flex items-center gap-2 bg-[#0c0d10] px-3 py-1 rounded-lg border border-slate-800">
          <span className="text-[10px] font-mono text-slate-500">VU:</span>
          {/* L Channel */}
          <div className="w-20 sm:w-28 h-2 bg-slate-900 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${vuLeft}%` }}
              className={`h-full transition-all duration-75 ${
                vuLeft > 85 ? 'bg-red-500' : vuLeft > 70 ? 'bg-amber-400' : 'bg-emerald-500'
              }`}
            />
          </div>
          <span className="text-[9px] font-mono text-slate-400">L</span>

          {/* R Channel */}
          <div className="w-20 sm:w-28 h-2 bg-slate-900 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${vuRight}%` }}
              className={`h-full transition-all duration-75 ${
                vuRight > 85 ? 'bg-red-500' : vuRight > 70 ? 'bg-amber-400' : 'bg-emerald-500'
              }`}
            />
          </div>
          <span className="text-[9px] font-mono text-slate-400">R</span>
        </div>
      </div>

      {/* ========================================================
          MULTI-TRACK TIMELINE (Final Cut Pro Magnetic / Premiere Pro Tracks)
         ======================================================== */}
      <div className="bg-[#101216] border-t border-slate-800 p-3 select-none">
        {/* Timeline Ruler Bar */}
        <div className="flex items-center text-[10px] font-mono text-slate-500 pl-24 pr-4 pb-1 border-b border-slate-800/80">
          <span className="w-1/4">00:00:00</span>
          <span className="w-1/4">00:00:15</span>
          <span className="w-1/4">00:00:30</span>
          <span className="w-1/4">00:00:45</span>
          <span>00:01:00</span>
        </div>

        {/* Multi-Track Container */}
        <div
          ref={timelineRef}
          onClick={handleTimelineClick}
          className="relative mt-2 space-y-1.5 cursor-pointer pb-2"
        >
          {/* RED DRAGGABLE PLAYHEAD INDICATOR */}
          <div
            style={{ left: `calc(96px + ${(currentTime / duration) * (100 - 15)}%)` }}
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-30 pointer-events-none shadow-[0_0_8px_rgba(239,68,68,0.8)]"
          >
            {/* Playhead marker cap */}
            <div className="w-3.5 h-3.5 bg-red-500 rounded-b-sm -translate-x-[5px] -top-1.5 absolute flex items-center justify-center text-[8px] text-white font-bold">
              ▼
            </div>
          </div>

          {/* VIDEO TRACK 3 (V3: Titles / VFX / Grain) */}
          <div className="flex items-center h-8">
            <div className="w-24 shrink-0 flex items-center justify-between pr-2 text-xs font-mono text-slate-400 border-r border-slate-800">
              <span className="text-indigo-400 font-bold">V3 Titles</span>
              <div className="flex gap-1">
                <Eye className="w-3 h-3 text-slate-500" />
                <Lock className="w-3 h-3 text-slate-500" />
              </div>
            </div>
            <div className="relative flex-1 h-full bg-[#181a1f] rounded-md mx-2 overflow-hidden border border-slate-800/60">
              {TIMELINE_CLIPS.filter(c => c.track === 'V3').map(clip => (
                <div
                  key={clip.id}
                  style={{ left: `${clip.startPercent}%`, width: `${clip.widthPercent}%` }}
                  className={`absolute top-0 bottom-0 ${clip.color} rounded text-[10px] font-mono px-2 flex items-center justify-between text-white border border-white/20 shadow-sm truncate`}
                >
                  <span className="truncate">{clip.name}</span>
                  <span className="text-[8px] opacity-75 hidden sm:inline">{clip.timecode}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VIDEO TRACK 2 (V2: A-Cam 8K Dialogue & Hero Shots) */}
          <div className="flex items-center h-9">
            <div className="w-24 shrink-0 flex items-center justify-between pr-2 text-xs font-mono text-slate-400 border-r border-slate-800">
              <span className="text-cyan-400 font-bold">V2 A-Cam</span>
              <div className="flex gap-1">
                <Eye className="w-3 h-3 text-cyan-400" />
                <Lock className="w-3 h-3 text-slate-500" />
              </div>
            </div>
            <div className="relative flex-1 h-full bg-[#181a1f] rounded-md mx-2 overflow-hidden border border-slate-800/60">
              {TIMELINE_CLIPS.filter(c => c.track === 'V2').map(clip => (
                <div
                  key={clip.id}
                  style={{ left: `${clip.startPercent}%`, width: `${clip.widthPercent}%` }}
                  className={`absolute top-0 bottom-0 ${clip.color} rounded text-[10px] font-mono px-2 flex items-center justify-between text-white border border-white/30 shadow-md truncate hover:brightness-110`}
                >
                  <span className="truncate font-semibold">{clip.name}</span>
                  <span className="text-[8px] bg-black/40 px-1 py-0.5 rounded text-cyan-200 hidden sm:inline">
                    {clip.source}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* VIDEO TRACK 1 (V1: B-Roll & Aerial Anamorphic) */}
          <div className="flex items-center h-8">
            <div className="w-24 shrink-0 flex items-center justify-between pr-2 text-xs font-mono text-slate-400 border-r border-slate-800">
              <span className="text-teal-400 font-bold">V1 B-Roll</span>
              <div className="flex gap-1">
                <Eye className="w-3 h-3 text-slate-500" />
                <Lock className="w-3 h-3 text-slate-500" />
              </div>
            </div>
            <div className="relative flex-1 h-full bg-[#181a1f] rounded-md mx-2 overflow-hidden border border-slate-800/60">
              {TIMELINE_CLIPS.filter(c => c.track === 'V1').map(clip => (
                <div
                  key={clip.id}
                  style={{ left: `${clip.startPercent}%`, width: `${clip.widthPercent}%` }}
                  className={`absolute top-0 bottom-0 ${clip.color} rounded text-[10px] font-mono px-2 flex items-center text-white border border-white/20 shadow-sm truncate`}
                >
                  <span className="truncate">{clip.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AUDIO DIVIDER */}
          <div className="border-t border-slate-800 my-1 mx-2"></div>

          {/* AUDIO TRACK 1 (A1: SFX & Riser Transitions) */}
          <div className="flex items-center h-7">
            <div className="w-24 shrink-0 flex items-center justify-between pr-2 text-xs font-mono text-slate-400 border-r border-slate-800">
              <span className="text-amber-400 font-bold">A1 SFX</span>
              <span className="text-[9px] text-slate-500">M / S</span>
            </div>
            <div className="relative flex-1 h-full bg-[#14161a] rounded-md mx-2 overflow-hidden border border-slate-800/40">
              {TIMELINE_CLIPS.filter(c => c.track === 'A1').map(clip => (
                <div
                  key={clip.id}
                  style={{ left: `${clip.startPercent}%`, width: `${clip.widthPercent}%` }}
                  className={`absolute top-0 bottom-0 ${clip.color} rounded text-[9px] font-mono px-2 flex items-center text-white truncate border border-white/20`}
                >
                  <span className="truncate">{clip.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AUDIO TRACK 2 (A2: Foley & Room Ambience) */}
          <div className="flex items-center h-7">
            <div className="w-24 shrink-0 flex items-center justify-between pr-2 text-xs font-mono text-slate-400 border-r border-slate-800">
              <span className="text-emerald-400 font-bold">A2 Foley</span>
              <span className="text-[9px] text-slate-500">M / S</span>
            </div>
            <div className="relative flex-1 h-full bg-[#14161a] rounded-md mx-2 overflow-hidden border border-slate-800/40">
              {TIMELINE_CLIPS.filter(c => c.track === 'A2').map(clip => (
                <div
                  key={clip.id}
                  style={{ left: `${clip.startPercent}%`, width: `${clip.widthPercent}%` }}
                  className={`absolute top-0 bottom-0 ${clip.color} rounded text-[9px] font-mono px-2 flex items-center text-white truncate border border-white/20`}
                >
                  <span className="truncate">{clip.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AUDIO TRACK 3 (A3: Master Cinematic Score with Simulated Waveform) */}
          <div className="flex items-center h-8">
            <div className="w-24 shrink-0 flex items-center justify-between pr-2 text-xs font-mono text-slate-400 border-r border-slate-800">
              <span className="text-purple-400 font-bold">A3 Score</span>
              <span className="text-[9px] text-purple-300 font-bold">STEREO</span>
            </div>
            <div className="relative flex-1 h-full bg-[#14161a] rounded-md mx-2 overflow-hidden border border-slate-800/40">
              {TIMELINE_CLIPS.filter(c => c.track === 'A3').map(clip => (
                <div
                  key={clip.id}
                  style={{ left: `${clip.startPercent}%`, width: `${clip.widthPercent}%` }}
                  className={`absolute top-0 bottom-0 ${clip.color} rounded text-[9px] font-mono px-2 flex items-center justify-between text-white border border-white/20`}
                >
                  <span className="truncate">{clip.name}</span>
                  {/* Visual Waveform SVG */}
                  <svg className="w-32 h-4 opacity-50 hidden sm:block" viewBox="0 0 100 20">
                    <path
                      d="M0,10 Q10,2 20,10 T40,10 T60,18 T80,4 T100,10"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Shot EXIF / Metadata Readout Footer */}
        <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2 px-1">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-bold">SENSOR: {selectedProject.techSpecs.sensor}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-300">CODEC: {selectedProject.techSpecs.codec}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-300">COLOR: {selectedProject.techSpecs.colorSpace}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-slate-800 px-2 py-0.5 rounded text-amber-300">
              {selectedProject.techSpecs.iso}
            </span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-300">
              180.0° SHUTTER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
