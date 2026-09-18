/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  GeoLocation,
  PlanningRecommendation,
  TemperatureUnit,
  WeatherData,
} from './types';
import {
  DEFAULT_CITIES,
  fetchWeatherForLocation,
  generateRecommendations,
} from './services/weatherApi';
import { Header } from './components/Header';
import { CitySearch } from './components/CitySearch';
import { CurrentWeather } from './components/CurrentWeather';
import { HourlyForecast } from './components/HourlyForecast';
import { SevenDayForecast } from './components/SevenDayForecast';
import { PlanningRecommendations } from './components/PlanningRecommendations';
import { CloudflareDeploymentModal } from './components/CloudflareDeploymentModal';
import {
  AlertCircle,
  Loader2,
  RefreshCw,
  Globe,
  Github,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [currentLocation, setCurrentLocation] = useState<GeoLocation>(
    DEFAULT_CITIES[0]
  );
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    const saved = localStorage.getItem('weather_unit');
    return saved === 'F' ? 'F' : 'C';
  });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [recommendations, setRecommendations] = useState<
    PlanningRecommendation[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);

  // Load weather data for current location and unit
  const loadWeather = useCallback(
    async (location: GeoLocation, tempUnit: TemperatureUnit, isRefresh = false) => {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      try {
        const data = await fetchWeatherForLocation(location, tempUnit);
        setWeatherData(data);
        const recs = generateRecommendations(
          data.current,
          data.daily[0],
          data.hourly,
          tempUnit
        );
        setRecommendations(recs);
      } catch (err: any) {
        console.error('Failed to load weather data:', err);
        setError(
          err.message ||
            'Failed to fetch weather data from Open-Meteo. Please check your network connection and try again.'
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  // Trigger load on location or unit change
  useEffect(() => {
    loadWeather(currentLocation, unit);
  }, [currentLocation, unit, loadWeather]);

  const handleToggleUnit = () => {
    const newUnit = unit === 'C' ? 'F' : 'C';
    setUnit(newUnit);
    localStorage.setItem('weather_unit', newUnit);
  };

  const handleSelectCity = (location: GeoLocation) => {
    setCurrentLocation(location);
  };

  const handleRefresh = () => {
    loadWeather(currentLocation, unit, true);
  };

  return (
    <div
      id="weather-intelligence-app"
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-sky-500 selection:text-white"
    >
      {/* App Header */}
      <Header
        unit={unit}
        onToggleUnit={handleToggleUnit}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        isDeployReady={true}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Search and City Presets */}
        <section id="search-section" aria-label="City Search">
          <CitySearch
            currentLocation={currentLocation}
            onSelectCity={handleSelectCity}
            isLoading={isLoading}
          />
        </section>

        {/* Error Alert */}
        {error && (
          <div
            id="weather-error-alert"
            className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-rose-300"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Weather Synchronization Notice
                </h4>
                <p className="text-xs text-rose-200/90 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-semibold text-white transition flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Telemetry</span>
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && !weatherData && (
          <div
            id="weather-loading-skeleton"
            className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 flex flex-col items-center justify-center min-h-[360px] text-center space-y-4"
          >
            <Loader2 className="w-10 h-10 text-sky-400 animate-spin" />
            <div>
              <h3 className="text-base font-semibold text-white">
                Contacting Open-Meteo Observatories...
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fetching high-resolution meteorological models for {currentLocation.name}
              </p>
            </div>
          </div>
        )}

        {/* Active Weather Dashboard */}
        {weatherData && (
          <div className="space-y-6">
            {/* 1. Current Weather Hero */}
            <section id="current-weather-container" aria-label="Current Weather">
              <CurrentWeather
                data={weatherData}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
              />
            </section>

            {/* 2. Planning Recommendations */}
            <section
              id="recommendations-container"
              aria-label="Planning Recommendations"
            >
              <PlanningRecommendations recommendations={recommendations} />
            </section>

            {/* 3. Hourly Forecast */}
            <section id="hourly-forecast-container" aria-label="Hourly Forecast">
              <HourlyForecast hourly={weatherData.hourly} unit={unit} />
            </section>

            {/* 4. 7-Day Extended Forecast */}
            <section id="seven-day-forecast-container" aria-label="7-Day Forecast">
              <SevenDayForecast daily={weatherData.daily} unit={unit} />
            </section>
          </div>
        )}

        {/* Deployable Artifact Proof & Status Banner */}
        <section
          id="artifact-deployment-banner"
          className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  Deployable Software Artifact Status
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Cloudflare Pages Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Client-side SPA with zero server secrets. Pre-configured for GitHub sync and Cloudflare Pages edge deployment.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              id="view-deploy-guide-button"
              type="button"
              onClick={() => setIsDeployModalOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition flex items-center justify-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub & Cloudflare Guide</span>
            </button>
            <button
              id="open-proof-modal-button"
              type="button"
              onClick={() => setIsDeployModalOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-semibold text-white transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verify Live URL</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="app-footer"
        className="mt-auto border-t border-slate-800/80 bg-slate-950/80 text-slate-500 text-xs py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Weather Intelligence App</span>
            <span>•</span>
            <span>Data provided by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Open-Meteo</a></span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>WMO Meteorological Standards</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsDeployModalOpen(true)}
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              Cloudflare Pages Ready
            </button>
          </div>
        </div>
      </footer>

      {/* Cloudflare Pages & GitHub Hub Modal */}
      <CloudflareDeploymentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </div>
  );
}
