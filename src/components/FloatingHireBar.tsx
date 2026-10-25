import React, { useState } from 'react';
import { soundFx } from '../utils/audioEffects';
import { Sparkles, X, ChevronUp } from 'lucide-react';
import { DIRECTOR_PROFILE } from '../data/portfolioData';

interface FloatingHireBarProps {
  onOpenEstimator: () => void;
}

export const FloatingHireBar: React.FC<FloatingHireBarProps> = ({ onOpenEstimator }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 select-none animate-bounce-subtle">
      <div className="flex items-center gap-3 bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-md text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-2xl border border-white/20 transition-all hover:scale-105 group">
        {/* Creator Avatar with Pulsing Green Indicator */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white/40 shadow-sm shrink-0">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt={DIRECTOR_PROFILE.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-ping"></span>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
        </div>

        {/* Text like in Reference Image: "Muh. is available for hire" */}
        <div className="flex flex-col">
          <span className="text-xs font-bold font-display text-white tracking-wide">
            {DIRECTOR_PROFILE.name.split(' ')[0]} is available for hire
          </span>
          <span className="text-[10px] font-mono text-emerald-300">
            Worldwide Bookings • 2026
          </span>
        </div>

        {/* Action Button: "Hire Muh." like in Reference */}
        <button
          onClick={() => {
            soundFx.playKeycapClick('high');
            onOpenEstimator();
          }}
          className="ml-1 sm:ml-2 px-3 sm:px-4 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3 text-purple-600" />
          <span>Hire {DIRECTOR_PROFILE.name.split(' ')[0]}</span>
        </button>

        {/* Dismiss Button */}
        <button
          onClick={() => {
            soundFx.playKeycapClick('low');
            setIsDismissed(true);
          }}
          title="Dismiss Bar"
          className="text-slate-400 hover:text-white p-1 rounded-full"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
