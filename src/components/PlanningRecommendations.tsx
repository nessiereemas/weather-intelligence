import React from 'react';
import {
  Compass,
  Shirt,
  Car,
  SunMedium,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { PlanningRecommendation, RecommendationStatus } from '../types';

interface PlanningRecommendationsProps {
  recommendations: PlanningRecommendation[];
}

export const PlanningRecommendations: React.FC<PlanningRecommendationsProps> = ({
  recommendations,
}) => {
  if (!recommendations || recommendations.length === 0) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'outdoor':
        return <Compass className="w-4 h-4 text-sky-400" />;
      case 'clothing':
        return <Shirt className="w-4 h-4 text-indigo-400" />;
      case 'travel':
        return <Car className="w-4 h-4 text-emerald-400" />;
      case 'health':
        return <SunMedium className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-sky-400" />;
    }
  };

  const getStatusBadge = (status: RecommendationStatus, label: string) => {
    switch (status) {
      case 'optimal':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            {label}
          </span>
        );
      case 'caution':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" />
            {label}
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <AlertOctagon className="w-3 h-3" />
            {label}
          </span>
        );
    }
  };

  return (
    <div
      id="planning-recommendations-section"
      className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white tracking-tight">
              Atmospheric Planning Recommendations
            </h2>
            <p className="text-xs text-slate-400">
              Deterministic daily intelligence formulated from real-time Open-Meteo telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-700/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Calculated for current conditions</span>
        </div>
      </div>

      {/* Grid of Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex flex-col justify-between rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700/80 p-4 transition-all"
          >
            <div>
              {/* Header: Category & Status */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                    {getCategoryIcon(rec.category)}
                  </div>
                  <span className="text-xs font-semibold text-slate-300">
                    {rec.categoryLabel}
                  </span>
                </div>
                {getStatusBadge(rec.status, rec.statusLabel)}
              </div>

              {/* Title & Summary */}
              <div className="mt-3">
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {rec.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {rec.summary}
                </p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {rec.details}
                </p>
              </div>
            </div>

            {/* Actionable Tips */}
            <div className="mt-4 pt-3 border-t border-slate-800/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Action Items & Guidance
              </span>
              <ul className="mt-1.5 space-y-1">
                {rec.tips.map((tip, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-300 flex items-start gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-sky-400 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
