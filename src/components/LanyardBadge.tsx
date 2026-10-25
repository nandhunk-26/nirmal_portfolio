import React, { useState, useRef } from 'react';
import { soundFx } from '../utils/audioEffects';
import { Award, QrCode, Sparkles, Film, CheckCircle2 } from 'lucide-react';

interface LanyardBadgeProps {
  name?: string;
  title?: string;
}

export const LanyardBadge: React.FC<LanyardBadgeProps> = ({
  name = 'KAIZEN VANE',
  title = 'Director of Photography & Lead Colorist'
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate tilt
    const rX = -((y - centerY) / centerY) * 16;
    const rY = ((x - centerX) / centerX) * 16;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const toggleFlip = () => {
    soundFx.playKeycapClick('high');
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative select-none flex flex-col items-center">
      {/* Lanyard Strap Ribbon (Curving down naturally from the top) */}
      <div className="relative w-48 h-28 pointer-events-none flex justify-center -mb-8 z-10">
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full overflow-visible drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Lanyard Loop left */}
          <path
            d="M 50,-30 C 50,40 85,90 97,112"
            stroke="#6366f1"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Lanyard Loop right */}
          <path
            d="M 150,-30 C 150,40 115,90 103,112"
            stroke="#4f46e5"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Text on lanyard ribbon */}
          <text
            x="35"
            y="25"
            fill="#ffffff"
            fontSize="7"
            fontWeight="bold"
            letterSpacing="2"
            transform="rotate(60, 45, 25)"
          >
            VIP FILMMAKER •
          </text>
          <text
            x="115"
            y="40"
            fill="#ffffff"
            fontSize="7"
            fontWeight="bold"
            letterSpacing="2"
            transform="rotate(-58, 125, 40)"
          >
            ALL-ACCESS CREW •
          </text>
        </svg>

        {/* Metallic Clasp & Swivel Hook */}
        <div className="absolute bottom-2 flex flex-col items-center">
          <div className="w-8 h-4 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-500 rounded-sm shadow-md border border-slate-300"></div>
          <div className="w-3 h-4 border-2 border-slate-400 rounded-b-full -mt-0.5"></div>
        </div>
      </div>

      {/* 3D Interactive Badge Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={toggleFlip}
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        className="cursor-pointer group relative w-72 h-[410px] transition-transform duration-200 ease-out"
      >
        <div
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
          className="w-full h-full relative rounded-2xl shadow-2xl"
        >
          {/* FRONT FACE: VIP Credential Card */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#ff5742] via-[#f43f5e] to-[#e11d48] text-white rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl border-4 border-white/20"
          >
            {/* Holographic Specular Sheen layer */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
              style={{
                transform: `translateX(${(rotateY / 16) * 100}%) translateY(${(-rotateX / 16) * 100}%)`,
                transition: 'transform 0.1s ease-out'
              }}
            />

            {/* Top Pass Category & Slot Hole */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                  VIP FESTIVAL PASS
                </span>
                <span className="text-[11px] font-mono font-bold text-white/80">#2026-DP</span>
              </div>
              {/* Lanyard Hole Clip Cutout */}
              <div className="w-10 h-2 bg-slate-900/60 rounded-full mx-auto shadow-inner"></div>
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
            </div>

            {/* Creator Photo Frame */}
            <div className="relative z-10 flex flex-col items-center mt-3">
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-900 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  alt={name}
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end justify-center pb-2">
                  <span className="text-[9px] font-mono tracking-widest text-emerald-300 uppercase flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    ACTIVE ON-SET
                  </span>
                </div>
              </div>
            </div>

            {/* Name & Title */}
            <div className="relative z-10 text-center mt-1">
              <h3 className="text-xl font-extrabold tracking-tight font-display text-white drop-shadow-sm">
                {name}
              </h3>
              <p className="text-xs text-white/90 font-medium tracking-wide mt-0.5">
                {title}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded text-white/90 font-mono">
                  DIRECTOR / DP
                </span>
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded text-white/90 font-mono">
                  ACES CERTIFIED
                </span>
              </div>
            </div>

            {/* Barcode & Flip Hint Footer */}
            <div className="relative z-10 pt-3 border-t border-white/20 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-white/70 tracking-widest">
                  ACCESS: ALL ZONES
                </span>
                <span className="text-[8px] text-white/60">CLICK TO FLIP PASS ➔</span>
              </div>
              <div className="bg-white p-1 rounded-md shadow-sm">
                <QrCode className="w-7 h-7 text-slate-900" />
              </div>
            </div>
          </div>

          {/* BACK FACE: Technical Credentials & Security Clearance */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="absolute inset-0 w-full h-full bg-slate-900 text-slate-100 rounded-2xl p-6 flex flex-col justify-between border-4 border-slate-700 shadow-2xl"
          >
            {/* Lanyard Hole cutout */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                STAGE-A ACCESS CLEARANCE
              </span>
              <div className="w-10 h-2 bg-black/70 rounded-full shadow-inner"></div>
              <Film className="w-4 h-4 text-purple-400" />
            </div>

            <div className="space-y-3 mt-2">
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">AUTHORITY LEVEL</p>
                <p className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Lead Cinematographer / Master DP
                </p>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800 font-mono text-[11px]">
                  <span className="text-slate-400">Authorized Rig:</span>
                  <span className="text-amber-300 font-semibold">RED 8K / ARRI LF</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 font-mono text-[11px]">
                  <span className="text-slate-400">Drone Pilot Reg:</span>
                  <span className="text-cyan-300 font-semibold">FAA Part 107 Comml</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 font-mono text-[11px]">
                  <span className="text-slate-400">Insurance Bond:</span>
                  <span className="text-emerald-300 font-semibold">$5,000,000 Worldwide</span>
                </div>
              </div>

              {/* Laurels / Stamp */}
              <div className="flex items-center justify-around py-2 border-t border-slate-800">
                <div className="text-center">
                  <Award className="w-5 h-5 mx-auto text-amber-400 mb-0.5" />
                  <span className="text-[9px] font-mono text-slate-400">CANNES 25</span>
                </div>
                <div className="text-center">
                  <Award className="w-5 h-5 mx-auto text-purple-400 mb-0.5" />
                  <span className="text-[9px] font-mono text-slate-400">SUNDANCE</span>
                </div>
                <div className="text-center">
                  <Award className="w-5 h-5 mx-auto text-cyan-400 mb-0.5" />
                  <span className="text-[9px] font-mono text-slate-400">VIMEO PICK</span>
                </div>
              </div>
            </div>

            {/* Back footer */}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[9px] font-mono text-slate-500">
              <span>SECURITY HASH: 9F2A-88C1</span>
              <span className="text-white/60">CLICK TO FLIP ➔</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Ribbon Shadow on Bottom */}
      <div className="w-48 h-3 bg-black/10 rounded-full blur-md mt-2"></div>
    </div>
  );
};
