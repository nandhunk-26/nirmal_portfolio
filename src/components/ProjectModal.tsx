import React, { useEffect } from 'react';
import { soundFx } from '../utils/audioEffects';
import { Project } from '../types';
import {
  X,
  Play,
  Film,
  Camera,
  Layers,
  Award,
  Sparkles,
  Sliders,
  Maximize2
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onLoadInNle: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onLoadInNle }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#14161b] text-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 my-8">
        {/* Modal Close Button */}
        <button
          onClick={() => {
            soundFx.playKeycapClick('low');
            onClose();
          }}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-lg transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Header */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          <video
            src={project.videoUrl}
            poster={project.thumbnail}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Film Aspect Ratio Mask overlay */}
          <div className="absolute top-3 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 pointer-events-none">
            <Film className="w-3.5 h-3.5 text-cyan-400" />
            {project.aspectRatio} CINEMASCOPE • {project.duration}
          </div>
        </div>

        {/* Modal Body Info */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Top Title & Metadata */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold">
                  {project.category} • {project.year}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-300 font-mono">
                  Client: {project.client}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
                {project.title}
              </h2>
              <p className="text-sm font-mono text-emerald-400 mt-1">
                Role: {project.role}
              </p>
            </div>

            {/* Load in NLE Button */}
            <button
              onClick={() => {
                soundFx.playKeycapClick('high');
                onLoadInNle(project);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <Sliders className="w-4 h-4" />
              <span>Load in NLE Color Suite</span>
            </button>
          </div>

          {/* Awards laurels if available */}
          {project.awards && project.awards.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.awards.map((award, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{award}</span>
                </div>
              ))}
            </div>
          )}

          {/* Description & BTS Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                SYNOPSIS & ARTISTIC INTENT
              </h4>
              <p className="leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
                BEHIND THE SCENES / PRODUCTION NOTES
              </h4>
              <p className="leading-relaxed text-slate-400">
                {project.btsStory}
              </p>
            </div>
          </div>

          {/* Color Palette Swatches */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
              ACES COLOR GRADE PALETTE (EXTRACTED SWATCHES)
            </h4>
            <div className="flex items-center gap-2">
              {project.colorPalette.map((hex, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full h-8 rounded-lg shadow-md border border-white/10"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="text-[10px] font-mono text-slate-500 mt-1 uppercase">
                    {hex}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Camera & Optics Specs Grid */}
          <div className="p-4 rounded-2xl bg-[#0c0d10] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase">
              <Camera className="w-4 h-4" />
              <span>CINEMATOGRAPHY TECHNICAL SPECIFICATIONS</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">CAMERA BODY:</span>
                <span className="text-white font-semibold">{project.camera}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">OPTICS / LENSES:</span>
                <span className="text-white font-semibold">{project.lens}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">RECORDING CODEC:</span>
                <span className="text-cyan-300 font-semibold">{project.techSpecs.codec}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">NATIVE SENSOR:</span>
                <span className="text-white">{project.techSpecs.sensor}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">CAPTURE FPS:</span>
                <span className="text-amber-300">{project.techSpecs.fps}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">COLOR SPACE PIPELINE:</span>
                <span className="text-emerald-300">{project.techSpecs.colorSpace}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
