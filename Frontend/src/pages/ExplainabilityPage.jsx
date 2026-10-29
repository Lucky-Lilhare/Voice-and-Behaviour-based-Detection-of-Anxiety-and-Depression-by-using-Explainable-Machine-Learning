import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BrainCircuit, 
  Activity, 
  Waves, 
  Eye, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Sparkles,
  Info,
  Scale,
  Sliders,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { 
  PROJECT_DETAILS, 
  ACOUSTIC_FEATURES_GUIDE, 
  BEHAVIORAL_FEATURES_GUIDE, 
  XAI_METHODOLOGY 
} from '../data/researchData';
import FeatureAttributionChart from '../components/FeatureAttributionChart';
import DemoDataBanner from '../components/DemoDataBanner';

export default function ExplainabilityPage() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'voice' | 'behavioral' | 'shap-lime' | 'simulator'

  // Voice-specific illustrative SHAP values
  const voiceFeatureData = [
    { feature: "Pitch Variation (F0 SD)", value: 0.21, type: "positive", label: "Dynamic prosody expressiveness (+0.21)" },
    { feature: "Speech Articulation Rate", value: 0.16, type: "positive", label: "Fluent verbal tempo (+0.16)" },
    { feature: "Harmonic-to-Noise Ratio", value: 0.12, type: "positive", label: "Clear glottal acoustic tone (+0.12)" },
    { feature: "Acoustic Glottal Shimmer", value: -0.09, type: "negative", label: "Subtle amplitude micro-irregularities (-0.09)" },
    { feature: "Vocal Hesitation Pause Ratio", value: -0.17, type: "negative", label: "Prolonged inter-phrase latency (-0.17)" },
  ];

  // Behavioral-specific illustrative SHAP values
  const behavioralFeatureData = [
    { feature: "Frontal Eye Gaze Centering", value: 0.18, type: "positive", label: "Direct ocular camera engagement (+0.18)" },
    { feature: "AU12 (Smile Dynamic Activation)", value: 0.15, type: "positive", label: "Spontaneous zygomaticus major engagement (+0.15)" },
    { feature: "Head Pose Euler Stability", value: 0.11, type: "positive", label: "Consistent 3D upright head orientation (+0.11)" },
    { feature: "AU04 (Brow Corrugator Furrow)", value: -0.14, type: "negative", label: "Sustained involuntary eyebrow tension (-0.14)" },
    { feature: "Spontaneous Blink Frequency", value: -0.12, type: "negative", label: "Elevated blinks indicating cognitive arousal (-0.12)" },
  ];

  // Combined interactive simulator toggles
  const [activeBiomarkers, setActiveBiomarkers] = useState({
    pitchProsody: true,
    speechFluency: true,
    gazeCentering: true,
    browFurrow: true,
    pauseLatency: true,
  });

  const toggleBiomarker = (key) => {
    setActiveBiomarkers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Base population calibration score
  const baselineScore = 70.0;
  const calculatedContribution = (
    (activeBiomarkers.pitchProsody ? 0.20 : 0) +
    (activeBiomarkers.speechFluency ? 0.15 : 0) +
    (activeBiomarkers.gazeCentering ? 0.16 : 0) +
    (activeBiomarkers.browFurrow ? -0.12 : 0) +
    (activeBiomarkers.pauseLatency ? -0.15 : 0)
  );
  const simulatedOutputScore = Math.min(100, Math.max(0, Math.round((baselineScore + (calculatedContribution * 35)) * 10) / 10));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-soft-lg border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold">
          <BrainCircuit className="w-4 h-4 text-teal-400" />
          <span>Explainable AI (XAI) Educational Center</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
          How Transparent Machine Learning Explains Biomarkers
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          In clinical and behavioral screening, opaque black-box predictions produce distrust. AuraMind employs <strong>Shapley Additive Explanations (SHAP)</strong> and <strong>LIME</strong> to unpack model predictions into accountable, interpretable biomarker contributions.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-lg bg-white/10 text-slate-200">
            Degree: {PROJECT_DETAILS.degree}
          </span>
          <span className="px-3 py-1 rounded-lg bg-white/10 text-slate-200">
            {PROJECT_DETAILS.department}
          </span>
          <span className="px-3 py-1 rounded-lg bg-white/10 text-slate-200">
            Academic Year: {PROJECT_DETAILS.academicYear}
          </span>
        </div>
      </div>

      {/* Mandatory Demo Data Notice */}
      <DemoDataBanner
        title="ILLUSTRATIVE DEMONSTRATION VALUES — NOT ACTIVE ML INFERENCE"
        message="All feature importance weights, SHAP values, and acoustic ranges shown below are fixed illustrative examples designed to explain how future model services interpret multimodal parameters. They do not represent an active trained model or a real person's diagnosis."
      />

      {/* Critical Scientific Disclaimer on Feature Importance */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-3 border border-slate-800">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>Scientific Meaning of Feature Importance</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          <strong>Feature importance indicates algorithmic model influence, not clinical proof of depression or anxiety.</strong> A negative SHAP contribution (such as elevated pause ratio or brow furrowing) indicates that the mathematical model adjusted its classification probability in response to that observation; it does not confirm the presence of a clinical disorder.
        </p>
      </div>

      {/* 4-Step Methodology Architecture */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Multimodal Feature Engineering & Attribution Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {XAI_METHODOLOGY.map((step, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                Pipeline Stage {idx + 1}
              </span>
              <h3 className="font-bold text-sm text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Exploration Sections with Navigation Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Interactive XAI Exploration Modules
            </h3>
            <p className="text-xs text-slate-500">
              Select a module to inspect feature attribution charts, SHAP/LIME theories, or simulate output impacts
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-white text-teal-800 shadow-sm font-bold' : 'text-slate-600'}`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('voice')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${activeTab === 'voice' ? 'bg-white text-teal-800 shadow-sm font-bold' : 'text-slate-600'}`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>Voice Chart</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('behavioral')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${activeTab === 'behavioral' ? 'bg-white text-lavender-800 shadow-sm font-bold' : 'text-slate-600'}`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Behavioral Chart</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shap-lime')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${activeTab === 'shap-lime' ? 'bg-white text-indigo-800 shadow-sm font-bold' : 'text-slate-600'}`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>SHAP vs LIME</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${activeTab === 'simulator' ? 'bg-white text-teal-800 shadow-sm font-bold' : 'text-slate-600'}`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Impact Simulator</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-2">
                <span className="font-bold text-xs uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-teal-600" />
                  <span>Acoustic Speech Biomarkers (eGeMAPS)</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Speech acoustics measure neuromuscular control of phonation. Flat fundamental frequency (reduced F0 standard deviation), increased frequency jitter, and elevated pause ratios reflect somatic psychomotor retardation.
                </p>
                <div className="pt-2 text-[11px] font-mono text-teal-700">
                  Standard Set: Geneva Minimalistic Acoustic Parameter Set (88 features)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-lavender-50/60 border border-lavender-200/80 space-y-2">
                <span className="font-bold text-xs uppercase tracking-wider text-lavender-800 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-lavender-600" />
                  <span>Facial Behavior & Gaze Biomarkers</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Computer vision captures involuntary micro-expressions through Action Units (FACS). Sustained activation of AU04 (brow furrowing), attenuation of AU12 (zygomaticus major smile), and gaze avoidance correlate with affective withdrawal.
                </p>
                <div className="pt-2 text-[11px] font-mono text-lavender-700">
                  Tooling: MediaPipe Vision & OpenFace 2.0 Landmark Mesh
                </div>
              </div>

            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900">Standard Acoustic Parameters Reference</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {ACOUSTIC_FEATURES_GUIDE.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-slate-900">{item.name}</span>
                    <span className="text-[10px] text-teal-700 block font-mono">{item.unit}</span>
                    <p className="text-[11px] text-slate-600 line-clamp-3">{item.significance}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VOICE FEATURE IMPORTANCE */}
        {activeTab === 'voice' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block text-xs">
                Acoustic Feature Importance Chart (Demonstration Data)
              </span>
              <p>
                This chart illustrates how individual speech acoustic features contribute toward the emotional stability index. Features extending right (+values) support prosodic vitality, while features extending left (-values) indicate hesitation or glottal strain.
              </p>
            </div>
            <FeatureAttributionChart data={voiceFeatureData} />
          </div>
        )}

        {/* TAB 3: BEHAVIORAL FEATURE IMPORTANCE */}
        {activeTab === 'behavioral' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block text-xs">
                Facial & Behavioral Feature Importance Chart (Demonstration Data)
              </span>
              <p>
                Illustrates the marginal attribution of facial Action Units, blink frequency, and eye-gaze centering towards the behavioral engagement score.
              </p>
            </div>
            <FeatureAttributionChart data={behavioralFeatureData} />
          </div>
        )}

        {/* TAB 4: SHAP VS LIME */}
        {activeTab === 'shap-lime' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs">
                    S
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">SHAP (Shapley Additive Explanations)</h4>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Grounded in cooperative game theory (Lloyd Shapley, Nobel Laureate). SHAP calculates the exact marginal contribution of each biomarker across all possible feature coalitions.
                </p>
                <div className="space-y-1 pt-1 text-[11px] text-slate-500">
                  <p><strong>Key Property:</strong> Additive feature attribution ensures the sum of feature effects equals model prediction minus baseline.</p>
                  <p><strong>Primary Use:</strong> Unified global and local explanation across acoustic-visual ensembles.</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                    L
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">LIME (Local Interpretable Model-agnostic Explanations)</h4>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Approximates the complex global machine-learning model locally around a single prediction by perturbing inputs and fitting an interpretable surrogate model (e.g. Ridge regression).
                </p>
                <div className="space-y-1 pt-1 text-[11px] text-slate-500">
                  <p><strong>Key Property:</strong> Model-agnostic and computationally fast for real-time explanations.</p>
                  <p><strong>Primary Use:</strong> Verifying local decision boundaries for individual audio/video sessions.</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: INTERACTIVE CONTRIBUTION IMPACT SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block text-xs">
                Interactive Feature Contribution Simulator (Demonstration Model)
              </span>
              <p>
                Toggle the biomarker observations below to observe how each Shapley contribution pushes the simulated composite score above or below the baseline calibration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Toggles */}
              <div className="md:col-span-7 space-y-2 text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <span>Pitch Variation Expressiveness (+0.20 SHAP)</span>
                  <input
                    type="checkbox"
                    checked={activeBiomarkers.pitchProsody}
                    onChange={() => toggleBiomarker('pitchProsody')}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <span>Verbal Articulation Fluency (+0.15 SHAP)</span>
                  <input
                    type="checkbox"
                    checked={activeBiomarkers.speechFluency}
                    onChange={() => toggleBiomarker('speechFluency')}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <span>Frontal Eye Contact Centering (+0.16 SHAP)</span>
                  <input
                    type="checkbox"
                    checked={activeBiomarkers.gazeCentering}
                    onChange={() => toggleBiomarker('gazeCentering')}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <span>Elevated Brow Furrowing AU04 (-0.12 SHAP)</span>
                  <input
                    type="checkbox"
                    checked={activeBiomarkers.browFurrow}
                    onChange={() => toggleBiomarker('browFurrow')}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <span>Prolonged Response Pause Latency (-0.15 SHAP)</span>
                  <input
                    type="checkbox"
                    checked={activeBiomarkers.pauseLatency}
                    onChange={() => toggleBiomarker('pauseLatency')}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                  />
                </label>
              </div>

              {/* Dynamic Simulated Outcome Card */}
              <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 text-center space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 block">
                  Simulated Composite Outcome
                </span>

                <div>
                  <span className="text-4xl font-extrabold font-mono text-white">
                    {simulatedOutputScore}
                  </span>
                  <span className="text-xs text-slate-400"> / 100</span>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <p>Baseline: <strong>{baselineScore}</strong></p>
                  <p>Net SHAP Adjustment: <strong>{calculatedContribution > 0 ? `+${calculatedContribution.toFixed(2)}` : calculatedContribution.toFixed(2)}</strong></p>
                </div>

                <div className="text-[10px] text-amber-300 italic border-t border-slate-700 pt-2">
                  *Illustrative interactive simulation for pedagogical defense review.
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* CTA to Assessment */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Ready to test the assessment setup?
          </h3>
          <p className="text-xs text-slate-500">
            Experience the guided audio and video capture sandbox.
          </p>
        </div>
        <Link
          to="/assessment"
          className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm flex items-center gap-2"
        >
          <span>Launch Assessment Setup</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
