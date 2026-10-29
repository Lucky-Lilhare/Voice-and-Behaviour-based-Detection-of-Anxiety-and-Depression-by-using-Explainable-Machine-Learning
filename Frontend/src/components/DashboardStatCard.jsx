import React from 'react';

export default function DashboardStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badgeText,
  badgeType = "neutral", // 'emerald' | 'amber' | 'indigo' | 'neutral'
  footerText,
}) {
  const getBadgeStyle = () => {
    switch (badgeType) {
      case 'emerald':
        return 'text-emerald-700 bg-emerald-50 border border-emerald-200/60';
      case 'amber':
        return 'text-amber-700 bg-amber-50 border border-amber-200/60';
      case 'indigo':
        return 'text-indigo-700 bg-indigo-50 border border-indigo-200/60';
      default:
        return 'text-slate-600 bg-slate-50 border border-slate-200/60';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft hover:border-slate-300 hover:shadow-soft-hover transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between text-slate-500 text-xs">
        <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-500">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="my-3">
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
          {value}
        </div>
        {badgeText && (
          <div className="mt-1">
            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${getBadgeStyle()}`}>
              {badgeText}
            </span>
          </div>
        )}
        {subtitle && (
          <p className="text-[11px] text-slate-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {footerText && (
        <span className="text-[10px] text-slate-400 border-t border-slate-100 pt-2 block truncate">
          {footerText}
        </span>
      )}
    </div>
  );
}
