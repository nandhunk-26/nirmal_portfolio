import React, { useState } from 'react';
import { soundFx } from '../utils/audioEffects';
import { LanyardBadge } from './LanyardBadge';
import {
  DIRECTOR_PROFILE,
  CAREER_MILESTONES,
  EDUCATION_MILESTONES,
  SOFTWARE_TOOLS
} from '../data/portfolioData';
import { SoftwareTool } from '../types';
import {
  Mail,
  MapPin,
  Globe,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  CheckCircle,
  Video,
  Layers,
  Sliders,
  Tv
} from 'lucide-react';

export const MainPortfolioCard: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedTool, setSelectedTool] = useState<SoftwareTool | null>(SOFTWARE_TOOLS[0]);

  const handleCopyEmail = () => {
    soundFx.playKeycapClick('high');
    navigator.clipboard.writeText(DIRECTOR_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-8">
      {/* Outer Dotted Grid Card matching reference image */}
      <div className="relative rounded-[2.5rem] bg-white border-2 border-slate-100 shadow-xl p-6 sm:p-10 md:p-12 overflow-hidden bg-dot-pattern">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-100/50 via-cyan-50/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {/* 2-Column Grid: Left Content / Right Floating Lanyard Pass */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ========================================================
              LEFT COLUMN: Behind the Visuals & Connect & Timelines
             ======================================================== */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Behind the Visuals Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
                  Behind the Visuals
                </h3>
              </div>

              <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  Hi, I'm <strong className="text-slate-900 font-semibold">{DIRECTOR_PROFILE.name}</strong>, a Director of Photography & Senior Colorist with over 8 years of freelance and studio production experience, focused on cinematic storytelling, light shaping, and dynamic camera choreography.
                </p>
                <p>
                  Former lead DP at an international boutique commercial studio, contributing to global brand campaigns, Sundance narrative shorts, and high-speed motion projects. I blend visceral analog texture with rigorous digital color science (ACES / Rec.709) to craft visuals that provoke emotion, tension, and lingering memory.
                </p>
              </div>
            </div>

            {/* 2. Let's Connect Section */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xl font-bold font-display text-slate-900">
                Let's Connect
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {/* Email Pill with Copy Button */}
                <div
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 cursor-pointer transition-all duration-150 group"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="font-mono text-xs text-slate-800 font-medium truncate">
                      {DIRECTOR_PROFILE.email}
                    </span>
                  </div>
                  <button className="text-slate-400 group-hover:text-slate-700 shrink-0 ml-1">
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location Pill */}
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-mono text-slate-800">
                  <MapPin className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span className="truncate">{DIRECTOR_PROFILE.basedIn}</span>
                </div>

                {/* Instagram */}
                <a
                  href={`https://instagram.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all text-xs font-mono text-slate-800 group"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-pink-600 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>{DIRECTOR_PROFILE.instagram}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://linkedin.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all text-xs font-mono text-slate-800 group"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>{DIRECTOR_PROFILE.linkedin}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
                </a>
              </div>
            </div>

            {/* 3. Creative Education & Career Overview (Dual Timelines) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
              {/* Creative Education */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold font-display text-slate-900">
                  Creative Education
                </h4>
                <div className="space-y-4">
                  {EDUCATION_MILESTONES.map((edu, idx) => (
                    <div key={idx} className="relative pl-4 border-l-2 border-purple-200 space-y-1">
                      <div className="w-2 h-2 rounded-full bg-purple-600 absolute -left-[5px] top-1"></div>
                      <span className="text-[11px] font-mono font-bold text-purple-600">
                        {edu.year}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900">
                        {edu.degree}
                      </h5>
                      <p className="text-[11px] text-slate-500">
                        {edu.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Overview */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold font-display text-slate-900">
                  Career Milestones
                </h4>
                <div className="space-y-4">
                  {CAREER_MILESTONES.slice(0, 3).map((job, idx) => (
                    <div key={idx} className="relative pl-4 border-l-2 border-cyan-200 space-y-1">
                      <div className="w-2 h-2 rounded-full bg-cyan-600 absolute -left-[5px] top-1"></div>
                      <span className="text-[11px] font-mono font-bold text-cyan-600">
                        {job.year}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900">
                        {job.role}
                      </h5>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {job.organization}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Creative Toolkit Section (3D App Icons like Reference Image) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold font-display text-slate-900">
                  Creative Toolkit & NLE Suite
                </h4>
                <span className="text-[11px] font-mono text-slate-400">
                  Click app to inspect
                </span>
              </div>

              {/* App Icon Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {SOFTWARE_TOOLS.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      soundFx.playKeycapClick('high');
                      setSelectedTool(tool);
                    }}
                    className={`flex flex-col items-center p-3 rounded-2xl border transition-all duration-200 group ${
                      selectedTool?.id === tool.id
                        ? 'bg-slate-900 text-white shadow-xl scale-105 border-slate-800'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700 shadow-sm'
                    }`}
                  >
                    {/* Skeuomorphic 3D App Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.iconBg} flex items-center justify-center text-white font-extrabold text-base shadow-md border border-white/20 group-hover:scale-105 transition-transform`}
                      style={{ color: tool.accentColor }}
                    >
                      {tool.acronym}
                    </div>
                    <span className="text-[11px] font-bold font-mono mt-2 truncate w-full text-center">
                      {tool.acronym}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">
                      {tool.mastery}%
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Tool Inspector Card */}
              {selectedTool && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-display">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: selectedTool.accentColor }}
                      />
                      {selectedTool.name} — {selectedTool.yearsExp} Years Experience
                    </span>
                    <span className="text-[10px] font-mono bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">
                      Mastery: {selectedTool.mastery}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {selectedTool.roleInWorkflow}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedTool.topFeatures.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Capabilities / Specializations List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-base font-bold font-display text-slate-900">
                Core Capabilities & Focus
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                {[
                  'Anamorphic & VistaVision Cinematography',
                  'ACES Color Pipeline & 35mm LUT Craft',
                  'High-Speed Phantom 1000fps Operation',
                  'LiDAR & 4-Axis Gimbal Choreography',
                  'Heavy-Lift Cinelifter FPV Drone',
                  'Commercial Pacing & Sound Design Mix'
                ].map((cap, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: THE FLOATING 3D VIP LANYARD PASS (From Reference!)
             ======================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center lg:sticky lg:top-24 pt-6 lg:pt-0">
            {/* Lanyard Badge Component */}
            <LanyardBadge
              name={DIRECTOR_PROFILE.name}
              title={DIRECTOR_PROFILE.title}
            />

            {/* Hint Under Badge */}
            <p className="text-[11px] font-mono text-slate-400 mt-4 text-center max-w-xs">
              ✦ Move cursor to tilt 3D VIP credential pass. Click card to inspect Stage-A security clearance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
