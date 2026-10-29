import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function PricingPage({ onOpenHelpline }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  return (
    <div className="min-h-screen w-full nexora-mesh-bg text-slate-900 pb-20 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Hero Header */}
      <section className="relative px-6 sm:px-8 lg:px-12 pt-12 pb-16 border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-sm text-xs font-semibold text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Transparent Access Plans</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Open Science & Clinical Tiers<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
              For Researchers, Clinics & Campuses
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Free forever for students and university research teams. Scalable enterprise deployments for counseling centers, hospitals, and wellness organizations.
          </p>

          {/* Billing Toggle */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
              Monthly Billing
            </span>
            <button
              type="button"
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-12 h-6 rounded-full bg-slate-200 transition-colors p-0.5 focus:outline-none"
            >
              <div
                className={`w-5 h-5 rounded-full bg-blue-600 transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-slate-900' : 'text-slate-500'}`}>
              Annual Billing
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Save 20%
              </span>
            </span>
          </div>

        </div>
      </section>

      {/* 3 Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-16">
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
                  <span className="text-4xl font-extrabold text-slate-900">
                    {billingCycle === 'annual' ? '₹1,999' : '₹2,499'}
                  </span>
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

      </section>

    </div>
  );
}

