import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  GraduationCap, 
  Building2, 
  Activity, 
  ArrowRight, 
  BarChart3, 
  Clock, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export default function UseCasesPage() {
  return (
    <div className="min-h-screen w-full nexora-mesh-bg text-slate-900 pb-20 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Hero Header */}
      <section className="relative px-6 sm:px-8 lg:px-12 pt-12 pb-16 border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-sm text-xs font-semibold text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Real-World Healthcare Deployments</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Objective Cognitive Telemetry<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
              For Healthcare, Campuses & Teams
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering longitudinal affective telemetry to empower psychiatric practitioners, university counseling centers, and demanding workplace operations.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-full bg-[#0B0F19] hover:bg-slate-800 text-white font-medium text-sm sm:text-base shadow-lg shadow-slate-950/15 flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span>Launch Live Dashboard</span>
            </Link>

            <Link
              to="/history"
              className="px-8 py-4 rounded-full bg-white/90 hover:bg-white text-slate-800 font-medium text-sm sm:text-base border border-slate-200/80 shadow-sm transition-all flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-slate-500" />
              <span>View Assessment History</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Use Cases Cards */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">Clinical & Psychiatric Screening</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Provides psychiatrists and licensed therapists with objective acoustic and facial biomarker baselines before clinical consultation. Reduces diagnostic recall bias and highlights quantifiable changes in speech prosody.
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs text-blue-600 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Pre-Intake Affective Screening
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">Campus & Student Mental Health</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Provides universities and college counseling centers with non-intrusive wellness screening for students during high-stress exam periods. Enables early intervention before clinical crises emerge.
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs text-indigo-600 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Confidential Student Cohort Onboarding
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">High-Stress Workplace Telemetry</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tracks cognitive load and vocal strain for emergency service dispatchers, aviation crews, and software development teams to prevent cumulative burnout and cognitive exhaustion.
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs text-sky-600 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Real-time Cognitive Strain Telemetry
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white shadow-nexora-card hover:shadow-nexora-hover transition-all space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">Longitudinal Therapy Recovery</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Allows clinical practitioners to visualize longitudinal recovery curves over weeks and months of cognitive-behavioral therapy or pharmacotherapy, offering objective progress data to patients.
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs text-teal-600 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Multi-Week Outcome Verification
            </div>
          </div>

        </div>

        {/* Dashboard Preview Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white shadow-nexora-card space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h3 className="font-bold text-xl text-slate-900">Live Cognitive Telemetry Dashboard</h3>
              <p className="text-xs text-slate-500">Real-time mental wellness metrics, emotional state trends, and historical logs</p>
            </div>
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Access Participant Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Overall Emotional State</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">72%</span>
                <span className="text-xs text-emerald-600 font-semibold">Calm & Balanced</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                <div className="w-[72%] h-full bg-blue-600 rounded-full" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Cognitive Load Index</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">32%</span>
                <span className="text-xs text-blue-600 font-semibold">Low Mental Strain</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                <div className="w-[32%] h-full bg-blue-500 rounded-full" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Focus Concentration</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">78%</span>
                <span className="text-xs text-indigo-600 font-semibold">High Focus State</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                <div className="w-[78%] h-full bg-indigo-600 rounded-full" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
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

      </section>

    </div>
  );
}

