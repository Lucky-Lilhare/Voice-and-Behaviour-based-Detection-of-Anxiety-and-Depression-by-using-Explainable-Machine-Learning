import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({
  message = "Loading research biomarker records...",
  subtext = "Calibrating prosodic and facial feature models..."
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-4 max-w-lg mx-auto shadow-soft my-8">
      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto animate-spin">
        <Loader2 className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm sm:text-base font-bold text-slate-800">
          {message}
        </h3>
        <p className="text-xs text-slate-500 font-mono">
          {subtext}
        </p>
      </div>

      <div className="w-32 h-1.5 bg-slate-100 rounded-full mx-auto overflow-hidden">
        <div className="w-full h-full bg-teal-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
