import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BrainCircuit, 
  Mic, 
  Video, 
  Activity, 
  Calendar, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  HeartHandshake, 
  HelpCircle, 
  Printer, 
  Download,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import FeatureAttributionChart from '../components/FeatureAttributionChart';
import DemoDataBanner from '../components/DemoDataBanner';
import EmptyState from '../components/EmptyState';
import { WELLNESS_RESOURCES } from '../data/sampleAssessments';

export default function AssessmentResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssessmentById } = useAssessment();

  const assessment = getAssessmentById(id);

  // If unknown assessment ID, show clean not-found state
  if (!assessment) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          title={`Assessment "${id}" Not Found`}
          description="The requested assessment record does not exist in the research sample database or may have been cleared."
          actionText="View Assessment History"
          actionLink="/history"
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/dashboard" className="hover:text-teal-700">Dashboard</Link>
            <span>/</span>
            <Link to="/history" className="hover:text-teal-700">Assessment History</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{assessment.id}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Assessment Results & Biomarker Attribution
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-100 text-teal-800">
              {assessment.id}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Recorded: {assessment.date}</span>
            <span>•</span>
            <span>Modality: {assessment.type}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/history"
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All History</span>
          </Link>

          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Mandatory Demo Data Banner */}
      <DemoDataBanner
        title="DEMO DATA — NOT A REAL ASSESSMENT"
        message="This evaluation was generated using fixed illustrative parameters for undergraduate B.Tech engineering evaluation. It does not reflect a real individual's mental health status or clinical diagnosis."
      />

      {/* Risk Indicator Presentation & Score Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Composite Stability */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Synthesized Stability Index
          </span>
          <div className="my-2">
            <div className="text-3xl font-extrabold text-teal-900 font-mono">
              {assessment.compositeScore}
              <span className="text-sm font-normal text-slate-400"> / 100</span>
            </div>
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
              Mild Baseline Variation
            </span>
          </div>
          <span className="text-[10px] text-slate-400 border-t border-slate-100 pt-2 block">
            Normalized across eGeMAPS acoustic distribution
          </span>
        </div>

        {/* Confidence & Uncertainty */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Model Uncertainty & Confidence
          </span>
          <div className="my-2">
            <div className="text-2xl font-bold text-slate-900 font-mono">
              ±4.2% <span className="text-xs font-normal text-slate-500">Margin</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Confidence Estimate: <strong>87.4%</strong> (Illustrative)
            </p>
          </div>
          <span className="text-[10px] text-amber-700 border-t border-slate-100 pt-2 block flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-500" />
            Subject to acoustic ambient noise
          </span>
        </div>

        {/* Verification Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Data Quality & Pipeline
          </span>
          <div className="my-2">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full Pipeline Synchronized</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Audio frames: 100% • Visual frames: 100%
            </p>
          </div>
          <span className="text-[10px] text-slate-400 border-t border-slate-100 pt-2 block">
            Frontend demonstration artifact
          </span>
        </div>

      </div>

      {/* Observational Rationale Summary */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-2">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Automated Observational Rationale</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {assessment.summary}
        </p>
      </div>

      {/* Acoustic & Facial Biomarker Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Acoustic Summary */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Mic className="w-4 h-4 text-teal-600" />
              Acoustic Biomarkers (eGeMAPS)
            </span>
            <span className="text-[10px] font-mono text-slate-400">Audio Set</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Fundamental Pitch (Mean F0):</span>
              <span className="font-mono font-bold text-slate-900">{assessment.acousticFeatures?.meanF0 || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Frequency Jitter (Vocal Micro-Perturbation):</span>
              <span className="font-mono font-bold text-slate-900">{assessment.acousticFeatures?.pitchJitter || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Amplitude Shimmer:</span>
              <span className="font-mono font-bold text-slate-900">{assessment.acousticFeatures?.shimmer || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Articulation Rate:</span>
              <span className="font-mono font-bold text-slate-900">{assessment.acousticFeatures?.speakingRate || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Speech Hesitation Latencies:</span>
              <span className="font-mono font-bold text-slate-900">{assessment.acousticFeatures?.vocalHesitationCount ?? 'N/A'} pauses</span>
            </div>
          </div>
        </div>

        {/* Behavioral Summary */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Video className="w-4 h-4 text-lavender-600" />
              Facial & Visual Markers
            </span>
            <span className="text-[10px] font-mono text-slate-400">Visual Set</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Spontaneous Blink Frequency:</span>
              <span className="font-mono font-bold text-slate-900">{assessment.visualFeatures?.blinkRate || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Head Pose Orientation Stability:</span>
              <span className="font-mono font-bold text-slate-900">{assessment.visualFeatures?.headPoseStability || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Frontal Eye Contact Centering:</span>
              <span className="font-mono font-bold text-slate-900">{assessment.visualFeatures?.eyeGazeConsistency || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Observed Action Units:</span>
              <span className="font-mono font-bold text-slate-900 text-right truncate max-w-[200px]">
                {assessment.visualFeatures?.actionUnits || 'N/A'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* SHAP Explanation Chart */}
      <div className="space-y-2">
        <FeatureAttributionChart data={assessment.shapContributions} />
      </div>

      {/* Uncertainty, Limitations & Clinical Governance */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-4 border border-slate-800">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Biomarker Uncertainty & Limitations</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Biomarkers derived from vocal prosody and video are sensitive to environment (background acoustics, room illumination, camera angles) and transient physiological states (vocal fatigue, physical exhaustion, allergies). Feature importance reflects <strong>mathematical model contribution</strong>, not absolute proof of clinical depression or anxiety.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-800">
          <span>Non-Diagnostic Prototype</span>
          <span>•</span>
          <span>Shapley Game-Theoretic Formulation</span>
          <span>•</span>
          <Link to="/explainable-ai" className="text-teal-400 hover:underline">
            Read Full Explainability Framework →
          </Link>
        </div>
      </div>

      {/* Suggested Wellness Recommendations */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Evidence-Based Recommendations for This Session
            </h3>
            <p className="text-xs text-slate-500">
              Gentle restorative practices to support nervous system regulation
            </p>
          </div>

          <Link
            to="/wellness"
            className="text-xs font-semibold text-teal-700 hover:underline"
          >
            View All Wellness Guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WELLNESS_RESOURCES.slice(0, 2).map((res) => (
            <div key={res.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                {res.category} • {res.duration}
              </span>
              <h4 className="font-bold text-sm text-slate-900">{res.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{res.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Link
          to="/history"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to All Assessment History</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          <Link
            to="/assessment"
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Record Another Assessment
          </Link>
        </div>
      </div>

    </div>
  );
}
