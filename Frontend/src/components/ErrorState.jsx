import React from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ErrorState({
  title = "Something Went Wrong",
  message = "An error occurred while loading this research record or view.",
  onRetry = null,
}) {
  return (
    <div className="bg-white rounded-3xl border border-rose-200/80 p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto shadow-soft">
      <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
        <AlertCircle className="w-7 h-7" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold text-slate-800">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          {message}
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Action</span>
          </button>
        )}

        <Link
          to="/dashboard"
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors shadow-soft-sm inline-flex items-center gap-2"
        >
          <Home className="w-3.5 h-3.5 text-slate-400" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
