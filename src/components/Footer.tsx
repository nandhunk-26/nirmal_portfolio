import React, { useState, useEffect } from 'react';
import { DIRECTOR_PROFILE } from '../data/portfolioData';
import { Film, Heart, Sparkles, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [timeLA, setTimeLA] = useState('');
  const [timeTokyo, setTimeTokyo] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimeLA(now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setTimeTokyo(now.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0d0e12] text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* World Clocks & Studio Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-[#14161c] border border-slate-800/80">
          <div>
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">
              LOS ANGELES STUDIO TIME
            </span>
            <span className="text-xl font-mono font-bold text-white mt-1 block">
              {timeLA || '12:00:00 PM'} PST
            </span>
            <span className="text-[11px] text-slate-500">Pacific Daylight Time (UTC-7)</span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
              TOKYO POST PRODUCTION LAB
            </span>
            <span className="text-xl font-mono font-bold text-white mt-1 block">
              {timeTokyo || '04:00:00 AM'} JST
            </span>
            <span className="text-[11px] text-slate-500">Japan Standard Time (UTC+9)</span>
          </div>

          <div className="flex flex-col justify-between">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              PRODUCTION AVAILABILITY
            </span>
            <span className="text-sm font-bold text-white mt-1 block flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Accepting Commercial & Narrative Bookings
            </span>
            <span className="text-[11px] text-slate-500">Quarter: {DIRECTOR_PROFILE.nextAvailableQuarter}</span>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white text-slate-900 flex items-center justify-center font-bold text-xs">
              KV
            </div>
            <div>
              <p className="text-slate-200 font-bold">
                {DIRECTOR_PROFILE.name} © 2026
              </p>
              <p className="text-[11px] text-slate-500">
                All films & cinematographic footage protected under global copyright.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-slate-500">
              Simulating Adobe & Final Cut Pro NLE Suite
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors shadow-sm"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
