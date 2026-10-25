import React from 'react';
import { soundFx } from '../utils/audioEffects';
import { Sparkles, Play, ArrowDownRight, Film, Video, Award, Camera } from 'lucide-react';
import { DIRECTOR_PROFILE } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenNle: () => void;
  onOpenEstimator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenNle, onOpenEstimator }) => {
  return (
    <section className="relative pt-6 pb-12 w-full max-w-6xl mx-auto px-4">
      {/* ========================================================
          BIG STYLIZED TYPOGRAPHY HEADER (Like Reference Image: Port[===]lio)
         ======================================================== */}
      <div className="flex items-center justify-between pb-6 select-none">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black font-display tracking-tight text-slate-900 flex items-center leading-none">
          <span>Port</span>
          {/* Elongated Capsule 'o' from Reference Image */}
          <span className="relative inline-flex items-center justify-center mx-1 sm:mx-2 w-16 sm:w-28 md:w-36 h-10 sm:h-16 md:h-20 rounded-full border-[7px] sm:border-[12px] md:border-[16px] border-slate-900 bg-[#f8f9fa] overflow-hidden group">
            <span className="w-full h-full bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 group-hover:opacity-100 transition-opacity"></span>
          </span>
          <span>lio</span>
        </h1>

        {/* Japanese Sub-title & Availability Tag */}
        <div className="hidden lg:flex flex-col items-end text-right">
          <span className="text-xs font-mono font-bold tracking-widest text-purple-600 uppercase">
            シネマトグラファー • 2026
          </span>
          <span className="text-sm font-display font-extrabold text-slate-700">
            {DIRECTOR_PROFILE.japaneseTitle}
          </span>
          <span className="text-[11px] font-mono text-slate-500 mt-0.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {DIRECTOR_PROFILE.basedIn}
          </span>
        </div>
      </div>

      {/* ========================================================
          TOP 3D HERO CARD (Matches the 3D Illustration Card in Reference)
         ======================================================== */}
      <div className="relative w-full rounded-[2.5rem] bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#ffffff] border-4 border-white shadow-2xl p-6 sm:p-10 md:p-12 overflow-hidden">
        {/* Claymorphic Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-300/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-300/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Message & Direct Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Creator Badge Pill from Reference Image */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-slate-200/80">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                KV
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black font-display text-slate-900 tracking-tight">
                  {DIRECTOR_PROFILE.name}
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  {DIRECTOR_PROFILE.title}
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900 tracking-tight leading-[1.1]">
                Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600">Cinematic Emotion</span> Through Light & Time.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed">
                Specializing in anamorphic narrative films, global luxury commercials, and ACES color grading. Simulating a full digital suite powered by Adobe & Final Cut Pro workflows.
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Launch NLE Simulator Button */}
              <button
                onClick={() => {
                  soundFx.playKeycapClick('high');
                  onOpenNle();
                }}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2.5 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
                </div>
                <span>Launch NLE Video Simulator</span>
              </button>

              {/* Instant Production Quote Button */}
              <button
                onClick={() => {
                  soundFx.playKeycapClick('high');
                  onOpenEstimator();
                }}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm flex items-center gap-2 shadow-md hover:shadow-lg border border-slate-200/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Calculate Production Rate</span>
                <ArrowDownRight className="w-4 h-4 text-purple-600" />
              </button>
            </div>

            {/* Mini Stat Trophies */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200/70">
              {DIRECTOR_PROFILE.stats.map(stat => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-black font-display text-slate-900">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Graphic & Interactive 3D Objects */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* 3D Composition Container */}
            <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
              {/* Back Soft Blob Shape from Reference Image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 via-rose-400 to-orange-500 rounded-[3rem] rotate-6 shadow-2xl opacity-90 transition-transform duration-500 hover:rotate-3"></div>

              {/* Secondary Layer Blob */}
              <div className="absolute inset-3 bg-gradient-to-bl from-cyan-400 via-blue-500 to-indigo-600 rounded-[2.5rem] -rotate-3 shadow-xl opacity-95 transition-transform duration-500 hover:-rotate-1"></div>

              {/* Main 3D Card Face with Camera Aperture & Lens Glare */}
              <div className="relative z-10 w-[90%] h-[90%] bg-slate-900 rounded-[2rem] p-6 shadow-2xl border-4 border-white/20 flex flex-col justify-between overflow-hidden">
                {/* Cinema Lens Ring Reflection */}
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full border-[16px] border-cyan-400/20 blur-sm pointer-events-none"></div>

                {/* Top Badge: 2026 with Smiley from Reference Image */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-lg font-black font-display text-white tracking-wider">
                      2026<sup className="text-xs font-mono text-cyan-300">b</sup>
                    </span>
                  </div>

                  {/* Tactile Smiley Face from Reference Image */}
                  <div className="w-9 h-9 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center text-lg font-bold shadow-lg hover:rotate-12 transition-transform cursor-pointer">
                    ☻
                  </div>
                </div>

                {/* Center Visual: Anamorphic Cinema Lens Flare Simulation */}
                <div className="my-auto text-center space-y-2">
                  <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-1 shadow-inner">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center border-2 border-cyan-400/50">
                      <Camera className="w-10 h-10 text-cyan-300 animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-cyan-300 block uppercase">
                      COOKE ANAMORPHIC /i FF+
                    </span>
                    <span className="text-xs font-bold text-white/90">
                      8K Full Frame VistaVision
                    </span>
                  </div>
                </div>

                {/* Bottom Interactive Mechanical Keycaps (Inspired by reference image!) */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    CLICK SWITCHES:
                  </span>
                  {/* Clickable mechanical keycaps */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => soundFx.playKeycapClick('high')}
                      title="Mechanical Switch (High Click)"
                      className="w-8 h-8 rounded-lg bg-gradient-to-b from-rose-500 to-red-700 text-white font-mono text-xs font-bold shadow-md hover:brightness-110 active:translate-y-0.5 border-t border-rose-300"
                    >
                      REC
                    </button>
                    <button
                      onClick={() => soundFx.playKeycapClick('low')}
                      title="Mechanical Switch (Low Click)"
                      className="w-8 h-8 rounded-lg bg-gradient-to-b from-slate-700 to-slate-950 text-white font-mono text-xs font-bold shadow-md hover:brightness-110 active:translate-y-0.5 border-t border-slate-600"
                    >
                      CUT
                    </button>
                    <button
                      onClick={() => soundFx.playShutterClick()}
                      title="Mechanical Shutter Snap"
                      className="w-8 h-8 rounded-lg bg-gradient-to-b from-amber-400 to-amber-600 text-slate-900 font-mono text-xs font-bold shadow-md hover:brightness-110 active:translate-y-0.5 border-t border-amber-200"
                    >
                      SNAP
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Curled Yellow Tape from Reference Image */}
              <div className="absolute -bottom-4 -left-6 w-24 h-7 bg-[#facc15] text-slate-900 font-mono font-bold text-[9px] flex items-center justify-center -rotate-12 shadow-lg rounded-sm border border-amber-400 select-none">
                CAM A • ROLL 04
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
