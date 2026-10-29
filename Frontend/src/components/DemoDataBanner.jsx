import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export default function DemoDataBanner({ 
  title = "DEMO DATA — NOT A REAL ASSESSMENT",
  message = "This record contains synthetic demonstration parameters created for undergraduate research evaluation. It does not represent an actual clinical or psychiatric diagnosis.",
  variant = "warning" // 'warning' | 'info'
}) {
  const isWarning = variant === 'warning';

  return (
    <div 
      className={`rounded-2xl p-4 border flex items-start gap-3 text-xs ${
        isWarning 
          ? 'bg-amber-50/90 border-amber-200/90 text-amber-900' 
          : 'bg-teal-50/90 border-teal-200/90 text-teal-900'
      }`}
      role="alert"
    >
      {isWarning ? (
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
      ) : (
        <Info className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
      )}
      <div className="space-y-0.5">
        <p className="font-bold uppercase tracking-wider text-[11px]">
          {title}
        </p>
        <p className="leading-relaxed opacity-90 text-[11px]">
          {message}
        </p>
      </div>
    </div>
  );
}
