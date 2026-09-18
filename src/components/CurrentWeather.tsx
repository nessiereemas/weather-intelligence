import React from 'react';
import {
  Droplets,
  Wind,
  Sun,
  Gauge,
  Sunrise,
  Sunset,
  Cloud,
  Eye,
  ArrowUp,
  ArrowDown,
  Compass,
  RefreshCw,
} from 'lucide-react';
import { WeatherData } from '../types';
import { getWeatherConditionInfo } from '../services/weatherApi';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherProps {
  data: WeatherData;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  data,
  onRefresh,
  isRefreshing,
}) => {
  const { location, current, daily, unit, fetchedAt } = data;
  const condition = getWeatherConditionInfo(current.weatherCode, current.isDay);
  const todayForecast = daily[0];

  // Wind direction to cardinal
  const getCardinalDirection = (deg: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round(deg / 22.5) % 16;
    return directions[idx];
  };

  // UV risk helper
  const getUvRisk = (uv: number) => {
    if (uv <= 2) return { text: 'Low', color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
    if (uv <= 5) return { text: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-500/10' };
    if (uv <= 7) return { text: 'High', color: 'text-orange-400', bg: 'bg-orange-500/10' };
    if (uv <= 10) return { text: 'Very High', color: 'text-rose-400', bg: 'bg-rose-500/10' };
    return { text: 'Extreme', color: 'text-purple-400', bg: 'bg-purple-500/10' };
  };

  const uvRisk = getUvRisk(current.uvIndex);

  return (
    <div
      id="current-weather-hero"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl p-6 sm:p-8"
    >
      {/* Dynamic atmospheric background tint */}
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${condition.gradient} opacity-75`}
      />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top bar: Location & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {location.name}
              </h1>
              {location.country_code && (
                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                  {location.country_code}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {[location.admin1, location.country].filter(Boolean).join(', ')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-left sm:text-right text-xs text-slate-400">
              <div>Updated {fetchedAt}</div>
              <div className="text-[11px] text-slate-400">Live telemetry via Open-Meteo</div>
            </div>
            <button
              id="refresh-weather-button"
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-white transition disabled:opacity-50"
              title="Refresh weather data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Center: Main Temperature and Condition */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Temperature and High/Low */}
          <div className="flex items-baseline gap-4">
            <div className="text-6xl sm:text-7xl font-extrabold tracking-tighter text-white">
              {current.temperature}
              <span className="text-3xl sm:text-4xl font-normal text-sky-400 ml-1">
                °{unit}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1 font-medium">
                <span>Feels like</span>
                <span className="text-white font-semibold">{current.apparentTemperature}°{unit}</span>
              </div>
              {todayForecast && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="flex items-center text-rose-400">
                    <ArrowUp className="w-3.5 h-3.5 mr-0.5" />
                    {todayForecast.tempMax}°
                  </span>
                  <span className="flex items-center text-sky-400">
                    <ArrowDown className="w-3.5 h-3.5 mr-0.5" />
                    {todayForecast.tempMin}°
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Condition Icon & Description */}
          <div className="flex items-center gap-4 bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700/60 p-4">
            <div className="w-14 h-14 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-center text-sky-400 shadow-inner">
              <WeatherIcon name={condition.iconName} className="w-8 h-8" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white tracking-tight">
                {condition.label}
              </div>
              <p className="text-xs text-slate-400 max-w-xs mt-0.5 leading-relaxed">
                {condition.description}
              </p>
            </div>
          </div>
        </div>

        {/* Atmospheric Telemetry Grid */}
        <div
          id="atmospheric-telemetry-grid"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2"
        >
          {/* Humidity */}
          <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Humidity</span>
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="mt-2">
              <span className="text-lg font-bold text-white">{current.relativeHumidity}%</span>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(current.relativeHumidity, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Wind */}
          <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Wind Speed</span>
              <Wind className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-white">{current.windSpeed}</span>
                <span className="text-[11px] text-slate-400">{unit === 'F' ? 'mph' : 'km/h'}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-teal-400 mt-1">
                <Compass className="w-3 h-3" />
                <span>{getCardinalDirection(current.windDirection)} ({current.windDirection}°)</span>
              </div>
            </div>
          </div>

          {/* UV Index */}
          <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>UV Index</span>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-white">{current.uvIndex}</span>
                <span className={`text-xs font-medium px-1.5 py-0.2 rounded ${uvRisk.bg} ${uvRisk.color}`}>
                  {uvRisk.text}
                </span>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min((current.uvIndex / 12) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cloud Cover */}
          <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Cloud Cover</span>
              <Cloud className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="mt-2">
              <span className="text-lg font-bold text-white">{current.cloudCover}%</span>
              <div className="text-[11px] text-slate-400 mt-1">
                {current.cloudCover < 20
                  ? 'Clear skies'
                  : current.cloudCover < 70
                  ? 'Partly cloudy'
                  : 'Full overcast'}
              </div>
            </div>
          </div>

          {/* Barometric Pressure */}
          <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Pressure</span>
              <Gauge className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="mt-2">
              <span className="text-lg font-bold text-white">{current.pressure}</span>
              <span className="text-[11px] text-slate-400 ml-1">hPa</span>
              <div className="text-[11px] text-slate-400 mt-1">
                {current.pressure > 1015
                  ? 'High pressure'
                  : current.pressure < 1008
                  ? 'Low pressure'
                  : 'Standard 1013 hPa'}
              </div>
            </div>
          </div>

          {/* Sun Cycle */}
          <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Sun Cycle</span>
              <Sunrise className="w-3.5 h-3.5 text-orange-400" />
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Sunrise className="w-3 h-3 text-amber-400" /> Rise
                </span>
                <span className="font-semibold text-slate-200">
                  {todayForecast ? todayForecast.sunrise : '--:--'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Sunset className="w-3 h-3 text-orange-400" /> Set
                </span>
                <span className="font-semibold text-slate-200">
                  {todayForecast ? todayForecast.sunset : '--:--'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
