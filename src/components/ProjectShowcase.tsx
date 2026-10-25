import React, { useState } from 'react';
import { soundFx } from '../utils/audioEffects';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { Play, Film, Award, Camera, Sliders, ChevronRight } from 'lucide-react';

interface ProjectShowcaseProps {
  onLoadInNle: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onLoadInNle }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ['All', 'Commercial', 'Music Video', 'Documentary', 'Narrative', 'FPV Drone'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const handleOpenModal = (project: Project) => {
    soundFx.playKeycapClick('high');
    setActiveProjectModal(project);
  };

  return (
    <section id="work" className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600">
              CURATED FILMOGRAPHY & COMMERCIAL WORK
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900 tracking-tight">
            Selected Works
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playKeycapClick('low');
                setActiveCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            onClick={() => handleOpenModal(project)}
            className="group relative rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Thumbnail with Aspect Ratio Box */}
            <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-105"
              />

              {/* Hover Dark Overlay with Play Icon */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-6 h-6 fill-slate-900 translate-x-0.5" />
                </div>
              </div>

              {/* Aspect Ratio & Runtime Badge */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-white flex items-center gap-1.5">
                <Film className="w-3 h-3 text-cyan-400" />
                <span>{project.aspectRatio} • {project.duration}</span>
              </div>

              {/* Laurel / Award Badge if exists */}
              {project.awards && project.awards.length > 0 && (
                <div className="absolute top-3 right-3 bg-amber-500/90 text-slate-950 px-2 py-0.5 rounded-full text-[9px] font-mono font-black flex items-center gap-1 shadow-md">
                  <Award className="w-3 h-3" />
                  <span>LAURELS</span>
                </div>
              )}
            </div>

            {/* Card Content Footer */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1">
                  <span className="text-purple-600 font-bold uppercase">{project.category}</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="text-xl font-extrabold font-display text-slate-900 group-hover:text-purple-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Client: {project.client}
                </p>
              </div>

              {/* Tech Gear pill & Load in NLE CTA */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600">
                  <Camera className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-[150px]">{project.camera.split(' ')[0]} {project.camera.split(' ')[1]}</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                  <span>Watch BTS</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Cinema Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        onLoadInNle={onLoadInNle}
      />
    </section>
  );
};
