import React from 'react';
import { Inbox, PlusCircle, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  title = "No Records Found",
  description = "No assessment records match the current criteria or none have been logged yet.",
  actionText = "Start New Assessment",
  actionLink = "/assessment",
  onActionClick = null,
  icon: Icon = Inbox,
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto shadow-soft">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mx-auto">
        <Icon className="w-7 h-7" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold text-slate-800">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-2 flex items-center justify-center gap-3">
        {onActionClick ? (
          <button
            type="button"
            onClick={onActionClick}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{actionText}</span>
          </button>
        ) : actionLink ? (
          <Link
            to={actionLink}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{actionText}</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
