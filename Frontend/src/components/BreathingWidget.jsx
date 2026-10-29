import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function BreathingWidget() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('idle'); // 'inhale' | 'hold' | 'exhale' | 'idle'
  const [countdown, setCountdown] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef(null);

  // Play gentle bell sound using Web Audio API
  const playTone = (freq = 440) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.warn("Audio tone warning:", e);
    }
  };

  useEffect(() => {
    let timer = null;

    if (isActive) {
      if (phase === 'idle') {
        setPhase('inhale');
        setCountdown(4);
        playTone(523.25); // C5
      }

      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            if (phase === 'inhale') {
              setPhase('hold');
              playTone(659.25); // E5
              return 7;
            } else if (phase === 'hold') {
              setPhase('exhale');
              playTone(440); // A4
              return 8;
            } else if (phase === 'exhale') {
              setCompletedCycles(c => c + 1);
              setPhase('inhale');
              playTone(523.25); // C5
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setPhase('idle');
      setCountdown(4);
    }

    return () => clearInterval(timer);
  }, [isActive, phase, soundEnabled]);

  const handleReset = () => {
    setIsActive(false);
    setPhase('idle');
    setCountdown(4);
    setCompletedCycles(0);
  };

  // Phase instructional copy & styles
  const getPhaseDetails = () => {
    switch (phase) {
      case 'inhale':
        return {
          title: "Inhale Slowly Through Nose",
          desc: "Fill your diaphragm gently with calm energy",
          ringColor: "border-teal-500 scale-110 bg-teal-50/70",
          textColor: "text-teal-700",
        };
      case 'hold':
        return {
          title: "Hold Your Breath",
          desc: "Sustain steady oxygenation without tension",
          ringColor: "border-lavender-500 scale-110 bg-lavender-50/70",
          textColor: "text-lavender-700",
        };
      case 'exhale':
        return {
          title: "Exhale Completely Through Mouth",
          desc: "Release somatic distress and shoulder tightness",
          ringColor: "border-sky-500 scale-95 bg-sky-50/60",
          textColor: "text-sky-700",
        };
      default:
        return {
          title: "Ready to Reset Your Breathing?",
          desc: "4-7-8 rhythmic breathing technique for vagus nerve stimulation",
          ringColor: "border-slate-200 bg-white",
          textColor: "text-slate-700",
        };
    }
  };

  const details = getPhaseDetails();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-800">4-7-8 Calming Breath Widget</h3>
            <p className="text-[11px] text-slate-500">Autonomous parasympathetic down-regulation</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              soundEnabled ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
            title={soundEnabled ? 'Mute tone' : 'Enable audio chimes'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            Cycles: {completedCycles}
          </span>
        </div>
      </div>

      <div className="py-6 flex flex-col items-center justify-center text-center">
        {/* Animated Breathing Circle */}
        <div className="relative w-36 h-36 flex items-center justify-center my-2">
          <div
            className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out shadow-sm ${details.ringColor}`}
          >
            <span className="text-3xl font-extrabold font-mono text-slate-800 tracking-tight">
              {isActive ? countdown : '4-7-8'}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${details.textColor}`}>
              {phase === 'idle' ? 'START' : phase}
            </span>
          </div>

          {/* Radiating pulse ring when active */}
          {isActive && (
            <div className="absolute inset-0 rounded-full border border-teal-400/40 animate-ping pointer-events-none"></div>
          )}
        </div>

        <h4 className="font-bold text-sm text-slate-800 mt-2">{details.title}</h4>
        <p className="text-xs text-slate-500 max-w-xs mt-1 min-h-[32px]">{details.desc}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
            isActive
              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              : 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-600/20'
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-3.5 h-3.5" /> Pause Session
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" /> Begin Exercise
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>
    </div>
  );
}
