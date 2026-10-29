import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  Video, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Play, 
  Activity, 
  Eye, 
  Zap, 
  Layers, 
  Sliders, 
  FileCheck,
  ChevronRight
} from 'lucide-react';

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState('acoustic');
  const [audioTesting, setAudioTesting] = useState(false);

  return (
    <div className="min-h-screen w-full nexora-mesh-bg text-slate-900 pb-20 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Product Hero Header */}
      <section className="relative px-6 sm:px-8 lg:px-12 pt-12 pb-16 border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-sm text-xs font-semibold text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Nexora Multimodal Product Suite</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Dual-Stream Non-Invasive<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
              Biomarker Telemetry Engine
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Synchronized acoustic speech prosody and affective facial Action Unit tracking. Engineered to compute objective mental wellness metrics 100% in-browser with zero unencrypted raw video storage.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/assessment"
              className="px-8 py-4 rounded-full bg-[#0B0F19] hover:bg-slate-800 text-white font-medium text-sm sm:text-base shadow-lg shadow-slate-950/15 flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Launch Assessment Setup</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/technology"
              className="px-8 py-4 rounded-full bg-white/90 hover:bg-white text-slate-800 font-medium text-sm sm:text-base border border-slate-200/80 shadow-sm transition-all flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-blue-600" />
              <span>Inspect AI Methodology</span>
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> 100% Client-Side Processing
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Standardized eGeMAPS DSP
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Involuntary FACS AU Tracking
            </span>
          </div>

        </div>
      </section>

      {/* Main Product Showcase Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-16">
        
        {/* Stream 1 & 2 Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Audio Pipeline Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">Acoustic Prosody Pipeline</h3>
                  <p className="text-xs text-slate-500">Standardized eGeMAPS Parameter Extraction</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                Stream 1
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When individuals experience depressive or anxious states, involuntary motor slowing (psychomotor retardation) and somatic laryngeal tension directly alter vocal acoustics. Our DSP engine computes cycle-to-cycle frequency variations (jitter), amplitude perturbations (shimmer), and fundamental frequency (F0) flattening.
            </p>

            {/* Audio Waveform Simulator */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Speech Prosody Contour</span>
                <span className="text-blue-600 font-bold">F0: 148.5 Hz • Modal Tone</span>
              </div>
              
              <div className="h-14 flex items-end gap-1.5 px-2 bg-white rounded-xl border border-slate-100 py-2">
                {[35, 65, 80, 50, 95, 70, 45, 90, 60, 40, 75, 85, 55, 90, 65, 45, 80, 60, 40, 70].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 bg-gradient-to-t from-blue-600 via-blue-500 to-sky-400 rounded-full animate-waveform"
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Local Jitter</span>
                  <span className="font-bold text-slate-800">1.42% (Normal)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Glottal Shimmer</span>
                  <span className="font-bold text-slate-800">3.18%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Articulation</span>
                  <span className="font-bold text-slate-800">4.1 syl/s</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Extracts 88 clinical eGeMAPS acoustic features</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Zero raw voice recordings uploaded or stored</span>
              </div>
            </div>
          </div>

          {/* Visual Pipeline Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">Affective Facial AU Tracker</h3>
                  <p className="text-xs text-slate-500">MediaPipe Vision • 468 Facial Landmarks</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                Stream 2
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Detects subconscious emotional blunting and facial motor attenuation using the Facial Action Coding System (FACS). Tracks involuntary brow furrowing (AU04), zygomatic major smile attenuation (AU12), and spontaneous ocular blink frequencies.
            </p>

            {/* Landmark Geometry Mockup */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">MediaPipe Affective Landmarker</span>
                <span className="text-indigo-600 font-bold">Confidence: 98.4%</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">AU04 Brow Lowerer</span>
                    <span className="font-bold text-slate-900">0.24 (Low)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-[24%]" />
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">AU12 Smile Puller</span>
                    <span className="font-bold text-slate-900">0.71 (Normal)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-[71%]" />
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">Spontaneous Blinks</span>
                    <span className="font-bold text-slate-900">18 / min</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[45%]" />
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">Frontal Eye Gaze</span>
                    <span className="font-bold text-slate-900">76% Centering</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full w-[76%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>Edge WebAssembly face tracking at 30 FPS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>Raw video frames immediately discarded in RAM</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Step Interactive Session Flow */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white shadow-nexora-card space-y-10 text-left">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Protocol Workflow
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How a Nexora Assessment Session Operates
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Standardized 3-minute research screening designed for zero intimidation and maximum scientific accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Client Hardware Check</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Informed consent prompt requests temporary microphone and webcam permissions inside an isolated browser sandbox.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Standardized Reading</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Participant reads a neutral standardized passage (Rainbow Passage) and answers open prompts while audio-visual frames are parsed.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Feature Vector Fusion</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The 88 acoustic descriptors and facial AU landmarks are normalized and fused through an ensemble MLP/LightGBM model.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Transparent SHAP Report</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates transparent feature attribution waterfall charts explaining exactly which vocal or facial biomarkers influenced the screening score.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Launch Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Interactive Assessment Ready
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to Begin Your Session?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Launch our 3-minute guided assessment to analyze your vocal prosody and facial dynamics in real time.
            </p>
          </div>

          <Link
            to="/assessment"
            className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 flex-shrink-0 group"
          >
            <span>Launch Live Assessment</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </section>

    </div>
  );
}

