import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Video, Eye, ArrowRight, Clock } from 'lucide-react';

export default function AssessmentCard({ assessment, onViewDetails = null }) {
  const isMultimodal = assessment.type.includes('Multimodal');
  const isVoice = assessment.type.includes('Voice');
  const isVideo = assessment.type.includes('Video') || assessment.type.includes('Facial');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft hover:shadow-soft-hover hover:border-teal-300 transition-all flex flex-col justify-between space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-slate-800">
              {assessment.id}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
              {assessment.status}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{assessment.date}</span>
          </p>
        </div>

        <div className="flex items-center gap-1 text-slate-500">
          {isVoice && <Mic className="w-4 h-4 text-teal-600" />}
          {isVideo && <Video className="w-4 h-4 text-lavender-600" />}
        </div>
      </div>

      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
        {assessment.summary}
      </p>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-lg font-extrabold text-slate-900">
            {assessment.compositeScore}
          </span>
          <span className="text-[10px] text-slate-400">/ 100 Index</span>
        </div>

        <div className="flex items-center gap-2">
          {onViewDetails ? (
            <button
              type="button"
              onClick={() => onViewDetails(assessment)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200/70 transition-colors inline-flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          ) : null}

          <Link
            to={`/results/${assessment.id}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white bg-teal-600 hover:bg-teal-700 transition-colors inline-flex items-center gap-1"
          >
            <span>Full Report</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
