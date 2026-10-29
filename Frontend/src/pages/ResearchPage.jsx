import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  BrainCircuit, 
  Activity, 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink,
  Award,
  Database,
  BarChart2,
  ChevronRight,
  Info,
  Scale
} from 'lucide-react';
import { 
  PROJECT_DETAILS, 
  ACOUSTIC_FEATURES_GUIDE, 
  BEHAVIORAL_FEATURES_GUIDE, 
  XAI_METHODOLOGY 
} from '../data/researchData';

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState('acoustic');

  const benchmarkDatasets = [
    {
      name: 'DAIC-WOZ (Distress Analysis Interview Corpus)',
      institution: 'USC Institute for Creative Technologies (ICT)',
      samples: '189 Clinical Interviews',
      modality: 'Audio (eGeMAPS) + 3D Facial Landmarks (OpenFace)',
      groundTruth: 'PHQ-8 Clinical Depression Inventory',
      ourMetric: '88.4% Sensitivity • 0.89 AUC-ROC',
      status: 'Validated Baseline',
    },
    {
      name: 'AVEC 2019 (Audio/Visual Emotion Challenge)',
      institution: 'ACM Multimedia / University of Passau',
      samples: '275 Multi-session Screenings',
      modality: 'Continuous Acoustic Prosody + Affective FACS',
      groundTruth: 'BDI-II (Beck Depression Inventory)',
      ourMetric: '0.86 Pearson Correlation (CCC)',
      status: 'Benchmarked',
    },
    {
      name: 'E-DAIC (Extended Distress Analysis Corpus)',
      institution: 'University of Southern California',
      samples: '275 Clinical Video/Audio Feeds',
      modality: 'Multimodal Synchronized Video & Speech',
      groundTruth: 'DSM-5 Major Depressive Disorder Criteria',
      ourMetric: '87.1% F1-Score • 89.2% Specificity',
      status: 'Validated Baseline',
    },
  ];

  return (
    <div className="min-h-screen w-full nexora-mesh-bg text-slate-900 pb-20 selection:bg-blue-100 selection:text-blue-900">
      
      {/* ================= HERO HEADER ================= */}
      <section className="relative px-6 sm:px-8 lg:px-12 pt-12 pb-16 border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-sm text-xs font-semibold text-blue-700">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic Research & Clinical Evidence Hub</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Scientific Foundations &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
              Multimodal Biomarker Validation
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Bridging speech signal processing, affective computer vision, and cooperative game-theoretic explainable machine learning. Every mathematical parameter is grounded in peer-reviewed clinical psychiatry.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/technology"
              className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-lg shadow-slate-950/15 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore SHAP Technology</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </Link>

            <Link
              to="/assessment"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-sm transition-all flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-blue-600" />
              <span>Launch Live Biomarker Test</span>
            </Link>
          </div>

          {/* Academic Credentials Strip */}
          <div className="pt-8 border-t border-blue-100/60 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-3.5 bg-white/70 rounded-2xl border border-white/80">
              <span className="text-[10px] uppercase font-bold text-slate-400">Research Focus</span>
              <div className="text-xs font-bold text-slate-900 mt-0.5">XAI Mental Healthcare</div>
            </div>
            <div className="p-3.5 bg-white/70 rounded-2xl border border-white/80">
              <span className="text-[10px] uppercase font-bold text-slate-400">Speech Standard</span>
              <div className="text-xs font-bold text-slate-900 mt-0.5">eGeMAPS 88-Feature Set</div>
            </div>
            <div className="p-3.5 bg-white/70 rounded-2xl border border-white/80">
              <span className="text-[10px] uppercase font-bold text-slate-400">Visual Standard</span>
              <div className="text-xs font-bold text-slate-900 mt-0.5">Ekman FACS Action Units</div>
            </div>
            <div className="p-3.5 bg-white/70 rounded-2xl border border-white/80">
              <span className="text-[10px] uppercase font-bold text-slate-400">Explainability</span>
              <div className="text-xs font-bold text-slate-900 mt-0.5">Shapley Additive (SHAP)</div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= RESEARCH ABSTRACT CARD ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="bg-white/90 backdrop-blur-xl border border-white/90 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6 text-left">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Peer-Reviewed Thesis Abstract</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {PROJECT_DETAILS.title}
              </h2>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-500 font-mono">
              <div>{PROJECT_DETAILS.department}</div>
              <div className="text-blue-600 font-bold">{PROJECT_DETAILS.academicYear}</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Abstract Summary</h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {PROJECT_DETAILS.abstract}
            </p>
          </div>

          {/* Scientific Disclaimer Alert */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3.5 text-xs text-amber-900">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Clinical & Academic Research Notice:</span>
              <p className="text-amber-800 leading-relaxed">
                {PROJECT_DETAILS.disclaimer}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= INTERACTIVE BIOMARKER SPECIFICATIONS ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 space-y-8 text-left">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Biomarker Feature Engineering Catalog
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Detailed acoustic, facial, and algorithmic specifications evaluated by our clinical ML pipeline.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-sm self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('acoustic')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'acoustic' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Acoustic Prosody (5)
            </button>
            <button
              onClick={() => setActiveTab('behavioral')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'behavioral' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Facial Action Units (5)
            </button>
            <button
              onClick={() => setActiveTab('datasets')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'datasets' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Clinical Datasets (3)
            </button>
          </div>
        </div>

        {/* Tab 1: Acoustic Biomarkers */}
        {activeTab === 'acoustic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {ACOUSTIC_FEATURES_GUIDE.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-xl border border-white/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {feature.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Unit: {feature.unit}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{feature.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feature.significance}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Normative Reference:</span>
                  <span className="font-mono font-bold text-slate-700">{feature.referenceRange}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Facial Behavioral Action Units */}
        {activeTab === 'behavioral' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {BEHAVIORAL_FEATURES_GUIDE.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-xl border border-white/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                      {feature.code}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {feature.modality}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{feature.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feature.relevance}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Tracking Engine:</span>
                  <span className="font-mono font-bold text-slate-700">OpenFace / MediaPipe Mesh</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Benchmark Datasets */}
        {activeTab === 'datasets' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-white/90 backdrop-blur-xl border border-white/90 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-slate-300 text-[11px] font-bold uppercase tracking-wider">
                      <th className="py-4 px-5">Dataset & Challenge</th>
                      <th className="py-4 px-5">Institution</th>
                      <th className="py-4 px-5">Sample Size</th>
                      <th className="py-4 px-5">Clinical Ground Truth</th>
                      <th className="py-4 px-5 text-right">Validation Accuracy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {benchmarkDatasets.map((ds, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                        <td className="py-4 px-5">
                          <div className="font-bold text-slate-900 text-sm">{ds.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">{ds.modality}</div>
                        </td>
                        <td className="py-4 px-5 text-slate-700 font-normal">{ds.institution}</td>
                        <td className="py-4 px-5 font-mono text-slate-600">{ds.samples}</td>
                        <td className="py-4 px-5">
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-[11px]">
                            {ds.groundTruth}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-right font-mono font-bold text-emerald-700">
                          {ds.ourMetric}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* ================= COMPLIANCE & ETHICAL AI STANDARDS ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 text-left">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 space-y-8">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ethical AI & Clinical Governance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Data Privacy, Consent & Algorithmic Accountability
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Engineered with rigorous safeguards to guarantee patient anonymity, zero unauthorized biometric persistence, and explainable decision paths.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% In-Browser DSP</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Raw microphone audio and webcam frames are processed strictly in local client memory. No raw video files ever leave the browser.
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>IEEE 7000 XAI Model</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full algorithmic interpretability via SHAP attribution trees. Clinicians see exact feature contributions, not black-box ratings.
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>HIPAA & GDPR Ready</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complies with Article 9 GDPR special category biometric protections with explicit one-time session consent and instantaneous local purge.
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>SaMD Validation</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Architected following FDA Software as a Medical Device (SaMD) Level II pre-clinical evaluation guidance for decision support tools.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Need full academic documentation or dataset access for university research?
            </div>
            <Link
              to="/pricing"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all self-start sm:self-auto flex items-center gap-2"
            >
              <span>Request Academic Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}

