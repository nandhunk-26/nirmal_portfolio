import React from 'react';
import { soundFx } from '../utils/audioEffects';
import { Volume2, VolumeX, Sun, Moon, Film, Sparkles } from 'lucide-react';
import { DIRECTOR_PROFILE } from '../data/portfolioData';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenEstimator: () => void;
  onScrollToNle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  isMuted,
  onToggleMute,
  onOpenEstimator,
  onScrollToNle
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-black font-display text-sm shadow-md">
            KV
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold font-display text-sm tracking-tight text-slate-900 dark:text-white leading-tight">
              KAIZEN VANE
            </span>
            <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-semibold tracking-wider">
              DIRECTOR OF PHOTOGRAPHY
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <button
            onClick={() => {
              soundFx.playKeycapClick('low');
              onScrollToNle();
            }}
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
          >
            <Film className="w-3.5 h-3.5 text-cyan-500" />
            <span>NLE Suite Simulator</span>
          </button>
          <a
            href="#work"
            onClick={() => soundFx.playKeycapClick('low')}
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Selected Works
          </a>
          <a
            href="#gear"
            onClick={() => soundFx.playKeycapClick('low')}
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            The Gear Locker
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Mute Audio SFX Toggle */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-purple-600" />}
          </button>

          {/* Dark / Light Mode Switcher */}
          <button
            onClick={() => {
              soundFx.playKeycapClick('high');
              onToggleDarkMode();
            }}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Book / Hire Button */}
          <button
            onClick={() => {
              soundFx.playKeycapClick('high');
              onOpenEstimator();
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Book Production</span>
          </button>
        </div>
      </div>
    </header>
  );
};
