import React from 'react';
import { 
  X, 
  BrainCircuit, 
  Mic, 
  Video, 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  FileText,
  Clock,
  Download
} from 'lucide-react';
import FeatureAttributionChart from './FeatureAttributionChart';

export default function AssessmentReportModal({ assessment, isOpen, onClose }) {
  if (!isOpen || !assessment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-soft-lg border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {assessment.id}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                DEMONSTRATION SAMPLE
              </span>
            </div>
            <h3 id="report-modal-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
              Multimodal Explainable Assessment Report
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Recorded: {assessment.date} • Modality: {assessment.type}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close report modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          
          {/* Demonstration Warning Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-amber-900 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-xs">Simulated Academic Research Biomarkers</p>
              <p className="text-[11px] leading-relaxed text-amber-800">
                Values below are synthetic demonstration parameters designed to show how acoustic features (eGeMAPS) and facial behavior markers are interpreted via Explainable Machine Learning (SHAP). This is not a real psychological or psychiatric diagnosis.
              </p>
            </div>
          </div>

          {/* Top Score Summary Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-3.5 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
                Wellness Stability Index
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-teal-900 font-mono">
                  {assessment.compositeScore}
                </span>
                <span className="text-xs text-teal-700 font-medium">/ 100</span>
              </div>
              <span className="text-[10px] text-teal-700 mt-1">Stable prosodic & behavioral range</span>
            </div>

            <div className="bg-lavender-50/70 border border-lavender-100 rounded-xl p-3.5 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-lavender-800 uppercase tracking-wider">
                Modality Coverage
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-lavender-900 truncate">
                  {assessment.type.split('(')[0]}
                </span>
              </div>
              <span className="text-[10px] text-lavender-700 mt-1">Acoustic & visual feature synchronization</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                Assessment Status
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-800 text-xs">Verified Frontend Demo</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Pipeline validation complete</span>
            </div>
          </div>

          {/* Clinical Rationale Summary */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Automated Observational Summary (Demo)
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs">
              {assessment.summary}
            </p>
          </div>

          {/* Biomarker Extraction Panels: Voice vs Video */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Acoustic Features */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-soft-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <Mic className="w-4 h-4 text-teal-600" />
                  Acoustic Biomarkers (eGeMAPS)
                </span>
                <span className="text-[10px] font-mono text-slate-400">Audio Stream</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Fundamental Pitch (Mean F0):</span>
                  <span className="font-mono font-semibold text-slate-800">{assessment.acousticFeatures?.meanF0 || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Frequency Jitter (Perturbation):</span>
                  <span className="font-mono font-semibold text-slate-800">{assessment.acousticFeatures?.pitchJitter || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Amplitude Shimmer:</span>
                  <span className="font-mono font-semibold text-slate-800">{assessment.acousticFeatures?.shimmer || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Speech Articulation Rate:</span>
                  <span className="font-mono font-semibold text-slate-800">{assessment.acousticFeatures?.speakingRate || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Hesitation Latency Occurrences:</span>
                  <span className="font-mono font-semibold text-slate-800">{assessment.acousticFeatures?.vocalHesitationCount ?? 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Facial Behavioral Features */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-soft-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <Video className="w-4 h-4 text-lavender-600" />
                  Facial & Gaze Biomarkers
                </span>
                <span className="text-[10px] font-mono text-slate-400">Visual Stream</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Spontaneous Blink Frequency:</span>
                  <span className="font-mono font-semibold text-slate-800">{assessment.visualFeatures?.blinkRate || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Head Pose Orientation Stability:</span>
                  <span className="font-mono font-semibold text-slate-800">{assessment.visualFeatures?.headPoseStability || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Frontal Eye Gaze Centering:</span>
                  <span className="font-mono font-semibold text-slate-800">{assessment.visualFeatures?.eyeGazeConsistency || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Activated Action Units:</span>
                  <span className="font-mono font-semibold text-slate-800 truncate max-w-[170px] text-right">
                    {assessment.visualFeatures?.actionUnits || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Explainable AI SHAP Attribution Chart */}
          <FeatureAttributionChart data={assessment.shapContributions} />

        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            AuraMind B.Tech Research Prototype • Feature Attribution Engine
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Export View</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
