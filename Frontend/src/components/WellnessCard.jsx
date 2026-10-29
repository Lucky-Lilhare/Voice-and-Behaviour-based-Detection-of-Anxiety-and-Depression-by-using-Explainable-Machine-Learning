import React, { useState } from 'react';
import { Clock, CheckCircle2, Circle, ChevronRight, Sparkles, BookOpen } from 'lucide-react';

export default function WellnessCard({
  resource,
  isCompleted = false,
  onToggleComplete = null,
  onOpenGuide = null,
}) {
  return (
    <div 
      className={`bg-white rounded-2xl border p-5 shadow-soft transition-all flex flex-col justify-between space-y-4 ${
        isCompleted 
          ? 'border-emerald-300 bg-emerald-50/20 shadow-none' 
          : 'border-slate-200/90 hover:border-teal-300 hover:shadow-soft-hover'
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-0.5 rounded-full">
            {resource.category}
          </span>
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{resource.duration}</span>
          </span>
        </div>

        <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
          {resource.title}
        </h4>

        <p className="text-xs text-slate-600 leading-relaxed">
          {resource.description}
        </p>

        {resource.instructions && (
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-1">
            <span className="font-semibold text-slate-700 block">Guidance Steps:</span>
            <p className="leading-relaxed">{resource.instructions}</p>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {onToggleComplete && (
          <button
            type="button"
            onClick={() => onToggleComplete(resource.id)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600 border border-slate-200'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Session Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-3.5 h-3.5 text-slate-400" />
                <span>Mark Completed</span>
              </>
            )}
          </button>
        )}

        {onOpenGuide && (
          <button
            type="button"
            onClick={() => onOpenGuide(resource)}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1"
          >
            <span>Interactive Guide</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
