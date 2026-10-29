import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine, 
  Cell 
} from 'recharts';
import { Info, Sparkles } from 'lucide-react';

export default function FeatureAttributionChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
        No feature attribution parameters generated for this modality.
      </div>
    );
  }

  // Format data for Recharts
  const chartData = data.map(item => ({
    feature: item.feature,
    value: Number(item.value.toFixed(2)),
    label: item.label,
    type: item.type,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const isPositive = item.value >= 0;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-soft-lg text-xs max-w-xs border border-slate-700">
          <div className="flex items-center gap-1.5 font-semibold text-slate-100 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>{item.feature}</span>
          </div>
          <p className="text-slate-300 text-[11px] mb-2">{item.label}</p>
          <div className="flex items-center justify-between border-t border-slate-800 pt-1.5 text-[11px]">
            <span className="text-slate-400">SHAP Value:</span>
            <span className={`font-mono font-bold ${isPositive ? 'text-teal-400' : 'text-rose-400'}`}>
              {isPositive ? `+${item.value}` : item.value}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 italic block mt-1">
            {isPositive ? 'Positively supports emotional stability' : 'Indicates elevated tension or hesitation'}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 p-4 shadow-soft-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <span>SHAP Feature Attribution Breakdown</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-mono font-normal">
              XAI Engine
            </span>
          </h4>
          <p className="text-[11px] text-slate-500">
            Marginal biomarker contributions toward predicted wellness classification (Shapley Values)
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
            <span className="text-slate-600 font-medium">Stability (+Impact)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-slate-600 font-medium">Stress/Fatigue (-Impact)</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 90, bottom: 5 }}
          >
            <XAxis 
              type="number" 
              domain={[-0.3, 0.3]} 
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickFormatter={(v) => (v > 0 ? `+${v}` : v)}
            />
            <YAxis 
              type="category" 
              dataKey="feature" 
              tick={{ fontSize: 11, fill: '#334155', fontWeight: 500 }}
              width={95}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={0} stroke="#94A3B8" strokeDasharray="3 3" />
            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.value >= 0 ? '#0D9488' : '#F43F5E'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-500">
        <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
        <p>
          Shapley Additive Explanations (SHAP) provide game-theoretic explanations for complex non-linear ensemble models, ensuring transparent clinical interpretability.
        </p>
      </div>
    </div>
  );
}
