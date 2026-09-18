import React from 'react';
import { CloudRain, Globe, Sparkles, Sliders, ExternalLink } from 'lucide-react';
import { TemperatureUnit } from '../types';

interface HeaderProps {
  unit: TemperatureUnit;
  onToggleUnit: () => void;
  onOpenDeployModal: () => void;
  isDeployReady?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  unit,
  onToggleUnit,
  onOpenDeployModal,
  isDeployReady = true,
}) => {
  return (
    <header
      id="app-header"
      className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white">
            <CloudRain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base tracking-tight text-white">
                Weather Intelligence
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Sparkles className="w-3 h-3" />
                Open-Meteo
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Real-time atmospheric telemetry & smart activity planning
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Unit Toggle */}
          <div
            id="unit-toggle-group"
            className="flex items-center p-0.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-medium"
          >
            <button
              id="unit-c-button"
              type="button"
              onClick={() => unit !== 'C' && onToggleUnit()}
              className={`px-2.5 py-1 rounded-md transition-all ${
                unit === 'C'
                  ? 'bg-sky-500 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              °C
            </button>
            <button
              id="unit-f-button"
              type="button"
              onClick={() => unit !== 'F' && onToggleUnit()}
              className={`px-2.5 py-1 rounded-md transition-all ${
                unit === 'F'
                  ? 'bg-sky-500 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              °F
            </button>
          </div>

          {/* Cloudflare Pages & GitHub Artifact Modal Button */}
          <button
            id="open-deploy-hub-button"
            type="button"
            onClick={onOpenDeployModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-600/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all shadow-sm group"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden md:inline">Cloudflare Deploy & GitHub</span>
            <span className="md:hidden">Deploy</span>
            {isDeployReady && (
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
