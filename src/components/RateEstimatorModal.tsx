import React, { useState } from 'react';
import { soundFx } from '../utils/audioEffects';
import confetti from 'canvas-confetti';
import {
  X,
  Calculator,
  CheckCircle2,
  Calendar,
  Sparkles,
  Camera,
  Film,
  Download,
  Copy,
  Check
} from 'lucide-react';

interface RateEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RateEstimatorModal: React.FC<RateEstimatorModalProps> = ({ isOpen, onClose }) => {
  // Form State
  const [projectType, setProjectType] = useState<'commercial' | 'music_video' | 'documentary' | 'social'>('commercial');
  const [shootDays, setShootDays] = useState<number>(2);
  const [cameraPackage, setCameraPackage] = useState<'sony' | 'red' | 'arri'>('red');
  
  // Post-Production Add-ons
  const [addAcesColor, setAddAcesColor] = useState<boolean>(true);
  const [addSoundDesign, setAddSoundDesign] = useState<boolean>(true);
  const [addSocialCutdowns, setAddSocialCutdowns] = useState<boolean>(false);
  const [addDroneOp, setAddDroneOp] = useState<boolean>(false);

  // Currency
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'JPY'>('USD');

  // Booking Form Fields
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!isOpen) return null;

  // Rate calculations
  const rates = {
    commercial: 3500,
    music_video: 2800,
    documentary: 2400,
    social: 1800,
  };

  const cameraRates = {
    sony: 450,
    red: 850,
    arri: 1600,
  };

  const currencyRates = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    JPY: { symbol: '¥', rate: 154.0 },
  };

  const curr = currencyRates[currency];

  const baseRate = rates[projectType] * shootDays;
  const gearCost = cameraRates[cameraPackage] * shootDays;
  const postCost = 
    (addAcesColor ? 1200 : 0) +
    (addSoundDesign ? 800 : 0) +
    (addSocialCutdowns ? 600 : 0) +
    (addDroneOp ? 950 : 0);

  const totalUSD = baseRate + gearCost + postCost;
  const convertedTotal = Math.round(totalUSD * curr.rate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playKeycapClick('high');
    const code = `KV-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(code);
    setIsSubmitted(true);

    // Launch celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-8">
        {/* Modal Close Button */}
        <button
          onClick={() => {
            soundFx.playKeycapClick('low');
            onClose();
          }}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-600">
              INSTANT PRODUCTION ESTIMATOR
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
            Calculate Production Budget
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure shoot scale, camera package, and post-production delivery to view instant quote.
          </p>
        </div>

        {isSubmitted ? (
          /* Confirmation View */
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-900">
              Production Booking Reserved!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{clientName || 'Producer'}</strong>. Your project proposal has been locked. Kaizen Vane's production studio will review schedule availability within 24 hours.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-xs mx-auto space-y-1">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">
                ESTIMATED PROPOSAL TOTAL
              </span>
              <span className="text-2xl font-black font-display text-purple-600">
                {curr.symbol}{convertedTotal.toLocaleString()} {currency}
              </span>
              <span className="text-[11px] font-mono text-slate-500 block pt-1 border-t border-slate-200">
                Reference Code: {confirmationCode}
              </span>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Close Estimator
            </button>
          </div>
        ) : (
          /* Estimator Form & Breakdown */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Currency Selector */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-slate-600 uppercase">
                SELECT CURRENCY:
              </span>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                {(['USD', 'EUR', 'GBP', 'JPY'] as const).map(c => (
                  <button
                    key={c}
                    onClick={() => {
                      soundFx.playKeycapClick('low');
                      setCurrency(c);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                      currency === c
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* 1. Project Type Choices */}
            <div className="space-y-2">
              <label className="text-xs font-bold font-mono text-slate-700 uppercase">
                1. PRODUCTION SCOPE & FORMAT
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'commercial', label: 'Brand Commercial', sub: 'High-end cinema' },
                  { id: 'music_video', label: 'Music Video', sub: 'Choreography & FX' },
                  { id: 'documentary', label: 'Doc Feature', sub: 'Run & Gun natural' },
                  { id: 'social', label: 'Social 9:16', sub: 'Viral campaign' },
                ].map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      soundFx.playKeycapClick('low');
                      setProjectType(type.id as typeof projectType);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      projectType === type.id
                        ? 'bg-purple-50 border-purple-600 text-purple-900 shadow-sm'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold block">{type.label}</span>
                    <span className="text-[10px] text-slate-500 block">{type.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Shoot Days Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-slate-700">
                <span className="font-bold uppercase">2. DAYS ON-SET PRODUCTION:</span>
                <span className="text-purple-600 font-bold">{shootDays} {shootDays === 1 ? 'Day' : 'Days'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={shootDays}
                onChange={e => setShootDays(Number(e.target.value))}
                className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* 3. Camera Package Choice */}
            <div className="space-y-2">
              <label className="text-xs font-bold font-mono text-slate-700 uppercase">
                3. CINEMA CAMERA & OPTICS PACKAGE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'sony', label: 'Sony FX3 Cinema', desc: 'Compact Full-Frame 4K' },
                  { id: 'red', label: 'RED V-Raptor 8K VV', desc: '8K RAW VistaVision + Cooke' },
                  { id: 'arri', label: 'ARRI Alexa Mini LF', desc: 'Dual-Cam Large Format Gold' },
                ].map(cam => (
                  <button
                    key={cam.id}
                    type="button"
                    onClick={() => {
                      soundFx.playKeycapClick('low');
                      setCameraPackage(cam.id as typeof cameraPackage);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      cameraPackage === cam.id
                        ? 'bg-purple-50 border-purple-600 text-purple-900 shadow-sm'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold block">{cam.label}</span>
                    <span className="text-[10px] text-slate-500">{cam.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Post-Production Deliverables Checkboxes */}
            <div className="space-y-2">
              <label className="text-xs font-bold font-mono text-slate-700 uppercase">
                4. POST-PRODUCTION & ADD-ONS
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={addAcesColor}
                    onChange={e => setAddAcesColor(e.target.checked)}
                    className="accent-purple-600 w-4 h-4 rounded"
                  />
                  <span>ACES Color Science Grade (+{curr.symbol}{Math.round(1200 * curr.rate)})</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={addSoundDesign}
                    onChange={e => setAddSoundDesign(e.target.checked)}
                    className="accent-purple-600 w-4 h-4 rounded"
                  />
                  <span>Sound Design & Foley (+{curr.symbol}{Math.round(800 * curr.rate)})</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={addSocialCutdowns}
                    onChange={e => setAddSocialCutdowns(e.target.checked)}
                    className="accent-purple-600 w-4 h-4 rounded"
                  />
                  <span>9:16 Social Cutdowns (+{curr.symbol}{Math.round(600 * curr.rate)})</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={addDroneOp}
                    onChange={e => setAddDroneOp(e.target.checked)}
                    className="accent-purple-600 w-4 h-4 rounded"
                  />
                  <span>Heavy-Lift FPV Drone (+{curr.symbol}{Math.round(950 * curr.rate)})</span>
                </label>
              </div>
            </div>

            {/* Live Estimate Total Card */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">
                  ESTIMATED PRODUCTION BUDGET
                </span>
                <span className="text-3xl font-black font-display text-white">
                  {curr.symbol}{convertedTotal.toLocaleString()} <span className="text-sm font-mono text-purple-400 font-bold">{currency}</span>
                </span>
              </div>

              <div className="text-[11px] font-mono text-slate-400 text-right space-y-0.5">
                <div>Director & Crew: {curr.symbol}{Math.round(baseRate * curr.rate)}</div>
                <div>Camera Package: {curr.symbol}{Math.round(gearCost * curr.rate)}</div>
                <div>Post & Delivery: {curr.symbol}{Math.round(postCost * curr.rate)}</div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name / Producer"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-purple-600 font-medium"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  className="p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-purple-600 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.01] active:scale-100"
              >
                Submit Project Brief & Lock Dates
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
