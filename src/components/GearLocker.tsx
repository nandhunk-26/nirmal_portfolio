import React, { useState } from 'react';
import { soundFx } from '../utils/audioEffects';
import { GEAR_LOCKER } from '../data/portfolioData';
import { GearItem } from '../types';
import { Camera, Aperture, Wind, Sun, Headphones, CheckCircle2 } from 'lucide-react';

export const GearLocker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', 'Camera', 'Optics', 'Grip & Drone', 'Lighting'];

  const filteredGear = activeTab === 'All'
    ? GEAR_LOCKER
    : GEAR_LOCKER.filter(g => g.category === activeTab);

  return (
    <section id="gear" className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600">
              OWNED ARSENAL & RENTAL FLEET
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900 tracking-tight">
            The Gear Locker
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Industry-standard digital cinema packages calibrated for worldwide flight travel.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map(tab => (
            <button
              key={tab}
              onClick={() => {
                soundFx.playKeycapClick('low');
                setActiveTab(tab);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Gear Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGear.map(item => (
          <div
            key={item.id}
            className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  READY ON-SET
                </span>
              </div>

              {/* Title & Model */}
              <h3 className="text-xl font-bold font-display text-slate-900">
                {item.name}
              </h3>
              <p className="text-xs text-purple-600 font-mono font-semibold mt-0.5">
                {item.model}
              </p>

              {/* Specs description */}
              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                {item.specs}
              </p>
            </div>

            {/* Bottom tags & Highlight */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <p className="text-[11px] text-slate-500 italic">
                "{item.highlight}"
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
