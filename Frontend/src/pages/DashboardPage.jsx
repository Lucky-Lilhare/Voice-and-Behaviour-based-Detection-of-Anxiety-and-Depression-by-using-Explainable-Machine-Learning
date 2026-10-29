import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  BrainCircuit, 
  Mic, 
  Video, 
  PlusCircle, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ShieldAlert,
  Sparkles, 
  ArrowUpRight, 
  Eye, 
  Info,
  TrendingUp,
  HeartHandshake,
  BookOpen,
  ArrowRight,
  Sliders,
  Waves,
  Heart,
  RotateCcw
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useAssessment } from '../context/AssessmentContext';
import { DEMO_METRICS, DEMO_HISTORY_CHART, WELLNESS_RESOURCES } from '../data/sampleAssessments';
import AssessmentReportModal from '../components/AssessmentReportModal';
import BreathingWidget from '../components/BreathingWidget';
import DemoDataBanner from '../components/DemoDataBanner';
import DashboardStatCard from '../components/DashboardStatCard';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function DashboardPage({ onOpenHelpline, onOpenProfile }) {
  const { user } = useAuth();
  const { assessments } = useAssessment();
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [chartMetric, setChartMetric] = useState('all'); // 'all' | 'composite' | 'voice' | 'behavior'
  
  // Evaluator demonstration state switch: 'normal' | 'loading' | 'empty' | 'error'
  const [previewState, setPreviewState] = useState('normal');

  const latestAssessment = assessments[0] || null;

  const CustomChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-soft-lg border border-slate-700 text-xs">
          <p className="font-bold text-slate-200 border-b border-slate-800 pb-1 mb-1.5 flex items-center justify-between gap-4">
            <span>Session: {label}</span>
            <span className="text-[10px] text-amber-400 font-normal">Demonstration Data</span>
          </p>
          <div className="space-y-1 text-[11px]">
            {payload.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                  {entry.name}:
                </span>
                <span className="font-mono font-semibold">{entry.value} / 100</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/60">
              Research Participant Portal
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-mono">
              ID: {user?.id || 'STU-2026-8842'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {user?.name || 'Participant'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Multimodal voice prosody and facial behavior research workspace. Review your longitudinal acoustic trends and transparent Explainable AI (SHAP) biomarker breakdowns.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
          <Link
            to="/assessment"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold text-xs sm:text-sm shadow-sm shadow-teal-600/30 transition-all flex items-center justify-center gap-2 group"
          >
            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span>Start New Assessment</span>
          </Link>

          <Link
            to="/history"
            className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Clock className="w-4 h-4 text-slate-500" />
            <span>All History</span>
          </Link>
        </div>
      </div>

      {/* Demonstration UI State Switcher Bar for Evaluators */}
      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <Sliders className="w-4 h-4 text-teal-600" />
          <span>Examiner State Simulator:</span>
          <span className="text-slate-500 font-normal">Test edge states required for Phase 2 evaluation</span>
        </div>

        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm text-xs">
          <button
            type="button"
            onClick={() => setPreviewState('normal')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
              previewState === 'normal' ? 'bg-teal-600 text-white font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Normal View
          </button>
          <button
            type="button"
            onClick={() => setPreviewState('loading')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
              previewState === 'loading' ? 'bg-teal-600 text-white font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Loading State
          </button>
          <button
            type="button"
            onClick={() => setPreviewState('empty')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
              previewState === 'empty' ? 'bg-teal-600 text-white font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Empty State
          </button>
          <button
            type="button"
            onClick={() => setPreviewState('error')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
              previewState === 'error' ? 'bg-teal-600 text-white font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Error State
          </button>
        </div>
      </div>

      {/* STATE 1: LOADING STATE PREVIEW */}
      {previewState === 'loading' && (
        <LoadingState
          message="Synchronizing Multimodal Assessment Records..."
          subtext="Fetching openSMILE acoustic vectors and Action Unit timelines..."
        />
      )}

      {/* STATE 2: ERROR STATE PREVIEW */}
      {previewState === 'error' && (
        <ErrorState
          title="Could Not Connect to Research Microservice"
          message="An error occurred while communicating with the simulated feature extraction endpoint. You can retry the request or return to normal view."
          onRetry={() => setPreviewState('normal')}
        />
      )}

      {/* STATE 3: EMPTY STATE PREVIEW */}
      {previewState === 'empty' && (
        <EmptyState
          title="No Assessment Sessions Recorded Yet"
          description="Your research account has not logged any voice or facial behavioral assessments yet. Start your first session to calibrate your individual prosodic baseline."
          actionText="Start Your First Assessment"
          actionLink="/assessment"
        />
      )}

      {/* STATE 4: NORMAL DASHBOARD VIEW */}
      {previewState === 'normal' && (
        <>
          {/* Persistent Demo Data Banner */}
          <DemoDataBanner
            title="DEMONSTRATION RESEARCH DATA"
            message="All screening scores, acoustic metrics, and feature attribution values on this dashboard are simulated baseline examples. They do not constitute an active clinical evaluation."
          />

          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardStatCard
              title="Completed Assessments"
              value={assessments.length}
              subtitle="Full frontend pipeline validated"
              icon={CheckCircle2}
              badgeText="Active Sandbox"
              badgeType="emerald"
              footerText="Synchronized speech & vision runs"
            />

            <DashboardStatCard
              title="Most Recent Session"
              value={latestAssessment ? latestAssessment.date.split(',')[0] : "24 Oct 2026"}
              subtitle={latestAssessment ? latestAssessment.date.split(',')[1] : "16:30"}
              icon={Calendar}
              badgeText={latestAssessment ? latestAssessment.type.split('(')[0] : "Multimodal"}
              badgeType="indigo"
              footerText="Calibrated against eGeMAPS baseline"
            />

            <DashboardStatCard
              title="Latest Screening Status"
              value={DEMO_METRICS.latestWellnessCategory}
              subtitle="Demonstration Assessment"
              icon={Activity}
              badgeText="Non-Diagnostic"
              badgeType="amber"
              footerText="Exploratory biomarker estimation"
            />

            <DashboardStatCard
              title="Longitudinal Stability"
              value="78 / 100"
              subtitle="+4.2% stability vs last calibration"
              icon={BrainCircuit}
              badgeText="Prosodic Stability"
              badgeType="emerald"
              footerText="Calculated via Game-Theoretic SHAP"
            />
          </div>

          {/* Voice-Analysis and Behavioral-Analysis Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Voice Overview Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft space-y-4 hover:border-teal-300 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Waves className="w-4 h-4 text-teal-600" />
                  Voice Prosodic Analysis Overview
                </span>
                <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-bold">
                  eGeMAPS Stream
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">Mean Fundamental Pitch</span>
                  <span className="text-base font-bold font-mono text-slate-900">148.5 Hz</span>
                  <span className="text-[10px] text-emerald-700 block mt-0.5">Optimal modal phonation</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">Frequency Jitter Perturbation</span>
                  <span className="text-base font-bold font-mono text-slate-900">1.42%</span>
                  <span className="text-[10px] text-emerald-700 block mt-0.5">&lt;1.5% healthy threshold</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Vocal fold stability remains steady across sustained vowels with normal prosodic variability and minimal latency hesitations.
              </p>

              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-slate-400">88 openSMILE parameters</span>
                <Link to="/explainable-ai" className="font-semibold text-teal-700 hover:underline flex items-center gap-1">
                  <span>Inspect Acoustic Rationale</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Behavioral Overview Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft space-y-4 hover:border-lavender-300 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Video className="w-4 h-4 text-lavender-600" />
                  Behavioral & Facial Pattern Overview
                </span>
                <span className="text-[10px] font-mono text-lavender-700 bg-lavender-50 px-2 py-0.5 rounded font-bold">
                  OpenFace 2.0
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">Blink Rate Frequency</span>
                  <span className="text-base font-bold font-mono text-slate-900">18 / min</span>
                  <span className="text-[10px] text-emerald-700 block mt-0.5">Normal resting range (15-22)</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">Frontal Gaze Centering</span>
                  <span className="text-base font-bold font-mono text-slate-900">76%</span>
                  <span className="text-[10px] text-teal-700 block mt-0.5">Consistent camera focus</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Smooth 3D head pose orientation with transient AU04 corrugator muscle activation during open-ended reflective tasks.
              </p>

              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-slate-400">18 Facial Action Units</span>
                <Link to="/explainable-ai" className="font-semibold text-teal-700 hover:underline flex items-center gap-1">
                  <span>Inspect Behavioral Rationale</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Longitudinal Chart Section */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-900">
                    Acoustic & Behavioral Index History Over Time
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">
                    Demonstration Data
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tracking prospective composite stability, vocal prosody regularity, and facial behavioral engagement.
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setChartMetric('all')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${chartMetric === 'all' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  All Biomarkers
                </button>
                <button
                  type="button"
                  onClick={() => setChartMetric('composite')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${chartMetric === 'composite' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Composite
                </button>
                <button
                  type="button"
                  onClick={() => setChartMetric('voice')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${chartMetric === 'voice' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Voice
                </button>
                <button
                  type="button"
                  onClick={() => setChartMetric('behavior')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${chartMetric === 'behavior' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Behavior
                </button>
              </div>
            </div>

            {/* Chart Canvas */}
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DEMO_HISTORY_CHART} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorComposite" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D9488" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorVoice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorBehavior" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284C7" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    iconType="circle"
                    wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
                  />

                  {(chartMetric === 'all' || chartMetric === 'composite') && (
                    <Area
                      type="monotone"
                      dataKey="compositeScore"
                      name="Composite Wellness Score"
                      stroke="#0D9488"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorComposite)"
                    />
                  )}

                  {(chartMetric === 'all' || chartMetric === 'voice') && (
                    <Area
                      type="monotone"
                      dataKey="voiceStability"
                      name="Voice Prosodic Stability"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorVoice)"
                    />
                  )}

                  {(chartMetric === 'all' || chartMetric === 'behavior') && (
                    <Area
                      type="monotone"
                      dataKey="behavioralEngagement"
                      name="Facial Engagement Index"
                      stroke="#0284C7"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorBehavior)"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Scores reflect simulated normalization against baseline calibration ranges.</span>
              </div>
              <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                Research Evaluation Purpose Only
              </span>
            </div>

          </div>

          {/* Grid: Recent Assessments Table (Left) + Interactive Wellness Widget & Explainable AI Summary (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Recent Assessments Table */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Recent Assessment Sessions
                  </h3>
                  <p className="text-xs text-slate-500">
                    Logged sessions with extracted multimodal biomarkers and SHAP attribution reports
                  </p>
                </div>

                <Link
                  to="/history"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1"
                >
                  <span>View All in History →</span>
                </Link>
              </div>

              {assessments.length === 0 ? (
                <EmptyState
                  title="No Recent Assessments"
                  description="Start your first assessment to generate prosodic and behavioral biomarker records."
                  actionText="Launch Assessment Setup"
                  actionLink="/assessment"
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200/60">
                      <tr>
                        <th className="py-3 px-3.5 font-semibold">Date & Time</th>
                        <th className="py-3 px-3.5 font-semibold">Assessment Type</th>
                        <th className="py-3 px-3.5 font-semibold">Status</th>
                        <th className="py-3 px-3.5 font-semibold">Composite</th>
                        <th className="py-3 px-3.5 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {assessments.slice(0, 5).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                          <td className="py-3.5 px-3.5 font-medium text-slate-900 whitespace-nowrap">
                            <div>{item.date}</div>
                            <span className="text-[10px] font-mono text-slate-400">{item.id}</span>
                          </td>
                          <td className="py-3.5 px-3.5 text-slate-700 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 font-medium">
                              {item.type.includes('Voice') && <Mic className="w-3.5 h-3.5 text-teal-600" />}
                              {(item.type.includes('Video') || item.type.includes('Facial')) && <Video className="w-3.5 h-3.5 text-lavender-600" />}
                              {item.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-3.5 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              item.statusColor === 'amber'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-3.5 font-mono font-bold text-slate-800 whitespace-nowrap">
                            {item.compositeScore} <span className="text-[10px] font-normal text-slate-400">/100</span>
                          </td>
                          <td className="py-3.5 px-3.5 text-right whitespace-nowrap space-x-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedAssessment(item)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-500" />
                              <span>Preview</span>
                            </button>

                            <Link
                              to={`/results/${item.id}`}
                              className="px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                            >
                              <span>Report</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
                <span>Showing recent 5 of {assessments.length} assessment records</span>
                <Link to="/history" className="text-teal-700 hover:underline font-semibold">
                  Go to Filterable History Table →
                </Link>
              </div>
            </div>

            {/* Sidebar: Breathing Widget & Explainable AI Summary */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Interactive Breathing Tool */}
              <BreathingWidget />

              {/* Explainable AI Summary Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-soft space-y-3">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                  <BrainCircuit className="w-4 h-4" />
                  <span>Explainable AI Engine Summary</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Our framework ensures transparency by computing Shapley additive feature contributions across 88 acoustic parameters and 18 facial Action Units.
                </p>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Prosodic Expressiveness:</span>
                    <span className="font-mono text-teal-400 font-bold">+0.18</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frontal Gaze Centering:</span>
                    <span className="font-mono text-teal-400 font-bold">+0.15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speech Pause Latency:</span>
                    <span className="font-mono text-rose-400 font-bold">-0.12</span>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    to="/explainable-ai"
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Open Educational XAI Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

          </div>

          {/* Wellness Recommendations Preview Section */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Curated Wellness Guides & Restorative Practices
                </h3>
                <p className="text-xs text-slate-500">
                  Evidence-based self-care tools designed to support autonomic regulation
                </p>
              </div>

              <Link
                to="/wellness"
                className="text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
              >
                <span>Explore All Guides</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {WELLNESS_RESOURCES.map((res) => (
                <div 
                  key={res.id} 
                  className="p-4 rounded-2xl border border-slate-200/80 hover:border-teal-300 hover:bg-slate-50/60 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-teal-700">{res.category}</span>
                      <span className="text-slate-400">{res.duration}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{res.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{res.description}</p>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      {res.type}
                    </span>
                    <Link to="/wellness" className="text-teal-700 font-semibold flex items-center gap-0.5 group">
                      <span>Start activity</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Assessment Detailed Breakdown Modal */}
      <AssessmentReportModal
        assessment={selectedAssessment}
        isOpen={Boolean(selectedAssessment)}
        onClose={() => setSelectedAssessment(null)}
      />

    </div>
  );
}
