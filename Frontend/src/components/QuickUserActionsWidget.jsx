import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquarePlus, 
  X, 
  Mail, 
  Star, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronUp 
} from 'lucide-react';

export default function QuickUserActionsWidget({ 
  onOpenEnquiry, 
  onOpenFeedback, 
  onOpenIssue 
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Popover Menu */}
      {open && (
        <div className="mb-3 w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/80 p-2.5 space-y-1.5 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <div className="px-3 py-1.5 flex items-center justify-between border-b border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">User Assistance</span>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              setOpen(false);
              onOpenEnquiry();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-blue-50/80 text-left transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-800">Send Enquiry</div>
              <div className="text-[10px] text-slate-500">Sales, demos & questions</div>
            </div>
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onOpenFeedback();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-amber-50/80 text-left transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-800">Give Feedback</div>
              <div className="text-[10px] text-slate-500">Rate & review platform</div>
            </div>
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onOpenIssue();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-rose-50/80 text-left transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-800">Report an Issue</div>
              <div className="text-[10px] text-slate-500">Bugs & telemetry glitches</div>
            </div>
          </button>

          <div className="pt-1 border-t border-slate-100">
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-slate-100 text-left transition-colors group"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Host Admin Portal</div>
                <div className="text-[10px] text-blue-600 font-medium">View telemetry & users →</div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-[0_8px_24px_rgba(15,23,42,0.25)] border border-slate-700/50 hover:scale-105 active:scale-95 transition-all text-xs font-semibold group cursor-pointer"
        title="Help, Feedback & Admin Portal"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <MessageSquarePlus className="w-4 h-4 text-blue-400" />
        <span className="hidden sm:inline">Feedback & Support</span>
        <ChevronUp className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}

