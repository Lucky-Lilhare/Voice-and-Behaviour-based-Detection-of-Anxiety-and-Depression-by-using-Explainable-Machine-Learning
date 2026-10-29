import React from 'react';
import { X, PhoneCall, ShieldAlert, HeartHandshake, ExternalLink, Clock } from 'lucide-react';
import { CRISIS_HELPLINES } from '../data/sampleAssessments';

export default function CrisisHelplineModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-xl rounded-2xl shadow-soft-lg border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="crisis-helpline-title"
      >
        {/* Modal Header */}
        <div className="bg-rose-50/80 border-b border-rose-100 p-5 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 id="crisis-helpline-title" className="text-base font-bold text-slate-900">
                Immediate Mental Health & Crisis Helplines
              </h3>
              <p className="text-xs text-rose-700 mt-0.5">
                Free, confidential, and professional support available 24/7
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 text-amber-900 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              If you or someone you know is in acute distress, experiencing thoughts of self-harm, or feeling overwhelmed, please reach out to one of the trusted support services below immediately. You are not alone.
            </p>
          </div>

          <div className="space-y-3">
            {CRISIS_HELPLINES.map((line, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-slate-50/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{line.name}</h4>
                  <p className="text-[11px] text-slate-500">{line.note}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-teal-700">
                      <Clock className="w-3 h-3 text-teal-600" /> {line.available}
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:${line.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm flex-shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call {line.phone.split('/')[0].trim()}</span>
                </a>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-slate-500 text-[11px] border border-slate-200">
            <strong>B.Tech Project Notice:</strong> AuraMind is an experimental research project and does not provide clinical intervention. Emergency links above connect to real licensed national support organizations.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
