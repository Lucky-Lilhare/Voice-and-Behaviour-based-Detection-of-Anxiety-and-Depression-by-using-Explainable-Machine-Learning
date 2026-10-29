import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  PhoneCall, 
  Clock, 
  ShieldAlert, 
  Users, 
  ArrowLeft, 
  ExternalLink,
  MessageSquare,
  Lock
} from 'lucide-react';
import { CRISIS_HELPLINES } from '../data/sampleAssessments';

export default function CrisisSupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/dashboard" className="hover:text-teal-700">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Immediate Support</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Crisis Support & Mental Health Helplines
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Free, confidential, and professional assistance available around the clock
          </p>
        </div>

        <Link
          to="/dashboard"
          className="self-start sm:self-auto px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Immediate Empathy & Emergency Callout */}
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-rose-800 font-bold text-sm uppercase tracking-wider">
          <HeartHandshake className="w-5 h-5 text-rose-600" />
          <span>You Do Not Have to Walk Through This Alone</span>
        </div>
        <p className="text-xs sm:text-sm text-rose-950 leading-relaxed max-w-2xl">
          If you are experiencing overwhelming sadness, unbearable emotional pain, anxiety, or thoughts of harming yourself, please know that compassionate human support is available right now. 
        </p>
        <p className="text-xs text-rose-800 font-medium">
          Support does not depend on any test score or algorithm. Everyone deserves empathy, dignity, and prompt care.
        </p>
      </div>

      {/* Verified Helplines Directory */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Verified National & International Crisis Lines
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {CRISIS_HELPLINES.map((line, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft hover:border-teal-300 hover:shadow-soft-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {line.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    Verified Resource
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  {line.note}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 text-teal-700 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    {line.available}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Lock className="w-3 h-3 text-slate-400" />
                    100% Confidential
                  </span>
                </div>
              </div>

              <a
                href={`tel:${line.phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm flex-shrink-0 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {line.phone.split('/')[0].trim()}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* General Wellness vs Emergency Clarification */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-3 text-xs text-slate-600 leading-relaxed">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Distinguishing General Wellness from Immediate Emergency Services</span>
        </h3>
        <p>
          AuraMind is an academic research platform and <strong>cannot respond to crisis situations or provide clinical emergency triage</strong>. If you or someone around you is in immediate physical danger, please contact your local emergency response service (such as 112 in India, 911 in North America, or 999 in the UK) or proceed to the nearest hospital emergency department.
        </p>
      </div>

    </div>
  );
}
