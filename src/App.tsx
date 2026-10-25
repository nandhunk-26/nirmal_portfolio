import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MainPortfolioCard } from './components/MainPortfolioCard';
import { NleStudioSimulator } from './components/NleStudioSimulator';
import { ProjectShowcase } from './components/ProjectShowcase';
import { GearLocker } from './components/GearLocker';
import { RateEstimatorModal } from './components/RateEstimatorModal';
import { FloatingHireBar } from './components/FloatingHireBar';
import { Footer } from './components/Footer';
import { soundFx } from './utils/audioEffects';
import { Project } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState<boolean>(false);

  const nleSectionRef = useRef<HTMLDivElement>(null);

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleToggleMute = () => {
    soundFx.isMuted = !soundFx.isMuted;
    setIsMuted(soundFx.isMuted);
    if (!soundFx.isMuted) {
      soundFx.playKeycapClick('high');
    }
  };

  const scrollToNle = () => {
    nleSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleLoadInNle = (project: Project) => {
    scrollToNle();
  };

  // Sync dark class on documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-[#0b0c0e] text-slate-100 antialiased selection:bg-purple-600 selection:text-white';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-[#f8f9fa] text-slate-900 antialiased selection:bg-purple-600 selection:text-white';
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-[#0b0c0e] text-slate-100' : 'bg-[#f8f9fa] text-slate-900'}`}>
      {/* Top Sticky Header */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onScrollToNle={scrollToNle}
      />

      <main className="space-y-6 pb-20">
        {/* 1. Hero Section with Stylized Typography & 3D Claymorphic Card */}
        <HeroSection
          onOpenNle={scrollToNle}
          onOpenEstimator={() => setIsEstimatorOpen(true)}
        />

        {/* 2. Main Portfolio Card (Behind Visuals, Connect, Timelines, 3D App Toolkit & Floating 3D Lanyard Pass) */}
        <MainPortfolioCard />

        {/* 3. Adobe Premiere & Final Cut Pro Interactive NLE Video Suite Simulator */}
        <section
          ref={nleSectionRef}
          id="nle-simulator"
          className="w-full max-w-6xl mx-auto px-4 py-8 scroll-mt-20"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  REAL-TIME WORKSPACE SIMULATOR
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-slate-900 dark:text-white">
                Premiere & Final Cut Pro Suite
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Interactive multi-track timeline, ACES Lumetri color grading engine, Log split-slider, and frame-accurate SMPTE playback.
              </p>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-mono bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
              Shortcuts: Space (Play) • J/K/L (Scrub) • C (Blade)
            </span>
          </div>

          <NleStudioSimulator />
        </section>

        {/* 4. Curated Filmography & Project Showcase Gallery */}
        <ProjectShowcase
          onLoadInNle={handleLoadInNle}
        />

        {/* 5. Production Equipment Gear Locker */}
        <GearLocker />
      </main>

      {/* Floating Bottom Hire Bar Dock */}
      <FloatingHireBar
        onOpenEstimator={() => setIsEstimatorOpen(true)}
      />

      {/* Interactive Rate & Production Budget Estimator Modal */}
      <RateEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
      />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
