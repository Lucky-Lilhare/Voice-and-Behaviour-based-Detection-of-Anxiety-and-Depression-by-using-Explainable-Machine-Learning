import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BrainCircuit, 
  Activity, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Scale, 
  Sliders, 
  Info, 
  FileText,
  Lock,
  ChevronRight
} from 'lucide-react';
import { PROJECT_DETAILS, ACOUSTIC_FEATURES_GUIDE, BEHAVIORAL_FEATURES_GUIDE, XAI_METHODOLOGY } from '../data/researchData';

export default function TechnologyPage() {
  const [activeTab, setActiveTab] = useState('shap');

  return (
    <div className="min-h-screen w-full nexora-mesh-bg text-slate-900 pb-20 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Technology Hero Header */}
      <section className="relative px-6 sm:px-8 lg:px-12 pt-12 pb-16 border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-sm text-xs font-semibold text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Explainable Machine Learning</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Transparent SHAP & XAI<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
              Mathematical Architecture
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Eliminating opaque black boxes in clinical AI. Every risk score is calculated with cooperative game-theoretic Shapley Additive Explanations (SHAP) ensuring full attribution transparency.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explainable-ai"
              className="px-8 py-4 rounded-full bg-[#0B0F19] hover:bg-slate-800 text-white font-medium text-sm sm:text-base shadow-lg shadow-slate-950/15 flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Launch SHAP Visualizer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/product"
              className="px-8 py-4 rounded-full bg-white/90 hover:bg-white text-slate-800 font-medium text-sm sm:text-base border border-slate-200/80 shadow-sm transition-all flex items-center gap-2"
            >
              <span>Explore Product Engine</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Technology Core Pillars */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {XAI_METHODOLOGY.map((step, idx) => (
            <div key={idx} className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-100">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-slate-900 text-base">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive SHAP Feature Attribution Waterfall Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white shadow-nexora-card space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h3 className="font-bold text-xl text-slate-900">Interactive SHAP Attribution Waterfall</h3>
              <p className="text-xs text-slate-500">Live visualization of cooperative game-theoretic feature weighting</p>
            </div>
            <Link
              to="/explainable-ai"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full border border-blue-200/80 transition-colors self-start sm:self-auto"
            >
              <span>Open Detailed Inspector</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              { name: 'Vocal Fundamental Pitch Variance (F0 SD)', val: '+0.21', type: 'prosody', pct: 85, dir: 'positive', note: 'Monotone pitch profile pushes prediction towards depressive risk' },
              { name: 'AU04 Brow Lowerer Furrow Duration', val: '+0.18', type: 'facial', pct: 72, dir: 'positive', note: 'Persistent involuntary corrugator contraction indicates cognitive strain' },
              { name: 'Spontaneous Eye Blink Rate (Elevated)', val: '+0.14', type: 'ocular', pct: 58, dir: 'positive', note: 'Acute somatic stress correlates with elevated blink rate' },
              { name: 'AU12 Lip Corner Smiling Puller', val: '-0.19', type: 'facial', pct: 76, dir: 'negative', note: 'Spontaneous smile engagement lowers clinical risk rating' },
              { name: 'Vocal Shimmer Amplitude Stability', val: '-0.15', type: 'prosody', pct: 60, dir: 'negative', note: 'Consistent subglottic breath support indicates vocal stability' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">{item.name}</span>
                  <span className={`font-mono font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
                    item.dir === 'positive' 
                      ? 'bg-rose-50 text-rose-700 border border-rose-100' 
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}>
                    SHAP {item.val}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${item.pct}%` }} 
                    className={`h-full rounded-full ${
                      item.dir === 'positive' 
                        ? 'bg-gradient-to-r from-rose-500 to-amber-500' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    }`} 
                  />
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 text-center">
            <Link
              to="/explainable-ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition-all"
            >
              <span>Explore Interactive Biomarker Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
}

