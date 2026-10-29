import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Triangle, 
  Globe2, 
  X, 
  BrainCircuit, 
  Brain,
  Target,
  Mic, 
  Video, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ExternalLink,
  ChevronRight,
  HeartHandshake,
  BarChart3,
  Clock,
  Zap,
  Users,
  Building2,
  Stethoscope,
  GraduationCap,
  Layers,
  FileText,
  ChevronDown,
  HelpCircle,
  Award
} from 'lucide-react';
import { PROJECT_DETAILS, ACOUSTIC_FEATURES_GUIDE, BEHAVIORAL_FEATURES_GUIDE } from '../data/researchData';
import LiveVoiceBiomarkerSandbox from '../components/LiveVoiceBiomarkerSandbox';

export default function LandingPage({ onOpenHelpline }) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('acoustic');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does Nexora extract vocal biomarkers without sending raw voice audio to the cloud?",
      a: "Nexora executes all acoustic signal processing locally in your client's web browser using modern Web Audio API and AudioWorklet DSP. The raw audio stream is segmented into 25ms Hamming-windowed frames, and only mathematical Fourier-transformed parameters (pitch F0, jitter perturbation, shimmer amplitude, and spectral MFCCs) are derived. The actual audio bytes never leave your device or touch a database."
    },
    {
      q: "What clinical benchmark datasets validate Nexora's depression & anxiety detection?",
      a: "Nexora's multimodal fusion models are cross-validated against standard open clinical corpora: USC's DAIC-WOZ (Distress Analysis Interview Corpus, 189 interviews, PHQ-8 ground truth, 88.4% sensitivity), AVEC 2019 Audio/Visual Emotion Challenge (BDI-II validation, 0.86 concordance correlation), and the E-DAIC extended corpus (0.89 AUC-ROC)."
    },
    {
      q: "How does Explainable AI (SHAP & LIME) empower clinician confidence?",
      a: "Unlike 'black-box' neural networks, Nexora integrates Shapley Additive exPlanations (SHAP) and LIME feature attribution waterfalls. For every assessment score, clinicians receive an exact breakdown showing the quantitative percentage contribution of each feature—such as elevated vocal jitter (+22%), reduced eye contact (-15%), or blunted facial expressivity—ensuring complete diagnostic auditability."
    },
    {
      q: "Is Nexora designed as a diagnostic replacement or clinical decision support?",
      a: "Nexora is classified as an adjunctive Clinical Decision Support System (CDSS) and longitudinal biomarker tracking tool, adhering to FDA SaMD (Software as a Medical Device) Tier 1 guidelines. It does not replace a licensed psychologist or psychiatrist; rather, it equips mental health professionals with objective, quantitative sensory biomarkers alongside standard DSM-5 and PHQ-9 inventories."
    },
    {
      q: "How is patient health information protected under HIPAA and GDPR Article 9?",
      a: "All personal identifiers and session metrics are encrypted with AES-256 at rest and TLS 1.3 in transit. Because biometric feature extraction is completed client-side, voice recordings and facial video feeds are zero-retention by design, eliminating risks associated with centralized biometric storage and maintaining strict GDPR Article 9 compliance."
    },
    {
      q: "Can clinical teams and researchers export raw acoustic vectors and longitudinal data?",
      a: "Yes. Clinician & Pro tier accounts can export standardized CSV, JSON, and European Data Format (EDF) datasets containing timestamped eGeMAPS acoustic vectors, MediaPipe Action Unit activations, and patient recovery trajectory curves for empirical research and clinical record archiving."
    }
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full overflow-hidden nexora-mesh-bg text-slate-900 selection:bg-blue-100 selection:text-blue-900">

      {/* =========================================================================
          SECTION 1: HOME (Hero Template from Pinterest)
         ========================================================================= */}
      <section id="home" className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-8 lg:py-10 border-b border-blue-100/40 scroll-mt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-2 items-center">
            
            {/* LEFT COLUMN: Headlines, CTAs & Metrics */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-7 text-left z-20">
              
              {/* Pill Capsule Badge */}
              <div>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-sm text-xs sm:text-[13px] font-medium text-slate-700">
                  <span className="flex items-center gap-1.5 text-blue-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                    AI-Powered Future
                  </span>
                  <span className="text-slate-500 font-normal">
                    Real-time insights. Smarter decisions.
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-0.5">
                <h1 className="text-5xl sm:text-6xl lg:text-[70px] font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.06]">
                  Visualize<br />
                  Your Mind<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
                    in Motion
                  </span>
                </h1>
              </div>

              {/* Description Subtitle */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md font-normal">
                Nexora brings your thoughts, ideas, and data into a living visual experience — powered by AI, designed for a smarter tomorrow.
              </p>

              {/* Action Buttons Row */}
              <div className="pt-1 flex flex-wrap items-center gap-4 sm:gap-6">
                <button
                  type="button"
                  onClick={() => scrollTo('product')}
                  className="bg-[#0B0F19] hover:bg-slate-800 text-white font-medium text-sm sm:text-base px-7 py-3 rounded-full shadow-lg shadow-slate-950/10 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <span>Explore Platform</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center gap-3 group focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-white/90 group-hover:bg-blue-50 border border-blue-100/60 shadow-sm flex items-center justify-center text-slate-900 group-hover:text-blue-600 group-hover:scale-105 transition-all">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                      Watch Video
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      2 min
                    </div>
                  </div>
                </button>
              </div>

              {/* Three Metrics Stats Row */}
              <div className="pt-6 sm:pt-8 flex items-center">
                <div className="space-y-1 pr-7 sm:pr-9 border-r border-slate-200/70">
                  <div className="text-slate-500 mb-1">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight">
                    10K+
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Active Users
                  </div>
                </div>

                <div className="space-y-1 px-7 sm:px-9 border-r border-slate-200/70">
                  <div className="text-slate-500 mb-1">
                    <Triangle className="w-4 h-4 text-blue-500 rotate-180" />
                  </div>
                  <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight">
                    99.9%
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Uptime
                  </div>
                </div>

                <div className="space-y-1 pl-7 sm:pl-9">
                  <div className="text-slate-500 mb-1">
                    <Globe2 className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight">
                    150+
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Countries
                  </div>
                </div>
              </div>

            </div>

            {/* CENTER COLUMN: Hero Character & AR Ribbon */}
            <div className="lg:col-span-4 relative flex items-center justify-center order-first lg:order-none py-2 lg:py-0">
              <div className="relative w-full max-w-[420px] lg:max-w-[480px] flex items-center justify-center">
                <div className="relative group w-full flex items-center justify-center">
                  <img
                    src="/hero-person-full-seamless.png"
                    alt="Nexora Brainwave AR Interface"
                    className="w-full max-h-[580px] lg:max-h-[660px] object-contain select-none pointer-events-auto"
                  />
                  {/* Floating 'Explore The Platform' Interactive Circular Badge */}
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(true)}
                    className="absolute bottom-8 right-2 sm:bottom-12 sm:right-4 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_10px_30px_rgba(37,99,235,0.15)] hover:shadow-[0_16px_36px_rgba(37,99,235,0.25)] flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 group/btn cursor-pointer z-10"
                    title="Explore The Platform"
                    aria-label="Explore The Platform"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover/btn:bg-blue-600 group-hover/btn:scale-110 transition-all">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <div className="text-[10.5px] sm:text-[11.5px] font-semibold text-slate-800 leading-tight text-center tracking-tight">
                      Explore<br />The Platform
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: The 4 Floating Dashboard Cards */}
            <div className="lg:col-span-3 flex flex-col space-y-3.5 sm:space-y-4 justify-center max-w-[280px] sm:max-w-[320px] mx-auto lg:max-w-none w-full z-20">
              
              {/* CARD 1: Emotional State */}
              <Link
                to="/assessment"
                className="group relative block rounded-[26px] bg-white/85 hover:bg-white/95 backdrop-blur-xl border border-white/90 p-4 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_24px_rgba(37,99,235,0.06),0_2px_8px_rgba(15,23,42,0.02)] hover:shadow-[0_16px_36px_rgba(37,99,235,0.12)] ring-1 ring-black/[0.02] focus:outline-none"
                title="Emotional State - Calm 72%"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-blue-50/80 border border-blue-100 flex items-center justify-center text-slate-700">
                      <svg className="w-3.5 h-3.5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="6" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <span className="text-[13px] font-bold text-slate-800 tracking-tight">Emotional State</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>

                {/* Graphic + Metrics */}
                <div className="flex items-center justify-between gap-3 px-1 pt-0.5">
                  <div className="w-24 sm:w-28 h-16 sm:h-18 flex items-center justify-center">
                    <img 
                      src="/brain-emotional-hd.png" 
                      alt="Emotional State - Calm 72%" 
                      className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(168,85,247,0.18)] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[12px] font-medium text-slate-500 leading-tight mb-0.5">Calm</div>
                    <div className="text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight">72%</div>
                  </div>
                </div>
              </Link>

              {/* CARD 2: Cognitive Load */}
              <Link
                to="/explainable-ai"
                className="group relative block rounded-[26px] bg-white/85 hover:bg-white/95 backdrop-blur-xl border border-white/90 p-4 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_24px_rgba(37,99,235,0.06),0_2px_8px_rgba(15,23,42,0.02)] hover:shadow-[0_16px_36px_rgba(37,99,235,0.12)] ring-1 ring-black/[0.02] focus:outline-none"
                title="Cognitive Load - Low 32%"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-blue-50/80 border border-blue-100 flex items-center justify-center text-slate-700">
                      <Brain className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                    <span className="text-[13px] font-bold text-slate-800 tracking-tight">Cognitive Load</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>

                {/* Graphic + Metrics */}
                <div className="flex items-center justify-between gap-3 px-1 pt-0.5">
                  <div className="bg-blue-50/50 rounded-2xl px-2 py-1.5 flex items-center justify-center flex-1 h-16">
                    <svg viewBox="0 0 160 55" className="w-full h-full overflow-visible" fill="none">
                      <defs>
                        <linearGradient id="waveGradBack" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="waveGradFront" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 40 C 15 25, 35 25, 50 38 C 65 50, 85 45, 100 28 C 115 15, 130 30, 145 35 C 155 38, 160 38, 160 38 L 160 55 L 0 55 Z"
                        fill="url(#waveGradBack)"
                      />
                      <path
                        d="M0 35 C 18 18, 32 18, 48 32 C 60 42, 75 42, 90 26 C 105 10, 118 6, 130 22 C 140 35, 150 25, 160 30 L 160 55 L 0 55 Z"
                        fill="url(#waveGradFront)"
                      />
                      <path
                        d="M0 35 C 18 18, 32 18, 48 32 C 60 42, 75 42, 90 26 C 105 10, 118 6, 130 22 C 140 35, 150 25, 160 30"
                        stroke="#3B82F6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="group-hover:stroke-blue-500 transition-colors"
                      />
                    </svg>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[12px] font-medium text-slate-500 leading-tight mb-0.5">Low</div>
                    <div className="text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight">32%</div>
                  </div>
                </div>
              </Link>

              {/* CARD 3: Focus Analysis */}
              <Link
                to="/dashboard"
                className="group relative block rounded-[26px] bg-white/85 hover:bg-white/95 backdrop-blur-xl border border-white/90 p-4 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_24px_rgba(37,99,235,0.06),0_2px_8px_rgba(15,23,42,0.02)] hover:shadow-[0_16px_32px_rgba(37,99,235,0.12)] ring-1 ring-black/[0.02] focus:outline-none"
                title="Focus Analysis - 78% Focus"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-blue-50/80 border border-blue-100 flex items-center justify-center text-slate-700">
                      <Target className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                    <span className="text-[13px] font-bold text-slate-800 tracking-tight">Focus Analysis</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>

                {/* Graphic + Metrics */}
                <div className="flex items-center justify-between gap-3 px-1 pt-1">
                  {/* Circular Donut Gauge */}
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 76 76">
                      <defs>
                        <linearGradient id="focusRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38BDF8" />
                          <stop offset="100%" stopColor="#2563EB" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="38"
                        cy="38"
                        r="30"
                        stroke="#E0F2FE"
                        strokeWidth="5.5"
                        fill="transparent"
                      />
                      <circle
                        cx="38"
                        cy="38"
                        r="30"
                        stroke="url(#focusRingGrad)"
                        strokeWidth="5.5"
                        strokeDasharray="188.5"
                        strokeDashoffset="41.5"
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[15px] sm:text-[16px] font-black text-slate-900 leading-none">78%</span>
                      <span className="text-[9.5px] font-medium text-slate-400 mt-0.5 leading-none">Focus</span>
                    </div>
                  </div>

                  {/* Legend breakdown */}
                  <div className="flex-1 space-y-1.5 text-left pl-1">
                    <div className="flex items-center justify-between text-[11px] sm:text-[11.5px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        <span className="text-slate-600 font-medium">Focus</span>
                      </div>
                      <span className="text-slate-900 font-bold">78%</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] sm:text-[11.5px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                        <span className="text-slate-500 font-medium">Distraction</span>
                      </div>
                      <span className="text-slate-700 font-semibold">12%</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] sm:text-[11.5px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        <span className="text-slate-500 font-medium">Fatigue</span>
                      </div>
                      <span className="text-slate-700 font-semibold">10%</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* CARD 4: Brain Activity */}
              <Link
                to="/assessment"
                className="group relative block rounded-[26px] bg-white/85 hover:bg-white/95 backdrop-blur-xl border border-white/90 p-4 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_24px_rgba(37,99,235,0.06),0_2px_8px_rgba(15,23,42,0.02)] hover:shadow-[0_16px_32px_rgba(37,99,235,0.12)] ring-1 ring-black/[0.02] focus:outline-none"
                title="Brain Activity - Beta 14 Hz"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-blue-50/80 border border-blue-100 flex items-center justify-center text-slate-700">
                      <Activity className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                    <span className="text-[13px] font-bold text-slate-800 tracking-tight">Brain Activity</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>

                {/* Graphic + Metrics */}
                <div className="flex items-center justify-between gap-3 px-1 pt-0.5">
                  <div className="w-24 sm:w-28 h-16 sm:h-18 flex items-center justify-center">
                    <img 
                      src="/brain-activity-hd.png" 
                      alt="Beta Brain Activity" 
                      className="w-full h-full object-contain filter drop-shadow-[0_6px_18px_rgba(14,165,233,0.32)] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[12px] font-medium text-slate-500 leading-tight mb-0.5">Beta</div>
                    <div className="text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight">14 Hz</div>
                    <div className="w-16 h-1 bg-slate-100 rounded-full mt-1.5 ml-auto overflow-hidden">
                      <div className="w-4/5 h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE LIVE DSP SANDBOX & REGULATORY COMPLIANCE
         ========================================================================= */}
      <section className="relative px-6 sm:px-8 lg:px-12 py-12 border-b border-blue-100/50 bg-gradient-to-b from-transparent via-blue-50/25 to-transparent">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Section Subheading */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-blue-200/60 text-blue-700 text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Real-Time In-Browser Demonstration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Experience Biomarker Extraction Live
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Speak into your microphone or run a synthetic simulation. Observe instant sub-perceptual vocal micro-tremors, F0 frequency stability, and acoustic jitter analysis.
            </p>
          </div>

          {/* Interactive Sandbox Component */}
          <LiveVoiceBiomarkerSandbox />

          {/* Clinical Compliance & Security Standards Strip */}
          <div className="pt-2">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
              Clinical Governance, Ethical AI & Security Accreditations
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 text-center">
              
              <div className="bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-3.5 shadow-sm space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-slate-900 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>HIPAA Ready</span>
                </div>
                <p className="text-[11px] text-slate-500">Zero raw audio transmission</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-3.5 shadow-sm space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-slate-900 font-bold text-xs">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>GDPR Art. 9</span>
                </div>
                <p className="text-[11px] text-slate-500">Biometric privacy protection</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-3.5 shadow-sm space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-slate-900 font-bold text-xs">
                  <BrainCircuit className="w-4 h-4 text-indigo-600" />
                  <span>IEEE 7000 XAI</span>
                </div>
                <p className="text-[11px] text-slate-500">Ethical AI transparency</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-3.5 shadow-sm space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-slate-900 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>IEC 62304</span>
                </div>
                <p className="text-[11px] text-slate-500">Medical software lifecycle</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-3.5 shadow-sm space-y-1 col-span-2 md:col-span-1">
                <div className="flex items-center justify-center gap-1.5 text-slate-900 font-bold text-xs">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>FDA SaMD</span>
                </div>
                <p className="text-[11px] text-slate-500">Tier 1 Decision Support</p>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: PRODUCT (Voice & Behavior Multimodal Assessment Pipeline)
         ========================================================================= */}
      <section id="product" className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 border-b border-blue-100/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-14">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>Product Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Multimodal Biomarker Telemetry
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Nexora integrates dual-stream sensory inputs — synchronized acoustic prosody and affective facial Action Units — executing entirely client-side with complete privacy sandboxing.
            </p>
          </div>

          {/* Dual Stream Product Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Stream 1: Acoustic Prosody Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Acoustic Prosody Pipeline</h3>
                    <p className="text-xs text-slate-500">eGeMAPS standard • 44.1 kHz sampling</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                  Audio Stream
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Captures sub-perceptual vocal micro-tremors, pitch monotone flattenings, and glottal perturbation. In depressive episodes, vocal fold tension diminishes, inducing measurable jitter and fundamental frequency (F0) constriction.
              </p>

              {/* Dynamic waveform visualization */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500">Fundamental Pitch (F0)</span>
                  <span className="text-blue-600 font-bold">148.5 Hz • Modal Phonation</span>
                </div>
                <div className="h-10 flex items-end gap-1.5 px-2">
                  {[45, 75, 90, 60, 85, 40, 95, 65, 50, 80, 100, 70, 55, 85, 60, 45, 90, 70, 50].map((h, i) => (
                    <span 
                      key={i} 
                      style={{ height: `${h}%` }} 
                      className="flex-1 bg-gradient-to-t from-blue-600 to-sky-400 rounded-full animate-waveform" 
                    />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-mono text-slate-500">
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="block text-[10px] text-slate-400">Jitter (Local)</span>
                    <span className="font-bold text-slate-800">1.42%</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="block text-[10px] text-slate-400">Shimmer (APQ)</span>
                    <span className="font-bold text-slate-800">3.18%</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="block text-[10px] text-slate-400">Artic. Rate</span>
                    <span className="font-bold text-slate-800">4.1 syl/s</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                <span className="flex items-center gap-1 text-blue-600 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Zero raw audio stored
                </span>
                <span>DSP Latency: &lt;14ms</span>
              </div>
            </div>

            {/* Stream 2: Facial Behavioral Dynamics Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Facial Action Unit Tracker</h3>
                    <p className="text-xs text-slate-500">MediaPipe Vision • 468 Landmarks</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Visual Stream
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Extracts FACS (Facial Action Coding System) Action Units in real time. Tracks involuntary micro-expressions like Corrugator brow contraction (AU04) and Zygomatic smiling attenuation (AU12) along with gaze centering ratios.
              </p>

              {/* Action units live breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500">Affective AU Landmark Vector</span>
                  <span className="text-indigo-600 font-bold">Confidence: 98.4%</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-2xl border border-slate-100 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">AU04 Brow Lowerer</span>
                      <span className="font-bold text-slate-900">0.24 (Low)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full w-[24%]" />
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-slate-100 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">AU12 Lip Puller</span>
                      <span className="font-bold text-slate-900">0.71 (Normal)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full w-[71%]" />
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-slate-100 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Spontaneous Blinks</span>
                      <span className="font-bold text-slate-900">18 / min</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-[45%]" />
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-slate-100 space-y-1">
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

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                <span className="flex items-center gap-1 text-indigo-600 font-medium">
                  <Lock className="w-4 h-4" /> Edge-computed in memory
                </span>
                <span>Frame Rate: 30 FPS</span>
              </div>
            </div>

          </div>

          {/* Product Launch Assessment Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-left">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Live Interactive Assessment Tool
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Evaluate Your Wellbeing Session Now
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Experience our 3-minute guided assessment: respond to standardized neutral prompts while your browser locally extracts acoustic prosody and facial dynamics.
              </p>
            </div>

            <Link
              to="/assessment"
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 flex-shrink-0 group"
            >
              <span>Launch Assessment Setup</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>




      {/* =========================================================================
          SECTION 3: TECHNOLOGY (Explainable AI, SHAP & Signal Processing)
         ========================================================================= */}
      <section id="technology" className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 border-b border-blue-100/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-14">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>Explainable AI Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Transparent SHAP Biomarker Attribution
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              No black-box opacity. Nexora computes cooperative game-theoretic Shapley values (SHAP) for every acoustic parameter and facial action unit, giving clinicians complete interpretability into every prediction.
            </p>
          </div>

          {/* Technology 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base border border-blue-100">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base">DSP Acoustic Standardization</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Raw client-side audio frames are transformed into the standardized Geneva Minimalistic Acoustic Parameter Set (eGeMAPS) containing 88 clinical audio descriptors.
              </p>
              <div className="text-[11px] font-mono text-blue-600 font-semibold pt-1">
                openSMILE • Librosa
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base border border-indigo-100">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base">Client-Side MediaPipe Edge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Facial meshes and Action Units are computed using client-side WebAssembly models. Raw camera frames are immediately discarded without traversing the cloud.
              </p>
              <div className="text-[11px] font-mono text-indigo-600 font-semibold pt-1">
                MediaPipe • WASM
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-base border border-sky-100">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-base">Dual-Stream Fusion Model</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A multi-layer perceptron (MLP) and LightGBM ensemble fuses asynchronous temporal prosody vectors with spatial facial Action Unit statistics.
              </p>
              <div className="text-[11px] font-mono text-sky-600 font-semibold pt-1">
                LightGBM • MLP Ensemble
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
              <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-base border border-teal-100">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-base">Shapley Additive Attribution</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Each prediction displays an additive waterfall chart indicating exact positive and negative feature weights (e.g. +0.18 vocal jitter, -0.12 smile intensity).
              </p>
              <div className="text-[11px] font-mono text-teal-600 font-semibold pt-1">
                TreeSHAP • KernelSHAP
              </div>
            </div>

          </div>

          {/* Interactive Feature Attribution Demonstration Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-white shadow-nexora-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Live SHAP Biomarker Contribution Inspector</h3>
                <p className="text-xs text-slate-500">Sample feature attribution waterfall for Depression & Anxiety Screening</p>
              </div>
              <Link
                to="/explainable-ai"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full border border-blue-200/80 transition-colors self-start sm:self-auto"
              >
                <span>Inspect Full Mathematical Methodology</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature Bars */}
            <div className="space-y-4 max-w-4xl mx-auto pt-2">
              {[
                { name: 'Vocal Fundamental Pitch Variance (F0 SD)', val: '+0.21', type: 'prosody', pct: 85, dir: 'positive', note: 'Monotone prosody pushes score towards depressive risk' },
                { name: 'AU04 Brow Lowerer Furrow Duration', val: '+0.18', type: 'facial', pct: 72, dir: 'positive', note: 'Frequent involuntary brow furrow indicates cognitive distress' },
                { name: 'Spontaneous Eye Blink Rate (Elevated)', val: '+0.14', type: 'ocular', pct: 58, dir: 'positive', note: 'Acute somatic stress correlates with elevated blink rate' },
                { name: 'AU12 Lip Corner Smiling Puller', val: '-0.19', type: 'facial', pct: 76, dir: 'negative', note: 'Spontaneous smile engagement lowers clinical risk rating' },
                { name: 'Vocal Shimmer Amplitude Stability', val: '-0.15', type: 'prosody', pct: 60, dir: 'negative', note: 'Consistent subglottic breath support indicates vocal stability' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100/90 space-y-2 text-left">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-900">{item.name}</span>
                    <span className={`font-mono font-bold px-2 py-0.5 rounded-full text-[11px] ${
                      item.dir === 'positive' 
                        ? 'bg-rose-50 text-rose-700 border border-rose-100' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      SHAP {item.val}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
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
          </div>

        </div>
      </section>




      {/* =========================================================================
          SECTION 4: USE CASES (Clinical, Campus, Workplace & Analytics Dashboard)
         ========================================================================= */}
      <section id="use-cases" className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 border-b border-blue-100/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-14">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>Use Cases & Deployments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Designed for Real-World Healthcare
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Empowering psychiatric clinicians, university counseling centers, and wellness platforms with continuous, objective behavioral telemetry.
            </p>
          </div>

          {/* 4 Use Case Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Clinical Psychiatric Intake</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supplements standard self-assessment questionnaires (PHQ-9, GAD-7) with objective vocal and facial behavioral telemetry, reducing retrospective patient recall bias.
              </p>
              <div className="text-[11px] text-blue-600 font-semibold pt-1">
                Pre-Consultation Baseline
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Campus & Student Wellbeing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Non-stigmatizing, confidential check-ins for university students during academic exam periods, identifying early signs of burnout and emotional fatigue.
              </p>
              <div className="text-[11px] text-indigo-600 font-semibold pt-1">
                Student Cohort Monitoring
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">High-Stress Workplace Telemetry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continuous cognitive load monitoring for emergency personnel, software engineering teams, and high-reliability operations to prevent chronic exhaustion.
              </p>
              <div className="text-[11px] text-sky-600 font-semibold pt-1">
                Cognitive Load & Focus
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Longitudinal Patient Recovery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enables therapists to track acoustic modulation and smile intensity over weeks, providing verifiable evidence of therapeutic intervention response.
              </p>
              <div className="text-[11px] text-teal-600 font-semibold pt-1">
                Treatment Trajectory Curves
              </div>
            </div>

          </div>

          {/* Telemetry Dashboard Preview Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-white shadow-nexora-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Participant Telemetry Dashboard</h3>
                <p className="text-xs text-slate-500">Live cognitive wellness score & longitudinal historical tracking</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/history"
                  className="px-4 py-2 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Past Assessments
                </Link>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Open Full Dashboard</span>
                </Link>
              </div>
            </div>

            {/* Quick dashboard metrics row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Overall Emotional State</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">72%</span>
                  <span className="text-xs text-emerald-600 font-semibold">Calm & Balanced</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                  <div className="w-[72%] h-full bg-blue-600 rounded-full" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Cognitive Load Index</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">32%</span>
                  <span className="text-xs text-blue-600 font-semibold">Low Mental Strain</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                  <div className="w-[32%] h-full bg-blue-500 rounded-full" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Focus Concentration</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">78%</span>
                  <span className="text-xs text-indigo-600 font-semibold">High Focus State</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                  <div className="w-[78%] h-full bg-indigo-600 rounded-full" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Dominant Brainwave</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">Beta</span>
                  <span className="text-xs text-slate-500 font-medium">14.0 Hz Alertness</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                  <div className="w-[60%] h-full bg-teal-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>




      {/* =========================================================================
          SECTION 5: PRICING (Transparent Research & Institutional Access Tiers)
         ========================================================================= */}
      <section id="pricing" className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 border-b border-blue-100/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-14">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>Transparent Access</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Open Science & Clinical Plans
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Committed to open academic research. Free forever for students and university researchers, with scalable deployments for clinical centers and enterprise campuses.
            </p>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Tier 1: Student / Academic */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all flex flex-col justify-between text-left space-y-8">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                  Student & Academic
                </span>
                <div>
                  <div className="text-4xl font-extrabold text-slate-900">₹0</div>
                  <div className="text-xs text-slate-500 mt-1">Free forever for research & students</div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Ideal for students, psychology researchers, and academic evaluation projects.
                </p>

                <div className="pt-4 space-y-3 text-xs text-slate-700 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>In-browser microphone & camera recording</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Standard eGeMAPS acoustic vectors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Instant SHAP feature attribution waterfall</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Sample research datasets included</span>
                  </div>
                </div>
              </div>

              <Link
                to="/assessment"
                className="w-full py-3.5 text-center text-sm font-semibold rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors"
              >
                Start Free Assessment
              </Link>
            </div>

            {/* Tier 2: Clinician & Researcher Pro (Featured) */}
            <div className="relative bg-white rounded-3xl p-8 border-2 border-blue-600 shadow-2xl flex flex-col justify-between text-left space-y-8">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md">
                Most Popular
              </div>

              <div className="space-y-4 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700">
                  Clinician & Pro
                </span>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">₹2,499</span>
                    <span className="text-xs text-slate-500">/ practitioner / month</span>
                  </div>
                  <div className="text-xs text-blue-600 font-semibold mt-1">Free for accredited academic grant projects</div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineered for licensed psychologists, psychiatry clinics, and longitudinal research trials.
                </p>

                <div className="pt-4 space-y-3 text-xs text-slate-700 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Unlimited multimodal patient screenings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Export raw CSV & EDF acoustic/facial data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Longitudinal patient recovery trajectory curves</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Exportable clinical summary PDF reports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Direct priority clinical support</span>
                  </div>
                </div>
              </div>

              <Link
                to="/register"
                className="w-full py-3.5 text-center text-sm font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Request Practitioner Access</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tier 3: Institutional Campus Enterprise */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all flex flex-col justify-between text-left space-y-8">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                  Campus & Enterprise
                </span>
                <div>
                  <div className="text-4xl font-extrabold text-slate-900">Custom</div>
                  <div className="text-xs text-slate-500 mt-1">Multi-seat institutional licensing</div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Tailored for universities, hospital health networks, and employee mental wellness platforms.
                </p>

                <div className="pt-4 space-y-3 text-xs text-slate-700 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Cohort-wide student / employee onboarding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Custom SHAP biomarker calibration thresholds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Full HIPAA, FERPA, & GDPR compliance sandbox</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Canvas LMS, Epic EHR, & API integration</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenHelpline}
                className="w-full py-3.5 text-center text-sm font-semibold rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors"
              >
                Contact Institutional Team
              </button>
            </div>

          </div>

          {/* =========================================================================
              CLINICAL & PRACTITIONER FAQ ACCORDION
             ========================================================================= */}
          <div id="faq" className="pt-12 scroll-mt-24 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Frequently Asked Questions</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Clinical Science & Data Governance
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Answers to common clinical, ethical, and technical questions regarding Nexora's multimodal biomarker methodology.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = expandedFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white/90 backdrop-blur-md rounded-2xl border border-white shadow-sm overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                    >
                      <span className="font-semibold text-sm sm:text-base text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/70">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Integrated Crisis & Wellness Resources Banner */}
          <div className="rounded-3xl bg-rose-50/80 border border-rose-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-base">24/7 Mental Health Emergency & Crisis Support</h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  If you or someone you know is in distress or experiencing suicidal thoughts, help is available immediately. Connect with free, confidential crisis counselors 24 hours a day, 7 days a week.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                to="/wellness"
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs shadow-sm transition-colors"
              >
                Guided Wellness
              </Link>
              <button
                type="button"
                onClick={onOpenHelpline}
                className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm shadow-rose-600/20 transition-all flex items-center gap-1.5"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Call 988 Helpline</span>
              </button>
            </div>
          </div>

        </div>
      </section>




      {/* Interactive Platform Video Demo Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
                <h3 className="font-bold text-slate-900 text-base">Nexora Platform Simulation Overview</h3>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 text-center">
              <div className="relative aspect-video rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-8 text-white overflow-hidden shadow-inner">
                <div className="absolute inset-0 opacity-20 flex items-center justify-around pointer-events-none">
                  {[40, 70, 90, 60, 80, 45, 95, 75, 55, 85, 65, 45, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="w-2 bg-blue-400 rounded-full animate-waveform"
                    />
                  ))}
                </div>

                <div className="relative z-10 space-y-4 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/40">
                    <BrainCircuit className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold">Real-Time Cognitive Telemetry</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Watch Nexora synthesize vocal frequency acoustics, affective biomarker shifts, and real-time brainwave activity into explainable predictive models.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  to="/assessment"
                  onClick={() => setVideoModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch Live Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
